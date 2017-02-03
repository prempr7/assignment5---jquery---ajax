var dummyjson = require('dummy-json');
var fs = require('fs');
var template = '{ \
  "users": [ \
    {{#repeat 10000}}\
    {\
      "id": {{@index}},\
      "name": "{{firstName}} {{lastName}}",\
      "work": "{{company}}",\
      "email": "{{email}}",\
      "dob": "{{date 1900 2000 YYYY}}",\
      "address": "{{int 1 100}} {{street}}",\
      "city": "{{city}}"\
    }\
    {{/repeat}}\
  ]}';
var result = dummyjson.parse(template);
var writerStream = fs.createWriteStream('ulti.json');
writerStream.write(result);
