
/* Information about this package */
Package.describe({
  // Short two-sentence summary
  summary: 'common dependencies of all app packages',

  // Version number
  version: '0.0.1'
});

/* This defines your actual package */
Package.onUse(function(api){
  //Language Stuff
  api.imply([
    'ecmascript@0.1.6',
    'es5-shim@4.1.14'
  ]);

  // Collections
  api.imply([
    'mongo',
    'aldeed:collection2@2.5.0',
    'dburles:collection-helpers@1.0.4',
    'mdg:validation-error',
    'reywood:publish-composite@1.4.2'
  ]);

  //Client-side libraries
  api.imply([
    'tracker',
    'jquery',
    'blaze-html-templates',
    'session',
    'react@0.14.3'
  ]);

  //Accounts
  api.imply([
    'accounts-ui@1.1.6',
    'accounts-password@1.1.4'
  ]);

  // DDP
  api.imply([
    'mdg:validated-method@0.2.0',
    'aldeed:simple-schema@1.4.0',
  ]);
});