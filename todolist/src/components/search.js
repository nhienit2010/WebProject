import React, { Component } from 'react'

class Search extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<input onKeyUp={this.props.func.bind(this)} className="form-control" placeholder="Type to search..."/>
		);
	}
}
export default Search;