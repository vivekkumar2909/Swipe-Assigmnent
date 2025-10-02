import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { parsePDF, parseDOCX } from "../../utils/parseResume";
import { useDispatch } from "react-redux";
import { addCandidate } from "../../redux/interviewSlice";
import { v4 as uuidv4 } from "uuid";

const ResumeUploader = ({ onComplete }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleUpload = async (file) => {
        setLoading(true);
        let data = {};
        try {
            if (file.type === "application/pdf") {
                data = await parsePDF(file);
            } else if (
                file.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
                data = await parseDOCX(file);
            } else {
                message.error("Invalid file format. Please upload PDF or DOCX.");
                setLoading(false);
                return false;
            }

            const candidate = {
                id: uuidv4(),
                ...data,
                answers: [],
                score: 0,
                summary: "",
            };

            dispatch(addCandidate(candidate));
            onComplete(candidate);
        } catch (err) {
            console.error(err);
            message.error("Failed to parse resume.");
        }
        setLoading(false);
        return false; // Prevent default upload behavior
    };

    return (
        <div style={{ margin: "20px 0" }}>
            <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button type="primary" loading={loading}>
                    Upload Resume (PDF/DOCX)
                </Button>
            </Upload>
        </div>
    );
};

export default ResumeUploader;
