# OData Filter Query Cheat Sheet

## What is OData?

OData (Open Data Protocol) is the query language used to filter, sort, and shape data when calling SharePoint REST API, Microsoft Graph API, Dataverse, and Power Automate connectors. Knowing the syntax saves you from pulling 5,000 rows just to filter on the client side.

---

## Where OData Filters Are Used

| Platform | Where to Use |
|---|---|
| **Power Automate** | "Get items" → Filter Query field |
| **Power Apps** | `Filter()` on delegable SharePoint columns |
| **SharePoint REST** | `$filter=` query parameter |
| **Graph API** | `$filter=` query parameter |
| **Dataverse** | FetchXML or OData `$filter` |

---

## Basic Comparison Operators

```odata
// Equal
Status eq 'Active'
Priority eq 3

// Not equal
Status ne 'Closed'

// Greater than / Less than
DueDate gt '2025-01-01T00:00:00Z'
Amount lt 1000

// Greater than or equal / Less than or equal
Score ge 80
Score le 100
```

---

## Logical Operators

```odata
// AND
Status eq 'Active' and Priority eq 'High'

// OR
Status eq 'Active' or Status eq 'Pending'

// NOT
not (Status eq 'Closed')

// Combining — use parentheses for clarity
(Status eq 'Active' or Status eq 'Pending') and Priority eq 'High'
```

---

## String Functions

```odata
// Starts with
startswith(Title, 'Project')

// Contains (not delegable in Power Apps SharePoint)
substringof('keyword', Title)

// Ends with
endswith(Title, '2025')
```

> ⚠️ **Power Apps delegation warning:** `startswith()` is only delegable on the **Title** column in SharePoint. `substringof()` is NOT delegable at all.

---

## Date Filters

```odata
// Items created today (Power Automate expression)
Created ge '@{startOfDay(utcNow())}'

// Items due in the next 7 days
DueDate ge '@{utcNow()}' and DueDate le '@{addDays(utcNow(), 7)}'

// Items from a specific year
Created ge '2025-01-01T00:00:00Z' and Created lt '2026-01-01T00:00:00Z'
```

---

## Person/User Column Filters

```odata
// Filter by current user (Power Automate)
AssignedToId eq @{outputs('Get_my_profile_(V2)')?['body/id']}

// Filter by email (SharePoint REST)
AssignedTo/EMail eq 'alice@company.com'

// Filter by user ID (SharePoint list item ID, not AAD ID)
AuthorId eq 14
```

---

## Lookup Column Filters

```odata
// Filter by lookup value text
Department/Title eq 'Finance'

// Filter by lookup ID
DepartmentId eq 3
```

---

## Choice Column Filters

```odata
// SharePoint choice (single value)
Status eq 'Active'

// Multi-value choice — use substringof (not delegable)
substringof('Urgent', Priority)
```

---

## GUID Filters (Dataverse / Graph)

```odata
// Dataverse — filter by GUID
accountid eq 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

// Graph — users by ID
id eq 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
```

---

## OData System Query Options

```
$filter   — filter rows:      $filter=Status eq 'Active'
$select   — choose columns:   $select=Title,Status,DueDate
$orderby  — sort:             $orderby=Created desc
$top      — limit rows:       $top=100
$skip     — pagination:       $skip=100
$expand   — join related:     $expand=AssignedTo($select=Title,Email)
$count    — include count:    $count=true
```

---

## Power Automate "Get Items" Filter Query

In the SharePoint "Get items" action, the Filter Query field uses OData but **without** the `$filter=` prefix:

```
// Correct — no $filter= prefix
Status eq 'Active' and AssignedToId eq @{outputs('Get_my_profile_(V2)')?['body/id']}

// Wrong
$filter=Status eq 'Active'
```

---

## Tips

- Single quotes `'` around string values, no quotes around numbers
- Dates must be ISO 8601 format: `2025-01-15T00:00:00Z`
- Test filters in the browser first: `https://tenant.sharepoint.com/sites/site/_api/web/lists/getbytitle('ListName')/items?$filter=Status eq 'Active'`
- Power Automate filter query errors often show `BadRequest` — check your quotes and column names match exactly
- Internal column names in SharePoint differ from display names — use `_api/web/lists/getbytitle('ListName')/fields` to see internal names
