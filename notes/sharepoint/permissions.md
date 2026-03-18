# Permissions Architecture — Breaking Inheritance

## How SharePoint Permissions Work by Default

SharePoint uses **permission inheritance** — every site, library, list, folder, and item inherits permissions from its parent by default.

```
Site Collection
  └── Subsite (inherits from Site Collection)
       └── Document Library (inherits from Subsite)
            └── Folder (inherits from Library)
                 └── File (inherits from Folder)
```

When you break inheritance, that object gets its own permission set, independent of its parent.

---

## When to Break Inheritance

**Good reasons:**
- A library contains HR/sensitive documents only certain people should see
- A project list needs to be visible to external stakeholders but not the whole org
- Individual list items need to be visible only to the person who created them
- A department folder within a shared library

**Bad reasons (avoid):**
- Every single item has unique permissions — becomes unmanageable
- Breaking inheritance just to give someone "a bit more access" when group membership is the better solution

---

## Breaking Inheritance on a Library or List

1. Go to **Library/List Settings → Permissions for this document library**
2. Click **Stop Inheriting Permissions**
3. Confirm the warning
4. Now modify the permissions — remove groups, add groups, change levels

---

## Breaking Inheritance on a Folder

1. Select the folder → **...** → **Manage Access**
2. Click **Stop Inheriting Permissions** (may be under Advanced settings)
3. Remove inherited groups and add specific people/groups

---

## Breaking Inheritance on Individual Items

Best done via **Power Automate** for scale:

```
Trigger: When item created
Action: Send HTTP request to SharePoint
  Method: POST
  Uri: _api/web/lists/getbytitle('ListName')/items(@{triggerBody()?['ID']})/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)

Then: Grant specific permissions via
  Uri: _api/web/lists/getbytitle('ListName')/items(@{triggerBody()?['ID']})/roleassignments/addroleassignment(principalid=@{variables('UserID')},roledefid=1073741827)
```

Role definition IDs:
- `1073741827` = Contribute
- `1073741826` = Read
- `1073741829` = Full Control

---

## Keeping It Manageable — Use Groups

Never assign permissions directly to individual users. Always use **SharePoint Groups** or **Azure AD groups**.

```
❌ Bad: Grant "john.smith@company.com" access to 47 folders
✅ Good: Create "Finance Team" group → grant it access to the Finance library
         → Add/remove members in the group as people join/leave
```

---

## Checking What Permissions an Item Has

1. Select item → **...** → **Manage Access** → **Advanced**
2. Or use the **Check Permissions** button at the top of the Permissions page to look up a specific user

---

## Auditing Broken Inheritance

Find all items with unique permissions using PowerShell or PnP:

```powershell
# PnP PowerShell — find lists with broken inheritance
Connect-PnPOnline -Url "https://tenant.sharepoint.com/sites/yoursite"
Get-PnPList | Where-Object { $_.HasUniqueRoleAssignments -eq $true }
```

---

## Tips

- Document every broken inheritance instance — a permissions diagram saved in the site assets is invaluable
- Audit permissions quarterly — people leave, roles change
- Use **Sensitivity Labels** in Microsoft 365 for document-level protection instead of broken inheritance where possible — it's more scalable
- Be careful with **Search** — items with broken inheritance may still appear in search results to users who don't have access (they just can't open them)
- Power Apps and Power Automate service accounts need explicit access to any library/list with broken inheritance
