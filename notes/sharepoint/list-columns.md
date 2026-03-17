# SharePoint List Column Types & When to Use Each

## Quick Reference

| Column Type | Best For | Avoid When |
|---|---|---|
| **Single line of text** | Short free text, titles | Long paragraphs |
| **Multiple lines** | Notes, descriptions | Need to filter/sort on it |
| **Choice** | Fixed small set of options | Options change often |
| **Number** | Quantities, amounts | Phone numbers, IDs with leading zeros |
| **Currency** | Money values | — |
| **Date and Time** | Dates, deadlines | — |
| **Lookup** | Referencing another list | Large lists (5000+ items) |
| **Yes/No** | Boolean flags | — |
| **Person or Group** | User assignment | — |
| **Managed Metadata** | Taxonomy, enterprise keywords | Simple small lists |
| **Calculated** | Derived values from other columns | Values that need to be updated externally |

---

## Choice Column

Use when you have a **fixed, small set of options** (status, priority, category).

**Pros:** Fast, simple, works with filtering and delegation in Power Apps  
**Cons:** Hard to update options across many items if you rename a choice

```
Status: Not Started | In Progress | Completed | On Hold
Priority: Low | Medium | High | Critical
```

> For Power Apps delegation: Choice columns ARE delegable with `=` filter.

---

## Lookup Column

References items from **another SharePoint list** — creates a relationship.

**Pros:** Single source of truth, values update automatically when source changes  
**Cons:** Not fully delegable in Power Apps, performance degrades on large lists

```
Project lookup → Projects list
Manager lookup → Staff Directory list
```

**List view threshold warning:** Lookup columns on lists with 5,000+ items can cause threshold issues. Always index them.

---

## Managed Metadata

Use for **enterprise-wide taxonomy** — terms managed centrally in the Term Store.

**Pros:** Consistent terminology across all sites, hierarchical terms, enterprise search  
**Cons:** Requires Term Store admin access to set up, overkill for simple lists

Good for: Document types, department names, project codes shared across many sites.

---

## Person or Group

Stores SharePoint user accounts.

**Tips:**
- Enable **Allow multiple selections** for shared ownership
- You can show just the name, or expand to show email/department
- In Power Automate, the Person field returns a claims string — extract the email with `outputs()?['fields/AssignedTo/Email']`

---

## Calculated Column

Derives its value from a formula combining other columns. Calculated at save time.

```
// Full name from first + last
=[FirstName]&" "&[LastName]

// Days overdue
=IF([DueDate]<TODAY(),TODAY()-[DueDate],0)

// Concatenate project code
="PRJ-"&TEXT([ProjectNumber],"0000")
```

**Limitation:** Cannot reference other lists, cannot use Today() dynamically (only updates when the item is saved).

---

## Indexing for Large Lists

Any list approaching **5,000 items** needs indexed columns for views/filters to work.

**How to index a column:**
1. List Settings → Columns → click the column
2. Scroll to **Column Indexing** → **Add an index**

**Always index:**
- Date columns used in filtered views
- Choice columns used to filter
- Person columns
- Any column used as a sort or filter in a view

---

## List View Threshold

SharePoint limits non-indexed queries to **5,000 items**. Beyond this:
- Views with non-indexed filters will fail
- Power Automate "Get items" returns max 5,000 without paging
- Power Apps has a 500/2000 row delegation limit regardless

**Workaround for large lists:** Add a filtered view with an indexed column as the primary filter — this allows SharePoint to use the index first, then apply secondary filters on the smaller result set.

---

## Tips

- Plan your columns before creating a list — renaming internal column names is painful
- Use **Column validation** to enforce data quality at entry time
- Enable **Required** on key columns — much easier than cleaning bad data later
- Keep lists focused — don't add 40 columns to one list, split into related lists
