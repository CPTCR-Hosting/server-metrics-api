const axios = require("axios");
const token = require("../config.json").token;

const resp = await axios.get("http://nl1.node.cptcr.cc:3022/server-data-api/", {
    headers: {
        "Authorization": `${token}`
    }
});

console.log(resp);