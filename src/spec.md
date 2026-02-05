# Specification

## Summary
**Goal:** Show a live click counter for the red button and persist the count in the browser so progress toward 1000 clicks survives refreshes.

**Planned changes:**
- Add a numeric click counter display to the main UI while the red button is visible (pre-explosion).
- Increment the counter by 1 on each successful button click and prevent increments during the explosion state.
- Persist the counter value in browser storage and restore it on page load/refresh, falling back safely to 0 if missing/invalid.
- Ensure the existing explosion sequence (trigger at exactly 1000 clicks, animation, redirect) continues to behave as before.

**User-visible outcome:** Users can see how many times they have clicked the red button, and the count remains after refreshing the page until the explosion triggers at 1000 clicks.
