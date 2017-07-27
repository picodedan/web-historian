var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var help = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);
  //handle incoming requests:

  if (req.url) { //update this at some point to include url routing. 
   //if URL is good filter req on method
    if (req.method === 'GET') {
      //if GET on root, return index.html
      fs.readFile(`${archive.paths.siteAssets}/index.html`, (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, help.headers);
        res.end(data);
      });
    } else if (req.method === 'POST') {
      //do somethign about it yo!
    } else if (req.method === 'OPTIONS') {
      //send back basic headers
      //that's it
      res.writeHead(200, help.headers);
      res.end();
    }
      
  } else {
    res.writeHead(404, help.headers);
    res.end();
  }
  //request type filtering

   
};
