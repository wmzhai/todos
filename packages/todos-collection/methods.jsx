


Meteor.methods({
    addTask(text){
        if( !Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }

        Tasks.insert({
            text: text,
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