import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
interface ChatBoxProps {
  apiKey: string;
}
git remote add origin https://github.com/LYxiaotian/your-repo-name.git

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = { role: 'user', content: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue('');
    fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [...messages, newMessage],
    })
    }).then((response)=>{
        if(response.ok){
            return response.json()
        }
    }).then((response)=>{
            const assistantMessage: Message = { role: 'assistant', content: response.choices[0].message.content };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box>
      <Paper elevation={3} style={{ padding: '16px', maxHeight: '500px', overflow: 'auto' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={message.content}
                secondary={message.role === 'user' ? 'You' : 'AI'}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box mt={2} display="flex">
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: '8px' }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;




