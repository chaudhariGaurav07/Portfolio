import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true 
    },
    email : {
        type: String,
        required: true,
        unique: true 
    },
    password : {
        type: String,
        required: true
    },
    role: {
    type: String,
    default: "admin"
  }
})

// Hash password before saving
 userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
 })

//comapre password method
userSchema.methods.comparePassword =  async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
};

export const User = mongoose.model("User", userSchema);