const { default: mongoose } = require("mongoose")


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
            unique: true,
            minlength: [3, 'username must be at least characters long']
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            minlength: [6, "Email must be at least 6 characters long"]
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [5, "password must  be  at least 5 characters long"]
        }
    }
)
const user = mongoose.model('user', userSchema)

module.exports = user;