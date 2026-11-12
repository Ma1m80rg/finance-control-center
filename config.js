// Public frontend settings only: NEVER put private keys, client secrets, tokens, or finance data here.
// Replace the three YOUR_... placeholders from your Google Cloud project.
// The site must be hosted on the HTTPS origin registered in your OAuth client.
window.FINANCE_DRIVE_CONFIG = {
  clientId: 'YOUR_OAUTH_WEB_CLIENT_ID.apps.googleusercontent.com',
  apiKey: 'YOUR_BROWSER_API_KEY',
  projectNumber: 'YOUR_GOOGLE_CLOUD_PROJECT_NUMBER',
  // Optional: validates that the selected data file is in your intended Drive folder.
  folderId: ''
};
