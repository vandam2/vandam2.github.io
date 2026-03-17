// ============================================
// notes-data.js — Your note catalog
// Add a new entry here for each note you create
// ============================================

const NOTES = [
  {
    id: "hide-navigation-bar-in-powerapps",
    title: "Hide Navigation bar in Powerapps",
    category: "powerapps",
    categoryLabel: "Power Apps",
    subcategory: "Other",
    excerpt: "Hide Navbar",
    tags: ["URL Parameter"],
    file: "notes/powerapps/hide-navigation-bar-in-powerapps.md",
    date: "2026-03-17"
  },];

// ============================================
// SUBCATEGORY DEFINITIONS PER CATEGORY
// Edit these to add/remove subcategory options
// ============================================

const SUBCATEGORIES = {
  powerapps:     ["Components", "Data & Formulas", "Forms", "Galleries", "Navigation", "Performance", "YAML", "Other"],
  powerautomate: ["Approvals", "Email & Teams", "Flow Design", "HTTP & APIs", "Scheduled Flows", "SharePoint Actions", "Other"],
  powerbi:       ["Administration", "DAX", "Data Modelling", "Power Query", "Visuals", "Other"],
  sharepoint:    ["Administration", "Libraries", "Lists", "Pages & Web Parts", "Permissions", "Search", "Other"],
  other:         ["Data Formats", "Reference", "Tips & Tricks", "Tools", "Other"]
};
