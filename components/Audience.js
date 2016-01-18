var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Ask = require('./parts/Ask');
var Audience = React.createClass({
	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>
					<Display if={this.props.member.name}>
						<Display if={!this.props.currentQuestion}>
							<h3>Welcome {this.props.member.name}</h3>
							<p>Questions will appear here.</p>
						</Display>
						<Display if={this.props.currentQuestion}>
							<Ask question={this.props.currentQuestion} emit={this.props.emit} />
						</Display>
					</Display>
					<Display if={!this.props.member.name}>
						<h3>Please join the survey</h3>
					    <Join emit={this.props.emit} />
					</Display>
				</Display>
			</div>
		);
	}
});

module.exports = Audience;
