/**
 * Created by hnybom on 2.2.2016.
 */
'use strict';

var http = require('http');
var schedule = require('node-schedule');
var lateTrain = require('./LateTrainFinder.js');

schedule.scheduleJob('*/1 * * * *', function() {

    http.get({
        host: 'rata.digitraffic.fi',
        path: '/api/v1/live-trains'
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var trainInfo = JSON.parse(body);
            lateTrain.handleTrainData(trainInfo);
        });
    });
});
