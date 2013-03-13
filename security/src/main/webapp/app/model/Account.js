Ext.define('security.model.Account', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'version',
        type: 'int'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'group.name',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: 'accounts'
    }
});
