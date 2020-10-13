// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"views/renderPage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideLoadingPage = exports.showloadingPage = exports.renderPage = void 0;

var renderPage = function renderPage(element, page) {
  document.querySelector(element).innerHTML = page;
};

exports.renderPage = renderPage;

var showloadingPage = function showloadingPage() {
  document.querySelector('.container__loading').style.zIndex = '999';
  document.querySelector('.container__loading').style.opacity = 1;
  document.querySelector('.container__loading').style.visibility = 'visible';
  document.querySelector('.container').style.visibility = 'hidden';
  document.querySelector('.container').style.opacity = 0;
};

exports.showloadingPage = showloadingPage;

var hideLoadingPage = function hideLoadingPage() {
  document.querySelector('.container').style.opacity = 1;
  document.querySelector('.container__loading').style.opacity = 0;
  document.querySelector('.container').style.visibility = 'visible';
  document.querySelector('.container__loading').style.visibility = 'hidden';
};

exports.hideLoadingPage = hideLoadingPage;
},{}],"models/homeModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homeLoad = void 0;

var homeLoad = function homeLoad() {
  var buttonDiscover = document.querySelector('.btn-details--big');
  buttonDiscover.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('clicked');
    document.querySelector('.section-features').scrollIntoView({
      behavior: 'smooth'
    });
  });
};

exports.homeLoad = homeLoad;
},{}],"models/overviewUserModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overviewUserLoad = void 0;

/*************** OVERVIEW LISTENERS WHEN USER IS LOGGED IN ****************/
var overviewUserLoad = function overviewUserLoad() {
  var selectCar = document.querySelector('.overview__drop-down');
  var popupSelectCar = document.querySelector('.popup-select-car');
  var btnDetails = document.querySelectorAll('.btn-details');
  var popupDetails = document.querySelector('.popup-details');
  /******************* POPUP CAR SELECT ******************/

  selectCar.addEventListener('click', function (event) {
    event.preventDefault();

    if (!popupSelectCar.classList.contains('popup-select-car--active')) {
      popupSelectCar.classList.add('popup-select-car--active');
      selectCar.classList.add('overview__drop-down--active');
    } else {
      popupSelectCar.classList.remove('popup-select-car--active');
      selectCar.classList.remove('overview__drop-down--active');
    }
  });
  /******************* POPUP DETAILS CAR ******************/
  // OPEN POPUP

  btnDetails.forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      popupDetails.classList.add('popup-details--active');
    });
  }); //CLOSE POPUP

  popupDetails.addEventListener('click', function (event) {
    // event.preventDefault();
    if (!event.target.classList.contains('popup-details__content')) {
      popupDetails.classList.remove('popup-details--active');
    }
  });
  /******************* CLOSE POPUP WHEN CLICK OUTSIDE ******************/

  window.addEventListener('click', function (event) {
    // event.preventDefault();
    // console.log(event.target);
    // POPUP CAR-SELECTOR
    if (popupSelectCar.classList.contains('popup-select-car--active')) {
      var i = true;
      var array = ['overview__select-car', 'overview__heading', 'overview__drop-down', 'popup-select-car', 'popup-select-car__item'];
      array.forEach(function (el) {
        if (event.target.classList.contains(el)) i = false;
      });

      if (i === true) {
        popupSelectCar.classList.remove('popup-select-car--active');
        selectCar.classList.remove('overview__drop-down--active');
      }
    }
  });
};

exports.overviewUserLoad = overviewUserLoad;
},{}],"models/accountSettingsModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountSettingsLoad = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*************** REMOVE ALL ACTIVE CLASSES FROM PROFILE NAVIGATION ****************/
var removeActiveClassProfileNav = function removeActiveClassProfileNav(profileNavBtns, profileArrowIcons, class1, class2) {
  profileNavBtns.forEach(function (el) {
    if (el.classList.contains(class1)) {
      el.classList.remove(class1);
    }
  });
  profileArrowIcons.forEach(function (el) {
    if (el.classList.contains(class2)) {
      el.classList.remove(class2);
    }
  });
};
/*************** RENDERING PROFILE SETTINGS ****************/


var renderProfileSettings = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element, profileSettings, html) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log(element.childNodes[1]);
            element.classList.add('profile-nav__link--active');
            element.childNodes[1].classList.add('profile-nav__icon2--active');
            profileSettings.innerHTML = '';
            profileSettings.innerHTML = html;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderProfileSettings(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/*************** ACCOUNT SETTINGS LISTENERS ****************/


var accountSettingsLoad = function accountSettingsLoad() {
  var profileNavBtns = document.querySelectorAll('.profile-nav__link');
  var profileSettings = document.querySelector('.profile-settings');
  var profileArrowIcons = document.querySelectorAll('.profile-nav__icon2');
  profileNavBtns.forEach(function (el) {
    el.addEventListener('click', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
        var loadingImg, response, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();
                removeActiveClassProfileNav(profileNavBtns, profileArrowIcons, 'profile-nav__link--active', 'profile-nav__icon2--active');
                loadingImg = '<div class="profile-settings__loading"><img src="img/loading.gif" alt="loading img" class="profile-settings__load-img"/></div>';
                profileSettings.innerHTML = '';
                profileSettings.innerHTML = loadingImg;
                _context2.next = 7;
                return fetch("http://127.0.0.1:3000/api/v1/pages/subpage/".concat(el.id), {
                  credentials: 'include'
                });

              case 7:
                response = _context2.sent;
                _context2.next = 10;
                return response.json();

              case 10:
                result = _context2.sent;
                renderProfileSettings(el, profileSettings, result.page);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

exports.accountSettingsLoad = accountSettingsLoad;
},{}],"models/loginModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginLoad = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import axios from 'axios';
var loginLoad = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var domElements;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            domElements = {
              emailInput: document.getElementById('email'),
              passwordInput: document.getElementById('password'),
              loginBtn: document.getElementById('login-btn')
            };
            domElements.loginBtn.addEventListener('click', /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
                var response, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        event.preventDefault();
                        _context.next = 3;
                        return fetch('http://127.0.0.1:3000/api/v1/users/login', {
                          method: 'POST',
                          mode: 'cors',
                          credentials: 'include',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            email: domElements.emailInput.value,
                            password: domElements.passwordInput.value
                          })
                        });

                      case 3:
                        response = _context.sent;
                        _context.next = 6;
                        return response.json();

                      case 6:
                        json = _context.sent;
                        if (json.status === 'success') window.location.href = '#acount-info'; // alert( document.cookie );

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loginLoad() {
    return _ref.apply(this, arguments);
  };
}();

exports.loginLoad = loginLoad;
},{}],"controllers/loadJS.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadJS = void 0;

var _homeModule = require("./../models/homeModule.js");

var _overviewUserModule = require("./../models/overviewUserModule.js");

var _accountSettingsModule = require("./../models/accountSettingsModule.js");

var _loginModule = require("./../models/loginModule.js");

/*************** MAIN FUNCTION FOR LISTENERS ****************/
var loadJS = function loadJS(url, listeners) {
  try {
    if (url === 'overview' && listeners === 'overview-user') {
      (0, _overviewUserModule.overviewUserLoad)();
    } else if (url === 'account-info' && listeners === 'account') {
      (0, _accountSettingsModule.accountSettingsLoad)();
    } else if (url === 'home' && listeners === 'home') {
      (0, _homeModule.homeLoad)();
    } else if (url === 'login' && listeners === 'login') {
      (0, _loginModule.loginLoad)();
    }
  } catch (err) {
    console.log(err);
    setTimeout(function () {
      loadJS(url);
    }, 500);
  }
};

exports.loadJS = loadJS;
},{"./../models/homeModule.js":"models/homeModule.js","./../models/overviewUserModule.js":"models/overviewUserModule.js","./../models/accountSettingsModule.js":"models/accountSettingsModule.js","./../models/loginModule.js":"models/loginModule.js"}],"controllers/renderController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderController = void 0;

var _renderPage = require("./../views/renderPage.js");

var _loadJS = require("./loadJS.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response, pageRequest;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(url);
            _context.next = 3;
            return fetch("http://127.0.0.1:3000/api/v1/pages/".concat(url), {
              credentials: 'include'
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            pageRequest = _context.sent;

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              (0, _renderPage.renderPage)('.container', pageRequest.page);
              console.log(pageRequest);
              setTimeout(function () {
                (0, _loadJS.loadJS)(url, pageRequest.listeners);
              }, 300);
              (0, _renderPage.hideLoadingPage)();
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderController(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderController = renderController;
},{"./../views/renderPage.js":"views/renderPage.js","./loadJS.js":"controllers/loadJS.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _renderController = require("./controllers/renderController.js");

var _renderPage = require("./views/renderPage.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var url;

if (document.URL.startsWith("".concat(window.origin, "/#"))) {
  url = document.URL.replace("".concat(window.origin, "/#"), '');
} else {
  url = 'home';
}

(0, _renderPage.showloadingPage)();

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _renderController.renderController)(url);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

window.onhashchange = function (event) {
  location.reload();
  console.log(document.URL);
}; // const initAplication = (url, userLogged) => {
//     eventsListeneres(url, userLogged);
// }
// document.onreadystatechange = async function() {
//     console.log('salve');
//     let userLogged = false;
//     if(document.readyState === 'interactive') {
//         // await renderTemplates(url, userLogged);
//         document.querySelector('.container').innerHTML = pageRequest;
//     }
//     if(document.readyState === 'complete') {
//         document.querySelector('.container__loading').style.zIndex = '999';
//         document.querySelector('.container__loading').style.opacity = 1;
//         document.querySelector('.container__loading').style.visibility = 'visible';
//         document.querySelector('.container').style.visibility = 'hidden';
//         document.querySelector('.container').style.opacity = 0;
//         setTimeout(() => {
//             document.querySelector('.container').style.opacity = 1;
//             document.querySelector('.container__loading').style.opacity = 0;
//             document.querySelector('.container').style.visibility = 'visible';
//             document.querySelector('.container__loading').style.visibility = 'hidden';
//             initAplication(url, userLogged);
//         }, 500);
//     }
// }
},{"./controllers/renderController.js":"controllers/renderController.js","./views/renderPage.js":"views/renderPage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65351" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/bundle.js.map