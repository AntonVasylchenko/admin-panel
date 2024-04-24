import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide product title"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        default: 0
    },
    description: {
        type: String
    },
    images: {
        type: [String],
    },
    tags: {
        type: [String]
    }
}, { timestamps: true });

ProductSchema.pre('save', async function(next) {
    const isUniqueName = await isUniqName(this.title);
    if (isUniqueName) {
      throw new Error("Product name has already existed");
    }
    next()
});

export const Product =  mongoose.model("Product", ProductSchema);

async function isUniqName(title) {
    const product = await Product.findOne({title});
    return  product ? true : false 
}


