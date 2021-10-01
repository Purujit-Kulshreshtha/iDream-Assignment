import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {signinRequest} from '../../api';
import {UserContext} from '../../context/UserContext'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {FiAlertOctagon} from 'react-icons/fi'

const Signin = () => {

	const history = useHistory()
	const {setUser, setRememberMe, rememberMe} = useContext(UserContext)

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const [isBadEmail, setIsBadEmail] = useState(false);
	const [isBadPassword, setIsBadPassword] = useState(false);

	const [passwordVisible, setPasswordVisible] = useState(false)

	const singin = async (e) => {
		e.preventDefault()
		const formData = { email, password}

		if (email.includes('@')){
			try {
				const { data } = await signinRequest(formData)
				{rememberMe ? localStorage.setItem('remember', JSON.stringify({remember: true})) : localStorage.clear()}
				localStorage.setItem('profile', JSON.stringify({ ...data?.result }))


				setErrorMessage(null)

				setUser(data?.result)
				
				history.push('/')

			} catch (error) {
				setErrorMessage("Your Email and Password do not match.")
				setIsBadEmail(true)
				setIsBadPassword(true)
			}
		} else {
			setErrorMessage("Please enter a valid email address.")
			setIsBadEmail(true)
		}	
	}

	return(
		<>
			
			<form className="signin-form" onSubmit={singin}>
				<div>
					<h1 className="form-heading">To Continue</h1>
					<h6 className="form-sub">We need your Name & Email </h6>
				</div>
				
				<input type="text" className={isBadEmail ? "input-alert" : "input"} placeholder="Email ID" onChange={(e) => {
						setEmail(e.target.value)
						setErrorMessage(null)
						setIsBadEmail(false)}} />

				<div className="password-div">
					<input type={
						passwordVisible ? "text" : "password"
					} className={isBadPassword ? "input-alert" : "input"}placeholder="Password" onChange={(e) => {
							setPassword(e.target.value)
							setErrorMessage(null)
							setIsBadPassword(false)}} />
					{passwordVisible ? 
						<AiOutlineEye className="eye" onClick={() => setPasswordVisible(false)} /> :
						<AiOutlineEyeInvisible className="eye"onClick={() => setPasswordVisible(true)} /> 
					}
				</div>

				{errorMessage ? <p className="error-message"><FiAlertOctagon />  {errorMessage}</p> : null}

				<button className="btn-submit" type="submit">Log In</button>

				<label>
					<input type="checkbox" className="remember-me-check" onClick={() => setRememberMe(!rememberMe)}/>
					<span className="form-sub">Remember Me</span>
				</label>
			</form>
		</>
		)
}

export default Signin;