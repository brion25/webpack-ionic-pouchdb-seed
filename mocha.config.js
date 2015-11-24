var fs = require('fs'),
    path = require('path'),
    __register = require("babel-core/register"),
    filesPath = path.join(__dirname,'./app/'),
    specRegex = /-spec.js$/,
    specs = getSpecs(fs.readdirSync(filesPath),filesPath,specRegex);

specs.forEach(function(spec){
  require(spec);
});

function getSpecs(files,parentPath,specRegex){
  var specs = [],
      loopFiles = function(files,__path){
        for(var i = 0;i<files.length;i++){
          var file = files[i],
              filePath = path.join(__path,'/'+file);
          if(fs.lstatSync(filePath).isDirectory()){
            loopFiles(fs.readdirSync(filePath),filePath);
          }else{
            if(specRegex.test(file)){
              specs.push(filePath);
            }
          }
        }
      }

  loopFiles(files,parentPath);
  return specs;
}
