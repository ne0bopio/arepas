---
name: Don't delete working code without asking
description: User gets concerned when I try to remove code that's currently working — only delete what was explicitly approved
type: feedback
---

Don't delete or remove working code unless explicitly asked. When the user approves deleting one specific thing (e.g., an unused function), do only that — don't expand the scope to remove other code nearby.

**Why:** User got alarmed when I tried to delete the `CheckoutForm` component after they only approved removing the dead `handleSubmit`/`handleStripeSubmit` functions. The component is actively used.

**How to apply:** Stick to exactly what was approved. If you see other cleanup opportunities, mention them separately and wait for approval.
