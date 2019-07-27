import * as React from "react";
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { Row, Form } from 'react-bootstrap';
import { TodoStore, Todo } from '../store/todo.store'
import { TodoListItem } from './todo.list.item'

interface TodoListProps {
    todoStore?: TodoStore
}

@inject('todoStore')
@observer
export class TodoList extends React.Component<TodoListProps> {
    @observable private todoList: Todo[] = this.props.todoStore.allList;
    @observable private filter: string = '';
    handleChange = (event) => {
        this.filter = event.target.value
        if (!this.filter) return this.todoList = this.props.todoStore.allList;
        this.todoList = this.props.todoStore.filter(this.filter);
    }
    render() {
        return (
            <div>
                {(this.todoList.length > 1 || this.filter) &&
                    <Row style={{ padding: "20px" }}>
                        <Form.Row>
                            <Form.Group controlId="filter">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    name="filter"
                                    value={this.filter}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Row>}
                {this.todoList.map((todo, idx) => <TodoListItem key={idx} todo={todo} />)}
            </div>
        )
    }
}