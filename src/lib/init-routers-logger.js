'use strict';
var spacer = 8;
var endpointColour = 'green';
var arrowColour = 'yellow';

function strRepeat(s, n) {
    var st = '';
    for (let i = 0; i < n; i++) {
        st += s;
    }
    return st;
}

function colorize(method) {
    switch (method) {
        case 'GET'  : return 'blue';
        case 'POST' : return 'magenta';
        case 'MW'   : return 'cyan';
        default     : return 'white';
    }
}

function arrowify(method) {
    switch (method) {
        case 'GET'  : return '→ ';
        case 'POST' : return '⇴ ';
        case 'PUT'  : return '⇴ ';
        case 'MW'   : return '↝ ';
        case 'dash' : return '⇢ ';
        default     : return '→ ';
    }
}

module.exports =  function routerLogger (r, endpoint) {
    if (r.route) {
        var method = r.route.stack[0].method.toUpperCase();
        var routeLog = '  ' + arrowify(method)[arrowColour];
        routeLog += method[colorize(method)] + strRepeat(' ', spacer - method.length) + endpoint[endpointColour];
        if (r.route.path !== '/') {
            routeLog += r.route.path[endpointColour];
        }
        console.log(routeLog);
    } else {
        var middlewareLog = '  ' + arrowify('MW')[arrowColour];
        middlewareLog += 'MW'[colorize('MW')] + strRepeat(' ', spacer - 'MW'.length);
        middlewareLog += endpoint[endpointColour] + '/**/* '[endpointColour] + arrowify('dash')[arrowColour];
        middlewareLog += r.name.cyan;
        console.log(middlewareLog);
    }
};
