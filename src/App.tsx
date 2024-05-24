import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography } from '@mui/material';
import ApiKeyInput from './components/ApiKeyInput';
import ChatBox from './components/ChatBox';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          AI Chat App
        </Typography>
        {!apiKey ? (
          <ApiKeyInput onSubmit={setApiKey} />
        ) : (
          <ChatBox apiKey={apiKey} />
        )}
      </Box>
    </Container>
  );
};

export default App;
