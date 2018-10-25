import React from "react";
import { Provider } from "react-redux";
import TaskContainer from "./TaskContainer";
import store from "../store/store";

export const SERVER_URL = "http://localhost:8080/api";
const App = () => {
  return (
    <Provider store={store}>
      <TaskContainer />
    </Provider>
  );
};
export default App;
