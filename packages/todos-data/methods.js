Tasks.methods = {};

Tasks.methods.insert = new ValidatedMethod({
  name: 'Tasks.methods.insert',
  validate: new SimpleSchema({
    text: {type: String}
  }).validator(),
  run({text}) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('Tasks.methods.insert.unauthorized',
        'Cannot add tasks that is not yours');
    }

    Tasks.insert({
      text: text,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});

Tasks.methods.remove = new ValidatedMethod({
  name: 'Tasks.methods.remove',
  validate: new SimpleSchema({
    taskId: {type: String}
  }).validator(),
  run({taskId}) {
    const task = Tasks.findOne(taskId);

    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('Tasks.methods.remove.unauthorized',
        'cant remove tasks not belonging to user');
    }

    Tasks.remove(taskId);
  }
});

Tasks.methods.setChecked = new ValidatedMethod({
  name: 'Task.methods.setChecked',
  validate: new SimpleSchema({
    taskId: {type: String},
    setChecked: {type: Boolean}
  }).validator(),
  run({taskId, setChecked}) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      throw new Error('Tasks.methods.setChecked.unauthorized',
        'cant modify task not belonging to user');
    }

    Tasks.update(taskId, {$set: {checked: setChecked}});
  }
});

Tasks.methods.setPrivate = new ValidatedMethod({
  name: 'Tasks.methods.setPrivate',
  validate: new SimpleSchema({
    taskId: {type: String},
    setToPrivate: {type: Boolean}
  }).validator(),
  run({taskId, setToPrivate}) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('Tasks.methods.setPrivate.unauthorized',
        'cant modify task not belonging to the user');
    }

    Tasks.update(taskId, {$set: {private: setToPrivate}});
  }
});
