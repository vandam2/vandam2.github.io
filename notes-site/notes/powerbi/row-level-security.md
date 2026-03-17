# Row-Level Security Setup & Testing

## What is RLS?

Row-Level Security (RLS) restricts which data rows a user can see in a Power BI report. Users see the same report, but the data is filtered based on their identity.

---

## Static RLS

Static RLS uses fixed filter rules — good when roles map to fixed teams or regions.

### Setup in Power BI Desktop:
1. Go to **Modeling → Manage Roles**
2. Click **New Role** → name it (e.g., "North Region")
3. Select the table to filter
4. Enter the DAX filter expression:

```dax
[Region] = "North"
```

5. Create separate roles for each region/team
6. Publish to Power BI Service

### Assign users to roles in Power BI Service:
1. Open the dataset → **...** → **Security**
2. Select the role
3. Add members by email address

---

## Dynamic RLS

Dynamic RLS uses the logged-in user's identity to filter data automatically — one role handles everyone.

### Setup:

**Step 1 — Create a mapping table** in your data model:
```
UserEmail        | Region
-----------------|--------
alice@co.com     | North
bob@co.com       | South
charlie@co.com   | North
```

**Step 2 — Create the role in Power BI Desktop:**
```dax
// Filter the UserMapping table to current user
[UserEmail] = USERPRINCIPALNAME()
```

This filters the UserMapping table to only show the current user's row. Because UserMapping is related to your main data tables, those filter through automatically via the model relationships.

**Step 3 — Publish and assign users** to the dynamic role in Power BI Service.

---

## USERPRINCIPALNAME() Patterns

```dax
// Basic dynamic filter on a fact table directly
[SalesRepEmail] = USERPRINCIPALNAME()

// Case-insensitive comparison (safer)
LOWER([UserEmail]) = LOWER(USERPRINCIPALNAME())

// Allow managers to see all data
[UserEmail] = USERPRINCIPALNAME() 
    || [IsManager] = TRUE()
```

---

## Testing RLS

### In Power BI Desktop:
1. **Modeling → View as Roles**
2. Select a role to preview
3. You can also enter a custom username to simulate a specific user

### In Power BI Service:
1. Open the dataset → Security
2. Find the role → click **Test as role**
3. Optionally enter a specific user's email

---

## Bidirectional Filter Gotchas

RLS filters propagate through relationships in one direction by default. If you have bidirectional cross-filtering enabled, a filter on Table A can filter Table B AND also filter back to Table A — which can cause RLS to be bypassed or behave unexpectedly.

**Best practice:** Avoid bidirectional cross-filtering on tables involved in RLS. Use `CROSSFILTER` in measures instead if needed.

---

## OLS — Object Level Security

If you need to hide entire **columns** (not just rows), use Object Level Security:

1. Create a role in Power BI Desktop (or Tabular Editor)
2. Set column permissions to **None** for restricted columns
3. Users in that role cannot see those columns at all — even in DAX queries

---

## Tips

- RLS applies to the **dataset**, not the report — applies everywhere the dataset is used
- Service Principal accounts bypass RLS by default — be careful with automated refreshes
- Always test RLS with a real test user account, not just the "View as role" preview
- Document your RLS roles — they're invisible to report viewers but critical to audit
- RLS does **not** apply to dataset owners or workspace admins — they always see all data
