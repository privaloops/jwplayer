// This allows us to test modules without loading full player
window.__BUILD_VERSION__ = 0;
window.__FLASH_VERSION__ = 11.1;

var base = '';
var tests = [];
var callback;

if (!window.__karma__) {
    base = document.location.href.replace(/[^\/]+\/[^\/]*$/, '');
    tests = [base + 'test/tests'];
    callback = window.QUnit.start;

} else {
    base = '/base/';
    for (var file in window.__karma__.files) {
        if (/test\/unit\/[^\/]+\.js$/.test(file)) {
            tests.push(file);
        }
    }
    callback = window.__karma__.start;
}

// Add qunit-fixture to page if not present
if (!document.getElementById('qunit-fixture')) {
    var qunitFixture = document.createElement('div');
    qunitFixture.id = 'qunit-fixture';
    document.body.appendChild(qunitFixture);
}

var components = base + 'bower_components';
var data       = base + 'test/data';
var mock       = base + 'test/mock';
var unit       = base + 'test/unit';

require.config({

    // Browserstack is very slow.
    waitSeconds: 60,

    // Go to open source root url
    baseUrl : base + 'src/js',

    paths: {
        'templates':     '../' + 'templates',
        'css':           '../' + 'css',
        'underscore': 'utils/' + 'underscore',

        'handlebars': components + '/handlebars/handlebars.amd',
        'text':       components + '/requirejs-text/text',
        'hbars':      components + '/requirejs-handlebars/hb',
        'less':       components + '/require-less/less',
        'lessc':      components + '/require-less/lessc',
        'normalize':  components + '/require-less/normalize',
        'jquery':     components + '/jquery/dist/jquery',

        // always use test/underscore in test scripts
        'test/underscore': components + '/underscore/underscore',

        'data' : data,
        'mock' : mock,
        'unit' : unit
    },
    shim: {
        'test/underscore': {
            exports: '_'
        }
    },
    map: {
        // make sure the text plugin is used to load templates
        '*' : {
            'templates/errorscreen.html': 'hbars!templates/errorscreen.html',
            'templates/rightclick.html': 'hbars!templates/rightclick.html',
            '../css/styles.less': 'less!css/styles'
        },
        'providers/html5' : {
            'utils/video': mock + '/video.js'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: callback
});