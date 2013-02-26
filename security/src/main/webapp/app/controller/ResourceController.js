Ext.define('security.controller.ResourceController', {
    extend: 'Ext.app.Controller',
    stores: ['Resource'],
    views: ['resource.ResourceManagerPanel'],
    
    init: function() {
    	this.control({
    		'resourcemgrpanel > resourcetree': {
    			itemcontextmenu: this.onGroupTreeItemcontextmenu
    		}
    	});
    },

	onGroupTreeItemcontextmenu: function(view, record, item, index, e, eOpts ) {
		alert(index);
		alert(record.get('id'));
		alert(record.get('text'));
	}

});
