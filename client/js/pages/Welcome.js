import React from 'react';

class Welcome extends React.Component {
	render() {
		return (
			<div className="welcome">
				<div className="col-2" />
				<div className="login-container col-8">
					<h2>Alphabet</h2>
					<h1>Primer</h1>
					<a href="/auth/google">
						<img alt="login" className="google" src='./assets/goog.png' />
					</a>
				</div>
				<div className="col-2" />
			</div>
		);
	}
}

export default Welcome;
