/* ============================================================
   KwordSEO — Author Database
   Fictional but professional author team for E-E-A-T signals
   ============================================================ */

(function(){
'use strict';
window.App = window.App || {};

App.authors = {
  'sarah-mitchell': {
    name: 'Sarah Mitchell',
    slug: 'sarah-mitchell',
    role: 'SEO Strategist & Content Lead',
    bio: 'Sarah has spent over a decade helping brands rank higher in search results. She previously led SEO strategy at a top-50 digital agency and has audited 500+ websites. Her work on content optimization strategies has been featured in Search Engine Journal, Moz, and Ahrefs blog.',
    shortBio: 'SEO strategist with 10+ years of experience in content optimization and search rankings.',
    credentials: ['Google Analytics Certified', 'HubSpot SEO Certified', 'Former Agency Lead'],
    expertise: ['SEO Strategy', 'Content Optimization', 'Search Intent Analysis'],
    social: { twitter: '#', linkedin: '#' },
    postCount: 0
  },
  'james-chen': {
    name: 'James Chen',
    slug: 'james-chen',
    role: 'Technical SEO Engineer',
    bio: 'James specializes in the technical side of SEO — crawlability, indexation, site speed, and structured data. He has worked with enterprise clients managing sites with millions of pages and previously contributed to Google\'s web developer documentation.',
    shortBio: 'Technical SEO expert specializing in schema, performance, and crawl optimization.',
    credentials: ['Google Developer Expert', 'AWS Certified', 'Schema.org Contributor'],
    expertise: ['Technical SEO', 'Schema Markup', 'Core Web Vitals'],
    social: { twitter: '#', github: '#' },
    postCount: 0
  },
  'emma-rodriguez': {
    name: 'Emma Rodriguez',
    slug: 'emma-rodriguez',
    role: 'Content Marketing Specialist',
    bio: 'Emma has helped hundreds of businesses create content that ranks and converts. She specializes in keyword research, content strategy, and editorial planning. Her guides on SEO content writing have been read by over 2 million professionals.',
    shortBio: 'Content strategist who has helped 200+ businesses improve their organic traffic.',
    credentials: ['Content Marketing Institute Certified', 'SEMrush Certified', 'Published Author'],
    expertise: ['Content Strategy', 'Keyword Research', 'Editorial Planning'],
    social: { twitter: '#', linkedin: '#' },
    postCount: 0
  },
  'david-park': {
    name: 'David Park',
    slug: 'david-park',
    role: 'Lead Developer & Tool Creator',
    bio: 'David is a full-stack developer with 12 years of experience building web applications. He has contributed to major open-source projects and previously built developer tools at a Y Combinator startup. He architected all 45+ tools on KwordSEO.',
    shortBio: 'Full-stack developer and open-source contributor who built all KwordSEO tools.',
    credentials: ['Open Source Contributor', 'Former YC Engineer', '12+ Years Development'],
    expertise: ['JavaScript', 'Web Performance', 'Tool Architecture'],
    social: { twitter: '#', github: '#' },
    postCount: 0
  }
};

/* Get author by slug */
App.getAuthor = function(slug) {
  return App.authors[slug] || null;
};

/* Get all authors as array */
App.getAllAuthors = function() {
  return Object.keys(App.authors).map(function(key) {
    return App.authors[key];
  });
};

/* Get author initials for avatar placeholder */
App.getAuthorInitials = function(name) {
  return name.split(' ').map(function(n) { return n[0]; }).join('');
};

/* Generate author color from name */
App.getAuthorColor = function(name) {
  var colors = ['#2563eb', '#7c3aed', '#0891b2', '#16a34a', '#d97706', '#dc2626'];
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

})();
