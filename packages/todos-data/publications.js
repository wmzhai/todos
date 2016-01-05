
Meteor.publish('tasks', () => {
  return Tasks.find({
    $or: [
      {private: {$ne: true}},
      {owner: this.userId}]
  }, {
    fields: Tasks.publicFields
  });
});
