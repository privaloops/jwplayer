
define([
    'utils/underscore',
], function(_) {

    return function(_api, _controller) {
        /*
        _controller.jwPlay = _controller.play;
        _controller.jwPause = _controller.pause;
        _controller.jwSetMute = _controller.setMute;
        _controller.jwLoad = _controller.load;
        _controller.jwPlaylistItem = _controller.item;
        _controller.jwGetAudioTracks = _controller.getAudioTracks;
        _controller.jwDetachMedia = _controller.detachMedia;
        _controller.jwAttachMedia = _controller.attachMedia;
        _controller.jwAddEventListener = _controller.on;
        _controller.jwRemoveEventListener = _controller.off;
        */

        // This is only required for legacy support of JWPlayer 6
        _api.jwStop = _controller.stop;
        _api.jwSeek = _controller.seek;
        _api.jwSetVolume = _controller.setVolume;
        _api.jwPlaylistNext = _controller.next;
        _api.jwPlaylistPrev = _controller.prev;
        _api.jwSetFullscreen = _controller.setFullscreen;
        _api.jwGetQualityLevels = _controller.getQualityLevels;
        _api.jwGetCurrentQuality = _controller.getCurrentQuality;
        _api.jwSetCurrentQuality = _controller.setCurrentQuality;
        _api.jwSetCurrentAudioTrack = _controller.setCurrentAudioTrack;
        _api.jwGetCurrentAudioTrack = _controller.getCurrentAudioTrack;
        _api.jwGetCaptionsList = _controller.getCaptionsList;
        _api.jwGetCurrentCaptions = _controller.getCurrentCaptions;
        _api.jwSetCurrentCaptions = _controller.setCurrentCaptions;

    };
});
