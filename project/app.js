module.exports = function(app) {

    var models = require("./models/models.server")();
    require("./services/user.service.server.js")(app,models);
    require("./services/job.service.server.js")(app,models);
    require("./services/review.service.server.js")(app,models);

};
