Ext.define('security.model.Role', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'enabled',
        type: 'boolean'
    },{
        name: 'version',
        type: 'int'
    }],
    proxy: {
        type: 'rest',
        url: 'roles',
        startParam: undefined,
        pageParam: 'page.page',
        limitParam: 'page.size',
        reader: {
           root: 'content',
           totalProperty: 'totalElements'
        }
    }
});
