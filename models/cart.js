const {Schema, model} = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError.js");
const Joi = require("joi");

const cartSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      brend: {
        type: String,
      },
      price: {
        type: String,
      },
      number: {
        type: String,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
},
{versionKey: false, timestamps: true});

cartSchema.post("save", handleMongooseError);

const Cart = model("cart", cartSchema);



const createCartSchema = Joi.object({
name: Joi.string().required(),
brend: Joi.string().required(),
price: Joi.string().required(),
number: Joi.string().required()
})

const updateCartSchema = Joi.object({
  number: Joi.string().required()
  })



const schemas = {createCartSchema,
  updateCartSchema, 
}

module.exports = {Cart,
  schemas
};


