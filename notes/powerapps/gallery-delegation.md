# Gallery Delegation & the 500-Row Limit

## The Problem

By default, Power Apps only loads **500 rows** from a data source into a gallery. If your SharePoint list has more records, the gallery silently shows an incomplete dataset — no error, just missing data.

This is called a **delegation warning** — the filter or sort can't be delegated to the data source to run server-side, so Power Apps runs it client-side on whatever 500 rows it already pulled.

---

## Why Delegation Exists

Power Apps is a client-side app. It can't load 50,000 rows into memory on a phone. So it relies on the data source (SharePoint, Dataverse, SQL) to do the filtering and return only the rows you need.

When a formula **can** be delegated:
```
Filter(MyList, Status = "Active")
→ SharePoint receives: ?$filter=Status eq 'Active'
→ Returns only Active rows (no row limit)
```

When it **can't**:
```
Filter(MyList, StartsWith(Title, searchInput.Text))
→ Power Apps fetches 500 rows first
→ Then filters locally
→ You only see matches from those 500 rows
```

---

## Raising the Limit

You can increase the limit up to **2,000 rows** in:

> **Settings → App Settings → Advanced Settings → Data row limit for non-delegable queries**

This is a patch, not a fix. For large lists, you need proper delegation.

---

## Delegable Functions for SharePoint

| ✅ Works (delegable) | ❌ Doesn't Work |
|---|---|
| `Filter(List, Column = value)` | `StartsWith()` on most columns |
| `Search()` on Title only | `Left()`, `Mid()`, `Len()` |
| `SortByColumns()` | `CountRows()` on a filtered set |
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

Then filter the collection — no delegation limit applies:

```powerfx
Filter(colMyList, Status = "Active")
```

> ⚠️ Only works if your list is under ~5,000 rows.

### 2. Use Dataverse Instead

Dataverse has much broader delegation support than SharePoint lists. If your data is growing, consider migrating key lists to Dataverse.

---

## Tips

- The **yellow triangle** on a gallery = delegation warning. Always investigate it.
- Use `ShowColumns()` in your data call to limit columns — reduces payload.
- Test with more than 500 rows in dev. Delegation bugs are invisible otherwise.
