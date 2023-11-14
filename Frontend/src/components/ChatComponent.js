import React, { useState } from 'react';
import axios from 'axios';

function ChatComponent() {
  const [userQuery, setUserQuery] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleInputChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleQuestionSubmit = async () => {
    try {
      const response = await axios.post('/api/chatbot-response', { question: userQuery });
      setBotResponse(response.data.response);
    } catch (error) {
      console.error('Error getting response from chatbot', error);
      // Handle error gracefully
    }
  };

  return (
    <div>
      <input type="text" value={userQuery} onChange={handleInputChange} />
      <button onClick={handleQuestionSubmit}>Ask</button>
      <p>{botResponse}</p>
    </div>
  );
}

export default ChatComponent;
