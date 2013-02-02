Ext.define('security.model.User', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'username',
        type: 'string'
    },{
        name: 'age',
        type: 'int'
    },{
        name: 'birthday',
        type: 'date'
    },{
        name: 'userType',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: 'users',
        startParam: undefined,
        pageParam: 'page.page',
        limitParam: 'page.size',
        reader: {
           root: 'content',
           totalProperty: 'totalElements'
        }
    }
});
