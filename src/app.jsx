import React from 'react';
import { renderRoutes } from 'react-router-config';
import TodoFooter from './footer';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
      todos: props.todos,
    };
  }

  toggleAll(event) {
    const { checked } = event.target;
    this.setState({
      todos: this.state.todos.map(todo => Object.assign({}, todo, { completed: checked })),
    });
  }

  toggle(todoToToggle) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo === todoToToggle) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      }),
    });
  }

  destroy(passedTodo) {
    this.setState({
      todos: this.state.todos.filter(todo => todo !== passedTodo),
    });
  }

  edit(todo) {
    this.setState({ editing: todo.id });
  }

  save(todoToSave, text) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo === todoToSave) {
          return Object.assign({}, todo, {
            title: text,
          });
        }
        return todo;
      }),
      editing: null,
    });
  }

  cancel() {
    this.setState({ editing: null });
  }

  clearCompleted() {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed),
    });
  }

  render() {
    let footer;
    let main;
    const { todos } = this.state;

    const activeTodoCount = todos.reduce((accum, todo) => (todo.completed ? accum : accum + 1), 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        (<TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.props.location.pathname}
          onClearCompleted={() => { this.clearCompleted(); }}
        />);
    }

    if (todos.length) {
      main = (
        <section className="main">
          <ul className="todo-list">
            {
              renderRoutes(this.props.route.routes, {
                todos,
                onToggle: (todo) => { this.toggle(todo); },
                onDestroy: (todo) => { this.destroy(todo); },
                onEdit: (todo) => { this.edit(todo); },
                editing: todo => this.state.editing === todo.id,
                onSave: (todo, text) => { this.save(todo, text); },
                onCancel: () => this.cancel(),
              })
            }
          </ul>
        </section>
      );
    }

    return (
      <div>
        {footer}
        {main}
      </div>
    );
  }
}

export default TodoApp;
