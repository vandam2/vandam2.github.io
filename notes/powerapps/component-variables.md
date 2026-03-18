# Component Custom Properties & Output Variables

## Why Use Components?

Components let you build a control once and reuse it across multiple screens or apps. Think of them like functions — they take inputs, do something, and optionally return outputs.

---

## Creating a Component

1. In Power Apps Studio → **Insert** → **New Component**
2. A blank component canvas opens
3. Add controls to it just like a screen
4. Define custom properties in the **Properties** panel on the right

---

## Input Properties (Data In)

Input properties pass values **into** the component from the parent screen.

```
Property Name: ButtonLabel
Type: Text
Default: "Click Me"
```

Inside the component, reference it like:
```powerfx
// On a label inside the component
Text: =ComponentName.ButtonLabel
```

On the parent screen, pass a value in:
```powerfx
MyComponent.ButtonLabel = "Save Record"
```

**Supported input property types:**
- Text, Number, Boolean, Color, Record, Table, Screen, Image

---

## Output Properties (Data Out)

Output properties send values **back** from the component to the parent.

```
Property Name: SelectedValue
Type: Text
```

Inside the component, set the output value:
```powerfx
// On a dropdown inside the component
// Set the output to whatever the user picks
SelectedValue: =Dropdown1.Selected.Value
```

On the parent screen, read it like:
```powerfx
// In any formula on the parent screen
Label1.Text = MyComponent.SelectedValue
```

---

## Raising Events (Behavior Properties)

Behavior properties let the component trigger actions on the parent screen — like a button click bubbling up.

```
Property Name: OnSave
Type: Action (Behavior)
```

Inside the component, call it when something happens:
```powerfx
// Inside the component's save button OnSelect
OnSelect: =MyComponent.OnSave()
```

On the parent screen, define what happens:
```powerfx
MyComponent.OnSave = Patch(MyList, Defaults(MyList), {Title: "New Item"})
```

---

## Passing Records as Properties

You can pass an entire record into a component — useful for edit forms.

```
Property Name: CurrentRecord
Type: Record
```

Inside the component:
```powerfx
TextInput_Name.Default: =ComponentName.CurrentRecord.Title
TextInput_Email.Default: =ComponentName.CurrentRecord.Email
```

On parent screen:
```powerfx
MyFormComponent.CurrentRecord = Gallery1.Selected
```

---

## Common Gotchas

### Circular dependency errors
If an output property references an input property that references the output, you'll get a circular dependency error. Break the chain by using a local variable inside the component.

```powerfx
// Inside component — use a variable to break the cycle
OnSelect of a button: Set(varLocalValue, TextInput1.Text)
// Then have the output property reference the variable
OutputProp: =varLocalValue
```

### Components don't share variables with parent screens
`Set()` and `UpdateContext()` inside a component are local to that component. Use output properties or behavior properties to communicate back to the parent.

### Table input properties
If passing a table in, Power Apps needs to know the schema at design time. Use `AddColumns()` or define a sample record in the default value.

---

## Tips

- Keep components focused — one component, one job
- Name properties clearly: `OnSave` not `BehaviorProp1`
- Test components in isolation on a dedicated TestScreen before using them everywhere
- Document your properties with the Description field — future you will thank you
