Ext.define('security.controller.UserController2', {
    extend: 'Ext.app.Controller',
    
    views: ['user.UserTab2'],

    refs: [{
        ref: 'accountGrid2',
        selector: 'accountgrid2'
    }],
    
    init: function() {
    
        this.control({
            'usergrid2': {
                selectionchange: this.onUserGrid2SelectionChange
            },
            'accountgrid2 actioncolumn': {
                click: this.doAction
            },
        });
    },

    onUserGrid2SelectionChange: function(model, selected, eOpts) {

        if (selected && selected.length) {
        	
            var record = selected[0],
                userId = record.get('id'),
                store = this.getAccountGrid2().getStore();
            
            store.getProxy().setExtraParam('userId', userId);
            store.load();
        }
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        
    	var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            //this.showUserWin(e.target, e, eOpts,rec);
        	Ext.example.msg('提示', '此功能还未实现!');
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteAccount(rec.get('id'));
        }
    },
    
    deleteAccount: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var accountStore = this.getAccountGrid2().getStore();
                var account = Ext.create('security.model.Account', {
                    id: id
                });
                account.getProxy().url = 'accounts';
                account.destroy({
                    success: function() {
                    	account.getProxy().url = 'accounts/findByUserId';
                    	accountStore.loadPage(1);
                    }
                });
            }
        }, this);
    }
    
});
