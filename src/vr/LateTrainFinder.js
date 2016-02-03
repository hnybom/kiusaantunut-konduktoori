/**
 * Created by hnybom on 2.2.2016.
 */
'use strict';

var moment = require('moment');
var digiApi = require('../vr/DigiTrarfficAPI.js');
var tweeter = require('../twitter/Tweeter.js');

exports.handleTrainData = function(trainData) {
    console.log('jee: ' + digiApi.getStationData("ÄKI"));
    var now = new Date();
    var oneMinuteAgo = moment(now).subtract(15, 'seconds');
    var oneMinuteFromNow = moment(now).add(15, 'seconds');

    var lateData = trainData.filter(function(train) {
        return'Long-distance' === train.trainCategory;
    }).map(function(item) {
        var lateFrom = item.timeTableRows.filter(function(row) {
            if(row.type === 'ARRIVAL') {
                return moment(row.scheduledTime).isBetween(oneMinuteAgo, oneMinuteFromNow) && row.differenceInMinutes > 4;
            }
        });

        return {
            originalItem: item,
            isLateNow: lateFrom
        }
    }).filter(function(data) {
        return data.isLateNow.length > 0;
    });

    lateData.forEach(function(item) {
        var lateSchedule = item.isLateNow[0];
        var stationData = digiApi.getStationData(lateSchedule.stationShortCode);
        tweeter.tweet('Hyvvää päivää Konnari tässä! Juna ' + item.originalItem.trainType + item.originalItem.trainNumber
            + ' on ' + lateSchedule.differenceInMinutes
            + ' minnuuttia myöhässä asemalla ' + stationData.stationName + ', voi voi. Pahoittelut!');
    });

};