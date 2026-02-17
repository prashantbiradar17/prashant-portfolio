import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  askMeFallbackMap,
  buildAskMeSystemPrompt,
} from "@/lib/askmeProfile";
import { askMeFallbackMap, buildAskMeSystemPrompt } from "@/lib/askmeProfile";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1";

const bootLines = [
  "Microsoft Windows [Version 11.0.22631.0]",
  "(c) Prashant Biradar. All rights reserved.",
  "Type `help` to list supported personal commands.",
];

const AskMe = () => {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Ready. Ask commands like `education`, `courses`, `certificates`, `degree`, `height`, `rating`, `skills`, `projects`, or any natural question.",
        "Hi! I can answer in real time about my education, courses, certificates, degree, height, rating, skills, projects, and more.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const systemPrompt = useMemo(() => buildAskMeSystemPrompt(), []);

  const getFallbackAnswer = (question) => {
    const q = question.toLowerCase().trim();

    if (["help", "commands", "--help"].includes(q)) {
      return "Commands: education, courses, certificates, degree, height, rating, skills, location, hometown, college, name.";
    }

    for (const [key, value] of Object.entries(askMeFallbackMap)) {
      if (q.includes(key)) return value;
    }

    return "Unknown command. Try: help";
  };

  const getFallbackAnswer = (question) => {
    const q = question.toLowerCase().trim();

    for (const [key, value] of Object.entries(askMeFallbackMap)) {
      if (q.includes(key)) return value;
    }

    return "Unknown command. Try: help";
    return "I can answer personal questions about my education, courses, certificates, degree,  rating, skills, and projects. Ask me anything!";
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
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-2 text-primary font-mono">$ Ask Me Anything</h2>
      <p className="text-center text-sm text-foreground/70 mb-6">Command-line mode enabled.</p>

      <div
        className="rounded-2xl overflow-hidden border border-[#2f3241] shadow-[0_18px_40px_rgba(0,0,0,0.45)] bg-[#0d1117]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="bg-[#1b2233] px-4 py-3 flex items-center gap-2 border-b border-[#2f3241]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-[#9ca3af] text-sm font-mono">C:\Users\Prashant\portfolio-ai-terminal</div>
        </div>

        onClick={() => inputRef.current?.focus()}
      >
        <div className="bg-[#1b2233] px-4 py-3 flex items-center gap-2 border-b border-[#2f3241]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-[#9ca3af] text-sm font-mono">C:\Users\Prashant\portfolio-ai-terminal</div>
        </div>

        onClick={() => inputRef.current?.focus()}
      >
        <div className="bg-[#1b2233] px-4 py-3 flex items-center gap-2 border-b border-[#2f3241]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-[#9ca3af] text-sm font-mono">C:\Users\Prashant\portfolio-ai-terminal</div>
        </div>

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
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-2 text-primary font-mono">$ Ask Me Anything</h2>
      <p className="text-center text-sm text-foreground/70 mb-6">Command-line mode enabled.</p>
      <p className="text-center text-sm text-foreground/70 mb-6">
        Windows terminal style • live AI replies when <code>VITE_OPENAI_API_KEY</code> is set.
      </p>

      <div
        className="rounded-2xl overflow-hidden border border-[#2f3241] shadow-[0_18px_40px_rgba(0,0,0,0.45)] bg-[#0d1117]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="bg-[#1b2233] px-4 py-3 flex items-center gap-2 border-b border-[#2f3241]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="ml-auto text-[#9ca3af] text-sm font-mono">C:\Users\Prashant\portfolio-ai-terminal</div>
        </div>

        <div ref={terminalBodyRef} className="p-6 min-h-[390px] max-h-[520px] overflow-y-auto font-mono text-sm bg-[#0d1117]">
          <div className="space-y-1 mb-5 text-[#9ca3af]">
            {bootLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          </div>

          <div className="space-y-4">
            {messages.map((line, index) => (
              <div key={`${line.type}-${index}`}>
                {line.type === "user" ? (
                  <div>
                    <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
                    <span className="text-[#4ade80] ml-2">{line.content}</span>
                  </div>
                ) : (
                  <div className="pl-1 border-l-2 border-[#334155] ml-[2px] mt-1">
                    <pre className="text-[#d1d5db] leading-relaxed whitespace-pre-wrap font-mono">{line.content}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="mt-4">
              <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
              <span className="text-[#93c5fd] animate-pulse ml-2">running ai_query...</span>
            </div>
          )}
        </div>

          </div>

          <div className="space-y-4">
            {messages.map((line, index) => (
              <div key={`${line.type}-${index}`}>
                {line.type === "user" ? (
                  <div>
                    <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
                    <span className="text-[#4ade80] ml-2">{line.content}</span>
                  </div>
                ) : (
                  <div className="pl-1 border-l-2 border-[#334155] ml-[2px] mt-1">
                    <pre className="text-[#d1d5db] leading-relaxed whitespace-pre-wrap font-mono">{line.content}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="mt-4">
              <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
              <span className="text-[#93c5fd] animate-pulse ml-2">running ai_query...</span>
            </div>
          )}
        </div>

          </div>

          <div className="space-y-4">
            {messages.map((line, index) => (
              <div key={`${line.type}-${index}`}>
                {line.type === "user" ? (
                  <div>
                    <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
                    <span className="text-[#4ade80] ml-2">{line.content}</span>
                  </div>
                ) : (
                  <div className="pl-1 border-l-2 border-[#334155] ml-[2px] mt-1">
                    <pre className="text-[#d1d5db] leading-relaxed whitespace-pre-wrap font-mono">{line.content}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="mt-4">
              <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
              <span className="text-[#93c5fd] animate-pulse ml-2">running ai_query...</span>
            </div>
          )}
        <div
          ref={terminalBodyRef}
          className="p-6 min-h-[390px] max-h-[520px] overflow-y-auto font-mono text-sm space-y-4 bg-[#0d1117]"
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
                  <span className="text-[#7dd3fc] font-bold">PS C:\\Visitor\\Portfolio&gt;</span>
                  <span className="text-[#4ade80] ml-2">{line.content}</span>
                </div>
              ) : (
                <div className="text-[#d1d5db] leading-relaxed whitespace-pre-wrap">{line.content}</div>
              )}
            </div>
          ))}

          {isLoading && <div className="text-gray-300 animate-pulse">Thinking...</div>}
        </div>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold font-mono text-sm">visitor@portfolio:~$</span>
          {isLoading && <div className="text-[#93c5fd] animate-pulse">Thinking...</div>}
        </div>

        <div className="border-t border-[#2f3241] p-4 bg-[#0a0f16]">
          <div className="flex items-center gap-3">
            <span className="text-[#7dd3fc] font-bold font-mono text-sm">PS C:\\Visitor\\Portfolio&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent border-none outline-none text-[#4ade80] font-mono text-sm placeholder:text-[#6b7280]"
              placeholder="Type a command (help)"
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder-gray-600"
              className="flex-1 bg-transparent border-none outline-none text-[#4ade80] font-mono text-sm placeholder:text-[#6b7280]"
              placeholder="Type a command (help)"
              placeholder="Ask anything about me..."
              autoComplete="off"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-4 py-1.5 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors disabled:opacity-50"
            >
              Run
              className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs disabled:opacity-50"
            >
              className="px-4 py-1.5 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-medium transition-colors disabled:opacity-50"
            >
              Run
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskMe;
