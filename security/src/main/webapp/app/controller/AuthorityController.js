Ext.define('security.controller.AuthorityController', {
    extend: 'Ext.app.Controller',
    stores: ['Authority'],
    views: ['authority.AuthorityManagerPanel'],
    
    init: function() {
    	this.control({
    		'authoritymgrpanel > authoritytree': {
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
