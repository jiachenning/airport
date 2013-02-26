Ext.define('security.controller.GroupController', {
    extend: 'Ext.app.Controller',

    stores: ['Group'],

    views: ['group.GroupManagerPanel'],

    init: function() {
    	
    	this.control({
    		'groupmgrpanel > grouptree': {
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
