(function () {
  "use strict";

  const API = "https://amanai-mdtj.onrender.com/chat/safari-public";
  const STORAGE_USER = "amanSafariUserId";
  const STORAGE_CHAT = "amanSafariChatId";
  const STORAGE_HISTORY = "amanSafariHistory";

  const makeId = (prefix) => {
    if (window.crypto && crypto.randomUUID) return prefix + "_" + crypto.randomUUID();
    return prefix + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
  };

  const userId = localStorage.getItem(STORAGE_USER) || makeId("visitor");
  const chatId = localStorage.getItem(STORAGE_CHAT) || makeId("safari");
  localStorage.setItem(STORAGE_USER, userId);
  localStorage.setItem(STORAGE_CHAT, chatId);

  let history = [];
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_HISTORY) || "[]");
    if (Array.isArray(saved)) history = saved.slice(-20);
  } catch (_) {}

  function pageContext() {
    const title = document.title || "Aman Safari Tanzania";
    const path = location.pathname || "/";
    const h1 = document.querySelector("h1")?.textContent?.trim() || "";
    const desc = document.querySelector('meta[name="description"]')?.content?.trim() || "";
    return [
      `Website: Aman Safari Tanzania`,
      `Page title: ${title}`,
      `Page path: ${path}`,
      h1 ? `Main heading: ${h1}` : "",
      desc ? `Page description: ${desc}` : ""
    ].filter(Boolean).join("\n").slice(0, 1800);
  }

  const style = document.createElement("style");
  style.textContent = `
    .aman-ai-launcher,.aman-ai-panel,.aman-ai-panel *{box-sizing:border-box}
    .aman-ai-launcher{position:fixed;right:18px;bottom:18px;z-index:2147483000;width:54px;height:54px;border:0;border-radius:50%;background:#173f2f;color:#fff;cursor:pointer;box-shadow:0 12px 34px rgba(0,0,0,.24);font:700 22px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    .aman-ai-panel{padding:0!important;margin:0!important;text-align:left!important;box-sizing:border-box!important;min-width:0!important;position:fixed;right:18px;bottom:84px;z-index:2147483001;width:min(390px,calc(100vw - 36px));height:min(650px,76dvh);max-height:calc(100dvh - 24px);display:none;flex-direction:column;overflow:hidden;border:1px solid rgba(20,45,35,.14);border-radius:22px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.25);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17211c}
    .aman-ai-panel.aman-ai-open{display:flex}
    .aman-ai-head{flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:12px 12px 11px;background:linear-gradient(135deg,#173f2f,#235b43);color:#fff}
    .aman-ai-avatar{width:38px;height:38px;flex:0 0 38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.16);font-size:19px}
    .aman-ai-headcopy{min-width:0;flex:1}
    .aman-ai-title{margin:0;font-size:14px;font-weight:800;line-height:1.15}
    .aman-ai-subtitle{margin:3px 0 0;font-size:11px;line-height:1.25;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .aman-ai-close{width:34px;height:34px;flex:0 0 34px;border:0;border-radius:50%;background:rgba(255,255,255,.13);color:#fff;cursor:pointer;font-size:20px;line-height:1}
    .aman-ai-messages{flex:1 1 auto;min-height:0;overflow-y:auto;padding:14px 12px;background:linear-gradient(#faf9f6,#f4f1e9);overscroll-behavior:contain}
    .aman-ai-msg{max-width:86%;margin:0 0 10px;padding:10px 11px;border-radius:15px;font-size:13px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}
    .aman-ai-msg.user{margin-left:auto;background:#1f6a4b;color:#fff;border-bottom-right-radius:5px}
    .aman-ai-msg.ai{margin-right:auto;background:#fff;color:#1c2822;border:1px solid rgba(23,63,47,.09);border-bottom-left-radius:5px;box-shadow:0 4px 12px rgba(0,0,0,.04)}
    .aman-ai-typing{opacity:.7;font-style:italic}
    .aman-ai-compose{flex:0 0 auto;display:flex;align-items:flex-end;gap:8px;padding:10px;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding-bottom:max(10px,env(safe-area-inset-bottom))}
    .aman-ai-input{min-width:0;flex:1;max-height:116px;resize:none;border:1px solid #d8ddd9;border-radius:14px;padding:10px 11px;outline:none;font:400 16px/1.35 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17211c;background:#fff}
    .aman-ai-input:focus{border-color:#3e775f;box-shadow:0 0 0 3px rgba(62,119,95,.10)}
    .aman-ai-send{width:42px;height:42px;flex:0 0 42px;border:0;border-radius:13px;background:#173f2f;color:#fff;cursor:pointer;font-size:17px;font-weight:800}
    .aman-ai-send:disabled{opacity:.5;cursor:not-allowed}
    @media (max-width:600px){
      .aman-ai-launcher{right:12px;bottom:12px;width:50px;height:50px}
      .aman-ai-panel{left:12px;right:12px;bottom:12px;width:auto;height:76dvh;max-height:calc(100dvh - 24px);border-radius:20px}
      .aman-ai-head{padding:9px 10px}
      .aman-ai-avatar{width:34px;height:34px;flex-basis:34px;font-size:17px}
      .aman-ai-close{width:32px;height:32px;flex-basis:32px}
      .aman-ai-subtitle{display:none}
      .aman-ai-title{font-size:13px}
      .aman-ai-messages{padding:11px 9px}
      .aman-ai-msg{font-size:13px;max-width:88%;padding:9px 10px}
      .aman-ai-compose{padding:8px;padding-bottom:max(8px,env(safe-area-inset-bottom))}
    }
    @media (max-width:340px){
      .aman-ai-launcher{right:8px;bottom:8px}
      .aman-ai-panel{left:8px;right:8px;bottom:8px;max-height:calc(100dvh - 16px)}
    }
    @media (max-height:520px) and (orientation:landscape){
      .aman-ai-panel{height:88dvh;max-height:88dvh;bottom:6dvh}
      .aman-ai-messages{padding-top:8px;padding-bottom:8px}
    }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "aman-ai-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open Safari AI");
  launcher.textContent = "✦";

  const panel = document.createElement("div");
  panel.className = "aman-ai-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "false");
  panel.setAttribute("aria-label", "Aman Safari AI");
  panel.innerHTML = `
    <div class="aman-ai-head">
      <div class="aman-ai-avatar" aria-hidden="true">🦁</div>
      <div class="aman-ai-headcopy">
        <p class="aman-ai-title">Aman Safari AI</p>
        <p class="aman-ai-subtitle">Tanzania safari planning assistant</p>
      </div>
      <button class="aman-ai-close" type="button" aria-label="Close Safari AI">×</button>
    </div>
    <div class="aman-ai-messages" aria-live="polite"></div>
    <form class="aman-ai-compose">
      <textarea class="aman-ai-input" rows="1" maxlength="1800" placeholder="Ask about your Tanzania safari…" aria-label="Message Safari AI"></textarea>
      <button class="aman-ai-send" type="submit" aria-label="Send message">➤</button>
    </form>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const closeBtn = panel.querySelector(".aman-ai-close");
  const messages = panel.querySelector(".aman-ai-messages");
  const form = panel.querySelector(".aman-ai-compose");
  const input = panel.querySelector(".aman-ai-input");
  const sendBtn = panel.querySelector(".aman-ai-send");

  function addMessage(text, role, extraClass) {
    const el = document.createElement("div");
    el.className = `aman-ai-msg ${role}${extraClass ? " " + extraClass : ""}`;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function saveHistory() {
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.slice(-20)));
  }

  if (!history.length) {
    addMessage("Hi! Ask me about Tanzania safaris, destinations, seasons, itineraries, or Kilimanjaro planning.", "ai");
  } else {
    history.slice(-10).forEach(item => addMessage(item.content, item.role === "assistant" ? "ai" : "user"));
  }

  function openPanel() {
    panel.classList.add("aman-ai-open");
    launcher.style.display = "none";
    setTimeout(() => input.focus(), 40);
  }

  function closePanel() {
    panel.classList.remove("aman-ai-open");
    launcher.style.display = "block";
  }

  launcher.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("aman-ai-open")) closePanel();
  });

  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 116) + "px";
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) form.requestSubmit();
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;

    input.value = "";
    input.style.height = "auto";
    sendBtn.disabled = true;
    addMessage(text, "user");

    const requestHistory = history.slice(-8);
    history.push({ role: "user", content: text });
    saveHistory();

    const typing = addMessage("Thinking…", "ai", "aman-ai-typing");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          chatId,
          message: text,
          pageContext: pageContext(),
          history: requestHistory
        })
      });

      let data = {};
      try { data = await response.json(); } catch (_) {}
      typing.remove();

      const reply = data.reply || data.message || "I’m having trouble reaching the Safari AI right now. Please try again or use WhatsApp.";
      addMessage(reply, "ai");
      if (response.ok) {
        history.push({ role: "assistant", content: reply });
        saveHistory();
      }
    } catch (error) {
      typing.remove();
      addMessage("I’m having trouble reaching the Safari AI right now. Please try again or use WhatsApp.", "ai");
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  });
})();
