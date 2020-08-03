// The purpose of this file is to load routes file

const glob = require("glob");

module.exports = app => {
    let routePath = "api/**/*.routes.js";
    let version = "/api/v1/:lang";
    glob.sync(routePath).forEach(function (file) {
        require("../" + file)(app, version);
    });
    console.log("Routes are loading..");
}