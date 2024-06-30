const {Schema, model} = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError.js");

const reviewSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      period: {
        type: String,
      },
      description: {
        type: String,
      },
      raiting: {
        type: String,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'product',
      }
},
{versionKey: false, timestamps: true});

reviewSchema.post("save", handleMongooseError);

const Review = model("review", reviewSchema);


module.exports = {Review};
