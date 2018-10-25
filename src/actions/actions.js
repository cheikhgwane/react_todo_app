import axios from "axios";
import { SERVER_URL } from "../components/App";
import { dispatch } from "rxjs/internal/observable/pairs";
/**
 * actions
 */

export const ADD_TODO = "ADD_TODO";

export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";

export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const IS_REQUESTING = "IS_REQUESTING";

export const GET_ALL_TODO = "GET_ALL_TODO";

export const GET_ALL_TODO_SUCCESS = "GET_ALL_TODO_SUCCESS";

export const GET_ALL_TODO_FAILURE = " GET_ALL_TODO_FAILURE";

export const EDIT = "EDIT";

export const EDIT_SUCCESS = "EDIT_SUCCESS";

export const EDIT_FAILURE = "EDIT_FAILURE";

export const DELETE_SUCCESS = "DELETE_SUCCESS";

export const DELETE_FAILURE = "DELETE_FAILURE";

/**
 * actions creator
 */

export function editTodo(idTodo, value) {
  return dispatch => {
    dispatch(isRequesting(true));
    axios
      .put(SERVER_URL + `/+${idTodo}`, value)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deleteTodo(id) {
  return dispatch => {
    dispatch(isRequesting(true));
    axios
      .delete(SERVER_URL + `/${id}`)
      .then(response => {
        console.log(response);
        dispatch(deleteSuccess(id));
      })
      .catch(err => {
        dispatch(deleteErr(err));
      });
  };
}

export function deleteSuccess(id) {
  return {
    type: DELETE_SUCCESS,
    id
  };
}

export function deleteErr(err) {
  return {
    type: DELETE_FAILURE,
    err
  };
}
export function editFailure() {
  return {
    type: EDIT_FAILURE
  };
}
export function editSuccess() {
  return {
    type: EDIT_SUCCESS
  };
}
export function addTodo(todo) {
  return dispatch => {
    dispatch(isRequesting(true));
    axios
      .post(SERVER_URL + "/addTodo", todo)
      .then(response => {
        dispatch(addTodoSuccess(todo));
        dispatch(getAll());
      })
      .catch(err => {
        dispatch(addTodoFailure(err));
      });
  };
}

export function getAll() {
  return dispatch => {
    dispatch(isRequesting(true));
    axios
      .get(SERVER_URL + "/getAll")
      .then(res => {
        dispatch(getTodoSuccess(res.data));
      })
      .catch(err => {
        dispatch(getTodoFailure(err));
      });
  };
}
export function isRequesting(bool) {
  return {
    type: IS_REQUESTING,
    bool
  };
}
export function addTodoSuccess(todo) {
  return {
    type: ADD_TODO_SUCCESS,
    todo
  };
}
export function addTodoFailure(err) {
  return {
    type: ADD_TODO_FAILURE,
    err
  };
}

export function getTodoFailure(err) {
  return {
    type: GET_ALL_TODO_FAILURE,
    err
  };
}

export function getTodoSuccess(todo) {
  return {
    type: GET_ALL_TODO_SUCCESS,
    todo: todo
  };
}
