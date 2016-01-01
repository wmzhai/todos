
Package.describe({
    name: 'todos-data',
    version: '0.0.1',
    summary: 'Collections, schemas, publications and methods for the todos app'
});

Package.onUse(function(api){
    api.use('todos-lib');

    api.addFiles([
        'tasks.jsx',
        'methods.jsx'
    ]);


    api.addFiles([
        'publications.jsx'
    ],'server');

    api.export('Tasks');

});

Package.onTest(function(api){

});