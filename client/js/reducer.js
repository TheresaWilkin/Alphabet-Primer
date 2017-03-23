
const initState = {
	question: {
		capital: 'A',
		lowercase: 'a',
		freq: 1,
		sounds: []
	},
	answer: '',
	score: 0,
	language: 'lowercase',
	speechRecognition: 'unavailable',
	winner: false
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_CARD_SUCCESS':
			{
			let answer;
			if (state.language === 'lowercase') {
				answer = action.question.question.capital;
			} else {
				answer = action.question.question.lowercase;
			}
			return {
				...state,
				question: action.question.question,
				score: action.question.score,
				answer
			};
		}
		case 'SET_SPEECH_RECOGNITION' :
			return {
				...state,
				speechRecognition: action.status
			};
		case 'SET_WINNER':
			return {
				...state,
				winner: action.status
			};
		case 'NEXT_QUESTION' :
			{
				let answer;
				if (state.language === 'lowercase') {
					answer = action.question.question.capital;
				} else {
					answer = action.question.question.lowercase;
				}
				return {
					...state,
					question: action.question.question,
					score: action.question.score,
					answer
				};
			}
		case 'SWITCH_LANGUAGE':
			{
			const language = state.language;
			const answer = (language == 'capital') ? state.question.capital : state.question.lowercase;
			return {
				...state,
				language: language == 'capital' ? 'lowercase' : 'capital',
				answer
			};
			}
		default:
			return state;
		}
};

export default reducer;
