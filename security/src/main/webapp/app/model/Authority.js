Ext.define('security.model.Authority', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'text',
        type: 'string'
    },{
        name: 'enabled',
        type: 'boolean',
        defaultValue: true
    },{
        name: 'type',
        type: 'string'
    },{
        name: 'code',
        type: 'string'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'parent'
    },{
        name: 'parentName',
        type: 'string',
        persist : false
    },{
        name: 'version',
        type: 'int'
    }],
    proxy: {
        type: 'rest',
        url: 'authority'
    }
});
