import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface InputField {
  id: string;
  label: string;
  required?: boolean;
}

const inputFields: InputField[] = [
  { id: "name", label: "Vendor Name", required: true },
  { id: "accountNumber", label: "Account Number", required: true },
  { id: "bankName", label: "Bank Name" },
  { id: "address1", label: "Address Line 1" },
  { id: "address2", label: "Address Line 2" },
  { id: "city", label: "City" },
  { id: "country", label: "Country" },
  { id: "zipcode", label: "Zip" },
];

export default function NewVendorForm() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Access the input values in formData object
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {inputFields.map((field) => (
        <div className="flex flex-col gap-2" key={field.id}>
          <label htmlFor={field.id} className="text-primary">
            {field.label}
          </label>
          <Input
            required={field.required}
            className="shadow-none focus-visible:ring-0 h-8"
            id={field.id}
            value={formData[field.id] || ""}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <Button type="submit" variant="default">
        Save
      </Button>
    </form>
  );
}
