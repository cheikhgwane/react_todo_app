import { combineReducers } from "redux";
import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  IS_REQUESTING,
  GET_ALL_TODO,
  GET_ALL_TODO_SUCCESS,
  DELETE_SUCCESS,
  DELETE
} from "../actions/actions";
import { Object } from "es6-shim";

export const initialState = {
  todos: [],
  isRequesting: false,
  err: ""
};

function todo(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return Object.assign({}, state, { isRequesting: true });
    }
    case ADD_TODO_SUCCESS: {
      return Object.assign({}, state, {
        isRequesting: false,
        todos: state.todos.concat(action.todo)
      });
    }
    case ADD_TODO_FAILURE: {
      return Object.assign({}, state, {
        isRequesting: false,
        err: action.err
      });
    }
    case GET_ALL_TODO: {
      return Object.assign({}, state, { isRequesting: true });
    }
    case GET_ALL_TODO_SUCCESS: {
      return Object.assign({}, state, {
        todos: action.todo,
        isRequesting: false
      });
    }

    case DELETE_SUCCESS: {
      return Object.assign({}, state, {
        isRequesting: false,
        todos: state.todos.filter(todo => todo._id != action.id)
      });
    }
    default:
      return state;
  }
}

const todoApp = combineReducers({ todo });

export default todoApp;
