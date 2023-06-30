// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2Avys":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "72be9c5662777089";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"fZGhK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WalletConnectModal", ()=>d);
var _modalCore = require("@walletconnect/modal-core");
class d {
    constructor(e){
        this.openModal = (0, _modalCore.ModalCtrl).open, this.closeModal = (0, _modalCore.ModalCtrl).close, this.subscribeModal = (0, _modalCore.ModalCtrl).subscribe, this.setTheme = (0, _modalCore.ThemeCtrl).setThemeConfig, (0, _modalCore.ThemeCtrl).setThemeConfig(e), (0, _modalCore.ConfigCtrl).setConfig(e), this.initUi();
    }
    async initUi() {
        if (typeof window < "u") {
            await require("d9129ae20229e8d2");
            const e = document.createElement("wcm-modal");
            document.body.insertAdjacentElement("beforeend", e), (0, _modalCore.OptionsCtrl).setIsUiLoaded(!0);
        }
    }
}

},{"@walletconnect/modal-core":"5opOL","d9129ae20229e8d2":"5MlJv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5opOL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ConfigCtrl", ()=>C);
parcelHelpers.export(exports, "CoreUtil", ()=>i);
parcelHelpers.export(exports, "EventsCtrl", ()=>$);
parcelHelpers.export(exports, "ExplorerCtrl", ()=>G);
parcelHelpers.export(exports, "ModalCtrl", ()=>Q);
parcelHelpers.export(exports, "OptionsCtrl", ()=>c);
parcelHelpers.export(exports, "RouterCtrl", ()=>N);
parcelHelpers.export(exports, "ThemeCtrl", ()=>X);
parcelHelpers.export(exports, "ToastCtrl", ()=>Y);
var _vanilla = require("valtio/vanilla");
var _buffer = require("buffer");
const n = (0, _vanilla.proxy)({
    history: [
        "ConnectWallet"
    ],
    view: "ConnectWallet",
    data: void 0
}), N = {
    state: n,
    subscribe (e) {
        return (0, _vanilla.subscribe)(n, ()=>e(n));
    },
    push (e, t) {
        e !== n.view && (n.view = e, t && (n.data = t), n.history.push(e));
    },
    reset (e) {
        n.view = e, n.history = [
            e
        ];
    },
    replace (e) {
        n.history.length > 1 && (n.history[n.history.length - 1] = e, n.view = e);
    },
    goBack () {
        if (n.history.length > 1) {
            n.history.pop();
            const [e] = n.history.slice(-1);
            n.view = e;
        }
    },
    setData (e) {
        n.data = e;
    }
}, i = {
    WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
    WCM_VERSION: "WCM_VERSION",
    RECOMMENDED_WALLET_AMOUNT: 9,
    isMobile () {
        return typeof window < "u" ? Boolean(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
    },
    isAndroid () {
        return i.isMobile() && navigator.userAgent.toLowerCase().includes("android");
    },
    isIos () {
        const e = navigator.userAgent.toLowerCase();
        return i.isMobile() && (e.includes("iphone") || e.includes("ipad"));
    },
    isHttpUrl (e) {
        return e.startsWith("http://") || e.startsWith("https://");
    },
    isArray (e) {
        return Array.isArray(e) && e.length > 0;
    },
    formatNativeUrl (e, t, s) {
        if (i.isHttpUrl(e)) return this.formatUniversalUrl(e, t, s);
        let o = e;
        o.includes("://") || (o = e.replaceAll("/", "").replaceAll(":", ""), o = `${o}://`), o.endsWith("/") || (o = `${o}/`), this.setWalletConnectDeepLink(o, s);
        const r = encodeURIComponent(t);
        return `${o}wc?uri=${r}`;
    },
    formatUniversalUrl (e, t, s) {
        if (!i.isHttpUrl(e)) return this.formatNativeUrl(e, t, s);
        let o = e;
        o.endsWith("/") || (o = `${o}/`), this.setWalletConnectDeepLink(o, s);
        const r = encodeURIComponent(t);
        return `${o}wc?uri=${r}`;
    },
    async wait (e) {
        return new Promise((t)=>{
            setTimeout(t, e);
        });
    },
    openHref (e, t) {
        window.open(e, t, "noreferrer noopener");
    },
    setWalletConnectDeepLink (e, t) {
        localStorage.setItem(i.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
            href: e,
            name: t
        }));
    },
    setWalletConnectAndroidDeepLink (e) {
        const [t] = e.split("?");
        localStorage.setItem(i.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
            href: t,
            name: "Android"
        }));
    },
    removeWalletConnectDeepLink () {
        localStorage.removeItem(i.WALLETCONNECT_DEEPLINK_CHOICE);
    },
    setModalVersionInStorage () {
        typeof localStorage < "u" && localStorage.setItem(i.WCM_VERSION, "2.5.4");
    },
    getWalletRouterData () {
        var e;
        const t = (e = N.state.data) == null ? void 0 : e.Wallet;
        if (!t) throw new Error('Missing "Wallet" view data');
        return t;
    }
}, T = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https")), a = (0, _vanilla.proxy)({
    enabled: T,
    userSessionId: "",
    events: [],
    connectedWalletId: void 0
}), $ = {
    state: a,
    subscribe (e) {
        return (0, _vanilla.subscribe)(a.events, ()=>e((0, _vanilla.snapshot)(a.events[a.events.length - 1])));
    },
    initialize () {
        a.enabled && typeof (crypto == null ? void 0 : crypto.randomUUID) < "u" && (a.userSessionId = crypto.randomUUID());
    },
    setConnectedWalletId (e) {
        a.connectedWalletId = e;
    },
    click (e) {
        if (a.enabled) {
            const t = {
                type: "CLICK",
                name: e.name,
                userSessionId: a.userSessionId,
                timestamp: Date.now(),
                data: e
            };
            a.events.push(t);
        }
    },
    track (e) {
        if (a.enabled) {
            const t = {
                type: "TRACK",
                name: e.name,
                userSessionId: a.userSessionId,
                timestamp: Date.now(),
                data: e
            };
            a.events.push(t);
        }
    },
    view (e) {
        if (a.enabled) {
            const t = {
                type: "VIEW",
                name: e.name,
                userSessionId: a.userSessionId,
                timestamp: Date.now(),
                data: e
            };
            a.events.push(t);
        }
    }
}, l = (0, _vanilla.proxy)({
    chains: void 0,
    walletConnectUri: void 0,
    isAuth: !1,
    isCustomDesktop: !1,
    isCustomMobile: !1,
    isDataLoaded: !1,
    isUiLoaded: !1
}), c = {
    state: l,
    subscribe (e) {
        return (0, _vanilla.subscribe)(l, ()=>e(l));
    },
    setChains (e) {
        l.chains = e;
    },
    setWalletConnectUri (e) {
        l.walletConnectUri = e;
    },
    setIsCustomDesktop (e) {
        l.isCustomDesktop = e;
    },
    setIsCustomMobile (e) {
        l.isCustomMobile = e;
    },
    setIsDataLoaded (e) {
        l.isDataLoaded = e;
    },
    setIsUiLoaded (e) {
        l.isUiLoaded = e;
    },
    setIsAuth (e) {
        l.isAuth = e;
    }
}, y = (0, _vanilla.proxy)({
    projectId: "",
    mobileWallets: void 0,
    desktopWallets: void 0,
    walletImages: void 0,
    chains: void 0,
    enableAuthMode: !1,
    enableExplorer: !0,
    explorerExcludedWalletIds: void 0,
    explorerRecommendedWalletIds: void 0,
    termsOfServiceUrl: void 0,
    privacyPolicyUrl: void 0
}), C = {
    state: y,
    subscribe (e) {
        return (0, _vanilla.subscribe)(y, ()=>e(y));
    },
    setConfig (e) {
        var t, s;
        $.initialize(), c.setChains(e.chains), c.setIsAuth(Boolean(e.enableAuthMode)), c.setIsCustomMobile(Boolean((t = e.mobileWallets) == null ? void 0 : t.length)), c.setIsCustomDesktop(Boolean((s = e.desktopWallets) == null ? void 0 : s.length)), i.setModalVersionInStorage(), Object.assign(y, e);
    }
}, W = "https://explorer-api.walletconnect.com";
async function L(e, t) {
    const s = new URL(e, W);
    return s.searchParams.append("projectId", C.state.projectId), Object.entries(t).forEach(([o, r])=>{
        r && s.searchParams.append(o, String(r));
    }), (await fetch(s)).json();
}
const m = {
    async getDesktopListings (e) {
        return L("/w3m/v1/getDesktopListings", e);
    },
    async getMobileListings (e) {
        return L("/w3m/v1/getMobileListings", e);
    },
    async getInjectedListings (e) {
        return L("/w3m/v1/getInjectedListings", e);
    },
    async getAllListings (e) {
        return L("/w3m/v1/getAllListings", e);
    },
    getWalletImageUrl (e) {
        return `${W}/w3m/v1/getWalletImage/${e}?projectId=${C.state.projectId}`;
    },
    getAssetImageUrl (e) {
        return `${W}/w3m/v1/getAssetImage/${e}?projectId=${C.state.projectId}`;
    }
};
var P = Object.defineProperty, O = Object.getOwnPropertySymbols, _ = Object.prototype.hasOwnProperty, R = Object.prototype.propertyIsEnumerable, U = (e, t, s)=>t in e ? P(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : e[t] = s, B = (e, t)=>{
    for(var s in t || (t = {}))_.call(t, s) && U(e, s, t[s]);
    if (O) for (var s of O(t))R.call(t, s) && U(e, s, t[s]);
    return e;
};
const D = i.isMobile(), d = (0, _vanilla.proxy)({
    wallets: {
        listings: [],
        total: 0,
        page: 1
    },
    search: {
        listings: [],
        total: 0,
        page: 1
    },
    recomendedWallets: []
}), G = {
    state: d,
    async getRecomendedWallets () {
        const { explorerRecommendedWalletIds: e, explorerExcludedWalletIds: t } = C.state;
        if (e === "NONE" || t === "ALL" && !e) return d.recomendedWallets;
        if (i.isArray(e)) {
            const s = {
                recommendedIds: e.join(",")
            }, { listings: o } = await m.getAllListings(s), r = Object.values(o);
            r.sort((u, v)=>{
                const w = e.indexOf(u.id), f = e.indexOf(v.id);
                return w - f;
            }), d.recomendedWallets = r;
        } else {
            const { chains: s, isAuth: o } = c.state, r = s?.join(","), u = i.isArray(t), v = {
                page: 1,
                sdks: o ? "auth_v1" : void 0,
                entries: i.RECOMMENDED_WALLET_AMOUNT,
                chains: r,
                version: 2,
                excludedIds: u ? t.join(",") : void 0
            }, { listings: w } = D ? await m.getMobileListings(v) : await m.getDesktopListings(v);
            d.recomendedWallets = Object.values(w);
        }
        return d.recomendedWallets;
    },
    async getWallets (e) {
        const t = B({}, e), { explorerRecommendedWalletIds: s, explorerExcludedWalletIds: o } = C.state, { recomendedWallets: r } = d;
        if (o === "ALL") return d.wallets;
        t.search || (r.length ? t.excludedIds = r.map((S)=>S.id).join(",") : i.isArray(s) && (t.excludedIds = s.join(","))), i.isArray(o) && (t.excludedIds = [
            t.excludedIds,
            o
        ].filter(Boolean).join(",")), c.state.isAuth && (t.sdks = "auth_v1");
        const { page: u, search: v } = e, { listings: w, total: f } = D ? await m.getMobileListings(t) : await m.getDesktopListings(t), E = Object.values(w), A = v ? "search" : "wallets";
        return d[A] = {
            listings: [
                ...d[A].listings,
                ...E
            ],
            total: f,
            page: u ?? 1
        }, {
            listings: E,
            total: f
        };
    },
    getWalletImageUrl (e) {
        return m.getWalletImageUrl(e);
    },
    getAssetImageUrl (e) {
        return m.getAssetImageUrl(e);
    },
    resetSearch () {
        d.search = {
            listings: [],
            total: 0,
            page: 1
        };
    }
}, I = (0, _vanilla.proxy)({
    open: !1
}), Q = {
    state: I,
    subscribe (e) {
        return (0, _vanilla.subscribe)(I, ()=>e(I));
    },
    async open (e) {
        return new Promise((t)=>{
            const { isUiLoaded: s, isDataLoaded: o } = c.state;
            if (c.setWalletConnectUri(e?.uri), c.setChains(e?.chains), N.reset("ConnectWallet"), s && o) I.open = !0, t();
            else {
                const r = setInterval(()=>{
                    const u = c.state;
                    u.isUiLoaded && u.isDataLoaded && (clearInterval(r), I.open = !0, t());
                }, 200);
            }
        });
    },
    close () {
        I.open = !1;
    }
};
var H = Object.defineProperty, M = Object.getOwnPropertySymbols, V = Object.prototype.hasOwnProperty, K = Object.prototype.propertyIsEnumerable, j = (e, t, s)=>t in e ? H(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : e[t] = s, z = (e, t)=>{
    for(var s in t || (t = {}))V.call(t, s) && j(e, s, t[s]);
    if (M) for (var s of M(t))K.call(t, s) && j(e, s, t[s]);
    return e;
};
function J() {
    return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches;
}
const b = (0, _vanilla.proxy)({
    themeMode: J() ? "dark" : "light"
}), X = {
    state: b,
    subscribe (e) {
        return (0, _vanilla.subscribe)(b, ()=>e(b));
    },
    setThemeConfig (e) {
        const { themeMode: t, themeVariables: s } = e;
        t && (b.themeMode = t), s && (b.themeVariables = z({}, s));
    }
}, g = (0, _vanilla.proxy)({
    open: !1,
    message: "",
    variant: "success"
}), Y = {
    state: g,
    subscribe (e) {
        return (0, _vanilla.subscribe)(g, ()=>e(g));
    },
    openToast (e, t) {
        g.open = !0, g.message = e, g.variant = t;
    },
    closeToast () {
        g.open = !1;
    }
};
typeof window < "u" && (window.Buffer || (window.Buffer = (0, _buffer.Buffer)), window.global || (window.global = window), window.process || (window.process = {
    env: {}
}), window.global || (window.global = window));

},{"valtio/vanilla":"gyoEY","buffer":"fCgem","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5MlJv":[function(require,module,exports) {
module.exports = Promise.all([
    require("4d934411f3497743")(require("6019bcd6b6905e5b").getBundleURL("9QMwA") + "dist.6d0255d4.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    }),
    require("4d934411f3497743")(require("6019bcd6b6905e5b").getBundleURL("9QMwA") + "dist.5b6aaa6e.js" + "?" + Date.now()).catch((err)=>{
        delete module.bundle.cache[module.id];
        throw err;
    })
]).then(()=>module.bundle.root("8gWsJ"));

},{"4d934411f3497743":"61B45","6019bcd6b6905e5b":"lgJ39"}]},["2Avys"], null, "parcelRequired248")

//# sourceMappingURL=dist.62777089.js.map
