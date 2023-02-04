import '../assets/Styles/questionsArea.css'


export const QuestionsArea = ({ response, error, handler }: any) => {


    const handelOnClick = (question: any, id: any) => {
        handler({ id, question })
    }

    return (<div className="question-container">

        <>
            {error && console.error(error)}
            {response &&
                Object.keys(response?.data).map(
                    (category: any) => {
                        return <div key={category}>
                            {category}
                            <div className="question-area">
                                {response?.data[category].map((question: any, index: any) => {
                                    return <div >
                                        <div onClick={() => { handelOnClick(question.question, question._id) }} key={index}>{question.question}</div>
                                        {question.answers.map((answer: any) => {
                                            return <p style={{ "color": answer?.isCorrect ? "green" : "red" }}>{answer.answer}</p>;
                                        })}
                                    </div>;

                                }
                                )}
                            </div>

                        </div>;
                    }
                )}
        </>

    </div>);


}
