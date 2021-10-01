import React, {useState} from 'react';
import Signin from '../Signin';
import Signup from '../Signup';
import HomeArt from '../../images/home/Group.svg'

import "./Home.css"

const Home = () => {

	const [signInSelected, setSignInSelected] = useState(true);

	return(
		<>
			<div className="home-container">
				<img src={HomeArt} width="300" alt="Graphic" />

				<div className="form-container">

					<div className="tabs-container">
						<button className={signInSelected ? "tab-active" : "tab"} onClick={() => setSignInSelected(true)}>Log In </button>
						<button className={signInSelected ? "tab" : "tab-active"} onClick={() => setSignInSelected(false)}>Sign Up </button>
					</div>

					<div className="form-element">
						{signInSelected ? <Signin /> : <Signup />}
					</div>

				</div>
			</div>
		</>
		)
}

export default Home;