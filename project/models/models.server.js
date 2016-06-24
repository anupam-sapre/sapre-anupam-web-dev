module.exports = function() {

    /*var connectionString = 'mongodb://127.0.0.1:27017/jobConnector';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    var mongoose = require('mongoose');
    mongoose.connect(connectionString);*/

    var models = {
        projUserModel: require("./user/user.model.server")(),
        jobModel:require("./job/job.model.server")(),
        reviewModel:require("./review/review.model.server")()
    };
    return models;
};