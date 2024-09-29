export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getDate())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
