import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../../context/UserContext';
import {TasksContext} from '../../context/TasksContext';
import {useHistory} from 'react-router-dom';
import Board from './Board'
import Card from './Card'
import AddTask from './AddTask'
import EditTask from './EditTask'
import {FaEdit} from 'react-icons/fa'

import './Dashboard.css'

const Dashboard = () => {

	const history = useHistory()
	const {user, setUser, rememberMe} = useContext(UserContext)
	const {tasks, setTasks} = useContext(TasksContext)

	const [showAdd, setShowAdd] = useState(false)
	const [addId, setAddId] = useState()

	const [showEdit, setShowEdit] = useState(false)
	const [editId, setEditId] = useState()
	const [editType, setEditType] = useState()

	const [selectedCardId, setSelectedCardId] = useState()
	const [parentId, setParentId] = useState()

	const signout = () => {
		localStorage.clear()
		setUser(null)
		history.push('/')
	}

	useEffect(() => {
		console.log("DASH", rememberMe)
		setTasks(
					{
						todo: user.todo,
						doing: user.doing,
						done: user.done
					}
				)

	}, [user])

	return(
		<>
			<div className="dashboard">

				{showAdd ? <AddTask addId={addId} showAdd={showAdd} setShowAdd={setShowAdd}/> : null}

				{showEdit ? <EditTask editId={editId} showEdit={showEdit} setShowEdit={setShowEdit} editType={editType} /> : null}

				<h1 className="heading">Projects</h1>

				<div className="signout-container">
					<button className="btn-submit" type="submit" onClick={signout}>Sign Out</button>
				</div>

				<div className="projects-container">

					<Board id={"todo"} heading="To Do" le={tasks.todo.length} setAddId={setAddId} setShowAdd={setShowAdd}
						selectedCardId={selectedCardId}
						parentId={parentId}>
						{tasks.todo.map((task) => {
							return(
								
								<Card id={task.title} key={task.key} keyNum={task.key} setSelectedCardId={setSelectedCardId}
									setParentId={setParentId}>	
									<FaEdit className="pencil" onClick={() => {setShowEdit(true)
												setEditType("todo")
												setEditId(task.key)
												}}/>
									<h3 className="card-heading">{task.title}</h3>
									<p className="card-desc">{task.data}</p>
									<p className="deadline">{task.deadline}</p>
								</Card>
								
						
								)
						})}

					</Board>

					<Board id={"doing"} heading="In Progress" le={tasks.doing.length} setAddId={setAddId} setShowAdd={setShowAdd}
						selectedCardId={selectedCardId}
						parentId={parentId}>

							{tasks.doing.map((task) => {
							return(
								<Card id={task.title} key={task.key} keyNum={task.key} setSelectedCardId={setSelectedCardId}
									setParentId={setParentId}>	
									<FaEdit className="pencil" onClick={() => {setShowEdit(true)
												setEditType("doing")
												setEditId(task.key)
												}}/>
									<h3 className="card-heading">{task.title}</h3>
									<p className="card-desc">{task.data}</p>
									<p className="deadline">{task.deadline}</p>
								</Card>
								)
						})}

					</Board>

					<Board id={"done"} heading="Completed" le={tasks.done.length} setAddId={setAddId} setShowAdd={setShowAdd}
						selectedCardId={selectedCardId}
						parentId={parentId}>

						{tasks.done.map((task) => {
							return(
								<Card id={task.title} key={task.key} keyNum={task.key} setSelectedCardId={setSelectedCardId}
									setParentId={setParentId}>	
									<FaEdit className="pencil" onClick={() => {setShowEdit(true)
												setEditType("done")
												setEditId(task.key)
												}}/>
									<h3 className="card-heading">{task.title}</h3>
									<p className="card-desc">{task.data}</p>
									<p className="deadline">{task.deadline}</p>
								</Card>
								)
						})}

					</Board>


				</div>
			</div>
		</>
		)
}

export default Dashboard;