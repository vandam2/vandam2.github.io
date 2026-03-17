# Approval Flows — Multi-Stage & Escalation

## Basic Single Approver

The simplest approval flow:

```
Trigger: When item created (SharePoint)
   ↓
Start and wait for an approval
   Type: Approve/Reject - First to respond
   Title: "Please approve: @{triggerBody()?['Title']}"
   Assigned to: manager@company.com
   ↓
Condition: Outcome equals 'Approve'
   Yes → Update SharePoint item (Status = Approved)
   No  → Update SharePoint item (Status = Rejected)
        → Send rejection email to requestor
```

---

## Sequential Multi-Stage Approval

Each approver must approve before the next is asked:

```
Stage 1: Line Manager approval
   ↓ (only if approved)
Stage 2: Department Head approval
   ↓ (only if approved)
Stage 3: Finance approval
   ↓ (only if approved)
Final: Update record + notify requestor
```

**Implementation:**
Use three separate **Start and wait for an approval** actions in sequence. After each one, add a condition checking `outputs('Approval_Stage_1')?['body/outcome']` equals `'Approve'`. The **No** branch handles rejection at each stage.

---

## Parallel Approval (All Must Approve)

All approvers are asked simultaneously — all must approve:

```
Start and wait for an approval
   Type: Approve/Reject - Everyone must approve
   Assigned to: approver1@co.com;approver2@co.com;approver3@co.com
```

With **Everyone must approve**, the flow only moves forward when all have approved. If any one rejects, it's rejected.

---

## Parallel Approval (First to Respond)

First response wins — useful for when any one approver can approve:

```
Start and wait for an approval
   Type: Approve/Reject - First to respond
   Assigned to: approver1@co.com;approver2@co.com
```

---

## Escalation with Timeout

If an approver doesn't respond in time, auto-escalate:

```
Start and wait for an approval
   Type: Approve/Reject - First to respond
   Assigned to: manager@company.com
   ↓
[After the approval — configure Run After: is successful, has timed out]

Condition: Did approval time out?
   Check: @{equals(outputs('Approval')?['body/outcome'], 'Timed Out')}
   
   Yes (timed out) →
      Send escalation email to senior manager
      Update SharePoint: Status = Escalated
      Start new approval for senior manager
   
   No →
      Process normal approve/reject
```

**Setting the timeout:**
In the approval action settings, enable **Duration** and set it (e.g., PT48H = 48 hours, P3D = 3 days).

---

## Storing Approval Outcomes Back to SharePoint

Always write the outcome back to your list for audit purposes:

```powerfx
// Update SharePoint item after approval
Site: your-site.sharepoint.com
List: Requests
ID: triggerBody()?['ID']
Fields:
  ApprovalStatus: outputs('Approval')?['body/outcome']
  ApprovedBy: outputs('Approval')?['body/responder/email']
  ApprovalDate: outputs('Approval')?['body/completionDate']
  ApproverComments: outputs('Approval')?['body/comments']
```

---

## Sending Approval Reminders

Add a **Do Until** loop that sends reminders every 24 hours until the approval is complete:

```
[Start approval — don't wait, fire and forget via parallel branch]

[Do Until: approval is complete OR count > 3]
  ├── Delay: 1 day
  ├── Check if approval still pending
  └── Send reminder email if still pending
```

---

## Tips

- Always include the request details AND a direct link to the item in the approval email body
- Use **Adaptive Cards** in Teams approvals for a richer experience than email
- The approval action itself stores history — link to it from your SharePoint item
- Test with your own email first before rolling out to real approvers
- Consider adding a **Cancel approval** path if the original request is withdrawn
