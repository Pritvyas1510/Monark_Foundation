const formatDOBPassword = (dob) => {
  if (!dob) throw new Error("DOB missing");

  const date = new Date(dob);
  if (isNaN(date)) throw new Error("Invalid DOB");

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}${month}${year}`;
};

export default formatDOBPassword;
