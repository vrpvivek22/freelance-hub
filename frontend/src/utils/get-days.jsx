function getDays(dateString) {
  const target = new Date(dateString);

  if (isNaN(target.getTime())) {
    return "";
  }

  const today = new Date();
  const diff = target - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `in ${Math.abs(days)} days`;
}

export default getDays;
