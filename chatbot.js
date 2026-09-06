document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chat-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chatbot-messages");

    const OPENAI_API_KEY = "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"; // Replace with your OpenAI API key
    const API_URL = "https://api.openai.com/v1/chat/completions";

    // Toggle Chatbot Visibility
    chatToggle.addEventListener("click", () => {
        chatbotContainer.style.display = "flex";
        chatToggle.style.display = "none";
    });

    closeChat.addEventListener("click", () => {
        chatbotContainer.style.display = "none";
        chatToggle.style.display = "block";
    });

    // Add Message to Chat
    const addMessage = (message, type) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = type === "bot" ? "bot-message" : "user-message";
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Fetch Response from OpenAI API
    const fetchChatGPTResponse = async (userMessage) => {
        addMessage("Thinking...", "bot");
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a Hydro Hub assistant focused on water conservation, rainwater harvesting, desalination, and community participation. Provide concise, informative answers.",
                        },
                        { role: "user", content: userMessage },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await response.json();
            const reply = data.choices[0].message.content.trim();
            addMessage(reply, "bot");
        } catch (error) {
            console.error("Error fetching response:", error);
            addMessage(
                "Oops! Something went wrong. Please try again later.",
                "bot"
            );
        }
    };

    // Handle Send Button Click
    sendBtn.addEventListener("click", async () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, "user");
            await fetchChatGPTResponse(userMessage);
            userInput.value = "";
        }
    });
});
