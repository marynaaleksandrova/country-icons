var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');

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

// app.get('/:country', function(req, res){
//  var country = req.params.country.toLowerCase();
//     fs.readFile('./countries/'+country+'.txt', function (err, data) {
//     console.log(err);
//     var lines = data.toString().split('\n');
//     var answer = "";
//     var i=0;
//     for (;i<lines.length;i++) {
//      var words = lines[i].split('-');
//      var icon_id = words[0];
//      var icon_name = words[1];
//      var line = "<p><a href='"+country+"/"+icon_id+"'>"+icon_name+"</a></p>"
//      answer = answer+line;
//     }
//    res.send(answer);
//  });
// });

// app.get('/favicon.ico', function(req, res){
//   res.send(404, 'Sorry, we cannot find that!');
// });

// app.get('/:country', function(req, res){
//   var country = req.params.country.toLowerCase();
  
//   fs.readFile('./countries/'+country+'.json', function (err, data) {

//     if (err) {
//       res.redirect('/404');
//     } 
//     else {
    
//       var answer = "";

//       var items = JSON.parse(data.toString());

//       var i=0;
//       for (;i<items.length;i++) {

//         var item = "<p><a href='"+country+"/"+items[i].id+"'>"+items[i].name+"</a></p>"
//         answer = answer+item;
//       }

//       res.send(answer);
//     }
//   });
// });

app.get('/favicon.ico', function(req, res){
  res.send(404, 'Sorry, we cannot find that!');
});

app.get('/:country', function(req, res){
  var country = req.params.country.toLowerCase();
  
  fs.readFile('./countries/'+country+'.json', function (err, data) {

    if (err) {
      console.log("file read", err);
      res.redirect('/404');
    } 
    else {

      var items = JSON.parse(data.toString());
      
      jade.renderFile('jade/country.jade', {mainTitle: "My title", myCountry: country, iconItems: items}, function (err, html) {

        if (err) {
          console.log("HTML render", err);
          res.redirect('/404');
        } 

        var html_answer = html;
        res.send(html_answer);

      });

    }

  });

});

app.get('/:country/:icon_id', function(req, res){
  res.send('Hello');
});

app.listen(3000);
console.log('Listening on port 3000');