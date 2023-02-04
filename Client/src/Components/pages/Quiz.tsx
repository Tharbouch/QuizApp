import React, { FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { UserContext } from '../../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../../Hooks/useAxios";
import Input from "../Input";
import axios from "axios";
import { QuestionsArea } from "../questionsArea";

export const Quiz = () => {

    type questionType = {
        _id?: string,
        question?: string

    }

    const [quizName, setQuizName] = useState()
    const [image, setImage] = useState<File | null>(null);

    const [questions, setQuestions] = useState<questionType[]>([])

    const [response, error, isLoading, customAxios] = useAxios({
        url: '/data/question',
        method: 'get',
        headers: {},
        params: { creator: "Taha Harbouch" }
    })


    const updateQuestionsList = (question: questionType) => {
        setQuestions([...questions, question])
    }

    useEffect(() => {
        customAxios()
    }, [])

    return (
        <div className="edit-ground">
            <div className="edit-container">
                <form className="question-from" noValidate>
                    <Input classname="inputfield" type="text" label="Quiz Name" value={quizName} handler={setQuizName} />
                    <div className="image-input">
                        <label >Image (required):</label>
                        <input type="file" name="questionimage" className="upload-button" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                    </div>

                    <div className="add-description">

                        <div className="areafield">
                            <textarea /*value={newCheckboxLabel} onChange={(e) => { setNewCheckboxLabel(e.target.value) }}*/ required />

                            <label >add Description</label>
                        </div>

                    </div>

                    {<div className="list-area">
                        <p>Questions:</p>
                        {
                            questions?.map((question: any) => {
                                return <p>{question.question}</p>
                            })
                        }
                    </div>}
                    <div className="button-container btnsubmit">
                        <button className="submitButton" type="submit">Submit</button>
                    </div>

                </form>

            </div>
            <QuestionsArea response={response} error={error} handler={updateQuestionsList} />
        </div>
    );
}