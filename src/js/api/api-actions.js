define([
    'utils/underscore',
], function(_) {

    return function(_api, _controller) {
        // Commented out methods are those which are not direct passthroughs
        //   instead these have custom logic inside api.js
        //   Ultimately they should be moved into this file
        var passthroughs = [
            // 'setup',
            //'load',
            //'play',
            //'pause',
            'seek',
            'stop',
            //'remove',
            'playlistNext',
            'playlistPrev',
            'playlistItem',

            //'addButton',
            'removeButton',

            'registerPlugin'
        ];

        _.each(passthroughs, function(func) {
            _api[func] = _controller[func].bind(_controller);
        });
    };
});
