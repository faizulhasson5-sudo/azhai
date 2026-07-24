const fs = require('fs');
const path = require('path');

const BASE = 'https://azhai-six.vercel.app';

const courses = [
  /* ===== SEO & MARKETING ===== */
  {
    id: 'semrush-academy',
    title: 'Semrush Academy — SEO Fundamentals',
    platform: 'Semrush',
    url: 'https://www.semrush.com/academy/',
    price: 'Free',
    category: 'SEO & Marketing',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (40+ hours total)',
    rating: '4.8/5',
    desc: 'The most comprehensive free SEO course library on the internet. Covers technical SEO, content marketing, PPC, and social media. Taught by industry experts like Brian Dean and Neil Patel.',
    bestFor: 'Beginners who want a structured SEO education without paying thousands for bootcamps.',
    steps: [
      'Start with "SEO Fundamentals" course — covers crawling, indexing, ranking factors',
      'Take "Content Marketing" course next — learn keyword research and content strategy',
      'Move to "Technical SEO" — understand site architecture, Core Web Vitals, structured data',
      'Practice with the Semrush tool (free trial) while learning — apply concepts immediately',
      'Take the certification exam at the end of each course for credibility'
    ],
    after: [
      'Build a personal website and implement everything you learned',
      'Start doing free SEO audits for local businesses to build case studies',
      'Apply for junior SEO roles or start freelancing on Upwork/Fiverr',
      'Join SEO communities (r/SEO, Twitter/X SEO community) to stay current',
      'Set up Google Search Console and Analytics on your site to track progress'
    ]
  },
  {
    id: 'ahrefs-seo-course',
    title: 'Ahrefs Academy — SEO Course for Beginners',
    platform: 'Ahrefs',
    url: 'https://ahrefs.com/academy',
    price: 'Free',
    category: 'SEO & Marketing',
    level: 'Beginner',
    duration: '8 hours',
    rating: '4.7/5',
    desc: 'Ahrefs distills their massive dataset expertise into a beginner-friendly course. Focuses on practical, data-driven SEO with real examples from their tool.',
    bestFor: 'People who learn best with data-backed examples and want to understand SEO "why" not just "how."',
    steps: [
      'Watch the "SEO Basics" module first — understand how search engines work',
      'Follow along with Ahrefs Webmaster Tools (free) on your own site',
      'Complete the keyword research module — build your first keyword list',
      'Learn link building fundamentals — understand what makes a good backlink',
      'Take notes on Ahrefs ranking factors study — it is backed by real data'
    ],
    after: [
      'Run a full site audit using Ahrefs Webmaster Tools (free)',
      'Create a content strategy based on keyword gap analysis',
      'Build your first outreach campaign for backlinks',
      'Track your rankings weekly and adjust strategy based on data',
      'Consider the paid Ahrefs plan ($99/mo) if SEO becomes your career'
    ]
  },
  {
    id: 'google-digital-garage',
    title: 'Google Digital Garage — Fundamentals of Digital Marketing',
    platform: 'Google',
    url: 'https://learndigital.withgoogle.com/digitalgarage',
    price: 'Free',
    category: 'SEO & Marketing',
    level: 'Beginner',
    duration: '40 hours',
    rating: '4.6/5',
    desc: 'Official Google course covering digital marketing holistically — SEO, SEM, social, email, analytics. Includes a certificate from Google upon completion.',
    bestFor: 'Anyone wanting a broad digital marketing foundation with a recognized Google certificate.',
    steps: [
      'Register with your Google account for progress tracking',
      'Complete modules in order — they build on each other',
      'Pay special attention to the analytics modules — data literacy is critical',
      'Take the final assessment seriously — the certificate has real value',
      'Supplement with YouTube tutorials for modules you find confusing'
    ],
    after: [
      'Apply the knowledge to a real project (blog, business, or client)',
      'Get Google Analytics certification separately (GA4)',
      'Explore Google Ads certification for PPC skills',
      'Build a portfolio showing measurable results from your marketing',
      'Join digital marketing communities for ongoing learning'
    ]
  },
  {
    id: 'hubspot-seo',
    title: 'HubSpot SEO Training',
    platform: 'HubSpot Academy',
    url: 'https://academy.hubspot.com/courses/seo-training',
    price: 'Free',
    category: 'SEO & Marketing',
    level: 'Beginner to Intermediate',
    duration: '6 hours',
    rating: '4.5/5',
    desc: 'HubSpot\'s SEO course focuses on building a sustainable SEO strategy. Covers on-page, technical, and off-page SEO with HubSpot\'s perspective on inbound marketing.',
    bestFor: 'Marketers who want SEO integrated with inbound marketing and content strategy.',
    steps: [
      'Start with "Building a Content Strategy" — the foundation of modern SEO',
      'Learn on-page optimization — title tags, meta descriptions, header structure',
      'Understand technical SEO basics — site speed, mobile-friendliness, crawlability',
      'Study the link building module — focus on quality over quantity',
      'Complete the certification exam for your LinkedIn profile'
    ],
    after: [
      'Create a content calendar based on keyword research',
      'Optimize your existing pages using HubSpot\'s checklist',
      'Set up a monthly reporting dashboard to track SEO progress',
      'Implement HubSpot CMS (free tier) to practice inbound marketing',
      'Start guest blogging to build backlinks and authority'
    ]
  },

  /* ===== WEB DEVELOPMENT ===== */
  {
    id: 'free-code-camp',
    title: 'freeCodeCamp — Responsive Web Design',
    platform: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner',
    duration: '300 hours',
    rating: '4.7/5',
    desc: 'The most popular free coding course on the internet. Build 5 responsive projects from scratch. Earn a verified certification. No experience needed.',
    bestFor: 'Complete beginners who want to learn web development from zero with hands-on projects.',
    steps: [
      'Start with HTML basics — understand semantic elements, forms, accessibility',
      'Move to CSS — learn Flexbox and Grid (these are essential)',
      'Complete all 5 required projects — they build real portfolio pieces',
      'Don\'t skip the accessibility sections — they are critical for modern web dev',
      'Use the freeCodeCamp forum when stuck — the community is incredibly helpful'
    ],
    after: [
      'Build 3-5 more personal projects to solidify your skills',
      'Learn JavaScript (freeCodeCamp\'s JS course is excellent)',
      'Create a portfolio website showcasing your projects',
      'Contribute to open source on GitHub to build your profile',
      'Apply for junior developer roles or start freelancing'
    ]
  },
  {
    id: 'theodinproject',
    title: 'The Odin Project — Full Stack Ruby on Rails',
    platform: 'The Odin Project',
    url: 'https://www.theodinproject.com',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner to Advanced',
    duration: '1000+ hours',
    rating: '4.8/5',
    desc: 'The gold standard for free, comprehensive web development education. Covers HTML, CSS, JavaScript, Ruby on Rails, and Git. Project-based curriculum.',
    bestFor: 'Dedicated learners who want a full computer science-level education in web development.',
    steps: [
      'Start with the "Foundations" course — don\'t skip anything',
      'Set up your development environment properly (Linux/Mac recommended)',
      'Build every project from scratch — resist the urge to look at solutions',
      'Join the Discord community — pair programming helps enormously',
      'Choose one path: Ruby on Rails or JavaScript after Foundations'
    ],
    after: [
      'Build a capstone project that solves a real problem',
      'Create a professional GitHub profile with consistent commit history',
      'Write technical blog posts about what you learned',
      'Network at local meetups and tech events',
      'Start applying for jobs 2-3 months before you think you\'re ready'
    ]
  },
  {
    id: 'javascript-info',
    title: 'JavaScript.info — The Modern JavaScript Tutorial',
    platform: 'JavaScript.info',
    url: 'https://javascript.info',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (200+ hours)',
    rating: '4.9/5',
    desc: 'The most thorough JavaScript tutorial on the web. Covers fundamentals through advanced topics like async/await, proxies, and generators. Interactive code examples.',
    bestFor: 'Anyone serious about mastering JavaScript — the definitive reference.',
    steps: [
      'Read Part 1 (Fundamentals) cover to cover — don\'t skip basics',
      'Type out every code example yourself — don\'t copy-paste',
      'Complete the exercises at the end of each chapter',
      'Revisit chapters after a week — spaced repetition helps retention',
      'Build small projects after each major topic to reinforce learning'
    ],
    after: [
      'Learn a framework: React, Vue, or Svelte',
      'Build full-stack projects with Node.js/Express',
      'Study TypeScript — it is becoming the industry standard',
      'Practice algorithms on LeetCode/HackerRank',
      'Contribute to open-source JavaScript projects'
    ]
  },

  /* ===== WRITING & CONTENT ===== */
  {
    id: 'copyblogger',
    title: 'Copyblogger — Copywriting 101',
    platform: 'Copyblogger',
    url: 'https://copyblogger.com/copywriting-101/',
    price: 'Free',
    category: 'Writing & Content',
    level: 'Beginner',
    duration: 'Self-paced (20 lessons)',
    rating: '4.6/5',
    desc: 'The foundational course for anyone who writes marketing content. Teaches headline writing, persuasive copy, and the psychology behind why people buy.',
    bestFor: 'Marketers, bloggers, and business owners who want to write content that converts.',
    steps: [
      'Read all 20 lessons in order — each builds on the previous',
      'Practice writing headlines using the formulas taught',
      'Rewrite your existing website copy using the principles learned',
      'Study the recommended swipe file of proven copy examples',
      'Write 5 different versions of the same headline to practice variety'
    ],
    after: [
      'Apply copywriting formulas to every email, landing page, and ad',
      'Build a swipe file of high-converting copy you encounter',
      'A/B test your headlines and calls-to-action',
      'Study advanced copywriting (AWAI, Dan Kennedy, Gary Halbert)',
      'Consider paid courses like AWAI\'s Accelerated Program for deeper training'
    ]
  },
  {
    id: 'hubspot-content',
    title: 'HubSpot Content Marketing Certification',
    platform: 'HubSpot Academy',
    url: 'https://academy.hubspot.com/courses/content-marketing',
    price: 'Free',
    category: 'Writing & Content',
    level: 'Beginner to Intermediate',
    duration: '6 hours',
    rating: '4.5/5',
    desc: 'Comprehensive content marketing course covering strategy, storytelling, content creation, and promotion. Includes a verified certificate.',
    bestFor: 'Content marketers who want a structured approach to building content strategies.',
    steps: [
      'Start with "The Content Marketing Framework" module',
      'Build a content strategy document as you go through the course',
      'Learn the storytelling techniques — they apply to every content format',
      'Study the content promotion tactics — creation is only half the battle',
      'Take the certification exam for your LinkedIn'
    ],
    after: [
      'Create a 3-month content calendar for your business or blog',
      'Develop 3-5 content pillars (cornerstone topics)',
      'Build an email list and start newsletter marketing',
      'Repurpose blog content into social media, video, and podcasts',
      'Track content performance with Google Analytics'
    ]
  },

  /* ===== AI & TOOLS ===== */
  {
    id: 'deep-learning-ai',
    title: 'DeepLearning.AI — AI for Everyone',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/ai-for-everyone',
    price: 'Free (audit)',
    category: 'AI & Tools',
    level: 'Beginner',
    duration: '4 weeks',
    rating: '4.8/5',
    desc: 'Andrew Ng\'s non-technical introduction to AI. Understand what AI can and cannot do, how to build AI projects, and AI\'s impact on society. No coding required.',
    bestFor: 'Anyone who wants to understand AI without needing to code — business professionals, managers, curious minds.',
    steps: [
      'Watch all videos at 1x speed first — Andrew Ng explains clearly',
      'Take notes on the AI project workflow — it is the most practical section',
      'Complete all quizzes to reinforce key concepts',
      'Discuss with peers — AI understanding benefits from different perspectives',
      'Watch Andrew Ng\'s "Machine Learning" course next if you want to go deeper'
    ],
    after: [
      'Identify AI opportunities in your current job or business',
      'Learn prompt engineering to use ChatGPT/Claude effectively',
      'Explore no-code AI tools (Zapier AI, Make, ChatGPT API)',
      'Take the Machine Learning Specialization if you want to build AI',
      'Follow AI news sources (The Batch, AI News) to stay current'
    ]
  },
  {
    id: 'prompt-engineering',
    title: 'ChatGPT Prompt Engineering for Developers',
    platform: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    price: 'Free',
    category: 'AI & Tools',
    level: 'Beginner to Intermediate',
    duration: '1 hour',
    rating: '4.7/5',
    desc: 'Short, practical course on writing effective prompts for LLMs. Covers prompting principles, iterative development, and real-world applications.',
    bestFor: 'Developers and power users who want to get 10x more out of ChatGPT/Claude.',
    steps: [
      'Complete the course in one sitting — it is only 1 hour',
      'Practice each prompting technique with your own use cases',
      'Create a personal prompt library for your most common tasks',
      'Experiment with system prompts, role prompting, and chain-of-thought',
      'Apply these techniques to your work immediately'
    ],
    after: [
      'Build custom GPTs or Claude projects for your specific needs',
      'Automate repetitive tasks using AI with proper prompts',
      'Learn to use AI for code generation, writing, and analysis',
      'Explore RAG (Retrieval Augmented Generation) for custom AI apps',
      'Consider the full DeepLearning.AI prompt engineering course'
    ]
  },
  {
    id: 'google-ai-course',
    title: 'Google AI Essentials',
    platform: 'Google',
    url: 'https://www.coursera.org/learn/google-ai-essentials',
    price: 'Free (audit)',
    category: 'AI & Tools',
    level: 'Beginner',
    duration: '5 weeks',
    rating: '4.6/5',
    desc: 'Google\'s official course on AI fundamentals. Covers how AI works, practical applications, responsible AI use, and how to use AI tools effectively.',
    bestFor: 'Professionals who need to understand AI for their careers but don\'t need deep technical knowledge.',
    steps: [
      'Complete one module per week for better retention',
      'Try the hands-on exercises with Google\'s AI tools',
      'Focus on the "responsible AI" module — it is increasingly important',
      'Apply AI concepts to your current role as you learn',
      'Get the Google certificate for your resume'
    ],
    after: [
      'Integrate AI tools into your daily workflow',
      'Explore Google\'s other AI courses for deeper learning',
      'Learn to evaluate AI tools for your organization',
      'Stay updated with Google AI blog and announcements',
      'Consider Google Cloud AI certifications for career growth'
    ]
  },

  /* ===== DATA SCIENCE & ML ===== */
  {
    id: 'elements-of-ai',
    title: 'Elements of AI',
    platform: 'University of Helsinki',
    url: 'https://www.elementsofai.com/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '6 weeks',
    rating: '4.8/5',
    desc: 'The most popular free AI course in the world. Created by the University of Helsinki and Reaktor. No coding required — teaches AI concepts through practical exercises and real-world examples.',
    bestFor: 'Anyone who wants to understand AI fundamentals without writing code. Perfect starting point for non-technical professionals.',
    steps: [
      'Complete one chapter per week for best retention',
      'Do all the interactive exercises — they reinforce concepts',
      'Read the supplementary material links for deeper understanding',
      'Join the Elements of AI community forum for discussions',
      'Complete the final project to earn your certificate'
    ],
    after: [
      'Take the "Introduction to Machine Learning" track next',
      'Explore Python basics for hands-on AI work',
      'Apply AI concepts to your current role or business',
      'Follow AI news to stay current with developments',
      'Consider Harvard CS50 AI for a more technical path'
    ]
  },
  {
    id: 'kaggle-intro-ml',
    title: 'Kaggle — Intro to Machine Learning',
    platform: 'Kaggle',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '4 hours',
    rating: '4.7/5',
    desc: 'Hands-on ML course using real datasets. Learn decision trees, random forests, and model validation. Includes Kaggle competition exercises.',
    bestFor: 'Anyone who wants to actually BUILD ML models, not just learn theory.',
    steps: [
      'Create a free Kaggle account first — you\'ll need it for exercises',
      'Install Python and Jupyter Notebook locally (or use Kaggle\'s kernels)',
      'Complete each exercise in the browser — don\'t skip the coding parts',
      'Submit to a Kaggle competition to experience real ML workflow',
      'Join Kaggle discussions to learn from other data scientists'
    ],
    after: [
      'Take the "Intermediate Machine Learning" course next',
      'Enter a Kaggle competition and aim for top 50%',
      'Learn pandas and numpy for data manipulation',
      'Build a portfolio of ML projects on GitHub',
      'Study statistics and linear algebra for deeper understanding'
    ]
  },
  {
    id: 'kaggle-learn-full',
    title: 'Kaggle Learn — Complete ML Track',
    platform: 'Kaggle',
    url: 'https://www.kaggle.com/learn',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (30+ hours total)',
    rating: '4.8/5',
    desc: 'Full Kaggle learning track covering Python, Pandas, Data Visualization, Feature Engineering, Deep Learning, and ML Explainability. All courses use free GPU notebooks.',
    bestFor: 'Data science learners who want hands-on practice with real datasets and competitions.',
    steps: [
      'Start with Python and Pandas courses — the foundation of data science',
      'Move to Data Visualization (Matplotlib/Seaborn)',
      'Complete Intro to Machine Learning and Intermediate ML',
      'Learn Feature Engineering — this separates good from great models',
      'Enter a Kaggle competition to apply everything you\'ve learned'
    ],
    after: [
      'Enter Kaggle competitions regularly — aim for top 25%',
      'Share your notebooks publicly — build a data science portfolio',
      'Learn XGBoost and LightGBM for gradient boosting',
      'Study Deep Learning with the Kaggle Deep Learning course',
      'Apply for data science roles or freelance projects'
    ]
  },
  {
    id: 'freecodecamp-ml-python',
    title: 'freeCodeCamp — Machine Learning with Python',
    platform: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Intermediate',
    duration: '300 hours',
    rating: '4.7/5',
    desc: 'Comprehensive ML course with 5 certification projects. Covers TensorFlow, neural networks, NLP basics, and reinforcement learning. Earn a verified certificate.',
    bestFor: 'Self-taught developers who want a structured ML path with portfolio projects.',
    steps: [
      'Complete the Python fundamentals section first',
      'Learn TensorFlow basics through the interactive exercises',
      'Build each of the 5 required projects from scratch',
      'Don\'t copy-paste code — type everything yourself',
      'Use the freeCodeCamp forum when you get stuck'
    ],
    after: [
      'Build 3-5 more ML projects for your portfolio',
      'Enter a Kaggle competition with your new skills',
      'Learn PyTorch as an alternative deep learning framework',
      'Study the math behind ML (linear algebra, calculus, statistics)',
      'Apply for ML engineer or data scientist roles'
    ]
  },
  {
    id: 'huggingface-agents',
    title: 'Hugging Face — Agents Course',
    platform: 'Hugging Face',
    url: 'https://huggingface.co/learn/agents-course',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Intermediate',
    duration: '6 weeks',
    rating: '4.8/5',
    desc: 'Cutting-edge course on building AI agents using Hugging Face ecosystem. Covers tool use, RAG, multi-agent systems, and deploying agents to production.',
    bestFor: 'Developers who want to build practical AI agents with the latest open-source tools.',
    steps: [
      'Complete Module 1 (Introduction to Agents) first',
      'Set up your Hugging Face account and API tokens',
      'Follow along with every code example in the exercises',
      'Build the capstone project — it ties everything together',
      'Join the Hugging Face Discord for community support'
    ],
    after: [
      'Build your own AI agent for a specific use case',
      'Explore MCP (Model Context Protocol) for tool integration',
      'Contribute to open-source agent frameworks',
      'Deploy your agent using Hugging Face Spaces',
      'Stay updated with the rapidly evolving agent ecosystem'
    ]
  },
  {
    id: 'huggingface-nlp',
    title: 'Hugging Face — NLP Course',
    platform: 'Hugging Face',
    url: 'https://huggingface.co/learn/nlp-course',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Intermediate to Advanced',
    duration: 'Self-paced (20+ hours)',
    rating: '4.9/5',
    desc: 'The definitive NLP course using Hugging Face Transformers library. Covers tokenization, fine-tuning models, building pipelines, and deploying NLP applications.',
    bestFor: 'ML practitioners who want to master NLP with the Hugging Face ecosystem.',
    steps: [
      'Start with Chapter 1 — understanding the Transformers library',
      'Complete all coding exercises in Google Colab (free GPU)',
      'Learn tokenization deeply — it is the foundation of NLP',
      'Fine-tune a model on your own dataset',
      'Build a complete NLP application for the capstone'
    ],
    after: [
      'Fine-tune LLMs using LoRA/QLoRA for efficiency',
      'Build a RAG application with vector databases',
      'Contribute to Hugging Face open-source projects',
      'Deploy NLP models using Hugging Face Inference API',
      'Explore multimodal models (vision + language)'
    ]
  },
  {
    id: 'mit-ocw',
    title: 'MIT OpenCourseWare — Data Science',
    platform: 'MIT',
    url: 'https://ocw.mit.edu/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Intermediate to Advanced',
    duration: 'Self-paced (semester-length courses)',
    rating: '4.9/5',
    desc: 'Full MIT course materials including lectures, assignments, and exams. World-class data science and machine learning curriculum from one of the top universities.',
    bestFor: 'Serious learners who want university-level depth without paying tuition.',
    steps: [
      'Start with "Introduction to Computational Thinking and Data Science" (6.0002)',
      'Take "Introduction to Computer Science and Programming" (6.0001) if new to Python',
      'Complete all problem sets — they are challenging but essential',
      'Watch the lecture videos on MIT OpenCourseWare',
      'Review the exams to test your understanding'
    ],
    after: [
      'Take MIT\'s Machine Learning course (6.036) next',
      'Work through the MIT 15 Data Science courses for business applications',
      'Read the textbooks recommended in each course',
      'Apply the concepts to real-world projects',
      'Consider MIT MicroMasters for a credential pathway'
    ]
  },
  {
    id: 'mit-15-data-science',
    title: 'MIT — 15 Free Data Science Courses',
    platform: 'MIT OpenLearning',
    url: 'https://openlearning.mit.edu/news/15-free-mit-data-science-courses',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (100+ hours total)',
    rating: '4.8/5',
    desc: 'Curated collection of 15 free MIT courses covering statistics, probability, machine learning, deep learning, and data science applications across disciplines.',
    bestFor: 'Learners who want a comprehensive MIT education in data science at their own pace.',
    steps: [
      'Start with foundational courses in statistics and probability',
      'Move to machine learning courses after mastering the basics',
      'Take courses that align with your career goals (finance, healthcare, etc.)',
      'Complete the hands-on projects in each course',
      'Build a learning plan and follow it consistently'
    ],
    after: [
      'Apply for MIT MicroMasters programs for credentials',
      'Build a portfolio of projects from each course',
      'Contribute to open-source data science tools',
      'Network with other MIT OCW learners',
      'Consider a formal degree program if career requires it'
    ]
  },
  {
    id: 'harvard-cs50-ai',
    title: 'Harvard CS50 — AI with Python',
    platform: 'Harvard/edX',
    url: 'https://cs50.harvard.edu/ai/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Intermediate',
    duration: '7 weeks',
    rating: '4.9/5',
    desc: 'Harvard\'s introduction to AI and machine learning with Python. Covers search algorithms, knowledge representation, neural networks, and natural language processing.',
    bestFor: 'Programmers who want a rigorous, university-quality AI education from Harvard.',
    steps: [
      'Complete CS50x first if you\'re new to Python',
      'Watch all lectures — David Malan is an excellent instructor',
      'Complete every problem set — they are challenging but rewarding',
      'Do the final project — it\'s your capstone AI application',
      'Join the CS50 community for support and discussions'
    ],
    after: [
      'Build an AI application that solves a real problem',
      'Explore deep learning with TensorFlow or PyTorch',
      'Take CS50 Web (full-stack) to build AI-powered web apps',
      'Enter AI competitions (Kaggle, AIcrowd)',
      'Consider Harvard\'s Professional Certificate in CS for credentials'
    ]
  },
  {
    id: 'harvard-cs50x',
    title: 'Harvard CS50x — Introduction to Computer Science',
    platform: 'Harvard/edX',
    url: 'https://cs50.harvard.edu/x/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '11 weeks',
    rating: '4.9/5',
    desc: 'Harvard\'s legendary intro CS course. Covers algorithms, data structures, web development, Python, SQL, and more. The gold standard for learning to program.',
    bestFor: 'Complete beginners who want a world-class foundation in computer science.',
    steps: [
      'Register for free on edX — you get access to all materials',
      'Watch the lectures weekly — David Malan makes complex topics clear',
      'Complete all 10 problem sets — they build progressively',
      'Use the CS50 IDE (online) or set up VS Code locally',
      'Join the CS50 Discord for help and community'
    ],
    after: [
      'Take CS50 AI (with Python) for AI/ML focus',
      'Take CS50 Web for full-stack development',
      'Build personal projects applying what you learned',
      'Contribute to open source on GitHub',
      'Apply for software engineering roles or bootcamps'
    ]
  },
  {
    id: 'uc-berkeley-data-8',
    title: 'UC Berkeley — Data 8: Foundations of Data Science',
    platform: 'UC Berkeley',
    url: 'https://data8.org/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '15 weeks',
    rating: '4.8/5',
    desc: 'Berkeley\'s introductory data science course combining coding, statistics, and critical thinking. Uses Python and Jupyter notebooks with real-world datasets.',
    bestFor: 'Students who want a university-quality intro to data science from a top public university.',
    steps: [
      'Follow the course on data8.org — all materials are free',
      'Install Python and Jupyter Notebook locally (or use Berkeley\'s binder)',
      'Complete all homework assignments — they use real datasets',
      'Attend the lectures or watch recordings online',
      'Use the Data 8 textbook (Inferential Thinking) for reference'
    ],
    after: [
      'Take Data 100 (Principles of Data Science) next',
      'Learn SQL for database querying',
      'Enter Kaggle competitions to practice your skills',
      'Build a portfolio of data analysis projects',
      'Apply for data analyst internships or entry-level roles'
    ]
  },
  {
    id: 'stanford-ml-specialization',
    title: 'Stanford — Machine Learning Specialization',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner to Intermediate',
    duration: '3 months',
    rating: '4.9/5',
    desc: 'Andrew Ng\'s updated ML course from Stanford. Covers supervised learning, unsupervised learning, neural networks, and decision trees with practical Python implementations.',
    bestFor: 'Anyone who wants the best possible introduction to machine learning from the world\'s most popular ML instructor.',
    steps: [
      'Complete Course 1 (Supervised ML) first — it is the foundation',
      'Use Python with NumPy, pandas, and scikit-learn',
      'Implement every algorithm from scratch before using libraries',
      'Complete all coding assignments — they reinforce learning',
      'Watch Andrew Ng\'s supplementary videos for intuition building'
    ],
    after: [
      'Take the Deep Learning Specialization next',
      'Build ML projects using scikit-learn and TensorFlow',
      'Enter Kaggle competitions with your new skills',
      'Read ML research papers to stay current',
      'Apply for ML engineer or data scientist roles'
    ]
  },
  {
    id: 'google-ml-crash-course',
    title: 'Google — Machine Learning Crash Course',
    platform: 'Google',
    url: 'https://developers.google.com/machine-learning/crash-course',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Intermediate',
    duration: '15 hours',
    rating: '4.7/5',
    desc: 'Google\'s fast-paced introduction to ML. Covers neural networks, training models, and real-world ML systems. Uses TensorFlow and real Google data.',
    bestFor: 'Developers who want a quick, practical ML education from Google\'s ML experts.',
    steps: [
      'Complete the Python prerequisites first if needed',
      'Watch all videos at 1x speed — they pack in a lot of information',
      'Complete the programming exercises in TensorFlow',
      'Focus on the "ML Systems" module — production ML is different',
      'Review the glossary of ML terms for quick reference'
    ],
    after: [
      'Build a TensorFlow project using Google\'s examples',
      'Take the full Google Cloud ML courses for deeper learning',
      'Apply ML to your current work or projects',
      'Explore Google Cloud Vertex AI for production ML',
      'Get Google Cloud ML certification for career growth'
    ]
  },
  {
    id: 'freeacademy-python-ai',
    title: 'FreeAcademy — Python for AI & Data Science',
    platform: 'FreeAcademy',
    url: 'https://freeacademy.ai/courses/python-for-ai-data-science',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: 'Self-paced (40+ hours)',
    rating: '4.5/5',
    desc: 'Comprehensive Python course designed specifically for AI and data science. Covers Python fundamentals, data structures, NumPy, pandas, and visualization.',
    bestFor: 'Beginners who want to learn Python specifically for data science applications.',
    steps: [
      'Start with Python basics — variables, loops, functions',
      'Learn data structures (lists, dicts, sets) thoroughly',
      'Master NumPy for numerical computing',
      'Learn pandas for data manipulation and analysis',
      'Practice with real datasets from Kaggle'
    ],
    after: [
      'Take a machine learning course to apply your Python skills',
      'Build data analysis projects with real datasets',
      'Learn SQL for database querying',
      'Explore visualization libraries (Matplotlib, Seaborn, Plotly)',
      'Apply for data analyst or junior data scientist roles'
    ]
  },
  {
    id: 'simplilearn-data-science',
    title: 'Simplilearn — Data Science Course (YouTube)',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=_kA4hMNFPnU',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '8+ hours',
    rating: '4.5/5',
    desc: 'Comprehensive data science tutorial covering Python, statistics, machine learning, and real-world projects. Great for getting an overview before diving into specific courses.',
    bestFor: 'Visual learners who prefer video tutorials and want a broad data science overview.',
    steps: [
      'Watch at 1.5x speed to get the overview quickly',
      'Take notes on key concepts and tools mentioned',
      'Pause and code along with the examples',
      'Bookmark related videos for deeper dives on each topic',
      'Use this as a roadmap to guide your learning path'
    ],
    after: [
      'Pick specific courses from this list for deeper learning',
      'Practice with the tools and libraries mentioned',
      'Build a project using the skills covered',
      'Join Simplilearn\'s community for support',
      'Consider their paid bootcamp if you want structured learning'
    ]
  },
  {
    id: 'intellipaat-data-science',
    title: 'Intellipaat — Data Science Full Course (YouTube)',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=th-f5qO389A',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '10+ hours',
    rating: '4.5/5',
    desc: 'Full data science course on YouTube covering Python, SQL, machine learning, deep learning, and real-world projects. Good for a comprehensive first pass.',
    bestFor: 'Self-learners who want a free, comprehensive data science overview in video format.',
    steps: [
      'Watch the first 2 hours to understand the landscape',
      'Skip to sections relevant to your current learning needs',
      'Pause and code along with the hands-on portions',
      'Take notes on the tools and libraries introduced',
      'Use this as a supplement, not your primary learning source'
    ],
    after: [
      'Enroll in structured courses (Kaggle, Coursera, or fast.ai)',
      'Build your own projects using the skills learned',
      'Join data science communities for networking',
      'Create a learning plan with specific milestones',
      'Apply for entry-level data science positions'
    ]
  },
  {
    id: 'ibm-data-science',
    title: 'IBM Data Science Professional Certificate',
    platform: 'Coursera',
    url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner to Intermediate',
    duration: '3 months',
    rating: '4.6/5',
    desc: 'Comprehensive data science program covering Python, SQL, data visualization, machine learning, and capstone project. IBM-branded certificate.',
    bestFor: 'Career changers who want a structured path into data science with a recognized certificate.',
    steps: [
      'Complete courses in order — they build on each other',
      'Use IBM Watson Studio (free tier) for hands-on practice',
      'Build a strong GitHub portfolio with each course\'s projects',
      'Focus on the capstone project — it is your portfolio centerpiece',
      'Network with other learners in the Coursera discussion forums'
    ],
    after: [
      'Build 3-5 end-to-end data science projects',
      'Learn Tableau or Power BI for data visualization',
      'Practice SQL daily — it is the most in-demand data skill',
      'Apply for data analyst or junior data scientist roles',
      'Consider AWS/GCP certifications for cloud data skills'
    ]
  },
  {
    id: 'applied-data-science-umich',
    title: 'Applied Data Science with Python — University of Michigan',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/data-science-python',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner to Intermediate',
    duration: '5 months',
    rating: '4.6/5',
    desc: 'University of Michigan\'s data science specialization using Python. Covers data manipulation, visualization, machine learning, NLP, and social network analysis.',
    bestFor: 'Learners who want university-quality data science education with hands-on Python projects.',
    steps: [
      'Start with "Introduction to Data Science in Python" course',
      'Master pandas and NumPy from the first course',
      'Complete the visualization course with Matplotlib and Seaborn',
      'Take the machine learning course with scikit-learn',
      'Build the capstone project for your portfolio'
    ],
    after: [
      'Build 3-5 data science projects using Python',
      'Learn advanced ML techniques (ensemble methods, deep learning)',
      'Practice SQL for database querying',
      'Build a portfolio website showcasing your projects',
      'Apply for data analyst or data scientist roles'
    ]
  },
  {
    id: 'johns-hopkins-data-science',
    title: 'Johns Hopkins — Data Science Specialization',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/data-science',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner to Advanced',
    duration: '10 months',
    rating: '4.5/5',
    desc: 'Comprehensive 10-course specialization covering R programming, statistical inference, regression, machine learning, and capstone project. One of the most complete data science programs.',
    bestFor: 'Serious learners who want a thorough, university-level data science education.',
    steps: [
      'Start with "The Data Scientist\'s Toolbox" for setup',
      'Learn R programming from the second course',
      'Complete all courses in order — they build progressively',
      'Focus on the capstone project — it demonstrates your skills',
      'Use GitHub to track all your course projects'
    ],
    after: [
      'Learn Python as a second language (R + Python is powerful)',
      'Build a portfolio with all course projects',
      'Practice statistical thinking in daily life',
      'Apply for data analyst or biostatistician roles',
      'Consider the Google Data Analytics Certificate for R-specific skills'
    ]
  },
  {
    id: 'google-foundations-data-science',
    title: 'Google — Foundations of Data Science',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/foundations-data-science',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '4 weeks',
    rating: '4.6/5',
    desc: 'Google\'s introductory data science course. Covers data analysis fundamentals, data-driven decision making, and basic statistical concepts. Part of the Google Data Analytics Certificate.',
    bestFor: 'Beginners who want to understand data science before committing to a full program.',
    steps: [
      'Complete the course in 2-3 weeks for focused learning',
      'Practice with Google\'s provided datasets and tools',
      'Focus on the "data-driven decision making" module',
      'Take notes on statistical concepts for future reference',
      'Continue with the full Google Data Analytics Certificate'
    ],
    after: [
      'Complete the full Google Data Analytics Certificate',
      'Learn SQL for database querying',
      'Master Excel/Google Sheets for data analysis',
      'Build a portfolio with real-world data projects',
      'Apply for data analyst entry-level positions'
    ]
  },
  {
    id: 'google-intro-python',
    title: 'Google — Introduction to Python',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/python',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '8 weeks',
    rating: '4.7/5',
    desc: 'Google\'s official Python course covering fundamentals through intermediate topics. Clean, well-structured curriculum from Google engineers. Great foundation for data science.',
    bestFor: 'Absolute beginners who want to learn Python from Google\'s perspective.',
    steps: [
      'Complete one module per week for best retention',
      'Type all code examples yourself — don\'t copy-paste',
      'Complete all quizzes and practice exercises',
      'Build small projects after each major topic',
      'Join Google\'s Python community for support'
    ],
    after: [
      'Take Google\'s Data Analysis with Python course',
      'Learn pandas and NumPy for data science',
      'Build a web app with Flask or Django',
      'Explore automation with Python scripts',
      'Apply Python skills to your current role or projects'
    ]
  },
  {
    id: 'google-what-is-data-science',
    title: 'Google — What is Data Science?',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/what-is-datascience',
    price: 'Free (audit)',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '1 week',
    rating: '4.6/5',
    desc: 'Quick introduction to data science — what it is, how it works, and what data scientists do. Perfect first step before diving into technical courses.',
    bestFor: 'Curious professionals who want to understand data science before committing to learning it.',
    steps: [
      'Complete the course in one sitting — it is very short',
      'Take notes on the different roles in data science',
      'Identify which aspect interests you most',
      'Use this to decide which learning path to take next',
      'Share what you learned with your team or network'
    ],
    after: [
      'Take the full Google Data Analytics Certificate',
      'Learn Python or R based on your interests',
      'Start with SQL — the most accessible data skill',
      'Explore data visualization tools (Tableau, Power BI)',
      'Connect with data science communities for networking'
    ]
  },
  {
    id: 'fast-ai',
    title: 'fast.ai — Practical Deep Learning for Coders',
    platform: 'fast.ai',
    url: 'https://course.fast.ai',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Intermediate',
    duration: '7 weeks',
    rating: '4.9/5',
    desc: 'The most practical deep learning course available. Jeremy Howard teaches top-down learning — build real models first, understand theory later. State-of-the-art results from day one.',
    bestFor: 'Programmers who want to build production-quality deep learning models quickly.',
    steps: [
      'Watch each lesson twice — first for overview, second for details',
      'Run every code cell yourself — don\'t just watch',
      'Complete the homework assignments — they are essential',
      'Use Kaggle notebooks for free GPU access',
      'Join the fast.ai forums for help and inspiration'
    ],
    after: [
      'Build a deep learning project solving a real problem',
      'Enter a Kaggle competition with your new skills',
      'Learn PyTorch in depth (fast.ai uses it extensively)',
      'Read research papers related to your interests',
      'Consider a Masters in ML/AI if you want to go academic'
    ]
  },
  {
    id: 'google-cloud-skills-boost',
    title: 'Google Cloud Skills Boost — Data Science',
    platform: 'Google Cloud',
    url: 'https://cloudskillsboost.google/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (100+ hours)',
    rating: '4.7/5',
    desc: 'Google Cloud\'s hands-on learning platform with labs, courses, and learning paths for data science and ML on Google Cloud. Real cloud environments for practice.',
    bestFor: 'Data scientists who want to deploy ML models on Google Cloud infrastructure.',
    steps: [
      'Start with "Google Cloud Fundamentals: Core Infrastructure"',
      'Take the "Data Science on Google Cloud" learning path',
      'Complete the hands-on labs — they use real Google Cloud resources',
      'Focus on BigQuery for large-scale data analysis',
      'Learn Vertex AI for ML model deployment'
    ],
    after: [
      'Get Google Cloud Professional Data Engineer certification',
      'Build ML pipelines using Google Cloud Dataflow',
      'Deploy models using Vertex AI Prediction',
      'Optimize costs — cloud data science can get expensive',
      'Apply for Google Cloud data science roles'
    ]
  },
  {
    id: 'aws-free-tech-courses',
    title: 'AWS — Free Tech Courses (Data Science)',
    platform: 'AWS Skill Builder',
    url: 'https://explore.skillbuilder.aws/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (50+ hours)',
    rating: '4.6/5',
    desc: 'Amazon Web Services free training for data science and ML on AWS. Covers SageMaker, Athena, Glue, and building ML models in the cloud.',
    bestFor: 'Data professionals who want to build ML skills on AWS infrastructure.',
    steps: [
      'Start with "AWS Cloud Practitioner Essentials" for cloud basics',
      'Take "Machine Learning Foundations" course',
      'Complete the hands-on labs in AWS Skill Builder',
      'Focus on SageMaker for building and deploying ML models',
      'Practice with the free tier of AWS services'
    ],
    after: [
      'Get AWS Certified Machine Learning — Specialty',
      'Build ML pipelines using SageMaker',
      'Use Athena for serverless SQL queries on S3 data',
      'Deploy models as real-time endpoints',
      'Apply for AWS data engineer or ML engineer roles'
    ]
  },
  {
    id: 'microsoft-learn-ai',
    title: 'Microsoft Learn — AI on Azure',
    platform: 'Microsoft',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner to Intermediate',
    duration: 'Self-paced (30+ hours)',
    rating: '4.7/5',
    desc: 'Microsoft\'s official training path for AI on Azure. Covers Azure Cognitive Services, ML Studio, and building AI solutions in the Microsoft ecosystem.',
    bestFor: 'Professionals in Microsoft-centric organizations who want to implement AI on Azure.',
    steps: [
      'Complete the "Get started with AI on Azure" learning path',
      'Set up a free Azure account for hands-on practice',
      'Focus on Azure Machine Learning Studio',
      'Learn Azure Cognitive Services for pre-built AI capabilities',
      'Complete the Microsoft Learn exercises and assessments'
    ],
    after: [
      'Get Azure Data Scientist Associate certification',
      'Build ML models using Azure ML Designer',
      'Deploy models as Azure web services',
      'Integrate AI into existing Microsoft applications',
      'Explore Azure OpenAI Service for GPT models'
    ]
  },
  {
    id: 'great-learning-data-science',
    title: 'Great Learning Academy — Data Science Foundations',
    platform: 'Great Learning',
    url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/data-science-foundations',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: 'Self-paced (20+ hours)',
    rating: '4.5/5',
    desc: 'Free data science course covering Python, statistics, data visualization, and machine learning fundamentals. Includes hands-on projects and a certificate of completion.',
    bestFor: 'Beginners who want a structured, free data science course with a certificate.',
    steps: [
      'Start with Python fundamentals module',
      'Complete the statistics section — it is the foundation',
      'Learn data visualization with Matplotlib and Seaborn',
      'Take the machine learning intro module',
      'Complete the final project for your certificate'
    ],
    after: [
      'Take more advanced Great Learning courses',
      'Build a portfolio with real-world projects',
      'Enter Kaggle competitions to test your skills',
      'Learn SQL for data querying',
      'Apply for data analyst entry-level positions'
    ]
  },
  {
    id: 'free-academy-python-ai',
    title: 'FreeAcademy — Python for AI & Data Science',
    platform: 'FreeAcademy',
    url: 'https://freeacademy.ai/courses/python-for-ai-data-science',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: 'Self-paced (40+ hours)',
    rating: '4.5/5',
    desc: 'Comprehensive Python course designed specifically for AI and data science. Covers Python fundamentals, data structures, NumPy, pandas, and visualization libraries.',
    bestFor: 'Beginners who want to learn Python specifically for data science applications.',
    steps: [
      'Start with Python basics — variables, loops, functions',
      'Learn data structures (lists, dicts, sets) thoroughly',
      'Master NumPy for numerical computing',
      'Learn pandas for data manipulation and analysis',
      'Practice with real datasets from Kaggle'
    ],
    after: [
      'Take a machine learning course to apply your Python skills',
      'Build data analysis projects with real datasets',
      'Learn SQL for database querying',
      'Explore visualization libraries (Matplotlib, Seaborn, Plotly)',
      'Apply for data analyst or junior data scientist roles'
    ]
  },

  /* ===== DESIGN & CREATIVE ===== */
  {
    id: 'google-ux-design',
    title: 'Google UX Design Professional Certificate',
    platform: 'Coursera',
    url: 'https://www.coursera.org/professional-certificates/google-ux-design',
    price: 'Free (audit)',
    category: 'Design & Creative',
    level: 'Beginner',
    duration: '6 months',
    rating: '4.8/5',
    desc: 'Google\'s official UX design course. Learn the entire design process: empathize, define, ideate, prototype, test. Build a portfolio with 3 projects.',
    bestFor: 'Aspiring UX designers who want Google\'s curriculum and certificate.',
    steps: [
      'Complete all 7 courses in sequence — they build a complete skill set',
      'Use Figma (free) for all design exercises — it is the industry standard',
      'Document your design process thoroughly — this becomes your portfolio',
      'Get feedback from the Coursera peer review system',
      'Study the Google Material Design guidelines'
    ],
    after: [
      'Build a portfolio website showcasing your 3 course projects',
      'Practice design challenges daily (Daily UI, UX Challenges)',
      'Join UX communities (ADPList for mentorship, UX Collective)',
      'Learn basic HTML/CSS to communicate with developers',
      'Apply for junior UX designer or UX researcher roles'
    ]
  },

  /* ===== ADDITIONAL TRENDING COURSES ===== */
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    platform: 'Google / Coursera',
    category: 'AI & Tools',
    level: 'Beginner',
    duration: 'Self-paced (approx. 7 hours)',
    price: 'Free (audit)',
    rating: '4.8',
    url: 'https://www.coursera.org/learn/google-ai-essentials',
    desc: 'Google\'s official introduction to AI — what AI is, how it works, and how to use it responsibly. Covers prompt engineering, AI tools, and ethical AI use.',
    bestFor: 'Anyone who wants to understand AI basics and use AI tools effectively in their work.',
    steps: [
      'Complete Module 1: Introduction to AI',
      'Learn how AI works in Module 2',
      'Practice prompt engineering in Module 3',
      'Explore AI tools for productivity in Module 4',
      'Complete the final project on responsible AI use'
    ],
    after: [
      'Take more advanced Google AI courses',
      'Practice with ChatGPT and Claude for real tasks',
      'Explore AI for your specific industry',
      'Learn about AI ethics and bias',
      'Build AI-powered projects'
    ]
  },
  {
    id: 'meta-front-end-developer',
    title: 'Meta Front-End Developer Professional Certificate',
    platform: 'Meta / Coursera',
    category: 'Web Development',
    level: 'Beginner',
    duration: 'Self-paced (7 months)',
    price: 'Free (audit)',
    rating: '4.7',
    url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    desc: 'Meta\'s comprehensive front-end program — HTML, CSS, JavaScript, React, version control, and UI/UX design principles.',
    bestFor: 'Aspiring front-end developers who want a structured path from zero to job-ready.',
    steps: [
      'Start with Introduction to Front-End Development',
      'Learn HTML and CSS fundamentals',
      'Master JavaScript and React',
      'Build responsive design projects',
      'Complete the capstone portfolio project'
    ],
    after: [
      'Build 5 portfolio projects to showcase skills',
      'Learn TypeScript for better code quality',
      'Explore Next.js for server-side rendering',
      'Practice with coding challenges on LeetCode',
      'Apply for junior front-end positions'
    ]
  },
  {
    id: 'deep-learning-ai-python',
    title: 'Deep Learning with Python',
    platform: 'freeCodeCamp',
    category: 'AI & Tools',
    level: 'Intermediate',
    duration: 'Self-paced (12+ hours)',
    price: 'Free',
    rating: '4.6',
    url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/',
    desc: 'freeCodeCamp\'s machine learning certification — TensorFlow, neural networks, NLP, reinforcement learning, and real-world projects.',
    bestFor: 'Developers who want to build deep learning models and earn a recognized certification.',
    steps: [
      'Complete the TensorFlow beginner course first',
      'Build the rock-paper-scissors classifier',
      'Learn neural networks fundamentals',
      'Complete the cat-and-dog image classifier',
      'Finish all 5 certification projects'
    ],
    after: [
      'Build custom image classifiers for specific domains',
      'Explore GANs and advanced architectures',
      'Deploy models with Flask or FastAPI',
      'Participate in Kaggle competitions',
      'Contribute to open-source ML projects'
    ]
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner Essentials',
    platform: 'AWS',
    category: 'Cloud Computing',
    level: 'Beginner',
    duration: 'Self-paced (6 hours)',
    price: 'Free',
    rating: '4.7',
    url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
    desc: 'AWS\'s official cloud computing introduction — cloud concepts, AWS services, security, pricing, and support.',
    bestFor: 'Anyone starting their cloud journey or needing AWS fundamentals for their role.',
    steps: [
      'Complete all 9 modules sequentially',
      'Take notes on key AWS services (EC2, S3, RDS)',
      'Understand the shared responsibility model',
      'Review pricing and support models',
      'Take the practice exam before the real one'
    ],
    after: [
      'Take the AWS Cloud Practitioner certification exam',
      'Explore AWS Free Tier for hands-on practice',
      'Move to AWS Solutions Architect Associate',
      'Build a simple web app on AWS',
      'Learn Infrastructure as Code with CloudFormation'
    ]
  },
  {
    id: 'ibm-data-science',
    title: 'IBM Data Science Professional Certificate',
    platform: 'IBM / Coursera',
    category: 'Data Science',
    level: 'Beginner',
    duration: 'Self-paced (3 months)',
    price: 'Free (audit)',
    rating: '4.6',
    url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    desc: 'IBM\'s comprehensive data science program — Python, SQL, data visualization, machine learning, and a capstone project.',
    bestFor: 'Career changers who want a structured path into data science from any background.',
    steps: [
      'Start with What is Data Science?',
      'Learn Python for Data Science',
      'Master SQL and relational databases',
      'Complete the data visualization course',
      'Finish the capstone project with real data'
    ],
    after: [
      'Build a portfolio of 5+ data science projects',
      'Participate in Kaggle competitions',
      'Learn advanced machine learning techniques',
      'Explore deep learning with TensorFlow',
      'Apply for data science internships or entry-level roles'
    ]
  },
  {
    id: 'microsoft-ai-fundamentals',
    title: 'Microsoft AI Fundamentals (AI-900)',
    platform: 'Microsoft Learn',
    category: 'AI & Tools',
    level: 'Beginner',
    duration: 'Self-paced (5 hours)',
    price: 'Free',
    rating: '4.7',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/',
    desc: 'Microsoft\'s AI fundamentals — machine learning, computer vision, NLP, and generative AI on Azure.',
    bestFor: 'Professionals who need to understand AI concepts and Microsoft\'s AI services.',
    steps: [
      'Complete the AI overview module',
      'Learn about machine learning fundamentals',
      'Explore computer vision and NLP on Azure',
      'Understand generative AI concepts',
      'Take the practice assessment'
    ],
    after: [
      'Take the AI-900 certification exam',
      'Explore Azure AI services hands-on',
      'Build an AI-powered app on Azure',
      'Learn about responsible AI practices',
      'Move to Azure Data Scientist Associate path'
    ]
  },
  {
    id: 'hubspot-content-marketing',
    title: 'Content Marketing Certification',
    platform: 'HubSpot Academy',
    category: 'SEO & Marketing',
    level: 'Beginner',
    duration: 'Self-paced (4 hours)',
    price: 'Free',
    rating: '4.6',
    url: 'https://academy.hubspot.com/courses/content-marketing',
    desc: 'HubSpot\'s content marketing course — storytelling, content creation, repurposing, and promotion strategies.',
    bestFor: 'Marketers and business owners who want to attract customers through valuable content.',
    steps: [
      'Complete all lessons and take notes',
      'Create a content strategy for a real business',
      'Practice the storytelling framework',
      'Learn content repurposing techniques',
      'Pass the certification exam'
    ],
    after: [
      'Implement a content calendar for your business',
      'Start a blog with SEO-optimized posts',
      'Repurpose content across social media',
      'Take HubSpot\'s SEO certification next',
      'Track content performance with analytics'
    ]
  },
  {
    id: 'google-analytics-certification',
    title: 'Google Analytics Certification',
    platform: 'Google Skillshop',
    category: 'SEO & Marketing',
    level: 'Beginner',
    duration: 'Self-paced (5 hours)',
    price: 'Free',
    rating: '4.7',
    url: 'https://skillshop.exceedlms.com/student/catalog/list?category_ids=6450',
    desc: 'Google\'s official GA4 certification — measurement, reporting, audience insights, and conversion tracking.',
    bestFor: 'Marketers, analysts, and website owners who need to measure and understand their data.',
    steps: [
      'Complete the GA4 fundamentals course',
      'Set up a GA4 property for practice',
      'Learn about events and conversions',
      'Master audience building and segments',
      'Take the certification exam'
    ],
    after: [
      'Set up GA4 on your own website',
      'Create custom dashboards and reports',
      'Learn about Google Tag Manager',
      'Implement conversion tracking',
      'Explore Google Data Studio for visualization'
    ]
  },
  {
    id: 'css-w3schools',
    title: 'CSS Tutorial',
    platform: 'W3Schools',
    category: 'Web Development',
    level: 'Beginner',
    duration: 'Self-paced (3-5 days)',
    price: 'Free',
    rating: '4.5',
    url: 'https://www.w3schools.com/css/',
    desc: 'W3Schools comprehensive CSS tutorial — selectors, box model, flexbox, grid, animations, and responsive design.',
    bestFor: 'Beginners who want to learn CSS with interactive examples and exercises.',
    steps: [
      'Complete the CSS Basics section',
      'Learn Flexbox and Grid thoroughly',
      'Practice with the interactive editor',
      'Build 3 responsive layouts',
      'Learn CSS animations and transitions'
    ],
    after: [
      'Build a complete responsive website',
      'Learn CSS preprocessors (Sass/LESS)',
      'Explore CSS frameworks (Tailwind, Bootstrap)',
      'Study CSS architecture (BEM methodology)',
      'Create CSS animations portfolio'
    ]
  },
  {
    id: 'javascript-w3schools',
    title: 'JavaScript Tutorial',
    platform: 'W3Schools',
    category: 'Web Development',
    level: 'Beginner',
    duration: 'Self-paced (1-2 weeks)',
    price: 'Free',
    rating: '4.5',
    url: 'https://www.w3schools.com/js/',
    desc: 'W3Schools JavaScript tutorial — variables, functions, DOM manipulation, events, and ES6+ features.',
    bestFor: 'Beginners who want interactive JavaScript examples and quick reference.',
    steps: [
      'Complete the JS Basics section',
      'Learn DOM manipulation',
      'Practice with interactive examples',
      'Build a calculator project',
      'Learn about async/await and promises'
    ],
    after: [
      'Build 5 JavaScript projects',
      'Learn a framework (React, Vue, or Angular)',
      'Explore Node.js for backend',
      'Study design patterns',
      'Practice with coding challenges'
    ]
  },
  {
    id: 'python-free-codecamp',
    title: 'Scientific Computing with Python',
    platform: 'freeCodeCamp',
    category: 'Web Development',
    level: 'Beginner',
    duration: 'Self-paced (300+ hours)',
    price: 'Free',
    rating: '4.6',
    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    desc: 'freeCodeCamp\'s Python certification — Python basics, data structures, algorithms, and 5 portfolio projects.',
    bestFor: 'Anyone who wants to learn Python through hands-on projects and earn a free certification.',
    steps: [
      'Start with Learn Python by Building a Game',
      'Complete the budget app project',
      'Build the polygon area calculator',
      'Create the time series analysis project',
      'Finish the probability calculator'
    ],
    after: [
      'Build more Python projects for your portfolio',
      'Learn a web framework (Django or Flask)',
      'Explore data science with pandas',
      'Contribute to open-source Python projects',
      'Apply for Python developer roles'
    ]
  },
  /* ===== MORE COURSES ===== */
  {
    id: 'react-docs',
    title: 'React Official Tutorial',
    platform: 'Meta',
    url: 'https://react.dev/learn',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner to Intermediate',
    duration: 'Self-paced (20+ hours)',
    rating: '4.9/5',
    desc: 'The official React tutorial from the team that built it. Learn components, hooks, state management, and modern React patterns.',
    bestFor: 'Anyone who wants to learn React from the source — the most in-demand frontend framework.',
    steps: [
      'Start with "Thinking in React" — understand the component mental model',
      'Build the tic-tac-toe tutorial step by step — hands-on practice',
      'Learn useState and useEffect hooks — the core of React state management',
      'Build a small project: a todo app or weather dashboard',
      'Explore the official docs for advanced patterns like context and reducers'
    ],
    after: [
      'Build a portfolio project with React',
      'Learn Next.js for server-side rendering and full-stack React',
      'Apply for frontend developer roles',
      'Contribute to open-source React projects'
    ]
  },
  {
    id: 'python-free-codecamp',
    title: 'Scientific Computing with Python',
    platform: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner',
    duration: '300 hours',
    rating: '4.7/5',
    desc: 'Full Python course from freeCodeCamp — data structures, algorithms, object-oriented programming, and certification.',
    bestFor: 'Complete beginners who want a structured Python path with a certificate.',
    steps: [
      'Complete the first 5 basic Python projects to learn fundamentals',
      'Work through the data structures section — lists, dictionaries, tuples',
      'Build the 5 certification projects: arithmetic formatter, time calculator, etc.',
      'Learn object-oriented programming with the final projects',
      'Submit your projects to earn the freeCodeCamp certification'
    ],
    after: [
      'Apply the Python skills to data science or web development',
      'Learn Flask or Django to build web apps',
      'Automate boring tasks with Python scripts',
      'Start contributing to open-source Python projects'
    ]
  },
  {
    id: 'tailwind-css',
    title: 'Tailwind CSS Crash Course',
    platform: 'Traversy Media',
    url: 'https://www.youtube.com/watch?v=UBO-6LuPm1M',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner',
    duration: '1.5 hours',
    rating: '4.8/5',
    desc: 'Learn the most popular utility-first CSS framework. Build responsive layouts fast without writing custom CSS.',
    bestFor: 'Developers who want to build beautiful UIs quickly without CSS headaches.',
    steps: [
      'Watch the full crash course and code along',
      'Install Tailwind in a new project using the official CLI',
      'Build a landing page using only Tailwind utility classes',
      'Practice responsive design with breakpoint prefixes (sm:, md:, lg:)',
      'Customize the default theme to match your design system'
    ],
    after: [
      'Build a portfolio site with Tailwind',
      'Explore Tailwind UI components for inspiration',
      'Combine with React or Vue for dynamic UIs',
      'Add Tailwind to your freelance toolkit'
    ]
  },
  {
    id: 'deep-learning-specialization',
    title: 'Deep Learning Specialization',
    platform: 'Coursera / DeepLearning.AI',
    url: 'https://www.coursera.org/specializations/deep-learning',
    price: 'Free to Audit',
    category: 'AI & Tools',
    level: 'Intermediate',
    duration: '3 months (10 hrs/week)',
    rating: '4.9/5',
    desc: 'Andrew Ng\'s flagship course — neural networks, CNNs, RNNs, LSTMs, and deployment. The gold standard for deep learning education.',
    bestFor: 'Anyone serious about mastering deep learning — the most respected AI course online.',
    steps: [
      'Start with Course 1: Neural Networks and Deep Learning',
      'Complete Course 2: Improving Deep Neural Networks — regularization, optimization',
      'Take Course 3: Structuring Machine Learning Projects',
      'Work through Course 4: Convolutional Neural Networks',
      'Finish with Course 5: Sequence Models — RNNs, LSTMs, Transformers'
    ],
    after: [
      'Build and deploy a deep learning model end-to-end',
      'Specialize in computer vision or NLP',
      'Apply for ML engineer roles',
      'Publish a project on GitHub or Kaggle'
    ]
  },
  {
    id: 'kaggle-intro-ml',
    title: 'Intro to Machine Learning',
    platform: 'Kaggle',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    price: 'Free',
    category: 'AI & Tools',
    level: 'Beginner',
    duration: '3 hours',
    rating: '4.7/5',
    desc: 'Kaggle\'s beginner-friendly ML course — decision trees, random forests, and your first ML model in 7 lessons.',
    bestFor: 'Complete beginners who want to build their first ML model in an afternoon.',
    steps: [
      'Complete all 7 micro-courses in order',
      'Use the Kaggle notebook environment — no setup required',
      'Submit your first prediction to a Kaggle competition',
      'Try the "Intermediate Machine Learning" course next',
      'Explore the Kaggle dataset library for practice data'
    ],
    after: [
      'Join a Kaggle competition and improve your ranking',
      'Take the intermediate and advanced Kaggle courses',
      'Build a portfolio of ML projects',
      'Explore deep learning with TensorFlow or PyTorch'
    ]
  },
  {
    id: 'google-cloud-free',
    title: 'Google Cloud Skills Boost',
    platform: 'Google Cloud',
    url: 'https://cloudskillsboost.google/',
    price: 'Free',
    category: 'Cloud Computing',
    level: 'Beginner to Advanced',
    duration: 'Self-paced (100+ hours)',
    rating: '4.6/5',
    desc: 'Google\'s official cloud training platform — hands-on labs for BigQuery, Compute Engine, Kubernetes, and ML on GCP.',
    bestFor: 'Anyone wanting to learn cloud computing with hands-on labs, not just theory.',
    steps: [
      'Start with "Google Cloud Fundamentals: Core Infrastructure"',
      'Take the "Cloud Engineering" learning path',
      'Complete the hands-on labs — they give you real GCP access',
      'Practice with the Cloud Skills Boost sandbox environment',
      'Aim for the Google Cloud certification exam'
    ],
    after: [
      'Get Google Cloud certified',
      'Build and deploy apps on GCP',
      'Apply for cloud engineer roles',
      'Learn Kubernetes with GKE'
    ]
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner Essentials',
    platform: 'AWS',
    url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
    price: 'Free',
    category: 'Cloud Computing',
    level: 'Beginner',
    duration: '6 hours',
    rating: '4.6/5',
    desc: 'AWS\'s official entry-level course — cloud concepts, security, pricing, and the AWS ecosystem. Prepares you for the Cloud Practitioner certification.',
    bestFor: 'Complete beginners who want to understand cloud computing and get AWS certified.',
    steps: [
      'Complete all modules in order — take notes on key services',
      'Focus on IAM, EC2, S3, RDS, and Lambda — the core services',
      'Understand the shared responsibility model for security',
      'Review the AWS Well-Architected Framework',
      'Schedule the Cloud Practitioner certification exam'
    ],
    after: [
      'Take the AWS Cloud Practitioner certification exam',
      'Move to the Solutions Architect Associate path',
      'Build a simple web app on AWS',
      'Explore serverless with AWS Lambda'
    ]
  },
  {
    id: 'microsoft-learn-azure',
    title: 'Azure Fundamentals (AZ-900)',
    platform: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/paths/azure-fundamentals-describe-cloud-concepts/',
    price: 'Free',
    category: 'Cloud Computing',
    level: 'Beginner',
    duration: '5 hours',
    rating: '4.5/5',
    desc: 'Microsoft\'s official Azure fundamentals course — cloud concepts, Azure services, pricing, and governance.',
    bestFor: 'Anyone wanting to learn Azure or get the AZ-900 certification.',
    steps: [
      'Complete the "Cloud Concepts" learning path first',
      'Follow with "Azure Architecture and Services"',
      'Take the "Management and Governance" path',
      'Use the free Azure sandbox for hands-on practice',
      'Schedule the AZ-900 certification exam'
    ],
    after: [
      'Pass the AZ-900 certification exam',
      'Explore Azure DevOps and CI/CD pipelines',
      'Build a web app on Azure App Service',
      'Learn Azure AI services'
    ]
  },
  {
    id: 'cybersecurity-google',
    title: 'Google Cybersecurity Certificate',
    platform: 'Coursera / Google',
    url: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
    price: 'Free to Audit',
    category: 'Cybersecurity',
    level: 'Beginner',
    duration: '6 months (7 hrs/week)',
    rating: '4.8/5',
    desc: 'Google\'s cybersecurity professional certificate — networking, Linux, SQL, SIEM tools, and incident response.',
    bestFor: 'Career changers who want to break into cybersecurity with no prior experience.',
    steps: [
      'Start with "Foundations of Cybersecurity" — learn the landscape',
      'Complete "Play It Safe: Manage Security Risks" — risk management frameworks',
      'Learn Linux and SQL fundamentals — essential security skills',
      'Practice with SIEM tools (Splunk) in the hands-on labs',
      'Complete the capstone project — a real security incident response'
    ],
    after: [
      'Apply for entry-level cybersecurity analyst roles',
      'Build a home lab to practice penetration testing',
      'Get CompTIA Security+ certified',
      'Explore bug bounty programs'
    ]
  },
  {
    id: 'linux-free-codecamp',
    title: 'Linux Command Line Fundamentals',
    platform: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=gs2O03kCnEQ',
    price: 'Free',
    category: 'Cybersecurity',
    level: 'Beginner',
    duration: '4 hours',
    rating: '4.6/5',
    desc: 'Essential Linux skills for developers and security professionals — file systems, permissions, networking, and scripting.',
    bestFor: 'Anyone who works with servers, cloud, or security — Linux is everywhere.',
    steps: [
      'Install a Linux distro (Ubuntu) or use WSL on Windows',
      'Practice basic commands: ls, cd, cp, mv, rm, cat',
      'Learn file permissions and user management',
      'Understand process management and system monitoring',
      'Write basic bash scripts to automate tasks'
    ],
    after: [
      'Set up a Linux server in the cloud (AWS EC2 or DigitalOcean)',
      'Learn shell scripting for automation',
      'Explore Linux security tools and hardening',
      'Get the Linux+ certification'
    ]
  },
  {
    id: 'figma-course',
    title: 'Figma UI Design Tutorial',
    platform: 'Figma',
    url: 'https://help.figma.com/hc/en-us/articles/360039958234-Get-started-with-Figma',
    price: 'Free',
    category: 'Design & Creative',
    level: 'Beginner',
    duration: 'Self-paced (10 hours)',
    rating: '4.7/5',
    desc: 'Official Figma tutorials — learn UI design, components, auto-layout, and prototyping with the industry-standard design tool.',
    bestFor: 'Anyone who wants to learn UI/UX design with the tool professional designers actually use.',
    steps: [
      'Create a free Figma account and explore the interface',
      'Follow the "Getting Started" tutorials on Figma\'s help site',
      'Learn frames, components, and auto-layout',
      'Design a simple mobile app screen',
      'Use Figma\'s community templates for inspiration'
    ],
    after: [
      'Build a UI design portfolio with Figma',
      'Learn design systems and component libraries',
      'Explore Figma plugins for productivity',
      'Collaborate with developers using Figma\'s inspect mode'
    ]
  },
  {
    id: 'canva-design-school',
    title: 'Canva Design School',
    platform: 'Canva',
    url: 'https://www.canva.com/designschool/',
    price: 'Free',
    category: 'Design & Creative',
    level: 'Beginner',
    duration: 'Self-paced (20+ hours)',
    rating: '4.5/5',
    desc: 'Canva\'s free design courses — branding, social media design, presentations, and typography fundamentals.',
    bestFor: 'Small business owners and marketers who need design skills fast.',
    steps: [
      'Start with "Design Basics" — color theory, typography, layout',
      'Take "Brand Design" to learn consistent visual identity',
      'Complete "Social Media Design" for Instagram and LinkedIn',
      'Learn presentation design for pitch decks',
      'Practice by creating designs for a real project'
    ],
    after: [
      'Create a brand kit for your business or portfolio',
      'Design social media content that converts',
      'Explore Canva Pro features for advanced work',
      'Offer design services on freelancing platforms'
    ]
  },
  {
    id: 'google-ux-design',
    title: 'Google UX Design Certificate',
    platform: 'Coursera / Google',
    url: 'https://www.coursera.org/professional-certificates/google-ux-design',
    price: 'Free to Audit',
    category: 'Design & Creative',
    level: 'Beginner',
    duration: '6 months (10 hrs/week)',
    rating: '4.8/5',
    desc: 'Google\'s UX design professional certificate — research, wireframing, prototyping, and usability testing.',
    bestFor: 'Career changers who want to break into UX design with Google\'s credential.',
    steps: [
      'Start with "Foundations of User Experience Design"',
      'Learn design thinking and user research methods',
      'Practice wireframing and prototyping in Figma',
      'Complete usability testing exercises',
      'Build a portfolio with 3 complete UX case studies'
    ],
    after: [
      'Apply for junior UX designer roles',
      'Build a portfolio site showcasing your case studies',
      'Learn interaction design and motion design',
      'Join the UX design community on Dribbble and ADPList'
    ]
  },
  {
    id: 'git-github',
    title: 'Git and GitHub Crash Course',
    platform: 'Traversy Media',
    url: 'https://www.youtube.com/watch?v=SWYqp7iY_Tc',
    price: 'Free',
    category: 'Web Development',
    level: 'Beginner',
    duration: '1 hour',
    rating: '4.8/5',
    desc: 'Essential version control skills — branching, merging, pull requests, and collaboration with Git and GitHub.',
    bestFor: 'Every developer needs Git — this is the fastest way to learn the essentials.',
    steps: [
      'Install Git on your computer and configure your username/email',
      'Learn the basic commands: init, add, commit, push, pull',
      'Create a GitHub repository and push your first commit',
      'Practice branching and merging with a feature branch workflow',
      'Make a pull request on a friend\'s repository'
    ],
    after: [
      'Host all your projects on GitHub',
      'Contribute to open-source projects',
      'Learn GitHub Actions for CI/CD',
      'Use Git branches for every feature you build'
    ]
  },
  {
    id: 'sql-mysql',
    title: 'SQL Tutorial — Full Database Course',
    platform: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '4 hours',
    rating: '4.7/5',
    desc: 'Complete SQL course for beginners — queries, joins, aggregates, and database design with MySQL.',
    bestFor: 'Anyone who works with data — SQL is the universal language of databases.',
    steps: [
      'Install MySQL or use an online SQL playground',
      'Learn SELECT, WHERE, ORDER BY, and LIMIT',
      'Master JOINs — inner, left, right, and full',
      'Practice aggregate functions: COUNT, SUM, AVG, GROUP BY',
      'Design a simple database schema from scratch'
    ],
    after: [
      'Query databases for data analysis',
      'Build backend APIs that connect to SQL databases',
      'Learn PostgreSQL for production use',
      'Explore database optimization and indexing'
    ]
  },
  {
    id: 'excel-data-analysis',
    title: 'Data Analysis with Excel',
    platform: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
    price: 'Free',
    category: 'Data Science & ML',
    level: 'Beginner',
    duration: '300 hours',
    rating: '4.5/5',
    desc: 'freeCodeCamp\'s data analysis certification — Python, pandas, NumPy, matplotlib, and real-world data projects.',
    bestFor: 'Analysts and business users who want to level up from Excel to Python.',
    steps: [
      'Complete the Python basics section first',
      'Learn pandas for data manipulation — DataFrames, filtering, grouping',
      'Master NumPy for numerical computing',
      'Create visualizations with matplotlib and seaborn',
      'Complete the 5 certification projects with real datasets'
    ],
    after: [
      'Automate data analysis tasks with Python',
      'Build dashboards and reports',
      'Explore machine learning with scikit-learn',
      'Apply for data analyst roles'
    ]
  },
  {
    id: 'docker-course',
    title: 'Docker Tutorial for Beginners',
    platform: 'TechWorld with Nana',
    url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
    price: 'Free',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '2.5 hours',
    rating: '4.9/5',
    desc: 'The most popular Docker tutorial — containers, images, Dockerfiles, Docker Compose, and deployment.',
    bestFor: 'Developers who want to package and deploy apps consistently across environments.',
    steps: [
      'Install Docker Desktop on your machine',
      'Learn the difference between images and containers',
      'Write your first Dockerfile for a simple app',
      'Use Docker Compose to run multi-container apps',
      'Push images to Docker Hub for sharing'
    ],
    after: [
      'Containerize all your projects',
      'Deploy Docker apps to AWS ECS or DigitalOcean',
      'Learn Kubernetes for orchestration',
      'Set up CI/CD pipelines with Docker'
    ]
  },
  {
    id: 'nodejs-course',
    title: 'Node.js Crash Course',
    platform: 'Traversy Media',
    url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
    price: 'Free',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '3 hours',
    rating: '4.8/5',
    desc: 'Complete Node.js crash course — modules, HTTP, Express, file systems, and REST APIs.',
    bestFor: 'Frontend developers who want to learn backend JavaScript.',
    steps: [
      'Install Node.js and understand the runtime',
      'Learn CommonJS and ES modules',
      'Build an HTTP server from scratch',
      'Use Express to create a REST API',
      'Connect to MongoDB with Mongoose'
    ],
    after: [
      'Build a full-stack app with Node.js and React',
      'Learn authentication with JWT',
      'Deploy to Heroku or Railway',
      'Explore GraphQL with Apollo Server'
    ]
  },
  {
    id: 'seo-toolbox',
    title: 'SEO Tool Mastery',
    platform: 'Ahrefs',
    url: 'https://ahrefs.com/academy',
    price: 'Free',
    category: 'SEO & Marketing',
    level: 'Intermediate',
    duration: 'Self-paced (20+ hours)',
    rating: '4.7/5',
    desc: 'Deep dive into SEO tools — keyword research, backlink analysis, site audits, and competitor research with Ahrefs and SEMrush.',
    bestFor: 'SEO practitioners who want to master the tools of the trade.',
    steps: [
      'Start with "SEO for Beginners" — refresh the fundamentals',
      'Take "Keyword Research" course — learn search intent analysis',
      'Complete "Link Building" course — understand backlink strategy',
      'Practice with Ahrefs\' free tools (Webmaster Tools, Backlink Checker)',
      'Do a full site audit using the tools you learned'
    ],
    after: [
      'Run comprehensive SEO audits for clients',
      'Build a keyword strategy for any niche',
      'Track rankings and monitor competitors',
      'Offer SEO consulting services'
    ]
  }
];

const categories = [
  {name:'All Courses',slug:'all'},
  {name:'SEO & Marketing',slug:'seo-marketing'},
  {name:'Web Development',slug:'web-development'},
  {name:'Writing & Content',slug:'writing-content'},
  {name:'AI & Tools',slug:'ai-tools'},
  {name:'Data Science & ML',slug:'data-science-ml'},
  {name:'Cloud Computing',slug:'cloud-computing'},
  {name:'Cybersecurity',slug:'cybersecurity'},
  {name:'Design & Creative',slug:'design-creative'}
];

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

function generateCoursePage(){
  var catFilter=categories.map(function(c){
    return '<button class="course-filter'+(c.slug==='all'?' active':'')+'" data-cat="'+c.name+'">'+c.name+'</button>';
  }).join('\n            ');

  var courseCards=courses.map(function(c){
    var priceClass=c.price==='Free'?'price-free':'price-paid';
    return `
        <div class="course-card" data-category="${c.category}">
          <div class="course-header">
            <span class="course-platform">${esc(c.platform)}</span>
            <span class="course-price ${priceClass}">${esc(c.price)}</span>
          </div>
          <h3 class="course-title"><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c.title)} ↗</a></h3>
          <p class="course-desc">${esc(c.desc)}</p>
          <div class="course-meta">
            <span class="meta-item"><span class="meta-label">Level</span> ${esc(c.level)}</span>
            <span class="meta-item"><span class="meta-label">Duration</span> ${esc(c.duration)}</span>
            <span class="meta-item"><span class="meta-label">Rating</span> ${esc(c.rating)}</span>
          </div>
          <div class="course-section">
            <h4>How to Get the Most Out of This Course</h4>
            <ol>${c.steps.map(function(s){return '<li>'+esc(s)+'</li>';}).join('')}</ol>
          </div>
          <div class="course-section">
            <h4>What to Do After Completing</h4>
            <ol>${c.after.map(function(a){return '<li>'+esc(a)+'</li>';}).join('')}</ol>
          </div>
          <a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer" class="course-cta">Start Learning →</a>
        </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en" data-page="courses" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Free & Paid Courses — Learn SEO, Web Dev, AI & More | KwordSEO</title>
  <meta name="description" content="Curated free and paid courses on SEO, web development, AI, data science, writing, and design. Each course includes step-by-step guides and post-course action plans.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE}/courses/">
  <link rel="alternate" hreflang="en" href="${BASE}/courses/">
  <link rel="alternate" hreflang="x-default" href="${BASE}/courses/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Free & Paid Courses — Learn SEO, Web Dev, AI & More | KwordSEO">
  <meta property="og:description" content="Curated courses on SEO, web dev, AI, data science, and design with step-by-step guides and post-course action plans.">
  <meta property="og:url" content="${BASE}/courses/">
  <meta property="og:site_name" content="KwordSEO">
  <meta property="og:image" content="${BASE}/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/style.css">
  <script>
    (function(){try{var t=localStorage.getItem('attTheme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
  </script>
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    "name":"Free & Paid Courses — Learn SEO, Web Dev, AI & More",
    "description":"Curated free and paid courses on SEO, web development, AI, data science, writing, and design.",
    "url":"${BASE}/courses/",
    "breadcrumb":{"@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"${BASE}/"},
      {"@type":"ListItem","position":2,"name":"Courses","item":"${BASE}/courses/"}
    ]}
  }
  </script>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KDTPKT4T');</script>
</head>
<body>
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDTPKT4T" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="site-logo" href="/" aria-label="KwordSEO Home">
        <svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>
        <span class="logo-text">Kword<span class="logo-seo">SEO</span></span>
      </a>
      <nav class="nav" id="mainNav" aria-label="Main navigation">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/tools/">Tools</a>
        <a class="nav-link active" href="/courses/">Courses</a>
        <a class="nav-link" href="/books/">Books</a>
        <a class="nav-link" href="/blog/">Blog</a>
      </nav>
      <div class="header-actions">
        <button type="button" class="theme-toggle" id="themeToggle" onclick="App.toggleTheme()" aria-label="Toggle dark mode"><span class="track"></span><span class="thumb"><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span></button>
        <button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="App.toggleMenu()"><div class="hamburger"><span></span><span></span><span></span></div></button>
      </div>
    </div>
    <div class="nav-backdrop" id="navBackdrop" onclick="App.closeMenu()"></div>
  </header>
  <main id="main-content">
    <div class="container">
      <div class="tool-header">
        <h1>Courses</h1>
        <p>Curated free and paid courses to master SEO, web development, AI, data science, and more. Each course includes a step-by-step guide and post-course action plan.</p>
      </div>
      <div class="course-filters">
        ${catFilter}
      </div>
      <input type="text" class="course-search" id="courseSearch" placeholder="Search courses by title, platform, or topic...">
      <div class="course-count" id="courseCount">${courses.length} courses</div>
      <div class="courses-grid" id="coursesGrid">
${courseCards}
      </div>
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-top-text">
          <span class="footer-top-label">Newsletter</span>
          <p class="footer-top-title">Get new tools & SEO tips</p>
          <p class="footer-top-sub">No spam. Unsubscribe anytime.</p>
        </div>
        <form class="footer-top-form" id="newsletterForm" action="/api/subscribe" method="POST">
          <input type="email" name="email" placeholder="your@email.com" required aria-label="Email address">
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <hr class="footer-divider">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="site-logo" style="color:inherit"><svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="7" fill="#2563eb"/><path d="M9 8v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10-8" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M12 16l10 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg><span class="logo-text">Kword<span class="logo-seo">SEO</span></span></a>
          <p class="footer-brand-desc">47+ free online tools for writers, developers, and SEO professionals. All processing happens in your browser — your data never leaves your device.</p>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Tools</p>
          <a href="/tools/word-counter.html">Word Counter</a>
          <a href="/tools/case-converter.html">Case Converter</a>
          <a href="/tools/json-formatter.html">JSON Formatter</a>
          <a href="/tools/robots-txt.html">Robots.txt</a>
          <a href="/tools/">Browse All 47+ Tools</a>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Learn</p>
          <a href="/courses/">Courses</a>
          <a href="/blog/">Blog</a>
          <a href="/glossary/">Glossary</a>
          <a href="/pillar/seo-complete-guide.html">SEO Guide</a>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Company</p>
          <a href="/about.html">About Us</a>
          <a href="/contact.html">Contact</a>
          <a href="/advertise.html">Advertise</a>
          <a href="/privacy-policy.html">Privacy Policy</a>
          <a href="/terms.html">Terms of Service</a>
        </div>
      </div>
      <hr class="footer-divider">
      <div class="footer-bottom">
        <p>&copy; 2026 KwordSEO. All rights reserved.</p>
      </div>
    </div>
  </footer>
  <div class="cookie-banner" id="cookieBanner" role="region" aria-label="Cookie consent">
    <p>We use cookies for analytics & preferences. <a href="/cookie-policy.html">Learn more</a></p>
    <div class="btn-group">
      <button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
      <button type="button" class="btn btn-secondary btn-sm" id="cookieReject">Dismiss</button>
    </div>
  </div>
  <div class="toast" id="appToast"></div>
  <script src="/js/app.js"></script>
  <script>
(function(){
  var filters=document.querySelectorAll('.course-filter');
  var cards=document.querySelectorAll('.course-card');
  var count=document.getElementById('courseCount');
  var search=document.getElementById('courseSearch');
  function applyFilters(){
    var activeFilter=document.querySelector('.course-filter.active');
    var cat=activeFilter?activeFilter.getAttribute('data-cat'):'all';
    var query=(search?search.value:'').toLowerCase();
    var shown=0;
    cards.forEach(function(card){
      var matchCat=cat==='all'||card.getAttribute('data-category')===cat;
      var text=card.textContent.toLowerCase();
      var matchSearch=!query||text.indexOf(query)!==-1;
      if(matchCat&&matchSearch){card.style.display='';shown++;}else{card.style.display='none';}
    });
    count.textContent=shown+' course'+(shown!==1?'s':'');
  }
  filters.forEach(function(btn){
    btn.addEventListener('click',function(){
      filters.forEach(function(f){f.classList.remove('active');});
      btn.classList.add('active');
      applyFilters();
    });
  });
  if(search)search.addEventListener('input',applyFilters);
})();
  </script>
  <script>if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}</script>
</body>
</html>`;
}

/* Generate */
fs.mkdirSync(path.join(__dirname,'public','courses'),{recursive:true});
var html=generateCoursePage();
fs.writeFileSync(path.join(__dirname,'public','courses','index.html'),html);
console.log('Created: public/courses/index.html ('+courses.length+' courses)');
