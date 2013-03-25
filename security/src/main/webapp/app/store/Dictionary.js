Ext.define('security.store.Dictionary', {
    extend: 'Ext.data.TreeStore',

    model: 'security.model.Dictionary',
    root: {
        text: '根节点',
        name: '根节点',
        id: 1,
        expanded: true
    },
    sorters: ['ordernum'],
    proxy: {
        type: 'rest',
        url: 'dictionary/findByParentId'
    }
});
