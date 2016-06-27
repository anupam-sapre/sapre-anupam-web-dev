module.exports = function (mongoose) {

    var mongoose = require("mongoose");
    var reviewSchema = mongoose.Schema({

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectUser'
        },
        username:String,
        jobkey:String,
        title:String,
        rating: Number,
        date_posted:{type: Date, default: Date.now},
        review: String,

    }, {collection: 'proj.review'});

    // returning Schema
    return reviewSchema;

};