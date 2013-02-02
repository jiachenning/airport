Ext.define('security.controller.AccountController', {
    extend: 'Ext.app.Controller',
    
    stores: ['AccountStore'],

    views: ['account.AccountGrid']
    
});
