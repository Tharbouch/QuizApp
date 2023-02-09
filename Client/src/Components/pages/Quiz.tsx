import React, { FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { UserContext } from '../../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../../Hooks/useAxios";
import Input from "../Input";
import axios from "axios";
import { QuestionsArea } from "../questionsArea";
import '../../assets/Styles/Quiz.css'

export const Quiz = () => {

    type questionType = {
        _id?: string,
        question?: string

    }

    const userContext = useContext(UserContext)
    const [quizName, setQuizName] = useState<string>('')
    const [image, setImage] = useState<File | null>(null);
    const [duration, setDuration] = useState<Number>(0)
    const [level, setLevel] = useState('Easy');
    const [description, setDescription] = useState<string>('')

    const [questions, setQuestions] = useState<questionType[]>([])

    const [response, error, isLoading, customAxios] = useAxios({
        url: '/data/question',
        method: 'get',
        headers: {},
        params: { creator: "Taha Harbouch" }
    })

    const handelOnSubmit = (e: any) => {
        e.preventDefault()
        console.log('hi')
        const formData = new FormData();
        formData.append("name", quizName)
        image && formData.append("quizimage", image)
        formData.append("description", description)
        formData.append("duration", duration.toString())
        formData.append("level", level)
        formData.append("creator", userContext?.auth?.name as string)
        axios.post('http://localhost:4000/api/data/quiz', formData, {
            headers: { "Content-Type": "multipart/form-data", "Accept": "*/*, multipart/form-data" }
        }).then((response) => {
            if (response.status === 201) {
                console.log(response.data)
            }
        }).catch((error) => {
            alert(error)
        })
    }

    const handleDelete = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    }

    const updateQuestionsList = (question: any) => {
        setQuestions([...questions, { _id: question._id, question: question.question }])
    }

    useEffect(() => {
        customAxios()
    }, [])

    return (
        <div className="edit-ground">
            <div className="edit-container">
                <form className="question-from" onSubmit={(e) => { handelOnSubmit(e) }} noValidate>
                    <Input classname="inputfield" type="text" label="Quiz Name" value={quizName} handler={setQuizName} />
                    <div className="image-input">
                        <label >Image (required):</label>
                        <input type="file" name="questionimage" className="upload-button" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                    </div>

                    <div className="add-description">

                        <div className="areafield">
                            <textarea onChange={(e) => { setDescription(e.target.value) }} required />

                            <label >Description</label>
                        </div>

                    </div>

                    <div className="duration-area">
                        <div>
                            <Input classname="inputfield" type="number" label="Duration" value={duration} handler={setDuration} />
                        </div>
                        <p>min</p>
                    </div>


                    {<div className="list-area">
                        <p>Questions:</p>
                        {
                            questions?.map((question: any, index: any) => {
                                return <div key={index}>
                                    <p>{question.question}</p>
                                    <div className="button-container">
                                        <button className="delete-button" onClick={(e) => handleDelete(index)}>Delete</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>}

                    <div className="level-area">
                        <p>Level : </p>
                        <select value={level} onChange={(e) => { setLevel(e.target.value) }}>
                            <option value="Easy">Easy</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="button-container btnsubmit">
                        <button className="submitButton" type="submit">Submit</button>
                    </div>

                </form>

            </div>
            <QuestionsArea response={response} error={error} handler={updateQuestionsList} />
        </div>
    );
}