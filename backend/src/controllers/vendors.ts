import { Request, Response, NextFunction } from "express";
import errHandler from "../middlewares/errHandler";
import vendorModel from "../models/vendorModel";

export const getVendors = errHandler(async (req: Request, res: Response, next: NextFunction) => {
    const allVendors = await vendorModel.find()
    res.status(200).json({ vendors: allVendors })
});

export const createNewVendor = errHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, accountNumber, bankName, address1, address2, city, country, zipcode }: {
        name: string,
        accountNumber: string,
        bankName: string,
        address1: string,
        address2: string,
        city: string,
        country: string,
        zipcode: number
    } = req.body;
    const newVendor = new vendorModel({ name, accountNumber, bankName, address1, address2, city, country, zipcode })
    const resData = await newVendor.save();
    res.status(201).json({ message: "New Vendor created" })
});

export const updateVendor = errHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, accountNumber, bankName, address1, address2, city, country, zipcode }: {
        id: string,
        name: string,
        accountNumber: string,
        bankName: string,
        address1: string,
        address2: string,
        city: string,
        country: string,
        zipcode: number
    } = req.body;

    const vendor = await vendorModel.findById(id);
    if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.name = name || vendor.name;
    vendor.account = accountNumber || vendor.account;
    vendor.bank = bankName || vendor.bank;
    vendor.address1 = address1 || vendor.address1;
    vendor.address2 = address2 || vendor.address2;
    vendor.city = city || vendor.city;
    vendor.country = country || vendor.country;
    vendor.zip = zipcode || vendor.zip;

    await vendor.save();
    res.status(200).json({ message: "Vendor updated successfully", vendor });
});

export const deleteVendorById = errHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id }: { id: string } = req.body;
    const response = await vendorModel.deleteOne({ _id: id });
    res.status(200).json({ response })
})