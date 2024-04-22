import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../Button";

function AddNew() {
  const { pageText } = useParams();
  const words = pageText.toLowerCase().split(" ");
  const formattedPageText = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const updatedText =
    formattedPageText === "Seeker"
      ? "Recipient"
      : formattedPageText === "Blood Inventory"
      ? "Blood Inventory"
      : formattedPageText;

  const labelStyle = `font-bold text-lg text-right py-2 px-4`;
  const inputStyle = `p-2 border-2 border-gray-300 rounded`;

  const initialFormData = {
    name: "",
    email: "",
    contact: "",
    city: "",
    bloodType: "",
    bloodUnits: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = `/api/admin/submit/${pageText}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form Submitted Successfully");
        setFormData(initialFormData);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    alert("Form Reset Successfully");
  };

  return (
    <>
      <div className="bg-oatmeal w-full text-red-700 font-bold text-center text-4xl pt-7 pb-2">
        Add New {updatedText}
      </div>
      <div className="w-3/4 m-auto font-bold pt-8 pb-3 text-2xl">
        New {updatedText} Registration
      </div>
      <hr className="w-3/4 m-auto pb-4" />
      <div className="w-3/5 m-auto">
        <form className="grid grid-cols-2 w-4/5 m-auto py-6 px-4 rounded gap-y-4">
          {pageText === "blood inventory" && (
            <>
              <label htmlFor="bloodType" className={labelStyle}>
                Enter Blood Type:
              </label>
              <input
                type="text"
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Enter Blood Type"
              />

              <label htmlFor="bloodUnits" className={labelStyle}>
                Enter Number of Blood Units:
              </label>
              <input
                type="number"
                id="bloodUnits"
                name="bloodUnits"
                value={formData.bloodUnits}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Enter Number of Blood Units"
              />
            </>
          )}

          {["donor", "seeker"].includes(pageText) && (
            <>
              <label htmlFor="bloodType" className={labelStyle}>
                Enter Blood Type:
              </label>
              <input
                type="text"
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Enter Blood Type"
              />
            </>
          )}

          <label htmlFor="name" className={labelStyle}>
            Enter {updatedText} Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Name"
          />

          <label htmlFor="email" className={labelStyle}>
            Enter {updatedText} Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Email"
          />

          <label htmlFor="contact" className={labelStyle}>
            Enter {updatedText} Contact Number:
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Contact"
          />

          <label htmlFor="city" className={labelStyle}>
            Enter {updatedText} City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter City"
          />

          <label htmlFor="address" className={labelStyle}>
            Enter {updatedText} Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Address"
          />

          <div className="flex justify-between col-start-2">
            <Button title={"Submit"} type={"submit"} onClick={handleSubmit} />
            <Button type={"reset"} title={"Reset"} onClick={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNew;
