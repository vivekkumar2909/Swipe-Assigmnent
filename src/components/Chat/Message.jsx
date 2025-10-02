import React from "react";
import { Card } from "antd";

const Message = ({ message, type }) => {
    // type can be 'question' or 'answer'
    const isQuestion = type === "question";

    return (
        <div
            style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: isQuestion ? "flex-start" : "flex-end",
            }}
        >
            <Card
                style={{
                    backgroundColor: isQuestion ? "#f0f0f0" : "#bae7ff",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                }}
            >
                <strong>{isQuestion ? "Q:" : "A:"}</strong> {message}
            </Card>
        </div>
    );
};

export default Message;
