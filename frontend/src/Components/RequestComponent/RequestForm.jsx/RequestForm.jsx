import React, { useState, useEffect, useMemo } from "react";
import Button from "../../Button";

function RequestForm({ pageText }) {
  const initialFormData = useMemo(
    () => ({
      name: "",
      bloodGroup: "",
      age: "",
      city: "",
      state: "",
      email: "",
      contactNumber: "",
      address: "",
      description: "",
    }),
    []
  );
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [pageText, initialFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isEmpty = Object.values(formData).some((value) => value === "");

    if (isEmpty) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      let apiUrl = "";
      if (pageText === "want to donate") {
        apiUrl = `/api/submit/${pageText}`;
      } else {
        apiUrl = `/api/submit/${pageText}`;
      }

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

  const handleReset = (event) => {
    event.preventDefault();
    setFormData(initialFormData);
    alert("Form Reset Successfully");
  };

  const labels = {
    name: pageText === "want to donate" ? "Donor Name" : "Patient Name",
    bloodGroup:
      pageText === "want to donate"
        ? "Donor's Blood Group"
        : "Need Blood Group",
    age: pageText === "want to donate" ? "Select Age" : "Patient Age",
    city: pageText === "want to donate" ? "Donor City" : "Patient City",
    state: pageText === "want to donate" ? "Donor State" : "Patient State",
    email: "Contact Email",
    contactNumber: "Contact Number",
    address: pageText === "want to donate" ? "Full Address" : "Full Address",
    description: "Description/ Requirement",
  };

  return (
    <form className="mt-4 mb-4 w-1/2 m-auto" onSubmit={handleSubmit}>
      <table className="w-full">
        <tbody>
          {Object.keys(labels).map((key) => (
            <tr key={key}>
              <td className="pr-2 pb-2 font-bold text-gray-700 w-1/3">
                {labels[key]}
              </td>
              <td className="pb-2 w-auto">
                {key === "bloodGroup" ? (
                  <select
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="O+">O+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="O-">O-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                  </select>
                ) : (
                  <input
                    type={key === "age" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded px-3 py-2 w-full"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 mb-2">
        <div className="mx-auto relative left-20">
          <Button title={"Submit"} type={"submit"} />
        </div>
        <div className="mx-auto relative right-20">
          <Button type={"reset"} onClick={handleReset} title={"Reset"} />
        </div>
      </div>
    </form>
  );
}

export default RequestForm;
