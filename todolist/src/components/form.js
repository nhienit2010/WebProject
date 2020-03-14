import React from 'react'

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			todoName: '',
			status: true
		}
	}
	setTodoName = (event) => {
		this.setState({todoName: event.target.value});
	}
	setStatus = (val) => {
		this.setState({status: val})
	}
	sendDataToApp = (event) => {
		event.preventDefault();
		if (this.state.todoName.trim().length === 0) {
			alert('You must type some text in here!');
			return;
		}
		let data = JSON.stringify(this.state);
		this.props.func(data);
	}
	reset = () => {
		this.refs.todoName.value = '';
		this.state.todoName = '';
	}
	render() {
		setInterval(()=>{
			let id = this.props.makeid(7);
			this.setState({id: id});
		},1000);
		return (
		<div style={this.props.isClosingForm? {display: 'none'} : {display: 'block'}} className={"col-4 sideLeft"}>
           <form className="form" action="#" id="form">
               <div className="form-group">
                 <label>To do</label>
                 <input id="input" ref="todoName" onChange={this.setTodoName} className="form-control" />
               </div>
               <div className="form-group">
                 <label>Status</label>
                 <select className="form-control">
                   <option onClick={this.setStatus.bind(this,true)}>Active</option>
                   <option onClick={this.setStatus.bind(this,false)}>Hidden</option>
                 </select>
               </div>
               <button onClick={this.sendDataToApp} className="btn btn-success mr-5">Submit</button>
               <button onClick={this.reset} className="btn btn-danger">Cancel</button>
           </form>
        </div>
		);
	}
}

export default Form;