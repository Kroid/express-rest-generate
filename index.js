var router = require('express').Router(),
    fs = require('fs'),
    config = {};


module.exports = function(conf) {
  var defaultConfig = require('./defaultConfig.json');

  if(!conf) {
    config = defaultConfig;
  } else {
    config = conf;
    if (!config.ctrlLastName) {
      config.ctrlLastName = defaultConfig.ctrlLastName;
    }

    if (!config.path) {
      config.path = defaultConfig.path;
    }

    if (!config.requiredPath) {
      config.requiredPath = defaultConfig.requiredPath;
    }

    if (!config.actions) {
      config.actions = defaultConfig.actions;
    }
  }



  var struct = iterate(config.path);
  //console.log(struct);
  createRoutes(struct);
  console.log(router);
  //return router;
}





function iterate(path) {
  var struct = {},
      names = fs.readdirSync(path);

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    if ( fs.statSync(path + '/' + name).isDirectory() ) {
      struct[name] = iterate(path + '/' + name);
    }

    if ( fs.statSync(path + '/' + name).isFile() ) {
      var endPos = name.lastIndexOf(config.ctrlLastName + '.js');
      if (endPos != -1 && endPos != 0) {
        var ctrlName = name.slice(0, endPos).toLowerCase();
        struct[ctrlName] = require(path + '/' + name);
      }
    }
  }
  return struct;
}




function createRoutes(struct, currentPath) {
  if (!currentPath) { currentPath = "" }

  for (name in struct) {
    var element = struct[name],
        abcolutePath = config.path + '/' + currentPath + '/' + name

    if ( fs.statSync(abcolutePath).isDirectory() ) {
      createRoutes(element, currentPath + '/' + name);
      continue;
    }

    if ( fs.statSync(abcolutePath).isFile ) {
      checkActions(element, currentPath);
    }
  }
}


function checkActions(controller, currentPath) {
  if (!config.requiredPath || !currentPath) {
    currentPath = '';
  }

  for (actionName in config.actions) {
    if (!controller[actionName]) {
      continue;
    }

    var action = config.actions[actionName],
        path = currentPath + '/';

    if (action.appendUrl) {
      path += action.appendUrl;
    }

    router[action.method](path, controller[actionName]);
  }
}
