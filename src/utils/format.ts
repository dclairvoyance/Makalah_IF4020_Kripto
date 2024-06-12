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

  formattedDateTime.setHours(21);
  formattedDateTime.setMinutes(40);
  formattedDateTime.setSeconds(49);

  return (
    formattedDateTime.toISOString().split("T")[0] +
    " " +
    String(formattedDateTime.getHours()).padStart(2, "0") +
    ":" +
    String(formattedDateTime.getMinutes()).padStart(2, "0") +
    ":" +
    String(formattedDateTime.getSeconds()).padStart(2, "0")
  );
}
