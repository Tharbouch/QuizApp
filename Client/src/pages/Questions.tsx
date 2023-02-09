import React, { FormEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { UserContext } from '../Utils/userContext';
import { useAxios } from "../Hooks/useAxios";
import '../assets/Styles/Questions.css'
import Input from "../Components/Input";
import axios from "axios";
import { QuestionsArea } from "../Components/questionsArea";
import ImageInput from "../Components/ImageInput";
import TextArea from "../Components/TextArea";
import SubmitButton from "../Components/SubmitButton";

const Questions = () => {
    type checkboxContent = {
        answer?: String,
        isCorrect?: boolean
    }

    const userContext = useContext(UserContext)
    const [category, setCategory] = useState('')
    const [question, setQuestion] = useState('')
    const [checkboxes, setCheckboxes] = useState<checkboxContent[]>([]);
    const [newCheckboxLabel, setNewCheckboxLabel] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const [response, error, isLoading, customAxios] = useAxios({
        url: '/data/question',
        method: 'get',
        headers: {},
        params: { creator: "Taha Harbouch" }
    })

    const handleAddCheckbox = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        setCheckboxes([...checkboxes, { answer: newCheckboxLabel, isCorrect: false }]);
        setNewCheckboxLabel('');
    };

    const handleCheckboxChange = (index: any) => (event: any) => {

        const newCheckboxes = [...checkboxes];
        newCheckboxes[index].isCorrect = event?.target?.checked;
        setCheckboxes(newCheckboxes);
    };

    const handleDeleteCheckbox = (index: number) => {
        setCheckboxes(checkboxes.filter((_, i) => i !== index));
    }

    const pickQuestion = (question: any) => {
        setCategory(question.category)
        setQuestion(question.question)
        question.image ? setImage(question.image) : setImage(null)
        setCheckboxes(question.answers)
    }

    const handelOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkboxes.some(answer => answer.isCorrect === true)) {
            const formData = new FormData();
            formData.append("category", category)
            image && formData.append("questionimage", image)
            formData.append("question", question)
            formData.append("answers", JSON.stringify(checkboxes))
            userContext?.auth?.userId && formData.append("createdBy", "Taha Harbouch")

            axios.post('http://localhost:4000/api/data/question', formData, {
                headers: { "Content-Type": "multipart/form-data", "Accept": "*/*, multipart/form-data" }
            }).then((response) => {
                if (response.status === 201) {
                    setCategory('')
                    setQuestion('')
                    setImage(null)
                    setCheckboxes([])
                    customAxios()
                }
            }).catch((error) => {
                alert(error)
            })
        }
        else {
            alert("Check At least one correct answer")
        }

    }


    useEffect(() => {
        customAxios()
    }, [])

    return (

        <>
            {!isLoading ?
                <div className="edit-ground">

                    <div className="edit-container">
                        <form className="question-from" onSubmit={(e) => { handelOnSubmit(e) }} noValidate>

                            <Input classname="inputfield" type="text" label="Category" value={category} handler={setCategory} />
                            <Input classname="inputfield" type="text" label="Question" value={question} handler={setQuestion} />

                            <ImageInput handeler={setImage} required={false} />

                            <div className="list-area">
                                <p> Answers:</p>
                                {checkboxes.map((checkbox, index) => (
                                    <div className="checkboxArea">
                                        <div className="checkbox" key={index}>
                                            <input
                                                type="checkbox"
                                                checked={checkbox.isCorrect}
                                                onChange={handleCheckboxChange(index)}
                                            />

                                            <label>{checkbox.answer}</label>
                                        </div>
                                        <div className="button-container">
                                            <button className="delete-button" onClick={(e) => handleDeleteCheckbox(index)}>Delete</button>
                                        </div>
                                    </div>

                                ))}

                                <div className="add-description">

                                    <TextArea label="add Answer" value={newCheckboxLabel} handler={setNewCheckboxLabel} />

                                    <div className="button-container">
                                        <button className="addButton" onClick={(e) => { handleAddCheckbox(e) }}>Add</button>
                                    </div>

                                </div>

                            </div>
                            <SubmitButton />

                        </form>

                    </div>

                    {response && <QuestionsArea response={response} error={error} handler={pickQuestion} />}
                </div>
                :
                <p>...Loading</p>
            }
        </>




    );
}

export default Questions;