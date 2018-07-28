'use strict';

module.exports = function (server) {
  server.dataSources.mysql.autoupdate();
  console.log("Performed automigration.");

}

