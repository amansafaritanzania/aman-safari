AMAN SAFARI AI — RESPONSIVE STANDARD v2

CRITICAL RULE:
Never build the floating AI as a <section>.
Use:
<div class="aman-ai-panel" role="dialog">...</div>

Why:
Destination pages may contain global CSS such as:
section { padding: 85px 6%; }
That CSS can silently add huge padding inside the chat and squeeze the usable chat area.

Required isolation:
.aman-ai-panel {
  padding: 0 !important;
  margin: 0 !important;
  text-align: left !important;
  box-sizing: border-box !important;
  min-width: 0 !important;
}
.aman-ai-panel * { box-sizing: border-box; }

PHONE DESIGN:
- 12px gap from left/right/bottom
- chat height about 76dvh
- max-height calc(100dvh - 24px)
- rounded on all four corners
- website remains visible behind chat
- compact header on phones
- hide long subtitle on phones
- 34px avatar
- 32px close button
- message text 13px
- input text 16px
- composer remains visible
- use dynamic viewport units (dvh)
- on tiny phones use 8px gaps
- on short landscape screens allow up to 88dvh

BACKEND:
https://amanai-mdtj.onrender.com/chat

STATE:
Use the same localStorage userId/chatId across every Aman Safari page.

CONTEXT:
Send page-specific context with each visitor message.

Apply this standard to Index, Kilimanjaro, Gombe, Serengeti,
Ngorongoro, Tarangire, Ruaha, Nyerere, Lake Manyara, Mikumi,
Saadani, and every future destination page.
