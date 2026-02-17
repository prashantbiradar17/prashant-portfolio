import React, { useEffect, useMemo, useRef, useState } from "react";

const profile = {
  name: "Prashant Biradar",
  role: "Full-Stack Developer & Machine Learning Enthusiast",
  location: "Hyderabad, Telangana, India",
  hometown: "Gulbarga, Karnataka, India",
  education: "B.Tech in Computer Science (AI & ML), expected graduation in 2026",
  degree: "Bachelor of Technology (B.Tech)",
  college: "Swami Vivekananda Institute of Technology, Secunderabad",
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
  rating: "4.6/5 for problem-solving and project execution",
  skills: [
    "React",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "Machine Learning",
  ],
};

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1";

const fallbackMap = {
  name: `My name is ${profile.name}.`,
  location: `I am based in ${profile.location}.`,
  hometown: `I am from ${profile.hometown}.`,
  education: `I am pursuing ${profile.education}.`,
  degree: `My degree is ${profile.degree}.`,
  college: `I study at ${profile.college}.`,
  courses: `I have completed courses in: ${profile.courses.join(", ")}.`,
  certificates: `My certificates include: ${profile.certificates.join(", ")}.`,
  skills: `My core skills are: ${profile.skills.join(", ")}.`,
  height: `My height is ${profile.height}.`,
  rating: `My self-rating is ${profile.rating}.`,
};

const AskMe = () => {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Hi! I can answer in real time about my education, courses, certificates, degree, height, rating, skills, projects, and more.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const systemPrompt = useMemo(
    () => `
You are an AI assistant representing ${profile.name}.
Answer in first person as Prashant.
Keep answers concise, clear, and friendly.
If a personal detail is unknown, say you do not want to guess.

Profile:
- Name: ${profile.name}
- Role: ${profile.role}
- Location: ${profile.location}
- Hometown: ${profile.hometown}
- Education: ${profile.education}
- Degree: ${profile.degree}
- College: ${profile.college}
- Courses: ${profile.courses.join(", ")}
- Certificates: ${profile.certificates.join(", ")}
- Height: ${profile.height}
- Rating: ${profile.rating}
- Skills: ${profile.skills.join(", ")}
`,
    []
  );

  const getFallbackAnswer = (question) => {
    const q = question.toLowerCase().trim();

    for (const [key, value] of Object.entries(fallbackMap)) {
      if (q.includes(key)) return value;
    }

    return "I can answer personal questions about my education, courses, certificates, degree, height, rating, skills, and projects. Ask me anything!";
  };

  const getAnswerFromLLM = async (question, history) => {
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
            { role: "system", content: systemPrompt },
            ...history.map((m) => ({
              role: m.type === "user" ? "user" : "assistant",
              content: m.content,
            })),
            { role: "user", content: question },
          ],
          temperature: 0.4,
          max_tokens: 240,
        }),
      });

      if (!response.ok) throw new Error("Failed LLM request");
      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    } catch (error) {
      console.error("AskMe LLM error:", error);
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

    const nextHistory = [...messages, { type: "user", content: question }];
    setMessages(nextHistory);
    setInputValue("");
    setIsLoading(true);

    const llmAnswer = await getAnswerFromLLM(question, nextHistory);
    const answer = llmAnswer || getFallbackAnswer(question);

    setMessages([...nextHistory, { type: "assistant", content: answer }]);
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
      <h2 className="text-3xl font-bold text-center mb-3 text-primary font-mono">$ Ask Me Anything</h2>
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
            <div key={`${line.type}-${index}`}>
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
