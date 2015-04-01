
define([
    'utils/underscore',
], function(_) {

    return function(_api, _controller) {

        var modelGetters = [
            'getAudioTracks',
            'getBuffer',
            'getCaptionsList',
            'getContainer',
            'getControls',
            'getCurrentAudioTrack',
            'getCurrentCaptions',
            'getCurrentQuality',
            'getDuration',
            'getFullscreen',
            'getHeight',
            'getItemMeta',
            'getLockState',
            'getMeta',
            'getMute',
            'getPlaylist',
            'getPlaylistIndex',
            'getPlaylistItem',
            'getPosition',
            'getQualityLevels',
            'getRenderingMode',
            'getState',
            'getVolume',
            'getWidth'
            /*
            'playlistItem',
            'plugins',

            'setPlayer',
            'id',
            'container',
            'config'
            */
        ];

        var modelSetters = [
            'setControls',
            'setCurrentAudioTrack',
            'setCurrentCaptions',
            'setCurrentQuality',
            'setFullscreen',
            'setMute',
            'setVolume'
        ];

        _.each(modelGetters, function(val) {
            var attr = val.slice(3);
            attr = attr.slice(0,1).toLowerCase() + attr.slice(1);

            _api[val] = _.partial(_controller._model.get, attr);
        });
    };
});
