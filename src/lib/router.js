'use strict';
/* globals App */

var fs = require('fs');
var path = require('path');

var routerLogger = App.Lib('init-routers-logger');

var routesDir = path.resolve(__dirname, '../routes');
var validRouterFile = 'index.js';
var ignoredInvalidRouters = ['.swp', '.DS_Store'];

function findRouters(rPath, app) {
    // Get array of files and directories in currrent path
    var dirs = fs.readdirSync(path.resolve(rPath));
    dirs.forEach(function(dir) {
        var fullPath = path.resolve(rPath, dir);
        if (fs.statSync(fullPath).isDirectory()) {
            // Recurse if we have not ended up at a file yet
            findRouters(fullPath, app);
        } else {
            var fileName = fullPath.split('/')[fullPath.split('/').length - 1];

            var currentPath = '/' + fullPath
                // remove everything up to and including '/routes'
                .replace(routesDir + '/', '')
                // remove '/index.js' ending
                .replace('/' + validRouterFile, '')
                // replace all '$'s with ':'s
                .replace(/\$/g, ':')
                // get '/' from '/index.js' if we are on root endpoint
                .replace(validRouterFile, '');

            if (fileName === validRouterFile) {
                var currentRouter = require(fullPath);
                currentRouter.stack.forEach(function(router) {
                    routerLogger(router, currentPath);
                });
                // console.log(currentRouter.stack[0].name);
                app.use(currentPath, currentRouter);
            } else {
                if (ignoredInvalidRouters.indexOf(path.extname(fileName)) === -1) {
                    console.log('Error'.red + ': encountered invalid router file → ' + currentPath.red + '/'.red + fileName.red);
                }
            }
        }
    });
}

module.exports = {
    init: function(app) {
        console.log('==== '.green + 'Setting up routes and middlewares'.italic.yellow + ' ===='.green);
        findRouters(routesDir, app);
        console.log('==== '.green + 'All routes and middlewares initialized'.italic.yellow + ' ===='.green);
    }
};
