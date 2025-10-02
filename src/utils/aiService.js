// src/services/gemini.js
export async function askAI(messages) {
    try {
        const res = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: messages.map(m => `${m.role}: ${m.content}`).join("\n") }]
                    }
                ]
            }),
        });

        if (!res.ok) {
            throw new Error("Gemini API request failed");
        }

        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
    } catch (err) {
        console.error("Gemini API Error:", err);
        return "⚠️ Error talking to AI.";
    }
}
