const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const topicSchema = new Schema({
    technology: {
        type: {type:String, required:true},
        value: {type:String, required:true}
    },
    title: {type:String, require:true},
    description: {type:String, required: true}
});

module.exports = mongoose.model('topics', topicSchema);

// const techSchema = new Schema({
//     name: {type: String, unique: true, required: true},
//     topics: [{ type: Schema.Types.ObjectId, ref: 'topics' }]
// });

// module.exports.technology = mongoose.model('technology', techSchema);