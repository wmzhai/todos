
if (Meteor.isClient) {
    // This code is executed on the client only
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

    Meteor.subscribe("tasks");

    Meteor.startup(function () {
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<App />, document.getElementById("render-target"));
    });
}


Meteor.methods({
    addTask(text){
        if( !Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }

        Tasks.insert({
            text: text,
            createdAt : new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },

    removeTask(taskId){
        const task = Tasks.findOne(taskId);
        if( task.private && task.owner !== Meteor.userId()){
            throw  new Meteor.Error("not-authorized");
        }

        Tasks.remove(taskId);
    },

    setChecked(taskId, setChecked){
        const task = Tasks.findOne(taskId);
        if( task.private && task.owner !== Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Tasks.update(taskId, {$set: {checked:setChecked}});
    },

    setPrivate(taskId, setToPrivate){
        const task = Tasks.findOne(taskId);

        if( task.owner !== Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(taskId,{$set : {private: setToPrivate}});
    }
});