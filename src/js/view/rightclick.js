define([
    'utils/helpers',
    'utils/css',
    'underscore',
    'version'
], function(utils, cssUtils, _, version) {

    var _css = cssUtils.css,
        ABOUT_DEFAULT = 'About JW Player ',
        LINK_DEFAULT = 'http://www.longtailvideo.com/jwpabout/?a=r&v=',

        DOCUMENT = document,
        RC_CLASS = '.jwclick',
        RC_ITEM_CLASS = RC_CLASS + '_item',

        /** Some CSS constants we should use for minimization **/
        JW_CSS_100PCT = '100%',
        JW_CSS_BOX_SHADOW = '5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset',
        JW_CSS_NONE = 'none',
        JW_CSS_WHITE = '#FFF';

    var Rightclick = function(_playerElement, _model) {

        var _config = {
                aboutlink: LINK_DEFAULT + version + '&m=h&e=o',
                abouttext: ABOUT_DEFAULT + version + '...'
            },
            _mouseOverContext = false,
            _menu = _createElement(RC_CLASS),
            _about = _createElement(RC_ITEM_CLASS);

        if (_model.edition) {
            _config.abouttext = _config.abouttext || _model.abouttext;
            _config.aboutlink = _config.aboutlink || _model.aboutlink;
        }

        _menu.id = _playerElement.id + '_menu';
        _menu.style.display = JW_CSS_NONE;
        _playerElement.oncontextmenu = _showContext;
        _menu.onmouseover = function() {
            _mouseOverContext = true;
        };
        _menu.onmouseout = function() {
            _mouseOverContext = false;
        };
        DOCUMENT.addEventListener('mousedown', _hideContext, false);

        _about.innerHTML = _config.abouttext;
        _about.onclick = _clickHandler;
        _menu.appendChild(_about);
        _playerElement.appendChild(_menu);

        function _createElement(className) {
            var elem = DOCUMENT.createElement('div');
            elem.className = className.replace('.', '');
            return elem;
        }

        function _clickHandler() {
            window.top.location = _config.aboutlink;
        }

        function _showContext(evt) {
            var target, containerBounds, bounds;

            if (_mouseOverContext) {
                // returning because _mouseOverContext is true, indicating the mouse is over the menu
                return;
            }

            // IE6-9 do not pass an event parameter and get the target from window.srcElement
            // https://developer.mozilla.org/en-US/docs/Web/API/event.target
            evt = evt || window.event;
            target = evt.target || evt.srcElement;
            var providerInfo = _model.get('provider');
            _about.innerHTML = _config.abouttext + ((providerInfo) ? ('  Provided by ' + providerInfo.name) : '');

            containerBounds = utils.bounds(_playerElement);
            bounds = utils.bounds(target);

            // hide the menu first to avoid an 'up-then-over' visual effect
            _menu.style.display = JW_CSS_NONE;
            _menu.style.left = (evt.offsetX ? evt.offsetX : evt.layerX) + bounds.left - containerBounds.left + 'px';
            _menu.style.top = (evt.offsetY ? evt.offsetY : evt.layerY) + bounds.top - containerBounds.top + 'px';
            _menu.style.display = 'block';
            evt.preventDefault();
        }

        function _hideContext() {
            if (_mouseOverContext) {
                // returning because _mouseOverContext is true, indicating the mouse is over the menu
                return;
            } else {
                _menu.style.display = JW_CSS_NONE;
            }
        }

        this.element = function() {
            return _menu;
        };

        this.destroy = function() {
            DOCUMENT.removeEventListener('mousedown', _hideContext, false);
        };
    };

    _css(RC_CLASS, {
        'background-color': JW_CSS_WHITE,
        '-webkit-border-radius': 5,
        '-moz-border-radius': 5,
        'border-radius': 5,
        height: 'auto',
        border: '1px solid #bcbcbc',
        'font-family': '\'MS Sans Serif\', \'Geneva\', sans-serif',
        'font-size': 10,
        width: 320,
        '-webkit-box-shadow': JW_CSS_BOX_SHADOW,
        '-moz-box-shadow': JW_CSS_BOX_SHADOW,
        'box-shadow': JW_CSS_BOX_SHADOW,
        position: 'absolute',
        'z-index': 999
    }, true);

    _css(RC_CLASS + ' div', {
        padding: '8px 21px',
        margin: '0px',
        'background-color': JW_CSS_WHITE,
        border: 'none',
        'font-family': '\'MS Sans Serif\', \'Geneva\', sans-serif',
        'font-size': 10,
        color: 'inherit'
    }, true);

    _css(RC_ITEM_CLASS, {
        padding: '8px 21px',
        'text-align': 'left',
        cursor: 'pointer'
    }, true);

    _css(RC_ITEM_CLASS + ':hover', {
        'background-color': '#595959',
        color: JW_CSS_WHITE
    }, true);

    _css(RC_ITEM_CLASS + ' a', {
        'text-decoration': JW_CSS_NONE,
        color: '#000'
    }, true);

    _css(RC_CLASS + ' hr', {
        width: JW_CSS_100PCT,
        padding: 0,
        margin: 0,
        border: '1px #e9e9e9 solid'
    }, true);

    return Rightclick;
});
