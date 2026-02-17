import React, { useEffect, useRef, useState } from "react";

const developerProfile = {
  name: "Prashant Biradar",
  role: "Full-Stack Developer & Machine Learning Enthusiast",
  location: "Hyderabad, Telangana, India",
  education: "B.Tech in Computer Science (AI & ML), expected graduation in 2026",
  degree: "Bachelor of Technology (B.Tech)",
  courses: [
    "Full Stack Web Development",
    "Machine Learning Specialization",
    "Node.js & Express.js",
    "Data Science with Python",
  ],
  certificates: [
    "Machine Learning in Python (freeCodeCamp)",
    "DSA (GeeksforGeeks)",
    "AI Fundamentals (IBM)",
  ],
  height: "5'9\" (approx)",
  rating: "4.6/5 for problem solving and project execution",
};

const fallbackAnswers = {
  education: `I am pursuing ${developerProfile.education}.`,
  degree: `My degree is ${developerProfile.degree}.`,
  courses: `I have completed courses in: ${developerProfile.courses.join(", ")}.`,
  certificates: `My certificates include: ${developerProfile.certificates.join(", ")}.`,
  height: `My height is ${developerProfile.height}.`,
  rating: `My self-rating is ${developerProfile.rating}.`,
  location: `I am based in ${developerProfile.location}.`,
  name: `My name is ${developerProfile.name}.`,
};

const SYSTEM_PROMPT = `
You are an AI assistant representing ${developerProfile.name}.
Reply in first person as Prashant.
Keep answers clear, friendly, and concise.
If asked about unknown personal facts, say you don't want to guess.

Profile:
- Name: ${developerProfile.name}
- Role: ${developerProfile.role}
- Location: ${developerProfile.location}
- Education: ${developerProfile.education}
- Degree: ${developerProfile.degree}
- Courses: ${developerProfile.courses.join(", ")}
- Certificates: ${developerProfile.certificates.join(", ")}
- Height: ${developerProfile.height}
- Rating: ${developerProfile.rating}
`;

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1";

const AskMe = () => {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Hi! Ask me anything about my education, courses, certificates, degree, height, rating, skills, or projects.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const getFallbackAnswer = (question) => {
    const q = question.toLowerCase();

    for (const [key, answer] of Object.entries(fallbackAnswers)) {
      if (q.includes(key)) return answer;
    }

    return "I can answer personal portfolio questions in real-time. Ask me about education, courses, certificates, degree, height, rating, projects, or skills.";
  };

  const getAnswerFromLLM = async (question) => {
    if (!OPENAI_API_KEY) return null;

    try {
      const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m) => ({
              role: m.type === "user" ? "user" : "assistant",
              content: m.content,
            })),
            { role: "user", content: question },
          ],
          max_tokens: 220,
          temperature: 0.5,
        }),
      });

      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    } catch (error) {
      console.error("LLM API Error:", error);
      return null;
    }
  };

  const handleSend = async () => {
    const question = inputValue.trim();
    if (!question || isLoading) return;

    if (["clear", "cls"].includes(question.toLowerCase())) {
      setMessages([]);
      setInputValue("");
      return;
    }

    const nextMessages = [...messages, { type: "user", content: question }];
    setMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);

    const llmAnswer = await getAnswerFromLLM(question);
    const answer = llmAnswer || getFallbackAnswer(question);

    setMessages([...nextMessages, { type: "assistant", content: answer }]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-3 text-primary font-mono">
        $ Ask Me Anything
      </h2>
      <p className="text-center text-sm text-foreground/70 mb-6">
        Real-time AI mode is enabled when <code>VITE_OPENAI_API_KEY</code> is configured.
      </p>

      <div
        className="bg-card/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-border"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="ml-auto text-gray-400 text-sm font-mono">portfolio-ai-terminal</div>
        </div>

        <div
          ref={terminalBodyRef}
          className="p-6 min-h-[360px] max-h-[500px] overflow-y-auto font-mono text-sm space-y-3"
        >
          {messages.map((line, index) => (
            <div key={index}>
              {line.type === "user" ? (
                <div>
                  <span className="text-purple-400 font-bold">visitor@portfolio:~$</span>
                  <span className="text-green-400 ml-2">{line.content}</span>
                </div>
              ) : (
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{line.content}</div>
              )}
            </div>
          ))}

          {isLoading && <div className="text-gray-300 animate-pulse">Thinking...</div>}
        </div>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold font-mono text-sm">visitor@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder-gray-600"
              placeholder="Ask anything about me..."
              autoComplete="off"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskMe;
