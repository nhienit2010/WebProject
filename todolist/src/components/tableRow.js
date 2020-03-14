import React from 'react'

class TableRow extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<tr>
              <td>{this.props.todo.id}</td>
              <td>{this.props.todo.todoName}</td>
              <td>{this.props.todo.status? <label onClick={this.props.funcChangeStatus.bind(this, this.props.todo.id, !this.props.todo.status)} className="label label-success">Active</label> : <label onClick={this.props.funcChangeStatus.bind(this, this.props.todo.id, !this.props.todo.status)} className="label label-danger">Hidden</label>}</td>
              <td>
              	<button className="btn btn-success" onClick={this.props.funcEdit.bind(this,this.props.todo.id)} >Edit</button>
              	<button className="btn btn-danger" onClick={this.props.funcDelete.bind(this,this.props.todo.id)}>Delete</button>
              </td>
            </tr>
		);
	}
}
export default TableRow;