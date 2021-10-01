import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {signupRequest} from '../../api';
import {UserContext} from '../../context/UserContext'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

const Signup = () => {

	const history = useHistory()
	const {setUser, rememberMe, setRememberMe} = useContext(UserContext)

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState();

	const [passwordVisible, setPasswordVisible] = useState(false)

	const singup = async (e) => {

		e.preventDefault()

		if (!email.includes('@')) {
			setErrorMessage('Please enter a valid email.')
		} else if (password.length < 8){
			setErrorMessage('Password must be eight at least characters long.')
		} else {
			setErrorMessage(null)
			const formData = {username, email, password }

			const { data } = await signupRequest(formData)
			{rememberMe ? localStorage.setItem('remember', JSON.stringify({remember: true})) : localStorage.clear()}

			localStorage.setItem('profile', JSON.stringify({ ...data?.result }))
			setUser(data?.result)

			history.push('/')
		}

	}

	return(
		<>			
			<form className="signin-form" onSubmit={singup}>
					
				<input type="text" className="input" placeholder="Username" onChange={(e) => {
						setUsername(e.target.value)
						setErrorMessage(null)}} />

				<input type="text" className="input" placeholder="Email ID" onChange={(e) => {
						setEmail(e.target.value)
						setErrorMessage(null)}} />

				<div className="password-div">
					<input type={
						passwordVisible ? "text" : "password"
					} className="input" placeholder="Password" onChange={(e) => {
							setPassword(e.target.value)
							setErrorMessage(null)}} />
					{passwordVisible ? 
						<AiOutlineEye className="eye" onClick={() => setPasswordVisible(false)} /> :
						<AiOutlineEyeInvisible className="eye"onClick={() => setPasswordVisible(true)} /> 
					}
				</div>

				{errorMessage ? <p className="error-message">{errorMessage}</p> : null}


					<button className="btn-submit" type="submit">Sign Up</button>

				<label>
					<input type="checkbox" className="remember-me-check" onClick={() => setRememberMe(!rememberMe)}/>
					<span className="form-sub">Remember Me</span>
				</label>

			</form>
	
		</>
		)
}

export default Signup;