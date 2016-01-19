var React = require('react');
var Display = require('./Display');

/*var questionStyle = {
	'font-weight': 'bold'
};*/
var Ask = React.createClass({

	getInitialState() {
		return {
			choices: [],
			answer: undefined
		};
	},

	componentWillMount() {
		this.setUpChoices();
	},

	componentWillReceiveProps() {
		this.setUpChoices();
	},

	shouldComponentUpdate: function(nextProps, nextState){
		return this.props.question !== nextProps.value;
	},

	setUpChoices() {
		var choices = Object.keys(this.props.question);
		choices.shift();
		this.setState({
			choices: choices,
			answer: sessionStorage.answer
		});
	},

	select(choice) {
		this.setState({answer: choice});
		sessionStorage.answer = choice;
		this.props.emit('answer', {
			question: this.props.question,
			choice: choice
		});
	},

	addChoiceButton(choice, i) {
		var buttonTypes = ['primary', 'success', 'warning', 'danger'];
		return (
			<button key={i}
			        className={"col-xs-12 col-sm-6 btn btn-" + buttonTypes[i]}
			        onClick={this.select.bind(null, choice)}>
				{this.props.question[choice]}
			</button>
		);
	},


	render() {
		return (
			<div id="currentQuestion">
				<h4>{this.props.question.q}</h4>
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
});

module.exports = Ask;
