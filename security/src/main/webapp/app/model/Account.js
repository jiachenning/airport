Ext.define('security.model.Account', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'version',
        type: 'int'
    },{
        name: 'loginName',
        type: 'string'
    },{
        name: 'password',
        type: 'string'
    },{
        name: 'enabled',
        type: 'boolean'
    }],
    proxy: {
        type: 'rest',
        url: 'accounts/findByUserId',
    }
});
