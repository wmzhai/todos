# Todos with React and FlowRouter

We will convert the 'simple-todos-react' project to a full version 'todos-react', step by step, following the [Meteor Guide](http://guide.meteor.com/) for 
the best practice.

1. Step1 : Abstract the todos-lib package to gather the common dependencies of all app packages.
2. Step2 : Abstract the todos-main package for the entry point of the app, which require all other packages.
3. Step3 : Abstract the todos-collection package for all schema, collection, publication and methods of the app.
  * 创建package
  * 分别移动代码,正常可以运行
  * 重构Collection,引入Class
  * 使用SimpleSchema做validation
  * 重构Methods
  * 加测试代码
