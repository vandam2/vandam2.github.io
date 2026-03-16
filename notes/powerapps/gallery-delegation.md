# Gallery Delegation & the 500-Row Limit

## The Problem

By default, Power Apps only loads **500 rows** from a data source into a gallery. If your SharePoint list or Dataverse table has more records, the gallery will silently show an incomplete dataset — no error, just missing data.

This is called a **delegation warning** — the filter or sort you're applying can't be "delegated" to the data source to run server-side, so Power Apps runs it client-side on whatever 500 rows it already pulled.

---

## Why Delegation Exists

Power Apps is a client-side app. It can't load 50,000 rows into memory on a phone. So it relies on the *data source* (SharePoint, Dataverse, SQL) to do the filtering and return only the rows you need.

When you write a formula that can be delegated, it runs like this:

```
Filter(MyList, Status = "Active")  
→ SharePoint receives: ?$filter=Status eq 'Active'  
→ Returns only Active rows (no limit)
```

When you write something non-delegable:

```
Filter(MyList, StartsWith(Title, searchInput.Text))
→ Power Apps fetches 500 rows first  
→ Then filters locally  
→ You only see matching rows from those 500
```

---

## The Delegation Limit

You can raise the limit up to **2,000 rows** in:

> **Settings → App Settings → Advanced Settings → Data row limit for non-delegable queries**

This is a patch, not a fix. For large lists, you need proper delegation.

---

## Delegable Functions for SharePoint

| Works (delegable) | Doesn't Work |
|---|---|
| `Filter(List, Column = value)` | `StartsWith()` on most columns |
| `Search()` on Title column only | `Left()`, `Mid()`, `Len()` |
| `SortByColumns()` | `CountRows()` of a filtered set |
| `=`, `<>`, `<`, `>` operators | `in` operator |

---

## Workaround Patterns

### 1. ClearCollect on App Start

Pull the full dataset into a local collection once:

```powerfx
ClearCollect(
    colMyList,
    ShowColumns(MyList, "ID", "Title", "Status", "DueDate")
)
```

Then filter the collection (no delegation limit):

```powerfx
Filter(colMyList, Status = "Active")
```

> ⚠️ Only works if your list is under ~5,000 rows. LoadData/SaveData for offline support.

### 2. Search Input + SharePoint Search API

For large lists, call the SharePoint Search API via Power Automate and return results to a collection. More complex but scales to millions of rows.

### 3. Use Dataverse Instead

Dataverse has broader delegation support than SharePoint lists. If your data is growing, consider migrating.

---

## Tips

- The **yellow triangle** on a gallery = delegation warning. Always investigate it.
- Use `ShowColumns()` in your data source call to limit columns — reduces payload size.
- Test with more than 500 rows in your dev environment. Delegation bugs are invisible otherwise.
- `Explicit Column Selection` (ECS) under Settings helps performance but can break formulas — test carefully.
