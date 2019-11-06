import React from 'react';
import {Loading} from "../Loading/Loading";
import AnswerList from './AnswerList';

const Answers = () => {
    const [answers, setAnswers] = React.useState([]);
    const [loading,setLoading]=React.useState(false);
    const [error,setError]=React.useState(null);

    async function fetchAnswers() {
        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:5000/api/forms"
            );
            const data = await response.json();
            setAnswers(data);
            setLoading(false);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError("Noe gikk galt");
                setLoading(false);
            }
        }
    }

    React.useEffect(()=>{
        setLoading(true);
        fetchAnswers();
    },[]);

    return (
        <div>
            {error}
            <AnswerList answers={answers} loading={loading}/>
        </div>
    )
};

export default Answers