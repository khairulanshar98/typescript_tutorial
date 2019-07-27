import * as React from "react";
import { Provider } from 'mobx-react'
import { TodoStore } from '../store/todo.store'
import { TodoAdd } from './todo.add'
import { TodoList } from './todo.list'
interface AppProps { compiler: string; framework: string; store: string; }
export class App extends React.Component<AppProps, {}> {
    private todoStore: TodoStore = new TodoStore()
    render() {
        return (
            <Provider todoStore={this.todoStore}>
                <div className="container">
                    <h1 className="title">Simple Task List with {this.props.compiler}, {this.props.framework} and {this.props.store}! <a className="btn btn-primary" target="_blank" href="https://github.com/khairulanshar98/typescript_tutorial">source</a></h1>
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