import React, { useState } from "react";
import { Table, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCandidate } from "../../redux/interviewSlice";
import CandidateDetails from "./CandidateDetails";

const { Search } = Input;

const CandidateList = () => {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.interview.candidates);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleRowClick = (record) => {
        dispatch(setCurrentCandidate(record));
        setSelectedCandidate(record);
    };

    const filteredCandidates = candidates.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Score", dataIndex: "score", key: "score" },
    ];

    return (
        <div style={{ margin: "20px" }}>
            <h2>Candidate Dashboard</h2>

            <Search
                placeholder="Search candidates"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300, marginBottom: 20 }}
            />

            <Table
                dataSource={filteredCandidates}
                columns={columns}
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: "pointer" },
                })}
                pagination={{ pageSize: 5 }}
            />

            {selectedCandidate && (
                <div style={{ marginTop: "20px" }}>
                    <CandidateDetails candidate={selectedCandidate} />
                </div>
            )}
        </div>
    );
};

export default CandidateList;
