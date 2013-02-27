Ext.define('security.controller.GroupController', {
    extend: 'Ext.app.Controller',
    requires: ['security.view.group.GroupWin'],

    stores: ['Group'],

    views: [
        'group.GroupManagerPanel',
        'group.GroupWin'
    ],
    
    refs: [{
        ref: 'groupTree',
        selector: 'grouptree'
    }],

    init: function() {
    	
    	this.control({
    		'groupmgrpanel > grouptree': {
    			itemcontextmenu: this.onGroupTreeItemcontextmenu
    		},
    		'groupwin button[text="保存"]': {
                click: this.saveGroup
            }
    	});
    },
    
    onGroupTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
    	if(!this.ctmenu) {
			this.ctmenu = Ext.widget('menu', {
				width: 80,
				items:[{
					text: '添加部门',
					iconCls: 'silk-group_add',
					scope: this,
					handler: function(menuItem) {
						this.showGroupWin(menuItem);
					}
		        },'-',{
		        	text: '编辑部门',
		        	iconCls: 'silk-group_edit',
		        	scope: this,
					handler: function(menuItem) {
						this.showGroupWin(menuItem);
					}
		        }]
		    });
		}
		e.preventDefault();
		this.ctmenu.showAt(e.getXY());
	},
	
	showGroupWin: function(menuItem) {
		
		var node = this.getGroupTree().getSelectionModel().getLastSelected();
		
		if (!node.isExpanded()) {
			node.expand();
		}
		var win = Ext.getCmp('groupwin');
		if(!win) {
			win = Ext.widget('groupwin');
		}
		
		var f = win.child('form').getForm();
		var record = Ext.create('security.model.Group', {
			'parent': {id: node.get('id')}
		});
		
		f.loadRecord(record);
		win.show(menuItem);
	},
	
    saveGroup: function(btn) {          
        
        var win = Ext.getCmp('groupwin'),
			f = win.child('form').getForm();
        
        if (f.isValid()) {
            f.updateRecord();
            var group = f.getRecord();
            alert(group.get('text'))
            
            group.save({
                success: function(group) {
                    win.hide();
                    //roleStore.loadPage(1);
                }
            });
        }
    }

});
