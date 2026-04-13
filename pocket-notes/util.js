 function convertDate(stringDate) {
  const date = new Date(stringDate);
  const day = date.toLocaleString("en-IN", { day: "2-digit" });
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.toLocaleString("en-IN", { year: "numeric" });
  return `${day} ${month}, ${year}`;
}