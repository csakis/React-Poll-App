var React = require('react');

var Questions = React.createClass({

	ask(question) {
		this.props.emit('ask', question);
	},

	addQuestion(question, i) {
		return (
			<div key={i} className="col-xs-12 col-sm-6 col-md-3">
				<span onClick={this.ask.bind(null, question)}>{question.q}</span>
			</div>
		);
	},

	render() {
		return (
			<div id="questions" className="row">
				<h4 style="font-weight: 600">Questions</h4>
				<p></p>
				{this.props.questions.map(this.addQuestion)}
			</div>
		);
	}
});

module.exports = Questions;
