import React, {useContext} from 'react';
import {TasksContext} from '../../context/TasksContext';
import {UserContext} from '../../context/UserContext';
import {updateUser} from '../../api'

const Board = (props) => {

	const {user, setUser} = useContext(UserContext)
	const {tasks} = useContext(TasksContext)

	const drop = async (e) => {
		e.preventDefault();
		const card_id = e.dataTransfer.getData('card_id')

		const card = document.getElementById(card_id)
		card.style.display = 'block';

		// e.target.appendChild(card)

		let origin = user[props.parentId]
		let index = origin.findIndex(item => item.key === props.selectedCardId)
		let cardData = origin[index]

		//adding to target list
		let requesBody;
		if (e.target.id === "todo") {
			let previous = tasks.todo
			let newArray = [...previous, cardData]
			setUser({...user, todo: newArray})
			origin.splice(index, 1)
			if (props.parentId === "todo") {
				requesBody = {todo: origin, todo: newArray}
			} else if (props.parentId === "doing") {
				requesBody = {doing: origin, todo: newArray}
			} else {
				requesBody = {done: origin, todo: newArray}
			}

		} else if (e.target.id === "doing") {
			let previous = tasks.doing
			let newArray = [...previous, cardData]
			setUser({...user, doing: newArray})
			origin.splice(index, 1)
			if (props.parentId === "todo") {
				requesBody = {todo: origin, doing: newArray}
			} else if (props.parentId === "doing") {
				requesBody = {doing: origin, doing: newArray}
			} else {
				requesBody = {done: origin, doing: newArray}
			}

		} else {
			let previous = tasks.done
			let newArray = [...previous, cardData]
			setUser({...user, done: newArray})
			origin.splice(index, 1)
			if (props.parentId === "todo") {
				requesBody = {todo: origin, done: newArray}
			} else if (props.parentId === "doing") {
				requesBody = {doing: origin, done: newArray}
			} else {
				requesBody = {done: origin, done: newArray}
			}

		}

		try {
			await updateUser(requesBody, user._id)
		} catch (error) {
			console.log(error)
		}
	}

	const dragOver = (e) => {
		e.preventDefault()
	}

	const addItem = () => {
		props.setAddId(props.id)
		props.setShowAdd(true)
	}

	return(
		<>
			<div className="board-container" id={props.id}
			onDrop={drop}
			onDragOver={dragOver}>

				<div className="board-top">
					<h3 className="board-heading">{props.heading}</h3>
					<div className="circle">
						<h5 className="count">{props.le}</h5>
					</div>
				</div>

				<button className="add-button" onClick={addItem}>
					+
				</button>

				{props.children}

			</div>
		</>
		)
}

export default Board;