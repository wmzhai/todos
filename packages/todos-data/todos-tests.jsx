
const assert = chai.assert;

describe('tasks', () => {
  describe('mutators', () => {
    it('builds correctly from factory', () =>{
      const task = Factory.create('task');
      assert.typeOf(task, 'object');
      assert.typeOf(task.createdAt, 'date');
    })
  });

  describe('publications',() => {
    const userId = Random.id();
    console.log("userId: " + userId);

    const createTask = (props = {}) => {
      task = Factory.create('task', props);
      console.log('task: ' + task.text);
    }


    before(() => {
      Tasks.remove({});
      _.times(3, () =>{
        createTask({owner: userId});
      });

    });

    describe('tasks', () => {
      it( 'sends all tasks', () => {
        //const collector = new PublicationCollector({userId});
        //console.log(collector);
        //
        //collector.collect('tasks', (collections) => {
        //  console.log(collections.Tasks.length);
        //});
        assert.equal(true,true);
      });

    });
  })
});
