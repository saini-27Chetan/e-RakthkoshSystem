export const titleCaseWord = (word) => {
  if (word === null || word === "") return false;
  else word = word.toString();

  return word.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const formatWord = (word) => {
  let titleWord = titleCaseWord(word);

  return titleWord.endsWith("s")
    ? titleWord === "Blood Inventories"
      ? "Blood Inventory"
      : titleWord.slice(0, -1)
    : titleWord;
};
