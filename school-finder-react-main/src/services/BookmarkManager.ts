function getBookmarkStatus(schoolID: number) {
  const schoolBookmarks = new Set<number>(
    JSON.parse(localStorage.getItem("Bookmarks") || "[]")
  );

  return schoolBookmarks.has(schoolID);
}

function getBookmarks() {
  return new Set<number>(JSON.parse(localStorage.getItem("Bookmarks") || "[]"));
}

function setBookmarkStatus(schoolID: number) {
  const schoolBookmarks = new Set(
    JSON.parse(localStorage.getItem("Bookmarks") || "[]")
  );

  if (schoolBookmarks.has(schoolID)) schoolBookmarks.delete(schoolID);
  else schoolBookmarks.add(schoolID);

  localStorage.setItem(
    "Bookmarks",
    JSON.stringify(Array.from(schoolBookmarks))
  );
}
export { getBookmarks, getBookmarkStatus, setBookmarkStatus };
