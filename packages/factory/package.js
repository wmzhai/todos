Package.describe({
  name: 'factory',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Factories for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'underscore',
    'minimongo',
    'random',
    'ecmascript'
  ]);

  api.imply([
    'dfischer:faker',
    'random'
  ]);

  api.addFiles([
    'factory.js',
    'dataset.js',
    'factory-api.js'
  ]);

  api.export('Factory');
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest',
    'factory',
    'underscore'
  ]);

  api.addFiles('factory-tests.js','server');
});
