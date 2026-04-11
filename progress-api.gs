/**
 * Claude Code Course — Shared Progress API
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project, name it "Course Progress API"
 * 3. Paste this entire file content
 * 4. Click Deploy → New deployment
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy → Copy the URL
 * 9. Paste the URL into index.html where it says PROGRESS_API_URL
 */

function doGet(e) {
  const store = PropertiesService.getScriptProperties();
  const allProps = store.getProperties();

  // Parse stored JSON strings back to objects
  const result = {};
  for (const [uid, val] of Object.entries(allProps)) {
    try {
      result[uid] = JSON.parse(val);
    } catch {
      result[uid] = val;
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { uid, progress } = data;

    if (!uid || !progress) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Missing uid or progress' }));
    }

    const store = PropertiesService.getScriptProperties();
    store.setProperty(uid, JSON.stringify(progress));

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
