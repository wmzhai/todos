Package.describe({
  name: 'todos-test-lib',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Common dependencies of all app tests',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.imply([
    'todos-lib',
    'practicalmeteor:mocha@2.1.0_5',
    'practicalmeteor:chai@2.1.0_1',
    'publication-collector',
    'factory',
    'stub-collections',
    'ddp',
  ]);
});
