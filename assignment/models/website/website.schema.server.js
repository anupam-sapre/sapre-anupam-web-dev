module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./../page/page.schema.server");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
        pages: [PageSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};
