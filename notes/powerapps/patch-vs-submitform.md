# Patch vs. SubmitForm — When to Use Which

## Quick Answer

| Use `Patch()` when... | Use `SubmitForm()` when... |
|---|---|
| You need fine control over which fields update | Your form is bound to a data card form control |
| Writing to multiple records at once | You want built-in validation |
| Creating records programmatically | You want `OnSuccess` / `OnFailure` events |
| Not using a Form control | You're using a standard edit/new form |

---

## SubmitForm — The Simple Path

`SubmitForm` works with Power Apps **Form controls** (the ones with data cards). It submits whatever the user typed into the form fields.

```powerfx
// Basic usage on a Submit button
SubmitForm(Form1)
```

**Form control events you get for free:**
- `OnSuccess` — fires after successful save
- `OnFailure` — fires if something goes wrong
- `OnReset` — fires when form is reset

```powerfx
// Navigate away after successful save
OnSuccess: Navigate(HomeScreen, ScreenTransition.Fade)

// Show an error notification on failure
OnFailure: Notify("Save failed: " & Form1.Error, NotificationType.Error)
```

**Switching form mode:**
```powerfx
// New record form
NewForm(Form1)

// Edit existing record
EditForm(Form1)

// Reset to original values
ResetForm(Form1)
```

---

## Patch — The Flexible Path

`Patch` writes directly to a data source without needing a Form control. It's more verbose but gives you precise control.

### Create a new record:
```powerfx
Patch(
    Employees,
    Defaults(Employees),
    {
        Title: TextInput_Name.Text,
        Department: Dropdown_Dept.Selected.Value,
        StartDate: DatePicker1.SelectedDate
    }
)
```

### Update an existing record:
```powerfx
Patch(
    Employees,
    LookUp(Employees, ID = Gallery1.Selected.ID),
    {
        Title: TextInput_Name.Text,
        Status: "Active"
    }
)
```

### Update only one field without touching others:
```powerfx
// Only changes the Status field — all other fields untouched
Patch(Employees, Gallery1.Selected, {Status: "Inactive"})
```

---

## Patching Multiple Records at Once

This is where `Patch` really shines — `SubmitForm` can only do one record at a time.

```powerfx
// Mark all selected items as approved
Patch(
    Requests,
    ForAll(
        Filter(colRequests, IsSelected = true),
        {ID: ID, Status: "Approved", ApprovedBy: User().Email}
    )
)
```

---

## Common Gotchas

### Lookup columns need the full record, not just the ID:
```powerfx
// ❌ Wrong — passing just the ID
Patch(Tasks, Defaults(Tasks), {AssignedTo: User().Email})

// ✅ Correct — Person field needs specific structure
Patch(Tasks, Defaults(Tasks), {
    AssignedTo: {
        Claims: "i:0#.f|membership|" & User().Email,
        DisplayName: User().FullName
    }
})
```

### Choice/Option Set columns:
```powerfx
// SharePoint Choice column
Patch(Tasks, Defaults(Tasks), {
    Priority: {Value: "High"}
})
```

---

## Tips

- Combine both: use `SubmitForm` for the main form, use `Patch` for secondary updates (e.g., logging, status flags)
- `Patch` returns the updated record — you can capture it: `Set(varNewRecord, Patch(...))`
- Always wrap `Patch` in error handling: `IfError(Patch(...), Notify("Error: " & FirstError.Message))`
