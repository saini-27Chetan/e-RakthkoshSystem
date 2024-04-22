import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Button from "../Button";

const UpdateFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const pageText = params.pageText;
  const { formData } = location.state || {};
  const { id, name, email, contact, city, bloodUnit, bloodType } = formData;
  const initialFormData = {
    name: name,
    email: email,
    contact: contact,
    city: city,
    bloodType: bloodType,
    bloodUnits: bloodUnit,
    address: "",
  };
  const [updateFormData, setUpdateFormData] = useState(initialFormData);

  const words = pageText.toLowerCase().split(" ");
  const formattedPageText = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const updatePageText =
    formattedPageText === "Hospital Management"
      ? "Hospital"
      : formattedPageText === "Blood Inventory Management"
      ? "Blood Inventory"
      : "Blood Bank";

  console.log(pageText);
  if (!formData) {
    return (
      <div>
        <p>No data found for updating.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const labelStyle = `font-bold text-lg text-right py-2 px-4`;
  const inputStyle = `p-2 border-2 border-gray-300 rounded`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pageURL =
      updatePageText === "Hospital"
        ? "hospital"
        : updatePageText === "Blood Bank"
        ? "bloodbank"
        : "bloodinventory";
    try {
      const apiUrl = `/api/admin/update/${pageURL}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataId: id, formData: updateFormData }),
      });

      if (response.ok) {
        alert("Data Updated Successfully");
        setUpdateFormData(initialFormData);
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update data");
    }
    navigate(`/management/${pageText}`);
  };
  const handleCancel = () => {
    alert("Canceling the updation of the form");
    navigate(`/management/${pageText}`);
  };
  return (
    <>
      <div className="bg-oatmeal w-full text-red-700 font-bold text-center text-4xl pt-7 pb-2">
        Update {updatePageText}
      </div>
      <div className="w-3/4 m-auto font-bold pt-8 pb-3 text-2xl">
        {updatePageText} Registration
      </div>
      <hr className="w-3/4 m-auto pb-4" />
      <div className="w-3/5 m-auto">
        <form className="grid grid-cols-2 w-4/5 m-auto py-6 px-4 rounded gap-y-4">
          {updatePageText === "Blood Inventory" && (
            <>
              <label htmlFor="bloodType" className={labelStyle}>
                Enter Blood Type:
              </label>
              <input
                type="text"
                id="bloodType"
                name="bloodType"
                value={updateFormData.bloodType}
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
                value={updateFormData.bloodUnits}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Enter Number of Blood Units"
              />
            </>
          )}

          <label htmlFor="name" className={labelStyle}>
            Enter {updatePageText} Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updateFormData.name}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Name"
          />

          <label htmlFor="email" className={labelStyle}>
            Enter {updatePageText} Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={updateFormData.email}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Email"
          />

          <label htmlFor="contact" className={labelStyle}>
            Enter {updatePageText} Contact Number:
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={updateFormData.contact}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Contact"
          />

          <label htmlFor="city" className={labelStyle}>
            Enter {updatePageText} City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={updateFormData.city}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter City"
          />

          <label htmlFor="address" className={labelStyle}>
            Enter {updatePageText} Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={updateFormData.address}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter Address"
          />

          <div className="flex justify-between col-start-2">
            <Button title={"Submit"} type={"submit"} onClick={handleSubmit} />
            <Button type={"reset"} title={"Cancel"} onClick={handleCancel} />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateFormPage;