import React, { useState, useRef, useEffect } from 'react';

const AskMe = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Your personal information context for the LLM
  const personalContext = `
You are an AI assistant representing a developer's portfolio. Answer questions naturally and concisely.
Here is the information about the developer:

PERSONAL INFO:
- Name: [Your Name]
- Age: 22 years old
- Location: Hyderabad, Telangana, India
- Role: Full Stack Developer & Machine Learning Enthusiast

EDUCATION:
- Bachelor's degree in Computer Science
- Graduated: 2024

TECHNICAL SKILLS:
- Programming Languages: C, Python, Java, JavaScript
- Frontend: React.js, HTML5, CSS3
- Backend: Node.js, Express.js, Spring Boot
- Database: MongoDB
- ML/AI: Machine Learning, scikit-learn, Pandas, NumPy

PROJECTS:
1. University Website Full-Stack (2024):
   - Full-stack web app for students
   - Tech: Node.js, Express.js, MongoDB
   - Integrated ChatGPT APIs
   - 40% faster API performance

2. House Price Prediction Model (2025):
   - ML model with 79% accuracy
   - Tech: Python, scikit-learn, Streamlit
   - Live demo: https://house-price-predicction.streamlit.app/

CERTIFICATIONS:
- Full Stack Web Development (2024)
- Machine Learning Specialization by Andrew Ng (2024)
- Node.js & Express.js (2023)
- Data Science with Python (2024)

Answer questions naturally and keep responses concise.
`;

  // Local Q&A Database
const qaDatabase = {
    // --- Existing Entries (for context) ---
    'age': 'I am 22 years old.',
    'how old are you': 'I am 22 years old.',
    'name': 'My name is Prashant Biradar',
    'who are you': 'I am a Full Stack Developer and Machine Learning enthusiast\npassionate about building innovative solutions.',
    'location': 'I am based in Hyderabad, Telangana, India.',
    'where are you from': 'I am from Gulbarga,Karnataka,India.',
    'education': 'Currently Pursuing My Bachelor of Technology\nExpected To Graduate In May 2026',
    'college':'swami vivekananda Institute of technology seunderabad',
    'institution':'swami vivekananda Institute of technology seunderabad',
    '':'',
    'university': 'I studied Computer Science at JNTUH, graduating in May 2026.',
    'skills': 'My technical skills include:\nC, Python, Java, JavaScript, React.js, Node.js, MongoDB,\nExpress.js, Spring Boot, DevOps, and Machine Learning.',
    'programming languages': 'I am proficient in:\nC\nPython\nJava\nJavaScript',
    'frontend': 'For frontend development, I use:\nReact.js\nHTML5\nCSS3\nJavaScript',
    'backend': 'For backend, I work with:\nNode.js\nExpress.js\nSpring Boot\nMongoDB',
    'experience': 'I have built full-stack applications including:\n- A University Website with ChatGPT integration (40% faster API performance).\n- A House Price Prediction model with 79% accuracy.',
    'projects': 'My notable projects include:\n1) University Website Full-Stack with Node.js, Express, MongoDB and ChatGPT integration.\n2) House Price Prediction ML model using Python, scikit-learn, and Streamlit.',
    'hobbies': 'I enjoy:\nCoding\nLearning new technologies\nContributing to open source\nSolving algorithmic problems',
    'interests': 'I\'m passionate about:\nAI/ML\nWeb Development\nCreating solutions that make a real impact.',
    'contact': 'You can reach me through my portfolio contact form\nor connect with me on LinkedIn and GitHub!',
    'help': 'You can ask me about: age, skills, education, experience, projects, hobbies, contact,\nor anything else about me! Type "clear" to clear the terminal.',
    'hello': 'Hello! 👋 Welcome to my portfolio.\nFeel free to ask me anything!',
    'hi': 'Hi there! 😊 What would you like to know about me?',
    'hey': 'Hey! How can I help you today?',
    'i love u':'I love YOU Too ❤️',
    'fuck you':"Let's keep things respectful 😄 Ask me about my projects, skills, or experience.",
    'certificates':'Machine Learning in Python: freeCodeCamp\nDSA: GeeksforGeeks\n AI Fundamentals:IBM',
    'tell me about yourself':'I’m Prashant, a final-year B.Tech student in Computer Science with a specialization in AI & ML. I enjoy solving problems through code and building web-based applications. I’ve worked on projects like a university website and a house price prediction app. My goal is to grow as a full-stack or AI developer in a reputed MNC where I can apply both creative and analytical thinking.',
    'What are your strengths and weaknesses':'My strengths are problem-solving, adaptability, and persistence in debugging. My weakness is that I sometimes focus too much on perfecting small details, but I’m learning to balance efficiency with accuracy.',
    'Why did you choose Computer Science / AI & ML':'I chose it because I’m fascinated by how algorithms and data can solve real-world problems. AI combines logic, creativity, and innovation — areas that excite me',
    'What are your career goals':'Short term, I aim to join a Reputed tech company and contribute to AI or full-stack projects. Long term, I want to lead development teams that design intelligent systems improving daily life',
    'Where do you see yourself in 5 years':'As a skilled developer or ML engineer handling end-to-end solutions, mentoring juniors, and contributing to impactful projects.',
    'Describe your final year project.':'My final-year project is a House Price Prediction App built using Python, scikit-learn, and Streamlit. It predicts property prices based on location and features using regression models',


    // --- NEW RECRUITER & TECHNICAL QUESTIONS BELOW ---

    // Behavioral & Career
    'career goals': 'My short-term goal is to excel in a demanding **Full Stack Developer role**.\nLong-term, I aim to transition into a **Machine Learning Engineer** or **Technical Lead** position.',
    'teamwork': 'I prioritize **proactive communication and code reviews**.\nDuring my university project, I led the successful integration of our frontend and backend teams by establishing clear API contracts.',
    'weakness': 'I sometimes dedicate too much time to **over-optimizing code** that may not need it immediately.\nI am improving by strictly time-boxing optimization efforts after the core functionality is confirmed.',
    'strength': 'My greatest strength is my ability to **quickly bridge the gap between frontend and backend technologies**.\nI ensure smooth data flow and efficient communication across the entire stack.',
    'challenge overcome': 'Optimizing the **University Website API caching** was the biggest challenge.\nI successfully used **Redis** to cache frequently accessed data, reducing the average API latency by **40%**.',
    'handle conflict': 'I address technical conflicts by focusing on **data and objective metrics**.\nI propose solutions based on performance impact, maintainability, and best practices, always respecting team input.',
    'long term goals': 'Long-term, I aspire to hold a **Senior Engineer role** where I can mentor others and contribute to high-level architectural decisions.',
    'learn new technology': 'I follow a **Learn-Build-Review cycle**.\nI start with documentation (Learn), build a proof-of-concept (Build), and then seek peer feedback or community review (Review).',
    'handle deadlines': 'I use **Agile principles**—breaking tasks into small, prioritized sprints.\nI communicate status and roadblocks immediately to ensure transparency and manage expectations.',

    // Technical Depth - React & Frontend
    'react hooks': 'I use **useState** for local state, **useEffect** for side effects (data fetching, subscriptions), and **useContext** for global state management.',
    'virtual dom': 'The **Virtual DOM** is a light-weight copy of the real DOM.\nReact uses it to find differences between the previous and current state (diffing) and only updates the specific changed nodes in the real DOM, making rendering faster.',
    'state management': 'For simple apps, I use **useState and useContext**.\nFor complex, large-scale apps, I prefer **Redux or Zustand** to manage complex global state efficiently.',
    'component lifecycle': 'In functional components, **useEffect** manages the lifecycle.\nAn empty dependency array (`[]`) simulates `componentDidMount` (mounting).\nReturning a cleanup function simulates `componentWillUnmount` (unmounting).',

    // Technical Depth - Node.js & Backend
    'async await': 'I use **async/await** to write asynchronous, promise-based code that looks and behaves like synchronous code.\nThis makes complex database operations and API calls much cleaner and more readable than using `.then().catch()`.',
    'express middleware': 'I use **middleware** for tasks that need to be executed sequentially, like **authentication (JWT verification)**, **logging (Morgan)**, **rate limiting**, and **data validation** before the request reaches the final route handler.',
    'sql vs nosql': '**SQL (like MySQL)** is great for complex transactions and relational data where consistency is paramount.\n**NoSQL (MongoDB)** is better for flexible schema, horizontal scaling, and high volume data that doesn\'t have strict relationships, like user profiles or session data.',
    'rest api': 'I design my REST APIs to be **stateless** and use standard HTTP methods **(GET, POST, PUT, DELETE)** to interact with resources.\nGood practices include proper status codes and versioning.',

    // Technical Depth - ML & DevOps
    'ml model type': 'In my House Price Prediction project, I used **Regression Models** (specifically **Linear Regression and Random Forest**) to predict a continuous numerical value.',
    'model accuracy': 'The **79% accuracy** on my House Price Prediction model was achieved using a clean dataset and **k-fold cross-validation**.\nThe next step for improvement would be implementing **feature engineering**.',
    'devops tools': 'I am familiar with **Git** for version control, **Docker** for containerization of applications, and **basic CI/CD principles** for automated testing and deployment.',
    'deployment experience': 'I have deployed full-stack MERN applications on platforms like **Heroku and Netlify**.\nI understand the concepts of environment variables and build processes for production.',
    'testing approach': 'I employ **Unit Testing (Jest)** for testing individual logic and **Integration Testing** to ensure that components like the database and API endpoints communicate correctly.',
    'code maintainability': 'I ensure my code is **modular** (small, focused functions), follows consistent **naming conventions**, and utilizes **TypeScript** when possible to improve long-term maintainability and reduce runtime errors.',
};

  // Configuration for LLM API (optional)
  const USE_LLM_API = false; // Set to true to enable LLM
  const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';

  // Get answer from LLM API
  const getAnswerFromLLM = async (question) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: personalContext },
            { role: 'user', content: question }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('LLM API Error:', error);
      return null;
    }
  };

  // Get answer from local database
  const getLocalAnswer = (question) => {
    const q = question.toLowerCase().trim();
    
    if (qaDatabase[q]) return qaDatabase[q];
    
    for (let key in qaDatabase) {
      if (q.includes(key) || key.includes(q)) {
        return qaDatabase[key];
      }
    }
    
    return `I don't have a specific answer for "${question}". Try asking about: age, skills, education, experience, projects, hobbies, or type "help" for more options!`;
  };

  // Main function to get answer
  const getAnswer = async (question) => {
    if (USE_LLM_API && OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY_HERE') {
      const llmAnswer = await getAnswerFromLLM(question);
      if (llmAnswer) return llmAnswer;
    }
    return getLocalAnswer(question);
  };

  // Handle key press
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const question = inputValue.trim();
      
      if (!question) return;

      // Check for clear command
      if (question.toLowerCase() === 'clear' || question.toLowerCase() === 'cls') {
        setTerminalLines([]);
        setInputValue('');
        return;
      }

      // Add user question
      const newLines = [...terminalLines, { type: 'user', content: question }];
      setTerminalLines(newLines);
      setInputValue('');
      setIsLoading(true);

      // Get answer
      const answer = await getAnswer(question);
      setIsLoading(false);
      setTerminalLines([...newLines, { type: 'answer', content: answer }]);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines, isLoading]);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary font-mono">
        $ Ask Me Anything
      </h2>
      
      <div 
        className="bg-card/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-border"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-auto text-gray-500 text-sm font-mono">
            terminal@portfolio:~
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalBodyRef}
          className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto font-mono text-sm"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: '#4b5563 #1f2937'
          }}
        >
          {/* Welcome Message */}
          <div className="text-purple-400 mb-4">
            Welcome to the interactive Q&A terminal!
          </div>
          <div className="text-gray-500 text-xs mb-4">
            Type your question and press Enter. Try: "age", "skills", "education", "experience", "hobbies", "clear", or "help"
          </div>

          {/* Terminal Lines */}
          {terminalLines.map((line, index) => (
            <div key={index} className="mb-3 animate-fadeIn">
              {line.type === 'user' ? (
                <div>
                  <span className="text-purple-400 font-bold capitalize">visitor@portfolio:~$</span>
                  <span className="text-green-400 ml-2 capitalize">{line.content}</span>
                </div>
              ) : (
                <div className="text-gray-300 ml-8 leading-relaxed">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="text-gray-300 ml-8 animate-pulse">
              🤔 Thinking...
            </div>
          )}

          {/* Current Prompt */}
          {terminalLines.length === 0 && !isLoading && (
            <div>
              <span className="text-purple-400 font-bold capitalize">visitor@portfolio:~$</span>
              <span className="text-green-400 ml-2 animate-pulse capitalize">_</span>
            </div>
          )}
        </div>

        {/* Terminal Input */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold font-mono text-sm capitalize">
              visitor@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder-gray-600  capitalize"
              placeholder="Type your question here..."
              autoComplete="off"
            />
            <span className="w-2 h-4 bg-green-400 animate-blink"></span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        /* Custom Scrollbar */
        *::-webkit-scrollbar {
          width: 8px;
        }

        *::-webkit-scrollbar-track {
          background: #1f2937;
        }

        *::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default AskMe;