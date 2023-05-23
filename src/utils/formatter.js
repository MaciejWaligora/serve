class Formatter {
  static longtTimeStamp(dateNow) {
    const date = new Date(dateNow);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const tz = Math.abs(date.getTimezoneOffset() / 60);
    return `[${day}/${month}/${year}-${h}:${m}:${s} GMT+${tz}]`;
  }
}

module.exports = Formatter;
