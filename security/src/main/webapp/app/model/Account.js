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
    },{
        name: 'groupName',
        type: 'string'
    },{
        name: 'group'
    },{
        name: 'user'
    }],
    proxy: {
        type: 'rest',
        url: 'accounts'
    }
});
