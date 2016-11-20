import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
  constructor () {
    super()
    this.state=({showInput:false})
  }
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  editThisTask(event) {
    event.preventDefault();
    Tasks.update(this.props.task._id, {
      $set: {text: this.state.editText}
    })
    this.setState({showInput:!this.state.showInput})
  }
  toggleInput() {
    this.setState({showInput:!this.state.showInput})
  }
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    const crossStyle = {
      opacity:0
    }
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          Delete
        </button>

        <button onClick={this.toggleInput.bind(this)}>Edit</button>
        {this.state.showInput

          ? <div><form onSubmit={(this.editThisTask.bind(this))}>
              <input onChange={(e)=>{this.state.editText = e.target.value}} type="text"/>
            </form>
            <br /></div>
          : <span></span>
         }
        {this.props.task.checked
          ?<button onClick={this.toggleChecked.bind(this)}>UnDone!</button>
          :<button onClick={this.toggleChecked.bind(this)}>Done!</button>
        }
        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}
