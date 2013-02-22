Ext.define('security.model.Group', {
    extend: 'Ext.data.TreeModel',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'name',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: 'groups/findByParentId'
    }
});
