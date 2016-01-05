
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

