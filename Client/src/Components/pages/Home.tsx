import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../../Hooks/useAxios";
import '../../assets/Styles/Home.css'

export const Home = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const [response, error, isLoading, customAxios] = useAxios({
        method: 'get',
        url: '/data/quiz',

    })


    const handelClick = () => {
        if (userContext?.auth?.accessRole === "Professor") {
            navigate('/quiz', { replace: true })
        }
        if (userContext?.auth?.accessRole === "Student") {
            navigate('/editquiz', { replace: true })
        }
    }

    useEffect(() => {
        customAxios()
    }, [])

    return (

        <>
            {error && alert(error)}
            {
                isLoading && !error ? <p>IS LOADING ....</p> : <div className="quizzesGround">
                    {response?.data.map((quiz: any) => {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array(quiz.image.data.data))
                        )
                        return <>
                            <div className="conatainer" onClick={handelClick} key={quiz}>

                                <div className="image-container">
                                    <img id="quiz-image" src={`data:image/png;base64,${base64String}`} alt="quiz-image" />
                                    <label htmlFor="quiz-image">{quiz.name}</label>
                                </div>
                                <div className="description">
                                    <span>{`duration: ${quiz.duration}min`}</span>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            }
        </>

    )
}