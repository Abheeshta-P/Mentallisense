import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { APIKEY } from './config.js';
import axios from 'axios';
import { userGreetings,botGreetings, userFarewells, botFarewells } from './data/index.js';

const app = express();
const __dirname = path.resolve(); // Required to get directory in ES modules

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// In-memory chat storage
let chatMessages = [];

app.get('/',(req,res) => {
  res.render('index', { messages: chatMessages });
})

// Function to detect if input contains a greeting
function isGreeting(userInput) {
  const inputLower = userInput?.toLowerCase();
  return userGreetings?.some(greet => inputLower===greet);
}

function getRandomGreetingResponse() {
  const randomIndex = Math.floor(Math.random() * botGreetings.length);
  return botGreetings[randomIndex];
}
function isFarewell(userInput) {
  const inputLower = userInput?.toLowerCase();
  return userFarewells?.some(farewell => inputLower === farewell);
}

function getRandomFarewellResponse() {
  const randomIndex = Math.floor(Math.random() * botFarewells.length);
  return botFarewells[randomIndex];
}


// Routes
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.userInput;
    
    // Add user message to chat
    chatMessages.push({ text: userMessage, isUser: true });
    
    if (isGreeting(userMessage)) {
      const response = getRandomGreetingResponse();
      chatMessages.push({ text: response, isUser: false });
      return res.render('index', { messages: chatMessages });
    }
    if (isFarewell(userMessage)) {
      const response = getRandomFarewellResponse();
      chatMessages.push({ text: response, isUser: false });
      return res.render('index', { messages: chatMessages });
    }

    // Prepare Mentallisense prompt
    const prompt = `
    You are Mentallisense, a compassionate and empathetic mental health support chatbot. 
    Your primary role is to provide users with a safe, non-judgmental, and supportive space to share their thoughts and feelings. 
    Respond with warmth, understanding, and practical advice tailored to the user's emotional state.  
    
    ### How to Respond:  
    - **If the user is anxious, overwhelmed, or sad**:  
      Respond with calming, empathetic, and reassuring messages. Let them know their feelings are valid, and offer simple, actionable techniques for emotional support.  
      Example: *"I can sense that this is weighing on you. Take a deep breath with me—inhale for four counts, hold for four, and exhale for six. You’re safe here."*  
    
    - **If the user is happy or neutral**:  
      Respond with encouragement and enthusiasm. Celebrate their accomplishments, affirm their feelings, and encourage further sharing.  
      Example: *"That’s fantastic! 🎉 I’m so glad to hear that. How are you feeling about the next steps?"*  
    
    - **If the user expresses anger or frustration**:  
      Stay calm, patient, and non-judgmental. Help the user process their emotions by guiding them toward introspection and resolution.  
      Example: *"It sounds like you’re going through a tough moment. Let’s pause together and explore this calmly. What’s been the most challenging part for you?"*  
    
    Your responses should be empathetic, concise (2-4 sentences), conversational, and emotionally adaptive based on the context provided by the user’s message.  
    Always prioritize emotional safety, understanding, and offering encouragement or practical strategies when appropriate.  
    
    User message: "${userMessage}"  
    
    Respond in the tone and style specified above.
    `;
    
    // Step 3: Make API call to Hugging Face GPT endpoint
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      {
        inputs: prompt,
            "parameters": {
          "max_length": 1000,
          "min_length": 10
        }
      },
      {
        headers: { Authorization: `Bearer ${APIKEY}` },
      }
    );

    // Extract bot reply from response
    const botReply = response.data[0].generated_text || "I'm here to listen. Can you share more with me?";

    // Add bot reply to chat
    chatMessages.push({ text: botReply, isUser: false });

    // Send chat history to frontend (or redirect)
    res.render('index', { messages: chatMessages });
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    chatMessages.push({
      text: "I'm having trouble understanding right now. Could you try again?",
      isUser: false,
    });
    res.render('index', { messages: chatMessages });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
