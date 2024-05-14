import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minLength: 1,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    minLength: 1,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "demo"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
});

CustomerSchema.pre("save", async function() {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
CustomerSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };

export const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
