
define([
    'utils/underscore',
], function(_) {

    return function(_api, _controller) {

        var modelGetters = [
            'buffer',
            'controls',
            'position',
            'duration',
            'width',
            'height',
            'fullscreen',
            'volume',
            'mute',
            'state',
            'index', // this was playlistindex
            'stretching',
            'playlist'
        ];

        // given a name "buffer", it adds to jwplayer api a function named getBuffer
        //   which checks the model
        _.each(modelGetters, function(attr) {
            // Uppercase first letter
            var format = attr.slice(0,1).toUpperCase() + attr.slice(1);

            //_api['get' + val] = _.partial(_controller._model.get, attr);
            _api['get' + format] = function() {
                return _controller._model.get(attr);
            };
        });



        var passthroughs = [
            'getAudioTracks',
            'getCaptionsList',

            'getCurrentAudioTrack',
            'setCurrentAudioTrack',

            'getCurrentCaptions',
            'setCurrentCaptions',

            'getCurrentQuality',
            'setCurrentQuality',

            'getQualityLevels',

            'getSafeRegion',
            'isBeforeComplete',
            'isBeforePlay',


            // Sisters of the model getters
            'setControls',
            'setFullscreen',
            'setVolume',
            'setMute'

            // These are implemented in api.js, but should be here
            //'getItemMeta',
            //'getMeta',
            //'getPlaylistItem',
            //'getLockState', //?
            //'getContainer',
            //'playlistItem',

            // Deprecated
            //'getRenderingMode',
        ];
        _.each(passthroughs, function(func) {
            //_api[func] = _controller[func].bind(_controller);
            _api[func] = function() {
                return _controller[func].apply(_controller, arguments);
            };
        });


        // One additional for legacy
        _api.getPlaylistIndex = _api.getIndex;
    };
});
