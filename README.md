# mooca moment

A short mental wellbeing check-in created for the OOCA UX/UI Product Designer assignment. The experience invites people to name how they feel, choose what they need, and take a small moment for themselves.

## Experience

1. Choose the word closest to how you feel, including **“ยังบอกไม่ถูก”** (not sure yet).
2. Choose one direction: take a rest, clarify a thought, or prepare to talk with someone you trust.
3. Complete a short activity and review your selected feeling, need, and takeaway.

The interface supports desktop and mobile layouts. Users can go back, choose another direction, or start a new moment.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite in your browser.

To check the production build:

```bash
npm run build
npm run preview
```

## Stack and scope

Built with React, Vite, CSS, and local assets. This is a frontend prototype with no account, backend, database, diagnosis, or automatic message sending. The consultation links open the OOCA website.

Answers and drafts are held temporarily in the current page session. Starting a new moment or reloading the page resets them. Text copied to the clipboard is controlled separately by the browser and operating system.

The experience is designed to take around two minutes; that duration has not been validated with target users.
