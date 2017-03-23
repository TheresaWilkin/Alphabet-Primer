import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import QuestionCard from './pieces/questionscard';
import InputCard from './pieces/input';
import Counter from './pieces/counter';
import SpeechRecognition from './SpeechRecognition';

class SpacedRep extends React.Component {
	constructor() {
		super();
		this.state = {
			options: 'hidden'
		};
	}
	componentDidMount() {
		this.props.dispatch(actions.getCard());
	}

	onClick() {
		if (this.state.options === 'hidden') {
			this.setState({ options: 'option-box' });
		} else {
			this.setState({ options: 'hidden' });
		}
	}

	renderSpeechCheckbox() {
		switch (this.props.speechRecognition) {
			case 'on':
				return (<label htmlFor="speech-rec">
									<input
											id="speech-rec"
											onClick={() => { this.props.dispatch(actions.setSpeechRecognition('off')); }}
											type="checkbox"
											defaultChecked
									/>
									<p>Voice Recognition</p>
								</label>);
			case 'off':
				return (<label htmlFor="speech-rec">
									<input
											id="speech-rec"
											onClick={() => { this.props.dispatch(actions.setSpeechRecognition('on')); }}
											type="checkbox"
											defaultChecked
									/>
									<p>Voice Recognition</p>
								</label>);
			case 'unavailable':
				return null;
			default:
				return 'null';
		}
	}

	renderDirections() {
		if (this.props.speechRecognition === 'on') {
			return <p>Say <span>'Letter {this.props.question[this.props.language]}'</span>.</p>;
		}
		const letter = this.props.question[this.props.language];
		const type = this.props.language === 'capital' ? 'lowercase' : 'capital';
		return <p>Type a {type} '{letter}'</p>;
	}

	renderAnswer() {
		if (this.props.winner) {
			setTimeout(() => { this.props.dispatch(actions.setWinner(false)); }, 4000);
			return 	(
				<div className="col-6 winner">
					<img src={`./assets/letter_pictures/${this.props.question.lowercase}.png`} alt="winner" />
				</div>);
		}
	}

	render() {
		let won = '';
		if (this.props.winner) {
			won = 'hidden';
		}
		return (
			<div className="game-container centered-container">
				<header className="col-12">
					<Link to="/">
						<h1>Alphabet Primer</h1>
					</Link>
				</header>
				<div className="col-6 options" onClick={this.onClick.bind(this)}>
					<img src='./assets/cogwheel.png' alt="settings" className="settings" />
					<p>Options</p>
				</div>
				<div className="col-6 points">
					<p>{this.props.score} pts</p>
				</div>
				<div className="col-12">
					<div className={this.state.options}>
						<label htmlFor="letter">
							<input
							id="letter"
							onClick={() => { this.props.dispatch(actions.switchlanguage()); }}
							type="checkbox"
							/>
							<p>Capital Letters</p>
						</label>
						<br />
						{this.renderSpeechCheckbox()}
					</div>
				</div>
				<div className="col-6 question line">
					<QuestionCard
						word={this.props.question[this.props.language]}
						winner={this.props.winner}
					/>
				</div>
				<div className={`col-6 answer ${won}`}>
									<div className="directions">
										{this.renderDirections()}
									</div>
									<SpeechRecognition word={this.props.question} />
									<div className="buttons">
										<button
											className="correct"
											onClick={() => {
													this.props.dispatch(actions.setWinner(true));
													setTimeout(() => { this.props.dispatch(actions.sendAnswer(true)); }, 4000);
												}
											}
										>Correct</button>
										<button
											className="skip"
											onClick={() => { this.props.dispatch(actions.sendAnswer(false)); }}
										>Skip</button>
									</div>
								</div>
				{this.renderAnswer()}
			</div>
		);
	}
}
const mapStateToProps = (state, props) => ({
	typewriter: state.typewriter,
	question: state.question,
	score: state.score,
	language: state.language,
	speechRecognition: state.speechRecognition,
	winner: state.winner
});
export default connect(mapStateToProps)(SpacedRep);

// this.props.question[this.props.language]
