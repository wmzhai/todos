import { Tasks } from '../tasks.js';

Meteor.publish('tasks', function() {
  return Tasks.find({
    $or: [
      {private: {$ne: true}},
      {owner: this.userId}]
  }, {
    fields: Tasks.publicFields
  });
});

