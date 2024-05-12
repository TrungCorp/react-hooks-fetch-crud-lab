import React from "react";

function QuestionItem({ question ,handleDelete}) {
  const { id, prompt, answers, correctIndex } = question;
  console.log(answers)
  const options = answers.map((answer, index) => (
    <option  key={index}   value={index}>
      {answer}
    </option>
  ));
  function handleDeleteButton()
  {
    
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    
    })
      .then(response =>{
        if(response.ok){
          console.log('Item deleted successfully!');
          handleDelete(question)
        }
        else{
          console.error('Error deleting item!');
        }

      })
      .catch(error =>{
        console.error('Error:',error);
      })
  }


  function handleOptionChange(event)
  {
    const newIndex =parseInt(event.target.value)
    
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...question, correctIndex: newIndex })
    })
      .then(response => {
        if(response.ok){
          console.log('Item updated successfully')
          

        }
        else{
          console.error('Error updating item')
        }
      })
      .catch(error =>{
        console.error('Error:',error)
      })
  }
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleOptionChange} >{options}</select>
      </label>
      <button onClick={handleDeleteButton}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
