import React, {useState, useEffect} from 'react';
import './SurveyPopup.css';
import {IoMdCloseCircle} from "react-icons/io";

interface SurveyPopupProps {
    onClose: () => void;
    onSubmit: (questions: string[], responses: string[]) => void;
    initialResponses: string[]; // Prop for initial responses
}

const SurveyPopup: React.FC<SurveyPopupProps> = ({onClose, onSubmit, initialResponses}) => {
    const questions = ['Nationality', 'Age', 'Traits (Briefly)', 'Experiences (LinkedIn Paste)'];
    const [responses, setResponses] = useState<string[]>(['', '', '', '']);

    useEffect(() => {
        // Prepopulate the responses with the initialResponses prop if available
        if (initialResponses.length > 0) {
            setResponses(initialResponses);
        }
    }, [initialResponses]);

    const handleInputChange = (index: number, value: string) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const handleSubmit = () => {
        onSubmit(questions, responses); // Pass questions and responses back to the parent component
    };

    return (
        <div className="survey-popup">
            <h2>Survey:</h2>
            {questions.map((question, index) => (
                <div className="question" key={index}>
                    <label>{question}:</label>
                    <input
                        type="text"
                        value={responses[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                </div>
            ))}
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
            <button className="close-button" onClick={onClose}>
                <IoMdCloseCircle/>
            </button>
        </div>
    );
};

export default SurveyPopup;
