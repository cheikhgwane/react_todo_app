import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, List, Icon } from "semantic-ui-react";
import _ from "lodash";
const { Item, Content, Header } = List;

export default class TaskList extends Component {
  handleClick({ target }) {
    const { name } = target;
    if (name === undefined) return;
    this.props.onClick(name);
  }
  render() {
    let { list } = this.props;
    console.log(list);
    if (list === undefined) return <div />;

    return (
      <List size={this.props.size} animated divided>
        {list.map((task, ind) => (
          <Item key={ind}>
            <Content>
              <Header>{task.description}</Header>
              {task.date}
            </Content>
            <Content floated="right">
              <div>
                <Button
                  onClick={this.handleClick.bind(this)}
                  circular
                  size="mini"
                  name={task._id + "_drop"}
                  color="red"
                  icon
                >
                  <Icon name="trash" />
                </Button>
              </div>
            </Content>
          </Item>
        ))}
      </List>
    );
  }
}

TaskList.propTypes = {
  size: PropTypes.string,
  list: PropTypes.array.isRequired
};
