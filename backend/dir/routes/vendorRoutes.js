"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendors_1 = require("../controllers/vendors");
const router = (0, express_1.Router)();
router.post("/new-vendor", vendors_1.createNewVendor);
router.get("/vendors", vendors_1.getVendors);
router.put("/update-vendor", vendors_1.updateVendor);
router.delete("/delete-vendor", vendors_1.deleteVendorById);
exports.default = router;