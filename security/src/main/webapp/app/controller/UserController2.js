Ext.define('security.controller.UserController2', {
    extend: 'Ext.app.Controller',
    
    views: ['user.UserTab2'],
    
    init: function() {
    
        this.control({
            'usergrid2': {
                itemclick: this.onUserGrid2ItemClick
            }
        });
    },

    onUserGrid2ItemClick: function(grid, record, item, index, e, eOpts) {
    	
        var userId = record.get('id'),
            store = Ext.ComponentQuery.query('accountgrid2').pop().getStore();

        store.getProxy().setExtraParam('userId', userId);
        store.load();
    }
    
});
