const NOTES = [
  {
    id: "hide-navbar",
    title: "Hide Navbar",
    category: "powerapps",
    categoryLabel: "Power Apps",
    subcategory: "Other",
    excerpt: "URL Parameter to Hide Navbar",
    tags: ["general"],
    file: "notes/powerapps/hide-navbar.html",
    date: "2026-03-18"
  },
  {
    id: "pa-gallery-delegation",
    title: "Gallery Delegation & the 500-Row Limit",
    category: "powerapps",
    categoryLabel: "Power Apps",
    subcategory: "Galleries",
    excerpt: "Why your gallery stops at 500 rows and how to work around delegation limits using explicit column lists, ClearCollect, and filter strategies.",
    tags: ["gallery", "delegation", "performance"],
    file: "notes/powerapps/gallery-delegation.md",
    date: "2024-12-10"
  },
  {
    id: "pa-patch-function",
    title: "Patch vs. SubmitForm — When to Use Which",
    category: "powerapps",
    categoryLabel: "Power Apps",
    subcategory: "Data & Formulas",
    excerpt: "A breakdown of Patch() for fine-grained record writes vs SubmitForm for form-bound submissions. Includes multi-record patching patterns.",
    tags: ["patch", "forms", "data"],
    file: "notes/powerapps/patch-vs-submitform.md",
    date: "2024-12-08"
  },
  {
    id: "pa-component-variables",
    title: "Component Custom Properties & Output Variables",
    category: "powerapps",
    categoryLabel: "Power Apps",
    subcategory: "Components",
    excerpt: "How to build reusable components with input/output properties. Covers raising events, passing records, and avoiding circular dependencies.",
    tags: ["components", "reusable", "architecture"],
    file: "notes/powerapps/component-variables.md",
    date: "2024-11-30"
  },
  {
    id: "pa-yaml-basics",
    title: "YAML in Power Apps — Reading & Writing",
    category: "powerapps",
    categoryLabel: "Power Apps",
    subcategory: "YAML",
    excerpt: "How to copy/paste YAML in Power Apps Studio, what the YAML structure maps to in the canvas, and tips for sharing components via YAML.",
    tags: ["yaml", "components", "studio"],
    file: "notes/powerapps/yaml-basics.md",
    date: "2025-01-12"
  },
  {
    id: "flow-http-action",
    title: "HTTP Action & SharePoint REST API Calls",
    category: "powerautomate",
    categoryLabel: "Power Automate",
    subcategory: "HTTP & APIs",
    excerpt: "Calling SharePoint's REST API from Power Automate with the HTTP action. Authentication, headers, OData queries, and parsing JSON responses.",
    tags: ["http", "rest", "sharepoint", "json"],
    file: "notes/powerautomate/http-sharepoint-rest.md",
    date: "2025-01-05"
  },
  {
    id: "flow-error-handling",
    title: "Error Handling & Run After Patterns",
    category: "powerautomate",
    categoryLabel: "Power Automate",
    subcategory: "Flow Design",
    excerpt: "Configure Run After to catch failures, timeouts, and skipped actions. Build parallel branches for error notifications without killing the main flow.",
    tags: ["errors", "run-after", "resilience"],
    file: "notes/powerautomate/error-handling.md",
    date: "2025-01-02"
  },
  {
    id: "flow-approval",
    title: "Approval Flows — Multi-Stage & Escalation",
    category: "powerautomate",
    categoryLabel: "Power Automate",
    subcategory: "Approvals",
    excerpt: "Setting up sequential and parallel approval chains, adding timeouts with escalation paths, and storing outcomes back to SharePoint.",
    tags: ["approvals", "workflow", "escalation"],
    file: "notes/powerautomate/approval-flows.md",
    date: "2024-12-20"
  },
  {
    id: "pbi-dax-calculate",
    title: "DAX CALCULATE — Context Modification Deep Dive",
    category: "powerbi",
    categoryLabel: "Power BI",
    subcategory: "DAX",
    excerpt: "How CALCULATE modifies filter context, the order of evaluation, using REMOVEFILTERS vs ALL, and building year-over-year comparison measures.",
    tags: ["dax", "calculate", "measures"],
    file: "notes/powerbi/dax-calculate.md",
    date: "2025-01-08"
  },
  {
    id: "pbi-row-level-security",
    title: "Row-Level Security Setup & Testing",
    category: "powerbi",
    categoryLabel: "Power BI",
    subcategory: "Administration",
    excerpt: "Configuring static and dynamic RLS roles, testing with 'View as role', DAX USERPRINCIPALNAME() patterns, and gotchas with bidirectional filters.",
    tags: ["rls", "security", "administration"],
    file: "notes/powerbi/row-level-security.md",
    date: "2024-12-15"
  },
  {
    id: "sp-list-columns",
    title: "SharePoint List Column Types & When to Use Each",
    category: "sharepoint",
    categoryLabel: "SharePoint",
    subcategory: "Lists",
    excerpt: "Cheat sheet for choosing between Choice, Managed Metadata, Lookup, and Person columns. Covers indexing for large lists and threshold limits.",
    tags: ["lists", "columns", "schema"],
    file: "notes/sharepoint/list-columns.md",
    date: "2024-12-18"
  },
  {
    id: "sp-permissions",
    title: "Permissions Architecture — Breaking Inheritance",
    category: "sharepoint",
    categoryLabel: "SharePoint",
    subcategory: "Permissions",
    excerpt: "When and how to break permission inheritance on items/folders without creating an unmanageable mess. Patterns for department-level access control.",
    tags: ["permissions", "security", "governance"],
    file: "notes/sharepoint/permissions.md",
    date: "2024-12-01"
  },
  {
    id: "other-json-tricks",
    title: "JSON in Power Platform — Parse, Schema, Escape",
    category: "other",
    categoryLabel: "Other",
    subcategory: "Data Formats",
    excerpt: "Working with JSON across Power Apps (ParseJSON), Power Automate (Parse JSON action), and the quirks — null handling, schema mismatches, dynamic content.",
    tags: ["json", "cross-platform", "data"],
    file: "notes/other/json-across-power-platform.md",
    date: "2025-01-10"
  },
  {
    id: "other-odata-filters",
    title: "OData Filter Query Cheat Sheet",
    category: "other",
    categoryLabel: "Other",
    subcategory: "Reference",
    excerpt: "Quick-reference for OData $filter syntax used across SharePoint connectors, Graph API, and Dataverse. Operators, date functions, and GUID handling.",
    tags: ["odata", "api", "reference"],
    file: "notes/other/odata-filter-cheatsheet.md",
    date: "2025-01-03"
  }
];

const SUBCATEGORIES = {
  powerapps:     ["Components", "Data & Formulas", "Forms", "Galleries", "Navigation", "Performance", "YAML", "Other"],
  powerautomate: ["Approvals", "Email & Teams", "Flow Design", "HTTP & APIs", "Scheduled Flows", "SharePoint Actions", "Other"],
  powerbi:       ["Administration", "DAX", "Data Modelling", "Power Query", "Visuals", "Other"],
  sharepoint:    ["Administration", "Libraries", "Lists", "Pages & Web Parts", "Permissions", "Search", "Other"],
  other:         ["Data Formats", "Reference", "Tips & Tricks", "Tools", "Other"]
};
