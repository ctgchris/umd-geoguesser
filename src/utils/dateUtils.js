export const formatDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getNextDay = (dateStr) => {
  const currentDate = new Date(dateStr + "T00:00:00");
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  return formatDate(nextDay);
};

export const getPrevDay = (dateStr) => {
  const currentDate = new Date(dateStr + "T00:00:00");
  const prevDay = new Date(currentDate);
  prevDay.setDate(currentDate.getDate() - 1);
  return formatDate(prevDay);
};

export const getESTDateTime = () => {
  const now = new Date();
  const estOffset = -5;
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * estOffset));
}; 