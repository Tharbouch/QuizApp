import '../assets/Styles/questionsArea.css'


export const QuestionsArea = (props: any) => (<div className="question-container">

    <>
        {props.error && console.error(props.error)}
        {props.response &&
            Object.keys(props.response?.data).map(
                (category: any) => {
                    return <div key={category}>
                        {category}
                        <div className="question-area">
                            {props.response?.data[category].map((question: any) => {
                                return <div>
                                    {question.question}
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

</div>)
