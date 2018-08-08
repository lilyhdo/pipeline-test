import 'babel-polyfill'
import 'colors'
import fs from 'fs'
import request from 'request'

const ROOT_DIR = configs.ROOT_DIR 
const FILE_NAME = configs.FILE_NAME
const APK_DIR = `${ROOT_DIR}/${FILE_NAME}`
const username = configs.USERNAME 
const apiKey = configs.API_KEY 

var basicAuth = "Basic " + new Buffer(username + ":" + apiKey).toString("base64");
console.log(`Params: ${username} - ${apiKey}`)
main()

function main() {
  generateUrl(function (url, path) {
  console.log(UploadToS3(url, path))
  })
}

async function generateUrl(callback) {
  const inputBody = {
    //Uncomment the line below if you want to upload app instead of creating a new one
    //"appId": ???,
    "filename": FILE_NAME
  };
  const headers = {
    "Authorization": `${basicAuth}`,
    'Content-Type':'application/json',
    'Accept':'application/json'
  };

  request({
    url: 'https://api.kobiton.com/v1/apps/uploadUrl',
    json: true,
    method: 'POST',
    body: inputBody,
    headers: headers
  }, function (err, response, body) {
    if (err) return console.error('Error:', err);
    console.log('GENERATE URL DONE')
    callback(body.url, body.appPath) //<---- Have to get the appPath here
  })
}

async function UploadToS3(url, appPath) {
  console.log('Flow can come here')
  var stats = fs.statSync(APK_DIR);
  const option = {
    method: 'PUT',
    url: url,
    headers: {
      'Content-Length': stats['size'],
      'Content-Type': 'application/octet-stream',
      "x-amz-tagging": "unsaved=true"
    }
  }

  fs.createReadStream(APK_DIR).pipe(request(option
    , function (err, res) {
    if (err) {
      console.log('error:',err)
    }
    console.log('UPLOAD TO S3 DONE')
    return createAppVer(appPath) //<---- Create app version on Kobiton after uploading to S3
  }));
}

async function createAppVer(appPath) {
  const request = require('request');
  const inputBody = {
    "filename": FILE_NAME,
    "appPath": appPath
  };
  const headers = {
    'Authorization': basicAuth,
    'Content-Type':'application/json'
  };

  request({
    url: 'https://api.kobiton.com/v1/apps',
    json: true,
    method: 'POST',
    body: inputBody,
    headers: headers
  }, function (err, response, body) {
    if (err) return console.error('Error:', err);

    console.log('App has successfully uploaded to Kobiton')
    console.log('Response body:', body);
    return body.appId
  });
}

var methods = {
	generateUrl: function() {
		console.log('A presigned URL and app path have been generated.');
	},
	UploadToS3: function() {
		console.log('App file has been uploaded to S3.');
  },
  createAppVer: function() {
    console.log('App has been uploaded.')
  }
};

exports.data = methods;
