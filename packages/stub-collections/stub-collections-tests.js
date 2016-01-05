const StubCollections = Package['stub-collections'] && Package['stub-collections'].StubCollections;

const Items = new Mongo.Collection('Items');

// Uggh, these kind of shenagigans are exactly why we need stub collections
if (Meteor.isServer) {
  Items.remove({});
  Items.insert({});
  Meteor.publish('items', () => { return Items.find(); });
} else {
  Meteor.subscribe('items');
}

Tinytest.add('StubCollection - basics', (test) => {
  test.equal(Items.find().count(), 1);

  StubCollections.stub(Items);

  test.equal(Items.find().count(), 0);
  Items.insert({});
  Items.insert({});
  test.equal(Items.find().count(), 2);

  StubCollections.restore();

  test.equal(Items.find().count(), 1);
});
