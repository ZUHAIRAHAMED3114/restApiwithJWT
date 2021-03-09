const mongoose = require('mongoose');
const mongooseTimeStamp = require('mongoose-timestamp')



const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true

    },
    balance: {
        type: Number,
        default: 0
    }
})

customerSchema.plugin(mongooseTimeStamp);
const Customer = new mongoose.model('customer', customerSchema)
module.exports = Customer;