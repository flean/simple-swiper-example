import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'

export default LoginForm = () => {
	const [username , setUsername] = useState("");
	const [password , setPassword] = useState("");

	const handleLogin = e => {
		e.preventDefault();
		console.log(username)
		console.log(password)
		Meteor.loginWithPassword(username,password, (error) =>{
			if (!error) {
				console.log("In")
				return true
			} else {
				console.log(error)
			}
		});
	}

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label>Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					required
					onChange={ e => setUsername(e.target.value)}/>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					required
					onChange={ e => setPassword(e.target.value) }/>
			</div>
			<button type='submit'>Login</button>
		</form>
	)
}
