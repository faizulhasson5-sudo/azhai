const {google} = require('googleapis');
const config = require('./google-config');

const auth = new google.auth.GoogleAuth({
  keyFile: require('path').join(__dirname, '..', 'google-service-account.json'),
  scopes: [config.scopes.gtm]
});

const tagmanager = google.tagmanager({version: 'v2', auth});

let accountId, containerId, workspaceId;

async function init() {
  // Find account
  const accountsRes = await tagmanager.accounts.list();
  const accounts = accountsRes.data.account || [];
  const account = accounts.find(a => a.name.toLowerCase().includes('faizi') || true);
  accountId = account.accountId;

  // Find container
  const containersRes = await tagmanager.accounts.containers.list({parent: 'accounts/' + accountId});
  const containers = containersRes.data.container || [];
  const container = containers.find(c => c.publicId === config.gtmContainerId) || containers[0];
  containerId = container.containerId;

  // Find default workspace
  const workspacesRes = await tagmanager.accounts.containers.workspaces.list({
    parent: `accounts/${accountId}/containers/${containerId}`
  });
  const workspaces = workspacesRes.data.workspace || [];
  workspace = workspaces.find(w => w.name === 'Default Workspace') || workspaces[0];
  workspaceId = workspace.workspaceId;

  return {accountId, containerId, workspaceId};
}

async function listTriggers() {
  await init();
  const res = await tagmanager.accounts.containers.workspaces.triggers.list({
    parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`
  });
  return res.data.trigger || [];
}

async function listTags() {
  await init();
  const res = await tagmanager.accounts.containers.workspaces.tags.list({
    parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`
  });
  return res.data.tag || [];
}

async function listVariables() {
  await init();
  const res = await tagmanager.accounts.containers.workspaces.variables.list({
    parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`
  });
  return res.data.variable || [];
}

async function createTrigger(name, type, config = {}) {
  await init();
  const body = {name, type, ...config};
  const res = await tagmanager.accounts.containers.workspaces.triggers.create({
    parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`,
    requestBody: body
  });
  return res.data;
}

async function createTag(name, type, parameters, firingTriggerIds) {
  await init();
  const body = {
    name,
    type,
    parameter: parameters.map(p => ({key: p.key, type: p.type || 'template', value: p.value})),
    firingTriggerId: firingTriggerIds
  };
  const res = await tagmanager.accounts.containers.workspaces.tags.create({
    parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`,
    requestBody: body
  });
  return res.data;
}

async function createVariable(name, type, config = {}) {
  await init();
  const body = {name, type, ...config};
  const res = await tagmanager.accounts.containers.workspaces.variables.create({
    parent: `accounts/${accountId}/containers/${containerId}/workspaces/${workspaceId}`,
    requestBody: body
  });
  return res.data;
}

async function createVersion(name, notes = '') {
  await init();
  const res = await tagmanager.accounts.containers.versions.create({
    parent: `accounts/${accountId}/containers/${containerId}`,
    requestBody: {name, notes}
  });
  return res.data;
}

// Pre-built SEO tracking setup
async function setupSEOTracking() {
  console.log('Setting up SEO tracking in GTM...\n');
  await init();

  const results = {triggers: [], tags: [], errors: []};

  // 1. Create Custom Event Triggers
  const events = [
    {name: 'tool_usage', type: 'CUSTOM_EVENT', config: {customEventFilter: [{parameter: 'eventName', type: 'equals', value: 'tool_usage'}]}},
    {name: 'blog_read', type: 'CUSTOM_EVENT', config: {customEventFilter: [{parameter: 'eventName', type: 'equals', value: 'blog_read'}]}},
    {name: 'scroll_depth', type: 'CUSTOM_EVENT', config: {customEventFilter: [{parameter: 'eventName', type: 'equals', value: 'scroll_depth'}]}},
    {name: 'cookie_consent', type: 'CUSTOM_EVENT', config: {customEventFilter: [{parameter: 'eventName', type: 'equals', value: 'cookie_consent'}]}},
    {name: 'tool_history_restore', type: 'CUSTOM_EVENT', config: {customEventFilter: [{parameter: 'eventName', type: 'equals', value: 'tool_history_restore'}]}},
    {name: 'blog_list_view', type: 'PAGE_VIEW', config: {urlFilter: {parameter: [{key: 'url', type: 'equals', value: '/blog/'}]}}}
  ];

  for (const event of events) {
    try {
      const trigger = await createTrigger(event.name, event.type, event.config);
      results.triggers.push({name: event.name, id: trigger.triggerId});
      console.log('Created trigger: ' + event.name);
    } catch(e) {
      results.errors.push('Trigger ' + event.name + ': ' + e.message);
      console.log('Trigger ' + event.name + ': ' + (e.message.includes('already exists') ? 'EXISTS' : 'FAILED'));
    }
  }

  // 2. Refresh triggers list to get IDs
  const existingTriggers = await listTriggers();
  const triggerMap = {};
  existingTriggers.forEach(t => { triggerMap[t.name] = t.triggerId; });

  // 3. Create GA4 Event Tags
  const tags = [
    {
      name: 'GA4 - Tool Usage',
      type: 'gaawe',
      params: [
        {key: 'measurementId', value: config.ga4MeasurementId},
        {key: 'eventName', value: 'tool_usage'}
      ],
      trigger: 'tool_usage'
    },
    {
      name: 'GA4 - Blog Read',
      type: 'gaawe',
      params: [
        {key: 'measurementId', value: config.ga4MeasurementId},
        {key: 'eventName', value: 'blog_read'}
      ],
      trigger: 'blog_read'
    },
    {
      name: 'GA4 - Scroll Depth',
      type: 'gaawe',
      params: [
        {key: 'measurementId', value: config.ga4MeasurementId},
        {key: 'eventName', value: 'scroll_depth'}
      ],
      trigger: 'scroll_depth'
    },
    {
      name: 'GA4 - Cookie Consent',
      type: 'gaawe',
      params: [
        {key: 'measurementId', value: config.ga4MeasurementId},
        {key: 'eventName', value: 'cookie_consent'}
      ],
      trigger: 'cookie_consent'
    }
  ];

  for (const tag of tags) {
    try {
      const triggerId = triggerMap[tag.trigger];
      if (!triggerId) {
        results.errors.push('Tag ' + tag.name + ': trigger not found');
        continue;
      }
      const created = await createTag(tag.name, tag.type, tag.params, [triggerId]);
      results.tags.push({name: tag.name, id: tag.tagId});
      console.log('Created tag: ' + tag.name);
    } catch(e) {
      results.errors.push('Tag ' + tag.name + ': ' + e.message);
      console.log('Tag ' + tag.name + ': ' + (e.message.includes('already exists') ? 'EXISTS' : 'FAILED'));
    }
  }

  return results;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const cmd = args[0];

  (async () => {
    try {
      switch(cmd) {
        case 'triggers':
          const triggers = await listTriggers();
          console.log('\nGTM Triggers:');
          console.log('─'.repeat(60));
          triggers.forEach((t, i) => {
            console.log((i+1) + '. ' + t.name + ' (' + t.type + ')');
          });
          break;

        case 'tags':
          const tags = await listTags();
          console.log('\nGTM Tags:');
          console.log('─'.repeat(60));
          tags.forEach((t, i) => {
            console.log((i+1) + '. ' + t.name + ' (' + t.type + ')');
          });
          break;

        case 'variables':
          const vars = await listVariables();
          console.log('\nGTM Variables:');
          console.log('─'.repeat(60));
          vars.forEach((v, i) => {
            console.log((i+1) + '. ' + v.name + ' (' + v.type + ')');
          });
          break;

        case 'setup':
          const results = await setupSEOTracking();
          console.log('\nSetup Results:');
          console.log('Triggers created:', results.triggers.length);
          console.log('Tags created:', results.tags.length);
          if (results.errors.length) {
            console.log('Errors:', results.errors.join('; '));
          }
          break;

        case 'version':
          const version = await createVersion(args[1] || 'SEO Tracking Setup', args[2] || 'Automated setup of GA4 event tracking');
          console.log('Created version:', version.name);
          break;

        default:
          console.log('\nGTM Setup Tool');
          console.log('Usage:');
          console.log('  node gtm-setup.js triggers    - List all triggers');
          console.log('  node gtm-setup.js tags        - List all tags');
          console.log('  node gtm-setup.js variables   - List all variables');
          console.log('  node gtm-setup.js setup       - Create SEO tracking triggers + tags');
          console.log('  node gtm-setup.js version [name] [notes] - Create container version');
      }
    } catch(e) {
      console.error('Error:', e.message);
    }
  })();
}

module.exports = { init, listTriggers, listTags, listVariables, createTrigger, createTag, createVariable, createVersion, setupSEOTracking };
