"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendorById = exports.updateVendor = exports.createNewVendor = exports.getVendors = void 0;
const errHandler_1 = __importDefault(require("../middlewares/errHandler"));
const vendorModel_1 = __importDefault(require("../models/vendorModel"));
exports.getVendors = (0, errHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allVendors = yield vendorModel_1.default.find();
    res.status(200).json({ vendors: allVendors });
}));
exports.createNewVendor = (0, errHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, accountNumber, bankName, address1, address2, city, country, zipcode } = req.body;
    const newVendor = new vendorModel_1.default({ name, accountNumber, bankName, address1, address2, city, country, zipcode });
    const resData = yield newVendor.save();
    res.status(201).json({ message: "New Vendor created" });
}));
exports.updateVendor = (0, errHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, id, name, accountNumber, bankName, address1, address2, city, country, zipcode } = req.body;
    const vendor = yield vendorModel_1.default.findById(_id);
    if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
    }
    vendor.id = id || vendor.id;
    vendor.name = name || vendor.name;
    vendor.accountNumber = accountNumber || vendor.accountNumber;
    vendor.bankName = bankName || vendor.bankName;
    vendor.address1 = address1 || vendor.address1;
    vendor.address2 = address2 || vendor.address2;
    vendor.city = city || vendor.city;
    vendor.country = country || vendor.country;
    vendor.zipcode = zipcode || vendor.zipcode;
    yield vendor.save();
    res.status(200).json({ message: "Vendor updated successfully", vendor });
}));
exports.deleteVendorById = (0, errHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const response = yield vendorModel_1.default.deleteOne({ _id });
    res.status(200).json({ response });
}));
