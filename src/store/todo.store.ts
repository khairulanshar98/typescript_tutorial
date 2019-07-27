import { observable, action, reaction, computed } from 'mobx'
const uuidv4 = require('uuid/v4');

export interface Todo {
  id: string
  task: string
  description: string
  isComplete: boolean
  createdAt: number
  completedAt: number
}

export class TodoStore {
  @observable todoList: Todo[] = []

  constructor() {
    reaction(
      () => this.todoList.filter((todo) => !todo.isComplete),
      (incompletedTasks) => {
        if (incompletedTasks.length > 5) {
          alert("Dude. You've got too much on your plate.")
        }
      }
    )
  }

  @action
  filter(task: string): Todo[] {
    return this.todoList.filter((todo) => todo.task.toLowerCase().indexOf(task.toLowerCase()) >= 0 || todo.description.toLowerCase().indexOf(task.toLowerCase()) >= 0)
  }

  @action
  addTodo(task: string, description: string) {
    this.todoList.push({ task, isComplete: false, id: uuidv4(), description: description, createdAt: new Date().getTime(), completedAt: null })
  }

  @action
  completeTodo(completedTodo: Todo) {
    this.todoList.find((todo) => todo.id === completedTodo.id).isComplete = true;
    this.todoList.find((todo) => todo.id === completedTodo.id).completedAt = new Date().getTime();
  }

  @computed
  get allList(): Todo[] {
    return this.todoList
  }
}

export const todoStore = new TodoStore()