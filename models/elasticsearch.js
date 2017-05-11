var elasticsearch = require('elasticsearch');
var esclient =  require('./esconnection');
var orgnodelogger = require('../models/logger');
var path = require('path');
const uuidV1 = require('uuid/v1');



module.exports = {
    // Index the task
    addTask: function(params, user) {
        var uuid = uuidV1();
        console.log("" + orgnodelogger.datefile(path.basename(__filename)) + "addTask\tTask ID" + uuid + "\tENTRY");
        console.log(params,user);
        esclient.index({
            index: 'task',
            type: 'task',
            id: uuid,
            body: {
                //TODO: add user id
                "Task_ID": uuid,
                "Task_Name": params.taskName,
                "Start_Date": params.startDate,
                "End_Date": params.endDate,
                "Duration": params.duration,
                "Percent_Complete": params.percentComplete,
                "ispublic": ((user==null)?true:params.ispublic),
                "admin": [((user==null)?null:user.username)],
                "viewer":[]
            }
        },function(err,resp,status) {
            console.log("" + orgnodelogger.datefile(path.basename(__filename)) + "addTask\tTask ID" + uuid + "\tresponse:");
            console.log(resp);
        });
    },
    findByUser: function(user){
        console.log("" + orgnodelogger.datefile(path.basename(__filename)) + "findByUser\tuser: " + user);
        var hits = null;
        var resultsObj = new Object();
        esclient.search({
            index: 'task',
            body: {
                query : {
                    bool : {
                        should: [
                            { term : { ispublic : "true" } },
                            { term : { admin : "admin" } }
                        ],
                        minimum_should_match : 1,
                        boost : 1.0
                    }
                }
            }
        }, function (error, response) {
            if (error){
                console.log(error.message);
            }
            else {
                var results = response.hits.hits;
                for (i = 0; i < results.length; i++) {
                    resultsObj[i] = results[i]._source;
                }
                console.log(orgnodelogger.datefile(path.basename(__filename)) + "findByUser\tuser: " + user + "\tresponse:");
                console.log(resultsObj);
            }
        });
    }
};
