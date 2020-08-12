import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Button,
  Select,
  Icon,
  Grid,
  Message,
} from "semantic-ui-react";
import TaskList from "./TaskList";
import ModalTask from "./ModalTask";
import { deleteTodo, addTodo, getAll, editTodo } from "../actions/actions";

//used for test purpose only
let searchOptions = [
  { key: 1, value: "done", text: "Faites" },
  { key: 2, value: "done", text: "A faire" },
];

//for filtering todo
function filterTodo(todo, filter) {
  return todo.filter((todo) => todo.completed === filter);
}

//fonction utilisée pour redux etc... don't mind it mdr !
//Sache juste que c'est pour faire des appels serveurs
function mapDispatchToProps(dispatch) {
  return {
    addTodo: (todo) => {
      dispatch(addTodo(todo));
    },
    getAll() {
      dispatch(getAll());
    },
    editTodo(todo) {
      dispatch(editTodo(todo));
    },
    deleteTodo(todo) {
      dispatch(deleteTodo(todo));
    },
  };
}

function mapStateToProps(state) {
  return {
    todos: state.todo.todos,
    isRequesting: state.todo.todos,
  };
}

export class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      loading: false,
      todos: this.props.todos,
      err: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.addTodo = this.addTodo.bind(this);
  }

  handleButtonClick(val) {
    let data = val.split("_");
    let [target, action] = data;
    if (action === "drop") {
      this.props.deleteTodo(target);
    }
  }

  componentDidMount() {
    this.props.getAll();
    this.setState({ todos: this.props.todos });
  }

  addTodo(description) {
    let date = new Date();
    let task = {
      date:
        date.getDay() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      description: description,
      completed: false,
    };
    this.setState({ loading: true });
    this.props.addTodo(task);
    this.setState({ openModal: false, loading: false });
  }

  handleOpenModal() {
    this.setState({ openModal: true });
  }
  render() {
    const { todos } = this.props;
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment loading={this.state.loading} color="red">
              <Segment />
              <Segment>
                <TaskList
                  list={todos}
                  onClick={this.handleButtonClick}
                  size="medium"
                />
              </Segment>
              <Segment>
                <Button
                  icon
                  color="blue"
                  size="tiny"
                  onClick={this.handleOpenModal}>
                  <Icon name="add" />
                </Button>
              </Segment>
              <ModalTask open={this.state.openModal} addTodo={this.addTodo} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);

export default TaskContainer;
