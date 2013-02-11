Ext.define('security.controller.UserController', {
    extend: 'Ext.app.Controller',
    
    stores: ['UserStore', 'AccountStore'],

    views: ['user.UserTab'],
    
    refs: [{
        ref: 'userGrid',
        selector: 'usergrid'
    },{
        ref: 'accountGrid',
        selector: 'accountgrid'
    },{
       ref: 'userWin',
       selector: 'userwin'
    }],
    
    init: function() {
        this.control({
            'usergrid': {
                itemclick: this.onUserGridItemClick
            },
            'usergrid actioncolumn': {
                click: this.doAction
            },
            'usergrid button[text="添加"]': {
                click: this.showUserWin
            },
            'usergrid button[text="维护用户账号"]': {
                click: this.maintainUserAccount
            },
            'userwin button[text="保存"]': {
                click: this.saveUser
            }
        });
    },
    
    onUserGridItemClick: function(grid, record, item, index, e, eOpts) {

        var userId = record.get('id'),
            accountStore = this.getStore('AccountStore');

        accountStore.getProxy().setExtraParam('userId', userId);

        accountStore.load();
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row);
        var action = e.target.getAttribute('class');
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            this.showUserWin(e.target, e, eOpts,rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteUser(rec.get('id'));
        }
    },
    
    deleteUser: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var userGrid = this.getUserGrid();
                Ext.create('security.model.User', {
                    id: id
                }).destroy({
                    success: function() {
                        userGrid.getStore().loadPage(1);
                    }
                });
            }
        }, this);
    },

    showUserWin: function(btn, e, eOpts, record) {
        var win = Ext.getCmp('userwin');
        if (!win) {
            win = Ext.widget('userwin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (record) {
                f.loadRecord(record);
            } else {
                f.reset();
            }
        });
    },

    maintainUserAccount: function(btn) {
    	this.getController('UserController2').init();
        var tabs = Ext.ComponentQuery.query('tabpanel').pop();
        tabs.setActiveTab(tabs.add({
            xtype: 'usertab2',
            closable: true
        }));
    },

    saveUser: function(btn) {
        var win = this.getUserWin(),
            f = win.child('form').getForm();
        
        if (f.isValid()) {
            var user = Ext.create('security.model.User', f.getValues())
                userGrid = this.getUserGrid();
            
            user.save({
                success: function() {
                    win.close();
                    userGrid.getStore().loadPage(1);
                }
            });
        }
    }

});
