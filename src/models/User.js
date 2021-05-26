import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    socialOnly: { type: Boolean, default: false},
    username: { type: String, required: true, unique: true},
    password: { type: String},
    name: [{type: String, required: true }],
    location: String,
    },
);

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5); // await 키워드를 사용하므로 콜백함수는 불필요
});

const User = mongoose.model("User", userSchema);
export default User;