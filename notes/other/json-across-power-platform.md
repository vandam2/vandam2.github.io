```json
// Sample JSON to paste for schema generation
{
  "id": 42,
  "title": "My Task",
  "assignedTo": "alice@company.com",
  "dueDate": "2025-03-15",
  "tags": ["urgent", "review"]
}
```

### Accessing values after parsing:
```
@{body('Parse_JSON')?['title']}
@{body('Parse_JSON')?['assignedTo']}
@{body('Parse_JSON')?['tags'][0]}   ← first item in array
```

---

## Handling Null Values

The `?` operator in expressions prevents errors when a field might be null:

```
// Safe — returns null if 'description' doesn't exist
@{body('Parse_JSON')?['description']}

// Unsafe — errors if 'description' doesn't exist  
@{body('Parse_JSON')['description']}
```

Provide a default with `coalesce`:
```
@{coalesce(body('Parse_JSON')?['description'], 'No description provided')}
```

---

## Schema Mismatches

If your JSON structure changes (new fields added, types changed), the Parse JSON schema becomes stale and can cause errors.

**Fix:** Click Parse JSON action → **Generate from sample** → paste updated JSON → save.

**Prevention:** Use `?` on all property access — this makes the schema tolerant of missing fields.

---

## Power Apps — ParseJSON Function

Power Apps has a `ParseJSON()` function for working with JSON strings:

```powerfx
// Parse a JSON string into an untyped object
Set(varData, ParseJSON(TextInput1.Text))

// Access properties
Label1.Text = Text(varData.name)
Label2.Text = Text(varData.age)

// Access nested objects
Label3.Text = Text(varData.address.city)

// Access array items
Label4.Text = Text(Index(varData.tags, 1))
```

**Important:** ParseJSON returns an **untyped object** — you must wrap values in `Text()`, `Value()`, `Boolean()` etc. to use them in formulas.

```powerfx
// Convert types explicitly
Set(varName, Text(varData.name))          // String
Set(varAge,  Value(varData.age))          // Number
Set(varActive, Boolean(varData.isActive)) // Boolean
```

---

## Escaping JSON in Power Automate Expressions

When building JSON manually in expressions, special characters need escaping:

```
// Quotes inside strings — use backslash
"message": "He said \"hello\""

// Or use concat to avoid escaping
concat('{"message": "', variables('myText'), '"}')
```

For complex JSON bodies, use the **Compose** action to build the object visually, then reference `outputs('Compose')`.

---

## Dynamic JSON with Compose

Build dynamic JSON objects without string concatenation:

```json
// Compose action body — mix static and dynamic values
{
  "title": "@{triggerBody()?['Title']}",
  "submittedBy": "@{triggerBody()?['Author/Email']}",
  "timestamp": "@{utcNow()}",
  "approved": false
}
```

Then reference it in subsequent actions:
```
@{outputs('Compose_Build_Payload')}
```

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| `InvalidTemplate` | Malformed JSON expression | Check quotes and escape characters |
| `null` returned | Field doesn't exist in JSON | Use `?` operator and coalesce |
| Schema validation failed | JSON structure changed | Regenerate schema from new sample |
| `Cannot index into null` | Array is null/empty | Check `if(empty(...))` before indexing |

---

## Tips

- Use **Postman** or the browser dev tools to capture real JSON responses for schema generation
- The **Compose** action is underused — it's great for building and inspecting JSON mid-flow
- In Power Apps, `JSON()` converts a record/table TO a JSON string; `ParseJSON()` converts FROM
- Always validate JSON at [jsonlint.com](https://jsonlint.com) before pasting into schemas