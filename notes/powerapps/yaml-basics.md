# YAML in Power Apps — Reading & Writing

## What is YAML in Power Apps?

Power Apps Studio stores every screen, control, and component as **YAML** under the hood. Since the 2023 modern studio update, you can directly view, copy, and paste raw YAML — which means you can share entire components between apps without exporting packages.

---

## Where to Find the YAML Editor

1. Open your app in **Power Apps Studio**
2. Select any control or component on the canvas
3. Click the **`...` (More)** menu in the top bar → **Open YAML editor**
4. Or right-click a control in the tree view → **Copy YAML**

---

## YAML Structure Breakdown

Every control in Power Apps YAML follows this pattern:

```yaml
ControlName As ControlType:
    Property1: =FormulaOrValue
    Property2: ="String value"
    Children:
        ChildControl As ChildType:
            Property: =Value
```


---

## Copying & Pasting Components

### Copy a component from App A:
1. Select the component or screen
2. Right-click → **Copy YAML** (or use the YAML editor)
3. The YAML is now on your clipboard

### Paste into App B:
1. Open the destination app
2. Right-click on the screen or container where you want it
3. Select **Paste YAML**
4. Power Apps recreates the full control tree with all formulas

> ⚠️ **Gotcha:** If the component references data sources, collections, or variables not present in App B, those references will show formula errors — you'll need to re-wire them.

---

## Sharing Components via YAML (Community Pattern)

This is how sites like **PowerLibs** share components — they give you raw YAML to paste. Here's the workflow:

1. Copy the YAML block from the source
2. In your app, right-click the screen → **Paste YAML**
3. The component appears on the canvas
4. Update any data source references

---

## Editing YAML Directly

You can edit properties directly in the YAML editor instead of clicking through the properties panel:

```yaml
# Change a button color directly in YAML
Button1 As Button:
    Fill: =RGBA(79, 142, 247, 1)
    Text: ="Save Changes"
    OnSelect: =Patch(MyList, Defaults(MyList), {Title: TextInput1.Text})
```

This is much faster for bulk property changes.

---

## Tips

- YAML copy/paste works across environments — you can share YAML between Dev and Prod tenants
- Always test pasted components in a blank screen first before integrating
- YAML edits don't trigger the undo stack the same way — save frequently
- If paste fails, check that you haven't mixed tabs and spaces in the YAML