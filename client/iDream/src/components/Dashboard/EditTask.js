import React, {useState, useContext, useEffect} from 'react';
import {TasksContext} from '../../context/TasksContext';
import {UserContext} from '../../context/UserContext';
import {AiFillCloseCircle} from 'react-icons/ai'
import {updateUser} from '../../api'

const EditTask = ({editId, setShowEdit, editType}) => {

	const {user, setUser} = useContext(UserContext)
	const {tasks} = useContext(TasksContext)

	const [title, setTitle] = useState()
	const [data, setData] = useState()
	const [deadline, setDeadline] = useState()

	const editTask = async (e) => {
		e.preventDefault()

		let random = Math.random()
		let key = `${title}-${random}`

		const formData = {
			key,
			title,
			data,
			deadline
		}

		let requestBody;
		let index;
		if (editType === "todo"){
			index = tasks.todo.findIndex(item => item.key === editId)
			console.log(index)
			tasks.todo.splice(index, 1)
			let todo = tasks.todo
			let newTodo =[...todo, formData]
			requestBody = {todo: newTodo}
			setUser({...user, todo: newTodo})

		} else if (editType === "doing"){
			index = tasks.doing.findIndex(item => item.key === editId)
			tasks.doing.splice(index, 1)
			let doing = tasks.doing
			let newDoing =[...doing, formData]
			requestBody = {doing: newDoing}
			setUser({...user, doing: newDoing})

		} else {
			index = tasks.done.findIndex(item => item.key === editId)
			tasks.done.splice(index, 1)
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
		setShowEdit(false)


		// console.log(updatedUser)
	}

	useEffect(() => {
		let index;
		let selectedTask;
		if (editType === "todo"){
			index = tasks.todo.findIndex(item => item.key === editId)
			selectedTask = tasks.todo[index]
		} else if (editType === "doing") {
			index = tasks.doing.findIndex(item => item.key === editId)
			selectedTask = tasks.doing[index]
		} else {
			index = tasks.done.findIndex(item => item.key === editId)
			selectedTask = tasks.done[index]
		}
		setTitle(selectedTask.title)
		setData(selectedTask.data)
		setDeadline(selectedTask.deadline)
	}, [])

	return(
		<>
			<div className="back">
				<div className="add-container">
					<AiFillCloseCircle className="closer" onClick={() => setShowEdit(false)}/>
					<div className="board-top">
						<h3 className="board-heading">Edit Task</h3>
						
					</div>

					<form className='add-form' onSubmit={editTask}>
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-text" placeholder="Task Title" />
						<input type="text-area" value={data} onChange={(e) => setData(e.target.value)} className="input-area" placeholder="Task description" />
						<input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input-text" placeholder="Deadline" />

						<button className="btn-submit" type="submit">Edit Task</button>

					</form>
				</div>
			</div>
		</>
		)
}

export default EditTask