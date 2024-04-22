import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ManagementPage() {
  const [dataArr, setDataArr] = useState([]);
  const { pageText } = useParams();
  const words = pageText.toLowerCase().replace("management", "").split(" ");
  const formattedPageText = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const navigate = useNavigate();
  const addNewHandler = (page) => {
    navigate(`/add-new/${page.toLowerCase()}`);
  };

  let pageURL =
    pageText === "hospital management"
      ? "hospitals"
      : pageText === "blood bank management"
      ? "blood banks"
      : pageText === "donor management"
      ? "person/Donor"
      : pageText === "seeker management"
      ? "person/Recipient"
      : "blood inventories";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/display/${pageURL}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        let data = await response.json();
        setDataArr(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [pageText, pageURL]);
  let dataId,
    dataName,
    dataEmail,
    dataCity,
    dataContact,
    dataBloodType,
    dataBloodUnit;

  dataId =
    pageText === "hospital management"
      ? "hospital_Id"
      : pageText === "blood bank management"
      ? "bloodbank_Id"
      : pageText === "donor management"
      ? "donor_Id"
      : pageText === "seeker management"
      ? "recipient_Id"
      : "bloodinventory_Id";
  dataName =
    pageText === "hospital management"
      ? "hospitalName"
      : pageText === "blood bank management"
      ? "bloodbankName"
      : pageText === "donor management"
      ? "donorName"
      : pageText === "seeker management"
      ? "recipientName"
      : "bloodinventoryName";
  dataEmail =
    pageText === "hospital management"
      ? "hospitalEmail"
      : pageText === "blood bank management"
      ? "bloodbankEmail"
      : pageText === "donor management"
      ? "donorEmail"
      : pageText === "seeker management"
      ? "recipientEmail"
      : "bloodinventoryEmail";
  dataContact =
    pageText === "hospital management"
      ? "hospitalContact"
      : pageText === "blood bank management"
      ? "bloodbankContact"
      : pageText === "donor management"
      ? "donorContact"
      : pageText === "seeker management"
      ? "recipientContact"
      : "bloodinventoryContact";
  dataCity =
    pageText === "hospital management"
      ? "hospitalCity"
      : pageText === "blood bank management"
      ? "bloodbankCity"
      : pageText === "donor management"
      ? "donorCity"
      : pageText === "seeker management"
      ? "recipientCity"
      : "bloodinventoryCity";
  dataBloodType =
    pageText === "donor management"
      ? "donorBloodType"
      : pageText === "seeker management"
      ? "recipientBloodType"
      : "bloodType";

  if (pageText === "blood inventory management") {
    dataBloodUnit = "bloodUnits";
  }

  const handleReject = async (id, email, name) => {
    if (pageURL === "person/Donor") {
      pageURL = "Donor";
    }
    if (pageURL === "person/Recipient") {
      pageURL = "Recipient";
    }
    try {
      const response = await fetch(`/api/delete/${pageURL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      if (pageURL === "Donor" || pageURL === "Recipient") {
        const rejectionEmailResponse = await fetch(
          `/send/reject/email/${pageURL}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              recipientEmail: email,
              recipientName: name,
            }), // Assuming you have access to item[dataEmail]
          }
        );
        if (!rejectionEmailResponse.ok) {
          throw new Error("Failed to send rejection email");
        }
        alert("Application Rejected and Email Sent");
      } else {
        alert("Entry Deleted");
      }

      const newDataArr = dataArr.filter((item) => item[dataId] !== id);
      setDataArr(newDataArr);
    } catch (error) {
      console.error("Error deleting entry:", error.message);
    }
  };

  const duplicateData = async (
    email,
    name,
    contact,
    city,
    bloodType,
    pageURL
  ) => {
    const response = await fetch(`/api/duplicate/${pageURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DuplicateName: name,
        DuplicateEmail: email,
        DuplicateContact: contact,
        DuplicateCity: city,
        DuplicateBloodType: bloodType,
      }),
    });

    if (response.ok) {
      alert("Data Duplicated");
    } else {
      throw new Error("Failed to duplicate");
    }
  };

  const deleteEntry = async (id, pageURL) => {
    try {
      const response = await fetch(`/api/delete/${pageURL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      const newDataArr = dataArr.filter((item) => item[dataId] !== id);
      setDataArr(newDataArr);
    } catch (error) {
      console.error("Error deleting entry:", error.message);
    }
  };
  const handleAcceptance = async (
    id,
    name,
    email,
    contact,
    city,
    bloodType
  ) => {
    if (pageURL === "person/Donor") {
      pageURL = "Donor";
    }
    if (pageURL === "person/Recipient") {
      pageURL = "Recipient";
    }
    const acceptanceEmailResponse = await fetch(
      `/send/accept/email/${pageURL}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientEmail: email, recipientName: name }), // Assuming you have access to item[dataEmail]
      }
    );
    if (!acceptanceEmailResponse.ok) {
      throw new Error("Failed to send acceptance email");
    }
    alert("Application Accepted and Email Sent");

    duplicateData(email, name, contact, city, bloodType, pageURL);
    deleteEntry(id, pageURL);
  };

  const headStyle =
    "text-white bg-red-800 border-2 border-grey-600 text-center px-4 py-2 font-semibold text-lg";
  const dataStyle = "px-4 py-1 border-2 border-grey-600";

  const handleUpdate = (
    id,
    name,
    email,
    contact,
    city,
    bloodUnit,
    bloodType
  ) => {
    navigate(`/update/${pageText}`, {
      state: {
        formData: {
          id: id,
          name: name,
          email: email,
          contact: contact,
          city: city,
          bloodUnit: bloodUnit,
          bloodType: bloodType,
        },
      },
    });
  };
  return (
    <>
      <div className="bg-oatmeal w-full text-red-700 font-bold text-center text-4xl pt-7 pb-2">
        {formattedPageText} Report
      </div>
      <div className="w-3/4 m-auto font-bold pt-8 pb-3 text-2xl">
        {`All ${formattedPageText} Report`}
      </div>
      <hr className="w-3/4 m-auto" />
      <div className="flex justify-end px-20 my-4">
        <button
          className="w-max px-4 py-2 rounded-xl text-white bg-red-800 text-lg font-semibold hover:bg-red-600"
          onClick={() => {
            addNewHandler(formattedPageText);
          }}
        >
          Add New {formattedPageText}
        </button>
      </div>
      {dataArr.length === 0 ? (
        <div className="col-span-3 flex justify-center items-center text-red-600 flex-col gap-5">
          <div className="font-bold text-4xl my-24">No Data to Display</div>
        </div>
      ) : (
        <table className="w-5/6 m-auto mb-12">
          <thead>
            <tr>
              <th className={headStyle}>ID</th>
              <th className={headStyle}>{formattedPageText} Name</th>
              <th className={headStyle}>Contact Number</th>
              <th className={headStyle}>Email</th>
              <th className={headStyle}>City</th>
              {pageText === ("donor management" || "seeker management") ? (
                <th className={headStyle}>Blood Type</th>
              ) : pageText === "blood inventory management" ? (
                <>
                  <th className={headStyle}>Blood Type</th>
                  <th className={headStyle}>Blood Unit</th>
                </>
              ) : (
                <></>
              )}
              <th className={headStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataArr.map((item) => (
              <tr key={item[dataId]} className="h-min">
                <td className={dataStyle}>{item[dataId]}</td>
                <td className={dataStyle}>{item[dataName]}</td>
                <td className={dataStyle}>{item[dataContact]}</td>
                <td className={dataStyle}>{item[dataEmail]}</td>
                <td className={dataStyle}>{item[dataCity]}</td>
                {pageText === ("donor management" || "seeker management") ? (
                  <td className={`${dataStyle} text-center`}>
                    {item[dataBloodType]}
                  </td>
                ) : pageText === "blood inventory management" ? (
                  <>
                    <td className={`${dataStyle} text-center`}>
                      {item[dataBloodType]}
                    </td>
                    <td className={`${dataStyle} text-center`}>
                      {item[dataBloodUnit]}
                    </td>
                  </>
                ) : (
                  <></>
                )}
                <td
                  className={`${dataStyle} grid justify-between gap-x-4 grid-cols-2 items-center`}
                >
                  <button
                    onClick={() => {
                      if (
                        pageText === "donor management" ||
                        pageText === "seeker management"
                      ) {
                        handleAcceptance(
                          item[dataId],
                          item[dataName],
                          item[dataEmail],
                          item[dataContact],
                          item[dataCity],
                          item[dataBloodType]
                        );
                      } else {
                        handleUpdate(
                          item[dataId],
                          item[dataName],
                          item[dataEmail],
                          item[dataContact],
                          item[dataCity],
                          item[dataBloodUnit],
                          item[dataBloodType]
                        );
                      }
                    }}
                  >
                    {pageText === "donor management" ||
                    pageText === "seeker management" ? (
                      <span className="font-extrabold text-xl">&#9989;</span>
                    ) : (
                      <span className="font-extrabold text-xl">&#x270E;</span>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      handleReject(
                        item[dataId],
                        item[dataEmail],
                        item[dataName]
                      )
                    }
                  >
                    <span className="font-extrabold text-xl">&#10060;</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ManagementPage;
