// ======================================================
// AMAN SAFARI TANZANIA
// SHARED SAFARI AI CHAT
// Connects to Aman AI Safari Expert
// ======================================================

(() => {

    const API_URL =
        "https://amanai-mdtj.onrender.com/chat";

    const STORAGE_USER =
        "aman_safari_user_id";

    const STORAGE_CHAT =
        "aman_safari_chat_id";


    // ==================================================
    // USER ID
    // ==================================================

    let userId =
        localStorage.getItem(
            STORAGE_USER
        );

    if (!userId) {

        userId =
            "safari_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 9);

        localStorage.setItem(
            STORAGE_USER,
            userId
        );
    }


    // ==================================================
    // CHAT ID
    // ==================================================

    let chatId =
        localStorage.getItem(
            STORAGE_CHAT
        );


    // ==================================================
    // CREATE CHAT UI
    // ==================================================

    const style =
        document.createElement("style");

    style.textContent = `

        #amanSafariAIButton {

            position: fixed;

            right: 18px;
            bottom: 86px;

            width: 58px;
            height: 58px;

            border-radius: 50%;

            border: 0;

            background: #b89552;

            color: #fff;

            font-size: 24px;

            cursor: pointer;

            z-index: 99999;

            box-shadow:
                0 8px 24px rgba(0,0,0,.25);

        }


        #amanSafariAIButton:hover {

            transform: scale(1.05);

        }


        #amanSafariAI {

            position: fixed;

            right: 18px;
            bottom: 155px;

            width: min(
                380px,
                calc(100vw - 28px)
            );

            height: 560px;

            background: #fff;

            border-radius: 20px;

            overflow: hidden;

            box-shadow:
                0 20px 55px rgba(0,0,0,.28);

            display: none;

            flex-direction: column;

            z-index: 99998;

            border: 1px solid #17231d22;

        }


        #amanSafariAI.open {

            display: flex;

        }


        #amanSafariAIHeader {

            background: #102019;

            color: #fff;

            padding: 17px 18px;

            display: flex;

            align-items: center;

            justify-content: space-between;

        }


        #amanSafariAITitle {

            font-family:
                Georgia,
                serif;

            font-size: 24px;

        }


        #amanSafariAISubtitle {

            display: block;

            font-family:
                Arial,
                sans-serif;

            font-size: 9px;

            letter-spacing: .14em;

            text-transform: uppercase;

            color: #e3c987;

            margin-top: 3px;

        }


        #amanSafariAIClose {

            background: transparent;

            border: 0;

            color: #fff;

            font-size: 24px;

            cursor: pointer;

        }


        #amanSafariAIMessages {

            flex: 1;

            overflow-y: auto;

            padding: 16px;

            background: #f7f3ea;

        }


        .amanSafariMessage {

            margin-bottom: 12px;

            display: flex;

        }


        .amanSafariMessage.user {

            justify-content: flex-end;

        }


        .amanSafariBubble {

            max-width: 84%;

            padding: 11px 14px;

            border-radius: 15px;

            font-family:
                Arial,
                sans-serif;

            font-size: 13px;

            line-height: 1.55;

            white-space: pre-wrap;

            word-wrap: break-word;

        }


        .amanSafariMessage.assistant
        .amanSafariBubble {

            background: #fff;

            color: #17231d;

            border-bottom-left-radius: 5px;

        }


        .amanSafariMessage.user
        .amanSafariBubble {

            background: #102019;

            color: #fff;

            border-bottom-right-radius: 5px;

        }


        #amanSafariAIInputArea {

            padding: 10px;

            background: #fff;

            border-top: 1px solid #17231d18;

            display: flex;

            gap: 8px;

        }


        #amanSafariAIInput {

            flex: 1;

            resize: none;

            height: 46px;

            max-height: 100px;

            padding: 12px;

            border: 1px solid #d8d8d2;

            border-radius: 12px;

            outline: none;

            font-family: Arial, sans-serif;

            font-size: 13px;

        }


        #amanSafariAISend {

            width: 48px;

            border: 0;

            border-radius: 12px;

            background: #b89552;

            color: #fff;

            cursor: pointer;

            font-size: 18px;

        }


        #amanSafariAISend:disabled {

            opacity: .55;

            cursor: not-allowed;

        }


        .amanSafariTyping {

            opacity: .65;

            font-style: italic;

        }


        @media(max-width:600px) {

            #amanSafariAI {

                right: 10px;
                bottom: 145px;

                width: calc(100vw - 20px);

                height: min(
                    70vh,
                    560px
                );

            }

            #amanSafariAIButton {

                right: 14px;

                bottom: 82px;

            }

        }

    `;

    document.head.appendChild(style);


    // ==================================================
    // BUTTON
    // ==================================================

    const button =
        document.createElement("button");

    button.id =
        "amanSafariAIButton";

    button.setAttribute(
        "aria-label",
        "Open Safari AI"
    );

    button.innerHTML = "✦";

    document.body.appendChild(button);


    // ==================================================
    // CHAT WINDOW
    // ==================================================

    const chat =
        document.createElement("div");

    chat.id =
        "amanSafariAI";

    chat.innerHTML = `

        <div id="amanSafariAIHeader">

            <div>

                <div id="amanSafariAITitle">
                    Safari AI
                </div>

                <span id="amanSafariAISubtitle">
                    Aman Safari Tanzania
                </span>

            </div>

            <button
                id="amanSafariAIClose"
                aria-label="Close Safari AI"
            >
                ×
            </button>

        </div>


        <div id="amanSafariAIMessages">

            <div class="amanSafariMessage assistant">

                <div class="amanSafariBubble">
                    Karibu! 🦁
                    I can help you plan your Tanzania safari,
                    choose destinations, understand seasons,
                    compare parks, and build an itinerary.
                </div>

            </div>

        </div>


        <div id="amanSafariAIInputArea">

            <textarea
                id="amanSafariAIInput"
                placeholder="Ask about your Tanzania safari..."
            ></textarea>

            <button
                id="amanSafariAISend"
                aria-label="Send message"
            >
                ➤
            </button>

        </div>

    `;

    document.body.appendChild(chat);


    // ==================================================
    // ELEMENTS
    // ==================================================

    const closeButton =
        document.getElementById(
            "amanSafariAIClose"
        );

    const messagesBox =
        document.getElementById(
            "amanSafariAIMessages"
        );

    const input =
        document.getElementById(
            "amanSafariAIInput"
        );

    const sendButton =
        document.getElementById(
            "amanSafariAISend"
        );


    // ==================================================
    // OPEN / CLOSE
    // ==================================================

    button.addEventListener(
        "click",
        () => {

            chat.classList.toggle(
                "open"
            );

            if (
                chat.classList.contains(
                    "open"
                )
            ) {
                input.focus();
            }

        }
    );


    closeButton.addEventListener(
        "click",
        () => {

            chat.classList.remove(
                "open"
            );

        }
    );


    // ==================================================
    // ADD MESSAGE
    // ==================================================

    function addMessage(
        role,
        text
    ) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            `amanSafariMessage ${role}`;

        const bubble =
            document.createElement("div");

        bubble.className =
            "amanSafariBubble";

        bubble.textContent =
            text;

        wrapper.appendChild(
            bubble
        );

        messagesBox.appendChild(
            wrapper
        );

        messagesBox.scrollTop =
            messagesBox.scrollHeight;

    }


    // ==================================================
    // TYPING INDICATOR
    // ==================================================

    function showTyping() {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "amanSafariMessage assistant";

        wrapper.id =
            "amanSafariTyping";

        const bubble =
            document.createElement("div");

        bubble.className =
            "amanSafariBubble amanSafariTyping";

        bubble.textContent =
            "Safari AI is thinking...";

        wrapper.appendChild(
            bubble
        );

        messagesBox.appendChild(
            wrapper
        );

        messagesBox.scrollTop =
            messagesBox.scrollHeight;

    }


    function removeTyping() {

        const typing =
            document.getElementById(
                "amanSafariTyping"
            );

        if (typing) {
            typing.remove();
        }

    }


    // ==================================================
    // SEND MESSAGE
    // ==================================================

    async function sendMessage() {

        const message =
            input.value.trim();

        if (!message) {
            return;
        }

        addMessage(
            "user",
            message
        );

        input.value = "";

        sendButton.disabled =
            true;

        showTyping();

        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                message,

                                userId,

                                chatId

                            })
                    }
                );


            const data =
                await response.json();


            removeTyping();


            if (
                data.chatId &&
                data.chatId !== chatId
            ) {

                chatId =
                    data.chatId;

                localStorage.setItem(
                    STORAGE_CHAT,
                    chatId
                );

            }


            if (
                !response.ok ||
                !data.reply
            ) {

                addMessage(
                    "assistant",
                    "Sorry, Safari AI could not respond right now."
                );

                return;
            }


            addMessage(
                "assistant",
                data.reply
            );

        }
        catch (error) {

            console.error(
                "Safari AI error:",
                error
            );

            removeTyping();

            addMessage(
                "assistant",
                "I couldn't connect to Safari AI right now. Please try again."
            );

        }
        finally {

            sendButton.disabled =
                false;

            input.focus();

        }

    }


    // ==================================================
    // SEND BUTTON
    // ==================================================

    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // ==================================================
    // ENTER TO SEND
    // SHIFT + ENTER = NEW LINE
    // ==================================================

    input.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


})();
