import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import "./App.css"
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import {getUser} from './api';
import {UserContext} from './context/UserContext'
import {TasksContext} from './context/TasksContext'

const App = () => {

	const [user, setUser] = useState(localStorage.profile ? JSON.parse(localStorage.profile) : null)
	const [rememberMe, setRememberMe] = useState(false)
	const [tasks, setTasks] = useState({
		todo: [],
		doing: [],
		done: []
	})

	useEffect(() => {
		console.log("CALL")
		const getUserData = async () => {
			const response = await getUser(user._id)
			const newUser = response.data
			setUser(newUser)
			setTasks(
					{
						todo: newUser.todo,
						doing: newUser.doing,
						done: newUser.done
					}
				)
			localStorage.setItem('profile', JSON.stringify(newUser))
		}

		if (user) {
			getUserData()
		}

		window.addEventListener("beforeunload", (e) => {
			e.preventDefault()
			console.log(localStorage.remember)

			if (!localStorage.remember){
				console.log("hhh")
				localStorage.clear()
				setUser(null)
			}
		})

	}, [])

	return(
		<>
			<UserContext.Provider value={{user, setUser, rememberMe, setRememberMe}}>

				<Router>
					<Switch>

						<Route path="/" exact>
							{!user ? <Home /> : <Redirect to="/dashboard" />}
						</Route>

						<TasksContext.Provider value={{tasks, setTasks}}>
							<Route path="/dashboard" exact>
								{user ? <Dashboard /> : <Redirect to="/" />}
							</Route>
						</TasksContext.Provider>

					</Switch>
				</Router>

			</UserContext.Provider>
		</>
		)
}

export default App;