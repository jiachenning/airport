Ext.define('security.model.DictionaryManage', {
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
        name: 'description',
        type: 'string'
    },{
        name: 'typecode',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: 'dictionaryManage',
        startParam: undefined,
        pageParam: 'page.page',
        limitParam: 'page.size',
        reader: {
           root: 'content',
           totalProperty: 'totalElements'
        }
    }
});
