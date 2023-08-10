import { google } from "googleapis";
export async function getSongs() {
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const privateKey = (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(
      /\\n/g,
      "\n",
    );

    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      privateKey,
      target,
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "songs!A2:H", // sheet name
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows.map((row) => ({
        uuid: row[0],
        artist: row[1],
        title: row[3],
        year: row[5],
        downloadLink: row[6],
        viewLink: row[7],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}
