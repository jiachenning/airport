/**
 * This file includes the required ext-all js and css files based upon "theme" and "direction"
 * url parameters.  It first searches for these parameters on the page url, and if they
 * are not found there, it looks for them on the script tag src query string.
 * For example, to include the neptune flavor of ext from an index page in a subdirectory
 * of extjs/examples/:
 * <script type="text/javascript" src="../../examples/shared/include-ext.js?theme=neptune"></script>
 */
(function() {
    function getQueryParam(name) {
        var regex = RegExp('[?&]' + name + '=([^&]*)');

        var match = regex.exec(location.search) || regex.exec(path);
        return match && decodeURIComponent(match[1]);
    }

    var scriptEls = document.getElementsByTagName('script'),
        path = scriptEls[scriptEls.length - 1].src,
        rtl = getQueryParam('direction') === 'rtl',
        theme = getQueryParam('theme'),
        neptune = (theme === 'neptune'),
        suffix = [],
        i = 3;

    while (i--) {
        path = path.substring(0, path.lastIndexOf('/'));
    }
    
    path += "/security/extjs";
        
    if (theme && theme !== 'classic') {
        suffix.push(theme);
    }
    if (rtl) {
        suffix.push('rtl');
    } 

    suffix = (suffix.length) ? ('-' + suffix.join('-')) : '';

    document.write('<link rel="stylesheet" type="text/css" href="' + path + '/resources/css/ext-all' + suffix + '.css"/>');
    document.write('<script type="text/javascript" src="' + path + '/ext-all-dev' + (rtl ? '-rtl' : '') + '.js"></script>');
    if (neptune) {
        // since document.write('<script>') does not block execution in IE, defer is required
        // to prevent ext-neptune.js from executing before ext-all.js
        document.write('<script type="text/javascript" src="' + path + '/ext-theme-neptune.js" defer></script>');
    }

})();
