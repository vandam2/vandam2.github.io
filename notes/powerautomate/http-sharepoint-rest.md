# HTTP Action & SharePoint REST API Calls

## Why Use the HTTP Action?

The standard SharePoint connector in Power Automate covers most scenarios, but the **Send an HTTP request to SharePoint** action gives you access to the full SharePoint REST API — letting you do things the connector can't, like:

- Get all site collections
- Manage permissions programmatically
- Access list metadata and schema
- Use batch requests
- Work with search API

---

## Setting Up the HTTP Action

Add the action: **SharePoint → Send an HTTP request to SharePoint**

| Field | Description |
|---|---|
| **Site Address** | Your SharePoint site URL |
| **Method** | GET, POST, PATCH, DELETE |
| **Uri** | The REST API endpoint path |
| **Headers** | Usually `Accept` and `Content-Type` |
| **Body** | JSON payload (for POST/PATCH) |

---

## Common Endpoints

### Get all items from a list:
```
Method: GET
Uri: _api/web/lists/getbytitle('YourListName')/items
Headers:
  Accept: application/json;odata=verbose
```

### Get items with OData filter:
```
Uri: _api/web/lists/getbytitle('Tasks')/items?$filter=Status eq 'Active'&$select=Title,Status,AssignedTo&$orderby=Created desc&$top=100
```

### Create a new item:
```
Method: POST
Uri: _api/web/lists/getbytitle('Tasks')/items
Headers:
  Accept: application/json;odata=verbose
  Content-Type: application/json;odata=verbose
Body:
{
  "__metadata": { "type": "SP.Data.TasksListItem" },
  "Title": "My New Task",
  "Status": "Not Started"
}
```

### Update an existing item:
```
Method: PATCH
Uri: _api/web/lists/getbytitle('Tasks')/items(42)
Headers:
  Accept: application/json;odata=verbose
  Content-Type: application/json;odata=verbose
  IF-MATCH: *
  X-HTTP-Method: MERGE
Body:
{
  "__metadata": { "type": "SP.Data.TasksListItem" },
  "Status": "Completed"
}
```

### Delete an item:
```
Method: POST
Uri: _api/web/lists/getbytitle('Tasks')/items(42)
Headers:
  IF-MATCH: *
  X-HTTP-Method: DELETE
```

---

## Getting the List Item Entity Type

For POST/PATCH you need the `__metadata type`. Get it with:
```
GET: _api/web/lists/getbytitle('YourListName')?$select=ListItemEntityTypeFullName
```
Returns something like: `SP.Data.YourListNameListItem`

---

## Parsing the JSON Response

After the HTTP action, add a **Parse JSON** action:

1. Content: `body('Send_an_HTTP_request_to_SharePoint')`
2. Schema: click **Generate from sample** and paste a real response

Then access values in subsequent actions:
```
body('Parse_JSON')?['d']?['results']   ← for collections
body('Parse_JSON')?['d']?['Title']     ← for single item fields
```

---

## Error Handling

Wrap HTTP calls in a scope and configure **Run After** on a parallel branch to catch failures:

```
Configure Run After:
  ✅ has failed
  ✅ has timed out
```

Then in the error branch:
```
Send email with:
  Subject: Flow Error — HTTP Request Failed
  Body: @{body('Send_an_HTTP_request_to_SharePoint')}
```

---

## Tips

- Use `$select` to only return the columns you need — significantly reduces response size
- `$top=5000` is the maximum for a single REST call — use `$skiptoken` for paging
- The `odata=nometadata` accept header gives cleaner JSON responses for simple reads
- Test endpoints in **Postman** or the browser before wiring them into flows
