import { useEffect, useState } from 'react'
import '../assets/Styles/questionsArea.css'


export const QuestionsArea = ({ response, error, handler }: any) => {

    const [display, setDisplay] = useState(new Array(Object.keys(response?.data).length).fill(false))

    const handelOnClick = (question: any) => {
        handler(question)
    }

    const dispalyQuestions = (index: any) => {

        const temp = [...display]
        temp[index] = !temp[index]
        setDisplay(temp)
    }



    return (
        <div className="question-container">
            <>
                {error && console.error(error)}
                {response &&
                    Object.keys(response?.data).map(
                        (category: any, index: any) => {
                            return (
                                <div className="category-container" key={index}>
                                    <div className='title-container' onClick={() => { dispalyQuestions(index) }}>
                                        {category}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </div>
                                    <div className="questions-area" style={{ 'display': display[index] ? 'block' : 'none' }}>
                                        {
                                            response?.data[category].map(
                                                (question: any, index: any) => {

                                                    return (
                                                        <div className='question-area' key={index}>
                                                            <div onClick={() => { handelOnClick(question) }}>{question.question}</div>
                                                            {
                                                                question.image &&
                                                                <div className='image-space '>
                                                                    <img
                                                                        src={
                                                                            `data:image/png;base64, ${btoa(String.fromCharCode(...new Uint8Array(question.image.data.data)))}`
                                                                        } alt="question-image" />
                                                                </div>
                                                            }
                                                            <ul>
                                                                {question.answers.map(
                                                                    (answer: any) => {
                                                                        return <li style={{ "color": answer?.isCorrect ? "green" : "red" }}>{answer.answer}</li>;
                                                                    }
                                                                )
                                                                }
                                                            </ul>
                                                        </div>
                                                    );

                                                }
                                            )
                                        }
                                    </div>

                                </div>
                            );
                        }
                    )
                }
            </>

        </div>
    );
}
