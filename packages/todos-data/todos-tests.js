
const assert = chai.assert;

describe('tasks', () => {
  describe('mutators', () => {
    it('builds correctly from factory', () =>{
      const task = Factory.create('task');
      console.log(task.text);
      assert.typeOf(task, 'object');
      assert.typeOf(task.createdAt, 'date');
    })
  });
});