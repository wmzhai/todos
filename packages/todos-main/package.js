
Package.describe({
    name: 'todos-main',
    version: '0.0.1',
    summary: 'Entry point for the Todos app'
});


Package.onUse(function(api){
    api.use('todos-lib');

    api.use('todos-collection');

    api.addFiles([
        'App.jsx',
        'todos.css',
        'todos.html',
        'Task.jsx',
        'AccountsUIWrapper.jsx'
    ],'client');

    api.addFiles([
        'todos.jsx'
    ]);


});