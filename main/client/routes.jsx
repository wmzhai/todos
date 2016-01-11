import { FlowRouter } from 'kadira:flow-router';
import { ReactLayout } from 'kadira:react-layout';
import { App } from '../../imports/client/App.jsx';


Meteor.subscribe("tasks");


FlowRouter.route( '/', {
  name: 'home',
  action: function() {
    ReactLayout.render(App);
  }
});