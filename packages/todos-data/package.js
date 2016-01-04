
Package.describe({
  name: 'todos-data',
  version: '0.0.1',
  summary: 'Collections, schemas, publications and methods for the todos app',
  documentation: 'README.md'
});

Package.onUse(function(api){
  api.use('todos-lib');

  api.addFiles([
    'tasks.js',
    'methods.js'
  ]);


  api.addFiles([
    'publications.js'
  ],'server');

  api.export('Tasks');

});


Package.onTest(function (api) {
  api.use([
    'todos-test-lib',
    'todos-data'
  ]);

  api.addFiles('todos-tests.jsx', 'server');
});
