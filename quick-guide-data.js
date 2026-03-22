// ─────────────────────────────────────────────
//  Quick Guide Data  —  quick-guide-data.js
//  Edit via manage-quick-guide.html
// ─────────────────────────────────────────────

const QG_TABS = [
  { id: 'powerapps',     label: 'Power Apps',     icon: 'bi-lightning-charge-fill',    color: '#7b61ff' },
  { id: 'powerautomate', label: 'Power Automate', icon: 'bi-arrow-repeat',             color: '#0078d4' },
  { id: 'powerbi',       label: 'Power BI / DAX', icon: 'bi-bar-chart-fill',           color: '#e6a800' },
  { id: 'sharepoint',    label: 'SharePoint',     icon: 'bi-diamond-fill',             color: '#038387' },
  { id: 'excel',         label: 'Excel',          icon: 'bi-file-earmark-spreadsheet', color: '#217346' },
  { id: 'shortcuts',     label: 'Shortcuts',      icon: 'bi-keyboard',                 color: '#475569' }
];

const QG_DATA = {

  powerapps: [
    {
      id: 'pa-filtering',
      title: 'Filtering & Lookup',
      icon: 'bi-funnel-fill',
      cards: [
        { id: 'pa-filter',   name: 'Filter',      tag: 'Formula', tagType: 'formula', code: 'Filter(DataSource, Condition)',                                                      desc: 'Returns rows that match the condition. Delegable with SharePoint/Dataverse when using simple equality.',                                                             tags: 'filter formula' },
        { id: 'pa-search',   name: 'Search',      tag: 'Formula', tagType: 'formula', code: 'Search(DataSource, SearchTerm, "Col1","Col2")',                                     desc: 'Text-based partial match across specified columns. Not delegable — limited to 500 rows by default.',                                                              tags: 'search formula' },
        { id: 'pa-lookup',   name: 'LookUp',      tag: 'Formula', tagType: 'formula', code: 'LookUp(DataSource, Condition, ReturnField)',                                        desc: 'Returns the first matching record or a specific field value from a record.',                                                                                      tags: 'lookup first formula' },
        { id: 'pa-sort',     name: 'SortByColumns', tag: 'Formula', tagType: 'formula', code: 'SortByColumns(Source, "Column", SortOrder.Ascending)',                           desc: 'Sorts a table by one or more columns. Delegable to SharePoint and Dataverse.',                                                                                   tags: 'sort formula' }
      ]
    },
    {
      id: 'pa-datawrites',
      title: 'Data Writes',
      icon: 'bi-pencil-fill',
      cards: [
        { id: 'pa-patch-update', name: 'Patch — Update',     tag: 'Formula', tagType: 'formula', code: 'Patch(DataSource, LookUp(DataSource, ID=varID), {Title: "New"})',                            desc: 'Updates a specific record. Use Defaults(DataSource) as the second argument to create a new record.',           tags: 'patch update create formula' },
        { id: 'pa-patch-create', name: 'Patch — Create New', tag: 'Formula', tagType: 'formula', code: 'Patch(DataSource, Defaults(DataSource), {Title: "New Item", Status: "Active"})',              desc: 'Creates a new record by using Defaults() as the base record.',                                                  tags: 'patch create new formula' },
        { id: 'pa-remove',       name: 'Remove',             tag: 'Formula', tagType: 'formula', code: 'Remove(DataSource, LookUp(DataSource, ID = varID))',                                          desc: 'Deletes a specific record from a data source. Can also remove multiple records with RemoveIf.',                tags: 'remove delete formula' },
        { id: 'pa-clearcollect', name: 'ClearCollect',       tag: 'Formula', tagType: 'formula', code: "ClearCollect(colMyData, Filter(SharePointList, Status=\"Active\"))",                          desc: "Clears a collection then loads new data into it. Use in OnStart or OnVisible to cache data locally.",          tags: 'collect clearcollect formula' }
      ]
    },
    {
      id: 'pa-nav',
      title: 'Navigation & Variables',
      icon: 'bi-signpost-fill',
      cards: [
        { id: 'pa-navigate',       name: 'Navigate',              tag: 'Formula', tagType: 'formula', code: 'Navigate(ScreenName, ScreenTransition.Fade)',                                desc: 'Moves to another screen. Use None, Fade, Cover, CoverRight, UnCover, or Slide transitions.',                         tags: 'navigate screen formula' },
        { id: 'pa-set',            name: 'Set (Global Variable)', tag: 'Formula', tagType: 'formula', code: 'Set(varMyVar, "Hello World")',                                               desc: 'Creates or updates a global variable accessible from any screen in the app.',                                        tags: 'set variable global formula' },
        { id: 'pa-updatecontext',  name: 'UpdateContext (Local)', tag: 'Formula', tagType: 'formula', code: 'UpdateContext({locIsLoading: true})',                                        desc: 'Creates or updates a variable scoped to the current screen only. Prefix with "loc" by convention.',                 tags: 'updatecontext variable local formula' },
        { id: 'pa-back',           name: 'Back',                  tag: 'Formula', tagType: 'formula', code: 'Back(ScreenTransition.UnCover)',                                             desc: 'Navigates to the previously visited screen, reversing the transition used to arrive.',                               tags: 'back navigate formula' }
      ]
    },
    {
      id: 'pa-logic',
      title: 'Logic & Text',
      icon: 'bi-braces',
      cards: [
        { id: 'pa-if',      name: 'If / Switch',        tag: 'Formula', tagType: 'formula', code: 'If(Condition, TrueResult, FalseResult)\nSwitch(varStatus, "Active","Green", "Inactive","Red", "Grey")',  desc: 'If evaluates a condition; Switch matches a value against multiple cases — cleaner than nested If.',    tags: 'if condition formula' },
        { id: 'pa-concat',  name: 'Concatenate / &',    tag: 'Formula', tagType: 'formula', code: '"Hello " & User().FullName\nConcatenate("Ref-", Text(ID, "000"))',                                        desc: 'The & operator is shorthand for Concatenate. Text() formats numbers/dates as strings.',                tags: 'concatenate text formula' },
        { id: 'pa-isblank', name: 'IsBlank / IsEmpty',  tag: 'Formula', tagType: 'formula', code: 'If(IsBlank(TextInput1.Text), "Required", "OK")\nIsEmpty(colMyCollection)',                               desc: 'IsBlank checks individual values; IsEmpty checks whether a table/collection has any rows.',             tags: 'isblank empty formula' },
        { id: 'pa-now',     name: 'Now / Today',        tag: 'Formula', tagType: 'formula', code: 'Now()          // date + time\nToday()        // date only\nText(Now(), "dd/mm/yyyy hh:mm")',             desc: 'Returns the current date/time. Wrap with Text() to format for display.',                               tags: 'now today date formula' },
        { id: 'pa-countif', name: 'CountIf / Sum',      tag: 'Formula', tagType: 'formula', code: 'CountIf(SharePointList, Status="Active")\nSum(colOrders, OrderTotal)',                                    desc: 'CountIf counts rows matching a condition; Sum adds a numeric column across a table.',                   tags: 'countif sum formula' },
        { id: 'pa-user',    name: 'User()',              tag: 'Formula', tagType: 'formula', code: 'User().Email\nUser().FullName\nUser().Image',                                                              desc: 'Returns properties of the currently signed-in user. Useful for personalisation and filtering user-owned records.', tags: 'user email formula' }
      ]
    }
  ],

  powerautomate: [
    {
      id: 'pa2-datetime',
      title: 'Date & Time Expressions',
      icon: 'bi-calendar3',
      cards: [
        { id: 'pa2-format',    name: 'Format Date',         tag: 'Expression', tagType: 'expr', code: "formatDateTime(utcNow(), 'dd/MM/yyyy')\nformatDateTime(utcNow(), 'yyyy-MM-dd HH:mm')",       desc: "Formats a UTC timestamp into a readable string. Use single quotes around the format pattern.",             tags: 'date format expression' },
        { id: 'pa2-adddays',   name: 'Add / Subtract Days', tag: 'Expression', tagType: 'expr', code: "addDays(utcNow(), 7)\naddDays(utcNow(), -30)\naddDays(triggerBody()?['DueDate'], -3)",        desc: 'Adds or subtracts a number of days from a timestamp. Works with trigger/action outputs too.',              tags: 'add days date expression' },
        { id: 'pa2-timezone',  name: 'Convert Timezone',    tag: 'Expression', tagType: 'expr', code: "convertTimeZone(utcNow(), 'UTC', 'Mountain Standard Time')",                                   desc: 'Converts a timestamp between time zones. Find zone IDs from the Windows Time Zone list.',                  tags: 'convert timezone expression' }
      ]
    },
    {
      id: 'pa2-strings',
      title: 'String Expressions',
      icon: 'bi-braces-asterisk',
      cards: [
        { id: 'pa2-concat',    name: 'concat',           tag: 'Expression', tagType: 'expr', code: "concat('Hello ', triggerBody()?['Title'])",                                                         desc: 'Joins two or more strings. Equivalent to using the + operator in other languages.',                       tags: 'concat string expression' },
        { id: 'pa2-substring', name: 'substring',        tag: 'Expression', tagType: 'expr', code: "substring(triggerBody()?['Email'], 0, 5)\nindexOf(triggerBody()?['Email'], '@')",                  desc: 'Extracts a portion of a string. indexOf finds the position of a character.',                              tags: 'substring string expression' },
        { id: 'pa2-replace',   name: 'replace / trim',   tag: 'Expression', tagType: 'expr', code: "replace(triggerBody()?['Title'], ' ', '-')\ntrim(triggerBody()?['Notes'])\ntoLower(triggerBody()?['Email'])", desc: 'replace swaps characters, trim removes leading/trailing spaces, toLower lowercases text.',          tags: 'replace string expression' },
        { id: 'pa2-split',     name: 'split',            tag: 'Expression', tagType: 'expr', code: "split(triggerBody()?['Tags'], ';')\nfirst(split(triggerBody()?['FullName'], ' '))",                 desc: 'Splits a string into an array by delimiter. Use first() / last() to grab individual parts.',              tags: 'split array expression' }
      ]
    },
    {
      id: 'pa2-arrays',
      title: 'Array & Object Expressions',
      icon: 'bi-collection',
      cards: [
        { id: 'pa2-trigbody',  name: 'triggerBody / outputs', tag: 'Expression', tagType: 'expr', code: "triggerBody()?['FieldName']\noutputs('ActionName')?['body']?['value']",                        desc: "The ? (null-safe) operator prevents errors when a property is missing. Always use it on dynamic content.", tags: 'triggerBody body expression' },
        { id: 'pa2-json',      name: 'json / string',         tag: 'Expression', tagType: 'expr', code: "json(triggerBody()?['JsonField'])\nstring(variables('myObject'))",                             desc: "json() parses a JSON string into an object; string() serialises an object back to a JSON string.",         tags: 'json parse expression' },
        { id: 'pa2-length',    name: 'length / empty',        tag: 'Expression', tagType: 'expr', code: "length(body('Get_Items')?['value'])\nempty(body('Get_Items')?['value'])",                      desc: "length() returns the item count of an array or character count of a string. empty() returns true/false.",  tags: 'length count array expression' }
      ]
    },
    {
      id: 'pa2-patterns',
      title: 'Flow Patterns',
      icon: 'bi-diagram-3-fill',
      cards: [
        { id: 'pa2-null',     name: 'Condition — Check Null',  tag: 'Tip', tagType: 'tip', code: "// In a Condition action, use Expression:\nempty(triggerBody()?['Approver'])",                                                          desc: "Use empty() or equals(..., null) in Condition actions to safely test whether a field was filled in.",    tags: 'condition tip' },
        { id: 'pa2-until',    name: 'Do Until — Poll Pattern', tag: 'Tip', tagType: 'tip', code: "// Do Until: @equals(variables('Status'), 'Approved')\n// Inside: Get Item → Set Variable → Delay 5 min",                               desc: "Do Until loops repeatedly until a condition is true. Always add a Delay action inside to avoid throttling.", tags: 'do until loop tip' },
        { id: 'pa2-scope',    name: 'Scope — Error Handling',  tag: 'Tip', tagType: 'tip', code: "// Try scope: your actions\n// Catch scope (runAfter = Failed/TimedOut):\n//   Send Email / Log Error",                                  desc: "Wrap risky actions in a Scope. Set a second Scope to run on failure for a Try/Catch pattern.",          tags: 'scope error handling tip' }
      ]
    }
  ],

  powerbi: [
    {
      id: 'pbi-dax',
      title: 'Core DAX Measures',
      icon: 'bi-calculator-fill',
      cards: [
        { id: 'pbi-calculate',  name: 'CALCULATE',              tag: 'DAX', tagType: 'formula', code: 'Sales YTD =\nCALCULATE(\n    SUM(Sales[Amount]),\n    DATESYTD(Calendar[Date])\n)',                                              desc: 'Modifies the filter context. The most important DAX function — all time intelligence relies on it.',           tags: 'calculate dax formula' },
        { id: 'pbi-sumx',       name: 'SUMX (Iterator)',        tag: 'DAX', tagType: 'formula', code: 'Revenue =\nSUMX(\n    Sales,\n    Sales[Qty] * Sales[UnitPrice]\n)',                                                              desc: 'Row-by-row evaluation, then aggregation. Use X-functions (SUMX, AVERAGEX, MAXX) when you need row context.', tags: 'sumx iterator dax formula' },
        { id: 'pbi-related',    name: 'RELATED / RELATEDTABLE', tag: 'DAX', tagType: 'formula', code: '// In Sales table (many side):\nCategory = RELATED(Products[Category])\n\n// In Products table (one side):\nSalesCount = COUNTROWS(RELATEDTABLE(Sales))', desc: 'RELATED traverses to the one-side; RELATEDTABLE returns all related rows from the many-side.',  tags: 'related lookup dax formula' },
        { id: 'pbi-divide',     name: 'DIVIDE (Safe Division)', tag: 'DAX', tagType: 'formula', code: 'Margin % =\nDIVIDE(\n    [Gross Profit],\n    [Revenue],\n    0   -- alternate result if denominator = 0\n)',                     desc: 'Always use DIVIDE instead of / to avoid divide-by-zero errors in measures.',                                  tags: 'divide safe dax formula' },
        { id: 'pbi-all',        name: 'ALL / REMOVEFILTERS',    tag: 'DAX', tagType: 'formula', code: '% of Total =\nDIVIDE(\n    [Sales],\n    CALCULATE([Sales], ALL(Sales))\n)',                                                       desc: 'ALL removes filters from a table/column. Use inside CALCULATE to compute a grand total ignoring slicers.',    tags: 'filter all removefilters dax formula' },
        { id: 'pbi-yoy',        name: 'Year-over-Year',         tag: 'DAX', tagType: 'formula', code: 'Sales PY =\nCALCULATE([Sales], PREVIOUSYEAR(Calendar[Date]))\n\nYoY % =\nDIVIDE([Sales] - [Sales PY], [Sales PY])',               desc: 'PREVIOUSYEAR shifts the date filter back 12 months. Requires a marked Date table in your model.',             tags: 'previousyear yoy dax formula' }
      ]
    },
    {
      id: 'pbi-pq',
      title: 'Power Query (M Language)',
      icon: 'bi-table',
      cards: [
        { id: 'pbi-filterrows', name: 'Filter Rows',        tag: 'M', tagType: 'expr', code: 'Table.SelectRows(Source, each [Status] = "Active")\nTable.SelectRows(Source, each [Amount] > 1000)',  desc: 'Filters rows where the condition is true. The each keyword creates a function over each row.',          tags: 'filter rows query m' },
        { id: 'pbi-addcol',     name: 'Add Custom Column',  tag: 'M', tagType: 'expr', code: 'Table.AddColumn(Source, "FullName",\n    each [FirstName] & " " & [LastName])',                        desc: 'Adds a new calculated column. Reference column names in square brackets inside the each expression.',    tags: 'add column query m' },
        { id: 'pbi-dateparts',  name: 'Date Parts',         tag: 'M', tagType: 'expr', code: 'Date.Year([OrderDate])\nDate.Month([OrderDate])\nDate.MonthName([OrderDate], "en-GB")',                  desc: 'Extract year, month number, or month name from a date column. Used when building a Date dimension table.', tags: 'date year month query m' }
      ]
    }
  ],

  sharepoint: [
    {
      id: 'sp-odata',
      title: 'OData / REST Filters',
      icon: 'bi-funnel-fill',
      cards: [
        { id: 'sp-eq',       name: 'Equality & Comparison',  tag: 'OData', tagType: 'expr', code: "Status eq 'Active'\nAmount gt 1000\nAmount le 500\nModifiedDate ge '2025-01-01T00:00:00Z'",             desc: 'eq, ne, gt, ge, lt, le — standard OData comparison operators. String values need single quotes.',             tags: 'odata filter sharepoint rest' },
        { id: 'sp-contains', name: 'Contains / StartsWith',  tag: 'OData', tagType: 'expr', code: "substringof('keyword', Title)\nstartswith(Title, 'Project')",                                            desc: 'Text search within a field. Note: substringof is not indexed — use sparingly on large lists.',                 tags: 'odata contains filter sharepoint' },
        { id: 'sp-person',   name: 'Person / Lookup Field',  tag: 'OData', tagType: 'expr', code: "AssignedToId eq 42\n// Get current user ID first:\n/_api/web/currentuser",                               desc: "Filter by person or lookup column using the numeric ID. Use the REST endpoint to get the current user's ID.", tags: 'odata lookup person sharepoint' },
        { id: 'sp-andor',    name: 'AND / OR',               tag: 'OData', tagType: 'expr', code: "Status eq 'Active' and Priority eq 'High'\nStatus eq 'New' or Status eq 'In Progress'",                 desc: 'Combine conditions with and / or (lowercase). Use parentheses to control precedence.',                         tags: 'odata and or filter sharepoint' }
      ]
    },
    {
      id: 'sp-calc',
      title: 'Column Calculated Formulas',
      icon: 'bi-columns-gap',
      cards: [
        { id: 'sp-days',    name: 'Days Until Due',   tag: 'Calculated', tagType: 'formula', code: '=INT([DueDate]-TODAY())',                                                                        desc: 'Number of days remaining until a due date. Returns negative if overdue. Use in a Calculated column.',                              tags: 'sharepoint calculated column formula' },
        { id: 'sp-status',  name: 'Status Label',     tag: 'Calculated', tagType: 'formula', code: '=IF([Status]="Approved","✅ Done",IF([Status]="Rejected","❌ Rejected","⏳ Pending"))',           desc: 'Nested IF for a friendly status display. Calculated columns do not support lookup to external lists.',                             tags: 'sharepoint if status calculated formula' },
        { id: 'sp-concat',  name: 'Concat Text',      tag: 'Calculated', tagType: 'formula', code: '=[FirstName]&" "&[LastName]\n="REF-"&TEXT([ID],"0000")',                                         desc: 'Join text fields with & and string literals. TEXT() formats numbers — useful for reference codes.',                                tags: 'sharepoint text concatenate formula' }
      ]
    }
  ],

  excel: [
    {
      id: 'xl-lookup',
      title: 'Lookup Formulas',
      icon: 'bi-search',
      cards: [
        { id: 'xl-xlookup', name: 'XLOOKUP',      tag: 'Formula', tagType: 'formula', code: '=XLOOKUP(lookup_val, lookup_array, return_array, "Not Found")',                        desc: 'Modern replacement for VLOOKUP. Searches any direction, returns multiple columns, and handles not-found gracefully.',                                                                           tags: 'xlookup lookup excel formula' },
        { id: 'xl-index',   name: 'INDEX / MATCH', tag: 'Formula', tagType: 'formula', code: '=INDEX(ReturnRange, MATCH(LookupVal, LookupRange, 0))',                                desc: 'The classic flexible lookup. MATCH finds the position; INDEX retrieves the value at that position.',                                                                                            tags: 'index match lookup excel formula' },
        { id: 'xl-vlookup', name: 'VLOOKUP',       tag: 'Formula', tagType: 'formula', code: '=VLOOKUP(A2, Sheet2!$A:$C, 3, FALSE)',                                                 desc: 'Looks up a value in the first column and returns a value from a specified column. Always use FALSE for exact match.',                                                                           tags: 'vlookup lookup excel formula' }
      ]
    },
    {
      id: 'xl-aggregate',
      title: 'Aggregate & Conditional',
      icon: 'bi-calculator',
      cards: [
        { id: 'xl-sumifs',   name: 'SUMIFS / COUNTIFS',           tag: 'Formula', tagType: 'formula', code: '=SUMIFS(SumRange, CriteriaRange1, Criteria1, CriteriaRange2, Criteria2)\n=COUNTIFS(Range1, "Active", Range2, ">"&DATE(2025,1,1))', desc: 'Multi-condition aggregation. Always Sum/Criteria range pairs after the first argument in SUMIFS.', tags: 'sumifs countifs excel formula' },
        { id: 'xl-iferror',  name: 'IFERROR',                     tag: 'Formula', tagType: 'formula', code: '=IFERROR(VLOOKUP(A2, Data, 2, 0), "Not Found")',                                                                                   desc: 'Wraps any formula to return a fallback value if an error occurs. Cleaner than nested IF(ISERROR(...)).', tags: 'iferror error excel formula' },
        { id: 'xl-text',     name: 'TEXT / Date Parts',           tag: 'Formula', tagType: 'formula', code: '=TEXT(A2,"dd/mm/yyyy")\n=TEXT(A2,"mmmm yyyy")\n=YEAR(A2) & "-Q" & INT((MONTH(A2)-1)/3+1)',                                          desc: 'TEXT formats a date/number as a string. The last formula builds a "2025-Q2" style quarter label.',     tags: 'text date year month excel formula' },
        { id: 'xl-unique',   name: 'UNIQUE / FILTER (Dynamic)',   tag: 'Formula', tagType: 'formula', code: '=UNIQUE(A2:A100)\n=FILTER(A2:C100, B2:B100="Active", "No results")\n=SORT(UNIQUE(A2:A100))',                                          desc: 'Dynamic array functions that spill results into multiple cells automatically. Available in Excel 365 / 2021+.', tags: 'unique filter spill excel formula' }
      ]
    }
  ]
};

const QG_SHORTCUTS = {
  pa: {
    label: 'Power Apps Studio',
    icon: 'bi-lightning-charge-fill',
    color: '#7b61ff',
    items: [
      { keys: [['Ctrl','S']],             desc: 'Save the app' },
      { keys: [['Ctrl','Z']],             desc: 'Undo last action' },
      { keys: [['Ctrl','Y']],             desc: 'Redo' },
      { keys: [['Ctrl','C']],             desc: 'Copy selected control(s)' },
      { keys: [['Ctrl','V']],             desc: 'Paste control(s)' },
      { keys: [['Ctrl','D']],             desc: 'Duplicate selected control' },
      { keys: [['Del']],                  desc: 'Delete selected control' },
      { keys: [['Ctrl','A']],             desc: 'Select all controls on screen' },
      { keys: [['F5']],                   desc: 'Preview (play) the app' },
      { keys: [['Esc']],                  desc: 'Exit preview / close popups' },
      { keys: [['Ctrl','Enter']],         desc: 'Confirm formula bar input' },
      { keys: [['Alt','Enter']],          desc: 'Insert newline in formula bar' },
      { keys: [['Ctrl','K']],             desc: 'Insert formula suggestion' },
      { keys: [['Ctrl','G']],             desc: 'Open component/screen selector' },
      { keys: [['Ctrl','Shift','H']],     desc: 'Toggle hidden items' }
    ]
  },
  pbi: {
    label: 'Power BI Desktop',
    icon: 'bi-bar-chart-fill',
    color: '#e6a800',
    items: [
      { keys: [['Ctrl','S']],             desc: 'Save the report' },
      { keys: [['Ctrl','Z']],             desc: 'Undo' },
      { keys: [['Ctrl','Y']],             desc: 'Redo' },
      { keys: [['Ctrl','C']],             desc: 'Copy visual' },
      { keys: [['Ctrl','V']],             desc: 'Paste visual' },
      { keys: [['Alt','Shift','W']],      desc: 'Focus mode for selected visual' },
      { keys: [['Ctrl','Shift','F']],     desc: 'Format visual pane' },
      { keys: [['Ctrl','Alt','I']],       desc: 'Toggle insights panel' },
      { keys: [['F11']],                  desc: 'Full screen mode' },
      { keys: [['Ctrl','M']],             desc: 'Add new measure' },
      { keys: [['Ctrl','Enter']],         desc: 'Commit DAX formula' },
      { keys: [['Shift','Enter']],        desc: 'New line in DAX editor' },
      { keys: [['Tab']],                  desc: 'Auto-complete in DAX editor' },
      { keys: [['Ctrl','E']],             desc: 'Open query editor' }
    ]
  },
  excel: {
    label: 'Excel',
    icon: 'bi-file-earmark-spreadsheet',
    color: '#217346',
    items: [
      { keys: [['Ctrl','Shift','L']],     desc: 'Toggle AutoFilter' },
      { keys: [['Ctrl','T']],             desc: 'Create/convert to Table' },
      { keys: [['Ctrl','Shift','+']],     desc: 'Insert row/column' },
      { keys: [['Ctrl','-']],             desc: 'Delete row/column' },
      { keys: [['Ctrl','D']],             desc: 'Fill down' },
      { keys: [['Ctrl','R']],             desc: 'Fill right' },
      { keys: [['Ctrl','`']],             desc: 'Toggle show formulas' },
      { keys: [['F4']],                   desc: 'Repeat last action / toggle $ in reference' },
      { keys: [['Ctrl','Shift','Enter']], desc: 'Enter array formula (legacy)' },
      { keys: [['Ctrl','[']],             desc: 'Go to precedent cells' },
      { keys: [['Ctrl',']']],             desc: 'Go to dependent cells' },
      { keys: [['Alt','=']],              desc: 'AutoSum selected range' },
      { keys: [['Ctrl','1']],             desc: 'Open Format Cells dialog' },
      { keys: [['Ctrl','Shift','~']],     desc: 'Apply General number format' },
      { keys: [['Ctrl','Shift','$']],     desc: 'Apply Currency format' }
    ]
  },
  sp: {
    label: 'SharePoint / Browser',
    icon: 'bi-diamond-fill',
    color: '#038387',
    items: [
      { keys: [['Ctrl','F']],             desc: 'Find on page (browser)' },
      { keys: [['Alt','D']],              desc: 'Focus browser address bar' },
      { keys: [['F12']],                  desc: 'Open browser DevTools (check API calls)' },
      { keys: [['Ctrl','Shift','I']],     desc: 'Open DevTools (Chrome)' },
      { keys: [['Tab']],                  desc: 'Move between SharePoint page zones' },
      { keys: [['Ctrl','Click']],         desc: 'Open link in new tab' },
      { keys: [['Ctrl','Z']],             desc: 'Undo last list edit (list view)' },
      { keys: [['Alt','N']],              desc: 'New item (list toolbar focused)' },
      { keys: [['Enter']],                desc: 'Open selected item / confirm' },
      { keys: [['Shift','F10']],          desc: 'Open context menu for selected item' }
    ]
  }
};
