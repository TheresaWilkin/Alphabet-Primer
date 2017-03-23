import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import SpeechRecognition from 'react-speech-recognition'
import * as actions from '../actions';
import InputCard from './pieces/input';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  interimTranscript: PropTypes.string,
  word: PropTypes.object,
}

class Dictaphone extends Component {
  componentWillReceiveProps(nextProps) {
    const { transcript, word, resetTranscript } = nextProps;
    transcript.split(' ').forEach(sound => {
      if (word.sounds.includes(sound)) {
        this.props.dispatch(actions.setWinner(true));
        setTimeout(() => { this.props.dispatch(actions.sendAnswer(true)); }, 4000);
        resetTranscript();
      }
    });

    if (transcript.length > 200) {
      resetTranscript();
    }
  }

  componentDidMount() {
    if (!this.props.browserSupportsSpeechRecognition) {
      this.props.dispatch(actions.setSpeechRecognition('unavailable'));
    } else {
      this.props.dispatch(actions.setSpeechRecognition('on'));
    }
  }

  render() {
    const { transcript, resetTranscript, speechRecognition } = this.props

    if (speechRecognition !== 'on') {
      return <InputCard />;
    }

    let filler = '...';
    let reset = <button className="clear" onClick={resetTranscript}>Clear</button>;
    if (transcript === '') {
      filler = '';
      reset = '';
    }

    return (
      <div className="transcript">
        <img src="../../../assets/voice-recorder.png" alt="microphone" className="microphone" />
        <div className="transcript-text"><p>{transcript}{filler}</p></div>
        {reset}
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes

const mapStateToProps = (state) => ({
  speechRecognition: state.speechRecognition
});

export default connect(mapStateToProps)(SpeechRecognition(Dictaphone))
