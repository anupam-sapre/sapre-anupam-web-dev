module.exports = function() {
    var mongoose = require("mongoose");
    var PageSchema = require("./../page/page.schema.server");
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        type: {type:String, enum:['HEADING','IMAGE','YOUTUBE','HTML','TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable:Boolean,
        formatted: Boolean,
        priority: {type: Number, default: 0},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};
