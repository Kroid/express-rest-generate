var router = require('express').Router(),
    fs = require('fs'),
    config = {};


module.exports = function(rootDir, conf) {
  var defaultConfig = require('./defaultConfig.json');

  if(!conf) {
    config = defaultConfig;
  } else {
    config = conf;
    if (!config.ctrlLastName) {
      config.ctrlLastName = defaultConfig.ctrlLastName;
    }

    if (!config.path) {
      config.path = rootDir + '/' + defaultConfig.path;
    } else {
      config.path = rootDir + '/' + config.path;
    }

    if (!config.requiredPath) {
      config.requiredPath = defaultConfig.requiredPath;
    }

    if (!config.actions) {
      config.actions = defaultConfig.actions;
    }
  }



  iterate(config.path);
  return router;
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
      routePath = path.slice(config.path.length);
      var endPos = name.lastIndexOf(config.ctrlLastName + '.js');
      if (endPos != -1 && endPos != 0) {
        var ctrl = require(path + '/' + name),
            routeCtrlName = name.slice(0, endPos).toLowerCase();

        if (!config.requiredPath) {
          routePath = '/' + routeCtrlName;
        } else {
          routePath += '/' + routeCtrlName;
        }
        createRoutes(routePath, ctrl);
      }
    }
  }
  return struct;
}




function createRoutes(path, ctrl) {
  for (actionName in config.actions) {
    if (!ctrl[actionName]) {
      continue;
    }

    var action = config.actions[actionName],
        url = path;

    if (action.appendUrl) {
      url += action.appendUrl;
    }

    router[action.method](url, ctrl[actionName]);
  }
}
