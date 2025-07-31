const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('#send-btn');
const chatBox = document.querySelector('.chatbox ul');

const API_KEY =" ";

const createChatLi = (message, className) => {
  const chatLi = document.createElement('li');
  chatLi.classList.add("chat", className);

  let content = className === "outgoing"
    ? `<p>${message}</p>`
    : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;

  chatLi.innerHTML = content;
  return chatLi;
};

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    
    const requestOutputs = {
         method: "POST",
         Headers: {
            "content-type" : "application/json",
            "authorization" : `Bearer ${API_KEY}`
         },
         body: JSON.stringify({
            model: "gpt-4.1-2025-04-14",
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ]
         })
    }
}

const handleChat = () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Append outgoing message
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    //display "thinking..." message
    chatBox.appendChild(createChatLi("thinking...", "incoming"));
    genertaeResponse();
  },600); // Simulate a delay for the bot response
};

sendChatBtn.addEventListener("click", handleChat); 
