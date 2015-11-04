'use strict';
/**
 * The main configuration file.
 * 'prod' and 'dev' must both follow this schema:
 * {
 *      port: Number
 * }
 */
module.exports = {
    prod: {
        port: 10000, // do not change this
    },
    dev: {
        port: 9001,
    }
};
