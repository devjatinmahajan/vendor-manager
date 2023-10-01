const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String
    },
    zipcode: {
        type: String,
    },
}, { timestamps: true })

export default mongoose.model("Vendor", vendorSchema);