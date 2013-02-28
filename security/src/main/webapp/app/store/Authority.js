Ext.define('security.store.Authority', {
    extend: 'Ext.data.TreeStore',

    model: 'security.model.Authority',
    root: {
        text: '资源根节点',
        id: 1,
        expanded: true
    },
    proxy: {
        type: 'rest',
        url: 'authority/findByParentId'
    }
});
