// AI Assistant page

let _chatMessages = [
  {
    role: 'assistant',
    content: "Hi! I'm your AI trading assistant 🤖\n\nI can help you understand stock market concepts, trading strategies, and investment principles. Try one of the quick prompts below or ask me anything!",
    id: '0',
  }
];

function renderAIPage() {
  const quickPrompts = [
    { label: '📊 What is P/E ratio?',          key: 'pe ratio' },
    { label: '💰 Explain Dollar-Cost Averaging', key: 'dca'      },
    { label: '📈 How to read stock charts?',     key: 'chart'    },
    { label: '🎯 Best strategies for beginners', key: 'beginner' },
    { label: '🔮 Options trading explained',     key: 'options'  },
  ];

  const quickBtns = quickPrompts.map(p => `
    <button class="quick-prompt-btn" onclick="sendQuickPrompt('${escapeHtml(p.key)}', '${escapeHtml(p.label)}')">${p.label}</button>
  `).join('');

  const content = `
    <div class="page-header">
      <h1 class="page-title">AI Assistant</h1>
      <p class="page-subtitle">Ask me anything about stocks, trading strategies, and market analysis.</p>
    </div>

    <div class="chat-layout">
      <!-- Chat Window -->
      <div class="glass-card" style="display:flex;flex-direction:column;height:calc(100vh - 180px);min-height:500px;overflow:hidden;">
        <div id="chat-messages" class="chat-messages">
          ${renderChatMessages()}
        </div>
        <div class="chat-input-area">
          <div class="chat-input-row">
            <textarea class="chat-input" id="chat-input" rows="1" placeholder="Ask anything about stocks, trading, investing..."
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendChatMessage();}"
              oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"></textarea>
            <button class="btn btn-primary btn-icon" onclick="sendChatMessage()" style="padding:12px;align-self:flex-end;">
              ${Icons.send}
            </button>
          </div>
          <div style="font-size:0.75rem;color:var(--fg3);margin-top:8px;">
            For educational purposes only. Not financial advice.
          </div>
        </div>
      </div>

      <!-- Quick Prompts -->
      <div>
        <div class="glass-card p-4" style="margin-bottom:16px;">
          <div style="font-weight:700;font-size:0.9rem;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            ${Icons.bot} Quick Prompts
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">${quickBtns}</div>
        </div>

        <div class="glass-card p-4">
          <div style="font-weight:700;font-size:0.9rem;margin-bottom:12px;">Topics Covered</div>
          <div style="display:flex;flex-direction:column;gap:6px;font-size:0.8rem;color:var(--fg2);">
            <div>📈 Technical & Fundamental Analysis</div>
            <div>💼 Portfolio Management & Risk</div>
            <div>📊 Reading Financial Statements</div>
            <div>🎯 Options & Derivatives</div>
            <div>🤖 Algorithmic Trading Concepts</div>
            <div>🌍 Macro & Economic Indicators</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return renderAppShell('ai', 'AI Assistant', content);
}

function renderChatMessages() {
  return _chatMessages.map(msg => `
    <div class="chat-message ${msg.role}">
      <div class="chat-avatar">${msg.role === 'user' ? '👤' : '🤖'}</div>
      <div class="chat-bubble">
        <p>${formatAIResponse(msg.content)}</p>
      </div>
    </div>
  `).join('');
}

function addMessage(role, content) {
  const msg = { role, content, id: Date.now().toString() };
  _chatMessages.push(msg);

  const container = document.getElementById('chat-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `chat-message ${role} animate-fade-in`;
  div.innerHTML = `
    <div class="chat-avatar">${role === 'user' ? '👤' : '🤖'}</div>
    <div class="chat-bubble"><p>${formatAIResponse(content)}</p></div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'chat-message assistant animate-fade-in';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="chat-avatar">🤖</div>
    <div class="chat-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  document.getElementById('typing-indicator')?.remove();
}

function getAIResponse(question) {
  const q = question.toLowerCase();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (q.includes(key)) return response;
  }

  // Generic responses for other questions
  const generic = [
    "That's a great question! Stock market investing requires patience and research. Focus on understanding the fundamentals of the companies you invest in, and always diversify your portfolio.\n\nTry asking me about P/E ratios, dollar-cost averaging, or chart reading for more specific guidance!",
    "In investing, it's important to remember Warren Buffett's famous rules:\n1. Never lose money\n2. Never forget Rule #1\n\nThis means focusing on quality companies with strong fundamentals, buying at fair prices, and holding for the long term. Would you like to know more about specific strategies?",
    "Risk management is crucial in trading. Never risk more than 1-2% of your portfolio on a single trade. Use stop-loss orders to limit downside, and always have a clear exit strategy before entering a position.\n\nDiversification across sectors and asset classes helps reduce portfolio volatility.",
  ];

  return generic[Math.floor(Math.random() * generic.length)];
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  addMessage('user', text);
  showTyping();

  // Simulate AI thinking delay
  const delay = 800 + Math.random() * 1200;
  await new Promise(r => setTimeout(r, delay));

  removeTyping();
  addMessage('assistant', getAIResponse(text));
}

async function sendQuickPrompt(key, label) {
  addMessage('user', label);
  showTyping();

  await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
  removeTyping();

  const response = AI_RESPONSES[key] || getAIResponse(key);
  addMessage('assistant', response);
}
