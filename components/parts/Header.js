import React from 'react'

class Header extends React.Component {
	render() {
		return (
			<header className="row">
				<div className="col-xs-10">
					<h2>{this.props.title}</h2>
				</div>
				<div className="col-xs-2">
					<span id="connection-status" className={this.props.status + " pull-right"}></span>
				</div>
				<div className="col-xs-6">
					<h3>by <span className="semiBoldTitle">{this.props.speaker}</span></h3>
				</div>
				<div className="col-xs-6">
					<h4 className="pull-right">{this.props.audience.length} audience members connected</h4>
				</div>

			</header>
		);
	}
}

Header.propTypes = {
	title: React.PropTypes.string.isRequired
};

Header.defaultProps = {
	status: 'disconnected'
};

module.exports = Header;
