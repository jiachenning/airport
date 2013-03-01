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
        name: 'code',
        type: 'string'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'parent'
    },{
    	name: 'parentName',
    	type: 'string'
    },{
        name: 'version',
        type: 'int'
    }],
    proxy: {
        type: 'rest',
        url: 'authority'
    }
});
