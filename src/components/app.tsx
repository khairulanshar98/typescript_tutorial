import * as React from "react";
import { Provider } from 'mobx-react'
import { TodoStore } from '../store/todo.store'
import { TodoAdd } from './todo.add'
import { TodoList } from './todo.list'

interface AppProps { compiler: string; framework: string; store: string; }

//export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;

export class App extends React.Component<AppProps, {}> {
    private todoStore: TodoStore = new TodoStore()
    render() {
        return (
            <Provider todoStore={this.todoStore}>
                <div className="container">
                    <h1 className="title">Simple Task List with {this.props.compiler}, {this.props.framework} and {this.props.store} !</h1>
                    <div className="col-sm-4">
                        <TodoAdd />
                    </div>
                    <div className="col-sm-8">
                        <TodoList />
                    </div>
                </div>
            </Provider>
        );
    }
}