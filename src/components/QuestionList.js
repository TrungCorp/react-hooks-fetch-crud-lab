import { useEffect, useState } from "react";
import react from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const [questions,setQuestions] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuestions(data)})
  },[])

 function handleDelete(passedData){
    const newSet = questions.filter(question => question.id !== passedData.id)
    console.log(newSet)
    setQuestions(newSet)
 }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question =>{return <QuestionItem handleDelete={handleDelete} question={question} key={question.id}></QuestionItem> })}</ul>
    </section>
  );
}

export default QuestionList;
