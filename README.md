# Todos with React and FlowRouter

We will convert the 'simple-todos-react' project to a full version 'todos-react', step by step, following the [Meteor Guide](http://guide.meteor.com/) for 
the best practice.

1. 使用todos-lib引用所有公用依赖的第三方库,替代原有的meteor add功能.
2. 使用todos-main库作为程序的入口.
3. 使用todos-data来抽象来封装项目的collection, schema, publication 和 methods.
  * 创建package
  * 分别移动代码,正常可以运行
  * 重构Collection,引入Class
  * 使用SimpleSchema做validation
  * 重构Methods
4. 添加测试代码
5. 添加CI集成
6. 使用[eslint](http://csspod.com/getting-started-with-eslint/)做代码风格检测
