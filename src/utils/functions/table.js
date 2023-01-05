export const getProperty = (obj, prop) => {
  if (prop) {
    if (Array.isArray(prop)) {
      let string = '';
      prop.forEach((item, index) => {
        if (prop.length - 1 === index) {
          if (getProperty(obj, item)) {
            string += `${getProperty(obj, item)}`;
          }
        } else {
          if (getProperty(obj, item)) {
            string += `${getProperty(obj, item)} `;
          }
        }
      });
      return string;
    }

    let parts = prop.split('.');

    if (Array.isArray(parts)) {
      let last = parts.length > 1 ? parts.pop() : parts;
      let l = parts.length,
        i = 1,
        current = parts[0];

      while ((obj = obj[current]) && i < l) {
        current = parts[i];
        i++;
      }

      if (typeof obj === 'object' && obj !== null) {
        return obj[last];
      }
      return obj;
    } else {
      throw new Error({ message: 'part is not an valid array' });
    }
  }
};

export const setProperty = (obj, prop, value) => {
  let parts = prop.split('.');

  if (Array.isArray(parts)) {
    for (var i = 0; i < parts.length - 1; i++) {
      obj[parts[i]] = obj[parts[i]] || {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  } else {
    throw new Error({ message: 'part is not an valid array' });
  }
};
