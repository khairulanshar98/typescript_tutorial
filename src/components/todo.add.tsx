import * as React from "react";
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { TodoStore } from '../store/todo.store'
import { Form, Button } from 'react-bootstrap';

interface TodoAddProps {
    todoStore?: TodoStore
}

@inject('todoStore')
@observer
export class TodoAdd extends React.Component<TodoAddProps> {
    @observable private task: string = ''
    @observable private description: string = ''

    handleTaskChange = (event) => {
        this.task = event.target.value
    }

    handleDescriptionChange = (event) => {
        this.description = event.target.value
    }

    handleAddTodo = () => {
        if (!this.task || !this.description) return alert("Please provide task name and description!")
        this.props.todoStore.addTodo(this.task, this.description)
        this.task = ''
        this.description = ''
    }

    render() {
        return (
            <div style={{ marginBottom: "30px" }}>
                <Form>
                    <Form.Group controlId="NewTask">
                        <Form.Label>New Task</Form.Label>
                        <Form.Control type="text" value={this.task} placeholder="Name" onChange={this.handleTaskChange} />
                    </Form.Group>
                    <Form.Group controlId="NewTask">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={this.description} placeholder="Description" rows="3" onChange={this.handleDescriptionChange} />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={this.handleAddTodo}>Add</Button>
            </div>
        )
    }
}