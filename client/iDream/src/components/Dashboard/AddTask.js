import React, {useState, useContext} from 'react';
import {TasksContext} from '../../context/TasksContext';
import {UserContext} from '../../context/UserContext';
import {AiFillCloseCircle} from 'react-icons/ai'
import {updateUser} from '../../api'

const AddTask = ({addId, setShowAdd}) => {

	const [title, setTitle] = useState()
	const [data, setData] = useState()
	const [deadline, setdeadline] = useState()
	const {user, setUser} = useContext(UserContext)
	const {tasks} = useContext(TasksContext)

	const addTask = async (e) => {
		e.preventDefault()
		setShowAdd(false)

		let random = Math.random()
		let tempTitle = title.split(' ').join("-")
		let key = `${tempTitle}-${random}`

		const formData = {
			key,
			title,
			data,
			deadline
		}

		let requestBody;
		if (addId === "todo"){
			let todo = tasks.todo
			let newTodo =[...todo, formData]
			requestBody = {todo: newTodo}
			setUser({...user, todo: newTodo})

		} else if (addId === "doing"){
			let doing = tasks.doing
			let newDoing =[...doing, formData]
			requestBody = {doing: newDoing}
			setUser({...user, doing: newDoing})

		} else {
			let done = tasks.done
			let newDone =[...done, formData]
			requestBody = {done: newDone}
			setUser({...user, done: newDone})
		}
		try{
			await updateUser(requestBody, user._id)
		} catch (error) {
			console.log(error)
		}


		// console.log(updatedUser)
	}

	return(
		<>
			<div className="back">
				<div className="add-container">
					<AiFillCloseCircle className="closer" onClick={() => setShowAdd(false)}/>
					<div className="board-top">
						<h3 className="board-heading">Add a Task</h3>
						
					</div>

					<form className='add-form' onSubmit={addTask}>
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-text" placeholder="Task Title" />
						<input type="text-area" value={data} onChange={(e) => setData(e.target.value)} className="input-area" placeholder="Task description" />
						<input type="text" value={deadline} onChange={(e) => setdeadline(e.target.value)} className="input-text" placeholder="Deadline" />

						<button className="btn-submit" type="submit">Add Task</button>

					</form>
				</div>
			</div>
		</>
		)
}

export default AddTask