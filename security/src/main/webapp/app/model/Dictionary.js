Ext.define('security.model.Dictionary', {
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
        name: 'code',
        type: 'string'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'parent'
    },{
        name: 'version',
        type: 'int'
    },{
        name: 'parentName',
        type: 'string',
        persist : false
    },{
        name: 'parentId',
        type: 'int',
        persist : false
    }],
    proxy: {
        type: 'rest',
        url: 'dictionary'
    }
});
