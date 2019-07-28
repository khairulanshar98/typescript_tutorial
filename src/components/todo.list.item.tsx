import * as React from "react";
import { Alert, Button } from 'react-bootstrap';
import { observable } from 'mobx';
import { Todo, TodoStore } from '../store/todo.store';
import { observer, inject } from 'mobx-react'

interface TodoListItemProps {
    todo: Todo
    todoStore?: TodoStore
}

@inject('todoStore')
@observer
export class TodoListItem extends React.Component<TodoListItemProps> {
    @observable private show_: boolean = true;


    formatDate = (date) => {
        var MMMM = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (
            date.getDate() +
            ' ' +
            MMMM[date.getMonth()] +
            ' ' +
            date.getFullYear() +
            '  ' +
            strTime
        );
    }





    handleComplete = () => {
        this.props.todoStore.completeTodo(this.props.todo)
    }
    handleClose = () => {
        if (!this.props.todo.isComplete && confirm(`${this.props.todo.task} is not completed.\n Do you want to delete?`))
            this.show_ = false;
        if (this.props.todo.isComplete) this.show_ = false;
    }

    render() {
        return (
            <Alert show={this.show_} onClose={() => this.handleClose()} variant={"info"} dismissible>
                <Alert.Heading>Task: {this.props.todo.task}</Alert.Heading>
                <div>
                    Description: {this.props.todo.description.split("\n").map((text, idx) => <p key={idx}>{text}</p>)}
                </div>
                <p>
                    Status: <span style={{ fontSize: '14px', color: this.props.todo.isComplete ? 'green' : 'red' }} className={'glyphicon glyphicon-' + (this.props.todo.isComplete ? 'ok-sign' : 'remove-sign')}></span>
                </p>
                <p>
                    Created At: {this.formatDate(this.props.todo.createdAt)}
                </p>
                {this.props.todo.isComplete && <p>
                    Completed At: {this.formatDate(this.props.todo.completedAt)}
                </p>}
                <div className="d-flex justify-content-end" style={{ marginTop: "15px" }}>
                    {!this.props.todo.isComplete &&
                        <Button onClick={() => this.handleComplete()} variant="outline-success">
                            Complete me ya'll!
                    </Button>
                    }
                </div>
            </Alert>
        )
    }
}