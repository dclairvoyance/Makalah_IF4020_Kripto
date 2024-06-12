export function formatToRupiah(number: number): string {
  let formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  formattedNumber = formattedNumber.replace("Rp", "").trim();
  let parts = formattedNumber.split(",");
  let rupiah = parts[0].replace(/\./g, ".");
  return `Rp${rupiah}`;
}

export function formatTime(dateTime: string): string {
  const formattedDateTime = new Date(dateTime);

  const year = formattedDateTime.getFullYear();
  const month = String(formattedDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDateTime.getDate()).padStart(2, "0");
  const hours = String(formattedDateTime.getHours() + 7).padStart(2, "0");
  const minutes = String(formattedDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(formattedDateTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
