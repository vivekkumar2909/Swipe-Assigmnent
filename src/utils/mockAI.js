/*
  A simple local "AI" that returns questions and scores answers.
  For a real production app, replace these with calls to an AI API.
*/

const QUESTIONS = [
    // 2 Easy
    { level: 'Easy', text: 'What is the difference between let and const in JavaScript?', time: 20 },
    { level: 'Easy', text: 'Describe what a React component is.', time: 20 },
    // 2 Medium
    { level: 'Medium', text: 'Explain how you would structure a REST API for a todo app.', time: 60 },
    { level: 'Medium', text: 'How does JavaScript event loop work? Give an example.', time: 60 },
    // 2 Hard
    { level: 'Hard', text: 'Design a scalable system architecture for a real-time chat app.', time: 120 },
    { level: 'Hard', text: 'Explain how you would debug a memory leak in a Node.js application.', time: 120 },
]

export function getQuestion(index) {
    return QUESTIONS[index]
}

export function judgeAnswer(question, answer) {
    // naive heuristics: score 0-10
    if (!answer || answer.trim().length < 5) return { score: 0, feedback: 'Answer too short or missing.' }
    const len = answer.trim().split(/\s+/).length
    let score = 4
    if (len > 8) score += 3
    if (answer.toLowerCase().includes('react') || answer.toLowerCase().includes('node')) score += 2
    if (question.level === 'Hard') score = Math.min(10, score + 1)
    const feedback = `Auto-judged: ${score}/10 — ${score >= 7 ? 'Good' : score >= 4 ? 'Average' : 'Needs improvement'}`
    return { score, feedback }
}

export function finalSummary(scores, profile) {
    const total = scores.reduce((s, x) => s + (x.score || 0), 0)
    const avg = Math.round((total / (scores.length || 1)) * 10) / 10
    const recommendation = avg >= 6.5 ? 'Strong' : avg >= 4.5 ? 'Consider' : 'Weak'
    return {
        score: avg,
        text: `Candidate ${profile.name || ''} scored ${avg}/10. Recommendation: ${recommendation}.`,
    }
}
