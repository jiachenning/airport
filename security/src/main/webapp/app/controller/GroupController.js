Ext.define('security.controller.GroupController', {
    extend: 'Ext.app.Controller',
    requires: ['security.view.group.GroupWin'],

    stores: ['Group'],
    
    models: ['Group'],

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
						this.showAddGroupWin(menuItem);
					}
		        },'-',{
		        	text: '编辑部门',
		        	iconCls: 'silk-group_edit',
		        	scope: this,
					handler: function(menuItem) {
						this.showEditGroupWin(menuItem);
					}
		        }]
		    });
		}
		e.preventDefault();
		this.ctmenu.showAt(e.getXY());
	},
	
	showAddGroupWin: function(menuItem) {
		
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
			'parent': {
				id: node.get('id')
			 }
		});
		
		f.loadRecord(record);
		
		var parentText = node.get('text');
        f.findField('parentText').setValue(parentText);
		win.show(menuItem);
	},
	
	showEditGroupWin: function(menuItem) {
		
		var node = this.getGroupTree().getSelectionModel().getLastSelected();
		
		alert(node.get('text'));
		alert("zhuhaijian");
		alert(node.parentNode.get('id'));
		
		node.set('parent', {
			id: node.parentNode.get('id')
		 })
				
		if (!node.isExpanded()) {
			node.expand();
		}
		
		var win = Ext.getCmp('groupwin');
		if(!win) {
			win = Ext.widget('groupwin');
		}
    	
		win.show(menuItem, function() {
            var f = win.child('form').getForm();
            f.loadRecord(node);
            
            var parentText = node.parentNode.get('text');
            f.findField('parentText').setValue(parentText);
        });
		
	},
	
    saveGroup: function(btn) {          
        
        var win = Ext.getCmp('groupwin'),
			f = win.child('form').getForm(),
			groupStore = this.getGroupStore();
        
        if (f.isValid()) {
            f.updateRecord();
            var group = f.getRecord();
            
            group.save({
                success: function(group) {
                    win.hide();
                    groupStore.load();
                }
            });
        }
    }

});
