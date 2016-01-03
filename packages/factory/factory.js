
/* global Factory:true */
/* global LocalCollection */

Factory = function(name, collection, properties) {
  this.name = name;
  this.collection = collection;
  this.properties = properties;
  this.afterBuildCbs = [];
};
