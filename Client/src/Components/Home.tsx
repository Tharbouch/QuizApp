import { useContext, useEffect, useState } from "react";
import { UserContext } from '../Utils/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {
    const userContext = useContext(UserContext)
    const [quizzes, setQuizzes] = useState([])
    return (
        <div className="quizzesGround">

        </div>
    )
}