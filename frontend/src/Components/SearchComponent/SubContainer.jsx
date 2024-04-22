import React, { useState, useEffect } from "react";
import { titleCaseWord } from "./Formatting";
import SearchBoxContainer from "./SearchBoxContainer";
import DisplayInfo from "./DisplayInfo";

function SubContainer({ pageText }) {
  const [searchValue, setSearchValue] = useState("");
  const [flag, setFlag] = useState(false);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value === "") {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };

  const handleReset = () => {
    setSearchValue("");
    setFlag(false);
  };

  useEffect(() => {
    setFlag(false);
  }, [pageText]);

  return (
    <>
      <div className="mt-12 m-auto w-3/4">
        <div className="text-3xl font-bold">All {titleCaseWord(pageText)}</div>
        <div className="text-xl text-gray-700 my-6">
          These are all available {pageText}.
        </div>
        <SearchBoxContainer
          pageText={pageText}
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      <div className="m-auto mt-10">
        <DisplayInfo
          pageText={pageText}
          searchValue={searchValue}
          flag={flag}
        />
      </div>
    </>
  );
}

export default SubContainer;
