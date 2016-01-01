
class TasksCollection extends Mongo.Collection{
    insert(doc, callback) {
        doc.createdAt = doc.createdAt || new Date();
        const result = super(doc, callback);
        return result;
    }
}

Tasks = new TasksCollection("tasks");
