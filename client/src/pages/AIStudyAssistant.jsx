import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function AIStudyAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentQuestions, setRecentQuestions] = useState([]);

  const askAI = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Unable to get AI response"
        );
      }

      setResponse(data.reply);

      setRecentQuestions((previous) => [
        message,
        ...previous.slice(0, 4),
      ]);

      setMessage("");
    } catch (error) {
      console.error("AI Error:", error);

      setResponse(
        "Sorry, I was unable to connect to the AI assistant."
      );
    } finally {
      setLoading(false);
    }
  };

  const useTool = (prompt) => {
    setMessage(prompt);
  };

  return (
    <DashboardLayout>

      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            AI Study Assistant
          </h1>

          <p style={styles.subtitle}>
            Get personalized help with your learning goals.
          </p>
        </div>

        <div style={styles.aiBadge}>
          ✨ AI Powered
        </div>
      </div>

      {/* Main Layout */}
      <div style={styles.layout}>

        {/* AI Chat */}
        <div style={styles.chatCard}>

          <div style={styles.cardHeader}>
            <div style={styles.aiIcon}>
              ✨
            </div>

            <div>
              <h2 style={styles.cardTitle}>
                Ask TutorMatch AI
              </h2>

              <p style={styles.cardSubtitle}>
                Your personal study assistant
              </p>
            </div>
          </div>

          {/* Response */}
          {response ? (
            <div style={styles.responseBox}>
              <div style={styles.responseHeader}>
                <span>🤖 TutorMatch AI</span>
              </div>

              <p style={styles.responseText}>
                {response}
              </p>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.largeIcon}>
                🎓
              </div>

              <h3>
                How can I help you study?
              </h3>

              <p>
                Ask me to explain a topic, create
                practice questions, or help you
                prepare for an upcoming session.
              </p>
            </div>
          )}

          {/* Input */}
          <div style={styles.inputArea}>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  askAI();
                }
              }}
              placeholder="Ask me anything about your studies..."
              rows="4"
              style={styles.textarea}
            />

            <div style={styles.inputFooter}>
              <span style={styles.hint}>
                Press Enter to ask
              </span>

              <button
                onClick={askAI}
                disabled={
                  loading ||
                  !message.trim()
                }
                style={{
                  ...styles.askButton,
                  opacity:
                    loading ||
                    !message.trim()
                      ? 0.5
                      : 1,
                }}
              >
                {loading
                  ? "Thinking..."
                  : "Ask AI ✨"}
              </button>
            </div>

          </div>
        </div>

        {/* Study Tools */}
        <div style={styles.toolsCard}>

          <h2 style={styles.cardTitle}>
            Study Tools
          </h2>

          <p style={styles.cardSubtitle}>
            Quick ways to get started
          </p>

          <div style={styles.tools}>

            <button
              style={styles.tool}
              onClick={() =>
                useTool(
                  "Explain this topic to me in a simple way:"
                )
              }
            >
              <span style={styles.toolIcon}>
                📚
              </span>

              <span>
                <strong>
                  Explain a Topic
                </strong>

                <small>
                  Make difficult topics easier
                </small>
              </span>
            </button>

            <button
              style={styles.tool}
              onClick={() =>
                useTool(
                  "Create 5 practice questions for me about:"
                )
              }
            >
              <span style={styles.toolIcon}>
                📝
              </span>

              <span>
                <strong>
                  Practice Questions
                </strong>

                <small>
                  Test your knowledge
                </small>
              </span>
            </button>

            <button
              style={styles.tool}
              onClick={() =>
                useTool(
                  "Create a study plan for me. My subject is:"
                )
              }
            >
              <span style={styles.toolIcon}>
                🎯
              </span>

              <span>
                <strong>
                  Create Study Plan
                </strong>

                <small>
                  Build a personalized plan
                </small>
              </span>
            </button>

            <button
              style={styles.tool}
              onClick={() =>
                useTool(
                  "Help me decide what type of tutor I should look for. I need help with:"
                )
              }
            >
              <span style={styles.toolIcon}>
                👨‍🏫
              </span>

              <span>
                <strong>
                  Find a Tutor
                </strong>

                <small>
                  Get tutor recommendations
                </small>
              </span>
            </button>

          </div>
        </div>

      </div>

      {/* Recent Questions */}
      <div style={styles.recentCard}>

        <h2 style={styles.cardTitle}>
          Recent Questions
        </h2>

        {recentQuestions.length === 0 ? (
          <p style={styles.noQuestions}>
            Your recent AI questions will appear here.
          </p>
        ) : (
          <div>
            {recentQuestions.map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setMessage(question)
                  }
                  style={styles.question}
                >
                  <span>💬</span>
                  {question}
                </button>
              )
            )}
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "8px",
  },

  aiBadge: {
    backgroundColor: "#0b2b66",
    color: "#60a5fa",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  layout: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: "20px",
    alignItems: "start",
  },

  chatCard: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "24px",
  },

  toolsCard: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "24px",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },

  aiIcon: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  cardTitle: {
    margin: 0,
    fontSize: "19px",
  },

  cardSubtitle: {
    color: "#94a3b8",
    margin: "5px 0 0",
    fontSize: "14px",
  },

  emptyState: {
    textAlign: "center",
    padding: "45px 25px",
    color: "#94a3b8",
  },

  largeIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  responseBox: {
    backgroundColor: "#061b45",
    borderRadius: "12px",
    padding: "18px",
    marginBottom: "20px",
    minHeight: "120px",
  },

  responseHeader: {
    color: "#60a5fa",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  responseText: {
    color: "#e2e8f0",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },

  inputArea: {
    marginTop: "10px",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#061b45",
    border: "1px solid #23457d",
    borderRadius: "12px",
    color: "white",
    padding: "14px",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    fontSize: "14px",
  },

  inputFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },

  hint: {
    color: "#64748b",
    fontSize: "12px",
  },

  askButton: {
    padding: "11px 20px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "9px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  tools: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },

  tool: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    textAlign: "left",
    backgroundColor: "#061b45",
    border: "1px solid #16366d",
    borderRadius: "10px",
    padding: "13px",
    color: "white",
    cursor: "pointer",
  },

  toolIcon: {
    fontSize: "22px",
  },

  tool: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    textAlign: "left",
    backgroundColor: "#061b45",
    border: "1px solid #16366d",
    borderRadius: "10px",
    padding: "13px",
    color: "white",
    cursor: "pointer",
  },

  recentCard: {
    backgroundColor: "#03163d",
    border: "1px solid #16366d",
    borderRadius: "16px",
    padding: "24px",
    marginTop: "20px",
  },

  question: {
    display: "flex",
    gap: "10px",
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #16366d",
    padding: "13px 5px",
    color: "#cbd5e1",
    textAlign: "left",
    cursor: "pointer",
  },

  noQuestions: {
    color: "#64748b",
  },
};

export default AIStudyAssistant;