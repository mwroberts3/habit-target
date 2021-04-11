import Button from './Button'
import {Redirect} from 'react-router-dom'
import React, {useState} from 'react'

const AddHabit = () => {
    const [newHabitSubmitted, setNewHabitSubmitted] = useState(false)

    if (newHabitSubmitted) {
        return (<Redirect to='/' />)
    }

    const submitNewHabit = () => {

        setNewHabitSubmitted(true)

        const formData = new FormData(document.getElementById('new-habit-form'))
        let formDataObj = {}
    
        // add local timezone date
        let date = new Date(new Date(Date.now()).getTime())
        date = date.setHours(0,0,0,0)
        formData.append('createdAtDate', new Date(date))
    
        for (let key of formData.keys()) {
            formDataObj[key] = formData.get(key)
        }    

        let token = localStorage.getItem('token')

        fetch('http://localhost:5050/habits/add-habit', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
                Timestamp: new Date(date)
            },
            body: JSON.stringify(formDataObj)
        })
    }

    return (
      <div id='add-habit-container'>
        <form id='new-habit-form'>
          <h3>Add New Habit</h3>
          <label htmlFor="description">Short Description</label>
          <input name="description" type="text" />
          <h3>Update Style</h3>
          <input type="radio" name="updateStyle" value="active" />
          <label htmlFor="active-update">active</label>
          <input type="radio" name="updateStyle" value="passive" defaultChecked />
          <label htmlFor="passive-update">passive</label>
          <div>
            <label htmlFor="days">Goal</label>
            <input name="daysGoal" type="number" />
            Days
          </div>
          <div>
            <label htmlFor="days">Time</label>
            <input name="daysLeft" type="number" />
            Days
          </div>
          <Button btnDisplay='Submit' btnFunction='submitNewHabitBtn' functionLiteral={submitNewHabit} />
        </form>
      </div>
    )
}

export default AddHabit