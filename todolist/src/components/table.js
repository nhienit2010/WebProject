import React, {Component} from 'react'
import TableRow from './tableRow'

class Table extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let row = this.props.todoList.map((todo, index) => {
			return <TableRow funcChangeStatus={this.props.funcChangeStatus} funcEdit={this.props.funcEdit} funcDelete={this.props.funcDelete} key={index} todo={todo} />
		});
		return (
		<table className="table table-hover">
          <thead className="bg-primary text-white">
            <tr>
              <td>ID</td>
              <td>To Do List</td>
              <td>Status</td>
              <td>
              	Action
              </td>
            </tr>
          </thead>
          <tbody>
          { row }
          </tbody>
        </table>
		);
	}
}

export default Table;