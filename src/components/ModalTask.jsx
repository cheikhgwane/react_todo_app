import React, { Component } from "react";
import { Modal, Button, Icon, Form, Message } from "semantic-ui-react";

const { Header, Content, Actions } = Modal;
const { Field, Input } = Form;

export default class ModalTask extends Component {
  state = { error: false, open: false, description: null };

  handleChange({ target }) {
    this.setState({ description: target.value });
  }
  handleClick() {
    const { description } = this.state;

    if (description != null) {
      this.setState({ error: false });
      this.props.addTodo(description);
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <Modal open={this.props.open}>
        <Header>Ajout tâche</Header>
        <Content>
          <Form error={this.state.error}>
            <Field>
              <Input
                onChange={this.handleChange.bind(this)}
                label="Description tâche"
                placeholder="description"
              />
            </Field>
            <Message
              error
              header="Erreur de saisie"
              content="La description ne peut-être vide"
            />
          </Form>
        </Content>
        <Actions>
          <Button
            icon
            color="green"
            size="tiny"
            onClick={this.handleClick.bind(this)}
          >
            <Icon name="checkmark" />
          </Button>
        </Actions>
      </Modal>
    );
  }
}
