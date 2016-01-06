var React = require('react');
var Link = require('react-router').Link;

var Join = React.createClass({

	join() {
		var memberName = React.findDOMNode(this.refs.name).value;
		this.props.emit('join', { name: memberName });
	},

	render() {
		return (
			<form  action="javascript:void(0)" onSubmit={this.join}>
				<div className="form-group">
						<label className="h4">Name</label>
				<input ref="name" id="Name" type="text"
					   className="form-control"
				       placeholder="Please enter your name"
				       required />
				<button className="btn btn-primary ">Enter survey</button>
				</div>
		{/*		 <Link to="/speaker">Start the presentation</Link>
				// <Link to="/board">Go to the board</Link> */}
			</form>
		);
	}

});

module.exports = Join;
