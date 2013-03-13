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
        name: 'group',
    },{
        name: 'groupName',
        mapping: 'group.name',
        persist: false
    },{
        name: 'user'
    }],
    proxy: {
        type: 'rest',
        url: 'accounts'
    }
});
