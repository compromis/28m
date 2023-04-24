let sheetRange = "Actes!A1:G200";

const getVars = () => {
  const SPREAD_SHEET_ID = useRuntimeConfig().public.spreadsheetId;
  const GOOGLE_API_KEY = useRuntimeConfig().public.googleApiKey;

  return { SPREAD_SHEET_ID, GOOGLE_API_KEY };
};

export async function allRows() {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`;
  return await useFetch(url);
}

export async function singleRow(row) {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

  const rowRange = `Actes!A${row}:D${row}`;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${rowRange}?key=${GOOGLE_API_KEY}`;
  return await useFetch(url);
}
