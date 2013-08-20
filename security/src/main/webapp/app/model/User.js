Ext.define('security.model.User', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'version',
        type: 'int'
    },{
        name: 'username',
        type: 'string'
    },{
        name: 'loginName',
        type: 'string'
    },{
        name: 'password',
        type: 'string'
    },{
        name: 'enabled',
        type: 'boolean',
        defaultValue: true
    },{
        name: 'telephone',
        type: 'string'
    },{
        name: 'address',
        type: 'string'
    },{
    	name: 'imoId',
    	type: 'string'
    },{
        name: 'birthday',
        type: 'date',
        defaultValue: new Date()
    },{
        name: 'userType',
        type: 'string',
        defaultValue: 'NORMAL'
    },{
        name: 'gender',
        type: 'string',
        defaultValue: 'MALE'
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
