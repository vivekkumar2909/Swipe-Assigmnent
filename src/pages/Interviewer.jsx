import React from "react";
import CandidateList from "../components/Dashboard/CandidateList";

const Interviewer = () => {
    return (
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
            <h1>Interviewer Dashboard</h1>
            <CandidateList />
        </div>
    );
};

export default Interviewer;
