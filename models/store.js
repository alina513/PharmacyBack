const {Schema, model} = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError.js");

const storeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      adress: {
        type: String,
      },
      phone: {
        type: String,
      }
},
{versionKey: false, timestamps: true});

storeSchema.post("save", handleMongooseError);

const Store = model("store", storeSchema);


module.exports = {Store};


