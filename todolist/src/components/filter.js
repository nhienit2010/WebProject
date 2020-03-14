import React, { Component } from 'react'

class Filter extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<select className="btn btn-primary">
				<option onClick={this.props.func.bind(this, 'none')}>Default</option>
				<option onClick={this.props.func.bind(this, true)}>Active</option>
				<option onClick={this.props.func.bind(this, false)}>Hidden</option>
			</select>
		);
	}
}
export default Filter;