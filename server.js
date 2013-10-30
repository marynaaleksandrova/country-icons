var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');
var _ = require("underscore");

app.get('/', function(req, res){
  jade.renderFile('jade/index.jade', {mainTitle : 'Index page'}, function (err, html) {

    if (err) {
      res.redirect('/404');
    } 

    var html_answer = html;
    res.send(html_answer);

  });
});

app.get('/404', function(req, res){
  res.send(404, 'Sorry, we cannot find that!');
});

app.get('/favicon.ico', function(req, res){
  res.send(404, 'Sorry, we cannot find that!');
});


function getCountryData(country, res, callbackFunction) {
  
  fs.readFile('./countries/'+country+'.json', function (err, data) {

    if (err) {
      console.log("file read", err);
      res.redirect('/404');
    } 
    else {
      var icons = JSON.parse(data.toString());
      callbackFunction(country, icons);
    }
  });
}

function renderHTML(res, jadeFile, pageTitle, iconCountry, icons, iconID, iconName) {
  
  jade.renderFile(jadeFile, {pageTitle: pageTitle, iconCountry: iconCountry, icons: icons, iconID: iconID, iconName: iconName}, function (err, html) {

    if (err) {
      console.log("HTML render", err);
      res.redirect('/404');
    }
    else {
      var html_answer = html;
      res.send(html_answer);
    }
  });
}

//
// Country Page

app.get('/:country', function (req, res){
  var countryName = req.params.country.toLowerCase();
  
  getCountryData(countryName, res, function (countryName, icons) {

    renderHTML(res, 'jade/country.jade', "My title", countryName, icons);
  });
});

// 
// Icon Page

app.get('/:country/:icon_id', function (req, res){
  var countryName = req.params.country.toLowerCase();
  var iconID = req.params.icon_id.toLowerCase();
    
  getCountryData(countryName, res, function (countryName, icons) {

    console.log(icons);

    if (iconID > icons.length) {
      res.redirect('/404');
    }
    else {

    var iconData = _.findWhere(icons, {'id': iconID });

    console.log(iconData);
    var iconName = iconData.name;

    renderHTML(res, 'jade/icon.jade', "My title", countryName, icons, iconID, "iconName");

    }
  }); 
});


app.listen(3000);
console.log('Listening on port 3000');