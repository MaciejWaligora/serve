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

  static flattenObject(obj) {
    const result = {};

    function recurse(currentObj, currentKey) {
      if (typeof currentObj !== "object" || currentObj === null) {
        result[currentKey] = currentObj;
      } else if (Array.isArray(currentObj)) {
        currentObj.forEach((value, index) => {
          recurse(value, `${currentKey}[${index}]`);
        });
      } else {
        for (const key in currentObj) {
          if (currentObj.hasOwnProperty(key)) {
            const newKey = currentKey ? `${currentKey}.${key}` : key;
            recurse(currentObj[key], newKey);
          }
        }
      }
    }

    recurse(obj, "");

    return result;
  }
}

module.exports = Formatter;
