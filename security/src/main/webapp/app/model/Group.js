Ext.define('security.model.Group', {
    extend: 'Ext.data.TreeModel',

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
        name: 'parent'
    },{
        name: 'enabled',
        type: 'boolean'
    },{
        name: 'ordernum',
        type: 'int'
    },{
        name: 'version',
        type: 'int'
    },{
    	name: 'description',
    	type: 'string'
    },{
    	name: 'nodetype',
    	type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: 'groups'
    }
});
