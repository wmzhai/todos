import { FlowRouter } from 'kadira:flow-router';
import { ReactLayout } from 'kadira:react-layout';
import { App } from '../../imports/client/components/App.jsx';
import { AppNotFound } from '../../imports/client/pages/AppNotFound.jsx';
import { MainLayout } from '../../imports/client/layouts/MainLayout.jsx';

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
