import React from "react";
import { Card, List } from "antd";

const CandidateDetails = ({ candidate }) => {
    return (
        <div>
            <h3>Candidate Details</h3>
            <Card style={{ marginBottom: "20px" }}>
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Phone:</strong> {candidate.phone}</p>
                <p><strong>Score:</strong> {candidate.score}</p>
                <p><strong>Summary:</strong> {candidate.summary}</p>
            </Card>

            <h4>Interview Q&A</h4>
            <List
                dataSource={candidate.answers || []}
                renderItem={(item, idx) => (
                    <List.Item key={idx}>
                        <Card style={{ width: "100%" }}>
                            <p><strong>Q:</strong> {item.question}</p>
                            <p><strong>A:</strong> {item.answer}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CandidateDetails;
