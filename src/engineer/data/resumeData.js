import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Code2,
  Layers,
  Database,
  GitBranch,
  Workflow,
  Sparkles,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "hero",       n: "01", label: "Summary"    },
  { id: "skills",     n: "02", label: "Skills"     },
  { id: "roadmap",    n: "03", label: "Timeline"   },
  { id: "experience", n: "04", label: "Experience" },
  { id: "education",  n: "05", label: "Education"  },
  { id: "contact",    n: "06", label: "Contact"    },
];

export const STATS = [
  { value: "10+",  label: "Years of frontend engineering"  },
  { value: "40+",  label: "Web apps & experiences delivered" },
  { value: "400+", label: "Legacy pages migrated to React"  },
  { value: "4",    label: "Organizations contributed to"    },
];

// Segment widths are proportional to tenure in months.
// TechM 25m · BORN 50m · Assert 34m · Nivid 6m → total 115m
// Ordered current-first (left) → oldest (right).
export const ROADMAP_SEGMENTS = [
  {
    code:    "EXP-01",
    width:   21.7,
    from:    "Mar 2023",
    to:      "Present",
    role:    "Senior Software Engineer",
    org:     "Tech Mahindra Ltd",
    status:  "current",
  },
  {
    code:    "EXP-02",
    width:   43.5,
    from:    "Dec 2018",
    to:      "Feb 2023",
    role:    "Software Engineer",
    org:     "BORN Group",
    status:  "done",
  },
  {
    code:    "EXP-03",
    width:   29.6,
    from:    "Feb 2016",
    to:      "Dec 2018",
    role:    "Software Engineer",
    org:     "Assert Tech",
    status:  "done",
  },
  {
    code:    "EXP-04",
    width:   5.2,
    from:    "Aug 2015",
    to:      "Feb 2016",
    role:    "Software Development Intern",
    org:     "Nivid Technologies",
    status:  "done",
  },
];

// Mirrored to match the reversed bar above (current/present on the left).
export const YEAR_TICKS = [
  { label: "2025", pct: 8.7  },
  { label: "2023", pct: 27.0 },
  { label: "2021", pct: 45.2 },
  { label: "2019", pct: 63.5 },
  { label: "2017", pct: 81.7 },
  { label: "2015", pct: 100  },
];

export const EXPERIENCES = [
  {
    code:     "EXP-01",
    status:   "current",
    dates:    "Mar 2023 — Present",
    title:    "Senior Software Engineer",
    org:      "Tech Mahindra Ltd",
    location: "Bangalore, India",
    stack:    ["React", "JavaScript", "Redux", "REST API", "Agile", "Git", "Figma"],
    bullets:  [
      "Led frontend development for Walmart campaign and brand pages, spearheading the migration of 400+ legacy pages to a modern, component-based React architecture.",
      "Architected an internal page-builder tool that gave Product Owners and Campaign Managers self-service page creation, removing engineering as a bottleneck and accelerating content delivery.",
      "Shipped 40+ responsive, production-grade campaign and brand pages for high-visibility Walmart marketing initiatives.",
      "Represented the frontend team in cross-functional planning, collaborating with Product, Design, and Business stakeholders to deliver scalable, production-ready solutions from evolving requirements.",
      "Owned features end-to-end, from technical design and development to QA, client review, and production release, ensuring high-quality deliverables.",
    ],
  },
  {
    code:     "EXP-02",
    status:   "done",
    dates:    "Dec 2018 — Feb 2023",
    title:    "Software Engineer",
    org:      "BORN Group",
    location: "Bangalore, India",
    stack:    ["React", "JavaScript", "REST API", "Git", "Figma", "Agile"],
    bullets:  [
      "Engineered responsive, mobile-first brand and campaign experiences for Walmart and Sam's Club, powering large-scale marketing initiatives and customer engagement at national retail scale.",
      "Built interactive campaign and event experiences for Strider Bikes and Cigna Healthcare, delivering polished, cross-browser, high-performance frontends under tight campaign deadlines.",
      "Designed and built an internal React knowledge portal with Vimeo integration, centralizing onboarding and technical training and cutting ramp-up time for new hires.",
    ],
  },
  {
    code:     "EXP-03",
    status:   "done",
    dates:    "Feb 2016 — Dec 2018",
    title:    "Software Engineer",
    org:      "Assert Tech",
    location: "Bangalore, India",
    stack:    ["JavaScript", "jQuery", "Bootstrap", "REST API", "Git", "Agile"],
    bullets:  [
      "Built responsive frontend solutions for Avaya's internal and customer-facing applications.",
      "Built and maintained promotional landing pages for Optus, delivering polished, cross-browser experiences for high-traffic marketing campaigns.",
      "Diagnosed and resolved frontend defects across the stack, strengthening application stability, performance, and user experience across modern browsers and devices.",
    ],
  },
  {
    code:     "EXP-04",
    status:   "done",
    dates:    "Aug 2015 — Feb 2016",
    title:    "Software Development Intern",
    org:      "Nivid Technologies",
    location: "Bangalore, India",
    stack:    ["HTML", "CSS", "JavaScript", "jQuery"],
    bullets:  [
      "Built frontend features for an insurance e-commerce application and contributed to its ongoing development and maintenance.",
      "Partnered with senior developers to ship responsive UI components and resolve bugs, sharpening core frontend fundamentals under real production constraints.",
    ],
  },
];

export const SKILL_GROUPS = [
  {
    Icon:   Code2,
    title:  "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3"],
  },
  {
    Icon:   Layers,
    title:  "Frontend",
    skills: ["React.js", "Redux Toolkit", "Context API", "React Router", "Tailwind CSS", "CSS Modules", "Bootstrap", "Material UI", "Responsive Web Design"],
  },
  {
    Icon:   Database,
    title:  "APIs & Build Tools",
    skills: ["REST APIs", "GraphQL", "Vite", "Webpack", "npm"],
  },
  {
    Icon:   GitBranch,
    title:  "Testing & Version Control",
    skills: ["React Testing Library", "Playwright", "Git", "GitHub"],
  },
  {
    Icon:   Workflow,
    title:  "Development Practices",
    skills: ["Agile / Scrum", "CI/CD"],
  },
  {
    Icon:   Sparkles,
    title:  "Core Expertise",
    skills: ["Component-Based Architecture", "Performance Optimization", "Cross-Browser Compatibility", "Accessibility (WCAG)", "Responsive Design", "Frontend Architecture"],
  },
];

export const CONTACT_FIELDS = [
  { label: "Name",         value: "Bharath Kunamneni"         },
  { label: "Role",         value: "Senior Frontend Developer"  },
  { label: "Experience",   value: "10+ years"                  },
  { label: "Status",       value: "Open to opportunities"      },
  { label: "Location",     value: "Bangalore, India"           },
  { label: "Availability", value: "Ready to discuss"           },
];

export const CONTACT_ACTIONS = [
  { href: "mailto:bbugs35@gmail.com",                  Icon: Mail,     label: "bbugs35@gmail.com" },
  { href: "tel:+919066818774",                         Icon: Phone,    label: "+91 90668 18774"    },
  { href: "https://linkedin.com/in/bharathkunamneni",  Icon: Linkedin, label: "LinkedIn Profile"   },
  { href: "https://bharathkunamneni.com",               Icon: Globe,    label: "bharathkunamneni.com" },
];

export const HERO_CONTACTS = [
  { href: "mailto:bbugs35@gmail.com",                 Icon: Mail,     label: "bbugs35@gmail.com" },
  { href: "tel:+919066818774",                        Icon: Phone,    label: "+91 90668 18774"    },
  { href: "https://linkedin.com/in/bharathkunamneni", Icon: Linkedin, label: "linkedin.com/in/bharathkunamneni" },
  { href: "https://bharathkunamneni.com",              Icon: Globe,    label: "bharathkunamneni.com" },
  { href: null,                                       Icon: MapPin,   label: "Bangalore, India" },
];

export const PROFILE = {
  name:    "Bharath Kunamneni",
  role:    "Senior Frontend Developer",
  summary:
    "For over 10 years, I've enjoyed building frontend applications that turn " +
    "complex ideas into simple, intuitive experiences. I've created 40+ brand and " +
    "promotional pages for a global e-commerce platform, led the migration of " +
    "400+ legacy pages to React, and built a template-based page builder that " +
    "empowered product owners and campaign managers to launch pages " +
    "independently. I've also built solutions across healthcare, telecom, and " +
    "online learning, with a focus on creating scalable, maintainable software " +
    "that delivers real business value.",
};
