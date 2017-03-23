import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const InputCard = (props) => {
	let textInput = '';
	const currentAnswer = props.answer;
	return (
		<div className="card">
			<form
			autoComplete="off"
			onSubmit={(e) => {
				e.preventDefault();
				if (textInput.value === currentAnswer) {
					props.dispatch(actions.sendAnswer(true));
					props.dispatch(actions.setWinner(true));
				} else {
					props.dispatch(actions.sendAnswer(false));
				}
				textInput.value = '';
			}}
			>
				<input
				type="text"
				ref={(input) => { textInput = input; }}
				name="textInput"
				className="text-input"
				autoFocus
				/>
			</form>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	answer: state.answer,
	question: state.question,
	word: state.question.french,
	counter: state.counter,
	language: state.language
});
export default connect(mapStateToProps)(InputCard);
