export const useDate = (date) => {
  const { locale } = useI18n();
  const thisDate = typeof date === "object" ? date : new Date(date);

  const months = {
    val: [
      "gener",
      "febrer",
      "març",
      "abril",
      "maig",
      "juny",
      "juliol",
      "agost",
      "setembre",
      "octubre",
      "novembre",
      "decembre",
    ],
    cas: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
  };

  const year = ref(thisDate.getFullYear());
  const month = ref(thisDate.getMonth() + 1);
  const day = ref(thisDate.getDate());
  const monthName = ref(months[locale.value][thisDate.getMonth()]);
  const time = ref(
    `${thisDate.getHours().toString().padStart(2, "0")}:${thisDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`
  );

  return { year, month, monthName, day, time };
};
