import React, { Component } from 'react'

class Sort extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
            <button onClick={this.props.sort} className="btn btn-primary mr-5">Sort</button>
		);
	}
}
export default Sort;