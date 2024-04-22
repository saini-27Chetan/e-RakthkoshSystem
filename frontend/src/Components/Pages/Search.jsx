import React from "react";
import { useParams } from "react-router-dom";
import CommonSubHead from "../CommonSubHead";
import SubContainer from "../SearchComponent/SubContainer";

function Search() {
  const { pageText } = useParams();

  return (
    <div className="mb-10">
      <CommonSubHead pageText={pageText} />
      <SubContainer pageText={pageText} />
    </div>
  );
}

export default Search;
