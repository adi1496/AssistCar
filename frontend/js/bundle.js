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
})({"views/templatesView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const body = document.querySelector('body');
// const loadHTML = async(data) => {
//     const response = await fetch(data);
//     const element = await response.text();
//     body.innerHTML = element;
// }
// loadHTML('./container.html')
// import axios from 'axios';
var _default = /*#__PURE__*/function () {
  function _default(file, containerElement) {
    _classCallCheck(this, _default);

    this.file = "./html/".concat(file);
    this.container = document.querySelector("".concat(containerElement));
  }

  _createClass(_default, [{
    key: "render",
    value: function () {
      var _render = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, content;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(this.file);

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.text();

              case 5:
                content = _context.sent;
                this.container.insertAdjacentHTML('afterbegin', content);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }]);

  return _default;
}(); // export default async(userLogged) => {
//     const header = document.querySelector('.header');
//     const details = document.querySelector('.details');
//     /******** CHOOSE THE CORECT HEADER (GUEST OR LOGGED USER) *********/
//     const deliverHeader = async(isUserLogged) => {
//         if (isUserLogged) {
//             // 1st way
//             const response = await fetch('./html/header-user.xml');
//             const content = await response.text();
//             header.insertAdjacentHTML('afterbegin', content);
//             // 2nd way
//             // const response = await axios('./container.xml');
//             // // console.log(response.data);
//             // container.insertAdjacentHTML('afterbegin', response.data);
//         }
//     }
//     const deliverDetails = async(isUserLogged) => {
//         if(isUserLogged) {
//             const response = await fetch('./html/details-user.xml');
//             const content = await response.text();
//             details.insertAdjacentHTML('afterbegin', content);
//         }
//     }
//     const overview = (userLogged) => {
//         deliverHeader(userLogged);
//         deliverDetails(userLogged);
//     }
//     overview(userLogged);
// };


exports.default = _default;
},{}],"models/templateModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _templatesView = _interopRequireDefault(require("./../views/templatesView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assignActiveClassNavBar = function assignActiveClassNavBar(element) {
  setTimeout(function () {
    document.getElementById(element).classList.add('navigation__item--active');
  }, 1000);
};

var renderFunction = function renderFunction() {
  for (var _len = arguments.length, templates = new Array(_len), _key = 0; _key < _len; _key++) {
    templates[_key] = arguments[_key];
  }

  templates.forEach(function (el) {
    el.render();
  });
};

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, userLogged) {
    var templateOverviewUserPage, templateHome, templateAccountPage, templateSignUp, templateLogin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = url;
            _context.next = _context.t0 === 'overview' ? 3 : _context.t0 === '#account-info' ? 5 : _context.t0 === '#car-documents' ? 7 : _context.t0 === '#call-assistance' ? 9 : _context.t0 === '#service-apoinment' ? 11 : _context.t0 === '#signup' ? 13 : _context.t0 === '#login' ? 15 : 17;
            break;

          case 3:
            if (userLogged) {
              templateOverviewUserPage = new _templatesView.default('overview-user-page.xml', '.container');
              renderFunction(templateOverviewUserPage);
              console.log('finish render');
              assignActiveClassNavBar('overview');
            } else {
              templateHome = new _templatesView.default('home-page.xml', '.container');
              renderFunction(templateHome);
              assignActiveClassNavBar('overview');
            }

            return _context.abrupt("break", 19);

          case 5:
            if (userLogged) {
              templateAccountPage = new _templatesView.default('account-page.xml', '.container');
              renderFunction(templateAccountPage);
              assignActiveClassNavBar('account-info');
            } else {
              window.location.href = 'http://127.0.0.1:8080/#overview';
            }

            return _context.abrupt("break", 19);

          case 7:
            window.location.href = 'http://127.0.0.1:8080/#overview';
            return _context.abrupt("break", 19);

          case 9:
            window.location.href = 'http://127.0.0.1:8080/#overview';
            return _context.abrupt("break", 19);

          case 11:
            window.location.href = 'http://127.0.0.1:8080/#overview';
            return _context.abrupt("break", 19);

          case 13:
            if (userLogged) {
              window.location.href = 'http://127.0.0.1:8080/#overview';
            } else {
              templateSignUp = new _templatesView.default('signup-page.xml', '.container');
              renderFunction(templateSignUp);
            }

            return _context.abrupt("break", 19);

          case 15:
            if (userLogged) {
              window.location.href = 'http://127.0.0.1:8080/#overview';
            } else {
              templateLogin = new _templatesView.default('login-page.xml', '.container');
              renderFunction(templateLogin);
            }

            return _context.abrupt("break", 19);

          case 17:
            window.location.href = 'http://127.0.0.1:8080/#overview';
            return _context.abrupt("break", 19);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;
},{"./../views/templatesView.js":"views/templatesView.js"}],"models/eventsListeneres.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEventListeners = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import {renderPage} from './views/renderPage.js';

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
            console.log(element.childNodes[1]);
            element.classList.add('profile-nav__link--active');
            element.childNodes[1].classList.add('profile-nav__icon2--active');
            profileSettings.innerHTML = '';
            profileSettings.innerHTML = html;

          case 5:
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
/*************** MAIN FUNCTION FOR LISTENERS ****************/


var setEventListeners = function setEventListeners(url, listeners) {
  /*************** OVERVIEW LISTENERS WHEN USER IS LOGGED IN ****************/
  var overviewUserLoggedListeners = function overviewUserLoggedListeners() {
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

  var overviewHomeGuestListeners = function overviewHomeGuestListeners() {
    var buttonDiscover = document.querySelector('.btn-details--big');
    buttonDiscover.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('clicked');
      document.querySelector('.section-features').scrollIntoView({
        behavior: 'smooth'
      });
    });
  };
  /*************** ACCOUNT SETTINGS LISTENERS ****************/


  var accountInfoListeners = function accountInfoListeners() {
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
                  return fetch("http://127.0.0.1:3000/api/v1/pages/subpage/".concat(el.id));

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
  }; // try{
  // } catch(err) {
  //     console.log(err);
  //     // setTimeout(() => {
  //     //     setEventListeners(url);
  //     // }, 500);
  // }


  if (url === 'overview' && listeners === 'overview-user') {
    overviewUserLoggedListeners();
  } else if (url === 'account-info' && listeners === 'account') {
    accountInfoListeners();
  } else if (url === 'overview' && listeners === 'home') {
    overviewHomeGuestListeners();
  }
};

exports.setEventListeners = setEventListeners;
},{}],"views/renderPage.js":[function(require,module,exports) {
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
  // document.querySelector('.container__loading').style.zIndex = '999';
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
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _templateModel = _interopRequireDefault(require("./models/templateModel.js"));

var _eventsListeneres = require("./models/eventsListeneres.js");

var _renderPage = require("./views/renderPage.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pageRequest;
var url = document.URL.replace("".concat(window.origin, "/#"), '');
(0, _renderPage.showloadingPage)();

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var response;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(window);
          _context.next = 3;
          return fetch("http://127.0.0.1:3000/api/v1/pages/".concat(url));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();

        case 6:
          pageRequest = _context.sent;
          // pageRequest = pageRequest.page;
          console.log('request ok');

          if (document.readyState === 'complete' || document.readyState === 'interactive') {
            (0, _renderPage.renderPage)('.container', pageRequest.page);
            setTimeout(function () {
              (0, _eventsListeneres.setEventListeners)(url, pageRequest.listeners);
            }, 100);
            (0, _renderPage.hideLoadingPage)();
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

window.onhashchange = function () {
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
},{"./models/templateModel.js":"models/templateModel.js","./models/eventsListeneres.js":"models/eventsListeneres.js","./views/renderPage.js":"views/renderPage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49681" + '/');

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