# Error Handling & Run After Patterns

## The Problem with Default Flows

By default, if any action in a flow fails, every subsequent action is **skipped** — and you get no notification about what went wrong. Good error handling fixes this.

---

## Run After — The Foundation

Every action has a **Run After** setting that controls when it executes. The four states:

| State | Meaning |
|---|---|
| **is successful** | Default — only runs if previous action succeeded |
| **has failed** | Runs if previous action threw an error |
| **is skipped** | Runs if previous action was skipped |
| **has timed out** | Runs if previous action exceeded time limit |

To configure: click the `...` on any action → **Configure run after**

---

## Pattern 1 — Simple Error Notification

Add a parallel branch after your main action that only runs on failure:

```
[Main Action]
     |
     ├── [Success Path] (runs if successful)
     │       └── Continue flow...
     │
     └── [Send Email] (runs if failed/timed out)
             To: admin@company.com
             Subject: Flow Failed — @{workflow().displayName}
             Body: 
               Error: @{body('Main_Action')}
               Time: @{utcNow()}
               Run ID: @{workflow().run.name}
```

**Configure the email action's Run After:**
- ✅ has failed
- ✅ has timed out
- ❌ is successful (uncheck this)

---

## Pattern 2 — Scope + Run After

Wrap related actions in a **Scope** control, then handle errors on the scope level.

```
[Scope: Process Data]
  ├── Get items from SharePoint
  ├── Apply to each
  └── Update records

[Send Success Email]        ← Run After: Scope is successful
[Send Failure Email]        ← Run After: Scope has failed
  Body: @{result('Scope')}  ← Contains full error details
```

The `result()` function on a scope returns all action results inside it — incredibly useful for debugging.

---

## Pattern 3 — Terminate with Custom Error

Use the **Terminate** action to fail a flow with a meaningful message:

```
[Check if required data exists]
       |
[Condition: Is data valid?]
  Yes → continue
  No  → [Terminate]
          Status: Failed
          Code: MISSING_DATA
          Message: "Required field 'ProjectID' was empty"
```

---

## Pattern 4 — Try/Catch with Variables

Capture errors gracefully without failing the whole flow:

```
[Initialize variable: varError = ""]

[Try scope]
  └── [Risky action]

[Catch scope]  ← Run After: Try scope has failed
  └── [Set variable: varError = @{result('Try_scope')}]

[Continue with rest of flow]
  └── [Condition: varError is empty?]
        Yes → normal processing
        No  → log the error and continue
```

---

## Useful Error Expressions

```
// Get the error message from a failed action
@{body('ActionName')?['error']?['message']}

// Get full result of a scope (includes all action statuses)
@{result('ScopeName')}

// Current flow run URL for deep-linking in notifications
@{concat('https://make.powerautomate.com/environments/', workflow().tags.environmentName, '/flows/', workflow().name, '/runs/', workflow().run.name)}
```

---

## Tips

- Always add error handling to flows that send emails, update records, or call external APIs
- Use **Scope** controls to group related actions — makes error handling much cleaner
- Store error details in a SharePoint list for a persistent audit trail
- The **Flow run history** only keeps 28 days of runs — log important errors elsewhere
- Test failure paths deliberately by temporarily breaking an action
