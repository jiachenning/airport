Ext.define('security.controller.AuthorityController', {
    extend: 'Ext.app.Controller',
    stores: ['Authority'],
    views: [
        'authority.AuthorityManagerPanel',
        'authority.AuthorityForm',
        'authority.AuthorityWin'
    ],
    
    refs: [{
        ref: 'authorityTree',
        selector: 'authoritymgrpanel > authoritytree'
    },{
        ref: 'authorityForm',
        selector: 'authoritymgrpanel > authorityform'
    },{
        ref: 'authorityWin',
        selector: 'authoritywin'
    }],
    
    init: function() {
    	this.control({
    		'authoritymgrpanel > authoritytree': {
    			itemcontextmenu: this.onAuthorityTreeItemcontextmenu,
    			itemclick: this.onAuthorityItemclick
    		},
    		'authoritywin button[text="保存"]': {
                click: this.saveAuthority
            }
    	});
    },

    onAuthorityTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
    	if(!this.contextmenu) {
			this.contextmenu = Ext.widget('menu', {
				width: 80,
				items:[{
					text: '添加资源',
					scope: this,
					icon: 'icons/book_add.png',
					handler: function(menuItem) {
						this.showAuthorityWin(menuItem, 'add');
					}
		        },'-',{
		        	text: '编辑资源',
		        	scope: this,
		        	icon: 'icons/book_edit.png',
					handler: function(menuItem) {
						this.showAuthorityWin(menuItem, 'update');
					}
		        },'-',{
		        	text: '删除资源',
		        	scope: this,
		        	icon: 'icons/book_delete.png',
					handler: function(menuItem) {
						this.deleteAuthority(menuItem);
					}
		        }]
		    });
		}
		e.preventDefault();
		this.contextmenu.showAt(e.getXY());
	},
    
    onAuthorityItemclick: function(view, record, item, index, e, eOpts ) {
		var form = this.getAuthorityForm();
		form.loadRecord(record);
	},
	
	showAuthorityWin: function(menuItem, option) {
		
		var node = this.getAuthorityTree().getSelectionModel().getLastSelected();
		if(node.get('text') == '资源根节点' && option == 'update') {
			Ext.Msg.alert('提示','根节点不能修改!');
			return;
		}
		if (!node.isExpanded()) {
			node.expand();
		}
		var win = this.getAuthorityWin();
		if(!win) {
			win = Ext.widget('authoritywin');
		}
		
		var f = win.child('form').getForm();
		
		if(option == 'add'){
			var record = Ext.create('security.model.Authority', {
				'parent': {id: node.get('id')},
				'parentName': node.get('text')
			});
			f.loadRecord(record);
		}else if(option == 'update'){
			node.set('parent', {id: node.parentNode.get('id')});
			node.set('parentName', node.parentNode.get('text'));
			f.loadRecord(node);
		}
	
		win.show(menuItem);
	},
	
	saveAuthority: function(btn) {          
        var win = this.getAuthorityWin(),
			f = win.child('form').getForm();
        if (f.isValid()) {
            f.updateRecord();
            var authority = f.getRecord();
            var selectedNode = this.getAuthorityTree().getSelectionModel().getLastSelected();
            var store = this.getAuthorityStore();
            var id = authority.get('id');
            Ext.Ajax.request({
	            url: 'authority/validateAuthorityCode',
	            method: 'get',
	            params: {
	            	code : authority.get('code'),
	                id: id
	            },
	            success: function(response, options) {
	            	var respText = Ext.JSON.decode(response.responseText),
	            		json = eval('(' + respText + ')');
	            	if(json.success){
	            		authority.save({
                            success: function() {
                            	if(id == ''){
        	                    	if (selectedNode.isLeaf()) {
        	        					selectedNode.set('leaf',false);
        	        				}
        	                    	store.load({
        	                    		node: selectedNode
        	                    	});
        	                    	Ext.Msg.alert('提示','新增成功!');
        	                    }else{
        	                        selectedNode.set('text', authority.get('name'));
        	                        selectedNode.set('version', authority.get('version')+1);
        	                    	Ext.Msg.alert('提示','更新成功!');
        	                    }
                                win.hide();
                            }
                        });
              		}else 
              			Ext.Msg.alert('失败', '该权限代码已存在!');
	            }
	        });
        }
    },
    
	deleteAuthority: function(menuItem) {
		var selectedNode = this.getAuthorityTree().getSelectionModel().getLastSelected(),
			parentNode = selectedNode.parentNode;
		if(selectedNode != null){
	        var isLeaf = selectedNode.isLeaf();
			if(isLeaf){
				Ext.Msg.show({
					title:'提示',
					msg: '确定删除节点?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function(btn){
                        if(btn=='yes'){
                        	selectedNode.destroy({
                        		success: function() {
                        			if(parentNode.childNodes.length == 0 ){
                                		parentNode.set('leaf',true);
                                	}
                                }
                            });
				    	}
				    }
				});
			}else{
				Ext.Msg.alert('提示','请选择叶子节点删除!');
			}
		}else{
			Ext.Msg.alert('提示','请先选择一个节点!');
		}
    }

});
