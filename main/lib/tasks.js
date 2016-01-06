
class TasksCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = doc.createdAt || new Date();
    const result = super(doc, callback);
    return result;
  }
}

 Tasks = new TasksCollection('tasks');

// Deny all client-side updates since we will be using methods to manage this collection
Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Tasks.schema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    optional: true
  },
  text: {
    type: String,
    max: 100,
    min: 1
  },
  username: {
    type: String,
    max: 100,
    optional: true
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    optional: true
  },
  checked: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  private: {
    type: Boolean,
    defaultValue: false,
    optional: true
  }
});


Tasks.attachSchema(Tasks.schema);


// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Tasks.publicFields = {
  owner: 1,
  text: 1,
  username: 1,
  createdAt: 1,
  checked: 1,
  private: 1
};


Factory.define('task', Tasks, {
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date()
});

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
