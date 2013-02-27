Ext.define('security.store.Group', {
    extend: 'Ext.data.TreeStore',

    model: 'security.model.Group',
    root: {
        text: '系统组织机构',
        id: 1,
        expanded: true
    },
    proxy: {
        type: 'rest',
        url: 'groups/findByParentId'
    }
});
