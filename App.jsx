// App component - represents the whole app
App = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState(){
        return{
            hideCompleted: false
        }
    },

    getMeteorData(){
        return {
            tasks : Tasks.find({},{sort : {createdAt:-1}}).fetch()
        }
    },

    renderTasks() {
        return this.data.tasks.map((task) => {
            return <Task key={task._id} task={task} />;
        });
    },

    handleSubmit(event){
        event.preventDefault();
        var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text : text,
            createdAt : new Date()
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = "";
    },

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readonly={true}
                            checked={this.state.hideCompleted}
                            onclick={this.toggleHideCompleted}/>
                        Hide Completed Tasks
                    </label>

                    <form className="new-task" onSubmit={this.handleSubmit} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks" />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});