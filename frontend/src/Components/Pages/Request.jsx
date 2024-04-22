import React from "react";
import { useParams } from "react-router-dom";
import CommonSubHead from "../CommonSubHead";
import RequestHead from "../RequestComponent/RequestForm.jsx/RequestHead";
import RequestForm from "../RequestComponent/RequestForm.jsx/RequestForm";

function Request() {
  const { pageText } = useParams();

  return (
    <div>
      <CommonSubHead pageText={pageText} />
      <RequestHead pageText={pageText} />
      <RequestForm pageText={pageText} />
    </div>
  );
}

export default Request;
