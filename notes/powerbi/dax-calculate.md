# DAX CALCULATE — Context Modification Deep Dive

## What CALCULATE Does

`CALCULATE` is the most important function in DAX. It evaluates an expression in a **modified filter context**. Nearly every useful measure uses it.

```dax
CALCULATE(expression, filter1, filter2, ...)
```

The filters modify the context in which the expression runs — they can add, remove, or replace existing filters.

---

## Filter Context vs. Row Context

Understanding the difference is essential:

- **Filter context** — filters applied by slicers, rows/columns in a matrix, and CALCULATE
- **Row context** — the current row being iterated (in calculated columns and iterators like SUMX)

`CALCULATE` operates on filter context. It **converts row context to filter context** when needed.

---

## Basic Examples

### Total sales for a specific year:
```dax
Sales 2024 = 
CALCULATE(
    SUM(Sales[Amount]),
    YEAR(Sales[Date]) = 2024
)
```

### Sales ignoring the region slicer:
```dax
All Region Sales = 
CALCULATE(
    SUM(Sales[Amount]),
    REMOVEFILTERS(Regions[Region])
)
```

### Sales for a specific product, regardless of all filters:
```dax
Widget Sales = 
CALCULATE(
    SUM(Sales[Amount]),
    Products[Category] = "Widget"
)
```

---

## REMOVEFILTERS vs ALL

Both remove filters, but they're slightly different:

| Function | Use |
|---|---|
| `REMOVEFILTERS(Table[Column])` | Removes filters from a specific column — preferred modern syntax |
| `ALL(Table[Column])` | Same as above, but also usable as a table expression |
| `ALL(Table)` | Removes all filters from an entire table |
| `ALLEXCEPT(Table, Col1, Col2)` | Removes all filters except the ones you specify |

```dax
-- % of total (ignore all product filters, keep date filter)
Product % of Total = 
DIVIDE(
    SUM(Sales[Amount]),
    CALCULATE(SUM(Sales[Amount]), REMOVEFILTERS(Products))
)
```

---

## Year-Over-Year Comparison

```dax
Sales PY = 
CALCULATE(
    SUM(Sales[Amount]),
    DATEADD(Calendar[Date], -1, YEAR)
)

YOY Growth % = 
DIVIDE(
    SUM(Sales[Amount]) - [Sales PY],
    [Sales PY]
)
```

---

## Year-to-Date

```dax
Sales YTD = 
CALCULATE(
    SUM(Sales[Amount]),
    DATESYTD(Calendar[Date])
)

-- Financial year ending June 30
Sales FYTD = 
CALCULATE(
    SUM(Sales[Amount]),
    DATESYTD(Calendar[Date], "06/30")
)
```

---

## CALCULATE Evaluation Order

CALCULATE processes filters in this order:
1. **Outer filter context** from the report
2. **CALCULATE filters** — added/modified filters from your measure arguments
3. **The expression** runs in the resulting combined context

Key rule: **CALCULATE filter arguments override existing context filters on the same column.**

```dax
-- If user selects Region = "West" in a slicer,
-- this measure IGNORES the slicer and always shows North
North Sales = CALCULATE(SUM(Sales[Amount]), Regions[Region] = "North")
```

---

## Common Mistakes

### Forgetting that CALCULATE is implicit in many functions
`TOTALYTD`, `DATEADD`, `SAMEPERIODLASTYEAR` all use CALCULATE internally.

### Using column references instead of filter expressions
```dax
-- ❌ Wrong
CALCULATE(SUM(Sales[Amount]), Sales[Year])

-- ✅ Correct
CALCULATE(SUM(Sales[Amount]), Sales[Year] = 2024)
```

---

## Tips

- If a measure returns the same value regardless of slicer selection, check for accidental REMOVEFILTERS/ALL
- Use **DAX Studio** to see exactly what filter context is being passed to your measures
- CALCULATE is the only function that can transition from row context to filter context
- Nest CALCULATE inside CALCULATE to layer multiple context modifications
