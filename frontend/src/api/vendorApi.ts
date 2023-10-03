import { Vendor } from "@/data/vendor-details";
const BACKEND_URL = "https://vendor-manager-rho.vercel.app"
// const BACKEND_URL = "http://localhost:8000"
// const BACKEND_URL = "http://192.168.18.5:8000"

// Fetch vendors
const fetchVendors = async () => {
    const response = await fetch(BACKEND_URL + "/api/vendors"); // Replace with your actual API endpoint
    return await response.json();
};

// Add a vendor
const addVendor = async (newVendor: Vendor) => {
    const response = await fetch(BACKEND_URL + "/api/new-vendor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newVendor),
    });

    if (!response.ok) {
        throw new Error("Error adding vendor");
    }

    return await response.json();
};

// Update a vendor
const updateVendor = async (updatedVendor: Vendor) => {
    const response = await fetch(BACKEND_URL + "/api/update-vendor", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVendor),
    });

    if (!response.ok) {
        throw new Error("Error updating vendor");
    }

    return await response.json();
};

// Delete a vendor
const deleteVendor = async (_id: string) => {
    const response = await fetch(`${BACKEND_URL}/api/delete-vendor`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
    });

    if (!response.ok) {
        throw new Error("Error deleting vendor");
    }
};

export { deleteVendor, fetchVendors, addVendor, updateVendor };

