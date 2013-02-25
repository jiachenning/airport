Ext.define('security.controller.RoleController', {
    extend: 'Ext.app.Controller',

    views: [
        'role.RoleGrid',
        'role.RoleWin'
    ],

    refs: [{
        ref: 'roleGrid',
        selector: 'rolegrid'
    },{
        ref: 'roleWin',
        selector: 'rolewin'
    }],

    init: function() {

        this.control({
            'rolegrid button[text="添加"]': {
                click: this.showRoleWin
            },
            'rolegrid button[text="维护帐号角色"]': {
                click: this.maintainAccRole
            },
            'rolegrid actioncolumn': {
                click: this.doAction
            },
            'rolewin button[text="保存"]': {
                click: this.saveRole
            }
        });
    },

    showRoleWin: function(btn, e, eOpts, rec) {
        var win = Ext.getCmp('rolewin');
        if (!win) {
            win = Ext.widget('rolewin');
        }
    	win.show(btn, function() {
            var f = win.child('form').getForm();
            if (!rec) {
                rec = Ext.create('security.model.Role');
            }
            f.loadRecord(rec);
        });
    },

    maintainAccRole: function(btn) {
        this.getController('MaintainAccRoleController').init();
        var tabs = security.getApplication().getTabs();
        tabs.setActiveTab(tabs.add({
            xtype: 'maintain-acc-role',
            closable: true
        }));
    },

    doAction: function(grid, cell, row, col, e, eOpts) {
        var rec = grid.getStore().getAt(row),
        	action = e.target.getAttribute('class');
        
        if (action.indexOf("x-action-col-0") != -1) { // edit user
            this.showRoleWin(e.target, e, eOpts, rec);
        } else if (action.indexOf("x-action-col-1") != -1) { // delete user
            this.deleteRole(rec.get('id'));
        }
    },

    deleteRole: function(id) {
        Ext.Msg.confirm('确认', '你确定要删除吗?', function(btn) {
            if (btn == 'yes') {
                var roleStore = this.getRoleGrid().getStore();
                Ext.create('security.model.Role', {
                    id: id
                }).destroy({
                    success: function() {
                    	roleStore.loadPage(1);
                    }
                });
            }
        }, this);
    },

    saveRole: function(btn) {
        var win = this.getRoleWin(),
            f = win.child('form').getForm();
        
        if (f.isValid()) {
            f.updateRecord();
            var roleStore = this.getRoleGrid().getStore(),
                role = f.getRecord();
            
            role.save({
                success: function(role) {
                    win.hide();
                    roleStore.loadPage(1);
                }
            });
        }
    }

});
