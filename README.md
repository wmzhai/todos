[![Circle CI](https://circleci.com/gh/wmzhai/todos.svg?style=svg)](https://circleci.com/gh/wmzhai/todos)

# Todos

通过一些中介项目来完成Meteor＋React开发的最佳实践。参考了[Meteor Guide](http://guide.meteor.com/)和其对应的[todos](https://github.com/meteor/todos)项目。

## Steps

1. 使用todos-lib引用所有公用依赖的第三方库,替代原有的meteor add功能.
2. 使用todos-main库作为程序的入口.
3. 使用todos-data来抽象来封装项目的collection, schema, publication 和 methods.
  * 创建package
  * 分别移动代码,正常可以运行
  * 重构Collection,引入Class
  * 使用SimpleSchema做validation
  * 重构Methods
5. 完善todos-lib测试代码
  * 添加factory, stub-collections, publication-collector库
  * 使用[Mocha](http://mochajs.org/) 和 [Chai](http://chaijs.com/) 编写测试，用到[practicalmeteor:mocha](https://atmospherejs.com/practicalmeteor/mocha)
6. [CircleCI](https://circleci.com)
7. [GitlabCI]()
8. 使用[eslint](http://csspod.com/getting-started-with-eslint/)做代码风格检测
9. 升级到Meteor1.3，并相应重构代码结构
10. FlowRouter和login,logout
