export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatBedrag(bedrag) {
  if (bedrag % 1 === 0) {
    return bedrag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  } else {
    return bedrag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}