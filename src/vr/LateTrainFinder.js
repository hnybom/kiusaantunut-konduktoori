/**
 * Created by hnybom on 2.2.2016.
 */
'use strict';

var moment = require('moment');

exports.handleTrainData = function(trainData) {

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
    });

    lateData.forEach(function(item) {
      if(item.isLateNow.length > 0) {
          console.log(item.isLateNow);
      }
    });

};