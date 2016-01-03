Package.describe({
  name: 'stub-collections',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Stub out all collections with temporary local collections',

  debugOnly:true,

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'

});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'mongo',
    'practicalmeteor:sinon@1.14.1_2',
    'underscore'
  ]);
  api.addFiles('stub-collections.js');
  api.export('StubCollections');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('stub-collections');
  api.use('mongo');
  api.addFiles('stub-collections-tests.js');
});
