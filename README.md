# jamsite

A searchable song packet directory!

## Dev Environment Setup

### Create Virtual Environment

`git clone` the repo and `cd` into it.

```
cd ~/your/projects/folder/
git clone git@github.com:bekki/jamsite2.git
cd jamsite2
```

### Google API credentials

You need the Google API to read [the spreadsheet](https://docs.google.com/spreadsheets/d/1yGF1CY-obfm5QWiVhvvBoN5XYtQe902hs1np6b6G9Ag/edit#gid=0) to populate the data for the site.

You'll need a new Google API project with Sheets and Drive enabled. A quick way to do that is to click on the `Enable the Google Sheets API` button on the [Google Sheets Node.js Quickstart Guide](https://developers.google.com/sheets/api/quickstart/nodejs)
which will create a new project with a default name of Quickstart with Sheets enabled.

From your new project, search the API library for `Google Drive API` and enable that as well.

Now go to the Credentials tab for your project and click `Manage service accounts` at the bottom. Create a new service account with view only access. Open your service account and click "Add Key" and choose JSON, which automatically downloads your credentials to a file. You can use the `private_key` and `client_email` in the .env.local file.

### .env.local file

```
GOOGLE_SHEETS_PRIVATE_KEY="[private_key]"
GOOGLE_SHEETS_CLIENT_EMAIL="[client_email]"
SPREADSHEET_ID="1yGF1CY-obfm5QWiVhvvBoN5XYtQe902hs1np6b6G9Ag"
```

### Starting up
Now you're ready to go! Enter `npm run dev` from the root directory and you should be able to access the app on `http://localhost:3000`
