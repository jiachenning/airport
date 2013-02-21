Ext.define('security.controller.UserController', {
    extend: 'Ext.app.Controller',
    
    stores: ['User', 'Account'],

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
                selectionchange: this.onUserGridSelectionChange
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
    
    onUserGridSelectionChange: function(model, selected, eOpts) {

        if (selected && selected.length) {
        	
            var record = selected[0],
                userId = record.get('id'),
                accountStore = this.getAccountStore();

            accountStore.getProxy().setExtraParam('userId', userId);
            accountStore.load();
        }
    },
    
    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            this.showUserWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteUser(rec.get('id'));
        }
    },
    
    deleteUser: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var userStore = this.getUserStore();
                Ext.create('security.model.User', {
                    id: id
                }).destroy({
                    success: function() {
                    	userStore.loadPage(1);
                    }
                });
            }
        }, this);
    },

    showUserWin: function(btn, e, eOpts, rec) {
        var win = Ext.getCmp('userwin');
        if (!win) {
            win = Ext.widget('userwin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (!rec) {
                rec = Ext.create('security.model.User');
            }
            f.loadRecord(rec);
        });
    },

    maintainUserAccount: function(btn) {
    	this.getController('UserController2').init();
        var tabs = security.getApplication().getTabs();
        tabs.setActiveTab(tabs.add({
            title: '用户通信录维护',
            closable: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            bodyPadding: 1,
            items: [{
                xtype: 'usergrid',
                flex: 2
            },{
                xtype: 'splitter',
                defaultSplitMin: 100
            },{
                xtype: 'accountgrid',
                operable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: {
                        text: '添加',
                        tooltip: '添加'
                    }
                }],
                flex: 3
            }]
        }));
    },

    saveUser: function(btn) {
        var win = this.getUserWin(),
            f = win.child('form').getForm();
        
        if (f.isValid()) {
            f.updateRecord();
            var userStore = this.getUserStore(),
                user = f.getRecord();
            
            user.save({
                success: function(user) {
                    win.hide();
                    userStore.loadPage(1);
                }
            });
        }
    }

});
