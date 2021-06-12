import Joi from "joi";
Joi.ObjectId = require("joi-objectid")(Joi);

const titleSchema = Joi.string().min(1).max(100).label("Title");

const descriptionSchema = Joi.string().min(1).max(2000).label("Description");

const priceSchema = Joi.number().min(1).label("Price");

const categorySchema = Joi.ObjectId().label("Category");

const subCategorySchema = Joi.ObjectId().label("Sub category");

const quantitySchema = Joi.number().min(1).label("Quantity");

const colorSchema = Joi.string().label("Color").allow("").optional();

const brandSchema = Joi.string().label("Brand").allow("").optional();

const imagesSchema = Joi.object();

const imageSchema = Joi.string().uri().label("Image file");

export const productSchema = Joi.object({
  brand: brandSchema,
  category: categorySchema,
  color: colorSchema,
  description: descriptionSchema,
  images: imagesSchema,
  price: priceSchema,
  quantity: quantitySchema,
  subCategory: subCategorySchema,
  title: titleSchema,
});

export {
  titleSchema,
  descriptionSchema,
  priceSchema,
  categorySchema,
  subCategorySchema,
  quantitySchema,
  imagesSchema,
  imageSchema, //done
  colorSchema,
  brandSchema,
};
