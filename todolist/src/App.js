import React from 'react';
import './App.css';
import Form from './components/form'
import Table from './components/table'
import Sort from './components/sort'
import Search from './components/search'
import Filter from './components/filter'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      isClosingForm: true,
      sortByAlphabet: true
    }
  }
  makeid = (length) => {
     var result           = '';
     var characters       = '0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }
  componentWillMount = () => {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({todoList: tasks});
    }
  }
  displayForm = () => {
    this.setState({ isClosingForm: !this.state.isClosingForm})
  }
  receiveDataFromForm = (data) => {
    let todo = JSON.parse(data);
    this.state.todoList.push(todo);
    localStorage.setItem('tasks', JSON.stringify(this.state.todoList));
    this.setState({todoList: this.state.todoList});
  }
  sort = () => {
    if (this.state.sortByAlphabet) 
      this.setState({todoList: this.state.todoList.sort((a, b)=> {
        if (a.todoName.toUpperCase() < b.todoName.toUpperCase())
          return -1;
        else if (a.todoName.toUpperCase() > b.todoName.toUpperCase())
          return 1;
        else
          return 0;
    })});
    else
      this.setState({todoList: this.state.todoList.reverse()});
      
    this.setState({sortByAlphabet: !this.state.sortByAlphabet});    
  }
  deleteTodo = (id) => {
    this.state.todoList.forEach((todo, index) => {
      if (todo.id === id)
        this.state.todoList.splice(index, 1);
      this.setState({todoList: this.state.todoList});
      localStorage.setItem('tasks', JSON.stringify(this.state.todoList));
    });
  }
  editTodo = (id) => {
    let indexOfTodo;

    this.state.todoList.forEach((todo, index) => {
      if (todo.id === id )
        indexOfTodo = index;
    })

    this.setState({isClosingForm: false});
    document.querySelector('#input').value = this.state.todoList[indexOfTodo].todoName;
    document.querySelector('#input').onblur = ()=> {
      this.state.todoList[indexOfTodo].todoName = document.querySelector('#input').value;
      localStorage.setItem('tasks', JSON.stringify(this.state.todoList));
      this.setState({todoList: this.state.todoList});
    }
  }
  changeStatus = (id, status) => {
    this.state.todoList.forEach((todo, index) => {
      if (todo.id === id) 
        todo.status = status
    })
    this.setState({todoList: this.state.todoList})
  }
  searchName = (event) => {
    let txt = event.target.value.trim();
    let original = JSON.parse(localStorage.getItem('tasks'));
    let res = [];
    if (txt.length === 0) {
      this.setState({todoList: original});
      return;
    }
    original.forEach((todo, index) => {
        if (todo.todoName.indexOf(txt) >= 0)
            res.push(todo)
      })
    this.setState({todoList: res});
  }
  filterByStatus = (val) => {
    let original = JSON.parse(localStorage.getItem('tasks'));
    let res = [];
    
    if (val === 'none') {
      this.setState({todoList: original});
      return;
    }

    original.forEach((todo, index) => {
        if (todo.status === val)
            res.push(todo)
      })
    this.setState({todoList: res});
  }
  render() {
  return (
    <div className="App">
      <div className="jumbotron container text-center bg-dark text-white">
        <h1>Make Your To Do List </h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <Form func={this.receiveDataFromForm} makeid={this.makeid} isClosingForm = { this.state.isClosingForm }/>
          <div className="col-8 sideRight">
            <button onClick={this.displayForm} className="btn btn-primary mr-5">{this.state.isClosingForm? 'Add a new todo' : 'Close From'}</button>
            <Search func={this.searchName}/>
            <Sort sort={this.sort}/>
            <Filter func={this.filterByStatus} />
            <Table funcChangeStatus={this.changeStatus} funcEdit={this.editTodo} funcDelete={this.deleteTodo} todoList={this.state.todoList} />
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
