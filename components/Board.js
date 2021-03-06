var React = require('react');
var Display = require('./parts/Display');
var d3 = require('d3');
var BarChart = require('react-d3-components').BarChart;
var Board = React.createClass({
	barGraphData(results) {
		var dataset = Object.keys(results).map(function(choice) {
			return {
				x: choice,
				y: results[choice]
			};
		});
		return {label: "Survey",
						values:dataset};
	},
	render() {
		return (
			<div id="scoreboard">
				<Display if={this.props.status === 'connected' && this.props.currentQuestion}>
					<h3 className="boldTitle">{this.props.currentQuestion.q}</h3>
					<BarChart data={this.barGraphData(this.props.results)}
								colorByLabel={false}
								colorScale={d3.scale.category10()}
							  title={this.props.currentQuestion.q}
							  height={window.innerHeight * 0.6}
							  width={window.innerWidth * 0.8}
								margin={{top: 25, bottom: 50, left: 50, right: 10}}
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
