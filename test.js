var fs = require('fs');

fs.readFile('test.txt', function (err, data) {
  console.log(data.toString());
});

fs.writeFile('test.txt', 'My new string', function (err) {
  console.log('It\'s saved!');
});