import { FlowRouter } from 'kadira:flow-router';
import { ReactLayout } from 'kadira:react-layout';
import { App } from '../../imports/client/App.jsx';
import { MainLayout } from '../../imports/client/MainLayout.jsx';

Meteor.subscribe("tasks");

FlowRouter.route( '/', {
  name: 'home',
  action() {
    ReactLayout.render( MainLayout, {content: <App />} );
  }
});

FlowRouter.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( MainLayout, {content: <Login />});
  }
});
