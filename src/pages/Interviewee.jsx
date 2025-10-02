import React, { useState } from "react";
import ResumeUploader from "../components/ResumeUpload/ResumeUploader";
import ChatBox from "../components/Chat/ChatBox";

const Interviewee = () => {
    const [candidateReady, setCandidateReady] = useState(false);

    const handleResumeComplete = (candidate) => {
        // Candidate data is now in Redux
        setCandidateReady(true);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1>AI-Powered Interview Assistant</h1>

            {!candidateReady ? (
                <div>
                    <p>Please upload your resume to start the interview.</p>
                    <ResumeUploader onComplete={handleResumeComplete} />
                </div>
            ) : (
                <ChatBox />
            )}
        </div>
    );
};

export default Interviewee;
