import qs from 'query-string';

class Query {
  values = {};

  set initUrl(search) {
    if (typeof search === 'string') {
      this.values = qs.parse(search);
    }
  }

  set(key, value) {
    if (!value && this.values[key]) {
      delete this.values[key];
    } else {
      this.values[key] = value;
    }
  }

  delete(key) {
    if (Object.prototype.hasOwnProperty.call(this.values, key)) {
      delete this.values[key];
    }
  }

  get string() {
    return qs.stringify(this.values);
  }

  param(key) {
    return Object.prototype.hasOwnProperty.call(this.values, key) ? this.values[key] : '';
  }

  get params() {
    return this.values;
  }

  getQueryString(key) {
    return qs.parseUrl(key);
  }
}

export default new Query();
