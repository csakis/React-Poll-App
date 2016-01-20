var React = require('react');
var Display = require('./Display');
var d3= require('d3');

/*var questionStyle = {
	'font-weight': 'bold'
};*/
class Ask extends React.Component{
	constructor() {
	super();
	this.state ={
			choices: [],
			answer: undefined
		};
		this.setUpChoices = this.setUpChoices.bind(this);
		this.select = this.select.bind(this);
		this.addChoiceButton = this.addChoiceButton.bind(this);
	}


	componentWillMount() {
		this.setUpChoices();
	}

	componentWillReceiveProps() {
		this.setUpChoices();
	}

	setUpChoices() {
		var choices = Object.keys(this.props.question);
		choices.shift();
		this.setState({
			choices: choices,
			answer: sessionStorage.answer
		});
	}

	select(choice) {
		this.setState({answer: choice});
		sessionStorage.answer = choice;
		this.props.emit('answer', {
			question: this.props.question,
			choice: choice
		});
	}

	addChoiceButton(choice, i) {
		var buttonTypes = ['firstStyle', 'secondStyle', 'thirdStyle', 'fourthStyle', 'fifhtStyle'];
		return (
			<button key={i}
			        className={"col-xs-12 col-sm-6 btn " + buttonTypes[i]}
			        onClick={this.select.bind(null, choice)}>
				{this.props.question[choice]}
			</button>
		);

	}

	render() {
		return (
			<div id="currentQuestion">
				<h4 className="boldTitle">{this.props.question.q}</h4>
				<Display if={this.state.answer}>
					<h4>You answered: {this.props.question[this.state.answer]}</h4>
				</Display>
				<Display if={!this.state.answer}>
					<div className="row">
						{this.state.choices.map(this.addChoiceButton)}
					</div>
				</Display>
			</div>
		);
	}
}

module.exports = Ask;
