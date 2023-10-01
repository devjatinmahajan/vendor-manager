import { Router } from "express";
import { createNewVendor, deleteVendorById, getVendors, updateVendor } from "../controllers/vendors";
const router = Router();

router.post("/new-vendor", createNewVendor)
router.get("/vendors", getVendors)
router.put("/update-vendor", updateVendor);
router.delete("/delete-vendor", deleteVendorById);

export default router;