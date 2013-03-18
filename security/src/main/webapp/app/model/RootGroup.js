Ext.define('security.model.RootGroup', {
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
        name: 'parent'
    },{
        name: 'enabled',
        type: 'boolean'
    },{
        name: 'version',
        type: 'int'
    },{
        name: 'nodetype',
        type: 'string'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'leaf',
        type: 'boolean',
        persist: false
    }],
    proxy: {
        type: 'rest',
        url: 'groups',
        startParam: undefined,
        pageParam: 'page.page',
        limitParam: 'page.size',
        extraParams: {
            'search_nodetype_eq': 'root'
        },
        reader: {
           root: 'content',
           totalProperty: 'totalElements'
        }
    }
});
