// Replace these with actual OpenAI or other AI API calls

export async function generateAIQuestion(indexOrType) {
    if (indexOrType === 'summary') return 'Candidate performed well overall.';
    const questions = [
        "Easy Q1: Explain React hooks.",
        "Easy Q2: What is Node.js?",
        "Medium Q1: Explain Redux middleware.",
        "Medium Q2: How to optimize React performance?",
        "Hard Q1: Explain microservices architecture.",
        "Hard Q2: Describe event loop in Node.js."
    ];
    return questions[indexOrType];
}

export async function evaluateAnswer(question, answer) {
    // Mock evaluation
    return Math.floor(Math.random() * 10) + 1; // 1-10 score
}
