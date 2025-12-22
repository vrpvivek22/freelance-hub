function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000;

  if (diff < 60) {
    const sec = Math.floor(diff);
    return `${sec} second${sec === 1 ? "" : "s"} ago`;
  }
  if (diff < 3600) {
    const min = Math.floor(diff / 60);
    return `${min} minute${min === 1 ? "" : "s"} ago`;
  }
  if (diff < 86400) {
    const hr = Math.floor(diff / 3600);
    return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(diff / 86400);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default timeAgo;
