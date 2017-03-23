import React from 'react';
import { connect } from 'react-redux';


const QuestionCard = (props) => {
	if (props.winner) {
		return <img src="./../assets/star.png" alt="star" className="winner" />;
	}
	return 	(
		<div className="card" >
				<p className="centered cardText" >
					{ props.word }
				</p>
			</div>
		);
};

export default connect()(QuestionCard);
