const logErrorToFile = require("./logger");

async function fetchGetJSON(url) {
    try {
      const data = await fetch(url).then((res) => res.json());
      return data;
    } catch (err) {
      logErrorToFile(JSON.stringify(err.message))
      throw new Error(err.message);
    }
  }
  
  async function fetchPostJSON(url, data = {}) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data || {}),
      });
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  module.exports = {
    fetchGetJSON,
    fetchPostJSON,
  };
  