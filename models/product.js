const {Schema, model} = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError.js");

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      brend: {
        type: String,
      },
      price: {
        type: String,
      }
},
{versionKey: false, timestamps: true});

productSchema.post("save", handleMongooseError);

const Product = model("product", productSchema);


module.exports = {Product};


