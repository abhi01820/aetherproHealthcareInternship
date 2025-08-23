import { useState, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (isGenerating && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const text = lastMessage.content;
        let index = 0;
        setDisplayedMessage('');
        setIsTyping(true);
        
        const timer = setInterval(() => {
          if (index < text.length) {
            setDisplayedMessage(text.slice(0, index + 1));
            index++;
          } else {
            clearInterval(timer);
            setIsTyping(false);
            setIsGenerating(false);
          }
        }, 20); // Adjust speed of typing animation
        
        return () => clearInterval(timer);
      }
    }
  }, [isGenerating, messages]);

  const sendMessage = async (userMessage: string) => {
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    
    try {
      const res = await fetch('/api/test-openrouter');
      const data = await res.json();
      
      const assistantMessage = { role: 'assistant', content: data.reply };
      setMessages([...newMessages, assistantMessage]);
      setIsGenerating(true);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-popup">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.role === 'assistant' && idx === messages.length - 1 && isTyping ? (
                <div className="typing-animation">
                  {displayedMessage}
                  <span className="typing-cursor"></span>
                </div>
              ) : (
                <span>{msg.content}</span>
              )}
            </div>
          </div>
        ))}
        
        {isGenerating && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <div className="typing-indicator">
            <span>AI is thinking</span>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isTyping || isGenerating}
        />
        <button onClick={handleSend} disabled={isTyping || isGenerating || !input.trim()}>
          {isTyping || isGenerating ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
