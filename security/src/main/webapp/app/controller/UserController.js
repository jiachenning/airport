Ext.define('security.controller.UserController', {
    extend: 'Ext.app.Controller',
    
    stores: ['UserStore', 'AccountStore'],

    views: ['user.UserGrid', 'user.UserWin', 'account.AccountGrid'],
    
    refs: [{
    	ref: 'userGrid',
        selector: 'usergrid'
    },{
       ref: 'userWin',
       selector: 'userwin'
    }],
    
    init: function() {
    	this.control({
    		'userwin button[text="保存"]': {
    			click: this.saveUser
    		},
    		'usergrid button[text="添加"]': {
    			click: this.showUserWin
    		},
    		'usergrid button[text="维护用户账号"]': {
    			click: this.matainUserAccount
    		},
    		'usergrid actioncolumn': {
    			click: this.doAction
    		}
    	});
    },
    
    showUserWin: function(btn) {
    	Ext.widget('userwin').show(btn);
    },
    
    matainUserAccount: function(btn) {
    	Ext.example.msg('提示', btn.text + "功能尚未实现!!");
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
    },
    
    doAction: function(grid, cell, row, col, e) {
    	var rec = grid.getStore().getAt(row);
    	var action = e.target.getAttribute('class');
        if (action.indexOf("x-action-col-0") != -1) { // edit user
        	Ext.example.msg('提示', '删除功能尚未实现!!');
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
    }

});
