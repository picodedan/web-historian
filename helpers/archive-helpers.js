var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    let listUrls = data.toString().split('\n');
    return callback(listUrls);
  });

  //capture contents of file and convert to object
    //keys would be the url and value a boolean to indicate archived or not
  
  //pass as input to CB the object. 
};

exports.isUrlInList = function(url, callback) {
  //call readListOfUrls check if url is in list.
  var checkThis = (listUrls) => {
    return callback(listUrls.includes(url));
  };
  this.readListOfUrls(checkThis);
    //return true to Callback if it is 
    //return false to callback if it isn't
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(this.paths.list, url + '\n', callback);
  // write url to sites.txt and return callback on completion
};

exports.isUrlArchived = function(url, callback) {
  //fs.exists on the input url 
  fs.readFile(this.paths.archivedSites + '/' + url, (err, data) => {
    if (err) {
      return callback(false);
    }
    return callback(true);
  });
  // return callback with true/false
};

exports.downloadUrls = function(urls) {
  urls.forEach((url) => {
    this.isUrlArchived(url, (returnFromisUrlArchived) => {
      if (!returnFromisUrlArchived) {
        fs.writeFile(this.paths.archivedSites + '/' + url, 'stringDummyData');
      }
    });
  });
  //for each url in list that is NOT archived, 
    //download the front page of the given URL into archives/sites 
};
