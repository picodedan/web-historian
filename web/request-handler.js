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
      console.log('we got a post');
      req.on('data', (data) => {
        let incomingUrlReq = data.toString().substr(4);
        let alreadyInList;
        let isArchived;
        debugger;
        archive.isUrlInList(incomingUrlReq, (result) => {
          alreadyInList = result;
          console.log('already in list ' + alreadyInList);
        });
        if (alreadyInList === true) {
          archive.isUrlArchived(incomingUrlReq, (result) => {
            isArchived = result;
            console.log('already in list ' + alreadyInList);
            console.log('is Archived ' + isArchived);
          });
          //do other things here is true
        } else {
          archive.addUrlToList(incomingUrlReq, (result) => {
            //when done kick out the response
            console.log('callback result from fswrite ' + result);
            res.writeHead(201, help.headers);
            res.end();
          }); 
        }
      });
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
