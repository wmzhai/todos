import { Tasks } from '../api/tasks/tasks.js';

Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked(){
    Tasks.methods.setChecked.call({
      taskId: this.props.task._id,
      setChecked: !this.props.task.checked
    }, (err) => {
      err && alert(err.error);
    });
  },

  deleteThisTask(){
    Tasks.methods.remove.call({
      taskId: this.props.task._id
    }, (err) => {
      err && alert(err.error);
    });
  },

  togglePrivate(){
    Tasks.methods.setPrivate.call({
      taskId: this.props.task._id,
      setToPrivate: ! this.props.task.private
    }, (err) => {
      err && alert(err.error);
    });
  },

  render() {
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            {this.props.task.private ? "Private" : "Public"}
          </button>
        ):''}
        <span className="text"><strong>{this.props.task.username}</strong>:{this.props.task.text}</span>
      </li>
    );
  }
});