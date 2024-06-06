import { useState } from "react";
import { useDispatch } from "react-redux";
import {createGoal} from "../features/goals/goalsSlice"

function GoalForm() {
  
  const [text, setText] = useState('');
  const dispatch = useDispatch();


  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({text}));
    setText('');
  }



  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type='text' name='text' id='text' value={text} onChange={onChange}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block">Add Goal</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm
