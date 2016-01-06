var React = require('react');
var Display = require('./parts/Display');
var BarChart = require('react-d3').BarChart;
var colors = d3.scale.category10();

var Board = React.createClass({

	barGraphData(results) {
		return Object.keys(results).map(function(choice) {
			return {
				label: choice,
				value: results[choice]
			};
		});
	},

	render() {
		return (
			<div id="scoreboard">

				<Display if={this.props.status === 'connected' && this.props.currentQuestion}>
					<h2>{this.props.results.length} audience members have voted.</h2>
					<BarChart data={this.barGraphData(this.props.results)}
							  title={this.props.currentQuestion.q}
							  height={window.innerHeight * 0.6}
							  width={window.innerWidth * 0.9}
								fill={red}
								/>
				</Display>

				<Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
					<h3>Awaiting a Question...</h3>
				</Display>

			</div>
		);
	}
});

module.exports = Board;
