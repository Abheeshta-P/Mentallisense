<h1 align="center">Mentallisense 🧠</h1>

**Mentallisense** is built using Node.js, Express.js, and integrates with Hugging Face's inference API to provide empathetic mental health support. It allows users to interact with an AI-driven chatbot capable of recognizing emotional states and responding accordingly.


## ✨ Features
The Mentallisense chatbot comes with the following features:

1. **Conversational AI Chatbot** 🤖
   - Users can input messages, and the chatbot provides empathetic responses.

2. **Emotion Recognition Responses** 💬
   - The chatbot dynamically responds based on emotional tone detection, e.g., anxiety, happiness, frustration, sadness.

3. **Greeting & Farewell Responses** 👋
   - The bot detects user greetings and farewells to respond in contextually appropriate ways.

4. **Conversation History** 🕰️
   - The chatbot maintains a non persistent running history of chat messages to simulate a real-time conversation.


## 💻 Tech Stack
This project utilizes the following technologies:

- **Backend:**
  - Node.js
  - Express.js
    
- **Frontend:**
  - HTML
  - EJS (Embedded JavaScript Templating)

- **APIs:**
  - [Hugging Face Inference API](https://api-inference.huggingface.co/models/google/flan-t5-large)
  - API key integration for model inference calls.

- **Middleware:**
  - Body-parser
  - Express static serving


## 🛠️ Setup Instructions
Follow the steps below to run the Mentallisense chatbot locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/mentallisense.git
   cd mentallisense
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following structure to `.env` and replace `your_api_key_here` with your Hugging Face API key:
   
   ```javascript
    API = 'your_api_key_here';
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Open the App**
   - Navigate to `http://localhost:3000/` in your browser.


## ❌ Drawbacks & Limitations
1. **Emotion Detection is Contextual:**  
   The model may misinterpret nuanced emotions due to its limited understanding of context compared to a human therapist.
   
2. **API Latency:**  
   The response times depend on Hugging Face's inference server response latency, which can sometimes slow down during high traffic periods.

3. **Not a Replacement for Real Mental Health Therapy:**  
   This chatbot is solely designed for emotional support and awareness but should never replace a licensed mental health professional.

4. **Limited Training Data:**  
   Model is called through API, its responses are restricted to patterns learned during training and can vary with complex emotional queries.


## 🌱 Future Improvements
Here are some potential features to implement in upcoming iterations:

- **Improved Emotion Recognition:** Using a more advanced NLP pipeline to better understand context and emotions.
- **User Authentication:** Allowing users to save conversations and progress over time securely.
- **Expanded Database of Emotional Responses:** Train or fine-tune a custom model to expand the chatbot's emotional intelligence.
- **User Feedback Loop:** Allow users to rate responses for feedback on empathy and accuracy to help improve the model.
- **Add Multimedia Support:** Visual or audio relaxation tools (guided meditations, calming visuals).
