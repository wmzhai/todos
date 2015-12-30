
Package.describe({
    name: 'todos-main',
    version: '0.0.1',
    summary: 'Entry point for the Todos app'
});


Package.onUse(function(api){
    api.use('todos-lib');

    api.addFiles([
        'App.jsx',
        'simple-todos-react.css',
        'simple-todos-react.html',
        'Task.jsx',
        'AccountsUIWrapper.jsx'
    ],'client');

    api.addFiles([
        'simple-todos-react.jsx'
    ]);


});