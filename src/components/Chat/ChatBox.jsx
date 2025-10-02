import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import Timer from "../Timer/Timer";
import Message from "./Message";
import { getQuestions } from "../../utils/generateQuestions";
import { useDispatch, useSelector } from "react-redux";
import { updateCandidate } from "../../redux/interviewSlice";

const ChatBox = () => {
    const dispatch = useDispatch();
    const candidate = useSelector((state) => state.interview.currentCandidate);

    const [messages, setMessages] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);

    const questions = getQuestions(); // Ensure this returns array with {text, time}

    // Load previous answers safely
    useEffect(() => {
        if (candidate) {
            setMessages(candidate.answers || []);
            const prevAnswers = candidate.answers?.length || 0;

            // Reset index if all questions answered previously
            setQuestionIndex(prevAnswers >= questions.length ? 0 : prevAnswers);
        }
    }, [candidate, questions.length]);

    // Reset isAnswered whenever questionIndex changes
    useEffect(() => {
        setIsAnswered(false);
    }, [questionIndex]);

    // Submit answer safely
    const handleSubmit = () => {
        if (questionIndex >= questions.length || isAnswered) return;

        const newMessage = {
            question: questions[questionIndex].text,
            answer: currentAnswer || "(No answer)",
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        // Update Redux state
        dispatch(
            updateCandidate({
                ...candidate,
                answers: updatedMessages,
            })
        );

        setCurrentAnswer("");
        setQuestionIndex((prev) => prev + 1);
        setIsAnswered(true);
    };

    // Auto-submit when timer expires
    const handleTimeExpire = () => {
        if (!isAnswered) handleSubmit();
    };

    return (
        <div>
            <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "20px" }}>
                {messages.map((item, idx) => (
                    <div key={idx}>
                        <Message message={item.question} type="question" />
                        <Message message={item.answer} type="answer" />
                    </div>
                ))}
            </div>

            {questionIndex < questions.length && questions[questionIndex] ? (
                <div>
                    <Timer
                        key={questionIndex}
                        time={questions[questionIndex].time}
                        onExpire={handleTimeExpire}
                    />
                    <p><strong>Question:</strong> {questions[questionIndex].text}</p>
                    <Input.TextArea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        rows={3}
                        placeholder="Type your answer here..."
                        style={{ marginTop: "10px" }}
                    />
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: "10px" }}
                    >
                        Submit Answer
                    </Button>
                </div>
            ) : (
                questionIndex >= questions.length && (
                    <div>
                        <h3>Interview Completed!</h3>
                        <p>You have answered all questions.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default ChatBox;
