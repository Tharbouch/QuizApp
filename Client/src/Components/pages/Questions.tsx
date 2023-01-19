
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../../Hooks/useAxios";
import '../../assets/Styles/Questions.css'
import Input from "../Input";

const Questions = () => {
    interface checkboxContent {
        label?: String,
        checked?: boolean
    }
    const [question, setQuestion] = useState('')
    const [checkboxes, setCheckboxes] = useState<checkboxContent[]>([]);
    const [newCheckboxLabel, setNewCheckboxLabel] = useState('');

    const handleAddCheckbox = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setCheckboxes([...checkboxes, { label: newCheckboxLabel, checked: false }]);
        setNewCheckboxLabel('');
    };

    const handleCheckboxChange = (index: any) => (event: any) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index].checked = event?.target?.checked;
        setCheckboxes(newCheckboxes);
    };
    return (
        <div className="containerQuestions">
            <div className="edit-container">
                <form className="question-from">

                    <Input classname="inputfield" type="text" label="Question" handler={setQuestion} />

                    <div className="image-input">
                        <label >Image (optionnel):</label>
                        <input type="file" className="upload-button" />
                    </div>

                    <div className="checkBox-list">
                        <p> Answers:</p>
                        {checkboxes.map((checkbox, index) => (
                            <div className="checkbox" key={index}>
                                <input
                                    type="checkbox"
                                    checked={checkbox.checked}
                                    onChange={handleCheckboxChange(index)}
                                />

                                <label>{checkbox.label}</label>
                            </div>
                        ))}

                        <div className="add-checkbox">

                            <Input classname="inputfield" type="text" label="add Answer" handler={setNewCheckboxLabel} />
                            <div className="button-container">
                                <button className="addButton" onClick={(e) => { handleAddCheckbox(e) }}>Add</button>
                            </div>

                        </div>

                    </div>
                    <div className="button-container btnsubmit">
                        <button className="submitButton" type="submit">Submit</button>
                    </div>

                </form>

            </div>

            <div className="question-container">

            </div>
        </div>

    );
}

export default Questions;