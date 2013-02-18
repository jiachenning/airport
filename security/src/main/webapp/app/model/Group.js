Ext.define('security.model.Group', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'text',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: 'groups/findByParentId'
    }
});
