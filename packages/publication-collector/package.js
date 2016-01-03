Package.describe({
  name: 'publication-collector',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Test a publication by collecting its output',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'underscore', 'check']);
  api.addFiles('publication-collector.js', 'server');
  api.export('PublicationCollector', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('publication-collector');
  api.addFiles('publication-collector-tests.js');
});
