Ext.define('security.store.Resource', {
    extend: 'Ext.data.TreeStore',

    model: 'security.model.Group',
    root: {
        text: '资源根节点',
        id: 1,
        expanded: true
    }
});
