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
})({"1E2TZ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "b122dae3d679753d";
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

},{}],"6MFRU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EthereumProvider", ()=>Y);
parcelHelpers.export(exports, "OPTIONAL_EVENTS", ()=>U);
parcelHelpers.export(exports, "OPTIONAL_METHODS", ()=>D);
parcelHelpers.export(exports, "REQUIRED_EVENTS", ()=>u);
parcelHelpers.export(exports, "REQUIRED_METHODS", ()=>p);
parcelHelpers.export(exports, "default", ()=>m);
var _events = require("events");
var _utils = require("@walletconnect/utils");
var _universalProvider = require("@walletconnect/universal-provider");
const $ = "wc", j = "ethereum_provider", q = `${$}@2:${j}:`, N = "https://rpc.walletconnect.com/v1/", p = [
    "eth_sendTransaction",
    "personal_sign"
], D = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode"
], u = [
    "chainChanged",
    "accountsChanged"
], U = [
    "message",
    "disconnect",
    "connect"
];
var Q = Object.defineProperty, L = Object.defineProperties, G = Object.getOwnPropertyDescriptors, _ = Object.getOwnPropertySymbols, K = Object.prototype.hasOwnProperty, V = Object.prototype.propertyIsEnumerable, y = (a, t, s)=>t in a ? Q(a, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : a[t] = s, C = (a, t)=>{
    for(var s in t || (t = {}))K.call(t, s) && y(a, s, t[s]);
    if (_) for (var s of _(t))V.call(t, s) && y(a, s, t[s]);
    return a;
}, O = (a, t)=>L(a, G(t));
function I(a) {
    return Number(a[0].split(":")[1]);
}
function w(a) {
    return `0x${a.toString(16)}`;
}
function W(a) {
    const { chains: t, optionalChains: s, methods: i, optionalMethods: n, events: e, optionalEvents: c, rpcMap: h } = a;
    if (!(0, _utils.isValidArray)(t)) throw new Error("Invalid chains");
    const o = t, r = i || p, E = e || u, M = {
        [I(o)]: h[I(o)]
    }, f = {
        chains: o,
        methods: r,
        events: E,
        rpcMap: M
    }, l = e?.filter((g)=>!u.includes(g)), d = i?.filter((g)=>!p.includes(g));
    if (!s && !c && !n && !(l != null && l.length) && !(d != null && d.length)) return {
        required: f
    };
    const b = l?.length && d?.length || !s, A = {
        chains: [
            ...new Set(b ? o.concat(s || []) : s)
        ],
        methods: [
            ...new Set(r.concat(n || []))
        ],
        events: [
            ...new Set(E.concat(c || []))
        ],
        rpcMap: h
    };
    return {
        required: f,
        optional: A
    };
}
class m {
    constructor(){
        this.events = new (0, _events.EventEmitter), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = q, this.on = (t, s)=>(this.events.on(t, s), this), this.once = (t, s)=>(this.events.once(t, s), this), this.removeListener = (t, s)=>(this.events.removeListener(t, s), this), this.off = (t, s)=>(this.events.off(t, s), this), this.parseAccount = (t)=>this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t, this.signer = {}, this.rpc = {};
    }
    static async init(t) {
        const s = new m;
        return await s.initialize(t), s;
    }
    async request(t) {
        return await this.signer.request(t, this.formatChainId(this.chainId));
    }
    sendAsync(t, s) {
        this.signer.sendAsync(t, s, this.formatChainId(this.chainId));
    }
    get connected() {
        return this.signer.client ? this.signer.client.core.relayer.connected : !1;
    }
    get connecting() {
        return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
    }
    async enable() {
        return this.session || await this.connect(), await this.request({
            method: "eth_requestAccounts"
        });
    }
    async connect(t) {
        if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts(t);
        const { required: s, optional: i } = W(this.rpc);
        try {
            const n = await new Promise(async (c, h)=>{
                var o;
                this.rpc.showQrModal && ((o = this.modal) == null || o.subscribeModal((r)=>{
                    !r.open && !this.signer.session && (this.signer.abortPairingAttempt(), h(new Error("Connection request reset. Please try again.")));
                })), await this.signer.connect(O(C({
                    namespaces: {
                        [this.namespace]: s
                    }
                }, i && {
                    optionalNamespaces: {
                        [this.namespace]: i
                    }
                }), {
                    pairingTopic: t?.pairingTopic
                })).then((r)=>{
                    c(r);
                }).catch((r)=>{
                    h(new Error(r.message));
                });
            });
            if (!n) return;
            this.setChainIds(this.rpc.chains);
            const e = (0, _utils.getAccountsFromNamespaces)(n.namespaces, [
                this.namespace
            ]);
            this.setAccounts(e), this.events.emit("connect", {
                chainId: w(this.chainId)
            });
        } catch (n) {
            throw this.signer.logger.error(n), n;
        } finally{
            this.modal && this.modal.closeModal();
        }
    }
    async disconnect() {
        this.session && await this.signer.disconnect(), this.reset();
    }
    get isWalletConnect() {
        return !0;
    }
    get session() {
        return this.signer.session;
    }
    registerEventListeners() {
        this.signer.on("session_event", (t)=>{
            const { params: s } = t, { event: i } = s;
            i.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i.data), this.events.emit("accountsChanged", this.accounts)) : i.name === "chainChanged" ? this.setChainId(this.formatChainId(i.data)) : this.events.emit(i.name, i.data), this.events.emit("session_event", t);
        }), this.signer.on("chainChanged", (t)=>{
            const s = parseInt(t);
            this.chainId = s, this.events.emit("chainChanged", w(this.chainId)), this.persist();
        }), this.signer.on("session_update", (t)=>{
            this.events.emit("session_update", t);
        }), this.signer.on("session_delete", (t)=>{
            this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", O(C({}, (0, _utils.getSdkError)("USER_DISCONNECTED")), {
                data: t.topic,
                name: "USER_DISCONNECTED"
            }));
        }), this.signer.on("display_uri", (t)=>{
            var s, i;
            this.rpc.showQrModal && ((s = this.modal) == null || s.closeModal(), (i = this.modal) == null || i.openModal({
                uri: t
            })), this.events.emit("display_uri", t);
        });
    }
    switchEthereumChain(t) {
        this.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: t.toString(16)
                }
            ]
        });
    }
    isCompatibleChainId(t) {
        return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : !1;
    }
    formatChainId(t) {
        return `${this.namespace}:${t}`;
    }
    parseChainId(t) {
        return Number(t.split(":")[1]);
    }
    setChainIds(t) {
        const s = t.filter((i)=>this.isCompatibleChainId(i)).map((i)=>this.parseChainId(i));
        s.length && (this.chainId = s[0], this.events.emit("chainChanged", w(this.chainId)), this.persist());
    }
    setChainId(t) {
        if (this.isCompatibleChainId(t)) {
            const s = this.parseChainId(t);
            this.chainId = s, this.switchEthereumChain(s);
        }
    }
    parseAccountId(t) {
        const [s, i, n] = t.split(":");
        return {
            chainId: `${s}:${i}`,
            address: n
        };
    }
    setAccounts(t) {
        this.accounts = t.filter((s)=>this.parseChainId(this.parseAccountId(s).chainId) === this.chainId).map((s)=>this.parseAccountId(s).address), this.events.emit("accountsChanged", this.accounts);
    }
    getRpcConfig(t) {
        var s, i;
        return {
            chains: ((s = t.chains) == null ? void 0 : s.map((n)=>this.formatChainId(n))) || [
                `${this.namespace}:1`
            ],
            optionalChains: t.optionalChains ? t.optionalChains.map((n)=>this.formatChainId(n)) : void 0,
            methods: t?.methods || p,
            events: t?.events || u,
            optionalMethods: t?.optionalMethods || [],
            optionalEvents: t?.optionalEvents || [],
            rpcMap: t?.rpcMap || this.buildRpcMap(t.chains.concat(t.optionalChains || []), t.projectId),
            showQrModal: !!(t != null && t.showQrModal),
            qrModalOptions: (i = t?.qrModalOptions) != null ? i : void 0,
            projectId: t.projectId,
            metadata: t.metadata
        };
    }
    buildRpcMap(t, s) {
        const i = {};
        return t.forEach((n)=>{
            i[n] = this.getRpcUrl(n, s);
        }), i;
    }
    async initialize(t) {
        if (this.rpc = this.getRpcConfig(t), this.chainId = I(this.rpc.chains), this.signer = await (0, _universalProvider.UniversalProvider).init({
            projectId: this.rpc.projectId,
            metadata: this.rpc.metadata,
            disableProviderPing: t.disableProviderPing,
            relayUrl: t.relayUrl,
            storageOptions: t.storageOptions
        }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
            let s;
            try {
                const { WalletConnectModal: i } = await require("c714745e2875d7ab");
                s = i;
            } catch  {
                throw new Error("To use QR modal, please install @walletconnect/modal package");
            }
            if (s) try {
                this.modal = new s(C({
                    walletConnectVersion: 2,
                    projectId: this.rpc.projectId,
                    standaloneChains: this.rpc.chains
                }, this.rpc.qrModalOptions));
            } catch (i) {
                throw this.signer.logger.error(i), new Error("Could not generate WalletConnectModal Instance");
            }
        }
    }
    loadConnectOpts(t) {
        if (!t) return;
        const { chains: s, optionalChains: i, rpcMap: n } = t;
        s && (0, _utils.isValidArray)(s) && (this.rpc.chains = s.map((e)=>this.formatChainId(e)), s.forEach((e)=>{
            this.rpc.rpcMap[e] = n?.[e] || this.getRpcUrl(e);
        })), i && (0, _utils.isValidArray)(i) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i?.map((e)=>this.formatChainId(e)), i.forEach((e)=>{
            this.rpc.rpcMap[e] = n?.[e] || this.getRpcUrl(e);
        }));
    }
    getRpcUrl(t, s) {
        var i;
        return ((i = this.rpc.rpcMap) == null ? void 0 : i[t]) || `${N}?chainId=eip155:${t}&projectId=${s || this.rpc.projectId}`;
    }
    async loadPersistedSession() {
        if (!this.session) return;
        const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
        this.setChainIds(t ? [
            this.formatChainId(t)
        ] : s?.accounts), this.setAccounts(s?.accounts);
    }
    reset() {
        this.chainId = 1, this.accounts = [];
    }
    persist() {
        this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
    }
    parseAccounts(t) {
        return typeof t == "string" || t instanceof String ? [
            this.parseAccount(t)
        ] : t.map((s)=>this.parseAccount(s));
    }
}
const Y = m;

},{"events":"1VQLm","@walletconnect/utils":"o3k5L","@walletconnect/universal-provider":"h3ciq","c714745e2875d7ab":"5e94t","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1VQLm":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") ReflectOwnKeys = R.ownKeys;
else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
};
else ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
};
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === "error";
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
        // At least give some kind of context to the user
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === "function") ReflectApply(handler, this, args);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === "function") // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [
            listener,
            existing
        ] : [
            existing,
            listener
        ];
        else if (prepend) existing.unshift(listener);
        else existing.push(listener);
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
        }
    } else if (typeof list !== "function") {
        position = -1;
        for(i = list.length - 1; i >= 0; i--)if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else spliceOne(list, position);
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === "function") this.removeListener(type, listeners);
    else if (listeners !== undefined) // LIFO order
    for(i = listeners.length - 1; i >= 0; i--)this.removeListener(type, listeners[i]);
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === "function") return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
    else return listenerCount.call(emitter, type);
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === "function") return 1;
        else if (evlistener !== undefined) return evlistener.length;
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i)ret[i] = arr[i].listener || arr[i];
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
            resolve([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== "error") addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
        });
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") eventTargetAgnosticAddListener(emitter, "error", handler, flags);
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
        if (flags.once) emitter.once(name, listener);
        else emitter.on(name, listener);
    } else if (typeof emitter.addEventListener === "function") // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) emitter.removeEventListener(name, wrapListener);
        listener(arg);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
}

},{}],"o3k5L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BASE10", ()=>W);
parcelHelpers.export(exports, "BASE16", ()=>f);
parcelHelpers.export(exports, "BASE64", ()=>K);
parcelHelpers.export(exports, "COLON", ()=>Ln);
parcelHelpers.export(exports, "DEFAULT_DEPTH", ()=>X);
parcelHelpers.export(exports, "EMPTY_SPACE", ()=>L);
parcelHelpers.export(exports, "ENV_MAP", ()=>b);
parcelHelpers.export(exports, "ONE_THOUSAND", ()=>xn);
parcelHelpers.export(exports, "REACT_NATIVE_PRODUCT", ()=>Ue);
parcelHelpers.export(exports, "RELAYER_DEFAULT_PROTOCOL", ()=>xe);
parcelHelpers.export(exports, "SDK_TYPE", ()=>_e);
parcelHelpers.export(exports, "SLASH", ()=>Ae);
parcelHelpers.export(exports, "TYPE_0", ()=>Y);
parcelHelpers.export(exports, "TYPE_1", ()=>A);
parcelHelpers.export(exports, "UTF8", ()=>k);
parcelHelpers.export(exports, "appendToQueryString", ()=>Ce);
parcelHelpers.export(exports, "assertType", ()=>Gn);
parcelHelpers.export(exports, "buildApprovedNamespaces", ()=>Pt);
parcelHelpers.export(exports, "calcExpiry", ()=>ot);
parcelHelpers.export(exports, "capitalize", ()=>Zn);
parcelHelpers.export(exports, "capitalizeWord", ()=>Le);
parcelHelpers.export(exports, "createDelayedPromise", ()=>Xn);
parcelHelpers.export(exports, "createExpiringPromise", ()=>et);
parcelHelpers.export(exports, "decodeTypeByte", ()=>$);
parcelHelpers.export(exports, "decrypt", ()=>Cn);
parcelHelpers.export(exports, "deriveSymKey", ()=>An);
parcelHelpers.export(exports, "deserialize", ()=>Z);
parcelHelpers.export(exports, "encodeTypeByte", ()=>Se);
parcelHelpers.export(exports, "encrypt", ()=>jn);
parcelHelpers.export(exports, "engineEvent", ()=>it);
parcelHelpers.export(exports, "enumify", ()=>Qn);
parcelHelpers.export(exports, "formatAccountId", ()=>he);
parcelHelpers.export(exports, "formatAccountWithChain", ()=>Nn);
parcelHelpers.export(exports, "formatChainId", ()=>ye);
parcelHelpers.export(exports, "formatExpirerTarget", ()=>ne);
parcelHelpers.export(exports, "formatIdTarget", ()=>tt);
parcelHelpers.export(exports, "formatMessage", ()=>Tn);
parcelHelpers.export(exports, "formatMessageContext", ()=>Bn);
parcelHelpers.export(exports, "formatRelayParams", ()=>Ge);
parcelHelpers.export(exports, "formatRelayRpcUrl", ()=>qn);
parcelHelpers.export(exports, "formatTopicTarget", ()=>nt);
parcelHelpers.export(exports, "formatUA", ()=>Me);
parcelHelpers.export(exports, "formatUri", ()=>yt);
parcelHelpers.export(exports, "generateKeyPair", ()=>wn);
parcelHelpers.export(exports, "generateRandomBytes32", ()=>Un);
parcelHelpers.export(exports, "getAccountsChains", ()=>R);
parcelHelpers.export(exports, "getAccountsFromNamespaces", ()=>On);
parcelHelpers.export(exports, "getAddressFromAccount", ()=>Ee);
parcelHelpers.export(exports, "getAddressesFromAccounts", ()=>bn);
parcelHelpers.export(exports, "getAppMetadata", ()=>Fn);
parcelHelpers.export(exports, "getChainFromAccount", ()=>ve);
parcelHelpers.export(exports, "getChainsFromAccounts", ()=>ge);
parcelHelpers.export(exports, "getChainsFromNamespace", ()=>V);
parcelHelpers.export(exports, "getChainsFromNamespaces", ()=>Sn);
parcelHelpers.export(exports, "getChainsFromRequiredNamespaces", ()=>Pn);
parcelHelpers.export(exports, "getDidAddress", ()=>be);
parcelHelpers.export(exports, "getDidAddressSegments", ()=>M);
parcelHelpers.export(exports, "getDidChainId", ()=>Ne);
parcelHelpers.export(exports, "getEnvironment", ()=>x);
parcelHelpers.export(exports, "getHttpUrl", ()=>zn);
parcelHelpers.export(exports, "getInternalError", ()=>N);
parcelHelpers.export(exports, "getJavascriptID", ()=>Ve);
parcelHelpers.export(exports, "getJavascriptOS", ()=>De);
parcelHelpers.export(exports, "getLastItems", ()=>ke);
parcelHelpers.export(exports, "getNamespacedDidChainId", ()=>In);
parcelHelpers.export(exports, "getNamespacesChains", ()=>Ye);
parcelHelpers.export(exports, "getNamespacesEventsForChainId", ()=>Qe);
parcelHelpers.export(exports, "getNamespacesMethodsForChainId", ()=>Je);
parcelHelpers.export(exports, "getRelayClientMetadata", ()=>Hn);
parcelHelpers.export(exports, "getRelayProtocolApi", ()=>ut);
parcelHelpers.export(exports, "getRelayProtocolName", ()=>at);
parcelHelpers.export(exports, "getRequiredNamespacesFromNamespaces", ()=>St);
parcelHelpers.export(exports, "getSdkError", ()=>w);
parcelHelpers.export(exports, "getUniqueValues", ()=>B);
parcelHelpers.export(exports, "handleDeeplinkRedirect", ()=>ct);
parcelHelpers.export(exports, "hasOverlap", ()=>O);
parcelHelpers.export(exports, "hashKey", ()=>_n);
parcelHelpers.export(exports, "hashMessage", ()=>$n);
parcelHelpers.export(exports, "isBrowser", ()=>je);
parcelHelpers.export(exports, "isCaipNamespace", ()=>te);
parcelHelpers.export(exports, "isConformingNamespaces", ()=>an);
parcelHelpers.export(exports, "isExpired", ()=>st);
parcelHelpers.export(exports, "isNode", ()=>ee);
parcelHelpers.export(exports, "isProposalStruct", ()=>Ut);
parcelHelpers.export(exports, "isReactNative", ()=>$e);
parcelHelpers.export(exports, "isSessionCompatible", ()=>Rt);
parcelHelpers.export(exports, "isSessionStruct", ()=>At);
parcelHelpers.export(exports, "isTypeOneEnvelope", ()=>Vn);
parcelHelpers.export(exports, "isUndefined", ()=>P);
parcelHelpers.export(exports, "isValidAccountId", ()=>Xe);
parcelHelpers.export(exports, "isValidAccounts", ()=>tn);
parcelHelpers.export(exports, "isValidActions", ()=>on);
parcelHelpers.export(exports, "isValidArray", ()=>j);
parcelHelpers.export(exports, "isValidChainId", ()=>q);
parcelHelpers.export(exports, "isValidChains", ()=>en);
parcelHelpers.export(exports, "isValidController", ()=>_t);
parcelHelpers.export(exports, "isValidErrorReason", ()=>Vt);
parcelHelpers.export(exports, "isValidEvent", ()=>kt);
parcelHelpers.export(exports, "isValidId", ()=>Ct);
parcelHelpers.export(exports, "isValidNamespaceAccounts", ()=>rn);
parcelHelpers.export(exports, "isValidNamespaceActions", ()=>se);
parcelHelpers.export(exports, "isValidNamespaceChains", ()=>nn);
parcelHelpers.export(exports, "isValidNamespaceMethodsOrEvents", ()=>oe);
parcelHelpers.export(exports, "isValidNamespaces", ()=>sn);
parcelHelpers.export(exports, "isValidNamespacesChainId", ()=>Lt);
parcelHelpers.export(exports, "isValidNamespacesEvent", ()=>Ft);
parcelHelpers.export(exports, "isValidNamespacesRequest", ()=>xt);
parcelHelpers.export(exports, "isValidNumber", ()=>H);
parcelHelpers.export(exports, "isValidObject", ()=>F);
parcelHelpers.export(exports, "isValidParams", ()=>Dt);
parcelHelpers.export(exports, "isValidRelay", ()=>cn);
parcelHelpers.export(exports, "isValidRelays", ()=>jt);
parcelHelpers.export(exports, "isValidRequest", ()=>Mt);
parcelHelpers.export(exports, "isValidRequestExpiry", ()=>zt);
parcelHelpers.export(exports, "isValidRequiredNamespaces", ()=>$t);
parcelHelpers.export(exports, "isValidResponse", ()=>Kt);
parcelHelpers.export(exports, "isValidString", ()=>m);
parcelHelpers.export(exports, "isValidUrl", ()=>wt);
parcelHelpers.export(exports, "mapEntries", ()=>Jn);
parcelHelpers.export(exports, "mapToObj", ()=>Wn);
parcelHelpers.export(exports, "mergeArrays", ()=>S);
parcelHelpers.export(exports, "normalizeNamespaces", ()=>re);
parcelHelpers.export(exports, "objToMap", ()=>Yn);
parcelHelpers.export(exports, "parseAccountId", ()=>G);
parcelHelpers.export(exports, "parseChainId", ()=>me);
parcelHelpers.export(exports, "parseContextNames", ()=>Ke);
parcelHelpers.export(exports, "parseExpirerTarget", ()=>rt);
parcelHelpers.export(exports, "parseNamespaceKey", ()=>Ze);
parcelHelpers.export(exports, "parseRelayParams", ()=>qe);
parcelHelpers.export(exports, "parseTopic", ()=>ze);
parcelHelpers.export(exports, "parseUri", ()=>mt);
parcelHelpers.export(exports, "serialize", ()=>Pe);
parcelHelpers.export(exports, "validateDecoding", ()=>Dn);
parcelHelpers.export(exports, "validateEncoding", ()=>Ie);
var _chacha20Poly1305 = require("@stablelib/chacha20poly1305");
var _hkdf = require("@stablelib/hkdf");
var _random = require("@stablelib/random");
var _sha256 = require("@stablelib/sha256");
var _x25519 = require("@stablelib/x25519");
var _uint8Arrays = require("uint8arrays");
var _detectBrowser = require("detect-browser");
var _time = require("@walletconnect/time");
var _windowGetters = require("@walletconnect/window-getters");
var _windowMetadata = require("@walletconnect/window-metadata");
var _queryString = require("query-string");
var _relayApi = require("@walletconnect/relay-api");
var process = require("8f49c8c44d164f1a");
var global = arguments[3];
const D = ":";
function me(e) {
    const [n, t] = e.split(D);
    return {
        namespace: n,
        reference: t
    };
}
function ye(e) {
    const { namespace: n, reference: t } = e;
    return [
        n,
        t
    ].join(D);
}
function G(e) {
    const [n, t, r] = e.split(D);
    return {
        namespace: n,
        reference: t,
        address: r
    };
}
function he(e) {
    const { namespace: n, reference: t, address: r } = e;
    return [
        n,
        t,
        r
    ].join(D);
}
function B(e, n) {
    const t = [];
    return e.forEach((r)=>{
        const o = n(r);
        t.includes(o) || t.push(o);
    }), t;
}
function Ee(e) {
    const { address: n } = G(e);
    return n;
}
function ve(e) {
    const { namespace: n, reference: t } = G(e);
    return ye({
        namespace: n,
        reference: t
    });
}
function Nn(e, n) {
    const { namespace: t, reference: r } = me(n);
    return he({
        namespace: t,
        reference: r,
        address: e
    });
}
function bn(e) {
    return B(e, Ee);
}
function ge(e) {
    return B(e, ve);
}
function On(e, n = []) {
    const t = [];
    return Object.keys(e).forEach((r)=>{
        if (n.length && !n.includes(r)) return;
        const o = e[r];
        t.push(...o.accounts);
    }), t;
}
function Sn(e, n = []) {
    const t = [];
    return Object.keys(e).forEach((r)=>{
        if (n.length && !n.includes(r)) return;
        const o = e[r];
        t.push(...ge(o.accounts));
    }), t;
}
function Pn(e, n = []) {
    const t = [];
    return Object.keys(e).forEach((r)=>{
        if (n.length && !n.includes(r)) return;
        const o = e[r];
        t.push(...V(r, o));
    }), t;
}
function V(e, n) {
    return e.includes(":") ? [
        e
    ] : n.chains || [];
}
const M = (e)=>e?.split(":"), Ne = (e)=>{
    const n = e && M(e);
    if (n) return n[3];
}, In = (e)=>{
    const n = e && M(e);
    if (n) return n[2] + ":" + n[3];
}, be = (e)=>{
    const n = e && M(e);
    if (n) return n.pop();
}, Tn = (e, n)=>{
    const t = `${e.domain} wants you to sign in with your Ethereum account:`, r = be(n), o = e.statement, s = `URI: ${e.aud}`, i = `Version: ${e.version}`, l = `Chain ID: ${Ne(n)}`, d = `Nonce: ${e.nonce}`, c = `Issued At: ${e.iat}`, u = e.resources && e.resources.length > 0 ? `Resources:
${e.resources.map((a)=>`- ${a}`).join(`
`)}` : void 0;
    return [
        t,
        r,
        "",
        o,
        "",
        s,
        i,
        l,
        d,
        c,
        u
    ].filter((a)=>a != null).join(`
`);
}, W = "base10", f = "base16", K = "base64pad", k = "utf8", Y = 0, A = 1, Rn = 0, Oe = 1, J = 12, Q = 32;
function wn() {
    const e = _x25519.generateKeyPair();
    return {
        privateKey: (0, _uint8Arrays.toString)(e.secretKey, f),
        publicKey: (0, _uint8Arrays.toString)(e.publicKey, f)
    };
}
function Un() {
    const e = (0, _random.randomBytes)(Q);
    return (0, _uint8Arrays.toString)(e, f);
}
function An(e, n) {
    const t = _x25519.sharedKey((0, _uint8Arrays.fromString)(e, f), (0, _uint8Arrays.fromString)(n, f)), r = new (0, _hkdf.HKDF)((0, _sha256.SHA256), t).expand(Q);
    return (0, _uint8Arrays.toString)(r, f);
}
function _n(e) {
    const n = (0, _sha256.hash)((0, _uint8Arrays.fromString)(e, f));
    return (0, _uint8Arrays.toString)(n, f);
}
function $n(e) {
    const n = (0, _sha256.hash)((0, _uint8Arrays.fromString)(e, k));
    return (0, _uint8Arrays.toString)(n, f);
}
function Se(e) {
    return (0, _uint8Arrays.fromString)(`${e}`, W);
}
function $(e) {
    return Number((0, _uint8Arrays.toString)(e, W));
}
function jn(e) {
    const n = Se(typeof e.type < "u" ? e.type : Y);
    if ($(n) === A && typeof e.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    const t = typeof e.senderPublicKey < "u" ? (0, _uint8Arrays.fromString)(e.senderPublicKey, f) : void 0, r = typeof e.iv < "u" ? (0, _uint8Arrays.fromString)(e.iv, f) : (0, _random.randomBytes)(J), o = new (0, _chacha20Poly1305.ChaCha20Poly1305)((0, _uint8Arrays.fromString)(e.symKey, f)).seal(r, (0, _uint8Arrays.fromString)(e.message, k));
    return Pe({
        type: n,
        sealed: o,
        iv: r,
        senderPublicKey: t
    });
}
function Cn(e) {
    const n = new (0, _chacha20Poly1305.ChaCha20Poly1305)((0, _uint8Arrays.fromString)(e.symKey, f)), { sealed: t, iv: r } = Z(e.encoded), o = n.open(r, t);
    if (o === null) throw new Error("Failed to decrypt");
    return (0, _uint8Arrays.toString)(o, k);
}
function Pe(e) {
    if ($(e.type) === A) {
        if (typeof e.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
        return (0, _uint8Arrays.toString)((0, _uint8Arrays.concat)([
            e.type,
            e.senderPublicKey,
            e.iv,
            e.sealed
        ]), K);
    }
    return (0, _uint8Arrays.toString)((0, _uint8Arrays.concat)([
        e.type,
        e.iv,
        e.sealed
    ]), K);
}
function Z(e) {
    const n = (0, _uint8Arrays.fromString)(e, K), t = n.slice(Rn, Oe), r = Oe;
    if ($(t) === A) {
        const l = r + Q, d = l + J, c = n.slice(r, l), u = n.slice(l, d), a = n.slice(d);
        return {
            type: t,
            sealed: a,
            iv: u,
            senderPublicKey: c
        };
    }
    const o = r + J, s = n.slice(r, o), i = n.slice(o);
    return {
        type: t,
        sealed: i,
        iv: s
    };
}
function Dn(e, n) {
    const t = Z(e);
    return Ie({
        type: $(t.type),
        senderPublicKey: typeof t.senderPublicKey < "u" ? (0, _uint8Arrays.toString)(t.senderPublicKey, f) : void 0,
        receiverPublicKey: n?.receiverPublicKey
    });
}
function Ie(e) {
    const n = e?.type || Y;
    if (n === A) {
        if (typeof e?.senderPublicKey > "u") throw new Error("missing sender public key");
        if (typeof e?.receiverPublicKey > "u") throw new Error("missing receiver public key");
    }
    return {
        type: n,
        senderPublicKey: e?.senderPublicKey,
        receiverPublicKey: e?.receiverPublicKey
    };
}
function Vn(e) {
    return e.type === A && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
var Mn = Object.defineProperty, Te = Object.getOwnPropertySymbols, Kn = Object.prototype.hasOwnProperty, kn = Object.prototype.propertyIsEnumerable, Re = (e, n, t)=>n in e ? Mn(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t, we = (e, n)=>{
    for(var t in n || (n = {}))Kn.call(n, t) && Re(e, t, n[t]);
    if (Te) for (var t of Te(n))kn.call(n, t) && Re(e, t, n[t]);
    return e;
};
const Ue = "ReactNative", b = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown"
}, L = " ", Ln = ":", Ae = "/", X = 2, xn = 1e3, _e = "js";
function ee() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function $e() {
    return !(0, _windowGetters.getDocument)() && !!(0, _windowGetters.getNavigator)() && navigator.product === Ue;
}
function je() {
    return !ee() && !!(0, _windowGetters.getNavigator)();
}
function x() {
    return $e() ? b.reactNative : ee() ? b.node : je() ? b.browser : b.unknown;
}
function Ce(e, n) {
    let t = _queryString.parse(e);
    return t = we(we({}, t), n), e = _queryString.stringify(t), e;
}
function Fn() {
    return (0, _windowMetadata.getWindowMetadata)() || {
        name: "",
        description: "",
        url: "",
        icons: [
            ""
        ]
    };
}
function Hn(e, n) {
    var t;
    const r = x(), o = {
        protocol: e,
        version: n,
        env: r
    };
    return r === "browser" && (o.host = ((t = (0, _windowGetters.getLocation)()) == null ? void 0 : t.host) || "unknown"), o;
}
function De() {
    if (typeof (global == null ? void 0 : global.Platform) < "u") {
        const { OS: t, Version: r } = global.Platform;
        return [
            t,
            r
        ].join("-");
    }
    const e = (0, _detectBrowser.detect)();
    if (e === null) return "unknown";
    const n = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
    return e.type === "browser" ? [
        n,
        e.name,
        e.version
    ].join("-") : [
        n,
        e.version
    ].join("-");
}
function Ve() {
    var e;
    const n = x();
    return n === b.browser ? [
        n,
        ((e = (0, _windowGetters.getLocation)()) == null ? void 0 : e.host) || "unknown"
    ].join(":") : n;
}
function Me(e, n, t) {
    const r = De(), o = Ve();
    return [
        [
            e,
            n
        ].join("-"),
        [
            _e,
            t
        ].join("-"),
        r,
        o
    ].join("/");
}
function qn({ protocol: e, version: n, relayUrl: t, sdkVersion: r, auth: o, projectId: s, useOnCloseEvent: i }) {
    const l = t.split("?"), d = Me(e, n, r), c = {
        auth: o,
        ua: d,
        projectId: s,
        useOnCloseEvent: i || void 0
    }, u = Ce(l[1] || "", c);
    return l[0] + "?" + u;
}
function zn(e) {
    let n = (e.match(/^[^:]+(?=:\/\/)/gi) || [])[0];
    const t = typeof n < "u" ? e.split("://")[1] : e;
    return n = n === "wss" ? "https" : "http", [
        n,
        t
    ].join("://");
}
function Gn(e, n, t) {
    if (!e[n] || typeof e[n] !== t) throw new Error(`Missing or invalid "${n}" param`);
}
function Ke(e, n = X) {
    return ke(e.split(Ae), n);
}
function Bn(e) {
    return Ke(e).join(L);
}
function O(e, n) {
    return e.filter((t)=>n.includes(t)).length === e.length;
}
function ke(e, n = X) {
    return e.slice(Math.max(e.length - n, 0));
}
function Wn(e) {
    return Object.fromEntries(e.entries());
}
function Yn(e) {
    return new Map(Object.entries(e));
}
function Jn(e, n) {
    const t = {};
    return Object.keys(e).forEach((r)=>{
        t[r] = n(e[r]);
    }), t;
}
const Qn = (e)=>e;
function Le(e) {
    return e.trim().replace(/^\w/, (n)=>n.toUpperCase());
}
function Zn(e) {
    return e.split(L).map((n)=>Le(n)).join(L);
}
function Xn(e = (0, _time.FIVE_MINUTES), n) {
    const t = (0, _time.toMiliseconds)(e || (0, _time.FIVE_MINUTES));
    let r, o, s;
    return {
        resolve: (i)=>{
            s && r && (clearTimeout(s), r(i));
        },
        reject: (i)=>{
            s && o && (clearTimeout(s), o(i));
        },
        done: ()=>new Promise((i, l)=>{
                s = setTimeout(()=>{
                    l(new Error(n));
                }, t), r = i, o = l;
            })
    };
}
function et(e, n, t) {
    return new Promise(async (r, o)=>{
        const s = setTimeout(()=>o(new Error(t)), n);
        try {
            const i = await e;
            r(i);
        } catch (i) {
            o(i);
        }
        clearTimeout(s);
    });
}
function ne(e, n) {
    if (typeof n == "string" && n.startsWith(`${e}:`)) return n;
    if (e.toLowerCase() === "topic") {
        if (typeof n != "string") throw new Error('Value must be "string" for expirer target type: topic');
        return `topic:${n}`;
    } else if (e.toLowerCase() === "id") {
        if (typeof n != "number") throw new Error('Value must be "number" for expirer target type: id');
        return `id:${n}`;
    }
    throw new Error(`Unknown expirer target type: ${e}`);
}
function nt(e) {
    return ne("topic", e);
}
function tt(e) {
    return ne("id", e);
}
function rt(e) {
    const [n, t] = e.split(":"), r = {
        id: void 0,
        topic: void 0
    };
    if (n === "topic" && typeof t == "string") r.topic = t;
    else if (n === "id" && Number.isInteger(Number(t))) r.id = Number(t);
    else throw new Error(`Invalid target, expected id:number or topic:string, got ${n}:${t}`);
    return r;
}
function ot(e, n) {
    return (0, _time.fromMiliseconds)((n || Date.now()) + (0, _time.toMiliseconds)(e));
}
function st(e) {
    return Date.now() >= (0, _time.toMiliseconds)(e);
}
function it(e, n) {
    return `${e}${n ? `:${n}` : ""}`;
}
function S(e = [], n = []) {
    return [
        ...new Set([
            ...e,
            ...n
        ])
    ];
}
async function ct({ id: e, topic: n, wcDeepLink: t }) {
    try {
        if (!t) return;
        const r = typeof t == "string" ? JSON.parse(t) : t;
        let o = r?.href;
        if (typeof o != "string") return;
        o.endsWith("/") && (o = o.slice(0, -1));
        const s = `${o}/wc?requestId=${e}&sessionTopic=${n}`, i = x();
        i === b.browser ? window.open(s, "_self", "noreferrer noopener") : i === b.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(s);
    } catch (r) {
        console.error(r);
    }
}
const xe = "irn";
function at(e) {
    return e?.relay || {
        protocol: xe
    };
}
function ut(e) {
    const n = (0, _relayApi.RELAY_JSONRPC)[e];
    if (typeof n > "u") throw new Error(`Relay Protocol not supported: ${e}`);
    return n;
}
var lt = Object.defineProperty, Fe = Object.getOwnPropertySymbols, dt = Object.prototype.hasOwnProperty, ft = Object.prototype.propertyIsEnumerable, He = (e, n, t)=>n in e ? lt(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t, pt = (e, n)=>{
    for(var t in n || (n = {}))dt.call(n, t) && He(e, t, n[t]);
    if (Fe) for (var t of Fe(n))ft.call(n, t) && He(e, t, n[t]);
    return e;
};
function qe(e, n = "-") {
    const t = {}, r = "relay" + n;
    return Object.keys(e).forEach((o)=>{
        if (o.startsWith(r)) {
            const s = o.replace(r, ""), i = e[o];
            t[s] = i;
        }
    }), t;
}
function mt(e) {
    const n = e.indexOf(":"), t = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r = e.substring(0, n), o = e.substring(n + 1, t).split("@"), s = typeof t < "u" ? e.substring(t) : "", i = _queryString.parse(s);
    return {
        protocol: r,
        topic: ze(o[0]),
        version: parseInt(o[1], 10),
        symKey: i.symKey,
        relay: qe(i)
    };
}
function ze(e) {
    return e.startsWith("//") ? e.substring(2) : e;
}
function Ge(e, n = "-") {
    const t = "relay", r = {};
    return Object.keys(e).forEach((o)=>{
        const s = t + n + o;
        e[o] && (r[s] = e[o]);
    }), r;
}
function yt(e) {
    return `${e.protocol}:${e.topic}@${e.version}?` + _queryString.stringify(pt({
        symKey: e.symKey
    }, Ge(e.relay)));
}
var ht = Object.defineProperty, Et = Object.defineProperties, vt = Object.getOwnPropertyDescriptors, Be = Object.getOwnPropertySymbols, gt = Object.prototype.hasOwnProperty, Nt = Object.prototype.propertyIsEnumerable, We = (e, n, t)=>n in e ? ht(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t, bt = (e, n)=>{
    for(var t in n || (n = {}))gt.call(n, t) && We(e, t, n[t]);
    if (Be) for (var t of Be(n))Nt.call(n, t) && We(e, t, n[t]);
    return e;
}, Ot = (e, n)=>Et(e, vt(n));
function R(e) {
    const n = [];
    return e.forEach((t)=>{
        const [r, o] = t.split(":");
        n.push(`${r}:${o}`);
    }), n;
}
function Ye(e) {
    const n = [];
    return Object.values(e).forEach((t)=>{
        n.push(...R(t.accounts));
    }), n;
}
function Je(e, n) {
    const t = [];
    return Object.values(e).forEach((r)=>{
        R(r.accounts).includes(n) && t.push(...r.methods);
    }), t;
}
function Qe(e, n) {
    const t = [];
    return Object.values(e).forEach((r)=>{
        R(r.accounts).includes(n) && t.push(...r.events);
    }), t;
}
function St(e, n) {
    const t = sn(e, n);
    if (t) throw new Error(t.message);
    const r = {};
    for (const [o, s] of Object.entries(e))r[o] = {
        methods: s.methods,
        events: s.events,
        chains: s.accounts.map((i)=>`${i.split(":")[0]}:${i.split(":")[1]}`)
    };
    return r;
}
function Pt(e) {
    const { proposal: { requiredNamespaces: n, optionalNamespaces: t = {} }, supportedNamespaces: r } = e, o = re(n), s = re(t), i = {};
    Object.keys(r).forEach((c)=>{
        const u = r[c].chains, a = r[c].methods, g = r[c].events, U = r[c].accounts;
        i[c] = {
            chains: u,
            methods: a,
            events: g,
            accounts: U
        };
    });
    const l = an(n, i, "approve()");
    if (l) throw new Error(l.message);
    const d = {};
    return Object.keys(o).forEach((c)=>{
        const u = r[c].chains.filter((v)=>{
            var p, y;
            return (y = (p = o[c]) == null ? void 0 : p.chains) == null ? void 0 : y.includes(v);
        }), a = r[c].methods.filter((v)=>{
            var p, y;
            return (y = (p = o[c]) == null ? void 0 : p.methods) == null ? void 0 : y.includes(v);
        }), g = r[c].events.filter((v)=>{
            var p, y;
            return (y = (p = o[c]) == null ? void 0 : p.events) == null ? void 0 : y.includes(v);
        }), U = u.map((v)=>r[c].accounts.filter((p)=>p.includes(`${v}:`))).flat();
        d[c] = {
            chains: u,
            methods: a,
            events: g,
            accounts: U
        };
    }), Object.keys(s).forEach((c)=>{
        var u, a, g, U, v, p;
        if (!r[c]) return;
        const y = (a = (u = s[c]) == null ? void 0 : u.chains) == null ? void 0 : a.filter((I)=>r[c].chains.includes(I)), ln = r[c].methods.filter((I)=>{
            var T, _;
            return (_ = (T = s[c]) == null ? void 0 : T.methods) == null ? void 0 : _.includes(I);
        }), dn = r[c].events.filter((I)=>{
            var T, _;
            return (_ = (T = s[c]) == null ? void 0 : T.events) == null ? void 0 : _.includes(I);
        }), fn = y?.map((I)=>r[c].accounts.filter((T)=>T.includes(I))).flat();
        d[c] = {
            chains: S((g = d[c]) == null ? void 0 : g.chains, y),
            methods: S((U = d[c]) == null ? void 0 : U.methods, ln),
            events: S((v = d[c]) == null ? void 0 : v.events, dn),
            accounts: S((p = d[c]) == null ? void 0 : p.accounts, fn)
        };
    }), d;
}
function te(e) {
    return e.includes(":");
}
function Ze(e) {
    return te(e) ? e.split(":")[0] : e;
}
function re(e) {
    var n, t, r;
    const o = {};
    if (!F(e)) return o;
    for (const [s, i] of Object.entries(e)){
        const l = te(s) ? [
            s
        ] : i.chains, d = i.methods || [], c = i.events || [], u = Ze(s);
        o[u] = Ot(bt({}, o[u]), {
            chains: S(l, (n = o[u]) == null ? void 0 : n.chains),
            methods: S(d, (t = o[u]) == null ? void 0 : t.methods),
            events: S(c, (r = o[u]) == null ? void 0 : r.events)
        });
    }
    return o;
}
const It = {
    INVALID_METHOD: {
        message: "Invalid method.",
        code: 1001
    },
    INVALID_EVENT: {
        message: "Invalid event.",
        code: 1002
    },
    INVALID_UPDATE_REQUEST: {
        message: "Invalid update request.",
        code: 1003
    },
    INVALID_EXTEND_REQUEST: {
        message: "Invalid extend request.",
        code: 1004
    },
    INVALID_SESSION_SETTLE_REQUEST: {
        message: "Invalid session settle request.",
        code: 1005
    },
    UNAUTHORIZED_METHOD: {
        message: "Unauthorized method.",
        code: 3001
    },
    UNAUTHORIZED_EVENT: {
        message: "Unauthorized event.",
        code: 3002
    },
    UNAUTHORIZED_UPDATE_REQUEST: {
        message: "Unauthorized update request.",
        code: 3003
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
        message: "Unauthorized extend request.",
        code: 3004
    },
    USER_REJECTED: {
        message: "User rejected.",
        code: 5e3
    },
    USER_REJECTED_CHAINS: {
        message: "User rejected chains.",
        code: 5001
    },
    USER_REJECTED_METHODS: {
        message: "User rejected methods.",
        code: 5002
    },
    USER_REJECTED_EVENTS: {
        message: "User rejected events.",
        code: 5003
    },
    UNSUPPORTED_CHAINS: {
        message: "Unsupported chains.",
        code: 5100
    },
    UNSUPPORTED_METHODS: {
        message: "Unsupported methods.",
        code: 5101
    },
    UNSUPPORTED_EVENTS: {
        message: "Unsupported events.",
        code: 5102
    },
    UNSUPPORTED_ACCOUNTS: {
        message: "Unsupported accounts.",
        code: 5103
    },
    UNSUPPORTED_NAMESPACE_KEY: {
        message: "Unsupported namespace key.",
        code: 5104
    },
    USER_DISCONNECTED: {
        message: "User disconnected.",
        code: 6e3
    },
    SESSION_SETTLEMENT_FAILED: {
        message: "Session settlement failed.",
        code: 7e3
    },
    WC_METHOD_UNSUPPORTED: {
        message: "Unsupported wc_ method.",
        code: 10001
    }
}, Tt = {
    NOT_INITIALIZED: {
        message: "Not initialized.",
        code: 1
    },
    NO_MATCHING_KEY: {
        message: "No matching key.",
        code: 2
    },
    RESTORE_WILL_OVERRIDE: {
        message: "Restore will override.",
        code: 3
    },
    RESUBSCRIBED: {
        message: "Resubscribed.",
        code: 4
    },
    MISSING_OR_INVALID: {
        message: "Missing or invalid.",
        code: 5
    },
    EXPIRED: {
        message: "Expired.",
        code: 6
    },
    UNKNOWN_TYPE: {
        message: "Unknown type.",
        code: 7
    },
    MISMATCHED_TOPIC: {
        message: "Mismatched topic.",
        code: 8
    },
    NON_CONFORMING_NAMESPACES: {
        message: "Non conforming namespaces.",
        code: 9
    }
};
function N(e, n) {
    const { message: t, code: r } = Tt[e];
    return {
        message: n ? `${t} ${n}` : t,
        code: r
    };
}
function w(e, n) {
    const { message: t, code: r } = It[e];
    return {
        message: n ? `${t} ${n}` : t,
        code: r
    };
}
function j(e, n) {
    return Array.isArray(e) ? typeof n < "u" && e.length ? e.every(n) : !0 : !1;
}
function F(e) {
    return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function P(e) {
    return typeof e > "u";
}
function m(e, n) {
    return n && P(e) ? !0 : typeof e == "string" && !!e.trim().length;
}
function H(e, n) {
    return n && P(e) ? !0 : typeof e == "number" && !isNaN(e);
}
function Rt(e, n) {
    const { requiredNamespaces: t } = n, r = Object.keys(e.namespaces), o = Object.keys(t);
    let s = !0;
    return O(o, r) ? (r.forEach((i)=>{
        const { accounts: l, methods: d, events: c } = e.namespaces[i], u = R(l), a = t[i];
        (!O(V(i, a), u) || !O(a.methods, d) || !O(a.events, c)) && (s = !1);
    }), s) : !1;
}
function q(e) {
    return m(e, !1) && e.includes(":") ? e.split(":").length === 2 : !1;
}
function Xe(e) {
    if (m(e, !1) && e.includes(":")) {
        const n = e.split(":");
        if (n.length === 3) {
            const t = n[0] + ":" + n[1];
            return !!n[2] && q(t);
        }
    }
    return !1;
}
function wt(e) {
    if (m(e, !1)) try {
        return typeof new URL(e) < "u";
    } catch  {
        return !1;
    }
    return !1;
}
function Ut(e) {
    var n;
    return (n = e?.proposer) == null ? void 0 : n.publicKey;
}
function At(e) {
    return e?.topic;
}
function _t(e, n) {
    let t = null;
    return m(e?.publicKey, !1) || (t = N("MISSING_OR_INVALID", `${n} controller public key should be a string`)), t;
}
function oe(e) {
    let n = !0;
    return j(e) ? e.length && (n = e.every((t)=>m(t, !1))) : n = !1, n;
}
function en(e, n, t) {
    let r = null;
    return j(n) ? n.forEach((o)=>{
        r || (!q(o) || !o.includes(e)) && (r = w("UNSUPPORTED_CHAINS", `${t}, chain ${o} should be a string and conform to "namespace:chainId" format`));
    }) : r = w("UNSUPPORTED_CHAINS", `${t}, chains ${n} should be an array of strings conforming to "namespace:chainId" format`), r;
}
function nn(e, n) {
    let t = null;
    return Object.entries(e).forEach(([r, o])=>{
        if (t) return;
        const s = en(r, V(r, o), `${n} requiredNamespace`);
        s && (t = s);
    }), t;
}
function tn(e, n) {
    let t = null;
    return j(e) ? e.forEach((r)=>{
        t || Xe(r) || (t = w("UNSUPPORTED_ACCOUNTS", `${n}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
    }) : t = w("UNSUPPORTED_ACCOUNTS", `${n}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function rn(e, n) {
    let t = null;
    return Object.values(e).forEach((r)=>{
        if (t) return;
        const o = tn(r?.accounts, `${n} namespace`);
        o && (t = o);
    }), t;
}
function on(e, n) {
    let t = null;
    return oe(e?.methods) ? oe(e?.events) || (t = w("UNSUPPORTED_EVENTS", `${n}, events should be an array of strings or empty array for no events`)) : t = w("UNSUPPORTED_METHODS", `${n}, methods should be an array of strings or empty array for no methods`), t;
}
function se(e, n) {
    let t = null;
    return Object.values(e).forEach((r)=>{
        if (t) return;
        const o = on(r, `${n}, namespace`);
        o && (t = o);
    }), t;
}
function $t(e, n, t) {
    let r = null;
    if (e && F(e)) {
        const o = se(e, n);
        o && (r = o);
        const s = nn(e, n);
        s && (r = s);
    } else r = N("MISSING_OR_INVALID", `${n}, ${t} should be an object with data`);
    return r;
}
function sn(e, n) {
    let t = null;
    if (e && F(e)) {
        const r = se(e, n);
        r && (t = r);
        const o = rn(e, n);
        o && (t = o);
    } else t = N("MISSING_OR_INVALID", `${n}, namespaces should be an object with data`);
    return t;
}
function cn(e) {
    return m(e.protocol, !0);
}
function jt(e, n) {
    let t = !1;
    return n && !e ? t = !0 : e && j(e) && e.length && e.forEach((r)=>{
        t = cn(r);
    }), t;
}
function Ct(e) {
    return typeof e == "number";
}
function Dt(e) {
    return typeof e < "u" && true;
}
function Vt(e) {
    return !(!e || typeof e != "object" || !e.code || !H(e.code, !1) || !e.message || !m(e.message, !1));
}
function Mt(e) {
    return !(P(e) || !m(e.method, !1));
}
function Kt(e) {
    return !(P(e) || P(e.result) && P(e.error) || !H(e.id, !1) || !m(e.jsonrpc, !1));
}
function kt(e) {
    return !(P(e) || !m(e.name, !1));
}
function Lt(e, n) {
    return !(!q(n) || !Ye(e).includes(n));
}
function xt(e, n, t) {
    return m(t, !1) ? Je(e, n).includes(t) : !1;
}
function Ft(e, n, t) {
    return m(t, !1) ? Qe(e, n).includes(t) : !1;
}
function an(e, n, t) {
    let r = null;
    const o = Ht(e), s = qt(n), i = Object.keys(o), l = Object.keys(s), d = un(Object.keys(e)), c = un(Object.keys(n)), u = d.filter((a)=>!c.includes(a));
    return u.length && (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(n).toString()}`)), O(i, l) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${i.toString()}
      Approved: ${l.toString()}`)), Object.keys(n).forEach((a)=>{
        if (!a.includes(":") || r) return;
        const g = R(n[a].accounts);
        g.includes(a) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${a}
        Required: ${a}
        Approved: ${g.toString()}`));
    }), i.forEach((a)=>{
        r || (O(o[a].methods, s[a].methods) ? O(o[a].events, s[a].events) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${a}`)) : r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${a}`));
    }), r;
}
function Ht(e) {
    const n = {};
    return Object.keys(e).forEach((t)=>{
        var r;
        t.includes(":") ? n[t] = e[t] : (r = e[t].chains) == null || r.forEach((o)=>{
            n[o] = {
                methods: e[t].methods,
                events: e[t].events
            };
        });
    }), n;
}
function un(e) {
    return [
        ...new Set(e.map((n)=>n.includes(":") ? n.split(":")[0] : n))
    ];
}
function qt(e) {
    const n = {};
    return Object.keys(e).forEach((t)=>{
        if (t.includes(":")) n[t] = e[t];
        else {
            const r = R(e[t].accounts);
            r?.forEach((o)=>{
                n[o] = {
                    accounts: e[t].accounts.filter((s)=>s.includes(`${o}:`)),
                    methods: e[t].methods,
                    events: e[t].events
                };
            });
        }
    }), n;
}
function zt(e, n) {
    return H(e, !1) && e <= n.max && e >= n.min;
}

},{"8f49c8c44d164f1a":"d5jf4","@stablelib/chacha20poly1305":"lU2zl","@stablelib/hkdf":"6r0oT","@stablelib/random":"9Qs60","@stablelib/sha256":"fPm7j","@stablelib/x25519":"5xoxU","uint8arrays":"ctPgX","detect-browser":"2pU52","@walletconnect/time":"2hzsP","@walletconnect/window-getters":"7XcJM","@walletconnect/window-metadata":"ga1jf","query-string":"k40w8","@walletconnect/relay-api":"1SxNf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d5jf4":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = ""; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
process.cwd = function() {
    return "/";
};
process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
process.umask = function() {
    return 0;
};

},{}],"lU2zl":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var chacha_1 = require("976b3a8516087e36");
var poly1305_1 = require("57a2241b5ee7deb");
var wipe_1 = require("8b783944859565b4");
var binary_1 = require("24cadc9e6036331e");
var constant_time_1 = require("ee9deaa41a7b3163");
exports.KEY_LENGTH = 32;
exports.NONCE_LENGTH = 12;
exports.TAG_LENGTH = 16;
var ZEROS = new Uint8Array(16);
/**
 * ChaCha20-Poly1305 Authenticated Encryption with Associated Data.
 *
 * Defined in RFC7539.
 */ var ChaCha20Poly1305 = /** @class */ function() {
    /**
     * Creates a new instance with the given 32-byte key.
     */ function ChaCha20Poly1305(key) {
        this.nonceLength = exports.NONCE_LENGTH;
        this.tagLength = exports.TAG_LENGTH;
        if (key.length !== exports.KEY_LENGTH) throw new Error("ChaCha20Poly1305 needs 32-byte key");
        // Copy key.
        this._key = new Uint8Array(key);
    }
    /**
     * Encrypts and authenticates plaintext, authenticates associated data,
     * and returns sealed ciphertext, which includes authentication tag.
     *
     * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
     * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
     * and nonce.
     *
     * If dst is given (it must be the size of plaintext + the size of tag
     * length) the result will be put into it. Dst and plaintext must not
     * overlap.
     */ ChaCha20Poly1305.prototype.seal = function(nonce, plaintext, associatedData, dst) {
        if (nonce.length > 16) throw new Error("ChaCha20Poly1305: incorrect nonce length");
        // Allocate space for counter, and set nonce as last bytes of it.
        var counter = new Uint8Array(16);
        counter.set(nonce, counter.length - nonce.length);
        // Generate authentication key by taking first 32-bytes of stream.
        // We pass full counter, which has 12-byte nonce and 4-byte block counter,
        // and it will get incremented after generating the block, which is
        // exactly what we need: we only use the first 32 bytes of 64-byte
        // ChaCha block and discard the next 32 bytes.
        var authKey = new Uint8Array(32);
        chacha_1.stream(this._key, counter, authKey, 4);
        // Allocate space for sealed ciphertext.
        var resultLength = plaintext.length + this.tagLength;
        var result;
        if (dst) {
            if (dst.length !== resultLength) throw new Error("ChaCha20Poly1305: incorrect destination length");
            result = dst;
        } else result = new Uint8Array(resultLength);
        // Encrypt plaintext.
        chacha_1.streamXOR(this._key, counter, plaintext, result, 4);
        // Authenticate.
        // XXX: can "simplify" here: pass full result (which is already padded
        // due to zeroes prepared for tag), and ciphertext length instead of
        // subarray of result.
        this._authenticate(result.subarray(result.length - this.tagLength, result.length), authKey, result.subarray(0, result.length - this.tagLength), associatedData);
        // Cleanup.
        wipe_1.wipe(counter);
        return result;
    };
    /**
     * Authenticates sealed ciphertext (which includes authentication tag) and
     * associated data, decrypts ciphertext and returns decrypted plaintext.
     *
     * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
     * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
     * and nonce.
     *
     * If authentication fails, it returns null.
     *
     * If dst is given (it must be of ciphertext length minus tag length),
     * the result will be put into it. Dst and plaintext must not overlap.
     */ ChaCha20Poly1305.prototype.open = function(nonce, sealed, associatedData, dst) {
        if (nonce.length > 16) throw new Error("ChaCha20Poly1305: incorrect nonce length");
        // Sealed ciphertext should at least contain tag.
        if (sealed.length < this.tagLength) // TODO(dchest): should we throw here instead?
        return null;
        // Allocate space for counter, and set nonce as last bytes of it.
        var counter = new Uint8Array(16);
        counter.set(nonce, counter.length - nonce.length);
        // Generate authentication key by taking first 32-bytes of stream.
        var authKey = new Uint8Array(32);
        chacha_1.stream(this._key, counter, authKey, 4);
        // Authenticate.
        // XXX: can simplify and avoid allocation: since authenticate()
        // already allocates tag (from Poly1305.digest(), it can return)
        // it instead of copying to calculatedTag. But then in seal()
        // we'll need to copy it.
        var calculatedTag = new Uint8Array(this.tagLength);
        this._authenticate(calculatedTag, authKey, sealed.subarray(0, sealed.length - this.tagLength), associatedData);
        // Constant-time compare tags and return null if they differ.
        if (!constant_time_1.equal(calculatedTag, sealed.subarray(sealed.length - this.tagLength, sealed.length))) return null;
        // Allocate space for decrypted plaintext.
        var resultLength = sealed.length - this.tagLength;
        var result;
        if (dst) {
            if (dst.length !== resultLength) throw new Error("ChaCha20Poly1305: incorrect destination length");
            result = dst;
        } else result = new Uint8Array(resultLength);
        // Decrypt.
        chacha_1.streamXOR(this._key, counter, sealed.subarray(0, sealed.length - this.tagLength), result, 4);
        // Cleanup.
        wipe_1.wipe(counter);
        return result;
    };
    ChaCha20Poly1305.prototype.clean = function() {
        wipe_1.wipe(this._key);
        return this;
    };
    ChaCha20Poly1305.prototype._authenticate = function(tagOut, authKey, ciphertext, associatedData) {
        // Initialize Poly1305 with authKey.
        var h = new poly1305_1.Poly1305(authKey);
        // Authenticate padded associated data.
        if (associatedData) {
            h.update(associatedData);
            if (associatedData.length % 16 > 0) h.update(ZEROS.subarray(associatedData.length % 16));
        }
        // Authenticate padded ciphertext.
        h.update(ciphertext);
        if (ciphertext.length % 16 > 0) h.update(ZEROS.subarray(ciphertext.length % 16));
        // Authenticate length of associated data.
        // XXX: can avoid allocation here?
        var length = new Uint8Array(8);
        if (associatedData) binary_1.writeUint64LE(associatedData.length, length);
        h.update(length);
        // Authenticate length of ciphertext.
        binary_1.writeUint64LE(ciphertext.length, length);
        h.update(length);
        // Get tag and copy it into tagOut.
        var tag = h.digest();
        for(var i = 0; i < tag.length; i++)tagOut[i] = tag[i];
        // Cleanup.
        h.clean();
        wipe_1.wipe(tag);
        wipe_1.wipe(length);
    };
    return ChaCha20Poly1305;
}();
exports.ChaCha20Poly1305 = ChaCha20Poly1305;

},{"976b3a8516087e36":"kgOXq","57a2241b5ee7deb":"hOj7F","8b783944859565b4":"8owN2","24cadc9e6036331e":"92RWm","ee9deaa41a7b3163":"ccTzW"}],"kgOXq":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package chacha implements ChaCha stream cipher.
 */ var binary_1 = require("b4d5bb4e33f3d915");
var wipe_1 = require("490004a374088624");
// Number of ChaCha rounds (ChaCha20).
var ROUNDS = 20;
// Applies the ChaCha core function to 16-byte input,
// 32-byte key key, and puts the result into 64-byte array out.
function core(out, input, key) {
    var j0 = 0x61707865; // "expa"  -- ChaCha's "sigma" constant
    var j1 = 0x3320646E; // "nd 3"     for 32-byte keys
    var j2 = 0x79622D32; // "2-by"
    var j3 = 0x6B206574; // "te k"
    var j4 = key[3] << 24 | key[2] << 16 | key[1] << 8 | key[0];
    var j5 = key[7] << 24 | key[6] << 16 | key[5] << 8 | key[4];
    var j6 = key[11] << 24 | key[10] << 16 | key[9] << 8 | key[8];
    var j7 = key[15] << 24 | key[14] << 16 | key[13] << 8 | key[12];
    var j8 = key[19] << 24 | key[18] << 16 | key[17] << 8 | key[16];
    var j9 = key[23] << 24 | key[22] << 16 | key[21] << 8 | key[20];
    var j10 = key[27] << 24 | key[26] << 16 | key[25] << 8 | key[24];
    var j11 = key[31] << 24 | key[30] << 16 | key[29] << 8 | key[28];
    var j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
    var j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
    var j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
    var j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
    var x0 = j0;
    var x1 = j1;
    var x2 = j2;
    var x3 = j3;
    var x4 = j4;
    var x5 = j5;
    var x6 = j6;
    var x7 = j7;
    var x8 = j8;
    var x9 = j9;
    var x10 = j10;
    var x11 = j11;
    var x12 = j12;
    var x13 = j13;
    var x14 = j14;
    var x15 = j15;
    for(var i = 0; i < ROUNDS; i += 2){
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 16 | x12 << 16;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 20 | x4 << 12;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 16 | x13 << 16;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 20 | x5 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 16 | x14 << 16;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 20 | x6 << 12;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 16 | x15 << 16;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 20 | x7 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 24 | x14 << 8;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 25 | x6 << 7;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 24 | x15 << 8;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 25 | x7 << 7;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 24 | x13 << 8;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 25 | x5 << 7;
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 24 | x12 << 8;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 25 | x4 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 16 | x15 << 16;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 20 | x5 << 12;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 16 | x12 << 16;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 20 | x6 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 16 | x13 << 16;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 20 | x7 << 12;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 16 | x14 << 16;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 20 | x4 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 24 | x13 << 8;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 25 | x7 << 7;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 24 | x14 << 8;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 25 | x4 << 7;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 24 | x12 << 8;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 25 | x6 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 24 | x15 << 8;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 25 | x5 << 7;
    }
    binary_1.writeUint32LE(x0 + j0 | 0, out, 0);
    binary_1.writeUint32LE(x1 + j1 | 0, out, 4);
    binary_1.writeUint32LE(x2 + j2 | 0, out, 8);
    binary_1.writeUint32LE(x3 + j3 | 0, out, 12);
    binary_1.writeUint32LE(x4 + j4 | 0, out, 16);
    binary_1.writeUint32LE(x5 + j5 | 0, out, 20);
    binary_1.writeUint32LE(x6 + j6 | 0, out, 24);
    binary_1.writeUint32LE(x7 + j7 | 0, out, 28);
    binary_1.writeUint32LE(x8 + j8 | 0, out, 32);
    binary_1.writeUint32LE(x9 + j9 | 0, out, 36);
    binary_1.writeUint32LE(x10 + j10 | 0, out, 40);
    binary_1.writeUint32LE(x11 + j11 | 0, out, 44);
    binary_1.writeUint32LE(x12 + j12 | 0, out, 48);
    binary_1.writeUint32LE(x13 + j13 | 0, out, 52);
    binary_1.writeUint32LE(x14 + j14 | 0, out, 56);
    binary_1.writeUint32LE(x15 + j15 | 0, out, 60);
}
/**
 * Encrypt src with ChaCha20 stream generated for the given 32-byte key and
 * 8-byte (as in original implementation) or 12-byte (as in RFC7539) nonce and
 * write the result into dst and return it.
 *
 * dst and src may be the same, but otherwise must not overlap.
 *
 * If nonce is 12 bytes, users should not encrypt more than 256 GiB with the
 * same key and nonce, otherwise the stream will repeat. The function will
 * throw error if counter overflows to prevent this.
 *
 * If nonce is 8 bytes, the output is practically unlimited (2^70 bytes, which
 * is more than a million petabytes). However, it is not recommended to
 * generate 8-byte nonces randomly, as the chance of collision is high.
 *
 * Never use the same key and nonce to encrypt more than one message.
 *
 * If nonceInplaceCounterLength is not 0, the nonce is assumed to be a 16-byte
 * array with stream counter in first nonceInplaceCounterLength bytes and nonce
 * in the last remaining bytes. The counter will be incremented inplace for
 * each ChaCha block. This is useful if you need to encrypt one stream of data
 * in chunks.
 */ function streamXOR(key, nonce, src, dst, nonceInplaceCounterLength) {
    if (nonceInplaceCounterLength === void 0) nonceInplaceCounterLength = 0;
    // We only support 256-bit keys.
    if (key.length !== 32) throw new Error("ChaCha: key size must be 32 bytes");
    if (dst.length < src.length) throw new Error("ChaCha: destination is shorter than source");
    var nc;
    var counterLength;
    if (nonceInplaceCounterLength === 0) {
        if (nonce.length !== 8 && nonce.length !== 12) throw new Error("ChaCha nonce must be 8 or 12 bytes");
        nc = new Uint8Array(16);
        // First counterLength bytes of nc are counter, starting with zero.
        counterLength = nc.length - nonce.length;
        // Last bytes of nc after counterLength are nonce, set them.
        nc.set(nonce, counterLength);
    } else {
        if (nonce.length !== 16) throw new Error("ChaCha nonce with counter must be 16 bytes");
        // This will update passed nonce with counter inplace.
        nc = nonce;
        counterLength = nonceInplaceCounterLength;
    }
    // Allocate temporary space for ChaCha block.
    var block = new Uint8Array(64);
    for(var i = 0; i < src.length; i += 64){
        // Generate a block.
        core(block, nc, key);
        // XOR block bytes with src into dst.
        for(var j = i; j < i + 64 && j < src.length; j++)dst[j] = src[j] ^ block[j - i];
        // Increment counter.
        incrementCounter(nc, 0, counterLength);
    }
    // Cleanup temporary space.
    wipe_1.wipe(block);
    if (nonceInplaceCounterLength === 0) // Cleanup counter.
    wipe_1.wipe(nc);
    return dst;
}
exports.streamXOR = streamXOR;
/**
 * Generate ChaCha20 stream for the given 32-byte key and 8-byte or 12-byte
 * nonce and write it into dst and return it.
 *
 * Never use the same key and nonce to generate more than one stream.
 *
 * If nonceInplaceCounterLength is not 0, it behaves the same with respect to
 * the nonce as described in the streamXOR documentation.
 *
 * stream is like streamXOR with all-zero src.
 */ function stream(key, nonce, dst, nonceInplaceCounterLength) {
    if (nonceInplaceCounterLength === void 0) nonceInplaceCounterLength = 0;
    wipe_1.wipe(dst);
    return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
}
exports.stream = stream;
function incrementCounter(counter, pos, len) {
    var carry = 1;
    while(len--){
        carry = carry + (counter[pos] & 0xff) | 0;
        counter[pos] = carry & 0xff;
        carry >>>= 8;
        pos++;
    }
    if (carry > 0) throw new Error("ChaCha: counter overflow");
}

},{"b4d5bb4e33f3d915":"92RWm","490004a374088624":"8owN2"}],"92RWm":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package binary provides functions for encoding and decoding numbers in byte arrays.
 */ var int_1 = require("1b589c6468d366f4");
// TODO(dchest): add asserts for correct value ranges and array offsets.
/**
 * Reads 2 bytes from array starting at offset as big-endian
 * signed 16-bit integer and returns it.
 */ function readInt16BE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
}
exports.readInt16BE = readInt16BE;
/**
 * Reads 2 bytes from array starting at offset as big-endian
 * unsigned 16-bit integer and returns it.
 */ function readUint16BE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
}
exports.readUint16BE = readUint16BE;
/**
 * Reads 2 bytes from array starting at offset as little-endian
 * signed 16-bit integer and returns it.
 */ function readInt16LE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
}
exports.readInt16LE = readInt16LE;
/**
 * Reads 2 bytes from array starting at offset as little-endian
 * unsigned 16-bit integer and returns it.
 */ function readUint16LE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 1] << 8 | array[offset]) >>> 0;
}
exports.readUint16LE = readUint16LE;
/**
 * Writes 2-byte big-endian representation of 16-bit unsigned
 * value to byte array starting at offset.
 *
 * If byte array is not given, creates a new 2-byte one.
 *
 * Returns the output byte array.
 */ function writeUint16BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(2);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 8;
    out[offset + 1] = value >>> 0;
    return out;
}
exports.writeUint16BE = writeUint16BE;
exports.writeInt16BE = writeUint16BE;
/**
 * Writes 2-byte little-endian representation of 16-bit unsigned
 * value to array starting at offset.
 *
 * If byte array is not given, creates a new 2-byte one.
 *
 * Returns the output byte array.
 */ function writeUint16LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(2);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    return out;
}
exports.writeUint16LE = writeUint16LE;
exports.writeInt16LE = writeUint16LE;
/**
 * Reads 4 bytes from array starting at offset as big-endian
 * signed 32-bit integer and returns it.
 */ function readInt32BE(array, offset) {
    if (offset === void 0) offset = 0;
    return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
}
exports.readInt32BE = readInt32BE;
/**
 * Reads 4 bytes from array starting at offset as big-endian
 * unsigned 32-bit integer and returns it.
 */ function readUint32BE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
}
exports.readUint32BE = readUint32BE;
/**
 * Reads 4 bytes from array starting at offset as little-endian
 * signed 32-bit integer and returns it.
 */ function readInt32LE(array, offset) {
    if (offset === void 0) offset = 0;
    return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
}
exports.readInt32LE = readInt32LE;
/**
 * Reads 4 bytes from array starting at offset as little-endian
 * unsigned 32-bit integer and returns it.
 */ function readUint32LE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
}
exports.readUint32LE = readUint32LE;
/**
 * Writes 4-byte big-endian representation of 32-bit unsigned
 * value to byte array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeUint32BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 24;
    out[offset + 1] = value >>> 16;
    out[offset + 2] = value >>> 8;
    out[offset + 3] = value >>> 0;
    return out;
}
exports.writeUint32BE = writeUint32BE;
exports.writeInt32BE = writeUint32BE;
/**
 * Writes 4-byte little-endian representation of 32-bit unsigned
 * value to array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeUint32LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    out[offset + 2] = value >>> 16;
    out[offset + 3] = value >>> 24;
    return out;
}
exports.writeUint32LE = writeUint32LE;
exports.writeInt32LE = writeUint32LE;
/**
 * Reads 8 bytes from array starting at offset as big-endian
 * signed 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports exact
 * numbers in range -9007199254740991 to 9007199254740991.
 * If the number stored in the byte array is outside this range,
 * the result is not exact.
 */ function readInt64BE(array, offset) {
    if (offset === void 0) offset = 0;
    var hi = readInt32BE(array, offset);
    var lo = readInt32BE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
}
exports.readInt64BE = readInt64BE;
/**
 * Reads 8 bytes from array starting at offset as big-endian
 * unsigned 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports values up to 2^53-1.
 */ function readUint64BE(array, offset) {
    if (offset === void 0) offset = 0;
    var hi = readUint32BE(array, offset);
    var lo = readUint32BE(array, offset + 4);
    return hi * 0x100000000 + lo;
}
exports.readUint64BE = readUint64BE;
/**
 * Reads 8 bytes from array starting at offset as little-endian
 * signed 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports exact
 * numbers in range -9007199254740991 to 9007199254740991.
 * If the number stored in the byte array is outside this range,
 * the result is not exact.
 */ function readInt64LE(array, offset) {
    if (offset === void 0) offset = 0;
    var lo = readInt32LE(array, offset);
    var hi = readInt32LE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
}
exports.readInt64LE = readInt64LE;
/**
 * Reads 8 bytes from array starting at offset as little-endian
 * unsigned 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports values up to 2^53-1.
 */ function readUint64LE(array, offset) {
    if (offset === void 0) offset = 0;
    var lo = readUint32LE(array, offset);
    var hi = readUint32LE(array, offset + 4);
    return hi * 0x100000000 + lo;
}
exports.readUint64LE = readUint64LE;
/**
 * Writes 8-byte big-endian representation of 64-bit unsigned
 * value to byte array starting at offset.
 *
 * Due to JavaScript limitation, supports values up to 2^53-1.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeUint64BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    writeUint32BE(value / 0x100000000 >>> 0, out, offset);
    writeUint32BE(value >>> 0, out, offset + 4);
    return out;
}
exports.writeUint64BE = writeUint64BE;
exports.writeInt64BE = writeUint64BE;
/**
 * Writes 8-byte little-endian representation of 64-bit unsigned
 * value to byte array starting at offset.
 *
 * Due to JavaScript limitation, supports values up to 2^53-1.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeUint64LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    writeUint32LE(value >>> 0, out, offset);
    writeUint32LE(value / 0x100000000 >>> 0, out, offset + 4);
    return out;
}
exports.writeUint64LE = writeUint64LE;
exports.writeInt64LE = writeUint64LE;
/**
 * Reads bytes from array starting at offset as big-endian
 * unsigned bitLen-bit integer and returns it.
 *
 * Supports bit lengths divisible by 8, up to 48.
 */ function readUintBE(bitLength, array, offset) {
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("readUintBE supports only bitLengths divisible by 8");
    if (bitLength / 8 > array.length - offset) throw new Error("readUintBE: array is too short for the given bitLength");
    var result = 0;
    var mul = 1;
    for(var i = bitLength / 8 + offset - 1; i >= offset; i--){
        result += array[i] * mul;
        mul *= 256;
    }
    return result;
}
exports.readUintBE = readUintBE;
/**
 * Reads bytes from array starting at offset as little-endian
 * unsigned bitLen-bit integer and returns it.
 *
 * Supports bit lengths divisible by 8, up to 48.
 */ function readUintLE(bitLength, array, offset) {
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("readUintLE supports only bitLengths divisible by 8");
    if (bitLength / 8 > array.length - offset) throw new Error("readUintLE: array is too short for the given bitLength");
    var result = 0;
    var mul = 1;
    for(var i = offset; i < offset + bitLength / 8; i++){
        result += array[i] * mul;
        mul *= 256;
    }
    return result;
}
exports.readUintLE = readUintLE;
/**
 * Writes a big-endian representation of bitLen-bit unsigned
 * value to array starting at offset.
 *
 * Supports bit lengths divisible by 8, up to 48.
 *
 * If byte array is not given, creates a new one.
 *
 * Returns the output byte array.
 */ function writeUintBE(bitLength, value, out, offset) {
    if (out === void 0) out = new Uint8Array(bitLength / 8);
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("writeUintBE supports only bitLengths divisible by 8");
    if (!int_1.isSafeInteger(value)) throw new Error("writeUintBE value must be an integer");
    var div = 1;
    for(var i = bitLength / 8 + offset - 1; i >= offset; i--){
        out[i] = value / div & 0xff;
        div *= 256;
    }
    return out;
}
exports.writeUintBE = writeUintBE;
/**
 * Writes a little-endian representation of bitLen-bit unsigned
 * value to array starting at offset.
 *
 * Supports bit lengths divisible by 8, up to 48.
 *
 * If byte array is not given, creates a new one.
 *
 * Returns the output byte array.
 */ function writeUintLE(bitLength, value, out, offset) {
    if (out === void 0) out = new Uint8Array(bitLength / 8);
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("writeUintLE supports only bitLengths divisible by 8");
    if (!int_1.isSafeInteger(value)) throw new Error("writeUintLE value must be an integer");
    var div = 1;
    for(var i = offset; i < offset + bitLength / 8; i++){
        out[i] = value / div & 0xff;
        div *= 256;
    }
    return out;
}
exports.writeUintLE = writeUintLE;
/**
 * Reads 4 bytes from array starting at offset as big-endian
 * 32-bit floating-point number and returns it.
 */ function readFloat32BE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset);
}
exports.readFloat32BE = readFloat32BE;
/**
 * Reads 4 bytes from array starting at offset as little-endian
 * 32-bit floating-point number and returns it.
 */ function readFloat32LE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset, true);
}
exports.readFloat32LE = readFloat32LE;
/**
 * Reads 8 bytes from array starting at offset as big-endian
 * 64-bit floating-point number ("double") and returns it.
 */ function readFloat64BE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset);
}
exports.readFloat64BE = readFloat64BE;
/**
 * Reads 8 bytes from array starting at offset as little-endian
 * 64-bit floating-point number ("double") and returns it.
 */ function readFloat64LE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset, true);
}
exports.readFloat64LE = readFloat64LE;
/**
 * Writes 4-byte big-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat32BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value);
    return out;
}
exports.writeFloat32BE = writeFloat32BE;
/**
 * Writes 4-byte little-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat32LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value, true);
    return out;
}
exports.writeFloat32LE = writeFloat32LE;
/**
 * Writes 8-byte big-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat64BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value);
    return out;
}
exports.writeFloat64BE = writeFloat64BE;
/**
 * Writes 8-byte little-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat64LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value, true);
    return out;
}
exports.writeFloat64LE = writeFloat64LE;

},{"1b589c6468d366f4":"dkrY2"}],"dkrY2":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package int provides helper functions for integerss.
 */ // Shim using 16-bit pieces.
function imulShim(a, b) {
    var ah = a >>> 16 & 0xffff, al = a & 0xffff;
    var bh = b >>> 16 & 0xffff, bl = b & 0xffff;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
}
/** 32-bit integer multiplication.  */ // Use system Math.imul if available, otherwise use our shim.
exports.mul = Math.imul || imulShim;
/** 32-bit integer addition.  */ function add(a, b) {
    return a + b | 0;
}
exports.add = add;
/**  32-bit integer subtraction.  */ function sub(a, b) {
    return a - b | 0;
}
exports.sub = sub;
/** 32-bit integer left rotation */ function rotl(x, n) {
    return x << n | x >>> 32 - n;
}
exports.rotl = rotl;
/** 32-bit integer left rotation */ function rotr(x, n) {
    return x << 32 - n | x >>> n;
}
exports.rotr = rotr;
function isIntegerShim(n) {
    return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
}
/**
 * Returns true if the argument is an integer number.
 *
 * In ES2015, Number.isInteger.
 */ exports.isInteger = Number.isInteger || isIntegerShim;
/**
 *  Math.pow(2, 53) - 1
 *
 *  In ES2015 Number.MAX_SAFE_INTEGER.
 */ exports.MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Returns true if the argument is a safe integer number
 * (-MIN_SAFE_INTEGER < number <= MAX_SAFE_INTEGER)
 *
 * In ES2015, Number.isSafeInteger.
 */ exports.isSafeInteger = function(n) {
    return exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER;
};

},{}],"8owN2":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Sets all values in the given array to zero and returns it.
 *
 * The fact that it sets bytes to zero can be relied on.
 *
 * There is no guarantee that this function makes data disappear from memory,
 * as runtime implementation can, for example, have copying garbage collector
 * that will make copies of sensitive data before we wipe it. Or that an
 * operating system will write our data to swap or sleep image. Another thing
 * is that an optimizing compiler can remove calls to this function or make it
 * no-op. There's nothing we can do with it, so we just do our best and hope
 * that everything will be okay and good will triumph over evil.
 */ function wipe(array) {
    // Right now it's similar to array.fill(0). If it turns
    // out that runtimes optimize this call away, maybe
    // we can try something else.
    for(var i = 0; i < array.length; i++)array[i] = 0;
    return array;
}
exports.wipe = wipe;

},{}],"hOj7F":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package poly1305 implements Poly1305 one-time message authentication algorithm.
 */ var constant_time_1 = require("cb036ce5a49ec1dc");
var wipe_1 = require("9bf833f3949af496");
exports.DIGEST_LENGTH = 16;
// Port of Andrew Moon's Poly1305-donna-16. Public domain.
// https://github.com/floodyberry/poly1305-donna
/**
 * Poly1305 computes 16-byte authenticator of message using
 * a one-time 32-byte key.
 *
 * Important: key should be used for only one message,
 * it should never repeat.
 */ var Poly1305 = /** @class */ function() {
    function Poly1305(key) {
        this.digestLength = exports.DIGEST_LENGTH;
        this._buffer = new Uint8Array(16);
        this._r = new Uint16Array(10);
        this._h = new Uint16Array(10);
        this._pad = new Uint16Array(8);
        this._leftover = 0;
        this._fin = 0;
        this._finished = false;
        var t0 = key[0] | key[1] << 8;
        this._r[0] = t0 & 0x1fff;
        var t1 = key[2] | key[3] << 8;
        this._r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
        var t2 = key[4] | key[5] << 8;
        this._r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
        var t3 = key[6] | key[7] << 8;
        this._r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
        var t4 = key[8] | key[9] << 8;
        this._r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
        this._r[5] = t4 >>> 1 & 0x1ffe;
        var t5 = key[10] | key[11] << 8;
        this._r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
        var t6 = key[12] | key[13] << 8;
        this._r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
        var t7 = key[14] | key[15] << 8;
        this._r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
        this._r[9] = t7 >>> 5 & 0x007f;
        this._pad[0] = key[16] | key[17] << 8;
        this._pad[1] = key[18] | key[19] << 8;
        this._pad[2] = key[20] | key[21] << 8;
        this._pad[3] = key[22] | key[23] << 8;
        this._pad[4] = key[24] | key[25] << 8;
        this._pad[5] = key[26] | key[27] << 8;
        this._pad[6] = key[28] | key[29] << 8;
        this._pad[7] = key[30] | key[31] << 8;
    }
    Poly1305.prototype._blocks = function(m, mpos, bytes) {
        var hibit = this._fin ? 0 : 2048;
        var h0 = this._h[0], h1 = this._h[1], h2 = this._h[2], h3 = this._h[3], h4 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
        var r0 = this._r[0], r1 = this._r[1], r2 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
        while(bytes >= 16){
            var t0 = m[mpos + 0] | m[mpos + 1] << 8;
            h0 += t0 & 0x1fff;
            var t1 = m[mpos + 2] | m[mpos + 3] << 8;
            h1 += (t0 >>> 13 | t1 << 3) & 0x1fff;
            var t2 = m[mpos + 4] | m[mpos + 5] << 8;
            h2 += (t1 >>> 10 | t2 << 6) & 0x1fff;
            var t3 = m[mpos + 6] | m[mpos + 7] << 8;
            h3 += (t2 >>> 7 | t3 << 9) & 0x1fff;
            var t4 = m[mpos + 8] | m[mpos + 9] << 8;
            h4 += (t3 >>> 4 | t4 << 12) & 0x1fff;
            h5 += t4 >>> 1 & 0x1fff;
            var t5 = m[mpos + 10] | m[mpos + 11] << 8;
            h6 += (t4 >>> 14 | t5 << 2) & 0x1fff;
            var t6 = m[mpos + 12] | m[mpos + 13] << 8;
            h7 += (t5 >>> 11 | t6 << 5) & 0x1fff;
            var t7 = m[mpos + 14] | m[mpos + 15] << 8;
            h8 += (t6 >>> 8 | t7 << 8) & 0x1fff;
            h9 += t7 >>> 5 | hibit;
            var c = 0;
            var d0 = c;
            d0 += h0 * r0;
            d0 += h1 * (5 * r9);
            d0 += h2 * (5 * r8);
            d0 += h3 * (5 * r7);
            d0 += h4 * (5 * r6);
            c = d0 >>> 13;
            d0 &= 0x1fff;
            d0 += h5 * (5 * r5);
            d0 += h6 * (5 * r4);
            d0 += h7 * (5 * r3);
            d0 += h8 * (5 * r2);
            d0 += h9 * (5 * r1);
            c += d0 >>> 13;
            d0 &= 0x1fff;
            var d1 = c;
            d1 += h0 * r1;
            d1 += h1 * r0;
            d1 += h2 * (5 * r9);
            d1 += h3 * (5 * r8);
            d1 += h4 * (5 * r7);
            c = d1 >>> 13;
            d1 &= 0x1fff;
            d1 += h5 * (5 * r6);
            d1 += h6 * (5 * r5);
            d1 += h7 * (5 * r4);
            d1 += h8 * (5 * r3);
            d1 += h9 * (5 * r2);
            c += d1 >>> 13;
            d1 &= 0x1fff;
            var d2 = c;
            d2 += h0 * r2;
            d2 += h1 * r1;
            d2 += h2 * r0;
            d2 += h3 * (5 * r9);
            d2 += h4 * (5 * r8);
            c = d2 >>> 13;
            d2 &= 0x1fff;
            d2 += h5 * (5 * r7);
            d2 += h6 * (5 * r6);
            d2 += h7 * (5 * r5);
            d2 += h8 * (5 * r4);
            d2 += h9 * (5 * r3);
            c += d2 >>> 13;
            d2 &= 0x1fff;
            var d3 = c;
            d3 += h0 * r3;
            d3 += h1 * r2;
            d3 += h2 * r1;
            d3 += h3 * r0;
            d3 += h4 * (5 * r9);
            c = d3 >>> 13;
            d3 &= 0x1fff;
            d3 += h5 * (5 * r8);
            d3 += h6 * (5 * r7);
            d3 += h7 * (5 * r6);
            d3 += h8 * (5 * r5);
            d3 += h9 * (5 * r4);
            c += d3 >>> 13;
            d3 &= 0x1fff;
            var d4 = c;
            d4 += h0 * r4;
            d4 += h1 * r3;
            d4 += h2 * r2;
            d4 += h3 * r1;
            d4 += h4 * r0;
            c = d4 >>> 13;
            d4 &= 0x1fff;
            d4 += h5 * (5 * r9);
            d4 += h6 * (5 * r8);
            d4 += h7 * (5 * r7);
            d4 += h8 * (5 * r6);
            d4 += h9 * (5 * r5);
            c += d4 >>> 13;
            d4 &= 0x1fff;
            var d5 = c;
            d5 += h0 * r5;
            d5 += h1 * r4;
            d5 += h2 * r3;
            d5 += h3 * r2;
            d5 += h4 * r1;
            c = d5 >>> 13;
            d5 &= 0x1fff;
            d5 += h5 * r0;
            d5 += h6 * (5 * r9);
            d5 += h7 * (5 * r8);
            d5 += h8 * (5 * r7);
            d5 += h9 * (5 * r6);
            c += d5 >>> 13;
            d5 &= 0x1fff;
            var d6 = c;
            d6 += h0 * r6;
            d6 += h1 * r5;
            d6 += h2 * r4;
            d6 += h3 * r3;
            d6 += h4 * r2;
            c = d6 >>> 13;
            d6 &= 0x1fff;
            d6 += h5 * r1;
            d6 += h6 * r0;
            d6 += h7 * (5 * r9);
            d6 += h8 * (5 * r8);
            d6 += h9 * (5 * r7);
            c += d6 >>> 13;
            d6 &= 0x1fff;
            var d7 = c;
            d7 += h0 * r7;
            d7 += h1 * r6;
            d7 += h2 * r5;
            d7 += h3 * r4;
            d7 += h4 * r3;
            c = d7 >>> 13;
            d7 &= 0x1fff;
            d7 += h5 * r2;
            d7 += h6 * r1;
            d7 += h7 * r0;
            d7 += h8 * (5 * r9);
            d7 += h9 * (5 * r8);
            c += d7 >>> 13;
            d7 &= 0x1fff;
            var d8 = c;
            d8 += h0 * r8;
            d8 += h1 * r7;
            d8 += h2 * r6;
            d8 += h3 * r5;
            d8 += h4 * r4;
            c = d8 >>> 13;
            d8 &= 0x1fff;
            d8 += h5 * r3;
            d8 += h6 * r2;
            d8 += h7 * r1;
            d8 += h8 * r0;
            d8 += h9 * (5 * r9);
            c += d8 >>> 13;
            d8 &= 0x1fff;
            var d9 = c;
            d9 += h0 * r9;
            d9 += h1 * r8;
            d9 += h2 * r7;
            d9 += h3 * r6;
            d9 += h4 * r5;
            c = d9 >>> 13;
            d9 &= 0x1fff;
            d9 += h5 * r4;
            d9 += h6 * r3;
            d9 += h7 * r2;
            d9 += h8 * r1;
            d9 += h9 * r0;
            c += d9 >>> 13;
            d9 &= 0x1fff;
            c = (c << 2) + c | 0;
            c = c + d0 | 0;
            d0 = c & 0x1fff;
            c = c >>> 13;
            d1 += c;
            h0 = d0;
            h1 = d1;
            h2 = d2;
            h3 = d3;
            h4 = d4;
            h5 = d5;
            h6 = d6;
            h7 = d7;
            h8 = d8;
            h9 = d9;
            mpos += 16;
            bytes -= 16;
        }
        this._h[0] = h0;
        this._h[1] = h1;
        this._h[2] = h2;
        this._h[3] = h3;
        this._h[4] = h4;
        this._h[5] = h5;
        this._h[6] = h6;
        this._h[7] = h7;
        this._h[8] = h8;
        this._h[9] = h9;
    };
    Poly1305.prototype.finish = function(mac, macpos) {
        if (macpos === void 0) macpos = 0;
        var g = new Uint16Array(10);
        var c;
        var mask;
        var f;
        var i;
        if (this._leftover) {
            i = this._leftover;
            this._buffer[i++] = 1;
            for(; i < 16; i++)this._buffer[i] = 0;
            this._fin = 1;
            this._blocks(this._buffer, 0, 16);
        }
        c = this._h[1] >>> 13;
        this._h[1] &= 0x1fff;
        for(i = 2; i < 10; i++){
            this._h[i] += c;
            c = this._h[i] >>> 13;
            this._h[i] &= 0x1fff;
        }
        this._h[0] += c * 5;
        c = this._h[0] >>> 13;
        this._h[0] &= 0x1fff;
        this._h[1] += c;
        c = this._h[1] >>> 13;
        this._h[1] &= 0x1fff;
        this._h[2] += c;
        g[0] = this._h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 0x1fff;
        for(i = 1; i < 10; i++){
            g[i] = this._h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 0x1fff;
        }
        g[9] -= 8192;
        mask = (c ^ 1) - 1;
        for(i = 0; i < 10; i++)g[i] &= mask;
        mask = ~mask;
        for(i = 0; i < 10; i++)this._h[i] = this._h[i] & mask | g[i];
        this._h[0] = (this._h[0] | this._h[1] << 13) & 0xffff;
        this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 0xffff;
        this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 0xffff;
        this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 0xffff;
        this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 0xffff;
        this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 0xffff;
        this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 0xffff;
        this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 0xffff;
        f = this._h[0] + this._pad[0];
        this._h[0] = f & 0xffff;
        for(i = 1; i < 8; i++){
            f = (this._h[i] + this._pad[i] | 0) + (f >>> 16) | 0;
            this._h[i] = f & 0xffff;
        }
        mac[macpos + 0] = this._h[0] >>> 0;
        mac[macpos + 1] = this._h[0] >>> 8;
        mac[macpos + 2] = this._h[1] >>> 0;
        mac[macpos + 3] = this._h[1] >>> 8;
        mac[macpos + 4] = this._h[2] >>> 0;
        mac[macpos + 5] = this._h[2] >>> 8;
        mac[macpos + 6] = this._h[3] >>> 0;
        mac[macpos + 7] = this._h[3] >>> 8;
        mac[macpos + 8] = this._h[4] >>> 0;
        mac[macpos + 9] = this._h[4] >>> 8;
        mac[macpos + 10] = this._h[5] >>> 0;
        mac[macpos + 11] = this._h[5] >>> 8;
        mac[macpos + 12] = this._h[6] >>> 0;
        mac[macpos + 13] = this._h[6] >>> 8;
        mac[macpos + 14] = this._h[7] >>> 0;
        mac[macpos + 15] = this._h[7] >>> 8;
        this._finished = true;
        return this;
    };
    Poly1305.prototype.update = function(m) {
        var mpos = 0;
        var bytes = m.length;
        var want;
        if (this._leftover) {
            want = 16 - this._leftover;
            if (want > bytes) want = bytes;
            for(var i = 0; i < want; i++)this._buffer[this._leftover + i] = m[mpos + i];
            bytes -= want;
            mpos += want;
            this._leftover += want;
            if (this._leftover < 16) return this;
            this._blocks(this._buffer, 0, 16);
            this._leftover = 0;
        }
        if (bytes >= 16) {
            want = bytes - bytes % 16;
            this._blocks(m, mpos, want);
            mpos += want;
            bytes -= want;
        }
        if (bytes) {
            for(var i = 0; i < bytes; i++)this._buffer[this._leftover + i] = m[mpos + i];
            this._leftover += bytes;
        }
        return this;
    };
    Poly1305.prototype.digest = function() {
        // TODO(dchest): it behaves differently than other hashes/HMAC,
        // because it throws when finished — others just return saved result.
        if (this._finished) throw new Error("Poly1305 was finished");
        var mac = new Uint8Array(16);
        this.finish(mac);
        return mac;
    };
    Poly1305.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._r);
        wipe_1.wipe(this._h);
        wipe_1.wipe(this._pad);
        this._leftover = 0;
        this._fin = 0;
        this._finished = true; // mark as finished even if not
        return this;
    };
    return Poly1305;
}();
exports.Poly1305 = Poly1305;
/**
 * Returns 16-byte authenticator of data using a one-time 32-byte key.
 *
 * Important: key should be used for only one message, it should never repeat.
 */ function oneTimeAuth(key, data) {
    var h = new Poly1305(key);
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.oneTimeAuth = oneTimeAuth;
/**
 * Returns true if two authenticators are 16-byte long and equal.
 * Uses contant-time comparison to avoid leaking timing information.
 */ function equal(a, b) {
    if (a.length !== exports.DIGEST_LENGTH || b.length !== exports.DIGEST_LENGTH) return false;
    return constant_time_1.equal(a, b);
}
exports.equal = equal;

},{"cb036ce5a49ec1dc":"ccTzW","9bf833f3949af496":"8owN2"}],"ccTzW":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package constant-time provides functions for performing algorithmically constant-time operations.
 */ /**
 * NOTE! Due to the inability to guarantee real constant time evaluation of
 * anything in JavaScript VM, this is module is the best effort.
 */ /**
 * Returns resultIfOne if subject is 1, or resultIfZero if subject is 0.
 *
 * Supports only 32-bit integers, so resultIfOne or resultIfZero are not
 * integers, they'll be converted to them with bitwise operations.
 */ function select(subject, resultIfOne, resultIfZero) {
    return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
}
exports.select = select;
/**
 * Returns 1 if a <= b, or 0 if not.
 * Arguments must be positive 32-bit integers less than or equal to 2^31 - 1.
 */ function lessOrEqual(a, b) {
    return (a | 0) - (b | 0) - 1 >>> 31 & 1;
}
exports.lessOrEqual = lessOrEqual;
/**
 * Returns 1 if a and b are of equal length and their contents
 * are equal, or 0 otherwise.
 *
 * Note that unlike in equal(), zero-length inputs are considered
 * the same, so this function will return 1.
 */ function compare(a, b) {
    if (a.length !== b.length) return 0;
    var result = 0;
    for(var i = 0; i < a.length; i++)result |= a[i] ^ b[i];
    return 1 & result - 1 >>> 8;
}
exports.compare = compare;
/**
 * Returns true if a and b are of equal non-zero length,
 * and their contents are equal, or false otherwise.
 *
 * Note that unlike in compare() zero-length inputs are considered
 * _not_ equal, so this function will return false.
 */ function equal(a, b) {
    if (a.length === 0 || b.length === 0) return false;
    return compare(a, b) !== 0;
}
exports.equal = equal;

},{}],"6r0oT":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var hmac_1 = require("22c3fefd76d432c6");
var wipe_1 = require("770fdc9a318be753");
/**
 * HMAC-based Extract-and-Expand Key Derivation Function.
 *
 * Implements HKDF from RFC5869.
 *
 * Expands the given master key with salt and info into
 * a limited stream of key material.
 */ var HKDF = /** @class */ function() {
    /**
     * Create a new HKDF instance for the given hash function
     * with the master key, optional salt, and info.
     *
     * - Master key is a high-entropy secret key (not a password).
     * - Salt is a non-secret random value.
     * - Info is application- and/or context-specific information.
     */ function HKDF(hash, key, salt, info) {
        if (salt === void 0) salt = new Uint8Array(0);
        this._counter = new Uint8Array(1); // starts with zero
        this._hash = hash;
        this._info = info;
        // HKDF-Extract uses salt as HMAC key, and key as data.
        var okm = hmac_1.hmac(this._hash, salt, key);
        // Initialize HMAC for expanding with extracted key.
        this._hmac = new hmac_1.HMAC(hash, okm);
        // Allocate buffer.
        this._buffer = new Uint8Array(this._hmac.digestLength);
        this._bufpos = this._buffer.length;
    }
    // Fill buffer with new block of HKDF-Extract output.
    HKDF.prototype._fillBuffer = function() {
        // Increment counter.
        this._counter[0]++;
        var ctr = this._counter[0];
        // Check if counter overflowed.
        if (ctr === 0) throw new Error("hkdf: cannot expand more");
        // Prepare HMAC instance for new data with old key.
        this._hmac.reset();
        // Hash in previous output if it was generated
        // (i.e. counter is greater than 1).
        if (ctr > 1) this._hmac.update(this._buffer);
        // Hash in info if it exists.
        if (this._info) this._hmac.update(this._info);
        // Hash in the counter.
        this._hmac.update(this._counter);
        // Output result to buffer and clean HMAC instance.
        this._hmac.finish(this._buffer);
        // Reset buffer position.
        this._bufpos = 0;
    };
    /**
     * Expand returns next key material of the given length.
     *
     * It throws if expansion limit is reached (which is
     * 254 digests of the underlying HMAC function).
     */ HKDF.prototype.expand = function(length) {
        var out = new Uint8Array(length);
        for(var i = 0; i < out.length; i++){
            if (this._bufpos === this._buffer.length) this._fillBuffer();
            out[i] = this._buffer[this._bufpos++];
        }
        return out;
    };
    HKDF.prototype.clean = function() {
        this._hmac.clean();
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._counter);
        this._bufpos = 0;
    };
    return HKDF;
}();
exports.HKDF = HKDF; // TODO(dchest): maybe implement deriveKey?

},{"22c3fefd76d432c6":"hAdnx","770fdc9a318be753":"8owN2"}],"hAdnx":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package hmac implements HMAC algorithm.
 */ var hash_1 = require("a5edd28b38653eb1");
var constant_time_1 = require("e8efa35f4b1e37ac");
var wipe_1 = require("40d3514c50dd920b");
/**
 *  HMAC implements hash-based message authentication algorithm.
 */ var HMAC = /** @class */ function() {
    /**
     * Constructs a new HMAC with the given Hash and secret key.
     */ function HMAC(hash, key) {
        this._finished = false; // true if HMAC was finalized
        // Initialize inner and outer hashes.
        this._inner = new hash();
        this._outer = new hash();
        // Set block and digest sizes for this HMAC
        // instance to values from the hash.
        this.blockSize = this._outer.blockSize;
        this.digestLength = this._outer.digestLength;
        // Pad temporary stores a key (or its hash) padded with zeroes.
        var pad = new Uint8Array(this.blockSize);
        if (key.length > this.blockSize) // If key is bigger than hash block size, it must be
        // hashed and this hash is used as a key instead.
        this._inner.update(key).finish(pad).clean();
        else // Otherwise, copy the key into pad.
        pad.set(key);
        // Now two different keys are derived from padded key
        // by xoring a different byte value to each.
        // To make inner hash key, xor byte 0x36 into pad.
        for(var i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        // Update inner hash with the result.
        this._inner.update(pad);
        // To make outer hash key, xor byte 0x5c into pad.
        // But since we already xored 0x36 there, we must
        // first undo this by xoring it again.
        for(var i = 0; i < pad.length; i++)pad[i] ^= 106;
        // Update outer hash with the result.
        this._outer.update(pad);
        // Save states of both hashes, so that we can quickly restore
        // them later in reset() without the need to remember the actual
        // key and perform this initialization again.
        if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {
            this._innerKeyedState = this._inner.saveState();
            this._outerKeyedState = this._outer.saveState();
        }
        // Clean pad.
        wipe_1.wipe(pad);
    }
    /**
     * Returns HMAC state to the state initialized with key
     * to make it possible to run HMAC over the other data with the same
     * key without creating a new instance.
     */ HMAC.prototype.reset = function() {
        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
        // Restore keyed states of inner and outer hashes.
        this._inner.restoreState(this._innerKeyedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
    };
    /**
     * Cleans HMAC state.
     */ HMAC.prototype.clean = function() {
        if (hash_1.isSerializableHash(this._inner)) this._inner.cleanSavedState(this._innerKeyedState);
        if (hash_1.isSerializableHash(this._outer)) this._outer.cleanSavedState(this._outerKeyedState);
        this._inner.clean();
        this._outer.clean();
    };
    /**
     * Updates state with provided data.
     */ HMAC.prototype.update = function(data) {
        this._inner.update(data);
        return this;
    };
    /**
     * Finalizes HMAC and puts the result in out.
     */ HMAC.prototype.finish = function(out) {
        if (this._finished) {
            // If HMAC was finalized, outer hash is also finalized,
            // so it produces the same digest it produced when it
            // was finalized.
            this._outer.finish(out);
            return this;
        }
        // Finalize inner hash and store the result temporarily.
        this._inner.finish(out);
        // Update outer hash with digest of inner hash and and finalize it.
        this._outer.update(out.subarray(0, this.digestLength)).finish(out);
        this._finished = true;
        return this;
    };
    /**
     * Returns the computed message authentication code.
     */ HMAC.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    };
    /**
     * Saves HMAC state.
     * This function is needed for PBKDF2 optimization.
     */ HMAC.prototype.saveState = function() {
        if (!hash_1.isSerializableHash(this._inner)) throw new Error("hmac: can't saveState() because hash doesn't implement it");
        return this._inner.saveState();
    };
    HMAC.prototype.restoreState = function(savedState) {
        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) throw new Error("hmac: can't restoreState() because hash doesn't implement it");
        this._inner.restoreState(savedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
    };
    HMAC.prototype.cleanSavedState = function(savedState) {
        if (!hash_1.isSerializableHash(this._inner)) throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
        this._inner.cleanSavedState(savedState);
    };
    return HMAC;
}();
exports.HMAC = HMAC;
/**
 * Returns HMAC using the given hash constructor for the key over data.
 */ function hmac(hash, key, data) {
    var h = new HMAC(hash, key);
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.hmac = hmac;
/**
 * Returns true if two HMAC digests are equal.
 * Uses constant-time comparison to avoid leaking timing information.
 *
 * Example:
 *
 *    const receivedDigest = ...
 *    const realDigest = hmac(SHA256, key, data);
 *    if (!equal(receivedDigest, realDigest)) {
 *        throw new Error("Authentication error");
 *    }
 */ exports.equal = constant_time_1.equal;

},{"a5edd28b38653eb1":"5mYqj","e8efa35f4b1e37ac":"ccTzW","40d3514c50dd920b":"8owN2"}],"5mYqj":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
function isSerializableHash(h) {
    return typeof h.saveState !== "undefined" && typeof h.restoreState !== "undefined" && typeof h.cleanSavedState !== "undefined";
}
exports.isSerializableHash = isSerializableHash; // TODO(dchest): figure out the standardized interface for XOF such as
 // SHAKE and BLAKE2X.

},{}],"9Qs60":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
const system_1 = require("95b84bbab8abd28a");
const binary_1 = require("6171ab791b4ad9be");
const wipe_1 = require("a68df3e51a6c727e");
exports.defaultRandomSource = new system_1.SystemRandomSource();
function randomBytes(length, prng = exports.defaultRandomSource) {
    return prng.randomBytes(length);
}
exports.randomBytes = randomBytes;
/**
 * Returns a uniformly random unsigned 32-bit integer.
 */ function randomUint32(prng = exports.defaultRandomSource) {
    // Generate 4-byte random buffer.
    const buf = randomBytes(4, prng);
    // Convert bytes from buffer into a 32-bit integer.
    // It's not important which byte order to use, since
    // the result is random.
    const result = (0, binary_1.readUint32LE)(buf);
    // Clean the buffer.
    (0, wipe_1.wipe)(buf);
    return result;
}
exports.randomUint32 = randomUint32;
/** 62 alphanumeric characters for default charset of randomString() */ const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
/**
 * Returns a uniform random string of the given length
 * with characters from the given charset.
 *
 * Charset must not have more than 256 characters.
 *
 * Default charset generates case-sensitive alphanumeric
 * strings (0-9, A-Z, a-z).
 */ function randomString(length, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
    if (charset.length < 2) throw new Error("randomString charset is too short");
    if (charset.length > 256) throw new Error("randomString charset is too long");
    let out = "";
    const charsLen = charset.length;
    const maxByte = 256 - 256 % charsLen;
    while(length > 0){
        const buf = randomBytes(Math.ceil(length * 256 / maxByte), prng);
        for(let i = 0; i < buf.length && length > 0; i++){
            const randomByte = buf[i];
            if (randomByte < maxByte) {
                out += charset.charAt(randomByte % charsLen);
                length--;
            }
        }
        (0, wipe_1.wipe)(buf);
    }
    return out;
}
exports.randomString = randomString;
/**
 * Returns uniform random string containing at least the given
 * number of bits of entropy.
 *
 * For example, randomStringForEntropy(128) will return a 22-character
 * alphanumeric string, while randomStringForEntropy(128, "0123456789")
 * will return a 39-character numeric string, both will contain at
 * least 128 bits of entropy.
 *
 * Default charset generates case-sensitive alphanumeric
 * strings (0-9, A-Z, a-z).
 */ function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
    const length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
    return randomString(length, charset, prng);
}
exports.randomStringForEntropy = randomStringForEntropy;

},{"95b84bbab8abd28a":"1mwaP","6171ab791b4ad9be":"92RWm","a68df3e51a6c727e":"8owN2"}],"1mwaP":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SystemRandomSource = void 0;
const browser_1 = require("52b06b243208607e");
const node_1 = require("49f156a36041812e");
class SystemRandomSource {
    constructor(){
        this.isAvailable = false;
        this.name = "";
        // Try browser.
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
            this.isAvailable = true;
            this.name = "Browser";
            return;
        }
        // If no browser source, try Node.
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
            this.isAvailable = true;
            this.name = "Node";
            return;
        }
    // No sources, we're out of options.
    }
    randomBytes(length) {
        if (!this.isAvailable) throw new Error("System random byte generator is not available.");
        return this._source.randomBytes(length);
    }
}
exports.SystemRandomSource = SystemRandomSource;

},{"52b06b243208607e":"1HoUi","49f156a36041812e":"5rdHt"}],"1HoUi":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrowserRandomSource = void 0;
const QUOTA = 65536;
class BrowserRandomSource {
    constructor(){
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto // IE11 has msCrypto
         : null;
        if (browserCrypto && browserCrypto.getRandomValues !== undefined) {
            this._crypto = browserCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
        }
    }
    randomBytes(length) {
        if (!this.isAvailable || !this._crypto) throw new Error("Browser random byte generator is not available.");
        const out = new Uint8Array(length);
        for(let i = 0; i < out.length; i += QUOTA)this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
        return out;
    }
}
exports.BrowserRandomSource = BrowserRandomSource;

},{}],"5rdHt":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeRandomSource = void 0;
const wipe_1 = require("89d2f763d16eb5cc");
class NodeRandomSource {
    constructor(){
        this.isAvailable = false;
        this.isInstantiated = false;
        {
            const nodeCrypto = require("fb6960c20402a81a");
            if (nodeCrypto && nodeCrypto.randomBytes) {
                this._crypto = nodeCrypto;
                this.isAvailable = true;
                this.isInstantiated = true;
            }
        }
    }
    randomBytes(length) {
        if (!this.isAvailable || !this._crypto) throw new Error("Node.js random byte generator is not available.");
        // Get random bytes (result is Buffer).
        let buffer = this._crypto.randomBytes(length);
        // Make sure we got the length that we requested.
        if (buffer.length !== length) throw new Error("NodeRandomSource: got fewer bytes than requested");
        // Allocate output array.
        const out = new Uint8Array(length);
        // Copy bytes from buffer to output.
        for(let i = 0; i < out.length; i++)out[i] = buffer[i];
        // Cleanup.
        (0, wipe_1.wipe)(buffer);
        return out;
    }
}
exports.NodeRandomSource = NodeRandomSource;

},{"89d2f763d16eb5cc":"8owN2","fb6960c20402a81a":"jhUEF"}],"jhUEF":[function(require,module,exports) {
"use strict";

},{}],"fPm7j":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var binary_1 = require("7becd44fc0145972");
var wipe_1 = require("8812ec0d6d863ba9");
exports.DIGEST_LENGTH = 32;
exports.BLOCK_SIZE = 64;
/**
 * SHA2-256 cryptographic hash algorithm.
 */ var SHA256 = /** @class */ function() {
    function SHA256() {
        /** Length of hash output */ this.digestLength = exports.DIGEST_LENGTH;
        /** Block size */ this.blockSize = exports.BLOCK_SIZE;
        // Note: Int32Array is used instead of Uint32Array for performance reasons.
        this._state = new Int32Array(8); // hash state
        this._temp = new Int32Array(64); // temporary state
        this._buffer = new Uint8Array(128); // buffer for data to hash
        this._bufferLength = 0; // number of bytes in buffer
        this._bytesHashed = 0; // number of total bytes hashed
        this._finished = false; // indicates whether the hash was finalized
        this.reset();
    }
    SHA256.prototype._initState = function() {
        this._state[0] = 0x6a09e667;
        this._state[1] = 0xbb67ae85;
        this._state[2] = 0x3c6ef372;
        this._state[3] = 0xa54ff53a;
        this._state[4] = 0x510e527f;
        this._state[5] = 0x9b05688c;
        this._state[6] = 0x1f83d9ab;
        this._state[7] = 0x5be0cd19;
    };
    /**
     * Resets hash state making it possible
     * to re-use this instance to hash other data.
     */ SHA256.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
    };
    /**
     * Cleans internal buffers and resets hash state.
     */ SHA256.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._temp);
        this.reset();
    };
    /**
     * Updates hash state with the given data.
     *
     * Throws error when trying to update already finalized hash:
     * instance must be reset to update it again.
     */ SHA256.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) dataLength = data.length;
        if (this._finished) throw new Error("SHA256: can't update because hash was finished.");
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
            while(this._bufferLength < this.blockSize && dataLength > 0){
                this._buffer[this._bufferLength++] = data[dataPos++];
                dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
                hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
                this._bufferLength = 0;
            }
        }
        if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
            dataLength %= this.blockSize;
        }
        while(dataLength > 0){
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
        }
        return this;
    };
    /**
     * Finalizes hash state and puts hash into out.
     * If hash was already finalized, puts the same value.
     */ SHA256.prototype.finish = function(out) {
        if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 0x20000000 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 64 < 56 ? 64 : 128;
            this._buffer[left] = 0x80;
            for(var i = left + 1; i < padLength - 8; i++)this._buffer[i] = 0;
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
            this._finished = true;
        }
        for(var i = 0; i < this.digestLength / 4; i++)binary_1.writeUint32BE(this._state[i], out, i * 4);
        return this;
    };
    /**
     * Returns the final hash digest.
     */ SHA256.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization.
     * Returns hash state to be used with restoreState().
     * Only chain value is saved, not buffers or other
     * state variables.
     */ SHA256.prototype.saveState = function() {
        if (this._finished) throw new Error("SHA256: cannot save finished state");
        return {
            state: new Int32Array(this._state),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
        };
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization.
     * Restores state saved by saveState() and sets bytesHashed
     * to the given value.
     */ SHA256.prototype.restoreState = function(savedState) {
        this._state.set(savedState.state);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) this._buffer.set(savedState.buffer);
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
    };
    /**
     * Cleans state returned by saveState().
     */ SHA256.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.state);
        if (savedState.buffer) wipe_1.wipe(savedState.buffer);
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
    };
    return SHA256;
}();
exports.SHA256 = SHA256;
// Constants
var K = new Int32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
function hashBlocks(w, v, p, pos, len) {
    while(len >= 64){
        var a = v[0];
        var b = v[1];
        var c = v[2];
        var d = v[3];
        var e = v[4];
        var f = v[5];
        var g = v[6];
        var h = v[7];
        for(var i = 0; i < 16; i++){
            var j = pos + i * 4;
            w[i] = binary_1.readUint32BE(p, j);
        }
        for(var i = 16; i < 64; i++){
            var u = w[i - 2];
            var t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
            u = w[i - 15];
            var t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }
        for(var i = 0; i < 64; i++){
            var t1 = (((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            var t2 = ((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
        }
        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;
        pos += 64;
        len -= 64;
    }
    return pos;
}
function hash(data) {
    var h = new SHA256();
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.hash = hash;

},{"7becd44fc0145972":"92RWm","8812ec0d6d863ba9":"8owN2"}],"5xoxU":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
/**
 * Package x25519 implements X25519 key agreement.
 */ const random_1 = require("bbd92447c4dc8a5b");
const wipe_1 = require("9037f94747cb188");
exports.PUBLIC_KEY_LENGTH = 32;
exports.SECRET_KEY_LENGTH = 32;
exports.SHARED_KEY_LENGTH = 32;
// Returns new zero-filled 16-element GF (Float64Array).
// If passed an array of numbers, prefills the returned
// array with them.
//
// We use Float64Array, because we need 48-bit numbers
// for this implementation.
function gf(init) {
    const r = new Float64Array(16);
    if (init) for(let i = 0; i < init.length; i++)r[i] = init[i];
    return r;
}
// Base point.
const _9 = new Uint8Array(32);
_9[0] = 9;
const _121665 = gf([
    0xdb41,
    1
]);
function car25519(o) {
    let c = 1;
    for(let i = 0; i < 16; i++){
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
}
function sel25519(p, q, b) {
    const c = ~(b - 1);
    for(let i = 0; i < 16; i++){
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
    }
}
function pack25519(o, n) {
    const m = gf();
    const t = gf();
    for(let i = 0; i < 16; i++)t[i] = n[i];
    car25519(t);
    car25519(t);
    car25519(t);
    for(let j = 0; j < 2; j++){
        m[0] = t[0] - 0xffed;
        for(let i = 1; i < 15; i++){
            m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 0xffff;
        }
        m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 0xffff;
        sel25519(t, m, 1 - b);
    }
    for(let i = 0; i < 16; i++){
        o[2 * i] = t[i] & 0xff;
        o[2 * i + 1] = t[i] >> 8;
    }
}
function unpack25519(o, n) {
    for(let i = 0; i < 16; i++)o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    o[15] &= 0x7fff;
}
function add(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] + b[i];
}
function sub(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] - b[i];
}
function mul(o, a, b) {
    let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    // t15 left as is
    // first car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    // second car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
}
function square(o, a) {
    mul(o, a, a);
}
function inv25519(o, inp) {
    const c = gf();
    for(let i = 0; i < 16; i++)c[i] = inp[i];
    for(let i = 253; i >= 0; i--){
        square(c, c);
        if (i !== 2 && i !== 4) mul(c, c, inp);
    }
    for(let i = 0; i < 16; i++)o[i] = c[i];
}
function scalarMult(n, p) {
    const z = new Uint8Array(32);
    const x = new Float64Array(80);
    const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
    for(let i = 0; i < 31; i++)z[i] = n[i];
    z[31] = n[31] & 127 | 64;
    z[0] &= 248;
    unpack25519(x, p);
    for(let i = 0; i < 16; i++)b[i] = x[i];
    a[0] = d[0] = 1;
    for(let i = 254; i >= 0; --i){
        const r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        add(e, a, c);
        sub(a, a, c);
        add(c, b, d);
        sub(b, b, d);
        square(d, e);
        square(f, a);
        mul(a, c, a);
        mul(c, b, e);
        add(e, a, c);
        sub(a, a, c);
        square(b, a);
        sub(c, d, f);
        mul(a, c, _121665);
        add(a, a, d);
        mul(c, c, a);
        mul(a, d, f);
        mul(d, b, x);
        square(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
    }
    for(let i = 0; i < 16; i++){
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
    }
    const x32 = x.subarray(32);
    const x16 = x.subarray(16);
    inv25519(x32, x32);
    mul(x16, x16, x32);
    const q = new Uint8Array(32);
    pack25519(q, x16);
    return q;
}
exports.scalarMult = scalarMult;
function scalarMultBase(n) {
    return scalarMult(n, _9);
}
exports.scalarMultBase = scalarMultBase;
function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SECRET_KEY_LENGTH) throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
    const secretKey = new Uint8Array(seed);
    const publicKey = scalarMultBase(secretKey);
    return {
        publicKey,
        secretKey
    };
}
exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
function generateKeyPair(prng) {
    const seed = (0, random_1.randomBytes)(32, prng);
    const result = generateKeyPairFromSeed(seed);
    (0, wipe_1.wipe)(seed);
    return result;
}
exports.generateKeyPair = generateKeyPair;
/**
 * Returns a shared key between our secret key and a peer's public key.
 *
 * Throws an error if the given keys are of wrong length.
 *
 * If rejectZero is true throws if the calculated shared key is all-zero.
 * From RFC 7748:
 *
 * > Protocol designers using Diffie-Hellman over the curves defined in
 * > this document must not assume "contributory behavior".  Specially,
 * > contributory behavior means that both parties' private keys
 * > contribute to the resulting shared key.  Since curve25519 and
 * > curve448 have cofactors of 8 and 4 (respectively), an input point of
 * > small order will eliminate any contribution from the other party's
 * > private key.  This situation can be detected by checking for the all-
 * > zero output, which implementations MAY do, as specified in Section 6.
 * > However, a large number of existing implementations do not do this.
 *
 * IMPORTANT: the returned key is a raw result of scalar multiplication.
 * To use it as a key material, hash it with a cryptographic hash function.
 */ function sharedKey(mySecretKey, theirPublicKey, rejectZero = false) {
    if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) throw new Error("X25519: incorrect secret key length");
    if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) throw new Error("X25519: incorrect public key length");
    const result = scalarMult(mySecretKey, theirPublicKey);
    if (rejectZero) {
        let zeros = 0;
        for(let i = 0; i < result.length; i++)zeros |= result[i];
        if (zeros === 0) throw new Error("X25519: invalid shared key");
    }
    return result;
}
exports.sharedKey = sharedKey;

},{"bbd92447c4dc8a5b":"9Qs60","9037f94747cb188":"8owN2"}],"ctPgX":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var compare = require("2723be925479f9b5");
var concat = require("55601d17c951cece");
var equals = require("d6e785ac4c89a0f4");
var fromString = require("6d9691200c10f5ac");
var toString = require("4f7d775db91966d");
var xor = require("6b9ec6020595ff59");
exports.compare = compare.compare;
exports.concat = concat.concat;
exports.equals = equals.equals;
exports.fromString = fromString.fromString;
exports.toString = toString.toString;
exports.xor = xor.xor;

},{"2723be925479f9b5":"4sxCx","55601d17c951cece":"gqJ9u","d6e785ac4c89a0f4":"iZMnE","6d9691200c10f5ac":"7qjkp","4f7d775db91966d":"w8mvE","6b9ec6020595ff59":"6tR3H"}],"4sxCx":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function compare(a, b) {
    for(let i = 0; i < a.byteLength; i++){
        if (a[i] < b[i]) return -1;
        if (a[i] > b[i]) return 1;
    }
    if (a.byteLength > b.byteLength) return 1;
    if (a.byteLength < b.byteLength) return -1;
    return 0;
}
exports.compare = compare;

},{}],"gqJ9u":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var alloc = require("e2f6c12d369786de");
var asUint8array = require("60d15feaf9d38a79");
function concat(arrays, length) {
    if (!length) length = arrays.reduce((acc, curr)=>acc + curr.length, 0);
    const output = alloc.allocUnsafe(length);
    let offset = 0;
    for (const arr of arrays){
        output.set(arr, offset);
        offset += arr.length;
    }
    return asUint8array.asUint8Array(output);
}
exports.concat = concat;

},{"e2f6c12d369786de":"jsZij","60d15feaf9d38a79":"hN1l1"}],"jsZij":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var asUint8array = require("1912689f04eecc12");
function alloc(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) return asUint8array.asUint8Array(globalThis.Buffer.alloc(size));
    return new Uint8Array(size);
}
function allocUnsafe(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) return asUint8array.asUint8Array(globalThis.Buffer.allocUnsafe(size));
    return new Uint8Array(size);
}
exports.alloc = alloc;
exports.allocUnsafe = allocUnsafe;

},{"1912689f04eecc12":"hN1l1"}],"hN1l1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function asUint8Array(buf) {
    if (globalThis.Buffer != null) return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    return buf;
}
exports.asUint8Array = asUint8Array;

},{}],"iZMnE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function equals(a, b) {
    if (a === b) return true;
    if (a.byteLength !== b.byteLength) return false;
    for(let i = 0; i < a.byteLength; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
exports.equals = equals;

},{}],"7qjkp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bases = require("99480b3736a45df8");
var asUint8array = require("eb5ef55ea61da240");
function fromString(string, encoding = "utf8") {
    const base = bases[encoding];
    if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) return asUint8array.asUint8Array(globalThis.Buffer.from(string, "utf-8"));
    return base.decoder.decode(`${base.prefix}${string}`);
}
exports.fromString = fromString;

},{"99480b3736a45df8":"ekopG","eb5ef55ea61da240":"hN1l1"}],"ekopG":[function(require,module,exports) {
"use strict";
var basics = require("190b60d88612a55");
var alloc = require("58496cd795266c62");
function createCodec(name, prefix, encode, decode) {
    return {
        name,
        prefix,
        encoder: {
            name,
            prefix,
            encode
        },
        decoder: {
            decode
        }
    };
}
const string = createCodec("utf8", "u", (buf)=>{
    const decoder = new TextDecoder("utf8");
    return "u" + decoder.decode(buf);
}, (str)=>{
    const encoder = new TextEncoder();
    return encoder.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf)=>{
    let string = "a";
    for(let i = 0; i < buf.length; i++)string += String.fromCharCode(buf[i]);
    return string;
}, (str)=>{
    str = str.substring(1);
    const buf = alloc.allocUnsafe(str.length);
    for(let i = 0; i < str.length; i++)buf[i] = str.charCodeAt(i);
    return buf;
});
const BASES = {
    utf8: string,
    "utf-8": string,
    hex: basics.bases.base16,
    latin1: ascii,
    ascii: ascii,
    binary: ascii,
    ...basics.bases
};
module.exports = BASES;

},{"190b60d88612a55":"a826o","58496cd795266c62":"jsZij"}],"a826o":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var identity = require("5661bf79a4a86163");
var base2 = require("92f7de35992ff529");
var base8 = require("99403555646e4b01");
var base10 = require("7bd4c12dbdbfa352");
var base16 = require("5d0a92fef6fb89bf");
var base32 = require("c1a0d10fb67cd525");
var base36 = require("faca89b129a6c1b2");
var base58 = require("3ab4168f23b15924");
var base64 = require("33e7c811597529af");
var base256emoji = require("b5ec1ca7b3019d4");
var sha2 = require("d25d3b6bcb424c86");
var identity$1 = require("460d65c54398a6e4");
var raw = require("addaf882fdf30c51");
var json = require("cd95f9ca9f42ac1e");
require("b09ac10d5fa2ec4b");
var cid = require("79cc7d8ad966fcf");
var hasher = require("d6f49237d20b9c1c");
var digest = require("f6479bf16d9a334c");
var varint = require("6391ff4d314b3214");
var bytes = require("27296f9a39cee6a4");
const bases = {
    ...identity,
    ...base2,
    ...base8,
    ...base10,
    ...base16,
    ...base32,
    ...base36,
    ...base58,
    ...base64,
    ...base256emoji
};
const hashes = {
    ...sha2,
    ...identity$1
};
const codecs = {
    raw,
    json
};
exports.CID = cid.CID;
exports.hasher = hasher;
exports.digest = digest;
exports.varint = varint;
exports.bytes = bytes;
exports.bases = bases;
exports.codecs = codecs;
exports.hashes = hashes;

},{"5661bf79a4a86163":"jy16e","92f7de35992ff529":"jAOxB","99403555646e4b01":"3WMjP","7bd4c12dbdbfa352":"aFB7O","5d0a92fef6fb89bf":"e5DKK","c1a0d10fb67cd525":"apmz1","faca89b129a6c1b2":"22c8Y","3ab4168f23b15924":"9KkrI","33e7c811597529af":"3gCnk","b5ec1ca7b3019d4":"cSiGJ","d25d3b6bcb424c86":"7U0mx","460d65c54398a6e4":"bj4ky","addaf882fdf30c51":"cxcPD","cd95f9ca9f42ac1e":"7lUAp","b09ac10d5fa2ec4b":"3QFUn","79cc7d8ad966fcf":"4uoBU","d6f49237d20b9c1c":"lU6YS","f6479bf16d9a334c":"9JdI8","6391ff4d314b3214":"8P1F2","27296f9a39cee6a4":"ent0w"}],"jy16e":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("bab538411f8ce9c0");
var bytes = require("64f3cab3fd4dd6b");
const identity = base.from({
    prefix: "\x00",
    name: "identity",
    encode: (buf)=>bytes.toString(buf),
    decode: (str)=>bytes.fromString(str)
});
exports.identity = identity;

},{"bab538411f8ce9c0":"j888T","64f3cab3fd4dd6b":"ent0w"}],"j888T":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseX$1 = require("e2b0538244b8b4c6");
var bytes = require("e0493e14db98d36e");
class Encoder {
    constructor(name, prefix, baseEncode){
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
    }
    encode(bytes) {
        if (bytes instanceof Uint8Array) return `${this.prefix}${this.baseEncode(bytes)}`;
        else throw Error("Unknown type, must be binary type");
    }
}
class Decoder {
    constructor(name, prefix, baseDecode){
        this.name = name;
        this.prefix = prefix;
        if (prefix.codePointAt(0) === undefined) throw new Error("Invalid prefix character");
        this.prefixCodePoint = prefix.codePointAt(0);
        this.baseDecode = baseDecode;
    }
    decode(text) {
        if (typeof text === "string") {
            if (text.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(text.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(decoder) {
        return or(this, decoder);
    }
}
class ComposedDecoder {
    constructor(decoders){
        this.decoders = decoders;
    }
    or(decoder) {
        return or(this, decoder);
    }
    decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) return decoder.decode(input);
        else throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const or = (left, right)=>new ComposedDecoder({
        ...left.decoders || {
            [left.prefix]: left
        },
        ...right.decoders || {
            [right.prefix]: right
        }
    });
class Codec {
    constructor(name, prefix, baseEncode, baseDecode){
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name, prefix, baseEncode);
        this.decoder = new Decoder(name, prefix, baseDecode);
    }
    encode(input) {
        return this.encoder.encode(input);
    }
    decode(input) {
        return this.decoder.decode(input);
    }
}
const from = ({ name, prefix, encode, decode })=>new Codec(name, prefix, encode, decode);
const baseX = ({ prefix, name, alphabet })=>{
    const { encode, decode } = baseX$1(alphabet, name);
    return from({
        prefix,
        name,
        encode,
        decode: (text)=>bytes.coerce(decode(text))
    });
};
const decode = (string, alphabet, bitsPerChar, name)=>{
    const codes = {};
    for(let i = 0; i < alphabet.length; ++i)codes[alphabet[i]] = i;
    let end = string.length;
    while(string[end - 1] === "=")--end;
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for(let i = 0; i < end; ++i){
        const value = codes[string[i]];
        if (value === undefined) throw new SyntaxError(`Non-${name} character`);
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & buffer >> bits;
        }
    }
    if (bits >= bitsPerChar || 255 & buffer << 8 - bits) throw new SyntaxError("Unexpected end of data");
    return out;
};
const encode = (data, alphabet, bitsPerChar)=>{
    const pad = alphabet[alphabet.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for(let i = 0; i < data.length; ++i){
        buffer = buffer << 8 | data[i];
        bits += 8;
        while(bits > bitsPerChar){
            bits -= bitsPerChar;
            out += alphabet[mask & buffer >> bits];
        }
    }
    if (bits) out += alphabet[mask & buffer << bitsPerChar - bits];
    if (pad) while(out.length * bitsPerChar & 7)out += "=";
    return out;
};
const rfc4648 = ({ name, prefix, bitsPerChar, alphabet })=>{
    return from({
        prefix,
        name,
        encode (input) {
            return encode(input, alphabet, bitsPerChar);
        },
        decode (input) {
            return decode(input, alphabet, bitsPerChar, name);
        }
    });
};
exports.Codec = Codec;
exports.baseX = baseX;
exports.from = from;
exports.or = or;
exports.rfc4648 = rfc4648;

},{"e2b0538244b8b4c6":"bPHFa","e0493e14db98d36e":"ent0w"}],"bPHFa":[function(require,module,exports) {
"use strict";
function base(ALPHABET, name) {
    if (ALPHABET.length >= 255) throw new TypeError("Alphabet too long");
    var BASE_MAP = new Uint8Array(256);
    for(var j = 0; j < BASE_MAP.length; j++)BASE_MAP[j] = 255;
    for(var i = 0; i < ALPHABET.length; i++){
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) throw new TypeError(x + " is ambiguous");
        BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode(source) {
        if (source instanceof Uint8Array) ;
        else if (ArrayBuffer.isView(source)) source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        else if (Array.isArray(source)) source = Uint8Array.from(source);
        if (!(source instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (source.length === 0) return "";
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while(pbegin !== pend && source[pbegin] === 0){
            pbegin++;
            zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while(pbegin !== pend){
            var carry = source[pbegin];
            var i = 0;
            for(var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++){
                carry += 256 * b58[it1] >>> 0;
                b58[it1] = carry % BASE >>> 0;
                carry = carry / BASE >>> 0;
            }
            if (carry !== 0) throw new Error("Non-zero carry");
            length = i;
            pbegin++;
        }
        var it2 = size - length;
        while(it2 !== size && b58[it2] === 0)it2++;
        var str = LEADER.repeat(zeroes);
        for(; it2 < size; ++it2)str += ALPHABET.charAt(b58[it2]);
        return str;
    }
    function decodeUnsafe(source) {
        if (typeof source !== "string") throw new TypeError("Expected String");
        if (source.length === 0) return new Uint8Array();
        var psz = 0;
        if (source[psz] === " ") return;
        var zeroes = 0;
        var length = 0;
        while(source[psz] === LEADER){
            zeroes++;
            psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while(source[psz]){
            var carry = BASE_MAP[source.charCodeAt(psz)];
            if (carry === 255) return;
            var i = 0;
            for(var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++){
                carry += BASE * b256[it3] >>> 0;
                b256[it3] = carry % 256 >>> 0;
                carry = carry / 256 >>> 0;
            }
            if (carry !== 0) throw new Error("Non-zero carry");
            length = i;
            psz++;
        }
        if (source[psz] === " ") return;
        var it4 = size - length;
        while(it4 !== size && b256[it4] === 0)it4++;
        var vch = new Uint8Array(zeroes + (size - it4));
        var j = zeroes;
        while(it4 !== size)vch[j++] = b256[it4++];
        return vch;
    }
    function decode(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) return buffer;
        throw new Error(`Non-${name} character`);
    }
    return {
        encode: encode,
        decodeUnsafe: decodeUnsafe,
        decode: decode
    };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
module.exports = _brrp__multiformats_scope_baseX;

},{}],"ent0w":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const empty = new Uint8Array(0);
const toHex = (d)=>d.reduce((hex, byte)=>hex + byte.toString(16).padStart(2, "0"), "");
const fromHex = (hex)=>{
    const hexes = hex.match(/../g);
    return hexes ? new Uint8Array(hexes.map((b)=>parseInt(b, 16))) : empty;
};
const equals = (aa, bb)=>{
    if (aa === bb) return true;
    if (aa.byteLength !== bb.byteLength) return false;
    for(let ii = 0; ii < aa.byteLength; ii++){
        if (aa[ii] !== bb[ii]) return false;
    }
    return true;
};
const coerce = (o)=>{
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array") return o;
    if (o instanceof ArrayBuffer) return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    throw new Error("Unknown type, must be binary type");
};
const isBinary = (o)=>o instanceof ArrayBuffer || ArrayBuffer.isView(o);
const fromString = (str)=>new TextEncoder().encode(str);
const toString = (b)=>new TextDecoder().decode(b);
exports.coerce = coerce;
exports.empty = empty;
exports.equals = equals;
exports.fromHex = fromHex;
exports.fromString = fromString;
exports.isBinary = isBinary;
exports.toHex = toHex;
exports.toString = toString;

},{}],"jAOxB":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("d92b1da40210e764");
const base2 = base.rfc4648({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
exports.base2 = base2;

},{"d92b1da40210e764":"j888T"}],"3WMjP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("8f834d7ec49f71ea");
const base8 = base.rfc4648({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
exports.base8 = base8;

},{"8f834d7ec49f71ea":"j888T"}],"aFB7O":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("72679f0e6da595d0");
const base10 = base.baseX({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
exports.base10 = base10;

},{"72679f0e6da595d0":"j888T"}],"e5DKK":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("20fe0ea66660873a");
const base16 = base.rfc4648({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
});
const base16upper = base.rfc4648({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
exports.base16 = base16;
exports.base16upper = base16upper;

},{"20fe0ea66660873a":"j888T"}],"apmz1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("a71f95f446e3afc0");
const base32 = base.rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
});
const base32upper = base.rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
});
const base32pad = base.rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
});
const base32padupper = base.rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
});
const base32hex = base.rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
});
const base32hexupper = base.rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
});
const base32hexpad = base.rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
});
const base32hexpadupper = base.rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
});
const base32z = base.rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
exports.base32 = base32;
exports.base32hex = base32hex;
exports.base32hexpad = base32hexpad;
exports.base32hexpadupper = base32hexpadupper;
exports.base32hexupper = base32hexupper;
exports.base32pad = base32pad;
exports.base32padupper = base32padupper;
exports.base32upper = base32upper;
exports.base32z = base32z;

},{"a71f95f446e3afc0":"j888T"}],"22c8Y":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("f8d89a854fe0304b");
const base36 = base.baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = base.baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
exports.base36 = base36;
exports.base36upper = base36upper;

},{"f8d89a854fe0304b":"j888T"}],"9KkrI":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("83679cee3a38c3ed");
const base58btc = base.baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = base.baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
exports.base58btc = base58btc;
exports.base58flickr = base58flickr;

},{"83679cee3a38c3ed":"j888T"}],"3gCnk":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("20a9eb25cf44f8a3");
const base64 = base.rfc4648({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
});
const base64pad = base.rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
});
const base64url = base.rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
});
const base64urlpad = base.rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
exports.base64 = base64;
exports.base64pad = base64pad;
exports.base64url = base64url;
exports.base64urlpad = base64urlpad;

},{"20a9eb25cf44f8a3":"j888T"}],"cSiGJ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("e6238c0263a514ec");
const alphabet = Array.from("\uD83D\uDE80\uD83E\uDE90☄\uD83D\uDEF0\uD83C\uDF0C\uD83C\uDF11\uD83C\uDF12\uD83C\uDF13\uD83C\uDF14\uD83C\uDF15\uD83C\uDF16\uD83C\uDF17\uD83C\uDF18\uD83C\uDF0D\uD83C\uDF0F\uD83C\uDF0E\uD83D\uDC09☀\uD83D\uDCBB\uD83D\uDDA5\uD83D\uDCBE\uD83D\uDCBF\uD83D\uDE02❤\uD83D\uDE0D\uD83E\uDD23\uD83D\uDE0A\uD83D\uDE4F\uD83D\uDC95\uD83D\uDE2D\uD83D\uDE18\uD83D\uDC4D\uD83D\uDE05\uD83D\uDC4F\uD83D\uDE01\uD83D\uDD25\uD83E\uDD70\uD83D\uDC94\uD83D\uDC96\uD83D\uDC99\uD83D\uDE22\uD83E\uDD14\uD83D\uDE06\uD83D\uDE44\uD83D\uDCAA\uD83D\uDE09☺\uD83D\uDC4C\uD83E\uDD17\uD83D\uDC9C\uD83D\uDE14\uD83D\uDE0E\uD83D\uDE07\uD83C\uDF39\uD83E\uDD26\uD83C\uDF89\uD83D\uDC9E✌✨\uD83E\uDD37\uD83D\uDE31\uD83D\uDE0C\uD83C\uDF38\uD83D\uDE4C\uD83D\uDE0B\uD83D\uDC97\uD83D\uDC9A\uD83D\uDE0F\uD83D\uDC9B\uD83D\uDE42\uD83D\uDC93\uD83E\uDD29\uD83D\uDE04\uD83D\uDE00\uD83D\uDDA4\uD83D\uDE03\uD83D\uDCAF\uD83D\uDE48\uD83D\uDC47\uD83C\uDFB6\uD83D\uDE12\uD83E\uDD2D❣\uD83D\uDE1C\uD83D\uDC8B\uD83D\uDC40\uD83D\uDE2A\uD83D\uDE11\uD83D\uDCA5\uD83D\uDE4B\uD83D\uDE1E\uD83D\uDE29\uD83D\uDE21\uD83E\uDD2A\uD83D\uDC4A\uD83E\uDD73\uD83D\uDE25\uD83E\uDD24\uD83D\uDC49\uD83D\uDC83\uD83D\uDE33✋\uD83D\uDE1A\uD83D\uDE1D\uD83D\uDE34\uD83C\uDF1F\uD83D\uDE2C\uD83D\uDE43\uD83C\uDF40\uD83C\uDF37\uD83D\uDE3B\uD83D\uDE13⭐✅\uD83E\uDD7A\uD83C\uDF08\uD83D\uDE08\uD83E\uDD18\uD83D\uDCA6✔\uD83D\uDE23\uD83C\uDFC3\uD83D\uDC90☹\uD83C\uDF8A\uD83D\uDC98\uD83D\uDE20☝\uD83D\uDE15\uD83C\uDF3A\uD83C\uDF82\uD83C\uDF3B\uD83D\uDE10\uD83D\uDD95\uD83D\uDC9D\uD83D\uDE4A\uD83D\uDE39\uD83D\uDDE3\uD83D\uDCAB\uD83D\uDC80\uD83D\uDC51\uD83C\uDFB5\uD83E\uDD1E\uD83D\uDE1B\uD83D\uDD34\uD83D\uDE24\uD83C\uDF3C\uD83D\uDE2B⚽\uD83E\uDD19☕\uD83C\uDFC6\uD83E\uDD2B\uD83D\uDC48\uD83D\uDE2E\uD83D\uDE46\uD83C\uDF7B\uD83C\uDF43\uD83D\uDC36\uD83D\uDC81\uD83D\uDE32\uD83C\uDF3F\uD83E\uDDE1\uD83C\uDF81⚡\uD83C\uDF1E\uD83C\uDF88❌✊\uD83D\uDC4B\uD83D\uDE30\uD83E\uDD28\uD83D\uDE36\uD83E\uDD1D\uD83D\uDEB6\uD83D\uDCB0\uD83C\uDF53\uD83D\uDCA2\uD83E\uDD1F\uD83D\uDE41\uD83D\uDEA8\uD83D\uDCA8\uD83E\uDD2C✈\uD83C\uDF80\uD83C\uDF7A\uD83E\uDD13\uD83D\uDE19\uD83D\uDC9F\uD83C\uDF31\uD83D\uDE16\uD83D\uDC76\uD83E\uDD74▶➡❓\uD83D\uDC8E\uD83D\uDCB8⬇\uD83D\uDE28\uD83C\uDF1A\uD83E\uDD8B\uD83D\uDE37\uD83D\uDD7A⚠\uD83D\uDE45\uD83D\uDE1F\uD83D\uDE35\uD83D\uDC4E\uD83E\uDD32\uD83E\uDD20\uD83E\uDD27\uD83D\uDCCC\uD83D\uDD35\uD83D\uDC85\uD83E\uDDD0\uD83D\uDC3E\uD83C\uDF52\uD83D\uDE17\uD83E\uDD11\uD83C\uDF0A\uD83E\uDD2F\uD83D\uDC37☎\uD83D\uDCA7\uD83D\uDE2F\uD83D\uDC86\uD83D\uDC46\uD83C\uDFA4\uD83D\uDE47\uD83C\uDF51❄\uD83C\uDF34\uD83D\uDCA3\uD83D\uDC38\uD83D\uDC8C\uD83D\uDCCD\uD83E\uDD40\uD83E\uDD22\uD83D\uDC45\uD83D\uDCA1\uD83D\uDCA9\uD83D\uDC50\uD83D\uDCF8\uD83D\uDC7B\uD83E\uDD10\uD83E\uDD2E\uD83C\uDFBC\uD83E\uDD75\uD83D\uDEA9\uD83C\uDF4E\uD83C\uDF4A\uD83D\uDC7C\uD83D\uDC8D\uD83D\uDCE3\uD83E\uDD42");
const alphabetBytesToChars = alphabet.reduce((p, c, i)=>{
    p[i] = c;
    return p;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p, c, i)=>{
    p[c.codePointAt(0)] = i;
    return p;
}, []);
function encode(data) {
    return data.reduce((p, c)=>{
        p += alphabetBytesToChars[c];
        return p;
    }, "");
}
function decode(str) {
    const byts = [];
    for (const char of str){
        const byt = alphabetCharsToBytes[char.codePointAt(0)];
        if (byt === undefined) throw new Error(`Non-base256emoji character: ${char}`);
        byts.push(byt);
    }
    return new Uint8Array(byts);
}
const base256emoji = base.from({
    prefix: "\uD83D\uDE80",
    name: "base256emoji",
    encode,
    decode
});
exports.base256emoji = base256emoji;

},{"e6238c0263a514ec":"j888T"}],"7U0mx":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var hasher = require("87c93fe66805c4b2");
const sha = (name)=>async (data)=>new Uint8Array(await crypto.subtle.digest(name, data));
const sha256 = hasher.from({
    name: "sha2-256",
    code: 18,
    encode: sha("SHA-256")
});
const sha512 = hasher.from({
    name: "sha2-512",
    code: 19,
    encode: sha("SHA-512")
});
exports.sha256 = sha256;
exports.sha512 = sha512;

},{"87c93fe66805c4b2":"lU6YS"}],"lU6YS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var digest = require("c1652a21a595dba0");
const from = ({ name, code, encode })=>new Hasher(name, code, encode);
class Hasher {
    constructor(name, code, encode){
        this.name = name;
        this.code = code;
        this.encode = encode;
    }
    digest(input) {
        if (input instanceof Uint8Array) {
            const result = this.encode(input);
            return result instanceof Uint8Array ? digest.create(this.code, result) : result.then((digest$1)=>digest.create(this.code, digest$1));
        } else throw Error("Unknown type, must be binary type");
    }
}
exports.Hasher = Hasher;
exports.from = from;

},{"c1652a21a595dba0":"9JdI8"}],"9JdI8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytes = require("2b489620e8a505e");
var varint = require("7f2da23f950d1d6e");
const create = (code, digest)=>{
    const size = digest.byteLength;
    const sizeOffset = varint.encodingLength(code);
    const digestOffset = sizeOffset + varint.encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    varint.encodeTo(code, bytes, 0);
    varint.encodeTo(size, bytes, sizeOffset);
    bytes.set(digest, digestOffset);
    return new Digest(code, size, digest, bytes);
};
const decode = (multihash)=>{
    const bytes$1 = bytes.coerce(multihash);
    const [code, sizeOffset] = varint.decode(bytes$1);
    const [size, digestOffset] = varint.decode(bytes$1.subarray(sizeOffset));
    const digest = bytes$1.subarray(sizeOffset + digestOffset);
    if (digest.byteLength !== size) throw new Error("Incorrect length");
    return new Digest(code, size, digest, bytes$1);
};
const equals = (a, b)=>{
    if (a === b) return true;
    else return a.code === b.code && a.size === b.size && bytes.equals(a.bytes, b.bytes);
};
class Digest {
    constructor(code, size, digest, bytes){
        this.code = code;
        this.size = size;
        this.digest = digest;
        this.bytes = bytes;
    }
}
exports.Digest = Digest;
exports.create = create;
exports.decode = decode;
exports.equals = equals;

},{"2b489620e8a505e":"ent0w","7f2da23f950d1d6e":"8P1F2"}],"8P1F2":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var varint$1 = require("49ac8faca326d517");
const decode = (data, offset = 0)=>{
    const code = varint$1.decode(data, offset);
    return [
        code,
        varint$1.decode.bytes
    ];
};
const encodeTo = (int, target, offset = 0)=>{
    varint$1.encode(int, target, offset);
    return target;
};
const encodingLength = (int)=>{
    return varint$1.encodingLength(int);
};
exports.decode = decode;
exports.encodeTo = encodeTo;
exports.encodingLength = encodingLength;

},{"49ac8faca326d517":"lYpdI"}],"lYpdI":[function(require,module,exports) {
"use strict";
var encode_1 = encode;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while(num >= INT){
        out[offset++] = num & 255 | MSB;
        num /= 128;
    }
    while(num & MSBALL){
        out[offset++] = num & 255 | MSB;
        num >>>= 7;
    }
    out[offset] = num | 0;
    encode.bytes = offset - oldOffset + 1;
    return out;
}
var decode = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
        if (counter >= l) {
            read.bytes = 0;
            throw new RangeError("Could not decode varint");
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
        shift += 7;
    }while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
    encode: encode_1,
    decode: decode,
    encodingLength: length
};
var _brrp_varint = varint;
var varint$1 = _brrp_varint;
module.exports = varint$1;

},{}],"bj4ky":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytes = require("31f761986cad8f87");
var digest$1 = require("28f7d5b97a7f9531");
const code = 0;
const name = "identity";
const encode = bytes.coerce;
const digest = (input)=>digest$1.create(code, encode(input));
const identity = {
    code,
    name,
    encode,
    digest
};
exports.identity = identity;

},{"31f761986cad8f87":"ent0w","28f7d5b97a7f9531":"9JdI8"}],"cxcPD":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytes = require("d6ff41dc2ba68cf7");
const name = "raw";
const code = 85;
const encode = (node)=>bytes.coerce(node);
const decode = (data)=>bytes.coerce(data);
exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;

},{"d6ff41dc2ba68cf7":"ent0w"}],"7lUAp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const name = "json";
const code = 512;
const encode = (node)=>textEncoder.encode(JSON.stringify(node));
const decode = (data)=>JSON.parse(textDecoder.decode(data));
exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;

},{}],"3QFUn":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var cid = require("ed6c6fe9a905f417");
var varint = require("e06d36b96b5c2352");
var bytes = require("1d23ed7c351b4be9");
var hasher = require("3a38bf5318adcc6f");
var digest = require("4a8c46149de7f8e2");
exports.CID = cid.CID;
exports.varint = varint;
exports.bytes = bytes;
exports.hasher = hasher;
exports.digest = digest;

},{"ed6c6fe9a905f417":"4uoBU","e06d36b96b5c2352":"8P1F2","1d23ed7c351b4be9":"ent0w","3a38bf5318adcc6f":"lU6YS","4a8c46149de7f8e2":"9JdI8"}],"4uoBU":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var varint = require("dda600cb6dfe2c14");
var digest = require("e60e0cbf7a7b4441");
var base58 = require("c43bfafc5e72478d");
var base32 = require("d760cfaeab93deb3");
var bytes = require("64a08ea414b56326");
class CID {
    constructor(version, code, multihash, bytes){
        this.code = code;
        this.version = version;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = new Map();
        Object.defineProperties(this, {
            byteOffset: hidden,
            byteLength: hidden,
            code: readonly,
            version: readonly,
            multihash: readonly,
            bytes: readonly,
            _baseCache: hidden,
            asCID: hidden
        });
    }
    toV0() {
        switch(this.version){
            case 0:
                return this;
            default:
                {
                    const { code, multihash } = this;
                    if (code !== DAG_PB_CODE) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
                    if (multihash.code !== SHA_256_CODE) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
                    return CID.createV0(multihash);
                }
        }
    }
    toV1() {
        switch(this.version){
            case 0:
                {
                    const { code, digest: digest$1 } = this.multihash;
                    const multihash = digest.create(code, digest$1);
                    return CID.createV1(this.code, multihash);
                }
            case 1:
                return this;
            default:
                throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
    }
    equals(other) {
        return other && this.code === other.code && this.version === other.version && digest.equals(this.multihash, other.multihash);
    }
    toString(base) {
        const { bytes, version, _baseCache } = this;
        switch(version){
            case 0:
                return toStringV0(bytes, _baseCache, base || base58.base58btc.encoder);
            default:
                return toStringV1(bytes, _baseCache, base || base32.base32.encoder);
        }
    }
    toJSON() {
        return {
            code: this.code,
            version: this.version,
            hash: this.multihash.bytes
        };
    }
    get [Symbol.toStringTag]() {
        return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
    }
    static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
    }
    get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
        throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
        if (value instanceof CID) return value;
        else if (value != null && value.asCID === value) {
            const { version, code, multihash, bytes } = value;
            return new CID(version, code, multihash, bytes || encodeCID(version, code, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
            const { version, multihash, code } = value;
            const digest$1 = digest.decode(multihash);
            return CID.create(version, code, digest$1);
        } else return null;
    }
    static create(version, code, digest) {
        if (typeof code !== "number") throw new Error("String codecs are no longer supported");
        switch(version){
            case 0:
                if (code !== DAG_PB_CODE) throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
                else return new CID(version, code, digest, digest.bytes);
            case 1:
                {
                    const bytes = encodeCID(version, code, digest.bytes);
                    return new CID(version, code, digest, bytes);
                }
            default:
                throw new Error("Invalid version");
        }
    }
    static createV0(digest) {
        return CID.create(0, DAG_PB_CODE, digest);
    }
    static createV1(code, digest) {
        return CID.create(1, code, digest);
    }
    static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) throw new Error("Incorrect length");
        return cid;
    }
    static decodeFirst(bytes$1) {
        const specs = CID.inspectBytes(bytes$1);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = bytes.coerce(bytes$1.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) throw new Error("Incorrect length");
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest$1 = new digest.Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest$1) : CID.createV1(specs.codec, digest$1);
        return [
            cid,
            bytes$1.subarray(specs.size)
        ];
    }
    static inspectBytes(initialBytes) {
        let offset = 0;
        const next = ()=>{
            const [i, length] = varint.decode(initialBytes.subarray(offset));
            offset += length;
            return i;
        };
        let version = next();
        let codec = DAG_PB_CODE;
        if (version === 18) {
            version = 0;
            offset = 0;
        } else if (version === 1) codec = next();
        if (version !== 0 && version !== 1) throw new RangeError(`Invalid CID version ${version}`);
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
            version,
            codec,
            multihashCode,
            digestSize,
            multihashSize,
            size
        };
    }
    static parse(source, base) {
        const [prefix, bytes] = parseCIDtoBytes(source, base);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
    }
}
const parseCIDtoBytes = (source, base)=>{
    switch(source[0]){
        case "Q":
            {
                const decoder = base || base58.base58btc;
                return [
                    base58.base58btc.prefix,
                    decoder.decode(`${base58.base58btc.prefix}${source}`)
                ];
            }
        case base58.base58btc.prefix:
            {
                const decoder = base || base58.base58btc;
                return [
                    base58.base58btc.prefix,
                    decoder.decode(source)
                ];
            }
        case base32.base32.prefix:
            {
                const decoder = base || base32.base32;
                return [
                    base32.base32.prefix,
                    decoder.decode(source)
                ];
            }
        default:
            if (base == null) throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
            return [
                source[0],
                base.decode(source)
            ];
    }
};
const toStringV0 = (bytes, cache, base)=>{
    const { prefix } = base;
    if (prefix !== base58.base58btc.prefix) throw Error(`Cannot string encode V0 in ${base.name} encoding`);
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes).slice(1);
        cache.set(prefix, cid);
        return cid;
    } else return cid;
};
const toStringV1 = (bytes, cache, base)=>{
    const { prefix } = base;
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes);
        cache.set(prefix, cid);
        return cid;
    } else return cid;
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version, code, multihash)=>{
    const codeOffset = varint.encodingLength(version);
    const hashOffset = codeOffset + varint.encodingLength(code);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    varint.encodeTo(version, bytes, 0);
    varint.encodeTo(code, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const readonly = {
    writable: false,
    configurable: false,
    enumerable: true
};
const hidden = {
    writable: false,
    enumerable: false,
    configurable: false
};
const version = "0.0.0-dev";
const deprecate = (range, message)=>{
    if (range.test(version)) console.warn(message);
    else throw new Error(message);
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
exports.CID = CID;

},{"dda600cb6dfe2c14":"8P1F2","e60e0cbf7a7b4441":"9JdI8","c43bfafc5e72478d":"9KkrI","d760cfaeab93deb3":"apmz1","64a08ea414b56326":"ent0w"}],"w8mvE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bases = require("e6f7ed57dbbb83e3");
function toString(array, encoding = "utf8") {
    const base = bases[encoding];
    if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
    return base.encoder.encode(array).substring(1);
}
exports.toString = toString;

},{"e6f7ed57dbbb83e3":"ekopG"}],"6tR3H":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var alloc = require("5ecf3f805859c86c");
var asUint8array = require("d29a2106a1bb84dc");
function xor(a, b) {
    if (a.length !== b.length) throw new Error("Inputs should have the same length");
    const result = alloc.allocUnsafe(a.length);
    for(let i = 0; i < a.length; i++)result[i] = a[i] ^ b[i];
    return asUint8array.asUint8Array(result);
}
exports.xor = xor;

},{"5ecf3f805859c86c":"jsZij","d29a2106a1bb84dc":"hN1l1"}],"2pU52":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BrowserInfo", ()=>BrowserInfo);
parcelHelpers.export(exports, "NodeInfo", ()=>NodeInfo);
parcelHelpers.export(exports, "SearchBotDeviceInfo", ()=>SearchBotDeviceInfo);
parcelHelpers.export(exports, "BotInfo", ()=>BotInfo);
parcelHelpers.export(exports, "ReactNativeInfo", ()=>ReactNativeInfo);
parcelHelpers.export(exports, "detect", ()=>detect);
parcelHelpers.export(exports, "browserName", ()=>browserName);
parcelHelpers.export(exports, "parseUserAgent", ()=>parseUserAgent);
parcelHelpers.export(exports, "detectOS", ()=>detectOS);
parcelHelpers.export(exports, "getNodeVersion", ()=>getNodeVersion);
var process = require("333d4e2381a056a9");
var __spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = /** @class */ function() {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = "browser";
    }
    return BrowserInfo;
}();
var NodeInfo = /** @class */ function() {
    function NodeInfo(version) {
        this.version = version;
        this.type = "node";
        this.name = "node";
        this.os = process.platform;
    }
    return NodeInfo;
}();
var SearchBotDeviceInfo = /** @class */ function() {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = "bot-device";
    }
    return SearchBotDeviceInfo;
}();
var BotInfo = /** @class */ function() {
    function BotInfo() {
        this.type = "bot";
        this.bot = true; // NOTE: deprecated test name instead
        this.name = "bot";
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}();
var ReactNativeInfo = /** @class */ function() {
    function ReactNativeInfo() {
        this.type = "react-native";
        this.name = "react-native";
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}();
// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    [
        "aol",
        /AOLShield\/([0-9\._]+)/
    ],
    [
        "edge",
        /Edge\/([0-9\._]+)/
    ],
    [
        "edge-ios",
        /EdgiOS\/([0-9\._]+)/
    ],
    [
        "yandexbrowser",
        /YaBrowser\/([0-9\._]+)/
    ],
    [
        "kakaotalk",
        /KAKAOTALK\s([0-9\.]+)/
    ],
    [
        "samsung",
        /SamsungBrowser\/([0-9\.]+)/
    ],
    [
        "silk",
        /\bSilk\/([0-9._-]+)\b/
    ],
    [
        "miui",
        /MiuiBrowser\/([0-9\.]+)$/
    ],
    [
        "beaker",
        /BeakerBrowser\/([0-9\.]+)/
    ],
    [
        "edge-chromium",
        /EdgA?\/([0-9\.]+)/
    ],
    [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "chrome",
        /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "phantomjs",
        /PhantomJS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "crios",
        /CriOS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "firefox",
        /Firefox\/([0-9\.]+)(?:\s|$)/
    ],
    [
        "fxios",
        /FxiOS\/([0-9\.]+)/
    ],
    [
        "opera-mini",
        /Opera Mini.*Version\/([0-9\.]+)/
    ],
    [
        "opera",
        /Opera\/([0-9\.]+)(?:\s|$)/
    ],
    [
        "opera",
        /OPR\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "pie",
        /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/
    ],
    [
        "pie",
        /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/
    ],
    [
        "netfront",
        /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/
    ],
    [
        "ie",
        /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/
    ],
    [
        "ie",
        /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/
    ],
    [
        "ie",
        /MSIE\s(7\.0)/
    ],
    [
        "bb10",
        /BB10;\sTouch.*Version\/([0-9\.]+)/
    ],
    [
        "android",
        /Android\s([0-9\.]+)/
    ],
    [
        "ios",
        /Version\/([0-9\._]+).*Mobile.*Safari.*/
    ],
    [
        "safari",
        /Version\/([0-9\._]+).*Safari/
    ],
    [
        "facebook",
        /FB[AS]V\/([0-9\.]+)/
    ],
    [
        "instagram",
        /Instagram\s([0-9\.]+)/
    ],
    [
        "ios-webview",
        /AppleWebKit\/([0-9\.]+).*Mobile/
    ],
    [
        "ios-webview",
        /AppleWebKit\/([0-9\.]+).*Gecko\)$/
    ],
    [
        "curl",
        /^curl\/([0-9\.]+)$/
    ],
    [
        "searchbot",
        SEARCHBOX_UA_REGEX
    ]
];
var operatingSystemRules = [
    [
        "iOS",
        /iP(hone|od|ad)/
    ],
    [
        "Android OS",
        /Android/
    ],
    [
        "BlackBerry OS",
        /BlackBerry|BB10/
    ],
    [
        "Windows Mobile",
        /IEMobile/
    ],
    [
        "Amazon OS",
        /Kindle/
    ],
    [
        "Windows 3.11",
        /Win16/
    ],
    [
        "Windows 95",
        /(Windows 95)|(Win95)|(Windows_95)/
    ],
    [
        "Windows 98",
        /(Windows 98)|(Win98)/
    ],
    [
        "Windows 2000",
        /(Windows NT 5.0)|(Windows 2000)/
    ],
    [
        "Windows XP",
        /(Windows NT 5.1)|(Windows XP)/
    ],
    [
        "Windows Server 2003",
        /(Windows NT 5.2)/
    ],
    [
        "Windows Vista",
        /(Windows NT 6.0)/
    ],
    [
        "Windows 7",
        /(Windows NT 6.1)/
    ],
    [
        "Windows 8",
        /(Windows NT 6.2)/
    ],
    [
        "Windows 8.1",
        /(Windows NT 6.3)/
    ],
    [
        "Windows 10",
        /(Windows NT 10.0)/
    ],
    [
        "Windows ME",
        /Windows ME/
    ],
    [
        "Windows CE",
        /Windows CE|WinCE|Microsoft Pocket Internet Explorer/
    ],
    [
        "Open BSD",
        /OpenBSD/
    ],
    [
        "Sun OS",
        /SunOS/
    ],
    [
        "Chrome OS",
        /CrOS/
    ],
    [
        "Linux",
        /(Linux)|(X11)/
    ],
    [
        "Mac OS",
        /(Mac_PowerPC)|(Macintosh)/
    ],
    [
        "QNX",
        /QNX/
    ],
    [
        "BeOS",
        /BeOS/
    ],
    [
        "OS/2",
        /OS\/2/
    ]
];
function detect(userAgent) {
    if (!!userAgent) return parseUserAgent(userAgent);
    if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") return new ReactNativeInfo();
    if (typeof navigator !== "undefined") return parseUserAgent(navigator.userAgent);
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return ua !== "" && userAgentRules.reduce(function(matched, _a) {
        var browser = _a[0], regex = _a[1];
        if (matched) return matched;
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [
            browser,
            uaMatch
        ];
    }, false);
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) return null;
    var name = matchedRule[0], match = matchedRule[1];
    if (name === "searchbot") return new BotInfo();
    // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
    var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    } else versionParts = [];
    var version = versionParts.join(".");
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for(var ii = 0, count = operatingSystemRules.length; ii < count; ii++){
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) return os;
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof process !== "undefined" && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for(var ii = 0; ii < count; ii++)output.push("0");
    return output;
}

},{"333d4e2381a056a9":"d5jf4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2hzsP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("8d7ccc892a7089ef");
tslib_1.__exportStar(require("37893644bffdd5dd"), exports);
tslib_1.__exportStar(require("bf4f5982eaec796c"), exports);
tslib_1.__exportStar(require("599d3c63fd46295e"), exports);
tslib_1.__exportStar(require("589a6c864f5c929"), exports);

},{"8d7ccc892a7089ef":"lRdW5","37893644bffdd5dd":"llJJV","bf4f5982eaec796c":"fK9IB","599d3c63fd46295e":"cLyNr","589a6c864f5c929":"haD5H"}],"lRdW5":[function(require,module,exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends);
parcelHelpers.export(exports, "__assign", ()=>__assign);
parcelHelpers.export(exports, "__rest", ()=>__rest);
parcelHelpers.export(exports, "__decorate", ()=>__decorate);
parcelHelpers.export(exports, "__param", ()=>__param);
parcelHelpers.export(exports, "__metadata", ()=>__metadata);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter);
parcelHelpers.export(exports, "__generator", ()=>__generator);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar);
parcelHelpers.export(exports, "__values", ()=>__values);
parcelHelpers.export(exports, "__read", ()=>__read);
parcelHelpers.export(exports, "__spread", ()=>__spread);
parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays);
parcelHelpers.export(exports, "__await", ()=>__await);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject);
parcelHelpers.export(exports, "__importStar", ()=>__importStar);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    privateMap.set(receiver, value);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"llJJV":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("7f4b0b7c0d74932e");
tslib_1.__exportStar(require("1ec7a14abdc96efe"), exports);
tslib_1.__exportStar(require("616c43863b4df23a"), exports);

},{"7f4b0b7c0d74932e":"lRdW5","1ec7a14abdc96efe":"h9MW7","616c43863b4df23a":"g6oQy"}],"h9MW7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = void 0;
function delay(timeout) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true);
        }, timeout);
    });
}
exports.delay = delay;

},{}],"g6oQy":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromMiliseconds = exports.toMiliseconds = void 0;
const constants_1 = require("1bcd6aa3bc332d85");
function toMiliseconds(seconds) {
    return seconds * constants_1.ONE_THOUSAND;
}
exports.toMiliseconds = toMiliseconds;
function fromMiliseconds(miliseconds) {
    return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
}
exports.fromMiliseconds = fromMiliseconds;

},{"1bcd6aa3bc332d85":"haD5H"}],"haD5H":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("327c60ac9bcd2478");
tslib_1.__exportStar(require("89739510288b8b8c"), exports);
tslib_1.__exportStar(require("58d566376ee0f0bb"), exports);

},{"327c60ac9bcd2478":"lRdW5","89739510288b8b8c":"duIKl","58d566376ee0f0bb":"iENbz"}],"duIKl":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
exports.ONE_HUNDRED = 100;
exports.ONE_THOUSAND = 1000;

},{}],"iENbz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
exports.ONE_SECOND = 1;
exports.FIVE_SECONDS = 5;
exports.TEN_SECONDS = 10;
exports.THIRTY_SECONDS = 30;
exports.SIXTY_SECONDS = 60;
exports.ONE_MINUTE = exports.SIXTY_SECONDS;
exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
exports.ONE_HOUR = exports.SIXTY_MINUTES;
exports.THREE_HOURS = exports.ONE_HOUR * 3;
exports.SIX_HOURS = exports.ONE_HOUR * 6;
exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
exports.THREE_DAYS = exports.ONE_DAY * 3;
exports.FIVE_DAYS = exports.ONE_DAY * 5;
exports.SEVEN_DAYS = exports.ONE_DAY * 7;
exports.THIRTY_DAYS = exports.ONE_DAY * 30;
exports.ONE_WEEK = exports.SEVEN_DAYS;
exports.TWO_WEEKS = exports.ONE_WEEK * 2;
exports.THREE_WEEKS = exports.ONE_WEEK * 3;
exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
exports.ONE_YEAR = exports.ONE_DAY * 365;

},{}],"fK9IB":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Watch = void 0;
class Watch {
    constructor(){
        this.timestamps = new Map();
    }
    start(label) {
        if (this.timestamps.has(label)) throw new Error(`Watch already started for label: ${label}`);
        this.timestamps.set(label, {
            started: Date.now()
        });
    }
    stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") throw new Error(`Watch already stopped for label: ${label}`);
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, {
            started: timestamp.started,
            elapsed
        });
    }
    get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") throw new Error(`No timestamp found for label: ${label}`);
        return timestamp;
    }
    elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
    }
}
exports.Watch = Watch;
exports.default = Watch;

},{}],"cLyNr":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("457184fa7fdc102c");
tslib_1.__exportStar(require("bd221427bf0bd5c3"), exports);

},{"457184fa7fdc102c":"lRdW5","bd221427bf0bd5c3":"hs39c"}],"hs39c":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IWatch = void 0;
class IWatch {
}
exports.IWatch = IWatch;

},{}],"7XcJM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
function getFromWindow(name) {
    let res = undefined;
    if (typeof window !== "undefined" && typeof window[name] !== "undefined") res = window[name];
    return res;
}
exports.getFromWindow = getFromWindow;
function getFromWindowOrThrow(name) {
    const res = getFromWindow(name);
    if (!res) throw new Error(`${name} is not defined in Window`);
    return res;
}
exports.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
    return getFromWindowOrThrow("document");
}
exports.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
    return getFromWindow("document");
}
exports.getDocument = getDocument;
function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator");
}
exports.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
    return getFromWindow("navigator");
}
exports.getNavigator = getNavigator;
function getLocationOrThrow() {
    return getFromWindowOrThrow("location");
}
exports.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
    return getFromWindow("location");
}
exports.getLocation = getLocation;
function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto");
}
exports.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
    return getFromWindow("crypto");
}
exports.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage");
}
exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
    return getFromWindow("localStorage");
}
exports.getLocalStorage = getLocalStorage;

},{}],"ga1jf":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWindowMetadata = void 0;
const window_getters_1 = require("17ee693c665ef3c1");
function getWindowMetadata() {
    let doc;
    let loc;
    try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
    } catch (e) {
        return null;
    }
    function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons = [];
        for(let i = 0; i < links.length; i++){
            const link = links[i];
            const rel = link.getAttribute("rel");
            if (rel) {
                if (rel.toLowerCase().indexOf("icon") > -1) {
                    const href = link.getAttribute("href");
                    if (href) {
                        if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                            let absoluteHref = loc.protocol + "//" + loc.host;
                            if (href.indexOf("/") === 0) absoluteHref += href;
                            else {
                                const path = loc.pathname.split("/");
                                path.pop();
                                const finalPath = path.join("/");
                                absoluteHref += finalPath + "/" + href;
                            }
                            icons.push(absoluteHref);
                        } else if (href.indexOf("//") === 0) {
                            const absoluteUrl = loc.protocol + href;
                            icons.push(absoluteUrl);
                        } else icons.push(href);
                    }
                }
            }
        }
        return icons;
    }
    function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for(let i = 0; i < metaTags.length; i++){
            const tag = metaTags[i];
            const attributes = [
                "itemprop",
                "property",
                "name"
            ].map((target)=>tag.getAttribute(target)).filter((attr)=>{
                if (attr) return args.includes(attr);
                return false;
            });
            if (attributes.length && attributes) {
                const content = tag.getAttribute("content");
                if (content) return content;
            }
        }
        return "";
    }
    function getName() {
        let name = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name) name = doc.title;
        return name;
    }
    function getDescription() {
        const description = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description;
    }
    const name = getName();
    const description = getDescription();
    const url = loc.origin;
    const icons = getIcons();
    const meta = {
        description,
        url,
        icons,
        name
    };
    return meta;
}
exports.getWindowMetadata = getWindowMetadata;

},{"17ee693c665ef3c1":"7XcJM"}],"k40w8":[function(require,module,exports) {
"use strict";
const strictUriEncode = require("58554573f6177552");
const decodeComponent = require("ba17965db0c7aff3");
const splitOnFirst = require("51b8bc47184070a5");
const filterObject = require("5c22cf306a783d1");
const isNullOrUndefined = (value)=>value === null || value === undefined;
const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
function encoderForArrayFormat(options) {
    switch(options.arrayFormat){
        case "index":
            return (key)=>(result, value)=>{
                    const index = result.length;
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        [
                            encode(key, options),
                            "[",
                            index,
                            "]"
                        ].join("")
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            "[",
                            encode(index, options),
                            "]=",
                            encode(value, options)
                        ].join("")
                    ];
                };
        case "bracket":
            return (key)=>(result, value)=>{
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        [
                            encode(key, options),
                            "[]"
                        ].join("")
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            "[]=",
                            encode(value, options)
                        ].join("")
                    ];
                };
        case "colon-list-separator":
            return (key)=>(result, value)=>{
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        [
                            encode(key, options),
                            ":list="
                        ].join("")
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            ":list=",
                            encode(value, options)
                        ].join("")
                    ];
                };
        case "comma":
        case "separator":
        case "bracket-separator":
            {
                const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
                return (key)=>(result, value)=>{
                        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                        // Translate null to an empty string so that it doesn't serialize as 'null'
                        value = value === null ? "" : value;
                        if (result.length === 0) return [
                            [
                                encode(key, options),
                                keyValueSep,
                                encode(value, options)
                            ].join("")
                        ];
                        return [
                            [
                                result,
                                encode(value, options)
                            ].join(options.arrayFormatSeparator)
                        ];
                    };
            }
        default:
            return (key)=>(result, value)=>{
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        encode(key, options)
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            "=",
                            encode(value, options)
                        ].join("")
                    ];
                };
    }
}
function parserForArrayFormat(options) {
    let result;
    switch(options.arrayFormat){
        case "index":
            return (key, value, accumulator)=>{
                result = /\[(\d*)\]$/.exec(key);
                key = key.replace(/\[\d*\]$/, "");
                if (!result) {
                    accumulator[key] = value;
                    return;
                }
                if (accumulator[key] === undefined) accumulator[key] = {};
                accumulator[key][result[1]] = value;
            };
        case "bracket":
            return (key, value, accumulator)=>{
                result = /(\[\])$/.exec(key);
                key = key.replace(/\[\]$/, "");
                if (!result) {
                    accumulator[key] = value;
                    return;
                }
                if (accumulator[key] === undefined) {
                    accumulator[key] = [
                        value
                    ];
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], value);
            };
        case "colon-list-separator":
            return (key, value, accumulator)=>{
                result = /(:list)$/.exec(key);
                key = key.replace(/:list$/, "");
                if (!result) {
                    accumulator[key] = value;
                    return;
                }
                if (accumulator[key] === undefined) {
                    accumulator[key] = [
                        value
                    ];
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], value);
            };
        case "comma":
        case "separator":
            return (key, value, accumulator)=>{
                const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
                const isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
                value = isEncodedArray ? decode(value, options) : value;
                const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item)=>decode(item, options)) : value === null ? value : decode(value, options);
                accumulator[key] = newValue;
            };
        case "bracket-separator":
            return (key, value, accumulator)=>{
                const isArray = /(\[\])$/.test(key);
                key = key.replace(/\[\]$/, "");
                if (!isArray) {
                    accumulator[key] = value ? decode(value, options) : value;
                    return;
                }
                const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item)=>decode(item, options));
                if (accumulator[key] === undefined) {
                    accumulator[key] = arrayValue;
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], arrayValue);
            };
        default:
            return (key, value, accumulator)=>{
                if (accumulator[key] === undefined) {
                    accumulator[key] = value;
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], value);
            };
    }
}
function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) throw new TypeError("arrayFormatSeparator must be single character string");
}
function encode(value, options) {
    if (options.encode) return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    return value;
}
function decode(value, options) {
    if (options.decode) return decodeComponent(value);
    return value;
}
function keysSorter(input) {
    if (Array.isArray(input)) return input.sort();
    if (typeof input === "object") return keysSorter(Object.keys(input)).sort((a, b)=>Number(a) - Number(b)).map((key)=>input[key]);
    return input;
}
function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) input = input.slice(0, hashStart);
    return input;
}
function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) hash = url.slice(hashStart);
    return hash;
}
function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) return "";
    return input.slice(queryStart + 1);
}
function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === "string" && value.trim() !== "") value = Number(value);
    else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) value = value.toLowerCase() === "true";
    return value;
}
function parse(query, options) {
    options = Object.assign({
        decode: true,
        sort: true,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: false,
        parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    // Create an object with no prototype
    const ret = Object.create(null);
    if (typeof query !== "string") return ret;
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) return ret;
    for (const param of query.split("&")){
        if (param === "") continue;
        let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
        // Missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        value = value === undefined ? null : [
            "comma",
            "separator",
            "bracket-separator"
        ].includes(options.arrayFormat) ? value : decode(value, options);
        formatter(decode(key, options), value, ret);
    }
    for (const key of Object.keys(ret)){
        const value = ret[key];
        if (typeof value === "object" && value !== null) for (const k of Object.keys(value))value[k] = parseValue(value[k], options);
        else ret[key] = parseValue(value, options);
    }
    if (options.sort === false) return ret;
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key)=>{
        const value = ret[key];
        if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) // Sort object keys, not values
        result[key] = keysSorter(value);
        else result[key] = value;
        return result;
    }, Object.create(null));
}
exports.extract = extract;
exports.parse = parse;
exports.stringify = (object, options)=>{
    if (!object) return "";
    options = Object.assign({
        encode: true,
        strict: true,
        arrayFormat: "none",
        arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key)=>options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object))if (!shouldFilter(key)) objectCopy[key] = object[key];
    const keys = Object.keys(objectCopy);
    if (options.sort !== false) keys.sort(options.sort);
    return keys.map((key)=>{
        const value = object[key];
        if (value === undefined) return "";
        if (value === null) return encode(key, options);
        if (Array.isArray(value)) {
            if (value.length === 0 && options.arrayFormat === "bracket-separator") return encode(key, options) + "[]";
            return value.reduce(formatter(key), []).join("&");
        }
        return encode(key, options) + "=" + encode(value, options);
    }).filter((x)=>x.length > 0).join("&");
};
exports.parseUrl = (url, options)=>{
    options = Object.assign({
        decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, "#");
    return Object.assign({
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
        fragmentIdentifier: decode(hash, options)
    } : {});
};
exports.stringifyUrl = (object, options)=>{
    options = Object.assign({
        encode: true,
        strict: true,
        [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, {
        sort: false
    });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString = exports.stringify(query, options);
    if (queryString) queryString = `?${queryString}`;
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    return `${url}${queryString}${hash}`;
};
exports.pick = (input, filter, options)=>{
    options = Object.assign({
        parseFragmentIdentifier: true,
        [encodeFragmentIdentifier]: false
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
        url,
        query: filterObject(query, filter),
        fragmentIdentifier
    }, options);
};
exports.exclude = (input, filter, options)=>{
    const exclusionFilter = Array.isArray(filter) ? (key)=>!filter.includes(key) : (key, value)=>!filter(key, value);
    return exports.pick(input, exclusionFilter, options);
};

},{"58554573f6177552":"72Fvn","ba17965db0c7aff3":"1clyr","51b8bc47184070a5":"70WYe","5c22cf306a783d1":"1up0E"}],"72Fvn":[function(require,module,exports) {
"use strict";
module.exports = (str)=>encodeURIComponent(str).replace(/[!'()*]/g, (x)=>`%${x.charCodeAt(0).toString(16).toUpperCase()}`);

},{}],"1clyr":[function(require,module,exports) {
"use strict";
var token = "%[a-f0-9]{2}";
var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
var multiMatcher = new RegExp("(" + token + ")+", "gi");
function decodeComponents(components, split) {
    try {
        // Try to decode the entire string first
        return [
            decodeURIComponent(components.join(""))
        ];
    } catch (err) {
    // Do nothing
    }
    if (components.length === 1) return components;
    split = split || 1;
    // Split the array in 2 parts
    var left = components.slice(0, split);
    var right = components.slice(split);
    return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode(input) {
    try {
        return decodeURIComponent(input);
    } catch (err) {
        var tokens = input.match(singleMatcher) || [];
        for(var i = 1; i < tokens.length; i++){
            input = decodeComponents(tokens, i).join("");
            tokens = input.match(singleMatcher) || [];
        }
        return input;
    }
}
function customDecodeURIComponent(input) {
    // Keep track of all the replacements and prefill the map with the `BOM`
    var replaceMap = {
        "%FE%FF": "��",
        "%FF%FE": "��"
    };
    var match = multiMatcher.exec(input);
    while(match){
        try {
            // Decode as big chunks as possible
            replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
            var result = decode(match[0]);
            if (result !== match[0]) replaceMap[match[0]] = result;
        }
        match = multiMatcher.exec(input);
    }
    // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
    replaceMap["%C2"] = "�";
    var entries = Object.keys(replaceMap);
    for(var i = 0; i < entries.length; i++){
        // Replace all decoded components
        var key = entries[i];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
    }
    return input;
}
module.exports = function(encodedURI) {
    if (typeof encodedURI !== "string") throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
    try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        // Try the built in decoder first
        return decodeURIComponent(encodedURI);
    } catch (err) {
        // Fallback to a more advanced decoder
        return customDecodeURIComponent(encodedURI);
    }
};

},{}],"70WYe":[function(require,module,exports) {
"use strict";
module.exports = (string, separator)=>{
    if (!(typeof string === "string" && typeof separator === "string")) throw new TypeError("Expected the arguments to be of type `string`");
    if (separator === "") return [
        string
    ];
    const separatorIndex = string.indexOf(separator);
    if (separatorIndex === -1) return [
        string
    ];
    return [
        string.slice(0, separatorIndex),
        string.slice(separatorIndex + separator.length)
    ];
};

},{}],"1up0E":[function(require,module,exports) {
"use strict";
module.exports = function(obj, predicate) {
    var ret = {};
    var keys = Object.keys(obj);
    var isArr = Array.isArray(predicate);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var val = obj[key];
        if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) ret[key] = val;
    }
    return ret;
};

},{}],"1SxNf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _parsers = require("./parsers");
parcelHelpers.exportAll(_parsers, exports);
var _jsonrpc = require("./jsonrpc");
parcelHelpers.exportAll(_jsonrpc, exports);
var _validators = require("./validators");
parcelHelpers.exportAll(_validators, exports);

},{"./types":"k3brK","./parsers":"iipfW","./jsonrpc":"jNbf4","./validators":"bbijs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k3brK":[function(require,module,exports) {

},{}],"iipfW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseSubscribeRequest", ()=>parseSubscribeRequest);
parcelHelpers.export(exports, "parsePublishRequest", ()=>parsePublishRequest);
parcelHelpers.export(exports, "parseUnsubscribeRequest", ()=>parseUnsubscribeRequest);
parcelHelpers.export(exports, "parseSubscriptionRequest", ()=>parseSubscriptionRequest);
var _misc = require("./misc");
var _validators = require("./validators");
function parseSubscribeRequest(request) {
    if (!(0, _validators.isSubscribeMethod)(request.method)) throw new Error("JSON-RPC Request has invalid subscribe method");
    if (!(0, _validators.isSubscribeParams)(request.params)) throw new Error("JSON-RPC Request has invalid subscribe params");
    const params = request.params;
    (0, _misc.assertType)(params, "topic");
    return params;
}
function parsePublishRequest(request) {
    if (!(0, _validators.isPublishMethod)(request.method)) throw new Error("JSON-RPC Request has invalid publish method");
    if (!(0, _validators.isPublishParams)(request.params)) throw new Error("JSON-RPC Request has invalid publish params");
    const params = request.params;
    (0, _misc.assertType)(params, "topic");
    (0, _misc.assertType)(params, "message");
    (0, _misc.assertType)(params, "ttl", "number");
    return params;
}
function parseUnsubscribeRequest(request) {
    if (!(0, _validators.isUnsubscribeMethod)(request.method)) throw new Error("JSON-RPC Request has invalid unsubscribe method");
    if (!(0, _validators.isUnsubscribeParams)(request.params)) throw new Error("JSON-RPC Request has invalid unsubscribe params");
    const params = request.params;
    (0, _misc.assertType)(params, "id");
    return params;
}
function parseSubscriptionRequest(request) {
    if (!(0, _validators.isSubscriptionMethod)(request.method)) throw new Error("JSON-RPC Request has invalid subscription method");
    if (!(0, _validators.isSubscriptionParams)(request.params)) throw new Error("JSON-RPC Request has invalid subscription params");
    const params = request.params;
    (0, _misc.assertType)(params, "id");
    (0, _misc.assertType)(params, "data");
    return params;
}

},{"./misc":"jc0TB","./validators":"bbijs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jc0TB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "assertType", ()=>assertType);
parcelHelpers.export(exports, "hasRequiredParams", ()=>hasRequiredParams);
parcelHelpers.export(exports, "hasExactParamsLength", ()=>hasExactParamsLength);
parcelHelpers.export(exports, "hasRequiredParamsLength", ()=>hasRequiredParamsLength);
parcelHelpers.export(exports, "checkParams", ()=>checkParams);
parcelHelpers.export(exports, "methodEndsWith", ()=>methodEndsWith);
function assertType(obj, key, type = "string") {
    if (!obj[key] || typeof obj[key] !== type) throw new Error(`Missing or invalid "${key}" param`);
}
function hasRequiredParams(params, required) {
    let matches = true;
    required.forEach((key)=>{
        const exists = key in params;
        if (!exists) matches = false;
    });
    return matches;
}
function hasExactParamsLength(params, length) {
    return Array.isArray(params) ? params.length === length : Object.keys(params).length === length;
}
function hasRequiredParamsLength(params, minLength) {
    return Array.isArray(params) ? params.length >= minLength : Object.keys(params).length >= minLength;
}
function checkParams(params, required, optional) {
    const exact = !optional.length;
    const matchesLength = exact ? hasExactParamsLength(params, required.length) : hasRequiredParamsLength(params, required.length);
    if (!matchesLength) return false;
    return hasRequiredParams(params, required);
}
function methodEndsWith(method, expected, separator = "_") {
    const split = method.split(separator);
    return split[split.length - 1].trim().toLowerCase() === expected.trim().toLowerCase();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bbijs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isSubscribeRequest", ()=>isSubscribeRequest);
parcelHelpers.export(exports, "isSubscribeMethod", ()=>isSubscribeMethod);
parcelHelpers.export(exports, "isSubscribeParams", ()=>isSubscribeParams);
parcelHelpers.export(exports, "isPublishRequest", ()=>isPublishRequest);
parcelHelpers.export(exports, "isPublishMethod", ()=>isPublishMethod);
parcelHelpers.export(exports, "isPublishParams", ()=>isPublishParams);
parcelHelpers.export(exports, "isUnsubscribeRequest", ()=>isUnsubscribeRequest);
parcelHelpers.export(exports, "isUnsubscribeMethod", ()=>isUnsubscribeMethod);
parcelHelpers.export(exports, "isUnsubscribeParams", ()=>isUnsubscribeParams);
parcelHelpers.export(exports, "isSubscriptionRequest", ()=>isSubscriptionRequest);
parcelHelpers.export(exports, "isSubscriptionMethod", ()=>isSubscriptionMethod);
parcelHelpers.export(exports, "isSubscriptionParams", ()=>isSubscriptionParams);
var _misc = require("./misc");
function isSubscribeRequest(request) {
    return isSubscribeMethod(request.method) && isSubscribeParams(request.params);
}
function isSubscribeMethod(method) {
    return (0, _misc.methodEndsWith)(method, "subscribe");
}
function isSubscribeParams(params) {
    const required = [
        "topic"
    ];
    const optional = [];
    return (0, _misc.checkParams)(params, required, optional);
}
function isPublishRequest(request) {
    return isPublishMethod(request.method) && isPublishParams(request.params);
}
function isPublishMethod(method) {
    return (0, _misc.methodEndsWith)(method, "publish");
}
function isPublishParams(params) {
    const required = [
        "message",
        "topic",
        "ttl"
    ];
    const optional = [
        "prompt",
        "tag"
    ];
    return (0, _misc.checkParams)(params, required, optional);
}
function isUnsubscribeRequest(request) {
    return isUnsubscribeMethod(request.method) && isUnsubscribeParams(request.params);
}
function isUnsubscribeMethod(method) {
    return (0, _misc.methodEndsWith)(method, "unsubscribe");
}
function isUnsubscribeParams(params) {
    const required = [
        "id",
        "topic"
    ];
    const optional = [];
    return (0, _misc.checkParams)(params, required, optional);
}
function isSubscriptionRequest(request) {
    return isSubscriptionMethod(request.method) && isSubscriptionParams(request.params);
}
function isSubscriptionMethod(method) {
    return (0, _misc.methodEndsWith)(method, "subscription");
}
function isSubscriptionParams(params) {
    const required = [
        "id",
        "data"
    ];
    const optional = [];
    return (0, _misc.checkParams)(params, required, optional);
}

},{"./misc":"jc0TB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jNbf4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RELAY_JSONRPC", ()=>RELAY_JSONRPC);
const RELAY_JSONRPC = {
    waku: {
        publish: "waku_publish",
        batchPublish: "waku_batchPublish",
        subscribe: "waku_subscribe",
        batchSubscribe: "waku_batchSubscribe",
        subscription: "waku_subscription",
        unsubscribe: "waku_unsubscribe",
        batchUnsubscribe: "waku_batchUnsubscribe"
    },
    irn: {
        publish: "irn_publish",
        batchPublish: "irn_batchPublish",
        subscribe: "irn_subscribe",
        batchSubscribe: "irn_batchSubscribe",
        subscription: "irn_subscription",
        unsubscribe: "irn_unsubscribe",
        batchUnsubscribe: "irn_batchUnsubscribe"
    },
    iridium: {
        publish: "iridium_publish",
        batchPublish: "iridium_batchPublish",
        subscribe: "iridium_subscribe",
        batchSubscribe: "iridium_batchSubscribe",
        subscription: "iridium_subscription",
        unsubscribe: "iridium_unsubscribe",
        batchUnsubscribe: "iridium_batchUnsubscribe"
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h3ciq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UniversalProvider", ()=>sv);
parcelHelpers.export(exports, "default", ()=>hr);
var _signClient = require("@walletconnect/sign-client");
var _signClientDefault = parcelHelpers.interopDefault(_signClient);
var _utils = require("@walletconnect/utils");
var _logger = require("@walletconnect/logger");
var _jsonrpcHttpConnection = require("@walletconnect/jsonrpc-http-connection");
var _jsonrpcHttpConnectionDefault = parcelHelpers.interopDefault(_jsonrpcHttpConnection);
var _jsonrpcProvider = require("@walletconnect/jsonrpc-provider");
var _events = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events);
var global = arguments[3];
const Pa = "error", Hg = "wss://relay.walletconnect.com", Ng = "wc", $g = "universal_provider", Aa = `${Ng}@2:${$g}:`, Ug = "https://rpc.walletconnect.com/v1", at = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
var pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $i = {
    exports: {}
}; /**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ 
(function(E, u) {
    (function() {
        var i, p = "4.17.21", y = 200, W = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", M = "Expected a function", ft = "Invalid `variable` option passed into `_.template`", Gt = "__lodash_hash_undefined__", lr = 500, At = "__lodash_placeholder__", Ln = 1, Fn = 2, Ct = 4, It = 1, de = 2, vn = 1, ot = 2, Mi = 4, Dn = 8, xt = 16, Hn = 32, Et = 64, Mn = 128, zt = 256, pr = 512, Oa = 30, Ra = "...", ba = 800, Ta = 16, qi = 1, La = 2, Da = 3, ct = 1 / 0, Vn = 9007199254740991, Ha = 17976931348623157e292, ge = 0 / 0, Nn = 4294967295, Na = Nn - 1, $a = Nn >>> 1, Ua = [
            [
                "ary",
                Mn
            ],
            [
                "bind",
                vn
            ],
            [
                "bindKey",
                ot
            ],
            [
                "curry",
                Dn
            ],
            [
                "curryRight",
                xt
            ],
            [
                "flip",
                pr
            ],
            [
                "partial",
                Hn
            ],
            [
                "partialRight",
                Et
            ],
            [
                "rearg",
                zt
            ]
        ], yt = "[object Arguments]", ve = "[object Array]", Wa = "[object AsyncFunction]", Kt = "[object Boolean]", Yt = "[object Date]", Fa = "[object DOMException]", _e = "[object Error]", me = "[object Function]", Bi = "[object GeneratorFunction]", yn = "[object Map]", Zt = "[object Number]", Ma = "[object Null]", qn = "[object Object]", Gi = "[object Promise]", qa = "[object Proxy]", Jt = "[object RegExp]", Sn = "[object Set]", Xt = "[object String]", we = "[object Symbol]", Ba = "[object Undefined]", Qt = "[object WeakMap]", Ga = "[object WeakSet]", Vt = "[object ArrayBuffer]", St = "[object DataView]", dr = "[object Float32Array]", gr = "[object Float64Array]", vr = "[object Int8Array]", _r = "[object Int16Array]", mr = "[object Int32Array]", wr = "[object Uint8Array]", Pr = "[object Uint8ClampedArray]", Ar = "[object Uint16Array]", Cr = "[object Uint32Array]", za = /\b__p \+= '';/g, Ka = /\b(__p \+=) '' \+/g, Ya = /(__e\(.*?\)|\b__t\)) \+\n'';/g, zi = /&(?:amp|lt|gt|quot|#39);/g, Ki = /[&<>"']/g, Za = RegExp(zi.source), Ja = RegExp(Ki.source), Xa = /<%-([\s\S]+?)%>/g, Qa = /<%([\s\S]+?)%>/g, Yi = /<%=([\s\S]+?)%>/g, Va = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ka = /^\w*$/, ja = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ir = /[\\^$.*+?()[\]{}|]/g, nf = RegExp(Ir.source), xr = /^\s+/, tf = /\s/, ef = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, rf = /\{\n\/\* \[wrapped with (.+)\] \*/, sf = /,? & /, uf = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, af = /[()=,{}\[\]\/\s]/, ff = /\\(\\)?/g, of = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Zi = /\w*$/, cf = /^[-+]0x[0-9a-f]+$/i, hf = /^0b[01]+$/i, lf = /^\[object .+?Constructor\]$/, pf = /^0o[0-7]+$/i, df = /^(?:0|[1-9]\d*)$/, gf = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Pe = /($^)/, vf = /['\n\r\u2028\u2029\\]/g, Ae = "\ud800-\udfff", _f = "\\u0300-\\u036f", mf = "\\ufe20-\\ufe2f", wf = "\\u20d0-\\u20ff", Ji = _f + mf + wf, Xi = "\\u2700-\\u27bf", Qi = "a-z\\xdf-\\xf6\\xf8-\\xff", Pf = "\\xac\\xb1\\xd7\\xf7", Af = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Cf = "\\u2000-\\u206f", If = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Vi = "A-Z\\xc0-\\xd6\\xd8-\\xde", ki = "\\ufe0e\\ufe0f", ji = Pf + Af + Cf + If, Er = "['’]", xf = "[" + Ae + "]", ns = "[" + ji + "]", Ce = "[" + Ji + "]", ts = "\\d+", Ef = "[" + Xi + "]", es = "[" + Qi + "]", rs = "[^" + Ae + ji + ts + Xi + Qi + Vi + "]", yr = "\ud83c[\udffb-\udfff]", yf = "(?:" + Ce + "|" + yr + ")", is = "[^" + Ae + "]", Sr = "(?:\ud83c[\udde6-\uddff]){2}", Or = "[\ud800-\udbff][\udc00-\udfff]", Ot = "[" + Vi + "]", ss = "\\u200d", us = "(?:" + es + "|" + rs + ")", Sf = "(?:" + Ot + "|" + rs + ")", as = "(?:" + Er + "(?:d|ll|m|re|s|t|ve))?", fs = "(?:" + Er + "(?:D|LL|M|RE|S|T|VE))?", os = yf + "?", cs = "[" + ki + "]?", Of = "(?:" + ss + "(?:" + [
            is,
            Sr,
            Or
        ].join("|") + ")" + cs + os + ")*", Rf = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", bf = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", hs = cs + os + Of, Tf = "(?:" + [
            Ef,
            Sr,
            Or
        ].join("|") + ")" + hs, Lf = "(?:" + [
            is + Ce + "?",
            Ce,
            Sr,
            Or,
            xf
        ].join("|") + ")", Df = RegExp(Er, "g"), Hf = RegExp(Ce, "g"), Rr = RegExp(yr + "(?=" + yr + ")|" + Lf + hs, "g"), Nf = RegExp([
            Ot + "?" + es + "+" + as + "(?=" + [
                ns,
                Ot,
                "$"
            ].join("|") + ")",
            Sf + "+" + fs + "(?=" + [
                ns,
                Ot + us,
                "$"
            ].join("|") + ")",
            Ot + "?" + us + "+" + as,
            Ot + "+" + fs,
            bf,
            Rf,
            ts,
            Tf
        ].join("|"), "g"), $f = RegExp("[" + ss + Ae + Ji + ki + "]"), Uf = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Wf = [
            "Array",
            "Buffer",
            "DataView",
            "Date",
            "Error",
            "Float32Array",
            "Float64Array",
            "Function",
            "Int8Array",
            "Int16Array",
            "Int32Array",
            "Map",
            "Math",
            "Object",
            "Promise",
            "RegExp",
            "Set",
            "String",
            "Symbol",
            "TypeError",
            "Uint8Array",
            "Uint8ClampedArray",
            "Uint16Array",
            "Uint32Array",
            "WeakMap",
            "_",
            "clearTimeout",
            "isFinite",
            "parseInt",
            "setTimeout"
        ], Ff = -1, B = {};
        B[dr] = B[gr] = B[vr] = B[_r] = B[mr] = B[wr] = B[Pr] = B[Ar] = B[Cr] = !0, B[yt] = B[ve] = B[Vt] = B[Kt] = B[St] = B[Yt] = B[_e] = B[me] = B[yn] = B[Zt] = B[qn] = B[Jt] = B[Sn] = B[Xt] = B[Qt] = !1;
        var q = {};
        q[yt] = q[ve] = q[Vt] = q[St] = q[Kt] = q[Yt] = q[dr] = q[gr] = q[vr] = q[_r] = q[mr] = q[yn] = q[Zt] = q[qn] = q[Jt] = q[Sn] = q[Xt] = q[we] = q[wr] = q[Pr] = q[Ar] = q[Cr] = !0, q[_e] = q[me] = q[Qt] = !1;
        var Mf = {
            À: "A",
            Á: "A",
            Â: "A",
            Ã: "A",
            Ä: "A",
            Å: "A",
            à: "a",
            á: "a",
            â: "a",
            ã: "a",
            ä: "a",
            å: "a",
            Ç: "C",
            ç: "c",
            Ð: "D",
            ð: "d",
            È: "E",
            É: "E",
            Ê: "E",
            Ë: "E",
            è: "e",
            é: "e",
            ê: "e",
            ë: "e",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ï: "I",
            ì: "i",
            í: "i",
            î: "i",
            ï: "i",
            Ñ: "N",
            ñ: "n",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Õ: "O",
            Ö: "O",
            Ø: "O",
            ò: "o",
            ó: "o",
            ô: "o",
            õ: "o",
            ö: "o",
            ø: "o",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ü: "U",
            ù: "u",
            ú: "u",
            û: "u",
            ü: "u",
            Ý: "Y",
            ý: "y",
            ÿ: "y",
            Æ: "Ae",
            æ: "ae",
            Þ: "Th",
            þ: "th",
            ß: "ss",
            Ā: "A",
            Ă: "A",
            Ą: "A",
            ā: "a",
            ă: "a",
            ą: "a",
            Ć: "C",
            Ĉ: "C",
            Ċ: "C",
            Č: "C",
            ć: "c",
            ĉ: "c",
            ċ: "c",
            č: "c",
            Ď: "D",
            Đ: "D",
            ď: "d",
            đ: "d",
            Ē: "E",
            Ĕ: "E",
            Ė: "E",
            Ę: "E",
            Ě: "E",
            ē: "e",
            ĕ: "e",
            ė: "e",
            ę: "e",
            ě: "e",
            Ĝ: "G",
            Ğ: "G",
            Ġ: "G",
            Ģ: "G",
            ĝ: "g",
            ğ: "g",
            ġ: "g",
            ģ: "g",
            Ĥ: "H",
            Ħ: "H",
            ĥ: "h",
            ħ: "h",
            Ĩ: "I",
            Ī: "I",
            Ĭ: "I",
            Į: "I",
            İ: "I",
            ĩ: "i",
            ī: "i",
            ĭ: "i",
            į: "i",
            ı: "i",
            Ĵ: "J",
            ĵ: "j",
            Ķ: "K",
            ķ: "k",
            ĸ: "k",
            Ĺ: "L",
            Ļ: "L",
            Ľ: "L",
            Ŀ: "L",
            Ł: "L",
            ĺ: "l",
            ļ: "l",
            ľ: "l",
            ŀ: "l",
            ł: "l",
            Ń: "N",
            Ņ: "N",
            Ň: "N",
            Ŋ: "N",
            ń: "n",
            ņ: "n",
            ň: "n",
            ŋ: "n",
            Ō: "O",
            Ŏ: "O",
            Ő: "O",
            ō: "o",
            ŏ: "o",
            ő: "o",
            Ŕ: "R",
            Ŗ: "R",
            Ř: "R",
            ŕ: "r",
            ŗ: "r",
            ř: "r",
            Ś: "S",
            Ŝ: "S",
            Ş: "S",
            Š: "S",
            ś: "s",
            ŝ: "s",
            ş: "s",
            š: "s",
            Ţ: "T",
            Ť: "T",
            Ŧ: "T",
            ţ: "t",
            ť: "t",
            ŧ: "t",
            Ũ: "U",
            Ū: "U",
            Ŭ: "U",
            Ů: "U",
            Ű: "U",
            Ų: "U",
            ũ: "u",
            ū: "u",
            ŭ: "u",
            ů: "u",
            ű: "u",
            ų: "u",
            Ŵ: "W",
            ŵ: "w",
            Ŷ: "Y",
            ŷ: "y",
            Ÿ: "Y",
            Ź: "Z",
            Ż: "Z",
            Ž: "Z",
            ź: "z",
            ż: "z",
            ž: "z",
            Ĳ: "IJ",
            ĳ: "ij",
            Œ: "Oe",
            œ: "oe",
            ŉ: "'n",
            ſ: "s"
        }, qf = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }, Bf = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&#39;": "'"
        }, Gf = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, zf = parseFloat, Kf = parseInt, ls = typeof pe == "object" && pe && pe.Object === Object && pe, Yf = typeof self == "object" && self && self.Object === Object && self, k = ls || Yf || Function("return this")(), br = u && !u.nodeType && u, ht = br && !0 && E && !E.nodeType && E, ps = ht && ht.exports === br, Tr = ps && ls.process, _n = function() {
            try {
                var h = ht && ht.require && ht.require("util").types;
                return h || Tr && Tr.binding && Tr.binding("util");
            } catch  {}
        }(), ds = _n && _n.isArrayBuffer, gs = _n && _n.isDate, vs = _n && _n.isMap, _s = _n && _n.isRegExp, ms = _n && _n.isSet, ws = _n && _n.isTypedArray;
        function cn(h, g, d) {
            switch(d.length){
                case 0:
                    return h.call(g);
                case 1:
                    return h.call(g, d[0]);
                case 2:
                    return h.call(g, d[0], d[1]);
                case 3:
                    return h.call(g, d[0], d[1], d[2]);
            }
            return h.apply(g, d);
        }
        function Zf(h, g, d, P) {
            for(var S = -1, N = h == null ? 0 : h.length; ++S < N;){
                var X = h[S];
                g(P, X, d(X), h);
            }
            return P;
        }
        function mn(h, g) {
            for(var d = -1, P = h == null ? 0 : h.length; ++d < P && g(h[d], d, h) !== !1;);
            return h;
        }
        function Jf(h, g) {
            for(var d = h == null ? 0 : h.length; d-- && g(h[d], d, h) !== !1;);
            return h;
        }
        function Ps(h, g) {
            for(var d = -1, P = h == null ? 0 : h.length; ++d < P;)if (!g(h[d], d, h)) return !1;
            return !0;
        }
        function kn(h, g) {
            for(var d = -1, P = h == null ? 0 : h.length, S = 0, N = []; ++d < P;){
                var X = h[d];
                g(X, d, h) && (N[S++] = X);
            }
            return N;
        }
        function Ie(h, g) {
            var d = h == null ? 0 : h.length;
            return !!d && Rt(h, g, 0) > -1;
        }
        function Lr(h, g, d) {
            for(var P = -1, S = h == null ? 0 : h.length; ++P < S;)if (d(g, h[P])) return !0;
            return !1;
        }
        function G(h, g) {
            for(var d = -1, P = h == null ? 0 : h.length, S = Array(P); ++d < P;)S[d] = g(h[d], d, h);
            return S;
        }
        function jn(h, g) {
            for(var d = -1, P = g.length, S = h.length; ++d < P;)h[S + d] = g[d];
            return h;
        }
        function Dr(h, g, d, P) {
            var S = -1, N = h == null ? 0 : h.length;
            for(P && N && (d = h[++S]); ++S < N;)d = g(d, h[S], S, h);
            return d;
        }
        function Xf(h, g, d, P) {
            var S = h == null ? 0 : h.length;
            for(P && S && (d = h[--S]); S--;)d = g(d, h[S], S, h);
            return d;
        }
        function Hr(h, g) {
            for(var d = -1, P = h == null ? 0 : h.length; ++d < P;)if (g(h[d], d, h)) return !0;
            return !1;
        }
        var Qf = Nr("length");
        function Vf(h) {
            return h.split("");
        }
        function kf(h) {
            return h.match(uf) || [];
        }
        function As(h, g, d) {
            var P;
            return d(h, function(S, N, X) {
                if (g(S, N, X)) return P = N, !1;
            }), P;
        }
        function xe(h, g, d, P) {
            for(var S = h.length, N = d + (P ? 1 : -1); P ? N-- : ++N < S;)if (g(h[N], N, h)) return N;
            return -1;
        }
        function Rt(h, g, d) {
            return g === g ? co(h, g, d) : xe(h, Cs, d);
        }
        function jf(h, g, d, P) {
            for(var S = d - 1, N = h.length; ++S < N;)if (P(h[S], g)) return S;
            return -1;
        }
        function Cs(h) {
            return h !== h;
        }
        function Is(h, g) {
            var d = h == null ? 0 : h.length;
            return d ? Ur(h, g) / d : ge;
        }
        function Nr(h) {
            return function(g) {
                return g == null ? i : g[h];
            };
        }
        function $r(h) {
            return function(g) {
                return h == null ? i : h[g];
            };
        }
        function xs(h, g, d, P, S) {
            return S(h, function(N, X, F) {
                d = P ? (P = !1, N) : g(d, N, X, F);
            }), d;
        }
        function no(h, g) {
            var d = h.length;
            for(h.sort(g); d--;)h[d] = h[d].value;
            return h;
        }
        function Ur(h, g) {
            for(var d, P = -1, S = h.length; ++P < S;){
                var N = g(h[P]);
                N !== i && (d = d === i ? N : d + N);
            }
            return d;
        }
        function Wr(h, g) {
            for(var d = -1, P = Array(h); ++d < h;)P[d] = g(d);
            return P;
        }
        function to(h, g) {
            return G(g, function(d) {
                return [
                    d,
                    h[d]
                ];
            });
        }
        function Es(h) {
            return h && h.slice(0, Rs(h) + 1).replace(xr, "");
        }
        function hn(h) {
            return function(g) {
                return h(g);
            };
        }
        function Fr(h, g) {
            return G(g, function(d) {
                return h[d];
            });
        }
        function kt(h, g) {
            return h.has(g);
        }
        function ys(h, g) {
            for(var d = -1, P = h.length; ++d < P && Rt(g, h[d], 0) > -1;);
            return d;
        }
        function Ss(h, g) {
            for(var d = h.length; d-- && Rt(g, h[d], 0) > -1;);
            return d;
        }
        function eo(h, g) {
            for(var d = h.length, P = 0; d--;)h[d] === g && ++P;
            return P;
        }
        var ro = $r(Mf), io = $r(qf);
        function so(h) {
            return "\\" + Gf[h];
        }
        function uo(h, g) {
            return h == null ? i : h[g];
        }
        function bt(h) {
            return $f.test(h);
        }
        function ao(h) {
            return Uf.test(h);
        }
        function fo(h) {
            for(var g, d = []; !(g = h.next()).done;)d.push(g.value);
            return d;
        }
        function Mr(h) {
            var g = -1, d = Array(h.size);
            return h.forEach(function(P, S) {
                d[++g] = [
                    S,
                    P
                ];
            }), d;
        }
        function Os(h, g) {
            return function(d) {
                return h(g(d));
            };
        }
        function nt(h, g) {
            for(var d = -1, P = h.length, S = 0, N = []; ++d < P;){
                var X = h[d];
                (X === g || X === At) && (h[d] = At, N[S++] = d);
            }
            return N;
        }
        function Ee(h) {
            var g = -1, d = Array(h.size);
            return h.forEach(function(P) {
                d[++g] = P;
            }), d;
        }
        function oo(h) {
            var g = -1, d = Array(h.size);
            return h.forEach(function(P) {
                d[++g] = [
                    P,
                    P
                ];
            }), d;
        }
        function co(h, g, d) {
            for(var P = d - 1, S = h.length; ++P < S;)if (h[P] === g) return P;
            return -1;
        }
        function ho(h, g, d) {
            for(var P = d + 1; P--;)if (h[P] === g) return P;
            return P;
        }
        function Tt(h) {
            return bt(h) ? po(h) : Qf(h);
        }
        function On(h) {
            return bt(h) ? go(h) : Vf(h);
        }
        function Rs(h) {
            for(var g = h.length; g-- && tf.test(h.charAt(g)););
            return g;
        }
        var lo = $r(Bf);
        function po(h) {
            for(var g = Rr.lastIndex = 0; Rr.test(h);)++g;
            return g;
        }
        function go(h) {
            return h.match(Rr) || [];
        }
        function vo(h) {
            return h.match(Nf) || [];
        }
        var _o = function h(g) {
            g = g == null ? k : Lt.defaults(k.Object(), g, Lt.pick(k, Wf));
            var d = g.Array, P = g.Date, S = g.Error, N = g.Function, X = g.Math, F = g.Object, qr = g.RegExp, mo = g.String, wn = g.TypeError, ye = d.prototype, wo = N.prototype, Dt = F.prototype, Se = g["__core-js_shared__"], Oe = wo.toString, U = Dt.hasOwnProperty, Po = 0, bs = function() {
                var n = /[^.]+$/.exec(Se && Se.keys && Se.keys.IE_PROTO || "");
                return n ? "Symbol(src)_1." + n : "";
            }(), Re = Dt.toString, Ao = Oe.call(F), Co = k._, Io = qr("^" + Oe.call(U).replace(Ir, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), be = ps ? g.Buffer : i, tt = g.Symbol, Te = g.Uint8Array, Ts = be ? be.allocUnsafe : i, Le = Os(F.getPrototypeOf, F), Ls = F.create, Ds = Dt.propertyIsEnumerable, De = ye.splice, Hs = tt ? tt.isConcatSpreadable : i, jt = tt ? tt.iterator : i, lt = tt ? tt.toStringTag : i, He = function() {
                try {
                    var n = _t(F, "defineProperty");
                    return n({}, "", {}), n;
                } catch  {}
            }(), xo = g.clearTimeout !== k.clearTimeout && g.clearTimeout, Eo = P && P.now !== k.Date.now && P.now, yo = g.setTimeout !== k.setTimeout && g.setTimeout, Ne = X.ceil, $e = X.floor, Br = F.getOwnPropertySymbols, So = be ? be.isBuffer : i, Ns = g.isFinite, Oo = ye.join, Ro = Os(F.keys, F), Q = X.max, nn = X.min, bo = P.now, To = g.parseInt, $s = X.random, Lo = ye.reverse, Gr = _t(g, "DataView"), ne = _t(g, "Map"), zr = _t(g, "Promise"), Ht = _t(g, "Set"), te = _t(g, "WeakMap"), ee = _t(F, "create"), Ue = te && new te, Nt = {}, Do = mt(Gr), Ho = mt(ne), No = mt(zr), $o = mt(Ht), Uo = mt(te), We = tt ? tt.prototype : i, re = We ? We.valueOf : i, Us = We ? We.toString : i;
            function a(n) {
                if (K(n) && !O(n) && !(n instanceof D)) {
                    if (n instanceof Pn) return n;
                    if (U.call(n, "__wrapped__")) return Wu(n);
                }
                return new Pn(n);
            }
            var $t = function() {
                function n() {}
                return function(t) {
                    if (!z(t)) return {};
                    if (Ls) return Ls(t);
                    n.prototype = t;
                    var e = new n;
                    return n.prototype = i, e;
                };
            }();
            function Fe() {}
            function Pn(n, t) {
                this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
            }
            a.templateSettings = {
                escape: Xa,
                evaluate: Qa,
                interpolate: Yi,
                variable: "",
                imports: {
                    _: a
                }
            }, a.prototype = Fe.prototype, a.prototype.constructor = a, Pn.prototype = $t(Fe.prototype), Pn.prototype.constructor = Pn;
            function D(n) {
                this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Nn, this.__views__ = [];
            }
            function Wo() {
                var n = new D(this.__wrapped__);
                return n.__actions__ = un(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = un(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = un(this.__views__), n;
            }
            function Fo() {
                if (this.__filtered__) {
                    var n = new D(this);
                    n.__dir__ = -1, n.__filtered__ = !0;
                } else n = this.clone(), n.__dir__ *= -1;
                return n;
            }
            function Mo() {
                var n = this.__wrapped__.value(), t = this.__dir__, e = O(n), r = t < 0, s = e ? n.length : 0, f = kc(0, s, this.__views__), o = f.start, c = f.end, l = c - o, v = r ? c : o - 1, _ = this.__iteratees__, m = _.length, w = 0, A = nn(l, this.__takeCount__);
                if (!e || !r && s == l && A == l) return au(n, this.__actions__);
                var I = [];
                n: for(; l-- && w < A;){
                    v += t;
                    for(var b = -1, x = n[v]; ++b < m;){
                        var L = _[b], H = L.iteratee, dn = L.type, sn = H(x);
                        if (dn == La) x = sn;
                        else if (!sn) {
                            if (dn == qi) continue n;
                            break n;
                        }
                    }
                    I[w++] = x;
                }
                return I;
            }
            D.prototype = $t(Fe.prototype), D.prototype.constructor = D;
            function pt(n) {
                var t = -1, e = n == null ? 0 : n.length;
                for(this.clear(); ++t < e;){
                    var r = n[t];
                    this.set(r[0], r[1]);
                }
            }
            function qo() {
                this.__data__ = ee ? ee(null) : {}, this.size = 0;
            }
            function Bo(n) {
                var t = this.has(n) && delete this.__data__[n];
                return this.size -= t ? 1 : 0, t;
            }
            function Go(n) {
                var t = this.__data__;
                if (ee) {
                    var e = t[n];
                    return e === Gt ? i : e;
                }
                return U.call(t, n) ? t[n] : i;
            }
            function zo(n) {
                var t = this.__data__;
                return ee ? t[n] !== i : U.call(t, n);
            }
            function Ko(n, t) {
                var e = this.__data__;
                return this.size += this.has(n) ? 0 : 1, e[n] = ee && t === i ? Gt : t, this;
            }
            pt.prototype.clear = qo, pt.prototype.delete = Bo, pt.prototype.get = Go, pt.prototype.has = zo, pt.prototype.set = Ko;
            function Bn(n) {
                var t = -1, e = n == null ? 0 : n.length;
                for(this.clear(); ++t < e;){
                    var r = n[t];
                    this.set(r[0], r[1]);
                }
            }
            function Yo() {
                this.__data__ = [], this.size = 0;
            }
            function Zo(n) {
                var t = this.__data__, e = Me(t, n);
                if (e < 0) return !1;
                var r = t.length - 1;
                return e == r ? t.pop() : De.call(t, e, 1), --this.size, !0;
            }
            function Jo(n) {
                var t = this.__data__, e = Me(t, n);
                return e < 0 ? i : t[e][1];
            }
            function Xo(n) {
                return Me(this.__data__, n) > -1;
            }
            function Qo(n, t) {
                var e = this.__data__, r = Me(e, n);
                return r < 0 ? (++this.size, e.push([
                    n,
                    t
                ])) : e[r][1] = t, this;
            }
            Bn.prototype.clear = Yo, Bn.prototype.delete = Zo, Bn.prototype.get = Jo, Bn.prototype.has = Xo, Bn.prototype.set = Qo;
            function Gn(n) {
                var t = -1, e = n == null ? 0 : n.length;
                for(this.clear(); ++t < e;){
                    var r = n[t];
                    this.set(r[0], r[1]);
                }
            }
            function Vo() {
                this.size = 0, this.__data__ = {
                    hash: new pt,
                    map: new (ne || Bn),
                    string: new pt
                };
            }
            function ko(n) {
                var t = ke(this, n).delete(n);
                return this.size -= t ? 1 : 0, t;
            }
            function jo(n) {
                return ke(this, n).get(n);
            }
            function nc(n) {
                return ke(this, n).has(n);
            }
            function tc(n, t) {
                var e = ke(this, n), r = e.size;
                return e.set(n, t), this.size += e.size == r ? 0 : 1, this;
            }
            Gn.prototype.clear = Vo, Gn.prototype.delete = ko, Gn.prototype.get = jo, Gn.prototype.has = nc, Gn.prototype.set = tc;
            function dt(n) {
                var t = -1, e = n == null ? 0 : n.length;
                for(this.__data__ = new Gn; ++t < e;)this.add(n[t]);
            }
            function ec(n) {
                return this.__data__.set(n, Gt), this;
            }
            function rc(n) {
                return this.__data__.has(n);
            }
            dt.prototype.add = dt.prototype.push = ec, dt.prototype.has = rc;
            function Rn(n) {
                var t = this.__data__ = new Bn(n);
                this.size = t.size;
            }
            function ic() {
                this.__data__ = new Bn, this.size = 0;
            }
            function sc(n) {
                var t = this.__data__, e = t.delete(n);
                return this.size = t.size, e;
            }
            function uc(n) {
                return this.__data__.get(n);
            }
            function ac(n) {
                return this.__data__.has(n);
            }
            function fc(n, t) {
                var e = this.__data__;
                if (e instanceof Bn) {
                    var r = e.__data__;
                    if (!ne || r.length < y - 1) return r.push([
                        n,
                        t
                    ]), this.size = ++e.size, this;
                    e = this.__data__ = new Gn(r);
                }
                return e.set(n, t), this.size = e.size, this;
            }
            Rn.prototype.clear = ic, Rn.prototype.delete = sc, Rn.prototype.get = uc, Rn.prototype.has = ac, Rn.prototype.set = fc;
            function Ws(n, t) {
                var e = O(n), r = !e && wt(n), s = !e && !r && ut(n), f = !e && !r && !s && Mt(n), o = e || r || s || f, c = o ? Wr(n.length, mo) : [], l = c.length;
                for(var v in n)(t || U.call(n, v)) && !(o && (v == "length" || s && (v == "offset" || v == "parent") || f && (v == "buffer" || v == "byteLength" || v == "byteOffset") || Zn(v, l))) && c.push(v);
                return c;
            }
            function Fs(n) {
                var t = n.length;
                return t ? n[ti(0, t - 1)] : i;
            }
            function oc(n, t) {
                return je(un(n), gt(t, 0, n.length));
            }
            function cc(n) {
                return je(un(n));
            }
            function Kr(n, t, e) {
                (e !== i && !bn(n[t], e) || e === i && !(t in n)) && zn(n, t, e);
            }
            function ie(n, t, e) {
                var r = n[t];
                (!(U.call(n, t) && bn(r, e)) || e === i && !(t in n)) && zn(n, t, e);
            }
            function Me(n, t) {
                for(var e = n.length; e--;)if (bn(n[e][0], t)) return e;
                return -1;
            }
            function hc(n, t, e, r) {
                return et(n, function(s, f, o) {
                    t(r, s, e(s), o);
                }), r;
            }
            function Ms(n, t) {
                return n && Un(t, V(t), n);
            }
            function lc(n, t) {
                return n && Un(t, fn(t), n);
            }
            function zn(n, t, e) {
                t == "__proto__" && He ? He(n, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: e,
                    writable: !0
                }) : n[t] = e;
            }
            function Yr(n, t) {
                for(var e = -1, r = t.length, s = d(r), f = n == null; ++e < r;)s[e] = f ? i : yi(n, t[e]);
                return s;
            }
            function gt(n, t, e) {
                return n === n && (e !== i && (n = n <= e ? n : e), t !== i && (n = n >= t ? n : t)), n;
            }
            function An(n, t, e, r, s, f) {
                var o, c = t & Ln, l = t & Fn, v = t & Ct;
                if (e && (o = s ? e(n, r, s, f) : e(n)), o !== i) return o;
                if (!z(n)) return n;
                var _ = O(n);
                if (_) {
                    if (o = nh(n), !c) return un(n, o);
                } else {
                    var m = tn(n), w = m == me || m == Bi;
                    if (ut(n)) return cu(n, c);
                    if (m == qn || m == yt || w && !s) {
                        if (o = l || w ? {} : Ru(n), !c) return l ? Gc(n, lc(o, n)) : Bc(n, Ms(o, n));
                    } else {
                        if (!q[m]) return s ? n : {};
                        o = th(n, m, c);
                    }
                }
                f || (f = new Rn);
                var A = f.get(n);
                if (A) return A;
                f.set(n, o), ia(n) ? n.forEach(function(x) {
                    o.add(An(x, t, e, x, n, f));
                }) : ea(n) && n.forEach(function(x, L) {
                    o.set(L, An(x, t, e, L, n, f));
                });
                var I = v ? l ? li : hi : l ? fn : V, b = _ ? i : I(n);
                return mn(b || n, function(x, L) {
                    b && (L = x, x = n[L]), ie(o, L, An(x, t, e, L, n, f));
                }), o;
            }
            function pc(n) {
                var t = V(n);
                return function(e) {
                    return qs(e, n, t);
                };
            }
            function qs(n, t, e) {
                var r = e.length;
                if (n == null) return !r;
                for(n = F(n); r--;){
                    var s = e[r], f = t[s], o = n[s];
                    if (o === i && !(s in n) || !f(o)) return !1;
                }
                return !0;
            }
            function Bs(n, t, e) {
                if (typeof n != "function") throw new wn(M);
                return he(function() {
                    n.apply(i, e);
                }, t);
            }
            function se(n, t, e, r) {
                var s = -1, f = Ie, o = !0, c = n.length, l = [], v = t.length;
                if (!c) return l;
                e && (t = G(t, hn(e))), r ? (f = Lr, o = !1) : t.length >= y && (f = kt, o = !1, t = new dt(t));
                n: for(; ++s < c;){
                    var _ = n[s], m = e == null ? _ : e(_);
                    if (_ = r || _ !== 0 ? _ : 0, o && m === m) {
                        for(var w = v; w--;)if (t[w] === m) continue n;
                        l.push(_);
                    } else f(t, m, r) || l.push(_);
                }
                return l;
            }
            var et = gu($n), Gs = gu(Jr, !0);
            function dc(n, t) {
                var e = !0;
                return et(n, function(r, s, f) {
                    return e = !!t(r, s, f), e;
                }), e;
            }
            function qe(n, t, e) {
                for(var r = -1, s = n.length; ++r < s;){
                    var f = n[r], o = t(f);
                    if (o != null && (c === i ? o === o && !pn(o) : e(o, c))) var c = o, l = f;
                }
                return l;
            }
            function gc(n, t, e, r) {
                var s = n.length;
                for(e = R(e), e < 0 && (e = -e > s ? 0 : s + e), r = r === i || r > s ? s : R(r), r < 0 && (r += s), r = e > r ? 0 : ua(r); e < r;)n[e++] = t;
                return n;
            }
            function zs(n, t) {
                var e = [];
                return et(n, function(r, s, f) {
                    t(r, s, f) && e.push(r);
                }), e;
            }
            function j(n, t, e, r, s) {
                var f = -1, o = n.length;
                for(e || (e = rh), s || (s = []); ++f < o;){
                    var c = n[f];
                    t > 0 && e(c) ? t > 1 ? j(c, t - 1, e, r, s) : jn(s, c) : r || (s[s.length] = c);
                }
                return s;
            }
            var Zr = vu(), Ks = vu(!0);
            function $n(n, t) {
                return n && Zr(n, t, V);
            }
            function Jr(n, t) {
                return n && Ks(n, t, V);
            }
            function Be(n, t) {
                return kn(t, function(e) {
                    return Jn(n[e]);
                });
            }
            function vt(n, t) {
                t = it(t, n);
                for(var e = 0, r = t.length; n != null && e < r;)n = n[Wn(t[e++])];
                return e && e == r ? n : i;
            }
            function Ys(n, t, e) {
                var r = t(n);
                return O(n) ? r : jn(r, e(n));
            }
            function en(n) {
                return n == null ? n === i ? Ba : Ma : lt && lt in F(n) ? Vc(n) : ch(n);
            }
            function Xr(n, t) {
                return n > t;
            }
            function vc(n, t) {
                return n != null && U.call(n, t);
            }
            function _c(n, t) {
                return n != null && t in F(n);
            }
            function mc(n, t, e) {
                return n >= nn(t, e) && n < Q(t, e);
            }
            function Qr(n, t, e) {
                for(var r = e ? Lr : Ie, s = n[0].length, f = n.length, o = f, c = d(f), l = 1 / 0, v = []; o--;){
                    var _ = n[o];
                    o && t && (_ = G(_, hn(t))), l = nn(_.length, l), c[o] = !e && (t || s >= 120 && _.length >= 120) ? new dt(o && _) : i;
                }
                _ = n[0];
                var m = -1, w = c[0];
                n: for(; ++m < s && v.length < l;){
                    var A = _[m], I = t ? t(A) : A;
                    if (A = e || A !== 0 ? A : 0, !(w ? kt(w, I) : r(v, I, e))) {
                        for(o = f; --o;){
                            var b = c[o];
                            if (!(b ? kt(b, I) : r(n[o], I, e))) continue n;
                        }
                        w && w.push(I), v.push(A);
                    }
                }
                return v;
            }
            function wc(n, t, e, r) {
                return $n(n, function(s, f, o) {
                    t(r, e(s), f, o);
                }), r;
            }
            function ue(n, t, e) {
                t = it(t, n), n = Du(n, t);
                var r = n == null ? n : n[Wn(In(t))];
                return r == null ? i : cn(r, n, e);
            }
            function Zs(n) {
                return K(n) && en(n) == yt;
            }
            function Pc(n) {
                return K(n) && en(n) == Vt;
            }
            function Ac(n) {
                return K(n) && en(n) == Yt;
            }
            function ae(n, t, e, r, s) {
                return n === t ? !0 : n == null || t == null || !K(n) && !K(t) ? n !== n && t !== t : Cc(n, t, e, r, ae, s);
            }
            function Cc(n, t, e, r, s, f) {
                var o = O(n), c = O(t), l = o ? ve : tn(n), v = c ? ve : tn(t);
                l = l == yt ? qn : l, v = v == yt ? qn : v;
                var _ = l == qn, m = v == qn, w = l == v;
                if (w && ut(n)) {
                    if (!ut(t)) return !1;
                    o = !0, _ = !1;
                }
                if (w && !_) return f || (f = new Rn), o || Mt(n) ? yu(n, t, e, r, s, f) : Xc(n, t, l, e, r, s, f);
                if (!(e & It)) {
                    var A = _ && U.call(n, "__wrapped__"), I = m && U.call(t, "__wrapped__");
                    if (A || I) {
                        var b = A ? n.value() : n, x = I ? t.value() : t;
                        return f || (f = new Rn), s(b, x, e, r, f);
                    }
                }
                return w ? (f || (f = new Rn), Qc(n, t, e, r, s, f)) : !1;
            }
            function Ic(n) {
                return K(n) && tn(n) == yn;
            }
            function Vr(n, t, e, r) {
                var s = e.length, f = s, o = !r;
                if (n == null) return !f;
                for(n = F(n); s--;){
                    var c = e[s];
                    if (o && c[2] ? c[1] !== n[c[0]] : !(c[0] in n)) return !1;
                }
                for(; ++s < f;){
                    c = e[s];
                    var l = c[0], v = n[l], _ = c[1];
                    if (o && c[2]) {
                        if (v === i && !(l in n)) return !1;
                    } else {
                        var m = new Rn;
                        if (r) var w = r(v, _, l, n, t, m);
                        if (!(w === i ? ae(_, v, It | de, r, m) : w)) return !1;
                    }
                }
                return !0;
            }
            function Js(n) {
                if (!z(n) || sh(n)) return !1;
                var t = Jn(n) ? Io : lf;
                return t.test(mt(n));
            }
            function xc(n) {
                return K(n) && en(n) == Jt;
            }
            function Ec(n) {
                return K(n) && tn(n) == Sn;
            }
            function yc(n) {
                return K(n) && sr(n.length) && !!B[en(n)];
            }
            function Xs(n) {
                return typeof n == "function" ? n : n == null ? on : typeof n == "object" ? O(n) ? ks(n[0], n[1]) : Vs(n) : _a(n);
            }
            function kr(n) {
                if (!ce(n)) return Ro(n);
                var t = [];
                for(var e in F(n))U.call(n, e) && e != "constructor" && t.push(e);
                return t;
            }
            function Sc(n) {
                if (!z(n)) return oh(n);
                var t = ce(n), e = [];
                for(var r in n)r == "constructor" && (t || !U.call(n, r)) || e.push(r);
                return e;
            }
            function jr(n, t) {
                return n < t;
            }
            function Qs(n, t) {
                var e = -1, r = an(n) ? d(n.length) : [];
                return et(n, function(s, f, o) {
                    r[++e] = t(s, f, o);
                }), r;
            }
            function Vs(n) {
                var t = di(n);
                return t.length == 1 && t[0][2] ? Tu(t[0][0], t[0][1]) : function(e) {
                    return e === n || Vr(e, n, t);
                };
            }
            function ks(n, t) {
                return vi(n) && bu(t) ? Tu(Wn(n), t) : function(e) {
                    var r = yi(e, n);
                    return r === i && r === t ? Si(e, n) : ae(t, r, It | de);
                };
            }
            function Ge(n, t, e, r, s) {
                n !== t && Zr(t, function(f, o) {
                    if (s || (s = new Rn), z(f)) Oc(n, t, o, e, Ge, r, s);
                    else {
                        var c = r ? r(mi(n, o), f, o + "", n, t, s) : i;
                        c === i && (c = f), Kr(n, o, c);
                    }
                }, fn);
            }
            function Oc(n, t, e, r, s, f, o) {
                var c = mi(n, e), l = mi(t, e), v = o.get(l);
                if (v) {
                    Kr(n, e, v);
                    return;
                }
                var _ = f ? f(c, l, e + "", n, t, o) : i, m = _ === i;
                if (m) {
                    var w = O(l), A = !w && ut(l), I = !w && !A && Mt(l);
                    _ = l, w || A || I ? O(c) ? _ = c : Y(c) ? _ = un(c) : A ? (m = !1, _ = cu(l, !0)) : I ? (m = !1, _ = hu(l, !0)) : _ = [] : le(l) || wt(l) ? (_ = c, wt(c) ? _ = aa(c) : (!z(c) || Jn(c)) && (_ = Ru(l))) : m = !1;
                }
                m && (o.set(l, _), s(_, l, r, f, o), o.delete(l)), Kr(n, e, _);
            }
            function js(n, t) {
                var e = n.length;
                if (e) return t += t < 0 ? e : 0, Zn(t, e) ? n[t] : i;
            }
            function nu(n, t, e) {
                t.length ? t = G(t, function(f) {
                    return O(f) ? function(o) {
                        return vt(o, f.length === 1 ? f[0] : f);
                    } : f;
                }) : t = [
                    on
                ];
                var r = -1;
                t = G(t, hn(C()));
                var s = Qs(n, function(f, o, c) {
                    var l = G(t, function(v) {
                        return v(f);
                    });
                    return {
                        criteria: l,
                        index: ++r,
                        value: f
                    };
                });
                return no(s, function(f, o) {
                    return qc(f, o, e);
                });
            }
            function Rc(n, t) {
                return tu(n, t, function(e, r) {
                    return Si(n, r);
                });
            }
            function tu(n, t, e) {
                for(var r = -1, s = t.length, f = {}; ++r < s;){
                    var o = t[r], c = vt(n, o);
                    e(c, o) && fe(f, it(o, n), c);
                }
                return f;
            }
            function bc(n) {
                return function(t) {
                    return vt(t, n);
                };
            }
            function ni(n, t, e, r) {
                var s = r ? jf : Rt, f = -1, o = t.length, c = n;
                for(n === t && (t = un(t)), e && (c = G(n, hn(e))); ++f < o;)for(var l = 0, v = t[f], _ = e ? e(v) : v; (l = s(c, _, l, r)) > -1;)c !== n && De.call(c, l, 1), De.call(n, l, 1);
                return n;
            }
            function eu(n, t) {
                for(var e = n ? t.length : 0, r = e - 1; e--;){
                    var s = t[e];
                    if (e == r || s !== f) {
                        var f = s;
                        Zn(s) ? De.call(n, s, 1) : ii(n, s);
                    }
                }
                return n;
            }
            function ti(n, t) {
                return n + $e($s() * (t - n + 1));
            }
            function Tc(n, t, e, r) {
                for(var s = -1, f = Q(Ne((t - n) / (e || 1)), 0), o = d(f); f--;)o[r ? f : ++s] = n, n += e;
                return o;
            }
            function ei(n, t) {
                var e = "";
                if (!n || t < 1 || t > Vn) return e;
                do t % 2 && (e += n), t = $e(t / 2), t && (n += n);
                while (t);
                return e;
            }
            function T(n, t) {
                return wi(Lu(n, t, on), n + "");
            }
            function Lc(n) {
                return Fs(qt(n));
            }
            function Dc(n, t) {
                var e = qt(n);
                return je(e, gt(t, 0, e.length));
            }
            function fe(n, t, e, r) {
                if (!z(n)) return n;
                t = it(t, n);
                for(var s = -1, f = t.length, o = f - 1, c = n; c != null && ++s < f;){
                    var l = Wn(t[s]), v = e;
                    if (l === "__proto__" || l === "constructor" || l === "prototype") return n;
                    if (s != o) {
                        var _ = c[l];
                        v = r ? r(_, l, c) : i, v === i && (v = z(_) ? _ : Zn(t[s + 1]) ? [] : {});
                    }
                    ie(c, l, v), c = c[l];
                }
                return n;
            }
            var ru = Ue ? function(n, t) {
                return Ue.set(n, t), n;
            } : on, Hc = He ? function(n, t) {
                return He(n, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: Ri(t),
                    writable: !0
                });
            } : on;
            function Nc(n) {
                return je(qt(n));
            }
            function Cn(n, t, e) {
                var r = -1, s = n.length;
                t < 0 && (t = -t > s ? 0 : s + t), e = e > s ? s : e, e < 0 && (e += s), s = t > e ? 0 : e - t >>> 0, t >>>= 0;
                for(var f = d(s); ++r < s;)f[r] = n[r + t];
                return f;
            }
            function $c(n, t) {
                var e;
                return et(n, function(r, s, f) {
                    return e = t(r, s, f), !e;
                }), !!e;
            }
            function ze(n, t, e) {
                var r = 0, s = n == null ? r : n.length;
                if (typeof t == "number" && t === t && s <= $a) {
                    for(; r < s;){
                        var f = r + s >>> 1, o = n[f];
                        o !== null && !pn(o) && (e ? o <= t : o < t) ? r = f + 1 : s = f;
                    }
                    return s;
                }
                return ri(n, t, on, e);
            }
            function ri(n, t, e, r) {
                var s = 0, f = n == null ? 0 : n.length;
                if (f === 0) return 0;
                t = e(t);
                for(var o = t !== t, c = t === null, l = pn(t), v = t === i; s < f;){
                    var _ = $e((s + f) / 2), m = e(n[_]), w = m !== i, A = m === null, I = m === m, b = pn(m);
                    if (o) var x = r || I;
                    else v ? x = I && (r || w) : c ? x = I && w && (r || !A) : l ? x = I && w && !A && (r || !b) : A || b ? x = !1 : x = r ? m <= t : m < t;
                    x ? s = _ + 1 : f = _;
                }
                return nn(f, Na);
            }
            function iu(n, t) {
                for(var e = -1, r = n.length, s = 0, f = []; ++e < r;){
                    var o = n[e], c = t ? t(o) : o;
                    if (!e || !bn(c, l)) {
                        var l = c;
                        f[s++] = o === 0 ? 0 : o;
                    }
                }
                return f;
            }
            function su(n) {
                return typeof n == "number" ? n : pn(n) ? ge : +n;
            }
            function ln(n) {
                if (typeof n == "string") return n;
                if (O(n)) return G(n, ln) + "";
                if (pn(n)) return Us ? Us.call(n) : "";
                var t = n + "";
                return t == "0" && 1 / n == -ct ? "-0" : t;
            }
            function rt(n, t, e) {
                var r = -1, s = Ie, f = n.length, o = !0, c = [], l = c;
                if (e) o = !1, s = Lr;
                else if (f >= y) {
                    var v = t ? null : Zc(n);
                    if (v) return Ee(v);
                    o = !1, s = kt, l = new dt;
                } else l = t ? [] : c;
                n: for(; ++r < f;){
                    var _ = n[r], m = t ? t(_) : _;
                    if (_ = e || _ !== 0 ? _ : 0, o && m === m) {
                        for(var w = l.length; w--;)if (l[w] === m) continue n;
                        t && l.push(m), c.push(_);
                    } else s(l, m, e) || (l !== c && l.push(m), c.push(_));
                }
                return c;
            }
            function ii(n, t) {
                return t = it(t, n), n = Du(n, t), n == null || delete n[Wn(In(t))];
            }
            function uu(n, t, e, r) {
                return fe(n, t, e(vt(n, t)), r);
            }
            function Ke(n, t, e, r) {
                for(var s = n.length, f = r ? s : -1; (r ? f-- : ++f < s) && t(n[f], f, n););
                return e ? Cn(n, r ? 0 : f, r ? f + 1 : s) : Cn(n, r ? f + 1 : 0, r ? s : f);
            }
            function au(n, t) {
                var e = n;
                return e instanceof D && (e = e.value()), Dr(t, function(r, s) {
                    return s.func.apply(s.thisArg, jn([
                        r
                    ], s.args));
                }, e);
            }
            function si(n, t, e) {
                var r = n.length;
                if (r < 2) return r ? rt(n[0]) : [];
                for(var s = -1, f = d(r); ++s < r;)for(var o = n[s], c = -1; ++c < r;)c != s && (f[s] = se(f[s] || o, n[c], t, e));
                return rt(j(f, 1), t, e);
            }
            function fu(n, t, e) {
                for(var r = -1, s = n.length, f = t.length, o = {}; ++r < s;){
                    var c = r < f ? t[r] : i;
                    e(o, n[r], c);
                }
                return o;
            }
            function ui(n) {
                return Y(n) ? n : [];
            }
            function ai(n) {
                return typeof n == "function" ? n : on;
            }
            function it(n, t) {
                return O(n) ? n : vi(n, t) ? [
                    n
                ] : Uu($(n));
            }
            var Uc = T;
            function st(n, t, e) {
                var r = n.length;
                return e = e === i ? r : e, !t && e >= r ? n : Cn(n, t, e);
            }
            var ou = xo || function(n) {
                return k.clearTimeout(n);
            };
            function cu(n, t) {
                if (t) return n.slice();
                var e = n.length, r = Ts ? Ts(e) : new n.constructor(e);
                return n.copy(r), r;
            }
            function fi(n) {
                var t = new n.constructor(n.byteLength);
                return new Te(t).set(new Te(n)), t;
            }
            function Wc(n, t) {
                var e = t ? fi(n.buffer) : n.buffer;
                return new n.constructor(e, n.byteOffset, n.byteLength);
            }
            function Fc(n) {
                var t = new n.constructor(n.source, Zi.exec(n));
                return t.lastIndex = n.lastIndex, t;
            }
            function Mc(n) {
                return re ? F(re.call(n)) : {};
            }
            function hu(n, t) {
                var e = t ? fi(n.buffer) : n.buffer;
                return new n.constructor(e, n.byteOffset, n.length);
            }
            function lu(n, t) {
                if (n !== t) {
                    var e = n !== i, r = n === null, s = n === n, f = pn(n), o = t !== i, c = t === null, l = t === t, v = pn(t);
                    if (!c && !v && !f && n > t || f && o && l && !c && !v || r && o && l || !e && l || !s) return 1;
                    if (!r && !f && !v && n < t || v && e && s && !r && !f || c && e && s || !o && s || !l) return -1;
                }
                return 0;
            }
            function qc(n, t, e) {
                for(var r = -1, s = n.criteria, f = t.criteria, o = s.length, c = e.length; ++r < o;){
                    var l = lu(s[r], f[r]);
                    if (l) {
                        if (r >= c) return l;
                        var v = e[r];
                        return l * (v == "desc" ? -1 : 1);
                    }
                }
                return n.index - t.index;
            }
            function pu(n, t, e, r) {
                for(var s = -1, f = n.length, o = e.length, c = -1, l = t.length, v = Q(f - o, 0), _ = d(l + v), m = !r; ++c < l;)_[c] = t[c];
                for(; ++s < o;)(m || s < f) && (_[e[s]] = n[s]);
                for(; v--;)_[c++] = n[s++];
                return _;
            }
            function du(n, t, e, r) {
                for(var s = -1, f = n.length, o = -1, c = e.length, l = -1, v = t.length, _ = Q(f - c, 0), m = d(_ + v), w = !r; ++s < _;)m[s] = n[s];
                for(var A = s; ++l < v;)m[A + l] = t[l];
                for(; ++o < c;)(w || s < f) && (m[A + e[o]] = n[s++]);
                return m;
            }
            function un(n, t) {
                var e = -1, r = n.length;
                for(t || (t = d(r)); ++e < r;)t[e] = n[e];
                return t;
            }
            function Un(n, t, e, r) {
                var s = !e;
                e || (e = {});
                for(var f = -1, o = t.length; ++f < o;){
                    var c = t[f], l = r ? r(e[c], n[c], c, e, n) : i;
                    l === i && (l = n[c]), s ? zn(e, c, l) : ie(e, c, l);
                }
                return e;
            }
            function Bc(n, t) {
                return Un(n, gi(n), t);
            }
            function Gc(n, t) {
                return Un(n, Su(n), t);
            }
            function Ye(n, t) {
                return function(e, r) {
                    var s = O(e) ? Zf : hc, f = t ? t() : {};
                    return s(e, n, C(r, 2), f);
                };
            }
            function Ut(n) {
                return T(function(t, e) {
                    var r = -1, s = e.length, f = s > 1 ? e[s - 1] : i, o = s > 2 ? e[2] : i;
                    for(f = n.length > 3 && typeof f == "function" ? (s--, f) : i, o && rn(e[0], e[1], o) && (f = s < 3 ? i : f, s = 1), t = F(t); ++r < s;){
                        var c = e[r];
                        c && n(t, c, r, f);
                    }
                    return t;
                });
            }
            function gu(n, t) {
                return function(e, r) {
                    if (e == null) return e;
                    if (!an(e)) return n(e, r);
                    for(var s = e.length, f = t ? s : -1, o = F(e); (t ? f-- : ++f < s) && r(o[f], f, o) !== !1;);
                    return e;
                };
            }
            function vu(n) {
                return function(t, e, r) {
                    for(var s = -1, f = F(t), o = r(t), c = o.length; c--;){
                        var l = o[n ? c : ++s];
                        if (e(f[l], l, f) === !1) break;
                    }
                    return t;
                };
            }
            function zc(n, t, e) {
                var r = t & vn, s = oe(n);
                function f() {
                    var o = this && this !== k && this instanceof f ? s : n;
                    return o.apply(r ? e : this, arguments);
                }
                return f;
            }
            function _u(n) {
                return function(t) {
                    t = $(t);
                    var e = bt(t) ? On(t) : i, r = e ? e[0] : t.charAt(0), s = e ? st(e, 1).join("") : t.slice(1);
                    return r[n]() + s;
                };
            }
            function Wt(n) {
                return function(t) {
                    return Dr(ga(da(t).replace(Df, "")), n, "");
                };
            }
            function oe(n) {
                return function() {
                    var t = arguments;
                    switch(t.length){
                        case 0:
                            return new n;
                        case 1:
                            return new n(t[0]);
                        case 2:
                            return new n(t[0], t[1]);
                        case 3:
                            return new n(t[0], t[1], t[2]);
                        case 4:
                            return new n(t[0], t[1], t[2], t[3]);
                        case 5:
                            return new n(t[0], t[1], t[2], t[3], t[4]);
                        case 6:
                            return new n(t[0], t[1], t[2], t[3], t[4], t[5]);
                        case 7:
                            return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    var e = $t(n.prototype), r = n.apply(e, t);
                    return z(r) ? r : e;
                };
            }
            function Kc(n, t, e) {
                var r = oe(n);
                function s() {
                    for(var f = arguments.length, o = d(f), c = f, l = Ft(s); c--;)o[c] = arguments[c];
                    var v = f < 3 && o[0] !== l && o[f - 1] !== l ? [] : nt(o, l);
                    if (f -= v.length, f < e) return Cu(n, t, Ze, s.placeholder, i, o, v, i, i, e - f);
                    var _ = this && this !== k && this instanceof s ? r : n;
                    return cn(_, this, o);
                }
                return s;
            }
            function mu(n) {
                return function(t, e, r) {
                    var s = F(t);
                    if (!an(t)) {
                        var f = C(e, 3);
                        t = V(t), e = function(c) {
                            return f(s[c], c, s);
                        };
                    }
                    var o = n(t, e, r);
                    return o > -1 ? s[f ? t[o] : o] : i;
                };
            }
            function wu(n) {
                return Yn(function(t) {
                    var e = t.length, r = e, s = Pn.prototype.thru;
                    for(n && t.reverse(); r--;){
                        var f = t[r];
                        if (typeof f != "function") throw new wn(M);
                        if (s && !o && Ve(f) == "wrapper") var o = new Pn([], !0);
                    }
                    for(r = o ? r : e; ++r < e;){
                        f = t[r];
                        var c = Ve(f), l = c == "wrapper" ? pi(f) : i;
                        l && _i(l[0]) && l[1] == (Mn | Dn | Hn | zt) && !l[4].length && l[9] == 1 ? o = o[Ve(l[0])].apply(o, l[3]) : o = f.length == 1 && _i(f) ? o[c]() : o.thru(f);
                    }
                    return function() {
                        var v = arguments, _ = v[0];
                        if (o && v.length == 1 && O(_)) return o.plant(_).value();
                        for(var m = 0, w = e ? t[m].apply(this, v) : _; ++m < e;)w = t[m].call(this, w);
                        return w;
                    };
                });
            }
            function Ze(n, t, e, r, s, f, o, c, l, v) {
                var _ = t & Mn, m = t & vn, w = t & ot, A = t & (Dn | xt), I = t & pr, b = w ? i : oe(n);
                function x() {
                    for(var L = arguments.length, H = d(L), dn = L; dn--;)H[dn] = arguments[dn];
                    if (A) var sn = Ft(x), gn = eo(H, sn);
                    if (r && (H = pu(H, r, s, A)), f && (H = du(H, f, o, A)), L -= gn, A && L < v) {
                        var Z = nt(H, sn);
                        return Cu(n, t, Ze, x.placeholder, e, H, Z, c, l, v - L);
                    }
                    var Tn = m ? e : this, Qn = w ? Tn[n] : n;
                    return L = H.length, c ? H = hh(H, c) : I && L > 1 && H.reverse(), _ && l < L && (H.length = l), this && this !== k && this instanceof x && (Qn = b || oe(Qn)), Qn.apply(Tn, H);
                }
                return x;
            }
            function Pu(n, t) {
                return function(e, r) {
                    return wc(e, n, t(r), {});
                };
            }
            function Je(n, t) {
                return function(e, r) {
                    var s;
                    if (e === i && r === i) return t;
                    if (e !== i && (s = e), r !== i) {
                        if (s === i) return r;
                        typeof e == "string" || typeof r == "string" ? (e = ln(e), r = ln(r)) : (e = su(e), r = su(r)), s = n(e, r);
                    }
                    return s;
                };
            }
            function oi(n) {
                return Yn(function(t) {
                    return t = G(t, hn(C())), T(function(e) {
                        var r = this;
                        return n(t, function(s) {
                            return cn(s, r, e);
                        });
                    });
                });
            }
            function Xe(n, t) {
                t = t === i ? " " : ln(t);
                var e = t.length;
                if (e < 2) return e ? ei(t, n) : t;
                var r = ei(t, Ne(n / Tt(t)));
                return bt(t) ? st(On(r), 0, n).join("") : r.slice(0, n);
            }
            function Yc(n, t, e, r) {
                var s = t & vn, f = oe(n);
                function o() {
                    for(var c = -1, l = arguments.length, v = -1, _ = r.length, m = d(_ + l), w = this && this !== k && this instanceof o ? f : n; ++v < _;)m[v] = r[v];
                    for(; l--;)m[v++] = arguments[++c];
                    return cn(w, s ? e : this, m);
                }
                return o;
            }
            function Au(n) {
                return function(t, e, r) {
                    return r && typeof r != "number" && rn(t, e, r) && (e = r = i), t = Xn(t), e === i ? (e = t, t = 0) : e = Xn(e), r = r === i ? t < e ? 1 : -1 : Xn(r), Tc(t, e, r, n);
                };
            }
            function Qe(n) {
                return function(t, e) {
                    return typeof t == "string" && typeof e == "string" || (t = xn(t), e = xn(e)), n(t, e);
                };
            }
            function Cu(n, t, e, r, s, f, o, c, l, v) {
                var _ = t & Dn, m = _ ? o : i, w = _ ? i : o, A = _ ? f : i, I = _ ? i : f;
                t |= _ ? Hn : Et, t &= ~(_ ? Et : Hn), t & Mi || (t &= ~(vn | ot));
                var b = [
                    n,
                    t,
                    s,
                    A,
                    m,
                    I,
                    w,
                    c,
                    l,
                    v
                ], x = e.apply(i, b);
                return _i(n) && Hu(x, b), x.placeholder = r, Nu(x, n, t);
            }
            function ci(n) {
                var t = X[n];
                return function(e, r) {
                    if (e = xn(e), r = r == null ? 0 : nn(R(r), 292), r && Ns(e)) {
                        var s = ($(e) + "e").split("e"), f = t(s[0] + "e" + (+s[1] + r));
                        return s = ($(f) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
                    }
                    return t(e);
                };
            }
            var Zc = Ht && 1 / Ee(new Ht([
                ,
                -0
            ]))[1] == ct ? function(n) {
                return new Ht(n);
            } : Li;
            function Iu(n) {
                return function(t) {
                    var e = tn(t);
                    return e == yn ? Mr(t) : e == Sn ? oo(t) : to(t, n(t));
                };
            }
            function Kn(n, t, e, r, s, f, o, c) {
                var l = t & ot;
                if (!l && typeof n != "function") throw new wn(M);
                var v = r ? r.length : 0;
                if (v || (t &= ~(Hn | Et), r = s = i), o = o === i ? o : Q(R(o), 0), c = c === i ? c : R(c), v -= s ? s.length : 0, t & Et) {
                    var _ = r, m = s;
                    r = s = i;
                }
                var w = l ? i : pi(n), A = [
                    n,
                    t,
                    e,
                    r,
                    s,
                    _,
                    m,
                    f,
                    o,
                    c
                ];
                if (w && fh(A, w), n = A[0], t = A[1], e = A[2], r = A[3], s = A[4], c = A[9] = A[9] === i ? l ? 0 : n.length : Q(A[9] - v, 0), !c && t & (Dn | xt) && (t &= ~(Dn | xt)), !t || t == vn) var I = zc(n, t, e);
                else t == Dn || t == xt ? I = Kc(n, t, c) : (t == Hn || t == (vn | Hn)) && !s.length ? I = Yc(n, t, e, r) : I = Ze.apply(i, A);
                var b = w ? ru : Hu;
                return Nu(b(I, A), n, t);
            }
            function xu(n, t, e, r) {
                return n === i || bn(n, Dt[e]) && !U.call(r, e) ? t : n;
            }
            function Eu(n, t, e, r, s, f) {
                return z(n) && z(t) && (f.set(t, n), Ge(n, t, i, Eu, f), f.delete(t)), n;
            }
            function Jc(n) {
                return le(n) ? i : n;
            }
            function yu(n, t, e, r, s, f) {
                var o = e & It, c = n.length, l = t.length;
                if (c != l && !(o && l > c)) return !1;
                var v = f.get(n), _ = f.get(t);
                if (v && _) return v == t && _ == n;
                var m = -1, w = !0, A = e & de ? new dt : i;
                for(f.set(n, t), f.set(t, n); ++m < c;){
                    var I = n[m], b = t[m];
                    if (r) var x = o ? r(b, I, m, t, n, f) : r(I, b, m, n, t, f);
                    if (x !== i) {
                        if (x) continue;
                        w = !1;
                        break;
                    }
                    if (A) {
                        if (!Hr(t, function(L, H) {
                            if (!kt(A, H) && (I === L || s(I, L, e, r, f))) return A.push(H);
                        })) {
                            w = !1;
                            break;
                        }
                    } else if (!(I === b || s(I, b, e, r, f))) {
                        w = !1;
                        break;
                    }
                }
                return f.delete(n), f.delete(t), w;
            }
            function Xc(n, t, e, r, s, f, o) {
                switch(e){
                    case St:
                        if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset) return !1;
                        n = n.buffer, t = t.buffer;
                    case Vt:
                        return !(n.byteLength != t.byteLength || !f(new Te(n), new Te(t)));
                    case Kt:
                    case Yt:
                    case Zt:
                        return bn(+n, +t);
                    case _e:
                        return n.name == t.name && n.message == t.message;
                    case Jt:
                    case Xt:
                        return n == t + "";
                    case yn:
                        var c = Mr;
                    case Sn:
                        var l = r & It;
                        if (c || (c = Ee), n.size != t.size && !l) return !1;
                        var v = o.get(n);
                        if (v) return v == t;
                        r |= de, o.set(n, t);
                        var _ = yu(c(n), c(t), r, s, f, o);
                        return o.delete(n), _;
                    case we:
                        if (re) return re.call(n) == re.call(t);
                }
                return !1;
            }
            function Qc(n, t, e, r, s, f) {
                var o = e & It, c = hi(n), l = c.length, v = hi(t), _ = v.length;
                if (l != _ && !o) return !1;
                for(var m = l; m--;){
                    var w = c[m];
                    if (!(o ? w in t : U.call(t, w))) return !1;
                }
                var A = f.get(n), I = f.get(t);
                if (A && I) return A == t && I == n;
                var b = !0;
                f.set(n, t), f.set(t, n);
                for(var x = o; ++m < l;){
                    w = c[m];
                    var L = n[w], H = t[w];
                    if (r) var dn = o ? r(H, L, w, t, n, f) : r(L, H, w, n, t, f);
                    if (!(dn === i ? L === H || s(L, H, e, r, f) : dn)) {
                        b = !1;
                        break;
                    }
                    x || (x = w == "constructor");
                }
                if (b && !x) {
                    var sn = n.constructor, gn = t.constructor;
                    sn != gn && "constructor" in n && "constructor" in t && !(typeof sn == "function" && sn instanceof sn && typeof gn == "function" && gn instanceof gn) && (b = !1);
                }
                return f.delete(n), f.delete(t), b;
            }
            function Yn(n) {
                return wi(Lu(n, i, qu), n + "");
            }
            function hi(n) {
                return Ys(n, V, gi);
            }
            function li(n) {
                return Ys(n, fn, Su);
            }
            var pi = Ue ? function(n) {
                return Ue.get(n);
            } : Li;
            function Ve(n) {
                for(var t = n.name + "", e = Nt[t], r = U.call(Nt, t) ? e.length : 0; r--;){
                    var s = e[r], f = s.func;
                    if (f == null || f == n) return s.name;
                }
                return t;
            }
            function Ft(n) {
                var t = U.call(a, "placeholder") ? a : n;
                return t.placeholder;
            }
            function C() {
                var n = a.iteratee || bi;
                return n = n === bi ? Xs : n, arguments.length ? n(arguments[0], arguments[1]) : n;
            }
            function ke(n, t) {
                var e = n.__data__;
                return ih(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
            }
            function di(n) {
                for(var t = V(n), e = t.length; e--;){
                    var r = t[e], s = n[r];
                    t[e] = [
                        r,
                        s,
                        bu(s)
                    ];
                }
                return t;
            }
            function _t(n, t) {
                var e = uo(n, t);
                return Js(e) ? e : i;
            }
            function Vc(n) {
                var t = U.call(n, lt), e = n[lt];
                try {
                    n[lt] = i;
                    var r = !0;
                } catch  {}
                var s = Re.call(n);
                return r && (t ? n[lt] = e : delete n[lt]), s;
            }
            var gi = Br ? function(n) {
                return n == null ? [] : (n = F(n), kn(Br(n), function(t) {
                    return Ds.call(n, t);
                }));
            } : Di, Su = Br ? function(n) {
                for(var t = []; n;)jn(t, gi(n)), n = Le(n);
                return t;
            } : Di, tn = en;
            (Gr && tn(new Gr(new ArrayBuffer(1))) != St || ne && tn(new ne) != yn || zr && tn(zr.resolve()) != Gi || Ht && tn(new Ht) != Sn || te && tn(new te) != Qt) && (tn = function(n) {
                var t = en(n), e = t == qn ? n.constructor : i, r = e ? mt(e) : "";
                if (r) switch(r){
                    case Do:
                        return St;
                    case Ho:
                        return yn;
                    case No:
                        return Gi;
                    case $o:
                        return Sn;
                    case Uo:
                        return Qt;
                }
                return t;
            });
            function kc(n, t, e) {
                for(var r = -1, s = e.length; ++r < s;){
                    var f = e[r], o = f.size;
                    switch(f.type){
                        case "drop":
                            n += o;
                            break;
                        case "dropRight":
                            t -= o;
                            break;
                        case "take":
                            t = nn(t, n + o);
                            break;
                        case "takeRight":
                            n = Q(n, t - o);
                            break;
                    }
                }
                return {
                    start: n,
                    end: t
                };
            }
            function jc(n) {
                var t = n.match(rf);
                return t ? t[1].split(sf) : [];
            }
            function Ou(n, t, e) {
                t = it(t, n);
                for(var r = -1, s = t.length, f = !1; ++r < s;){
                    var o = Wn(t[r]);
                    if (!(f = n != null && e(n, o))) break;
                    n = n[o];
                }
                return f || ++r != s ? f : (s = n == null ? 0 : n.length, !!s && sr(s) && Zn(o, s) && (O(n) || wt(n)));
            }
            function nh(n) {
                var t = n.length, e = new n.constructor(t);
                return t && typeof n[0] == "string" && U.call(n, "index") && (e.index = n.index, e.input = n.input), e;
            }
            function Ru(n) {
                return typeof n.constructor == "function" && !ce(n) ? $t(Le(n)) : {};
            }
            function th(n, t, e) {
                var r = n.constructor;
                switch(t){
                    case Vt:
                        return fi(n);
                    case Kt:
                    case Yt:
                        return new r(+n);
                    case St:
                        return Wc(n, e);
                    case dr:
                    case gr:
                    case vr:
                    case _r:
                    case mr:
                    case wr:
                    case Pr:
                    case Ar:
                    case Cr:
                        return hu(n, e);
                    case yn:
                        return new r;
                    case Zt:
                    case Xt:
                        return new r(n);
                    case Jt:
                        return Fc(n);
                    case Sn:
                        return new r;
                    case we:
                        return Mc(n);
                }
            }
            function eh(n, t) {
                var e = t.length;
                if (!e) return n;
                var r = e - 1;
                return t[r] = (e > 1 ? "& " : "") + t[r], t = t.join(e > 2 ? ", " : " "), n.replace(ef, `{
/* [wrapped with ` + t + `] */
`);
            }
            function rh(n) {
                return O(n) || wt(n) || !!(Hs && n && n[Hs]);
            }
            function Zn(n, t) {
                var e = typeof n;
                return t = t ?? Vn, !!t && (e == "number" || e != "symbol" && df.test(n)) && n > -1 && n % 1 == 0 && n < t;
            }
            function rn(n, t, e) {
                if (!z(e)) return !1;
                var r = typeof t;
                return (r == "number" ? an(e) && Zn(t, e.length) : r == "string" && t in e) ? bn(e[t], n) : !1;
            }
            function vi(n, t) {
                if (O(n)) return !1;
                var e = typeof n;
                return e == "number" || e == "symbol" || e == "boolean" || n == null || pn(n) ? !0 : ka.test(n) || !Va.test(n) || t != null && n in F(t);
            }
            function ih(n) {
                var t = typeof n;
                return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? n !== "__proto__" : n === null;
            }
            function _i(n) {
                var t = Ve(n), e = a[t];
                if (typeof e != "function" || !(t in D.prototype)) return !1;
                if (n === e) return !0;
                var r = pi(e);
                return !!r && n === r[0];
            }
            function sh(n) {
                return !!bs && bs in n;
            }
            var uh = Se ? Jn : Hi;
            function ce(n) {
                var t = n && n.constructor, e = typeof t == "function" && t.prototype || Dt;
                return n === e;
            }
            function bu(n) {
                return n === n && !z(n);
            }
            function Tu(n, t) {
                return function(e) {
                    return e == null ? !1 : e[n] === t && (t !== i || n in F(e));
                };
            }
            function ah(n) {
                var t = rr(n, function(r) {
                    return e.size === lr && e.clear(), r;
                }), e = t.cache;
                return t;
            }
            function fh(n, t) {
                var e = n[1], r = t[1], s = e | r, f = s < (vn | ot | Mn), o = r == Mn && e == Dn || r == Mn && e == zt && n[7].length <= t[8] || r == (Mn | zt) && t[7].length <= t[8] && e == Dn;
                if (!(f || o)) return n;
                r & vn && (n[2] = t[2], s |= e & vn ? 0 : Mi);
                var c = t[3];
                if (c) {
                    var l = n[3];
                    n[3] = l ? pu(l, c, t[4]) : c, n[4] = l ? nt(n[3], At) : t[4];
                }
                return c = t[5], c && (l = n[5], n[5] = l ? du(l, c, t[6]) : c, n[6] = l ? nt(n[5], At) : t[6]), c = t[7], c && (n[7] = c), r & Mn && (n[8] = n[8] == null ? t[8] : nn(n[8], t[8])), n[9] == null && (n[9] = t[9]), n[0] = t[0], n[1] = s, n;
            }
            function oh(n) {
                var t = [];
                if (n != null) for(var e in F(n))t.push(e);
                return t;
            }
            function ch(n) {
                return Re.call(n);
            }
            function Lu(n, t, e) {
                return t = Q(t === i ? n.length - 1 : t, 0), function() {
                    for(var r = arguments, s = -1, f = Q(r.length - t, 0), o = d(f); ++s < f;)o[s] = r[t + s];
                    s = -1;
                    for(var c = d(t + 1); ++s < t;)c[s] = r[s];
                    return c[t] = e(o), cn(n, this, c);
                };
            }
            function Du(n, t) {
                return t.length < 2 ? n : vt(n, Cn(t, 0, -1));
            }
            function hh(n, t) {
                for(var e = n.length, r = nn(t.length, e), s = un(n); r--;){
                    var f = t[r];
                    n[r] = Zn(f, e) ? s[f] : i;
                }
                return n;
            }
            function mi(n, t) {
                if (!(t === "constructor" && typeof n[t] == "function") && t != "__proto__") return n[t];
            }
            var Hu = $u(ru), he = yo || function(n, t) {
                return k.setTimeout(n, t);
            }, wi = $u(Hc);
            function Nu(n, t, e) {
                var r = t + "";
                return wi(n, eh(r, lh(jc(r), e)));
            }
            function $u(n) {
                var t = 0, e = 0;
                return function() {
                    var r = bo(), s = Ta - (r - e);
                    if (e = r, s > 0) {
                        if (++t >= ba) return arguments[0];
                    } else t = 0;
                    return n.apply(i, arguments);
                };
            }
            function je(n, t) {
                var e = -1, r = n.length, s = r - 1;
                for(t = t === i ? r : t; ++e < t;){
                    var f = ti(e, s), o = n[f];
                    n[f] = n[e], n[e] = o;
                }
                return n.length = t, n;
            }
            var Uu = ah(function(n) {
                var t = [];
                return n.charCodeAt(0) === 46 && t.push(""), n.replace(ja, function(e, r, s, f) {
                    t.push(s ? f.replace(ff, "$1") : r || e);
                }), t;
            });
            function Wn(n) {
                if (typeof n == "string" || pn(n)) return n;
                var t = n + "";
                return t == "0" && 1 / n == -ct ? "-0" : t;
            }
            function mt(n) {
                if (n != null) {
                    try {
                        return Oe.call(n);
                    } catch  {}
                    try {
                        return n + "";
                    } catch  {}
                }
                return "";
            }
            function lh(n, t) {
                return mn(Ua, function(e) {
                    var r = "_." + e[0];
                    t & e[1] && !Ie(n, r) && n.push(r);
                }), n.sort();
            }
            function Wu(n) {
                if (n instanceof D) return n.clone();
                var t = new Pn(n.__wrapped__, n.__chain__);
                return t.__actions__ = un(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t;
            }
            function ph(n, t, e) {
                (e ? rn(n, t, e) : t === i) ? t = 1 : t = Q(R(t), 0);
                var r = n == null ? 0 : n.length;
                if (!r || t < 1) return [];
                for(var s = 0, f = 0, o = d(Ne(r / t)); s < r;)o[f++] = Cn(n, s, s += t);
                return o;
            }
            function dh(n) {
                for(var t = -1, e = n == null ? 0 : n.length, r = 0, s = []; ++t < e;){
                    var f = n[t];
                    f && (s[r++] = f);
                }
                return s;
            }
            function gh() {
                var n = arguments.length;
                if (!n) return [];
                for(var t = d(n - 1), e = arguments[0], r = n; r--;)t[r - 1] = arguments[r];
                return jn(O(e) ? un(e) : [
                    e
                ], j(t, 1));
            }
            var vh = T(function(n, t) {
                return Y(n) ? se(n, j(t, 1, Y, !0)) : [];
            }), _h = T(function(n, t) {
                var e = In(t);
                return Y(e) && (e = i), Y(n) ? se(n, j(t, 1, Y, !0), C(e, 2)) : [];
            }), mh = T(function(n, t) {
                var e = In(t);
                return Y(e) && (e = i), Y(n) ? se(n, j(t, 1, Y, !0), i, e) : [];
            });
            function wh(n, t, e) {
                var r = n == null ? 0 : n.length;
                return r ? (t = e || t === i ? 1 : R(t), Cn(n, t < 0 ? 0 : t, r)) : [];
            }
            function Ph(n, t, e) {
                var r = n == null ? 0 : n.length;
                return r ? (t = e || t === i ? 1 : R(t), t = r - t, Cn(n, 0, t < 0 ? 0 : t)) : [];
            }
            function Ah(n, t) {
                return n && n.length ? Ke(n, C(t, 3), !0, !0) : [];
            }
            function Ch(n, t) {
                return n && n.length ? Ke(n, C(t, 3), !0) : [];
            }
            function Ih(n, t, e, r) {
                var s = n == null ? 0 : n.length;
                return s ? (e && typeof e != "number" && rn(n, t, e) && (e = 0, r = s), gc(n, t, e, r)) : [];
            }
            function Fu(n, t, e) {
                var r = n == null ? 0 : n.length;
                if (!r) return -1;
                var s = e == null ? 0 : R(e);
                return s < 0 && (s = Q(r + s, 0)), xe(n, C(t, 3), s);
            }
            function Mu(n, t, e) {
                var r = n == null ? 0 : n.length;
                if (!r) return -1;
                var s = r - 1;
                return e !== i && (s = R(e), s = e < 0 ? Q(r + s, 0) : nn(s, r - 1)), xe(n, C(t, 3), s, !0);
            }
            function qu(n) {
                var t = n == null ? 0 : n.length;
                return t ? j(n, 1) : [];
            }
            function xh(n) {
                var t = n == null ? 0 : n.length;
                return t ? j(n, ct) : [];
            }
            function Eh(n, t) {
                var e = n == null ? 0 : n.length;
                return e ? (t = t === i ? 1 : R(t), j(n, t)) : [];
            }
            function yh(n) {
                for(var t = -1, e = n == null ? 0 : n.length, r = {}; ++t < e;){
                    var s = n[t];
                    r[s[0]] = s[1];
                }
                return r;
            }
            function Bu(n) {
                return n && n.length ? n[0] : i;
            }
            function Sh(n, t, e) {
                var r = n == null ? 0 : n.length;
                if (!r) return -1;
                var s = e == null ? 0 : R(e);
                return s < 0 && (s = Q(r + s, 0)), Rt(n, t, s);
            }
            function Oh(n) {
                var t = n == null ? 0 : n.length;
                return t ? Cn(n, 0, -1) : [];
            }
            var Rh = T(function(n) {
                var t = G(n, ui);
                return t.length && t[0] === n[0] ? Qr(t) : [];
            }), bh = T(function(n) {
                var t = In(n), e = G(n, ui);
                return t === In(e) ? t = i : e.pop(), e.length && e[0] === n[0] ? Qr(e, C(t, 2)) : [];
            }), Th = T(function(n) {
                var t = In(n), e = G(n, ui);
                return t = typeof t == "function" ? t : i, t && e.pop(), e.length && e[0] === n[0] ? Qr(e, i, t) : [];
            });
            function Lh(n, t) {
                return n == null ? "" : Oo.call(n, t);
            }
            function In(n) {
                var t = n == null ? 0 : n.length;
                return t ? n[t - 1] : i;
            }
            function Dh(n, t, e) {
                var r = n == null ? 0 : n.length;
                if (!r) return -1;
                var s = r;
                return e !== i && (s = R(e), s = s < 0 ? Q(r + s, 0) : nn(s, r - 1)), t === t ? ho(n, t, s) : xe(n, Cs, s, !0);
            }
            function Hh(n, t) {
                return n && n.length ? js(n, R(t)) : i;
            }
            var Nh = T(Gu);
            function Gu(n, t) {
                return n && n.length && t && t.length ? ni(n, t) : n;
            }
            function $h(n, t, e) {
                return n && n.length && t && t.length ? ni(n, t, C(e, 2)) : n;
            }
            function Uh(n, t, e) {
                return n && n.length && t && t.length ? ni(n, t, i, e) : n;
            }
            var Wh = Yn(function(n, t) {
                var e = n == null ? 0 : n.length, r = Yr(n, t);
                return eu(n, G(t, function(s) {
                    return Zn(s, e) ? +s : s;
                }).sort(lu)), r;
            });
            function Fh(n, t) {
                var e = [];
                if (!(n && n.length)) return e;
                var r = -1, s = [], f = n.length;
                for(t = C(t, 3); ++r < f;){
                    var o = n[r];
                    t(o, r, n) && (e.push(o), s.push(r));
                }
                return eu(n, s), e;
            }
            function Pi(n) {
                return n == null ? n : Lo.call(n);
            }
            function Mh(n, t, e) {
                var r = n == null ? 0 : n.length;
                return r ? (e && typeof e != "number" && rn(n, t, e) ? (t = 0, e = r) : (t = t == null ? 0 : R(t), e = e === i ? r : R(e)), Cn(n, t, e)) : [];
            }
            function qh(n, t) {
                return ze(n, t);
            }
            function Bh(n, t, e) {
                return ri(n, t, C(e, 2));
            }
            function Gh(n, t) {
                var e = n == null ? 0 : n.length;
                if (e) {
                    var r = ze(n, t);
                    if (r < e && bn(n[r], t)) return r;
                }
                return -1;
            }
            function zh(n, t) {
                return ze(n, t, !0);
            }
            function Kh(n, t, e) {
                return ri(n, t, C(e, 2), !0);
            }
            function Yh(n, t) {
                var e = n == null ? 0 : n.length;
                if (e) {
                    var r = ze(n, t, !0) - 1;
                    if (bn(n[r], t)) return r;
                }
                return -1;
            }
            function Zh(n) {
                return n && n.length ? iu(n) : [];
            }
            function Jh(n, t) {
                return n && n.length ? iu(n, C(t, 2)) : [];
            }
            function Xh(n) {
                var t = n == null ? 0 : n.length;
                return t ? Cn(n, 1, t) : [];
            }
            function Qh(n, t, e) {
                return n && n.length ? (t = e || t === i ? 1 : R(t), Cn(n, 0, t < 0 ? 0 : t)) : [];
            }
            function Vh(n, t, e) {
                var r = n == null ? 0 : n.length;
                return r ? (t = e || t === i ? 1 : R(t), t = r - t, Cn(n, t < 0 ? 0 : t, r)) : [];
            }
            function kh(n, t) {
                return n && n.length ? Ke(n, C(t, 3), !1, !0) : [];
            }
            function jh(n, t) {
                return n && n.length ? Ke(n, C(t, 3)) : [];
            }
            var nl = T(function(n) {
                return rt(j(n, 1, Y, !0));
            }), tl = T(function(n) {
                var t = In(n);
                return Y(t) && (t = i), rt(j(n, 1, Y, !0), C(t, 2));
            }), el = T(function(n) {
                var t = In(n);
                return t = typeof t == "function" ? t : i, rt(j(n, 1, Y, !0), i, t);
            });
            function rl(n) {
                return n && n.length ? rt(n) : [];
            }
            function il(n, t) {
                return n && n.length ? rt(n, C(t, 2)) : [];
            }
            function sl(n, t) {
                return t = typeof t == "function" ? t : i, n && n.length ? rt(n, i, t) : [];
            }
            function Ai(n) {
                if (!(n && n.length)) return [];
                var t = 0;
                return n = kn(n, function(e) {
                    if (Y(e)) return t = Q(e.length, t), !0;
                }), Wr(t, function(e) {
                    return G(n, Nr(e));
                });
            }
            function zu(n, t) {
                if (!(n && n.length)) return [];
                var e = Ai(n);
                return t == null ? e : G(e, function(r) {
                    return cn(t, i, r);
                });
            }
            var ul = T(function(n, t) {
                return Y(n) ? se(n, t) : [];
            }), al = T(function(n) {
                return si(kn(n, Y));
            }), fl = T(function(n) {
                var t = In(n);
                return Y(t) && (t = i), si(kn(n, Y), C(t, 2));
            }), ol = T(function(n) {
                var t = In(n);
                return t = typeof t == "function" ? t : i, si(kn(n, Y), i, t);
            }), cl = T(Ai);
            function hl(n, t) {
                return fu(n || [], t || [], ie);
            }
            function ll(n, t) {
                return fu(n || [], t || [], fe);
            }
            var pl = T(function(n) {
                var t = n.length, e = t > 1 ? n[t - 1] : i;
                return e = typeof e == "function" ? (n.pop(), e) : i, zu(n, e);
            });
            function Ku(n) {
                var t = a(n);
                return t.__chain__ = !0, t;
            }
            function dl(n, t) {
                return t(n), n;
            }
            function nr(n, t) {
                return t(n);
            }
            var gl = Yn(function(n) {
                var t = n.length, e = t ? n[0] : 0, r = this.__wrapped__, s = function(f) {
                    return Yr(f, n);
                };
                return t > 1 || this.__actions__.length || !(r instanceof D) || !Zn(e) ? this.thru(s) : (r = r.slice(e, +e + (t ? 1 : 0)), r.__actions__.push({
                    func: nr,
                    args: [
                        s
                    ],
                    thisArg: i
                }), new Pn(r, this.__chain__).thru(function(f) {
                    return t && !f.length && f.push(i), f;
                }));
            });
            function vl() {
                return Ku(this);
            }
            function _l() {
                return new Pn(this.value(), this.__chain__);
            }
            function ml() {
                this.__values__ === i && (this.__values__ = sa(this.value()));
                var n = this.__index__ >= this.__values__.length, t = n ? i : this.__values__[this.__index__++];
                return {
                    done: n,
                    value: t
                };
            }
            function wl() {
                return this;
            }
            function Pl(n) {
                for(var t, e = this; e instanceof Fe;){
                    var r = Wu(e);
                    r.__index__ = 0, r.__values__ = i, t ? s.__wrapped__ = r : t = r;
                    var s = r;
                    e = e.__wrapped__;
                }
                return s.__wrapped__ = n, t;
            }
            function Al() {
                var n = this.__wrapped__;
                if (n instanceof D) {
                    var t = n;
                    return this.__actions__.length && (t = new D(this)), t = t.reverse(), t.__actions__.push({
                        func: nr,
                        args: [
                            Pi
                        ],
                        thisArg: i
                    }), new Pn(t, this.__chain__);
                }
                return this.thru(Pi);
            }
            function Cl() {
                return au(this.__wrapped__, this.__actions__);
            }
            var Il = Ye(function(n, t, e) {
                U.call(n, e) ? ++n[e] : zn(n, e, 1);
            });
            function xl(n, t, e) {
                var r = O(n) ? Ps : dc;
                return e && rn(n, t, e) && (t = i), r(n, C(t, 3));
            }
            function El(n, t) {
                var e = O(n) ? kn : zs;
                return e(n, C(t, 3));
            }
            var yl = mu(Fu), Sl = mu(Mu);
            function Ol(n, t) {
                return j(tr(n, t), 1);
            }
            function Rl(n, t) {
                return j(tr(n, t), ct);
            }
            function bl(n, t, e) {
                return e = e === i ? 1 : R(e), j(tr(n, t), e);
            }
            function Yu(n, t) {
                var e = O(n) ? mn : et;
                return e(n, C(t, 3));
            }
            function Zu(n, t) {
                var e = O(n) ? Jf : Gs;
                return e(n, C(t, 3));
            }
            var Tl = Ye(function(n, t, e) {
                U.call(n, e) ? n[e].push(t) : zn(n, e, [
                    t
                ]);
            });
            function Ll(n, t, e, r) {
                n = an(n) ? n : qt(n), e = e && !r ? R(e) : 0;
                var s = n.length;
                return e < 0 && (e = Q(s + e, 0)), ur(n) ? e <= s && n.indexOf(t, e) > -1 : !!s && Rt(n, t, e) > -1;
            }
            var Dl = T(function(n, t, e) {
                var r = -1, s = typeof t == "function", f = an(n) ? d(n.length) : [];
                return et(n, function(o) {
                    f[++r] = s ? cn(t, o, e) : ue(o, t, e);
                }), f;
            }), Hl = Ye(function(n, t, e) {
                zn(n, e, t);
            });
            function tr(n, t) {
                var e = O(n) ? G : Qs;
                return e(n, C(t, 3));
            }
            function Nl(n, t, e, r) {
                return n == null ? [] : (O(t) || (t = t == null ? [] : [
                    t
                ]), e = r ? i : e, O(e) || (e = e == null ? [] : [
                    e
                ]), nu(n, t, e));
            }
            var $l = Ye(function(n, t, e) {
                n[e ? 0 : 1].push(t);
            }, function() {
                return [
                    [],
                    []
                ];
            });
            function Ul(n, t, e) {
                var r = O(n) ? Dr : xs, s = arguments.length < 3;
                return r(n, C(t, 4), e, s, et);
            }
            function Wl(n, t, e) {
                var r = O(n) ? Xf : xs, s = arguments.length < 3;
                return r(n, C(t, 4), e, s, Gs);
            }
            function Fl(n, t) {
                var e = O(n) ? kn : zs;
                return e(n, ir(C(t, 3)));
            }
            function Ml(n) {
                var t = O(n) ? Fs : Lc;
                return t(n);
            }
            function ql(n, t, e) {
                (e ? rn(n, t, e) : t === i) ? t = 1 : t = R(t);
                var r = O(n) ? oc : Dc;
                return r(n, t);
            }
            function Bl(n) {
                var t = O(n) ? cc : Nc;
                return t(n);
            }
            function Gl(n) {
                if (n == null) return 0;
                if (an(n)) return ur(n) ? Tt(n) : n.length;
                var t = tn(n);
                return t == yn || t == Sn ? n.size : kr(n).length;
            }
            function zl(n, t, e) {
                var r = O(n) ? Hr : $c;
                return e && rn(n, t, e) && (t = i), r(n, C(t, 3));
            }
            var Kl = T(function(n, t) {
                if (n == null) return [];
                var e = t.length;
                return e > 1 && rn(n, t[0], t[1]) ? t = [] : e > 2 && rn(t[0], t[1], t[2]) && (t = [
                    t[0]
                ]), nu(n, j(t, 1), []);
            }), er = Eo || function() {
                return k.Date.now();
            };
            function Yl(n, t) {
                if (typeof t != "function") throw new wn(M);
                return n = R(n), function() {
                    if (--n < 1) return t.apply(this, arguments);
                };
            }
            function Ju(n, t, e) {
                return t = e ? i : t, t = n && t == null ? n.length : t, Kn(n, Mn, i, i, i, i, t);
            }
            function Xu(n, t) {
                var e;
                if (typeof t != "function") throw new wn(M);
                return n = R(n), function() {
                    return --n > 0 && (e = t.apply(this, arguments)), n <= 1 && (t = i), e;
                };
            }
            var Ci = T(function(n, t, e) {
                var r = vn;
                if (e.length) {
                    var s = nt(e, Ft(Ci));
                    r |= Hn;
                }
                return Kn(n, r, t, e, s);
            }), Qu = T(function(n, t, e) {
                var r = vn | ot;
                if (e.length) {
                    var s = nt(e, Ft(Qu));
                    r |= Hn;
                }
                return Kn(t, r, n, e, s);
            });
            function Vu(n, t, e) {
                t = e ? i : t;
                var r = Kn(n, Dn, i, i, i, i, i, t);
                return r.placeholder = Vu.placeholder, r;
            }
            function ku(n, t, e) {
                t = e ? i : t;
                var r = Kn(n, xt, i, i, i, i, i, t);
                return r.placeholder = ku.placeholder, r;
            }
            function ju(n, t, e) {
                var r, s, f, o, c, l, v = 0, _ = !1, m = !1, w = !0;
                if (typeof n != "function") throw new wn(M);
                t = xn(t) || 0, z(e) && (_ = !!e.leading, m = "maxWait" in e, f = m ? Q(xn(e.maxWait) || 0, t) : f, w = "trailing" in e ? !!e.trailing : w);
                function A(Z) {
                    var Tn = r, Qn = s;
                    return r = s = i, v = Z, o = n.apply(Qn, Tn), o;
                }
                function I(Z) {
                    return v = Z, c = he(L, t), _ ? A(Z) : o;
                }
                function b(Z) {
                    var Tn = Z - l, Qn = Z - v, ma = t - Tn;
                    return m ? nn(ma, f - Qn) : ma;
                }
                function x(Z) {
                    var Tn = Z - l, Qn = Z - v;
                    return l === i || Tn >= t || Tn < 0 || m && Qn >= f;
                }
                function L() {
                    var Z = er();
                    if (x(Z)) return H(Z);
                    c = he(L, b(Z));
                }
                function H(Z) {
                    return c = i, w && r ? A(Z) : (r = s = i, o);
                }
                function dn() {
                    c !== i && ou(c), v = 0, r = l = s = c = i;
                }
                function sn() {
                    return c === i ? o : H(er());
                }
                function gn() {
                    var Z = er(), Tn = x(Z);
                    if (r = arguments, s = this, l = Z, Tn) {
                        if (c === i) return I(l);
                        if (m) return ou(c), c = he(L, t), A(l);
                    }
                    return c === i && (c = he(L, t)), o;
                }
                return gn.cancel = dn, gn.flush = sn, gn;
            }
            var Zl = T(function(n, t) {
                return Bs(n, 1, t);
            }), Jl = T(function(n, t, e) {
                return Bs(n, xn(t) || 0, e);
            });
            function Xl(n) {
                return Kn(n, pr);
            }
            function rr(n, t) {
                if (typeof n != "function" || t != null && typeof t != "function") throw new wn(M);
                var e = function() {
                    var r = arguments, s = t ? t.apply(this, r) : r[0], f = e.cache;
                    if (f.has(s)) return f.get(s);
                    var o = n.apply(this, r);
                    return e.cache = f.set(s, o) || f, o;
                };
                return e.cache = new (rr.Cache || Gn), e;
            }
            rr.Cache = Gn;
            function ir(n) {
                if (typeof n != "function") throw new wn(M);
                return function() {
                    var t = arguments;
                    switch(t.length){
                        case 0:
                            return !n.call(this);
                        case 1:
                            return !n.call(this, t[0]);
                        case 2:
                            return !n.call(this, t[0], t[1]);
                        case 3:
                            return !n.call(this, t[0], t[1], t[2]);
                    }
                    return !n.apply(this, t);
                };
            }
            function Ql(n) {
                return Xu(2, n);
            }
            var Vl = Uc(function(n, t) {
                t = t.length == 1 && O(t[0]) ? G(t[0], hn(C())) : G(j(t, 1), hn(C()));
                var e = t.length;
                return T(function(r) {
                    for(var s = -1, f = nn(r.length, e); ++s < f;)r[s] = t[s].call(this, r[s]);
                    return cn(n, this, r);
                });
            }), Ii = T(function(n, t) {
                var e = nt(t, Ft(Ii));
                return Kn(n, Hn, i, t, e);
            }), na = T(function(n, t) {
                var e = nt(t, Ft(na));
                return Kn(n, Et, i, t, e);
            }), kl = Yn(function(n, t) {
                return Kn(n, zt, i, i, i, t);
            });
            function jl(n, t) {
                if (typeof n != "function") throw new wn(M);
                return t = t === i ? t : R(t), T(n, t);
            }
            function np(n, t) {
                if (typeof n != "function") throw new wn(M);
                return t = t == null ? 0 : Q(R(t), 0), T(function(e) {
                    var r = e[t], s = st(e, 0, t);
                    return r && jn(s, r), cn(n, this, s);
                });
            }
            function tp(n, t, e) {
                var r = !0, s = !0;
                if (typeof n != "function") throw new wn(M);
                return z(e) && (r = "leading" in e ? !!e.leading : r, s = "trailing" in e ? !!e.trailing : s), ju(n, t, {
                    leading: r,
                    maxWait: t,
                    trailing: s
                });
            }
            function ep(n) {
                return Ju(n, 1);
            }
            function rp(n, t) {
                return Ii(ai(t), n);
            }
            function ip() {
                if (!arguments.length) return [];
                var n = arguments[0];
                return O(n) ? n : [
                    n
                ];
            }
            function sp(n) {
                return An(n, Ct);
            }
            function up(n, t) {
                return t = typeof t == "function" ? t : i, An(n, Ct, t);
            }
            function ap(n) {
                return An(n, Ln | Ct);
            }
            function fp(n, t) {
                return t = typeof t == "function" ? t : i, An(n, Ln | Ct, t);
            }
            function op(n, t) {
                return t == null || qs(n, t, V(t));
            }
            function bn(n, t) {
                return n === t || n !== n && t !== t;
            }
            var cp = Qe(Xr), hp = Qe(function(n, t) {
                return n >= t;
            }), wt = Zs(function() {
                return arguments;
            }()) ? Zs : function(n) {
                return K(n) && U.call(n, "callee") && !Ds.call(n, "callee");
            }, O = d.isArray, lp = ds ? hn(ds) : Pc;
            function an(n) {
                return n != null && sr(n.length) && !Jn(n);
            }
            function Y(n) {
                return K(n) && an(n);
            }
            function pp(n) {
                return n === !0 || n === !1 || K(n) && en(n) == Kt;
            }
            var ut = So || Hi, dp = gs ? hn(gs) : Ac;
            function gp(n) {
                return K(n) && n.nodeType === 1 && !le(n);
            }
            function vp(n) {
                if (n == null) return !0;
                if (an(n) && (O(n) || typeof n == "string" || typeof n.splice == "function" || ut(n) || Mt(n) || wt(n))) return !n.length;
                var t = tn(n);
                if (t == yn || t == Sn) return !n.size;
                if (ce(n)) return !kr(n).length;
                for(var e in n)if (U.call(n, e)) return !1;
                return !0;
            }
            function _p(n, t) {
                return ae(n, t);
            }
            function mp(n, t, e) {
                e = typeof e == "function" ? e : i;
                var r = e ? e(n, t) : i;
                return r === i ? ae(n, t, i, e) : !!r;
            }
            function xi(n) {
                if (!K(n)) return !1;
                var t = en(n);
                return t == _e || t == Fa || typeof n.message == "string" && typeof n.name == "string" && !le(n);
            }
            function wp(n) {
                return typeof n == "number" && Ns(n);
            }
            function Jn(n) {
                if (!z(n)) return !1;
                var t = en(n);
                return t == me || t == Bi || t == Wa || t == qa;
            }
            function ta(n) {
                return typeof n == "number" && n == R(n);
            }
            function sr(n) {
                return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Vn;
            }
            function z(n) {
                var t = typeof n;
                return n != null && (t == "object" || t == "function");
            }
            function K(n) {
                return n != null && typeof n == "object";
            }
            var ea = vs ? hn(vs) : Ic;
            function Pp(n, t) {
                return n === t || Vr(n, t, di(t));
            }
            function Ap(n, t, e) {
                return e = typeof e == "function" ? e : i, Vr(n, t, di(t), e);
            }
            function Cp(n) {
                return ra(n) && n != +n;
            }
            function Ip(n) {
                if (uh(n)) throw new S(W);
                return Js(n);
            }
            function xp(n) {
                return n === null;
            }
            function Ep(n) {
                return n == null;
            }
            function ra(n) {
                return typeof n == "number" || K(n) && en(n) == Zt;
            }
            function le(n) {
                if (!K(n) || en(n) != qn) return !1;
                var t = Le(n);
                if (t === null) return !0;
                var e = U.call(t, "constructor") && t.constructor;
                return typeof e == "function" && e instanceof e && Oe.call(e) == Ao;
            }
            var Ei = _s ? hn(_s) : xc;
            function yp(n) {
                return ta(n) && n >= -Vn && n <= Vn;
            }
            var ia = ms ? hn(ms) : Ec;
            function ur(n) {
                return typeof n == "string" || !O(n) && K(n) && en(n) == Xt;
            }
            function pn(n) {
                return typeof n == "symbol" || K(n) && en(n) == we;
            }
            var Mt = ws ? hn(ws) : yc;
            function Sp(n) {
                return n === i;
            }
            function Op(n) {
                return K(n) && tn(n) == Qt;
            }
            function Rp(n) {
                return K(n) && en(n) == Ga;
            }
            var bp = Qe(jr), Tp = Qe(function(n, t) {
                return n <= t;
            });
            function sa(n) {
                if (!n) return [];
                if (an(n)) return ur(n) ? On(n) : un(n);
                if (jt && n[jt]) return fo(n[jt]());
                var t = tn(n), e = t == yn ? Mr : t == Sn ? Ee : qt;
                return e(n);
            }
            function Xn(n) {
                if (!n) return n === 0 ? n : 0;
                if (n = xn(n), n === ct || n === -ct) {
                    var t = n < 0 ? -1 : 1;
                    return t * Ha;
                }
                return n === n ? n : 0;
            }
            function R(n) {
                var t = Xn(n), e = t % 1;
                return t === t ? e ? t - e : t : 0;
            }
            function ua(n) {
                return n ? gt(R(n), 0, Nn) : 0;
            }
            function xn(n) {
                if (typeof n == "number") return n;
                if (pn(n)) return ge;
                if (z(n)) {
                    var t = typeof n.valueOf == "function" ? n.valueOf() : n;
                    n = z(t) ? t + "" : t;
                }
                if (typeof n != "string") return n === 0 ? n : +n;
                n = Es(n);
                var e = hf.test(n);
                return e || pf.test(n) ? Kf(n.slice(2), e ? 2 : 8) : cf.test(n) ? ge : +n;
            }
            function aa(n) {
                return Un(n, fn(n));
            }
            function Lp(n) {
                return n ? gt(R(n), -Vn, Vn) : n === 0 ? n : 0;
            }
            function $(n) {
                return n == null ? "" : ln(n);
            }
            var Dp = Ut(function(n, t) {
                if (ce(t) || an(t)) {
                    Un(t, V(t), n);
                    return;
                }
                for(var e in t)U.call(t, e) && ie(n, e, t[e]);
            }), fa = Ut(function(n, t) {
                Un(t, fn(t), n);
            }), ar = Ut(function(n, t, e, r) {
                Un(t, fn(t), n, r);
            }), Hp = Ut(function(n, t, e, r) {
                Un(t, V(t), n, r);
            }), Np = Yn(Yr);
            function $p(n, t) {
                var e = $t(n);
                return t == null ? e : Ms(e, t);
            }
            var Up = T(function(n, t) {
                n = F(n);
                var e = -1, r = t.length, s = r > 2 ? t[2] : i;
                for(s && rn(t[0], t[1], s) && (r = 1); ++e < r;)for(var f = t[e], o = fn(f), c = -1, l = o.length; ++c < l;){
                    var v = o[c], _ = n[v];
                    (_ === i || bn(_, Dt[v]) && !U.call(n, v)) && (n[v] = f[v]);
                }
                return n;
            }), Wp = T(function(n) {
                return n.push(i, Eu), cn(oa, i, n);
            });
            function Fp(n, t) {
                return As(n, C(t, 3), $n);
            }
            function Mp(n, t) {
                return As(n, C(t, 3), Jr);
            }
            function qp(n, t) {
                return n == null ? n : Zr(n, C(t, 3), fn);
            }
            function Bp(n, t) {
                return n == null ? n : Ks(n, C(t, 3), fn);
            }
            function Gp(n, t) {
                return n && $n(n, C(t, 3));
            }
            function zp(n, t) {
                return n && Jr(n, C(t, 3));
            }
            function Kp(n) {
                return n == null ? [] : Be(n, V(n));
            }
            function Yp(n) {
                return n == null ? [] : Be(n, fn(n));
            }
            function yi(n, t, e) {
                var r = n == null ? i : vt(n, t);
                return r === i ? e : r;
            }
            function Zp(n, t) {
                return n != null && Ou(n, t, vc);
            }
            function Si(n, t) {
                return n != null && Ou(n, t, _c);
            }
            var Jp = Pu(function(n, t, e) {
                t != null && typeof t.toString != "function" && (t = Re.call(t)), n[t] = e;
            }, Ri(on)), Xp = Pu(function(n, t, e) {
                t != null && typeof t.toString != "function" && (t = Re.call(t)), U.call(n, t) ? n[t].push(e) : n[t] = [
                    e
                ];
            }, C), Qp = T(ue);
            function V(n) {
                return an(n) ? Ws(n) : kr(n);
            }
            function fn(n) {
                return an(n) ? Ws(n, !0) : Sc(n);
            }
            function Vp(n, t) {
                var e = {};
                return t = C(t, 3), $n(n, function(r, s, f) {
                    zn(e, t(r, s, f), r);
                }), e;
            }
            function kp(n, t) {
                var e = {};
                return t = C(t, 3), $n(n, function(r, s, f) {
                    zn(e, s, t(r, s, f));
                }), e;
            }
            var jp = Ut(function(n, t, e) {
                Ge(n, t, e);
            }), oa = Ut(function(n, t, e, r) {
                Ge(n, t, e, r);
            }), nd = Yn(function(n, t) {
                var e = {};
                if (n == null) return e;
                var r = !1;
                t = G(t, function(f) {
                    return f = it(f, n), r || (r = f.length > 1), f;
                }), Un(n, li(n), e), r && (e = An(e, Ln | Fn | Ct, Jc));
                for(var s = t.length; s--;)ii(e, t[s]);
                return e;
            });
            function td(n, t) {
                return ca(n, ir(C(t)));
            }
            var ed = Yn(function(n, t) {
                return n == null ? {} : Rc(n, t);
            });
            function ca(n, t) {
                if (n == null) return {};
                var e = G(li(n), function(r) {
                    return [
                        r
                    ];
                });
                return t = C(t), tu(n, e, function(r, s) {
                    return t(r, s[0]);
                });
            }
            function rd(n, t, e) {
                t = it(t, n);
                var r = -1, s = t.length;
                for(s || (s = 1, n = i); ++r < s;){
                    var f = n == null ? i : n[Wn(t[r])];
                    f === i && (r = s, f = e), n = Jn(f) ? f.call(n) : f;
                }
                return n;
            }
            function id(n, t, e) {
                return n == null ? n : fe(n, t, e);
            }
            function sd(n, t, e, r) {
                return r = typeof r == "function" ? r : i, n == null ? n : fe(n, t, e, r);
            }
            var ha = Iu(V), la = Iu(fn);
            function ud(n, t, e) {
                var r = O(n), s = r || ut(n) || Mt(n);
                if (t = C(t, 4), e == null) {
                    var f = n && n.constructor;
                    s ? e = r ? new f : [] : z(n) ? e = Jn(f) ? $t(Le(n)) : {} : e = {};
                }
                return (s ? mn : $n)(n, function(o, c, l) {
                    return t(e, o, c, l);
                }), e;
            }
            function ad(n, t) {
                return n == null ? !0 : ii(n, t);
            }
            function fd(n, t, e) {
                return n == null ? n : uu(n, t, ai(e));
            }
            function od(n, t, e, r) {
                return r = typeof r == "function" ? r : i, n == null ? n : uu(n, t, ai(e), r);
            }
            function qt(n) {
                return n == null ? [] : Fr(n, V(n));
            }
            function cd(n) {
                return n == null ? [] : Fr(n, fn(n));
            }
            function hd(n, t, e) {
                return e === i && (e = t, t = i), e !== i && (e = xn(e), e = e === e ? e : 0), t !== i && (t = xn(t), t = t === t ? t : 0), gt(xn(n), t, e);
            }
            function ld(n, t, e) {
                return t = Xn(t), e === i ? (e = t, t = 0) : e = Xn(e), n = xn(n), mc(n, t, e);
            }
            function pd(n, t, e) {
                if (e && typeof e != "boolean" && rn(n, t, e) && (t = e = i), e === i && (typeof t == "boolean" ? (e = t, t = i) : typeof n == "boolean" && (e = n, n = i)), n === i && t === i ? (n = 0, t = 1) : (n = Xn(n), t === i ? (t = n, n = 0) : t = Xn(t)), n > t) {
                    var r = n;
                    n = t, t = r;
                }
                if (e || n % 1 || t % 1) {
                    var s = $s();
                    return nn(n + s * (t - n + zf("1e-" + ((s + "").length - 1))), t);
                }
                return ti(n, t);
            }
            var dd = Wt(function(n, t, e) {
                return t = t.toLowerCase(), n + (e ? pa(t) : t);
            });
            function pa(n) {
                return Oi($(n).toLowerCase());
            }
            function da(n) {
                return n = $(n), n && n.replace(gf, ro).replace(Hf, "");
            }
            function gd(n, t, e) {
                n = $(n), t = ln(t);
                var r = n.length;
                e = e === i ? r : gt(R(e), 0, r);
                var s = e;
                return e -= t.length, e >= 0 && n.slice(e, s) == t;
            }
            function vd(n) {
                return n = $(n), n && Ja.test(n) ? n.replace(Ki, io) : n;
            }
            function _d(n) {
                return n = $(n), n && nf.test(n) ? n.replace(Ir, "\\$&") : n;
            }
            var md = Wt(function(n, t, e) {
                return n + (e ? "-" : "") + t.toLowerCase();
            }), wd = Wt(function(n, t, e) {
                return n + (e ? " " : "") + t.toLowerCase();
            }), Pd = _u("toLowerCase");
            function Ad(n, t, e) {
                n = $(n), t = R(t);
                var r = t ? Tt(n) : 0;
                if (!t || r >= t) return n;
                var s = (t - r) / 2;
                return Xe($e(s), e) + n + Xe(Ne(s), e);
            }
            function Cd(n, t, e) {
                n = $(n), t = R(t);
                var r = t ? Tt(n) : 0;
                return t && r < t ? n + Xe(t - r, e) : n;
            }
            function Id(n, t, e) {
                n = $(n), t = R(t);
                var r = t ? Tt(n) : 0;
                return t && r < t ? Xe(t - r, e) + n : n;
            }
            function xd(n, t, e) {
                return e || t == null ? t = 0 : t && (t = +t), To($(n).replace(xr, ""), t || 0);
            }
            function Ed(n, t, e) {
                return (e ? rn(n, t, e) : t === i) ? t = 1 : t = R(t), ei($(n), t);
            }
            function yd() {
                var n = arguments, t = $(n[0]);
                return n.length < 3 ? t : t.replace(n[1], n[2]);
            }
            var Sd = Wt(function(n, t, e) {
                return n + (e ? "_" : "") + t.toLowerCase();
            });
            function Od(n, t, e) {
                return e && typeof e != "number" && rn(n, t, e) && (t = e = i), e = e === i ? Nn : e >>> 0, e ? (n = $(n), n && (typeof t == "string" || t != null && !Ei(t)) && (t = ln(t), !t && bt(n)) ? st(On(n), 0, e) : n.split(t, e)) : [];
            }
            var Rd = Wt(function(n, t, e) {
                return n + (e ? " " : "") + Oi(t);
            });
            function bd(n, t, e) {
                return n = $(n), e = e == null ? 0 : gt(R(e), 0, n.length), t = ln(t), n.slice(e, e + t.length) == t;
            }
            function Td(n, t, e) {
                var r = a.templateSettings;
                e && rn(n, t, e) && (t = i), n = $(n), t = ar({}, t, r, xu);
                var s = ar({}, t.imports, r.imports, xu), f = V(s), o = Fr(s, f), c, l, v = 0, _ = t.interpolate || Pe, m = "__p += '", w = qr((t.escape || Pe).source + "|" + _.source + "|" + (_ === Yi ? of : Pe).source + "|" + (t.evaluate || Pe).source + "|$", "g"), A = "//# sourceURL=" + (U.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ff + "]") + `
`;
                n.replace(w, function(x, L, H, dn, sn, gn) {
                    return H || (H = dn), m += n.slice(v, gn).replace(vf, so), L && (c = !0, m += `' +
__e(` + L + `) +
'`), sn && (l = !0, m += `';
` + sn + `;
__p += '`), H && (m += `' +
((__t = (` + H + `)) == null ? '' : __t) +
'`), v = gn + x.length, x;
                }), m += `';
`;
                var I = U.call(t, "variable") && t.variable;
                if (!I) m = `with (obj) {
` + m + `
}
`;
                else if (af.test(I)) throw new S(ft);
                m = (l ? m.replace(za, "") : m).replace(Ka, "$1").replace(Ya, "$1;"), m = "function(" + (I || "obj") + `) {
` + (I ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (l ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + m + `return __p
}`;
                var b = va(function() {
                    return N(f, A + "return " + m).apply(i, o);
                });
                if (b.source = m, xi(b)) throw b;
                return b;
            }
            function Ld(n) {
                return $(n).toLowerCase();
            }
            function Dd(n) {
                return $(n).toUpperCase();
            }
            function Hd(n, t, e) {
                if (n = $(n), n && (e || t === i)) return Es(n);
                if (!n || !(t = ln(t))) return n;
                var r = On(n), s = On(t), f = ys(r, s), o = Ss(r, s) + 1;
                return st(r, f, o).join("");
            }
            function Nd(n, t, e) {
                if (n = $(n), n && (e || t === i)) return n.slice(0, Rs(n) + 1);
                if (!n || !(t = ln(t))) return n;
                var r = On(n), s = Ss(r, On(t)) + 1;
                return st(r, 0, s).join("");
            }
            function $d(n, t, e) {
                if (n = $(n), n && (e || t === i)) return n.replace(xr, "");
                if (!n || !(t = ln(t))) return n;
                var r = On(n), s = ys(r, On(t));
                return st(r, s).join("");
            }
            function Ud(n, t) {
                var e = Oa, r = Ra;
                if (z(t)) {
                    var s = "separator" in t ? t.separator : s;
                    e = "length" in t ? R(t.length) : e, r = "omission" in t ? ln(t.omission) : r;
                }
                n = $(n);
                var f = n.length;
                if (bt(n)) {
                    var o = On(n);
                    f = o.length;
                }
                if (e >= f) return n;
                var c = e - Tt(r);
                if (c < 1) return r;
                var l = o ? st(o, 0, c).join("") : n.slice(0, c);
                if (s === i) return l + r;
                if (o && (c += l.length - c), Ei(s)) {
                    if (n.slice(c).search(s)) {
                        var v, _ = l;
                        for(s.global || (s = qr(s.source, $(Zi.exec(s)) + "g")), s.lastIndex = 0; v = s.exec(_);)var m = v.index;
                        l = l.slice(0, m === i ? c : m);
                    }
                } else if (n.indexOf(ln(s), c) != c) {
                    var w = l.lastIndexOf(s);
                    w > -1 && (l = l.slice(0, w));
                }
                return l + r;
            }
            function Wd(n) {
                return n = $(n), n && Za.test(n) ? n.replace(zi, lo) : n;
            }
            var Fd = Wt(function(n, t, e) {
                return n + (e ? " " : "") + t.toUpperCase();
            }), Oi = _u("toUpperCase");
            function ga(n, t, e) {
                return n = $(n), t = e ? i : t, t === i ? ao(n) ? vo(n) : kf(n) : n.match(t) || [];
            }
            var va = T(function(n, t) {
                try {
                    return cn(n, i, t);
                } catch (e) {
                    return xi(e) ? e : new S(e);
                }
            }), Md = Yn(function(n, t) {
                return mn(t, function(e) {
                    e = Wn(e), zn(n, e, Ci(n[e], n));
                }), n;
            });
            function qd(n) {
                var t = n == null ? 0 : n.length, e = C();
                return n = t ? G(n, function(r) {
                    if (typeof r[1] != "function") throw new wn(M);
                    return [
                        e(r[0]),
                        r[1]
                    ];
                }) : [], T(function(r) {
                    for(var s = -1; ++s < t;){
                        var f = n[s];
                        if (cn(f[0], this, r)) return cn(f[1], this, r);
                    }
                });
            }
            function Bd(n) {
                return pc(An(n, Ln));
            }
            function Ri(n) {
                return function() {
                    return n;
                };
            }
            function Gd(n, t) {
                return n == null || n !== n ? t : n;
            }
            var zd = wu(), Kd = wu(!0);
            function on(n) {
                return n;
            }
            function bi(n) {
                return Xs(typeof n == "function" ? n : An(n, Ln));
            }
            function Yd(n) {
                return Vs(An(n, Ln));
            }
            function Zd(n, t) {
                return ks(n, An(t, Ln));
            }
            var Jd = T(function(n, t) {
                return function(e) {
                    return ue(e, n, t);
                };
            }), Xd = T(function(n, t) {
                return function(e) {
                    return ue(n, e, t);
                };
            });
            function Ti(n, t, e) {
                var r = V(t), s = Be(t, r);
                e == null && !(z(t) && (s.length || !r.length)) && (e = t, t = n, n = this, s = Be(t, V(t)));
                var f = !(z(e) && "chain" in e) || !!e.chain, o = Jn(n);
                return mn(s, function(c) {
                    var l = t[c];
                    n[c] = l, o && (n.prototype[c] = function() {
                        var v = this.__chain__;
                        if (f || v) {
                            var _ = n(this.__wrapped__), m = _.__actions__ = un(this.__actions__);
                            return m.push({
                                func: l,
                                args: arguments,
                                thisArg: n
                            }), _.__chain__ = v, _;
                        }
                        return l.apply(n, jn([
                            this.value()
                        ], arguments));
                    });
                }), n;
            }
            function Qd() {
                return k._ === this && (k._ = Co), this;
            }
            function Li() {}
            function Vd(n) {
                return n = R(n), T(function(t) {
                    return js(t, n);
                });
            }
            var kd = oi(G), jd = oi(Ps), ng = oi(Hr);
            function _a(n) {
                return vi(n) ? Nr(Wn(n)) : bc(n);
            }
            function tg(n) {
                return function(t) {
                    return n == null ? i : vt(n, t);
                };
            }
            var eg = Au(), rg = Au(!0);
            function Di() {
                return [];
            }
            function Hi() {
                return !1;
            }
            function ig() {
                return {};
            }
            function sg() {
                return "";
            }
            function ug() {
                return !0;
            }
            function ag(n, t) {
                if (n = R(n), n < 1 || n > Vn) return [];
                var e = Nn, r = nn(n, Nn);
                t = C(t), n -= Nn;
                for(var s = Wr(r, t); ++e < n;)t(e);
                return s;
            }
            function fg(n) {
                return O(n) ? G(n, Wn) : pn(n) ? [
                    n
                ] : un(Uu($(n)));
            }
            function og(n) {
                var t = ++Po;
                return $(n) + t;
            }
            var cg = Je(function(n, t) {
                return n + t;
            }, 0), hg = ci("ceil"), lg = Je(function(n, t) {
                return n / t;
            }, 1), pg = ci("floor");
            function dg(n) {
                return n && n.length ? qe(n, on, Xr) : i;
            }
            function gg(n, t) {
                return n && n.length ? qe(n, C(t, 2), Xr) : i;
            }
            function vg(n) {
                return Is(n, on);
            }
            function _g(n, t) {
                return Is(n, C(t, 2));
            }
            function mg(n) {
                return n && n.length ? qe(n, on, jr) : i;
            }
            function wg(n, t) {
                return n && n.length ? qe(n, C(t, 2), jr) : i;
            }
            var Pg = Je(function(n, t) {
                return n * t;
            }, 1), Ag = ci("round"), Cg = Je(function(n, t) {
                return n - t;
            }, 0);
            function Ig(n) {
                return n && n.length ? Ur(n, on) : 0;
            }
            function xg(n, t) {
                return n && n.length ? Ur(n, C(t, 2)) : 0;
            }
            return a.after = Yl, a.ary = Ju, a.assign = Dp, a.assignIn = fa, a.assignInWith = ar, a.assignWith = Hp, a.at = Np, a.before = Xu, a.bind = Ci, a.bindAll = Md, a.bindKey = Qu, a.castArray = ip, a.chain = Ku, a.chunk = ph, a.compact = dh, a.concat = gh, a.cond = qd, a.conforms = Bd, a.constant = Ri, a.countBy = Il, a.create = $p, a.curry = Vu, a.curryRight = ku, a.debounce = ju, a.defaults = Up, a.defaultsDeep = Wp, a.defer = Zl, a.delay = Jl, a.difference = vh, a.differenceBy = _h, a.differenceWith = mh, a.drop = wh, a.dropRight = Ph, a.dropRightWhile = Ah, a.dropWhile = Ch, a.fill = Ih, a.filter = El, a.flatMap = Ol, a.flatMapDeep = Rl, a.flatMapDepth = bl, a.flatten = qu, a.flattenDeep = xh, a.flattenDepth = Eh, a.flip = Xl, a.flow = zd, a.flowRight = Kd, a.fromPairs = yh, a.functions = Kp, a.functionsIn = Yp, a.groupBy = Tl, a.initial = Oh, a.intersection = Rh, a.intersectionBy = bh, a.intersectionWith = Th, a.invert = Jp, a.invertBy = Xp, a.invokeMap = Dl, a.iteratee = bi, a.keyBy = Hl, a.keys = V, a.keysIn = fn, a.map = tr, a.mapKeys = Vp, a.mapValues = kp, a.matches = Yd, a.matchesProperty = Zd, a.memoize = rr, a.merge = jp, a.mergeWith = oa, a.method = Jd, a.methodOf = Xd, a.mixin = Ti, a.negate = ir, a.nthArg = Vd, a.omit = nd, a.omitBy = td, a.once = Ql, a.orderBy = Nl, a.over = kd, a.overArgs = Vl, a.overEvery = jd, a.overSome = ng, a.partial = Ii, a.partialRight = na, a.partition = $l, a.pick = ed, a.pickBy = ca, a.property = _a, a.propertyOf = tg, a.pull = Nh, a.pullAll = Gu, a.pullAllBy = $h, a.pullAllWith = Uh, a.pullAt = Wh, a.range = eg, a.rangeRight = rg, a.rearg = kl, a.reject = Fl, a.remove = Fh, a.rest = jl, a.reverse = Pi, a.sampleSize = ql, a.set = id, a.setWith = sd, a.shuffle = Bl, a.slice = Mh, a.sortBy = Kl, a.sortedUniq = Zh, a.sortedUniqBy = Jh, a.split = Od, a.spread = np, a.tail = Xh, a.take = Qh, a.takeRight = Vh, a.takeRightWhile = kh, a.takeWhile = jh, a.tap = dl, a.throttle = tp, a.thru = nr, a.toArray = sa, a.toPairs = ha, a.toPairsIn = la, a.toPath = fg, a.toPlainObject = aa, a.transform = ud, a.unary = ep, a.union = nl, a.unionBy = tl, a.unionWith = el, a.uniq = rl, a.uniqBy = il, a.uniqWith = sl, a.unset = ad, a.unzip = Ai, a.unzipWith = zu, a.update = fd, a.updateWith = od, a.values = qt, a.valuesIn = cd, a.without = ul, a.words = ga, a.wrap = rp, a.xor = al, a.xorBy = fl, a.xorWith = ol, a.zip = cl, a.zipObject = hl, a.zipObjectDeep = ll, a.zipWith = pl, a.entries = ha, a.entriesIn = la, a.extend = fa, a.extendWith = ar, Ti(a, a), a.add = cg, a.attempt = va, a.camelCase = dd, a.capitalize = pa, a.ceil = hg, a.clamp = hd, a.clone = sp, a.cloneDeep = ap, a.cloneDeepWith = fp, a.cloneWith = up, a.conformsTo = op, a.deburr = da, a.defaultTo = Gd, a.divide = lg, a.endsWith = gd, a.eq = bn, a.escape = vd, a.escapeRegExp = _d, a.every = xl, a.find = yl, a.findIndex = Fu, a.findKey = Fp, a.findLast = Sl, a.findLastIndex = Mu, a.findLastKey = Mp, a.floor = pg, a.forEach = Yu, a.forEachRight = Zu, a.forIn = qp, a.forInRight = Bp, a.forOwn = Gp, a.forOwnRight = zp, a.get = yi, a.gt = cp, a.gte = hp, a.has = Zp, a.hasIn = Si, a.head = Bu, a.identity = on, a.includes = Ll, a.indexOf = Sh, a.inRange = ld, a.invoke = Qp, a.isArguments = wt, a.isArray = O, a.isArrayBuffer = lp, a.isArrayLike = an, a.isArrayLikeObject = Y, a.isBoolean = pp, a.isBuffer = ut, a.isDate = dp, a.isElement = gp, a.isEmpty = vp, a.isEqual = _p, a.isEqualWith = mp, a.isError = xi, a.isFinite = wp, a.isFunction = Jn, a.isInteger = ta, a.isLength = sr, a.isMap = ea, a.isMatch = Pp, a.isMatchWith = Ap, a.isNaN = Cp, a.isNative = Ip, a.isNil = Ep, a.isNull = xp, a.isNumber = ra, a.isObject = z, a.isObjectLike = K, a.isPlainObject = le, a.isRegExp = Ei, a.isSafeInteger = yp, a.isSet = ia, a.isString = ur, a.isSymbol = pn, a.isTypedArray = Mt, a.isUndefined = Sp, a.isWeakMap = Op, a.isWeakSet = Rp, a.join = Lh, a.kebabCase = md, a.last = In, a.lastIndexOf = Dh, a.lowerCase = wd, a.lowerFirst = Pd, a.lt = bp, a.lte = Tp, a.max = dg, a.maxBy = gg, a.mean = vg, a.meanBy = _g, a.min = mg, a.minBy = wg, a.stubArray = Di, a.stubFalse = Hi, a.stubObject = ig, a.stubString = sg, a.stubTrue = ug, a.multiply = Pg, a.nth = Hh, a.noConflict = Qd, a.noop = Li, a.now = er, a.pad = Ad, a.padEnd = Cd, a.padStart = Id, a.parseInt = xd, a.random = pd, a.reduce = Ul, a.reduceRight = Wl, a.repeat = Ed, a.replace = yd, a.result = rd, a.round = Ag, a.runInContext = h, a.sample = Ml, a.size = Gl, a.snakeCase = Sd, a.some = zl, a.sortedIndex = qh, a.sortedIndexBy = Bh, a.sortedIndexOf = Gh, a.sortedLastIndex = zh, a.sortedLastIndexBy = Kh, a.sortedLastIndexOf = Yh, a.startCase = Rd, a.startsWith = bd, a.subtract = Cg, a.sum = Ig, a.sumBy = xg, a.template = Td, a.times = ag, a.toFinite = Xn, a.toInteger = R, a.toLength = ua, a.toLower = Ld, a.toNumber = xn, a.toSafeInteger = Lp, a.toString = $, a.toUpper = Dd, a.trim = Hd, a.trimEnd = Nd, a.trimStart = $d, a.truncate = Ud, a.unescape = Wd, a.uniqueId = og, a.upperCase = Fd, a.upperFirst = Oi, a.each = Yu, a.eachRight = Zu, a.first = Bu, Ti(a, function() {
                var n = {};
                return $n(a, function(t, e) {
                    U.call(a.prototype, e) || (n[e] = t);
                }), n;
            }(), {
                chain: !1
            }), a.VERSION = p, mn([
                "bind",
                "bindKey",
                "curry",
                "curryRight",
                "partial",
                "partialRight"
            ], function(n) {
                a[n].placeholder = a;
            }), mn([
                "drop",
                "take"
            ], function(n, t) {
                D.prototype[n] = function(e) {
                    e = e === i ? 1 : Q(R(e), 0);
                    var r = this.__filtered__ && !t ? new D(this) : this.clone();
                    return r.__filtered__ ? r.__takeCount__ = nn(e, r.__takeCount__) : r.__views__.push({
                        size: nn(e, Nn),
                        type: n + (r.__dir__ < 0 ? "Right" : "")
                    }), r;
                }, D.prototype[n + "Right"] = function(e) {
                    return this.reverse()[n](e).reverse();
                };
            }), mn([
                "filter",
                "map",
                "takeWhile"
            ], function(n, t) {
                var e = t + 1, r = e == qi || e == Da;
                D.prototype[n] = function(s) {
                    var f = this.clone();
                    return f.__iteratees__.push({
                        iteratee: C(s, 3),
                        type: e
                    }), f.__filtered__ = f.__filtered__ || r, f;
                };
            }), mn([
                "head",
                "last"
            ], function(n, t) {
                var e = "take" + (t ? "Right" : "");
                D.prototype[n] = function() {
                    return this[e](1).value()[0];
                };
            }), mn([
                "initial",
                "tail"
            ], function(n, t) {
                var e = "drop" + (t ? "" : "Right");
                D.prototype[n] = function() {
                    return this.__filtered__ ? new D(this) : this[e](1);
                };
            }), D.prototype.compact = function() {
                return this.filter(on);
            }, D.prototype.find = function(n) {
                return this.filter(n).head();
            }, D.prototype.findLast = function(n) {
                return this.reverse().find(n);
            }, D.prototype.invokeMap = T(function(n, t) {
                return typeof n == "function" ? new D(this) : this.map(function(e) {
                    return ue(e, n, t);
                });
            }), D.prototype.reject = function(n) {
                return this.filter(ir(C(n)));
            }, D.prototype.slice = function(n, t) {
                n = R(n);
                var e = this;
                return e.__filtered__ && (n > 0 || t < 0) ? new D(e) : (n < 0 ? e = e.takeRight(-n) : n && (e = e.drop(n)), t !== i && (t = R(t), e = t < 0 ? e.dropRight(-t) : e.take(t - n)), e);
            }, D.prototype.takeRightWhile = function(n) {
                return this.reverse().takeWhile(n).reverse();
            }, D.prototype.toArray = function() {
                return this.take(Nn);
            }, $n(D.prototype, function(n, t) {
                var e = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), s = a[r ? "take" + (t == "last" ? "Right" : "") : t], f = r || /^find/.test(t);
                s && (a.prototype[t] = function() {
                    var o = this.__wrapped__, c = r ? [
                        1
                    ] : arguments, l = o instanceof D, v = c[0], _ = l || O(o), m = function(L) {
                        var H = s.apply(a, jn([
                            L
                        ], c));
                        return r && w ? H[0] : H;
                    };
                    _ && e && typeof v == "function" && v.length != 1 && (l = _ = !1);
                    var w = this.__chain__, A = !!this.__actions__.length, I = f && !w, b = l && !A;
                    if (!f && _) {
                        o = b ? o : new D(this);
                        var x = n.apply(o, c);
                        return x.__actions__.push({
                            func: nr,
                            args: [
                                m
                            ],
                            thisArg: i
                        }), new Pn(x, w);
                    }
                    return I && b ? n.apply(this, c) : (x = this.thru(m), I ? r ? x.value()[0] : x.value() : x);
                });
            }), mn([
                "pop",
                "push",
                "shift",
                "sort",
                "splice",
                "unshift"
            ], function(n) {
                var t = ye[n], e = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
                a.prototype[n] = function() {
                    var s = arguments;
                    if (r && !this.__chain__) {
                        var f = this.value();
                        return t.apply(O(f) ? f : [], s);
                    }
                    return this[e](function(o) {
                        return t.apply(O(o) ? o : [], s);
                    });
                };
            }), $n(D.prototype, function(n, t) {
                var e = a[t];
                if (e) {
                    var r = e.name + "";
                    U.call(Nt, r) || (Nt[r] = []), Nt[r].push({
                        name: t,
                        func: e
                    });
                }
            }), Nt[Ze(i, ot).name] = [
                {
                    name: "wrapper",
                    func: i
                }
            ], D.prototype.clone = Wo, D.prototype.reverse = Fo, D.prototype.value = Mo, a.prototype.at = gl, a.prototype.chain = vl, a.prototype.commit = _l, a.prototype.next = ml, a.prototype.plant = Pl, a.prototype.reverse = Al, a.prototype.toJSON = a.prototype.valueOf = a.prototype.value = Cl, a.prototype.first = a.prototype.head, jt && (a.prototype[jt] = wl), a;
        }, Lt = _o();
        ht ? ((ht.exports = Lt)._ = Lt, br._ = Lt) : k._ = Lt;
    }).call(pe);
})($i, $i.exports);
var Wg = Object.defineProperty, Fg = Object.defineProperties, Mg = Object.getOwnPropertyDescriptors, Ca = Object.getOwnPropertySymbols, qg = Object.prototype.hasOwnProperty, Bg = Object.prototype.propertyIsEnumerable, Ia = (E, u, i)=>u in E ? Wg(E, u, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : E[u] = i, or = (E, u)=>{
    for(var i in u || (u = {}))qg.call(u, i) && Ia(E, i, u[i]);
    if (Ca) for (var i of Ca(u))Bg.call(u, i) && Ia(E, i, u[i]);
    return E;
}, Gg = (E, u)=>Fg(E, Mg(u));
function En(E, u, i) {
    let p;
    const y = Ui(E);
    return u.rpcMap && (p = u.rpcMap[y]), p || (p = `${Ug}?chainId=eip155:${y}&projectId=${i}`), p;
}
function Ui(E) {
    return E.includes("eip155") ? Number(E.split(":")[1]) : Number(E);
}
function zg(E) {
    return E.map((u)=>`${u.split(":")[0]}:${u.split(":")[1]}`);
}
function Kg(E, u) {
    const i = Object.keys(u.namespaces).filter((y)=>y.includes(E));
    if (!i.length) return [];
    const p = [];
    return i.forEach((y)=>{
        const W = u.namespaces[y].accounts;
        p.push(...W);
    }), p;
}
function Yg(E, u = {}) {
    const i = xa(E), p = xa(u);
    return $i.exports.merge(i, p);
}
function xa(E) {
    var u, i, p, y;
    const W = {};
    if (!(0, _utils.isValidObject)(E)) return W;
    for (const [M, ft] of Object.entries(E)){
        const Gt = (0, _utils.isCaipNamespace)(M) ? [
            M
        ] : ft.chains, lr = ft.methods || [], At = ft.events || [], Ln = ft.rpcMap || {}, Fn = (0, _utils.parseNamespaceKey)(M);
        W[Fn] = Gg(or(or({}, W[Fn]), ft), {
            chains: (0, _utils.mergeArrays)(Gt, (u = W[Fn]) == null ? void 0 : u.chains),
            methods: (0, _utils.mergeArrays)(lr, (i = W[Fn]) == null ? void 0 : i.methods),
            events: (0, _utils.mergeArrays)(At, (p = W[Fn]) == null ? void 0 : p.events),
            rpcMap: or(or({}, Ln), (y = W[Fn]) == null ? void 0 : y.rpcMap)
        });
    }
    return W;
}
const Ea = {}, J = (E)=>Ea[E], Wi = (E, u)=>{
    Ea[E] = u;
};
class Zg {
    constructor(u){
        this.name = "polkadot", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    setDefaultChain(u, i) {
        if (this.chainId = u, !this.httpProviders[u]) {
            const p = i || En(`${this.name}:${u}`, this.namespace);
            if (!p) throw new Error(`No RPC url provided for chainId: ${u}`);
            this.setHttpProvider(u, p);
        }
        this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            var p;
            u[i] = this.createHttpProvider(i, (p = this.namespace.rpcMap) == null ? void 0 : p[i]);
        }), u;
    }
    getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProvider(u, i) {
        const p = i || En(u, this.namespace);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnectionDefault.default)(p, J("disableProviderPing")));
    }
}
class Jg {
    constructor(u){
        this.name = "eip155", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
    }
    async request(u) {
        switch(u.request.method){
            case "eth_requestAccounts":
                return this.getAccounts();
            case "eth_accounts":
                return this.getAccounts();
            case "wallet_switchEthereumChain":
                return await this.handleSwitchChain(u);
            case "eth_chainId":
                return parseInt(this.getDefaultChain());
        }
        return this.namespace.methods.includes(u.request.method) ? await this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    setDefaultChain(u, i) {
        const p = Ui(u);
        if (!this.httpProviders[p]) {
            const y = i || En(`${this.name}:${p}`, this.namespace, this.client.core.projectId);
            if (!y) throw new Error(`No RPC url provided for chainId: ${p}`);
            this.setHttpProvider(p, y);
        }
        this.chainId = p, this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${p}`);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId.toString();
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    createHttpProvider(u, i) {
        const p = i || En(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnection.HttpConnection)(p, J("disableProviderPing")));
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            var p;
            const y = Ui(i);
            u[y] = this.createHttpProvider(y, (p = this.namespace.rpcMap) == null ? void 0 : p[i]);
        }), u;
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? [
            ...new Set(u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]))
        ] : [];
    }
    getHttpProvider() {
        const u = this.chainId, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    async handleSwitchChain(u) {
        var i;
        let p = u.request.params ? (i = u.request.params[0]) == null ? void 0 : i.chainId : "0x0";
        p = p.startsWith("0x") ? p : `0x${p}`;
        const y = parseInt(p, 16);
        if (this.isChainApproved(y)) this.setDefaultChain(`${y}`);
        else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({
            topic: u.topic,
            request: {
                method: u.request.method,
                params: [
                    {
                        chainId: p
                    }
                ]
            },
            chainId: u.chainId
        }), this.setDefaultChain(`${y}`);
        else throw new Error(`Failed to switch to chain 'eip155:${y}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
        return null;
    }
    isChainApproved(u) {
        return this.namespace.chains.includes(`${this.name}:${u}`);
    }
}
class Xg {
    constructor(u){
        this.name = "solana", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    setDefaultChain(u, i) {
        if (!this.httpProviders[u]) {
            const p = i || En(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
            if (!p) throw new Error(`No RPC url provided for chainId: ${u}`);
            this.setHttpProvider(u, p);
        }
        this.chainId = u, this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? [
            ...new Set(u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            var p;
            u[i] = this.createHttpProvider(i, (p = this.namespace.rpcMap) == null ? void 0 : p[i]);
        }), u;
    }
    getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProvider(u, i) {
        const p = i || En(u, this.namespace, this.client.core.projectId);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnectionDefault.default)(p, J("disableProviderPing")));
    }
}
class Qg {
    constructor(u){
        this.name = "cosmos", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    setDefaultChain(u, i) {
        if (this.chainId = u, !this.httpProviders[u]) {
            const p = i || En(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
            if (!p) throw new Error(`No RPC url provided for chainId: ${u}`);
            this.setHttpProvider(u, p);
        }
        this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? [
            ...new Set(u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            var p;
            u[i] = this.createHttpProvider(i, (p = this.namespace.rpcMap) == null ? void 0 : p[i]);
        }), u;
    }
    getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProvider(u, i) {
        const p = i || En(u, this.namespace, this.client.core.projectId);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnectionDefault.default)(p, J("disableProviderPing")));
    }
}
class Vg {
    constructor(u){
        this.name = "cip34", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    setDefaultChain(u, i) {
        if (this.chainId = u, !this.httpProviders[u]) {
            const p = i || this.getCardanoRPCUrl(u);
            if (!p) throw new Error(`No RPC url provided for chainId: ${u}`);
            this.setHttpProvider(u, p);
        }
        this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? [
            ...new Set(u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            const p = this.getCardanoRPCUrl(i);
            u[i] = this.createHttpProvider(i, p);
        }), u;
    }
    getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    getCardanoRPCUrl(u) {
        const i = this.namespace.rpcMap;
        if (i) return i[u];
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProvider(u, i) {
        const p = i || this.getCardanoRPCUrl(u);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnectionDefault.default)(p, J("disableProviderPing")));
    }
}
class kg {
    constructor(u){
        this.name = "elrond", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    setDefaultChain(u, i) {
        if (!this.httpProviders[u]) {
            const p = i || En(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
            if (!p) throw new Error(`No RPC url provided for chainId: ${u}`);
            this.setHttpProvider(u, p);
        }
        this.chainId = u, this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? [
            ...new Set(u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            var p;
            u[i] = this.createHttpProvider(i, (p = this.namespace.rpcMap) == null ? void 0 : p[i]);
        }), u;
    }
    getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProvider(u, i) {
        const p = i || En(u, this.namespace, this.client.core.projectId);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnectionDefault.default)(p, J("disableProviderPing")));
    }
}
class jg {
    constructor(u){
        this.name = "multiversx", this.namespace = u.namespace, this.events = J("events"), this.client = J("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
    }
    setDefaultChain(u, i) {
        if (!this.httpProviders[u]) {
            const p = i || En(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
            if (!p) throw new Error(`No RPC url provided for chainId: ${u}`);
            this.setHttpProvider(u, p);
        }
        this.chainId = u, this.events.emit(at.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u) throw new Error("ChainId not found");
        return u.split(":")[1];
    }
    getAccounts() {
        const u = this.namespace.accounts;
        return u ? [
            ...new Set(u.filter((i)=>i.split(":")[1] === this.chainId.toString()).map((i)=>i.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i)=>{
            var p;
            u[i] = this.createHttpProvider(i, (p = this.namespace.rpcMap) == null ? void 0 : p[i]);
        }), u;
    }
    getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
    }
    setHttpProvider(u, i) {
        const p = this.createHttpProvider(u, i);
        p && (this.httpProviders[u] = p);
    }
    createHttpProvider(u, i) {
        const p = i || En(u, this.namespace, this.client.core.projectId);
        return typeof p > "u" ? void 0 : new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcHttpConnectionDefault.default)(p, J("disableProviderPing")));
    }
}
var nv = Object.defineProperty, tv = Object.defineProperties, ev = Object.getOwnPropertyDescriptors, ya = Object.getOwnPropertySymbols, rv = Object.prototype.hasOwnProperty, iv = Object.prototype.propertyIsEnumerable, Sa = (E, u, i)=>u in E ? nv(E, u, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : E[u] = i, cr = (E, u)=>{
    for(var i in u || (u = {}))rv.call(u, i) && Sa(E, i, u[i]);
    if (ya) for (var i of ya(u))iv.call(u, i) && Sa(E, i, u[i]);
    return E;
}, Fi = (E, u)=>tv(E, ev(u));
class hr {
    constructor(u){
        this.events = new (0, _eventsDefault.default), this.rpcProviders = {}, this.shouldAbortPairingAttempt = !1, this.maxPairingAttempts = 10, this.disableProviderPing = !1, this.providerOpts = u, this.logger = typeof u?.logger < "u" && typeof u?.logger != "string" ? u.logger : (0, _logger.pino)((0, _logger.getDefaultLoggerOptions)({
            level: u?.logger || Pa
        })), this.disableProviderPing = u?.disableProviderPing || !1;
    }
    static async init(u) {
        const i = new hr(u);
        return await i.initialize(), i;
    }
    async request(u, i) {
        const [p, y] = this.validateChain(i);
        if (!this.session) throw new Error("Please call connect() before request()");
        return await this.getProvider(p).request({
            request: cr({}, u),
            chainId: `${p}:${y}`,
            topic: this.session.topic
        });
    }
    sendAsync(u, i, p) {
        this.request(u, p).then((y)=>i(null, y)).catch((y)=>i(y, void 0));
    }
    async enable() {
        if (!this.client) throw new Error("Sign Client not initialized");
        return this.session || await this.connect({
            namespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties
        }), await this.requestAccounts();
    }
    async disconnect() {
        var u;
        if (!this.session) throw new Error("Please call connect() before enable()");
        await this.client.disconnect({
            topic: (u = this.session) == null ? void 0 : u.topic,
            reason: (0, _utils.getSdkError)("USER_DISCONNECTED")
        }), await this.cleanup();
    }
    async connect(u) {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (this.setNamespaces(u), await this.cleanupPendingPairings(), !u.skipPairing) return await this.pair(u.pairingTopic);
    }
    on(u, i) {
        this.events.on(u, i);
    }
    once(u, i) {
        this.events.once(u, i);
    }
    removeListener(u, i) {
        this.events.removeListener(u, i);
    }
    off(u, i) {
        this.events.off(u, i);
    }
    get isWalletConnect() {
        return !0;
    }
    async pair(u) {
        this.shouldAbortPairingAttempt = !1;
        let i = 0;
        do {
            if (this.shouldAbortPairingAttempt) throw new Error("Pairing aborted");
            if (i >= this.maxPairingAttempts) throw new Error("Max auto pairing attempts reached");
            const { uri: p, approval: y } = await this.client.connect({
                pairingTopic: u,
                requiredNamespaces: this.namespaces,
                optionalNamespaces: this.optionalNamespaces,
                sessionProperties: this.sessionProperties
            });
            p && (this.uri = p, this.events.emit("display_uri", p)), await y().then((W)=>{
                this.session = W;
            }).catch((W)=>{
                if (W.message !== (0, _signClient.PROPOSAL_EXPIRY_MESSAGE)) throw W;
                i++;
            });
        }while (!this.session);
        return this.onConnect(), this.session;
    }
    setDefaultChain(u, i) {
        try {
            const [p, y] = this.validateChain(u);
            this.getProvider(p).setDefaultChain(y, i);
        } catch (p) {
            if (!/Please call connect/.test(p.message)) throw p;
        }
    }
    async cleanupPendingPairings(u = {}) {
        this.logger.info("Cleaning up inactive pairings...");
        const i = this.client.pairing.getAll();
        if ((0, _utils.isValidArray)(i)) {
            for (const p of i)u.deletePairings ? this.client.core.expirer.set(p.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(p.topic);
            this.logger.info(`Inactive pairings cleared: ${i.length}`);
        }
    }
    abortPairingAttempt() {
        this.shouldAbortPairingAttempt = !0;
    }
    async checkStorage() {
        if (this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.client.session.length) {
            const u = this.client.session.keys.length - 1;
            this.session = this.client.session.get(this.client.session.keys[u]), this.createProviders();
        }
    }
    async initialize() {
        this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
    }
    async createClient() {
        this.client = this.providerOpts.client || await (0, _signClientDefault.default).init({
            logger: this.providerOpts.logger || Pa,
            relayUrl: this.providerOpts.relayUrl || Hg,
            projectId: this.providerOpts.projectId,
            metadata: this.providerOpts.metadata,
            storageOptions: this.providerOpts.storageOptions,
            name: this.providerOpts.name
        }), this.logger.trace("SignClient Initialized");
    }
    createProviders() {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
        const u = [
            ...new Set(Object.keys(this.session.namespaces).map((i)=>(0, _utils.parseNamespaceKey)(i)))
        ];
        Wi("client", this.client), Wi("events", this.events), Wi("disableProviderPing", this.disableProviderPing), u.forEach((i)=>{
            if (!this.session) return;
            const p = Kg(i, this.session), y = zg(p), W = Yg(this.namespaces, this.optionalNamespaces), M = Fi(cr({}, W[i]), {
                accounts: p,
                chains: y
            });
            switch(i){
                case "eip155":
                    this.rpcProviders[i] = new Jg({
                        namespace: M
                    });
                    break;
                case "solana":
                    this.rpcProviders[i] = new Xg({
                        namespace: M
                    });
                    break;
                case "cosmos":
                    this.rpcProviders[i] = new Qg({
                        namespace: M
                    });
                    break;
                case "polkadot":
                    this.rpcProviders[i] = new Zg({
                        namespace: M
                    });
                    break;
                case "cip34":
                    this.rpcProviders[i] = new Vg({
                        namespace: M
                    });
                    break;
                case "elrond":
                    this.rpcProviders[i] = new kg({
                        namespace: M
                    });
                    break;
                case "multiversx":
                    this.rpcProviders[i] = new jg({
                        namespace: M
                    });
                    break;
            }
        });
    }
    registerEventListeners() {
        if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
        this.client.on("session_ping", (u)=>{
            this.events.emit("session_ping", u);
        }), this.client.on("session_event", (u)=>{
            const { params: i } = u, { event: p } = i;
            p.name === "accountsChanged" ? this.events.emit("accountsChanged", p.data) : p.name === "chainChanged" ? this.onChainChanged(i.chainId) : this.events.emit(p.name, p.data), this.events.emit("session_event", u);
        }), this.client.on("session_update", ({ topic: u, params: i })=>{
            var p;
            const { namespaces: y } = i, W = (p = this.client) == null ? void 0 : p.session.get(u);
            this.session = Fi(cr({}, W), {
                namespaces: y
            }), this.onSessionUpdate(), this.events.emit("session_update", {
                topic: u,
                params: i
            });
        }), this.client.on("session_delete", async (u)=>{
            await this.cleanup(), this.events.emit("session_delete", u), this.events.emit("disconnect", Fi(cr({}, (0, _utils.getSdkError)("USER_DISCONNECTED")), {
                data: u.topic
            }));
        }), this.on(at.DEFAULT_CHAIN_CHANGED, (u)=>{
            this.onChainChanged(u, !0);
        });
    }
    getProvider(u) {
        if (!this.rpcProviders[u]) throw new Error(`Provider not found: ${u}`);
        return this.rpcProviders[u];
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((u)=>{
            var i;
            this.getProvider(u).updateNamespace((i = this.session) == null ? void 0 : i.namespaces[u]);
        });
    }
    setNamespaces(u) {
        const { namespaces: i, optionalNamespaces: p, sessionProperties: y } = u;
        if (!i || !Object.keys(i).length) throw new Error("Namespaces must be not empty");
        this.namespaces = i, this.optionalNamespaces = p, this.sessionProperties = y, this.persist("namespaces", i), this.persist("optionalNamespaces", p);
    }
    validateChain(u) {
        const [i, p] = u?.split(":") || [
            "",
            ""
        ];
        if (i && !Object.keys(this.namespaces).map((M)=>(0, _utils.parseNamespaceKey)(M)).includes(i)) throw new Error(`Namespace '${i}' is not configured. Please call connect() first with namespace config.`);
        if (i && p) return [
            i,
            p
        ];
        const y = (0, _utils.parseNamespaceKey)(Object.keys(this.namespaces)[0]), W = this.rpcProviders[y].getDefaultChain();
        return [
            y,
            W
        ];
    }
    async requestAccounts() {
        const [u] = this.validateChain();
        return await this.getProvider(u).requestAccounts();
    }
    onChainChanged(u, i = !1) {
        var p;
        const [y, W] = this.validateChain(u);
        i || this.getProvider(y).setDefaultChain(W), ((p = this.namespaces[y]) != null ? p : this.namespaces[`${y}:${W}`]).defaultChain = W, this.persist("namespaces", this.namespaces), this.events.emit("chainChanged", W);
    }
    onConnect() {
        this.createProviders(), this.events.emit("connect", {
            session: this.session
        });
    }
    async cleanup() {
        this.session = void 0, await this.cleanupPendingPairings({
            deletePairings: !0
        });
    }
    persist(u, i) {
        this.client.core.storage.setItem(`${Aa}/${u}`, i);
    }
    async getFromStore(u) {
        return await this.client.core.storage.getItem(`${Aa}/${u}`);
    }
}
const sv = hr;

},{"@walletconnect/sign-client":"jFnQj","@walletconnect/utils":"o3k5L","@walletconnect/logger":"bTcqM","@walletconnect/jsonrpc-http-connection":"dtBb9","@walletconnect/jsonrpc-provider":"6zGTK","events":"1VQLm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jFnQj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ENGINE_CONTEXT", ()=>ne);
parcelHelpers.export(exports, "ENGINE_RPC_OPTS", ()=>O);
parcelHelpers.export(exports, "HISTORY_CONTEXT", ()=>Be);
parcelHelpers.export(exports, "HISTORY_EVENTS", ()=>Fe);
parcelHelpers.export(exports, "HISTORY_STORAGE_VERSION", ()=>We);
parcelHelpers.export(exports, "METHODS_TO_VERIFY", ()=>oe);
parcelHelpers.export(exports, "PROPOSAL_CONTEXT", ()=>se);
parcelHelpers.export(exports, "PROPOSAL_EXPIRY", ()=>Qe);
parcelHelpers.export(exports, "PROPOSAL_EXPIRY_MESSAGE", ()=>te);
parcelHelpers.export(exports, "REQUEST_CONTEXT", ()=>re);
parcelHelpers.export(exports, "SESSION_CONTEXT", ()=>ie);
parcelHelpers.export(exports, "SESSION_EXPIRY", ()=>C);
parcelHelpers.export(exports, "SESSION_REQUEST_EXPIRY_BOUNDARIES", ()=>$);
parcelHelpers.export(exports, "SIGN_CLIENT_CONTEXT", ()=>X);
parcelHelpers.export(exports, "SIGN_CLIENT_DEFAULT", ()=>G);
parcelHelpers.export(exports, "SIGN_CLIENT_EVENTS", ()=>Xe);
parcelHelpers.export(exports, "SIGN_CLIENT_PROTOCOL", ()=>j);
parcelHelpers.export(exports, "SIGN_CLIENT_STORAGE_OPTIONS", ()=>He);
parcelHelpers.export(exports, "SIGN_CLIENT_STORAGE_PREFIX", ()=>b);
parcelHelpers.export(exports, "SIGN_CLIENT_VERSION", ()=>J);
parcelHelpers.export(exports, "SignClient", ()=>cs);
parcelHelpers.export(exports, "WALLETCONNECT_DEEPLINK_CHOICE", ()=>ee);
parcelHelpers.export(exports, "default", ()=>M);
var _core = require("@walletconnect/core");
var _logger = require("@walletconnect/logger");
var _types = require("@walletconnect/types");
var _utils = require("@walletconnect/utils");
var _events = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events);
var _time = require("@walletconnect/time");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
const j = "wc", J = 2, X = "client", b = `${j}@${J}:${X}:`, G = {
    name: X,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.com"
}, Xe = {
    session_proposal: "session_proposal",
    session_update: "session_update",
    session_extend: "session_extend",
    session_ping: "session_ping",
    session_delete: "session_delete",
    session_expire: "session_expire",
    session_request: "session_request",
    session_request_sent: "session_request_sent",
    session_event: "session_event",
    proposal_expire: "proposal_expire"
}, He = {
    database: ":memory:"
}, ee = "WALLETCONNECT_DEEPLINK_CHOICE", Fe = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}, Be = "history", We = "0.3", se = "proposal", Qe = (0, _time.THIRTY_DAYS), te = "Proposal expired", ie = "session", C = (0, _time.SEVEN_DAYS), ne = "engine", O = {
    wc_sessionPropose: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !0,
            tag: 1100
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1101
        }
    },
    wc_sessionSettle: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1102
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1103
        }
    },
    wc_sessionUpdate: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1104
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1105
        }
    },
    wc_sessionExtend: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1106
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1107
        }
    },
    wc_sessionRequest: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !0,
            tag: 1108
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1109
        }
    },
    wc_sessionEvent: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !0,
            tag: 1110
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1111
        }
    },
    wc_sessionDelete: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1112
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1113
        }
    },
    wc_sessionPing: {
        req: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1114
        },
        res: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1115
        }
    }
}, $ = {
    min: (0, _time.FIVE_MINUTES),
    max: (0, _time.SEVEN_DAYS)
}, re = "request", oe = [
    "wc_sessionPropose",
    "wc_sessionRequest",
    "wc_authRequest"
];
var Ze = Object.defineProperty, es = Object.defineProperties, ss = Object.getOwnPropertyDescriptors, ae = Object.getOwnPropertySymbols, ts = Object.prototype.hasOwnProperty, is = Object.prototype.propertyIsEnumerable, ce = (d, n, e)=>n in d ? Ze(d, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : d[n] = e, w = (d, n)=>{
    for(var e in n || (n = {}))ts.call(n, e) && ce(d, e, n[e]);
    if (ae) for (var e of ae(n))is.call(n, e) && ce(d, e, n[e]);
    return d;
}, H = (d, n)=>es(d, ss(n));
class ns extends (0, _types.IEngine) {
    constructor(n){
        super(n), this.name = ne, this.events = new (0, _eventsDefault.default), this.initialized = !1, this.ignoredPayloadTypes = [
            (0, _utils.TYPE_1)
        ], this.init = async ()=>{
            this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.client.core.pairing.register({
                methods: Object.keys(O)
            }), this.initialized = !0);
        }, this.connect = async (e)=>{
            this.isInitialized();
            const s = H(w({}, e), {
                requiredNamespaces: e.requiredNamespaces || {},
                optionalNamespaces: e.optionalNamespaces || {}
            });
            await this.isValidConnect(s);
            const { pairingTopic: t, requiredNamespaces: i, optionalNamespaces: r, sessionProperties: o, relays: a } = s;
            let l = t, h, I = !1;
            if (l && (I = this.client.core.pairing.pairings.get(l).active), !l || !I) {
                const { topic: v, uri: y } = await this.client.core.pairing.create();
                l = v, h = y;
            }
            const g = await this.client.core.crypto.generateKeyPair(), E = w({
                requiredNamespaces: i,
                optionalNamespaces: r,
                relays: a ?? [
                    {
                        protocol: (0, _core.RELAYER_DEFAULT_PROTOCOL)
                    }
                ],
                proposer: {
                    publicKey: g,
                    metadata: this.client.metadata
                }
            }, o && {
                sessionProperties: o
            }), { reject: m, resolve: V, done: U } = (0, _utils.createDelayedPromise)((0, _time.FIVE_MINUTES), te);
            if (this.events.once((0, _utils.engineEvent)("session_connect"), async ({ error: v, session: y })=>{
                if (v) m(v);
                else if (y) {
                    y.self.publicKey = g;
                    const F = H(w({}, y), {
                        requiredNamespaces: y.requiredNamespaces,
                        optionalNamespaces: y.optionalNamespaces
                    });
                    await this.client.session.set(y.topic, F), await this.setExpiry(y.topic, y.expiry), l && await this.client.core.pairing.updateMetadata({
                        topic: l,
                        metadata: y.peer.metadata
                    }), V(F);
                }
            }), !l) {
                const { message: v } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `connect() pairing topic: ${l}`);
                throw new Error(v);
            }
            const A = await this.sendRequest(l, "wc_sessionPropose", E), le = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES));
            return await this.setProposal(A, w({
                id: A,
                expiry: le
            }, E)), {
                uri: h,
                approval: U
            };
        }, this.pair = async (e)=>(this.isInitialized(), await this.client.core.pairing.pair(e)), this.approve = async (e)=>{
            this.isInitialized(), await this.isValidApprove(e);
            const { id: s, relayProtocol: t, namespaces: i, sessionProperties: r } = e, o = this.client.proposal.get(s);
            let { pairingTopic: a, proposer: l, requiredNamespaces: h, optionalNamespaces: I } = o;
            a = a || "", (0, _utils.isValidObject)(h) || (h = (0, _utils.getRequiredNamespacesFromNamespaces)(i, "approve()"));
            const g = await this.client.core.crypto.generateKeyPair(), E = l.publicKey, m = await this.client.core.crypto.generateSharedKey(g, E);
            a && s && (await this.client.core.pairing.updateMetadata({
                topic: a,
                metadata: l.metadata
            }), await this.sendResult(s, a, {
                relay: {
                    protocol: t ?? "irn"
                },
                responderPublicKey: g
            }), await this.client.proposal.delete(s, (0, _utils.getSdkError)("USER_DISCONNECTED")), await this.client.core.pairing.activate({
                topic: a
            }));
            const V = w({
                relay: {
                    protocol: t ?? "irn"
                },
                namespaces: i,
                requiredNamespaces: h,
                optionalNamespaces: I,
                pairingTopic: a,
                controller: {
                    publicKey: g,
                    metadata: this.client.metadata
                },
                expiry: (0, _utils.calcExpiry)(C)
            }, r && {
                sessionProperties: r
            });
            await this.client.core.relayer.subscribe(m), await this.sendRequest(m, "wc_sessionSettle", V);
            const U = H(w({}, V), {
                topic: m,
                pairingTopic: a,
                acknowledged: !1,
                self: V.controller,
                peer: {
                    publicKey: l.publicKey,
                    metadata: l.metadata
                },
                controller: g
            });
            return await this.client.session.set(m, U), await this.setExpiry(m, (0, _utils.calcExpiry)(C)), {
                topic: m,
                acknowledged: ()=>new Promise((A)=>setTimeout(()=>A(this.client.session.get(m)), 500))
            };
        }, this.reject = async (e)=>{
            this.isInitialized(), await this.isValidReject(e);
            const { id: s, reason: t } = e, { pairingTopic: i } = this.client.proposal.get(s);
            i && (await this.sendError(s, i, t), await this.client.proposal.delete(s, (0, _utils.getSdkError)("USER_DISCONNECTED")));
        }, this.update = async (e)=>{
            this.isInitialized(), await this.isValidUpdate(e);
            const { topic: s, namespaces: t } = e, i = await this.sendRequest(s, "wc_sessionUpdate", {
                namespaces: t
            }), { done: r, resolve: o, reject: a } = (0, _utils.createDelayedPromise)();
            return this.events.once((0, _utils.engineEvent)("session_update", i), ({ error: l })=>{
                l ? a(l) : o();
            }), await this.client.session.update(s, {
                namespaces: t
            }), {
                acknowledged: r
            };
        }, this.extend = async (e)=>{
            this.isInitialized(), await this.isValidExtend(e);
            const { topic: s } = e, t = await this.sendRequest(s, "wc_sessionExtend", {}), { done: i, resolve: r, reject: o } = (0, _utils.createDelayedPromise)();
            return this.events.once((0, _utils.engineEvent)("session_extend", t), ({ error: a })=>{
                a ? o(a) : r();
            }), await this.setExpiry(s, (0, _utils.calcExpiry)(C)), {
                acknowledged: i
            };
        }, this.request = async (e)=>{
            this.isInitialized(), await this.isValidRequest(e);
            const { chainId: s, request: t, topic: i, expiry: r } = e, o = await this.sendRequest(i, "wc_sessionRequest", {
                request: t,
                chainId: s
            }, r), { done: a, resolve: l, reject: h } = (0, _utils.createDelayedPromise)(r);
            this.events.once((0, _utils.engineEvent)("session_request", o), ({ error: g, result: E })=>{
                g ? h(g) : l(E);
            }), this.client.events.emit("session_request_sent", {
                topic: i,
                request: t,
                chainId: s,
                id: o
            });
            const I = await this.client.core.storage.getItem(ee);
            return (0, _utils.handleDeeplinkRedirect)({
                id: o,
                topic: i,
                wcDeepLink: I
            }), await a();
        }, this.respond = async (e)=>{
            this.isInitialized(), await this.isValidRespond(e);
            const { topic: s, response: t } = e, { id: i } = t;
            (0, _jsonrpcUtils.isJsonRpcResult)(t) ? await this.sendResult(i, s, t.result) : (0, _jsonrpcUtils.isJsonRpcError)(t) && await this.sendError(i, s, t.error), this.deletePendingSessionRequest(e.response.id, {
                message: "fulfilled",
                code: 0
            });
        }, this.ping = async (e)=>{
            this.isInitialized(), await this.isValidPing(e);
            const { topic: s } = e;
            if (this.client.session.keys.includes(s)) {
                const t = await this.sendRequest(s, "wc_sessionPing", {}), { done: i, resolve: r, reject: o } = (0, _utils.createDelayedPromise)();
                this.events.once((0, _utils.engineEvent)("session_ping", t), ({ error: a })=>{
                    a ? o(a) : r();
                }), await i();
            } else this.client.core.pairing.pairings.keys.includes(s) && await this.client.core.pairing.ping({
                topic: s
            });
        }, this.emit = async (e)=>{
            this.isInitialized(), await this.isValidEmit(e);
            const { topic: s, event: t, chainId: i } = e;
            await this.sendRequest(s, "wc_sessionEvent", {
                event: t,
                chainId: i
            });
        }, this.disconnect = async (e)=>{
            this.isInitialized(), await this.isValidDisconnect(e);
            const { topic: s } = e;
            if (this.client.session.keys.includes(s)) {
                const t = (0, _jsonrpcUtils.getBigIntRpcId)().toString();
                let i;
                const r = (o)=>{
                    o?.id.toString() === t && (this.client.core.relayer.events.removeListener((0, _core.RELAYER_EVENTS).message_ack, r), i());
                };
                await Promise.all([
                    new Promise((o)=>{
                        i = o, this.client.core.relayer.on((0, _core.RELAYER_EVENTS).message_ack, r);
                    }),
                    this.sendRequest(s, "wc_sessionDelete", (0, _utils.getSdkError)("USER_DISCONNECTED"), void 0, t)
                ]), await this.deleteSession(s);
            } else await this.client.core.pairing.disconnect({
                topic: s
            });
        }, this.find = (e)=>(this.isInitialized(), this.client.session.getAll().filter((s)=>(0, _utils.isSessionCompatible)(s, e))), this.getPendingSessionRequests = ()=>(this.isInitialized(), this.client.pendingRequest.getAll()), this.cleanupDuplicatePairings = async (e)=>{
            if (e.pairingTopic) try {
                const s = this.client.core.pairing.pairings.get(e.pairingTopic), t = this.client.core.pairing.pairings.getAll().filter((i)=>{
                    var r, o;
                    return ((r = i.peerMetadata) == null ? void 0 : r.url) && ((o = i.peerMetadata) == null ? void 0 : o.url) === e.peer.metadata.url && i.topic && i.topic !== s.topic;
                });
                if (t.length === 0) return;
                this.client.logger.info(`Cleaning up ${t.length} duplicate pairing(s)`), await Promise.all(t.map((i)=>this.client.core.pairing.disconnect({
                        topic: i.topic
                    }))), this.client.logger.info("Duplicate pairings clean up finished");
            } catch (s) {
                this.client.logger.error(s);
            }
        }, this.deleteSession = async (e, s)=>{
            const { self: t } = this.client.session.get(e);
            await this.client.core.relayer.unsubscribe(e), this.client.session.delete(e, (0, _utils.getSdkError)("USER_DISCONNECTED")), this.client.core.crypto.keychain.has(t.publicKey) && await this.client.core.crypto.deleteKeyPair(t.publicKey), this.client.core.crypto.keychain.has(e) && await this.client.core.crypto.deleteSymKey(e), s || this.client.core.expirer.del(e);
        }, this.deleteProposal = async (e, s)=>{
            await Promise.all([
                this.client.proposal.delete(e, (0, _utils.getSdkError)("USER_DISCONNECTED")),
                s ? Promise.resolve() : this.client.core.expirer.del(e)
            ]);
        }, this.deletePendingSessionRequest = async (e, s, t = !1)=>{
            await Promise.all([
                this.client.pendingRequest.delete(e, s),
                t ? Promise.resolve() : this.client.core.expirer.del(e)
            ]);
        }, this.setExpiry = async (e, s)=>{
            this.client.session.keys.includes(e) && await this.client.session.update(e, {
                expiry: s
            }), this.client.core.expirer.set(e, s);
        }, this.setProposal = async (e, s)=>{
            await this.client.proposal.set(e, s), this.client.core.expirer.set(e, s.expiry);
        }, this.setPendingSessionRequest = async (e)=>{
            const s = O.wc_sessionRequest.req.ttl, { id: t, topic: i, params: r } = e;
            await this.client.pendingRequest.set(t, {
                id: t,
                topic: i,
                params: r
            }), s && this.client.core.expirer.set(t, (0, _utils.calcExpiry)(s));
        }, this.sendRequest = async (e, s, t, i, r)=>{
            const o = (0, _jsonrpcUtils.formatJsonRpcRequest)(s, t);
            if ((0, _utils.isBrowser)() && oe.includes(s)) {
                const h = (0, _utils.hashMessage)(JSON.stringify(o));
                await this.client.core.verify.register({
                    attestationId: h
                });
            }
            const a = await this.client.core.crypto.encode(e, o), l = O[s].req;
            return i && (l.ttl = i), r && (l.id = r), this.client.core.history.set(e, o), this.client.core.relayer.publish(e, a, l), o.id;
        }, this.sendResult = async (e, s, t)=>{
            const i = (0, _jsonrpcUtils.formatJsonRpcResult)(e, t), r = await this.client.core.crypto.encode(s, i), o = await this.client.core.history.get(s, e), a = O[o.request.method].res;
            this.client.core.relayer.publish(s, r, a), await this.client.core.history.resolve(i);
        }, this.sendError = async (e, s, t)=>{
            const i = (0, _jsonrpcUtils.formatJsonRpcError)(e, t), r = await this.client.core.crypto.encode(s, i), o = await this.client.core.history.get(s, e), a = O[o.request.method].res;
            this.client.core.relayer.publish(s, r, a), await this.client.core.history.resolve(i);
        }, this.cleanup = async ()=>{
            const e = [], s = [];
            this.client.session.getAll().forEach((t)=>{
                (0, _utils.isExpired)(t.expiry) && e.push(t.topic);
            }), this.client.proposal.getAll().forEach((t)=>{
                (0, _utils.isExpired)(t.expiry) && s.push(t.id);
            }), await Promise.all([
                ...e.map((t)=>this.deleteSession(t)),
                ...s.map((t)=>this.deleteProposal(t))
            ]);
        }, this.onRelayEventRequest = (e)=>{
            const { topic: s, payload: t } = e, i = t.method;
            switch(i){
                case "wc_sessionPropose":
                    return this.onSessionProposeRequest(s, t);
                case "wc_sessionSettle":
                    return this.onSessionSettleRequest(s, t);
                case "wc_sessionUpdate":
                    return this.onSessionUpdateRequest(s, t);
                case "wc_sessionExtend":
                    return this.onSessionExtendRequest(s, t);
                case "wc_sessionPing":
                    return this.onSessionPingRequest(s, t);
                case "wc_sessionDelete":
                    return this.onSessionDeleteRequest(s, t);
                case "wc_sessionRequest":
                    return this.onSessionRequest(s, t);
                case "wc_sessionEvent":
                    return this.onSessionEventRequest(s, t);
                default:
                    return this.client.logger.info(`Unsupported request method ${i}`);
            }
        }, this.onRelayEventResponse = async (e)=>{
            const { topic: s, payload: t } = e, i = (await this.client.core.history.get(s, t.id)).request.method;
            switch(i){
                case "wc_sessionPropose":
                    return this.onSessionProposeResponse(s, t);
                case "wc_sessionSettle":
                    return this.onSessionSettleResponse(s, t);
                case "wc_sessionUpdate":
                    return this.onSessionUpdateResponse(s, t);
                case "wc_sessionExtend":
                    return this.onSessionExtendResponse(s, t);
                case "wc_sessionPing":
                    return this.onSessionPingResponse(s, t);
                case "wc_sessionRequest":
                    return this.onSessionRequestResponse(s, t);
                default:
                    return this.client.logger.info(`Unsupported response method ${i}`);
            }
        }, this.onRelayEventUnknownPayload = (e)=>{
            const { topic: s } = e, { message: t } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`);
            throw new Error(t);
        }, this.onSessionProposeRequest = async (e, s)=>{
            const { params: t, id: i } = s;
            try {
                this.isValidConnect(w({}, s.params));
                const r = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES)), o = w({
                    id: i,
                    pairingTopic: e,
                    expiry: r
                }, t);
                await this.setProposal(i, o);
                const a = (0, _utils.hashMessage)(JSON.stringify(s)), l = await this.getVerifyContext(a, o.proposer.metadata);
                this.client.events.emit("session_proposal", {
                    id: i,
                    params: o,
                    verifyContext: l
                });
            } catch (r) {
                await this.sendError(i, e, r), this.client.logger.error(r);
            }
        }, this.onSessionProposeResponse = async (e, s)=>{
            const { id: t } = s;
            if ((0, _jsonrpcUtils.isJsonRpcResult)(s)) {
                const { result: i } = s;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    result: i
                });
                const r = this.client.proposal.get(t);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    proposal: r
                });
                const o = r.proposer.publicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    selfPublicKey: o
                });
                const a = i.responderPublicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    peerPublicKey: a
                });
                const l = await this.client.core.crypto.generateSharedKey(o, a);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    sessionTopic: l
                });
                const h = await this.client.core.relayer.subscribe(l);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    subscriptionId: h
                }), await this.client.core.pairing.activate({
                    topic: e
                });
            } else (0, _jsonrpcUtils.isJsonRpcError)(s) && (await this.client.proposal.delete(t, (0, _utils.getSdkError)("USER_DISCONNECTED")), this.events.emit((0, _utils.engineEvent)("session_connect"), {
                error: s.error
            }));
        }, this.onSessionSettleRequest = async (e, s)=>{
            const { id: t, params: i } = s;
            try {
                this.isValidSessionSettleRequest(i);
                const { relay: r, controller: o, expiry: a, namespaces: l, requiredNamespaces: h, optionalNamespaces: I, sessionProperties: g, pairingTopic: E } = s.params, m = w({
                    topic: e,
                    relay: r,
                    expiry: a,
                    namespaces: l,
                    acknowledged: !0,
                    pairingTopic: E,
                    requiredNamespaces: h,
                    optionalNamespaces: I,
                    controller: o.publicKey,
                    self: {
                        publicKey: "",
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: o.publicKey,
                        metadata: o.metadata
                    }
                }, g && {
                    sessionProperties: g
                });
                await this.sendResult(s.id, e, !0), this.events.emit((0, _utils.engineEvent)("session_connect"), {
                    session: m
                }), this.cleanupDuplicatePairings(m);
            } catch (r) {
                await this.sendError(t, e, r), this.client.logger.error(r);
            }
        }, this.onSessionSettleResponse = async (e, s)=>{
            const { id: t } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? (await this.client.session.update(e, {
                acknowledged: !0
            }), this.events.emit((0, _utils.engineEvent)("session_approve", t), {})) : (0, _jsonrpcUtils.isJsonRpcError)(s) && (await this.client.session.delete(e, (0, _utils.getSdkError)("USER_DISCONNECTED")), this.events.emit((0, _utils.engineEvent)("session_approve", t), {
                error: s.error
            }));
        }, this.onSessionUpdateRequest = async (e, s)=>{
            const { params: t, id: i } = s;
            try {
                this.isValidUpdate(w({
                    topic: e
                }, t)), await this.client.session.update(e, {
                    namespaces: t.namespaces
                }), await this.sendResult(i, e, !0), this.client.events.emit("session_update", {
                    id: i,
                    topic: e,
                    params: t
                });
            } catch (r) {
                await this.sendError(i, e, r), this.client.logger.error(r);
            }
        }, this.onSessionUpdateResponse = (e, s)=>{
            const { id: t } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_update", t), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_update", t), {
                error: s.error
            });
        }, this.onSessionExtendRequest = async (e, s)=>{
            const { id: t } = s;
            try {
                this.isValidExtend({
                    topic: e
                }), await this.setExpiry(e, (0, _utils.calcExpiry)(C)), await this.sendResult(t, e, !0), this.client.events.emit("session_extend", {
                    id: t,
                    topic: e
                });
            } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
            }
        }, this.onSessionExtendResponse = (e, s)=>{
            const { id: t } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_extend", t), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_extend", t), {
                error: s.error
            });
        }, this.onSessionPingRequest = async (e, s)=>{
            const { id: t } = s;
            try {
                this.isValidPing({
                    topic: e
                }), await this.sendResult(t, e, !0), this.client.events.emit("session_ping", {
                    id: t,
                    topic: e
                });
            } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
            }
        }, this.onSessionPingResponse = (e, s)=>{
            const { id: t } = s;
            setTimeout(()=>{
                (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_ping", t), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_ping", t), {
                    error: s.error
                });
            }, 500);
        }, this.onSessionDeleteRequest = async (e, s)=>{
            const { id: t } = s;
            try {
                this.isValidDisconnect({
                    topic: e,
                    reason: s.params
                }), await Promise.all([
                    new Promise((i)=>{
                        this.client.core.relayer.once((0, _core.RELAYER_EVENTS).publish, async ()=>{
                            i(await this.deleteSession(e));
                        });
                    }),
                    this.sendResult(t, e, !0)
                ]), this.client.events.emit("session_delete", {
                    id: t,
                    topic: e
                });
            } catch (i) {
                this.client.logger.error(i);
            }
        }, this.onSessionRequest = async (e, s)=>{
            const { id: t, params: i } = s;
            try {
                this.isValidRequest(w({
                    topic: e
                }, i)), await this.setPendingSessionRequest({
                    id: t,
                    topic: e,
                    params: i
                });
                const r = (0, _utils.hashMessage)(JSON.stringify(s)), o = this.client.session.get(e), a = await this.getVerifyContext(r, o.peer.metadata);
                this.client.events.emit("session_request", {
                    id: t,
                    topic: e,
                    params: i,
                    verifyContext: a
                });
            } catch (r) {
                await this.sendError(t, e, r), this.client.logger.error(r);
            }
        }, this.onSessionRequestResponse = (e, s)=>{
            const { id: t } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_request", t), {
                result: s.result
            }) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_request", t), {
                error: s.error
            });
        }, this.onSessionEventRequest = async (e, s)=>{
            const { id: t, params: i } = s;
            try {
                this.isValidEmit(w({
                    topic: e
                }, i)), this.client.events.emit("session_event", {
                    id: t,
                    topic: e,
                    params: i
                });
            } catch (r) {
                await this.sendError(t, e, r), this.client.logger.error(r);
            }
        }, this.isValidConnect = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
                throw new Error(a);
            }
            const { pairingTopic: s, requiredNamespaces: t, optionalNamespaces: i, sessionProperties: r, relays: o } = e;
            if ((0, _utils.isUndefined)(s) || await this.isValidPairingTopic(s), !(0, _utils.isValidRelays)(o, !0)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `connect() relays: ${o}`);
                throw new Error(a);
            }
            !(0, _utils.isUndefined)(t) && (0, _utils.isValidObject)(t) !== 0 && this.validateNamespaces(t, "requiredNamespaces"), !(0, _utils.isUndefined)(i) && (0, _utils.isValidObject)(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), (0, _utils.isUndefined)(r) || this.validateSessionProps(r, "sessionProperties");
        }, this.validateNamespaces = (e, s)=>{
            const t = (0, _utils.isValidRequiredNamespaces)(e, "connect()", s);
            if (t) throw new Error(t.message);
        }, this.isValidApprove = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) throw new Error((0, _utils.getInternalError)("MISSING_OR_INVALID", `approve() params: ${e}`).message);
            const { id: s, namespaces: t, relayProtocol: i, sessionProperties: r } = e;
            await this.isValidProposalId(s);
            const o = this.client.proposal.get(s), a = (0, _utils.isValidNamespaces)(t, "approve()");
            if (a) throw new Error(a.message);
            const l = (0, _utils.isConformingNamespaces)(o.requiredNamespaces, t, "approve()");
            if (l) throw new Error(l.message);
            if (!(0, _utils.isValidString)(i, !0)) {
                const { message: h } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
                throw new Error(h);
            }
            (0, _utils.isUndefined)(r) || this.validateSessionProps(r, "sessionProperties");
        }, this.isValidReject = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: i } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `reject() params: ${e}`);
                throw new Error(i);
            }
            const { id: s, reason: t } = e;
            if (await this.isValidProposalId(s), !(0, _utils.isValidErrorReason)(t)) {
                const { message: i } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(t)}`);
                throw new Error(i);
            }
        }, this.isValidSessionSettleRequest = (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: l } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
                throw new Error(l);
            }
            const { relay: s, controller: t, namespaces: i, expiry: r } = e;
            if (!(0, _utils.isValidRelay)(s)) {
                const { message: l } = (0, _utils.getInternalError)("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
                throw new Error(l);
            }
            const o = (0, _utils.isValidController)(t, "onSessionSettleRequest()");
            if (o) throw new Error(o.message);
            const a = (0, _utils.isValidNamespaces)(i, "onSessionSettleRequest()");
            if (a) throw new Error(a.message);
            if ((0, _utils.isExpired)(r)) {
                const { message: l } = (0, _utils.getInternalError)("EXPIRED", "onSessionSettleRequest()");
                throw new Error(l);
            }
        }, this.isValidUpdate = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `update() params: ${e}`);
                throw new Error(a);
            }
            const { topic: s, namespaces: t } = e;
            await this.isValidSessionTopic(s);
            const i = this.client.session.get(s), r = (0, _utils.isValidNamespaces)(t, "update()");
            if (r) throw new Error(r.message);
            const o = (0, _utils.isConformingNamespaces)(i.requiredNamespaces, t, "update()");
            if (o) throw new Error(o.message);
        }, this.isValidExtend = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: t } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `extend() params: ${e}`);
                throw new Error(t);
            }
            const { topic: s } = e;
            await this.isValidSessionTopic(s);
        }, this.isValidRequest = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() params: ${e}`);
                throw new Error(a);
            }
            const { topic: s, request: t, chainId: i, expiry: r } = e;
            await this.isValidSessionTopic(s);
            const { namespaces: o } = this.client.session.get(s);
            if (!(0, _utils.isValidNamespacesChainId)(o, i)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() chainId: ${i}`);
                throw new Error(a);
            }
            if (!(0, _utils.isValidRequest)(t)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() ${JSON.stringify(t)}`);
                throw new Error(a);
            }
            if (!(0, _utils.isValidNamespacesRequest)(o, i, t.method)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() method: ${t.method}`);
                throw new Error(a);
            }
            if (r && !(0, _utils.isValidRequestExpiry)(r, $)) {
                const { message: a } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() expiry: ${r}. Expiry must be a number (in seconds) between ${$.min} and ${$.max}`);
                throw new Error(a);
            }
        }, this.isValidRespond = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: i } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `respond() params: ${e}`);
                throw new Error(i);
            }
            const { topic: s, response: t } = e;
            if (await this.isValidSessionTopic(s), !(0, _utils.isValidResponse)(t)) {
                const { message: i } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(t)}`);
                throw new Error(i);
            }
        }, this.isValidPing = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: t } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `ping() params: ${e}`);
                throw new Error(t);
            }
            const { topic: s } = e;
            await this.isValidSessionOrPairingTopic(s);
        }, this.isValidEmit = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: o } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() params: ${e}`);
                throw new Error(o);
            }
            const { topic: s, event: t, chainId: i } = e;
            await this.isValidSessionTopic(s);
            const { namespaces: r } = this.client.session.get(s);
            if (!(0, _utils.isValidNamespacesChainId)(r, i)) {
                const { message: o } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() chainId: ${i}`);
                throw new Error(o);
            }
            if (!(0, _utils.isValidEvent)(t)) {
                const { message: o } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
                throw new Error(o);
            }
            if (!(0, _utils.isValidNamespacesEvent)(r, i, t.name)) {
                const { message: o } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
                throw new Error(o);
            }
        }, this.isValidDisconnect = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: t } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `disconnect() params: ${e}`);
                throw new Error(t);
            }
            const { topic: s } = e;
            await this.isValidSessionOrPairingTopic(s);
        }, this.getVerifyContext = async (e, s)=>{
            const t = {
                verified: {
                    verifyUrl: s.verifyUrl || "",
                    validation: "UNKNOWN",
                    origin: s.url || ""
                }
            };
            try {
                const i = await this.client.core.verify.resolve({
                    attestationId: e,
                    verifyUrl: s.verifyUrl
                });
                i && (t.verified.origin = i, t.verified.validation = i === s.url ? "VALID" : "INVALID");
            } catch (i) {
                this.client.logger.error(i);
            }
            return this.client.logger.info(`Verify context: ${JSON.stringify(t)}`), t;
        }, this.validateSessionProps = (e, s)=>{
            Object.values(e).forEach((t)=>{
                if (!(0, _utils.isValidString)(t, !1)) {
                    const { message: i } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `${s} must be in Record<string, string> format. Received: ${JSON.stringify(t)}`);
                    throw new Error(i);
                }
            });
        };
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: n } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(n);
        }
    }
    registerRelayerEvents() {
        this.client.core.relayer.on((0, _core.RELAYER_EVENTS).message, async (n)=>{
            const { topic: e, message: s } = n;
            if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s))) return;
            const t = await this.client.core.crypto.decode(e, s);
            (0, _jsonrpcUtils.isJsonRpcRequest)(t) ? (this.client.core.history.set(e, t), this.onRelayEventRequest({
                topic: e,
                payload: t
            })) : (0, _jsonrpcUtils.isJsonRpcResponse)(t) ? (await this.client.core.history.resolve(t), this.onRelayEventResponse({
                topic: e,
                payload: t
            })) : this.onRelayEventUnknownPayload({
                topic: e,
                payload: t
            });
        });
    }
    registerExpirerEvents() {
        this.client.core.expirer.on((0, _core.EXPIRER_EVENTS).expired, async (n)=>{
            const { topic: e, id: s } = (0, _utils.parseExpirerTarget)(n.target);
            if (s && this.client.pendingRequest.keys.includes(s)) return await this.deletePendingSessionRequest(s, (0, _utils.getInternalError)("EXPIRED"), !0);
            e ? this.client.session.keys.includes(e) && (await this.deleteSession(e, !0), this.client.events.emit("session_expire", {
                topic: e
            })) : s && (await this.deleteProposal(s, !0), this.client.events.emit("proposal_expire", {
                id: s
            }));
        });
    }
    isValidPairingTopic(n) {
        if (!(0, _utils.isValidString)(n, !1)) {
            const { message: e } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pairing topic should be a string: ${n}`);
            throw new Error(e);
        }
        if (!this.client.core.pairing.pairings.keys.includes(n)) {
            const { message: e } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n}`);
            throw new Error(e);
        }
        if ((0, _utils.isExpired)(this.client.core.pairing.pairings.get(n).expiry)) {
            const { message: e } = (0, _utils.getInternalError)("EXPIRED", `pairing topic: ${n}`);
            throw new Error(e);
        }
    }
    async isValidSessionTopic(n) {
        if (!(0, _utils.isValidString)(n, !1)) {
            const { message: e } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `session topic should be a string: ${n}`);
            throw new Error(e);
        }
        if (!this.client.session.keys.includes(n)) {
            const { message: e } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `session topic doesn't exist: ${n}`);
            throw new Error(e);
        }
        if ((0, _utils.isExpired)(this.client.session.get(n).expiry)) {
            await this.deleteSession(n);
            const { message: e } = (0, _utils.getInternalError)("EXPIRED", `session topic: ${n}`);
            throw new Error(e);
        }
    }
    async isValidSessionOrPairingTopic(n) {
        if (this.client.session.keys.includes(n)) await this.isValidSessionTopic(n);
        else if (this.client.core.pairing.pairings.keys.includes(n)) this.isValidPairingTopic(n);
        else if ((0, _utils.isValidString)(n, !1)) {
            const { message: e } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n}`);
            throw new Error(e);
        } else {
            const { message: e } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n}`);
            throw new Error(e);
        }
    }
    async isValidProposalId(n) {
        if (!(0, _utils.isValidId)(n)) {
            const { message: e } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `proposal id should be a number: ${n}`);
            throw new Error(e);
        }
        if (!this.client.proposal.keys.includes(n)) {
            const { message: e } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `proposal id doesn't exist: ${n}`);
            throw new Error(e);
        }
        if ((0, _utils.isExpired)(this.client.proposal.get(n).expiry)) {
            await this.deleteProposal(n);
            const { message: e } = (0, _utils.getInternalError)("EXPIRED", `proposal id: ${n}`);
            throw new Error(e);
        }
    }
}
class rs extends (0, _core.Store) {
    constructor(n, e){
        super(n, e, se, b), this.core = n, this.logger = e;
    }
}
class os extends (0, _core.Store) {
    constructor(n, e){
        super(n, e, ie, b), this.core = n, this.logger = e;
    }
}
class as extends (0, _core.Store) {
    constructor(n, e){
        super(n, e, re, b, (s)=>s.id), this.core = n, this.logger = e;
    }
}
class M extends (0, _types.ISignClient) {
    constructor(n){
        super(n), this.protocol = j, this.version = J, this.name = G.name, this.events = new (0, _events.EventEmitter), this.on = (s, t)=>this.events.on(s, t), this.once = (s, t)=>this.events.once(s, t), this.off = (s, t)=>this.events.off(s, t), this.removeListener = (s, t)=>this.events.removeListener(s, t), this.removeAllListeners = (s)=>this.events.removeAllListeners(s), this.connect = async (s)=>{
            try {
                return await this.engine.connect(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.pair = async (s)=>{
            try {
                return await this.engine.pair(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.approve = async (s)=>{
            try {
                return await this.engine.approve(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.reject = async (s)=>{
            try {
                return await this.engine.reject(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.update = async (s)=>{
            try {
                return await this.engine.update(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.extend = async (s)=>{
            try {
                return await this.engine.extend(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.request = async (s)=>{
            try {
                return await this.engine.request(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.respond = async (s)=>{
            try {
                return await this.engine.respond(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.ping = async (s)=>{
            try {
                return await this.engine.ping(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.emit = async (s)=>{
            try {
                return await this.engine.emit(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.disconnect = async (s)=>{
            try {
                return await this.engine.disconnect(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.find = (s)=>{
            try {
                return this.engine.find(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.getPendingSessionRequests = ()=>{
            try {
                return this.engine.getPendingSessionRequests();
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }, this.name = n?.name || G.name, this.metadata = n?.metadata || (0, _utils.getAppMetadata)();
        const e = typeof n?.logger < "u" && typeof n?.logger != "string" ? n.logger : (0, _logger.pino)((0, _logger.getDefaultLoggerOptions)({
            level: n?.logger || G.logger
        }));
        this.core = n?.core || new (0, _core.Core)(n), this.logger = (0, _logger.generateChildLogger)(e, this.name), this.session = new os(this.core, this.logger), this.proposal = new rs(this.core, this.logger), this.pendingRequest = new as(this.core, this.logger), this.engine = new ns(this);
    }
    static async init(n) {
        const e = new M(n);
        return await e.initialize(), e;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get pairing() {
        return this.core.pairing.pairings;
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.engine.init(), this.core.verify.init({
                verifyUrl: this.metadata.verifyUrl
            }), this.logger.info("SignClient Initialization Success");
        } catch (n) {
            throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n.message), n;
        }
    }
}
const cs = M;

},{"@walletconnect/core":"0PcxV","@walletconnect/logger":"bTcqM","@walletconnect/types":"5ngc4","@walletconnect/utils":"o3k5L","events":"1VQLm","@walletconnect/time":"2hzsP","@walletconnect/jsonrpc-utils":"izCJ8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"0PcxV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CORE_CONTEXT", ()=>Y);
parcelHelpers.export(exports, "CORE_DEFAULT", ()=>Ye);
parcelHelpers.export(exports, "CORE_PROTOCOL", ()=>ce);
parcelHelpers.export(exports, "CORE_STORAGE_OPTIONS", ()=>Je);
parcelHelpers.export(exports, "CORE_STORAGE_PREFIX", ()=>O);
parcelHelpers.export(exports, "CORE_VERSION", ()=>Ge);
parcelHelpers.export(exports, "CRYPTO_CLIENT_SEED", ()=>ue);
parcelHelpers.export(exports, "CRYPTO_CONTEXT", ()=>He);
parcelHelpers.export(exports, "CRYPTO_JWT_TTL", ()=>We);
parcelHelpers.export(exports, "Core", ()=>Tr);
parcelHelpers.export(exports, "Crypto", ()=>vt);
parcelHelpers.export(exports, "EXPIRER_CONTEXT", ()=>Et);
parcelHelpers.export(exports, "EXPIRER_DEFAULT_TTL", ()=>cr);
parcelHelpers.export(exports, "EXPIRER_EVENTS", ()=>w);
parcelHelpers.export(exports, "EXPIRER_STORAGE_VERSION", ()=>ft);
parcelHelpers.export(exports, "Expirer", ()=>Lt);
parcelHelpers.export(exports, "HISTORY_CONTEXT", ()=>bt);
parcelHelpers.export(exports, "HISTORY_EVENTS", ()=>_);
parcelHelpers.export(exports, "HISTORY_STORAGE_VERSION", ()=>mt);
parcelHelpers.export(exports, "JsonRpcHistory", ()=>Ut);
parcelHelpers.export(exports, "KEYCHAIN_CONTEXT", ()=>Xe);
parcelHelpers.export(exports, "KEYCHAIN_STORAGE_VERSION", ()=>Ze);
parcelHelpers.export(exports, "KeyChain", ()=>wt);
parcelHelpers.export(exports, "MESSAGES_CONTEXT", ()=>Qe);
parcelHelpers.export(exports, "MESSAGES_STORAGE_VERSION", ()=>et);
parcelHelpers.export(exports, "MessageTracker", ()=>It);
parcelHelpers.export(exports, "PAIRING_CONTEXT", ()=>Dt);
parcelHelpers.export(exports, "PAIRING_DEFAULT_TTL", ()=>hr);
parcelHelpers.export(exports, "PAIRING_RPC_OPTS", ()=>F);
parcelHelpers.export(exports, "PAIRING_STORAGE_VERSION", ()=>yt);
parcelHelpers.export(exports, "PENDING_SUB_RESOLUTION_TIMEOUT", ()=>pt);
parcelHelpers.export(exports, "PUBLISHER_CONTEXT", ()=>it);
parcelHelpers.export(exports, "PUBLISHER_DEFAULT_TTL", ()=>tt);
parcelHelpers.export(exports, "Pairing", ()=>Nt);
parcelHelpers.export(exports, "RELAYER_CONTEXT", ()=>nt);
parcelHelpers.export(exports, "RELAYER_DEFAULT_LOGGER", ()=>rt);
parcelHelpers.export(exports, "RELAYER_DEFAULT_PROTOCOL", ()=>st);
parcelHelpers.export(exports, "RELAYER_DEFAULT_RELAY_URL", ()=>le);
parcelHelpers.export(exports, "RELAYER_EVENTS", ()=>g);
parcelHelpers.export(exports, "RELAYER_PROVIDER_EVENTS", ()=>L);
parcelHelpers.export(exports, "RELAYER_RECONNECT_TIMEOUT", ()=>ot);
parcelHelpers.export(exports, "RELAYER_SDK_VERSION", ()=>ht);
parcelHelpers.export(exports, "RELAYER_STORAGE_OPTIONS", ()=>ar);
parcelHelpers.export(exports, "RELAYER_SUBSCRIBER_SUFFIX", ()=>at);
parcelHelpers.export(exports, "RELAYER_TRANSPORT_CUTOFF", ()=>ct);
parcelHelpers.export(exports, "Relayer", ()=>Pt);
parcelHelpers.export(exports, "STORE_STORAGE_VERSION", ()=>ut);
parcelHelpers.export(exports, "SUBSCRIBER_CONTEXT", ()=>dt);
parcelHelpers.export(exports, "SUBSCRIBER_DEFAULT_TTL", ()=>or);
parcelHelpers.export(exports, "SUBSCRIBER_EVENTS", ()=>C);
parcelHelpers.export(exports, "SUBSCRIBER_STORAGE_VERSION", ()=>gt);
parcelHelpers.export(exports, "Store", ()=>zt);
parcelHelpers.export(exports, "Subscriber", ()=>Rt);
parcelHelpers.export(exports, "VERIFY_CONTEXT", ()=>J);
parcelHelpers.export(exports, "VERIFY_SERVER", ()=>de);
parcelHelpers.export(exports, "Verify", ()=>Ft);
parcelHelpers.export(exports, "WALLETCONNECT_CLIENT_ID", ()=>lt);
parcelHelpers.export(exports, "default", ()=>H);
var _events = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events);
var _keyvaluestorage = require("@walletconnect/keyvaluestorage");
var _keyvaluestorageDefault = parcelHelpers.interopDefault(_keyvaluestorage);
var _heartbeat = require("@walletconnect/heartbeat");
var _logger = require("@walletconnect/logger");
var _types = require("@walletconnect/types");
var _safeJson = require("@walletconnect/safe-json");
var _relayAuth = require("@walletconnect/relay-auth");
var _utils = require("@walletconnect/utils");
var _uint8Arrays = require("uint8arrays");
var _time = require("@walletconnect/time");
var _jsonrpcProvider = require("@walletconnect/jsonrpc-provider");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
var _jsonrpcWsConnection = require("@walletconnect/jsonrpc-ws-connection");
var _jsonrpcWsConnectionDefault = parcelHelpers.interopDefault(_jsonrpcWsConnection);
var _lodashIsequal = require("lodash.isequal");
var _lodashIsequalDefault = parcelHelpers.interopDefault(_lodashIsequal);
function Li(r, e) {
    if (r.length >= 255) throw new TypeError("Alphabet too long");
    for(var t = new Uint8Array(256), i = 0; i < t.length; i++)t[i] = 255;
    for(var s = 0; s < r.length; s++){
        var n = r.charAt(s), a = n.charCodeAt(0);
        if (t[a] !== 255) throw new TypeError(n + " is ambiguous");
        t[a] = s;
    }
    var o = r.length, h = r.charAt(0), d = Math.log(o) / Math.log(256), l = Math.log(256) / Math.log(o);
    function D(u) {
        if (u instanceof Uint8Array || (ArrayBuffer.isView(u) ? u = new Uint8Array(u.buffer, u.byteOffset, u.byteLength) : Array.isArray(u) && (u = Uint8Array.from(u))), !(u instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (u.length === 0) return "";
        for(var y = 0, A = 0, v = 0, R = u.length; v !== R && u[v] === 0;)v++, y++;
        for(var T = (R - v) * l + 1 >>> 0, m = new Uint8Array(T); v !== R;){
            for(var S = u[v], x = 0, I = T - 1; (S !== 0 || x < A) && I !== -1; I--, x++)S += 256 * m[I] >>> 0, m[I] = S % o >>> 0, S = S / o >>> 0;
            if (S !== 0) throw new Error("Non-zero carry");
            A = x, v++;
        }
        for(var P = T - A; P !== T && m[P] === 0;)P++;
        for(var B = h.repeat(y); P < T; ++P)B += r.charAt(m[P]);
        return B;
    }
    function b(u) {
        if (typeof u != "string") throw new TypeError("Expected String");
        if (u.length === 0) return new Uint8Array;
        var y = 0;
        if (u[y] !== " ") {
            for(var A = 0, v = 0; u[y] === h;)A++, y++;
            for(var R = (u.length - y) * d + 1 >>> 0, T = new Uint8Array(R); u[y];){
                var m = t[u.charCodeAt(y)];
                if (m === 255) return;
                for(var S = 0, x = R - 1; (m !== 0 || S < v) && x !== -1; x--, S++)m += o * T[x] >>> 0, T[x] = m % 256 >>> 0, m = m / 256 >>> 0;
                if (m !== 0) throw new Error("Non-zero carry");
                v = S, y++;
            }
            if (u[y] !== " ") {
                for(var I = R - v; I !== R && T[I] === 0;)I++;
                for(var P = new Uint8Array(A + (R - I)), B = A; I !== R;)P[B++] = T[I++];
                return P;
            }
        }
    }
    function k(u) {
        var y = b(u);
        if (y) return y;
        throw new Error(`Non-${e} character`);
    }
    return {
        encode: D,
        decodeUnsafe: b,
        decode: k
    };
}
var Fi = Li, $i = Fi;
const Pe = (r)=>{
    if (r instanceof Uint8Array && r.constructor.name === "Uint8Array") return r;
    if (r instanceof ArrayBuffer) return new Uint8Array(r);
    if (ArrayBuffer.isView(r)) return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    throw new Error("Unknown type, must be binary type");
}, Mi = (r)=>new TextEncoder().encode(r), Ki = (r)=>new TextDecoder().decode(r);
class ki {
    constructor(e, t, i){
        this.name = e, this.prefix = t, this.baseEncode = i;
    }
    encode(e) {
        if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type");
    }
}
class Bi {
    constructor(e, t, i){
        if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
        this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
    }
    decode(e) {
        if (typeof e == "string") {
            if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(e.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(e) {
        return Oe(this, e);
    }
}
class ji {
    constructor(e){
        this.decoders = e;
    }
    or(e) {
        return Oe(this, e);
    }
    decode(e) {
        const t = e[0], i = this.decoders[t];
        if (i) return i.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const Oe = (r, e)=>new ji({
        ...r.decoders || {
            [r.prefix]: r
        },
        ...e.decoders || {
            [e.prefix]: e
        }
    });
class Vi {
    constructor(e, t, i, s){
        this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = s, this.encoder = new ki(e, t, i), this.decoder = new Bi(e, t, s);
    }
    encode(e) {
        return this.encoder.encode(e);
    }
    decode(e) {
        return this.decoder.decode(e);
    }
}
const G = ({ name: r, prefix: e, encode: t, decode: i })=>new Vi(r, e, t, i), M = ({ prefix: r, name: e, alphabet: t })=>{
    const { encode: i, decode: s } = $i(t, e);
    return G({
        prefix: r,
        name: e,
        encode: i,
        decode: (n)=>Pe(s(n))
    });
}, qi = (r, e, t, i)=>{
    const s = {};
    for(let l = 0; l < e.length; ++l)s[e[l]] = l;
    let n = r.length;
    for(; r[n - 1] === "=";)--n;
    const a = new Uint8Array(n * t / 8 | 0);
    let o = 0, h = 0, d = 0;
    for(let l = 0; l < n; ++l){
        const D = s[r[l]];
        if (D === void 0) throw new SyntaxError(`Non-${i} character`);
        h = h << t | D, o += t, o >= 8 && (o -= 8, a[d++] = 255 & h >> o);
    }
    if (o >= t || 255 & h << 8 - o) throw new SyntaxError("Unexpected end of data");
    return a;
}, Gi = (r, e, t)=>{
    const i = e[e.length - 1] === "=", s = (1 << t) - 1;
    let n = "", a = 0, o = 0;
    for(let h = 0; h < r.length; ++h)for(o = o << 8 | r[h], a += 8; a > t;)a -= t, n += e[s & o >> a];
    if (a && (n += e[s & o << t - a]), i) for(; n.length * t & 7;)n += "=";
    return n;
}, p = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i })=>G({
        prefix: e,
        name: r,
        encode (s) {
            return Gi(s, i, t);
        },
        decode (s) {
            return qi(s, i, t, r);
        }
    }), Yi = G({
    prefix: "\x00",
    name: "identity",
    encode: (r)=>Ki(r),
    decode: (r)=>Mi(r)
});
var Ji = Object.freeze({
    __proto__: null,
    identity: Yi
});
const Hi = p({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var Wi = Object.freeze({
    __proto__: null,
    base2: Hi
});
const Xi = p({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var Zi = Object.freeze({
    __proto__: null,
    base8: Xi
});
const Qi = M({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var es = Object.freeze({
    __proto__: null,
    base10: Qi
});
const ts = p({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
}), is = p({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var ss = Object.freeze({
    __proto__: null,
    base16: ts,
    base16upper: is
});
const rs = p({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
}), ns = p({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
}), as = p({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
}), os = p({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
}), hs = p({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
}), cs = p({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
}), us = p({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
}), ls = p({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
}), ds = p({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var gs = Object.freeze({
    __proto__: null,
    base32: rs,
    base32upper: ns,
    base32pad: as,
    base32padupper: os,
    base32hex: hs,
    base32hexupper: cs,
    base32hexpad: us,
    base32hexpadupper: ls,
    base32z: ds
});
const ps = M({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), Ds = M({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var ys = Object.freeze({
    __proto__: null,
    base36: ps,
    base36upper: Ds
});
const bs = M({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), ms = M({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var Es = Object.freeze({
    __proto__: null,
    base58btc: bs,
    base58flickr: ms
});
const fs = p({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
}), ws = p({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
}), vs = p({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
}), Is = p({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Cs = Object.freeze({
    __proto__: null,
    base64: fs,
    base64pad: ws,
    base64url: vs,
    base64urlpad: Is
});
const xe = Array.from("\uD83D\uDE80\uD83E\uDE90☄\uD83D\uDEF0\uD83C\uDF0C\uD83C\uDF11\uD83C\uDF12\uD83C\uDF13\uD83C\uDF14\uD83C\uDF15\uD83C\uDF16\uD83C\uDF17\uD83C\uDF18\uD83C\uDF0D\uD83C\uDF0F\uD83C\uDF0E\uD83D\uDC09☀\uD83D\uDCBB\uD83D\uDDA5\uD83D\uDCBE\uD83D\uDCBF\uD83D\uDE02❤\uD83D\uDE0D\uD83E\uDD23\uD83D\uDE0A\uD83D\uDE4F\uD83D\uDC95\uD83D\uDE2D\uD83D\uDE18\uD83D\uDC4D\uD83D\uDE05\uD83D\uDC4F\uD83D\uDE01\uD83D\uDD25\uD83E\uDD70\uD83D\uDC94\uD83D\uDC96\uD83D\uDC99\uD83D\uDE22\uD83E\uDD14\uD83D\uDE06\uD83D\uDE44\uD83D\uDCAA\uD83D\uDE09☺\uD83D\uDC4C\uD83E\uDD17\uD83D\uDC9C\uD83D\uDE14\uD83D\uDE0E\uD83D\uDE07\uD83C\uDF39\uD83E\uDD26\uD83C\uDF89\uD83D\uDC9E✌✨\uD83E\uDD37\uD83D\uDE31\uD83D\uDE0C\uD83C\uDF38\uD83D\uDE4C\uD83D\uDE0B\uD83D\uDC97\uD83D\uDC9A\uD83D\uDE0F\uD83D\uDC9B\uD83D\uDE42\uD83D\uDC93\uD83E\uDD29\uD83D\uDE04\uD83D\uDE00\uD83D\uDDA4\uD83D\uDE03\uD83D\uDCAF\uD83D\uDE48\uD83D\uDC47\uD83C\uDFB6\uD83D\uDE12\uD83E\uDD2D❣\uD83D\uDE1C\uD83D\uDC8B\uD83D\uDC40\uD83D\uDE2A\uD83D\uDE11\uD83D\uDCA5\uD83D\uDE4B\uD83D\uDE1E\uD83D\uDE29\uD83D\uDE21\uD83E\uDD2A\uD83D\uDC4A\uD83E\uDD73\uD83D\uDE25\uD83E\uDD24\uD83D\uDC49\uD83D\uDC83\uD83D\uDE33✋\uD83D\uDE1A\uD83D\uDE1D\uD83D\uDE34\uD83C\uDF1F\uD83D\uDE2C\uD83D\uDE43\uD83C\uDF40\uD83C\uDF37\uD83D\uDE3B\uD83D\uDE13⭐✅\uD83E\uDD7A\uD83C\uDF08\uD83D\uDE08\uD83E\uDD18\uD83D\uDCA6✔\uD83D\uDE23\uD83C\uDFC3\uD83D\uDC90☹\uD83C\uDF8A\uD83D\uDC98\uD83D\uDE20☝\uD83D\uDE15\uD83C\uDF3A\uD83C\uDF82\uD83C\uDF3B\uD83D\uDE10\uD83D\uDD95\uD83D\uDC9D\uD83D\uDE4A\uD83D\uDE39\uD83D\uDDE3\uD83D\uDCAB\uD83D\uDC80\uD83D\uDC51\uD83C\uDFB5\uD83E\uDD1E\uD83D\uDE1B\uD83D\uDD34\uD83D\uDE24\uD83C\uDF3C\uD83D\uDE2B⚽\uD83E\uDD19☕\uD83C\uDFC6\uD83E\uDD2B\uD83D\uDC48\uD83D\uDE2E\uD83D\uDE46\uD83C\uDF7B\uD83C\uDF43\uD83D\uDC36\uD83D\uDC81\uD83D\uDE32\uD83C\uDF3F\uD83E\uDDE1\uD83C\uDF81⚡\uD83C\uDF1E\uD83C\uDF88❌✊\uD83D\uDC4B\uD83D\uDE30\uD83E\uDD28\uD83D\uDE36\uD83E\uDD1D\uD83D\uDEB6\uD83D\uDCB0\uD83C\uDF53\uD83D\uDCA2\uD83E\uDD1F\uD83D\uDE41\uD83D\uDEA8\uD83D\uDCA8\uD83E\uDD2C✈\uD83C\uDF80\uD83C\uDF7A\uD83E\uDD13\uD83D\uDE19\uD83D\uDC9F\uD83C\uDF31\uD83D\uDE16\uD83D\uDC76\uD83E\uDD74▶➡❓\uD83D\uDC8E\uD83D\uDCB8⬇\uD83D\uDE28\uD83C\uDF1A\uD83E\uDD8B\uD83D\uDE37\uD83D\uDD7A⚠\uD83D\uDE45\uD83D\uDE1F\uD83D\uDE35\uD83D\uDC4E\uD83E\uDD32\uD83E\uDD20\uD83E\uDD27\uD83D\uDCCC\uD83D\uDD35\uD83D\uDC85\uD83E\uDDD0\uD83D\uDC3E\uD83C\uDF52\uD83D\uDE17\uD83E\uDD11\uD83C\uDF0A\uD83E\uDD2F\uD83D\uDC37☎\uD83D\uDCA7\uD83D\uDE2F\uD83D\uDC86\uD83D\uDC46\uD83C\uDFA4\uD83D\uDE47\uD83C\uDF51❄\uD83C\uDF34\uD83D\uDCA3\uD83D\uDC38\uD83D\uDC8C\uD83D\uDCCD\uD83E\uDD40\uD83E\uDD22\uD83D\uDC45\uD83D\uDCA1\uD83D\uDCA9\uD83D\uDC50\uD83D\uDCF8\uD83D\uDC7B\uD83E\uDD10\uD83E\uDD2E\uD83C\uDFBC\uD83E\uDD75\uD83D\uDEA9\uD83C\uDF4E\uD83C\uDF4A\uD83D\uDC7C\uD83D\uDC8D\uD83D\uDCE3\uD83E\uDD42"), _s = xe.reduce((r, e, t)=>(r[t] = e, r), []), Rs = xe.reduce((r, e, t)=>(r[e.codePointAt(0)] = t, r), []);
function Ts(r) {
    return r.reduce((e, t)=>(e += _s[t], e), "");
}
function Ss(r) {
    const e = [];
    for (const t of r){
        const i = Rs[t.codePointAt(0)];
        if (i === void 0) throw new Error(`Non-base256emoji character: ${t}`);
        e.push(i);
    }
    return new Uint8Array(e);
}
const Ps = G({
    prefix: "\uD83D\uDE80",
    name: "base256emoji",
    encode: Ts,
    decode: Ss
});
var Os = Object.freeze({
    __proto__: null,
    base256emoji: Ps
}), xs = ze, Ae = 128, As = 127, zs = ~As, Ns = Math.pow(2, 31);
function ze(r, e, t) {
    e = e || [], t = t || 0;
    for(var i = t; r >= Ns;)e[t++] = r & 255 | Ae, r /= 128;
    for(; r & zs;)e[t++] = r & 255 | Ae, r >>>= 7;
    return e[t] = r | 0, ze.bytes = t - i + 1, e;
}
var Us = ae, Ls = 128, Ne = 127;
function ae(r, i) {
    var t = 0, i = i || 0, s = 0, n = i, a, o = r.length;
    do {
        if (n >= o) throw ae.bytes = 0, new RangeError("Could not decode varint");
        a = r[n++], t += s < 28 ? (a & Ne) << s : (a & Ne) * Math.pow(2, s), s += 7;
    }while (a >= Ls);
    return ae.bytes = n - i, t;
}
var Fs = Math.pow(2, 7), $s = Math.pow(2, 14), Ms = Math.pow(2, 21), Ks = Math.pow(2, 28), ks = Math.pow(2, 35), Bs = Math.pow(2, 42), js = Math.pow(2, 49), Vs = Math.pow(2, 56), qs = Math.pow(2, 63), Gs = function(r) {
    return r < Fs ? 1 : r < $s ? 2 : r < Ms ? 3 : r < Ks ? 4 : r < ks ? 5 : r < Bs ? 6 : r < js ? 7 : r < Vs ? 8 : r < qs ? 9 : 10;
}, Ys = {
    encode: xs,
    decode: Us,
    encodingLength: Gs
}, Ue = Ys;
const Le = (r, e, t = 0)=>(Ue.encode(r, e, t), e), Fe = (r)=>Ue.encodingLength(r), oe = (r, e)=>{
    const t = e.byteLength, i = Fe(r), s = i + Fe(t), n = new Uint8Array(s + t);
    return Le(r, n, 0), Le(t, n, i), n.set(e, s), new Js(r, t, e, n);
};
class Js {
    constructor(e, t, i, s){
        this.code = e, this.size = t, this.digest = i, this.bytes = s;
    }
}
const $e = ({ name: r, code: e, encode: t })=>new Hs(r, e, t);
class Hs {
    constructor(e, t, i){
        this.name = e, this.code = t, this.encode = i;
    }
    digest(e) {
        if (e instanceof Uint8Array) {
            const t = this.encode(e);
            return t instanceof Uint8Array ? oe(this.code, t) : t.then((i)=>oe(this.code, i));
        } else throw Error("Unknown type, must be binary type");
    }
}
const Me = (r)=>async (e)=>new Uint8Array(await crypto.subtle.digest(r, e)), Ws = $e({
    name: "sha2-256",
    code: 18,
    encode: Me("SHA-256")
}), Xs = $e({
    name: "sha2-512",
    code: 19,
    encode: Me("SHA-512")
});
var Zs = Object.freeze({
    __proto__: null,
    sha256: Ws,
    sha512: Xs
});
const Ke = 0, Qs = "identity", ke = Pe, er = (r)=>oe(Ke, ke(r)), tr = {
    code: Ke,
    name: Qs,
    encode: ke,
    digest: er
};
var ir = Object.freeze({
    __proto__: null,
    identity: tr
});
new TextEncoder, new TextDecoder;
const Be = {
    ...Ji,
    ...Wi,
    ...Zi,
    ...es,
    ...ss,
    ...gs,
    ...ys,
    ...Es,
    ...Cs,
    ...Os
};
({
    ...Zs,
    ...ir
});
function je(r) {
    return globalThis.Buffer != null ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r;
}
function sr(r = 0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? je(globalThis.Buffer.allocUnsafe(r)) : new Uint8Array(r);
}
function Ve(r, e, t, i) {
    return {
        name: r,
        prefix: e,
        encoder: {
            name: r,
            prefix: e,
            encode: t
        },
        decoder: {
            decode: i
        }
    };
}
const qe = Ve("utf8", "u", (r)=>"u" + new TextDecoder("utf8").decode(r), (r)=>new TextEncoder().encode(r.substring(1))), he = Ve("ascii", "a", (r)=>{
    let e = "a";
    for(let t = 0; t < r.length; t++)e += String.fromCharCode(r[t]);
    return e;
}, (r)=>{
    r = r.substring(1);
    const e = sr(r.length);
    for(let t = 0; t < r.length; t++)e[t] = r.charCodeAt(t);
    return e;
}), rr = {
    utf8: qe,
    "utf-8": qe,
    hex: Be.base16,
    latin1: he,
    ascii: he,
    binary: he,
    ...Be
};
function nr(r, e = "utf8") {
    const t = rr[e];
    if (!t) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? je(globalThis.Buffer.from(r, "utf-8")) : t.decoder.decode(`${t.prefix}${r}`);
}
const ce = "wc", Ge = 2, Y = "core", O = `${ce}@2:${Y}:`, Ye = {
    name: Y,
    logger: "error"
}, Je = {
    database: ":memory:"
}, He = "crypto", ue = "client_ed25519_seed", We = (0, _time.ONE_DAY), Xe = "keychain", Ze = "0.3", Qe = "messages", et = "0.3", tt = (0, _time.SIX_HOURS), it = "publisher", st = "irn", rt = "error", le = "wss://relay.walletconnect.com", nt = "relayer", g = {
    message: "relayer_message",
    message_ack: "relayer_message_ack",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish"
}, at = "_subscription", L = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error"
}, ot = (0, _time.ONE_SECOND) / 2, ar = {
    database: ":memory:"
}, ht = "2.8.4", ct = 1e4, ut = "0.3", lt = "WALLETCONNECT_CLIENT_ID", C = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed"
}, or = (0, _time.THIRTY_DAYS), dt = "subscription", gt = "0.3", pt = (0, _time.FIVE_SECONDS) * 1e3, Dt = "pairing", yt = "0.3", hr = (0, _time.THIRTY_DAYS), F = {
    wc_pairingDelete: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1e3
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1001
        }
    },
    wc_pairingPing: {
        req: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1002
        },
        res: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1003
        }
    },
    unregistered_method: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 0
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 0
        }
    }
}, _ = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}, bt = "history", mt = "0.3", Et = "expirer", w = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync"
}, ft = "0.3", cr = (0, _time.ONE_DAY), J = "verify-api", de = "https://verify.walletconnect.com";
class wt {
    constructor(e, t){
        this.core = e, this.logger = t, this.keychain = new Map, this.name = Xe, this.version = Ze, this.initialized = !1, this.storagePrefix = O, this.init = async ()=>{
            if (!this.initialized) {
                const i = await this.getKeyChain();
                typeof i < "u" && (this.keychain = i), this.initialized = !0;
            }
        }, this.has = (i)=>(this.isInitialized(), this.keychain.has(i)), this.set = async (i, s)=>{
            this.isInitialized(), this.keychain.set(i, s), await this.persist();
        }, this.get = (i)=>{
            this.isInitialized();
            const s = this.keychain.get(i);
            if (typeof s > "u") {
                const { message: n } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${i}`);
                throw new Error(n);
            }
            return s;
        }, this.del = async (i)=>{
            this.isInitialized(), this.keychain.delete(i), await this.persist();
        }, this.core = e, this.logger = (0, _logger.generateChildLogger)(t, this.name);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    async setKeyChain(e) {
        await this.core.storage.setItem(this.storageKey, (0, _utils.mapToObj)(e));
    }
    async getKeyChain() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? (0, _utils.objToMap)(e) : void 0;
    }
    async persist() {
        await this.setKeyChain(this.keychain);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class vt {
    constructor(e, t, i){
        this.core = e, this.logger = t, this.name = He, this.initialized = !1, this.init = async ()=>{
            this.initialized || (await this.keychain.init(), this.initialized = !0);
        }, this.hasKeys = (s)=>(this.isInitialized(), this.keychain.has(s)), this.getClientId = async ()=>{
            this.isInitialized();
            const s = await this.getClientSeed(), n = _relayAuth.generateKeyPair(s);
            return _relayAuth.encodeIss(n.publicKey);
        }, this.generateKeyPair = ()=>{
            this.isInitialized();
            const s = (0, _utils.generateKeyPair)();
            return this.setPrivateKey(s.publicKey, s.privateKey);
        }, this.signJWT = async (s)=>{
            this.isInitialized();
            const n = await this.getClientSeed(), a = _relayAuth.generateKeyPair(n), o = (0, _utils.generateRandomBytes32)(), h = We;
            return await _relayAuth.signJWT(o, s, h, a);
        }, this.generateSharedKey = (s, n, a)=>{
            this.isInitialized();
            const o = this.getPrivateKey(s), h = (0, _utils.deriveSymKey)(o, n);
            return this.setSymKey(h, a);
        }, this.setSymKey = async (s, n)=>{
            this.isInitialized();
            const a = n || (0, _utils.hashKey)(s);
            return await this.keychain.set(a, s), a;
        }, this.deleteKeyPair = async (s)=>{
            this.isInitialized(), await this.keychain.del(s);
        }, this.deleteSymKey = async (s)=>{
            this.isInitialized(), await this.keychain.del(s);
        }, this.encode = async (s, n, a)=>{
            this.isInitialized();
            const o = (0, _utils.validateEncoding)(a), h = (0, _safeJson.safeJsonStringify)(n);
            if ((0, _utils.isTypeOneEnvelope)(o)) {
                const b = o.senderPublicKey, k = o.receiverPublicKey;
                s = await this.generateSharedKey(b, k);
            }
            const d = this.getSymKey(s), { type: l, senderPublicKey: D } = o;
            return (0, _utils.encrypt)({
                type: l,
                symKey: d,
                message: h,
                senderPublicKey: D
            });
        }, this.decode = async (s, n, a)=>{
            this.isInitialized();
            const o = (0, _utils.validateDecoding)(n, a);
            if ((0, _utils.isTypeOneEnvelope)(o)) {
                const l = o.receiverPublicKey, D = o.senderPublicKey;
                s = await this.generateSharedKey(l, D);
            }
            const h = this.getSymKey(s), d = (0, _utils.decrypt)({
                symKey: h,
                encoded: n
            });
            return (0, _safeJson.safeJsonParse)(d);
        }, this.getPayloadType = (s)=>{
            const n = (0, _utils.deserialize)(s);
            return (0, _utils.decodeTypeByte)(n.type);
        }, this.getPayloadSenderPublicKey = (s)=>{
            const n = (0, _utils.deserialize)(s);
            return n.senderPublicKey ? (0, _uint8Arrays.toString)(n.senderPublicKey, (0, _utils.BASE16)) : void 0;
        }, this.core = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.keychain = i || new wt(this.core, this.logger);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    async setPrivateKey(e, t) {
        return await this.keychain.set(e, t), e;
    }
    getPrivateKey(e) {
        return this.keychain.get(e);
    }
    async getClientSeed() {
        let e = "";
        try {
            e = this.keychain.get(ue);
        } catch  {
            e = (0, _utils.generateRandomBytes32)(), await this.keychain.set(ue, e);
        }
        return nr(e, "base16");
    }
    getSymKey(e) {
        return this.keychain.get(e);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class It extends (0, _types.IMessageTracker) {
    constructor(e, t){
        super(e, t), this.logger = e, this.core = t, this.messages = new Map, this.name = Qe, this.version = et, this.initialized = !1, this.storagePrefix = O, this.init = async ()=>{
            if (!this.initialized) {
                this.logger.trace("Initialized");
                try {
                    const i = await this.getRelayerMessages();
                    typeof i < "u" && (this.messages = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
                        type: "method",
                        method: "restore",
                        size: this.messages.size
                    });
                } catch (i) {
                    this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
                } finally{
                    this.initialized = !0;
                }
            }
        }, this.set = async (i, s)=>{
            this.isInitialized();
            const n = (0, _utils.hashMessage)(s);
            let a = this.messages.get(i);
            return typeof a > "u" && (a = {}), typeof a[n] < "u" || (a[n] = s, this.messages.set(i, a), await this.persist()), n;
        }, this.get = (i)=>{
            this.isInitialized();
            let s = this.messages.get(i);
            return typeof s > "u" && (s = {}), s;
        }, this.has = (i, s)=>{
            this.isInitialized();
            const n = this.get(i), a = (0, _utils.hashMessage)(s);
            return typeof n[a] < "u";
        }, this.del = async (i)=>{
            this.isInitialized(), this.messages.delete(i), await this.persist();
        }, this.logger = (0, _logger.generateChildLogger)(e, this.name), this.core = t;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    async setRelayerMessages(e) {
        await this.core.storage.setItem(this.storageKey, (0, _utils.mapToObj)(e));
    }
    async getRelayerMessages() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? (0, _utils.objToMap)(e) : void 0;
    }
    async persist() {
        await this.setRelayerMessages(this.messages);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class ur extends (0, _types.IPublisher) {
    constructor(e, t){
        super(e, t), this.relayer = e, this.logger = t, this.events = new (0, _events.EventEmitter), this.name = it, this.queue = new Map, this.publishTimeout = (0, _time.toMiliseconds)((0, _time.TEN_SECONDS)), this.queueTimeout = (0, _time.toMiliseconds)((0, _time.FIVE_SECONDS)), this.needsTransportRestart = !1, this.publish = async (i, s, n)=>{
            this.logger.debug("Publishing Payload"), this.logger.trace({
                type: "method",
                method: "publish",
                params: {
                    topic: i,
                    message: s,
                    opts: n
                }
            });
            try {
                const a = n?.ttl || tt, o = (0, _utils.getRelayProtocolName)(n), h = n?.prompt || !1, d = n?.tag || 0, l = n?.id || (0, _jsonrpcUtils.getBigIntRpcId)().toString(), D = {
                    topic: i,
                    message: s,
                    opts: {
                        ttl: a,
                        relay: o,
                        prompt: h,
                        tag: d,
                        id: l
                    }
                }, b = setTimeout(()=>this.queue.set(l, D), this.queueTimeout);
                try {
                    await await (0, _utils.createExpiringPromise)(this.rpcPublish(i, s, a, o, h, d, l), this.publishTimeout), clearTimeout(b), this.relayer.events.emit(g.publish, D);
                } catch  {
                    this.logger.debug("Publishing Payload stalled"), this.needsTransportRestart = !0;
                    return;
                }
                this.logger.debug("Successfully Published Payload"), this.logger.trace({
                    type: "method",
                    method: "publish",
                    params: {
                        topic: i,
                        message: s,
                        opts: n
                    }
                });
            } catch (a) {
                throw this.logger.debug("Failed to Publish Payload"), this.logger.error(a), a;
            }
        }, this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.relayer = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.registerEventListeners();
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    rpcPublish(e, t, i, s, n, a, o) {
        var h, d, l, D;
        const b = {
            method: (0, _utils.getRelayProtocolApi)(s.protocol).publish,
            params: {
                topic: e,
                message: t,
                ttl: i,
                prompt: n,
                tag: a
            },
            id: o
        };
        return (0, _utils.isUndefined)((h = b.params) == null ? void 0 : h.prompt) && ((d = b.params) == null || delete d.prompt), (0, _utils.isUndefined)((l = b.params) == null ? void 0 : l.tag) && ((D = b.params) == null || delete D.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "message",
            direction: "outgoing",
            request: b
        }), this.relayer.request(b);
    }
    onPublish(e) {
        this.queue.delete(e);
    }
    checkQueue() {
        this.queue.forEach(async (e)=>{
            const { topic: t, message: i, opts: s } = e;
            await this.publish(t, i, s);
        });
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on((0, _heartbeat.HEARTBEAT_EVENTS).pulse, ()=>{
            if (this.needsTransportRestart) {
                this.needsTransportRestart = !1, this.relayer.events.emit(g.connection_stalled);
                return;
            }
            this.checkQueue();
        }), this.relayer.on(g.message_ack, (e)=>{
            this.onPublish(e.id.toString());
        });
    }
}
class lr {
    constructor(){
        this.map = new Map, this.set = (e, t)=>{
            const i = this.get(e);
            this.exists(e, t) || this.map.set(e, [
                ...i,
                t
            ]);
        }, this.get = (e)=>this.map.get(e) || [], this.exists = (e, t)=>this.get(e).includes(t), this.delete = (e, t)=>{
            if (typeof t > "u") {
                this.map.delete(e);
                return;
            }
            if (!this.map.has(e)) return;
            const i = this.get(e);
            if (!this.exists(e, t)) return;
            const s = i.filter((n)=>n !== t);
            if (!s.length) {
                this.map.delete(e);
                return;
            }
            this.map.set(e, s);
        }, this.clear = ()=>{
            this.map.clear();
        };
    }
    get topics() {
        return Array.from(this.map.keys());
    }
}
var dr = Object.defineProperty, gr = Object.defineProperties, pr = Object.getOwnPropertyDescriptors, Ct = Object.getOwnPropertySymbols, Dr = Object.prototype.hasOwnProperty, yr = Object.prototype.propertyIsEnumerable, _t = (r, e, t)=>e in r ? dr(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, K = (r, e)=>{
    for(var t in e || (e = {}))Dr.call(e, t) && _t(r, t, e[t]);
    if (Ct) for (var t of Ct(e))yr.call(e, t) && _t(r, t, e[t]);
    return r;
}, ge = (r, e)=>gr(r, pr(e));
class Rt extends (0, _types.ISubscriber) {
    constructor(e, t){
        super(e, t), this.relayer = e, this.logger = t, this.subscriptions = new Map, this.topicMap = new lr, this.events = new (0, _events.EventEmitter), this.name = dt, this.version = gt, this.pending = new Map, this.cached = [], this.initialized = !1, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = O, this.subscribeTimeout = 1e4, this.restartInProgress = !1, this.batchSubscribeTopicsLimit = 500, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restart(), this.registerEventListeners(), this.onEnable(), this.clientId = await this.relayer.core.crypto.getClientId());
        }, this.subscribe = async (i, s)=>{
            await this.restartToComplete(), this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({
                type: "method",
                method: "subscribe",
                params: {
                    topic: i,
                    opts: s
                }
            });
            try {
                const n = (0, _utils.getRelayProtocolName)(s), a = {
                    topic: i,
                    relay: n
                };
                this.pending.set(i, a);
                const o = await this.rpcSubscribe(i, n);
                return this.onSubscribe(o, a), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({
                    type: "method",
                    method: "subscribe",
                    params: {
                        topic: i,
                        opts: s
                    }
                }), o;
            } catch (n) {
                throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n), n;
            }
        }, this.unsubscribe = async (i, s)=>{
            await this.restartToComplete(), this.isInitialized(), typeof s?.id < "u" ? await this.unsubscribeById(i, s.id, s) : await this.unsubscribeByTopic(i, s);
        }, this.isSubscribed = async (i)=>this.topics.includes(i) ? !0 : await new Promise((s, n)=>{
                const a = new (0, _time.Watch);
                a.start(this.pendingSubscriptionWatchLabel);
                const o = setInterval(()=>{
                    !this.pending.has(i) && this.topics.includes(i) && (clearInterval(o), a.stop(this.pendingSubscriptionWatchLabel), s(!0)), a.elapsed(this.pendingSubscriptionWatchLabel) >= pt && (clearInterval(o), a.stop(this.pendingSubscriptionWatchLabel), n(new Error("Subscription resolution timeout")));
                }, this.pollingInterval);
            }).catch(()=>!1), this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.restart = async ()=>{
            this.restartInProgress = !0, await this.restore(), await this.reset(), this.restartInProgress = !1;
        }, this.relayer = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.clientId = "";
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get length() {
        return this.subscriptions.size;
    }
    get ids() {
        return Array.from(this.subscriptions.keys());
    }
    get values() {
        return Array.from(this.subscriptions.values());
    }
    get topics() {
        return this.topicMap.topics;
    }
    hasSubscription(e, t) {
        let i = !1;
        try {
            i = this.getSubscription(e).topic === t;
        } catch  {}
        return i;
    }
    onEnable() {
        this.cached = [], this.initialized = !0;
    }
    onDisable() {
        this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
    }
    async unsubscribeByTopic(e, t) {
        const i = this.topicMap.get(e);
        await Promise.all(i.map(async (s)=>await this.unsubscribeById(e, s, t)));
    }
    async unsubscribeById(e, t, i) {
        this.logger.debug("Unsubscribing Topic"), this.logger.trace({
            type: "method",
            method: "unsubscribe",
            params: {
                topic: e,
                id: t,
                opts: i
            }
        });
        try {
            const s = (0, _utils.getRelayProtocolName)(i);
            await this.rpcUnsubscribe(e, t, s);
            const n = (0, _utils.getSdkError)("USER_DISCONNECTED", `${this.name}, ${e}`);
            await this.onUnsubscribe(e, t, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({
                type: "method",
                method: "unsubscribe",
                params: {
                    topic: e,
                    id: t,
                    opts: i
                }
            });
        } catch (s) {
            throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
        }
    }
    async rpcSubscribe(e, t) {
        const i = {
            method: (0, _utils.getRelayProtocolApi)(t.protocol).subscribe,
            params: {
                topic: e
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: i
        });
        try {
            await await (0, _utils.createExpiringPromise)(this.relayer.request(i), this.subscribeTimeout);
        } catch  {
            this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(g.connection_stalled);
        }
        return (0, _utils.hashMessage)(e + this.clientId);
    }
    async rpcBatchSubscribe(e) {
        if (!e.length) return;
        const t = e[0].relay, i = {
            method: (0, _utils.getRelayProtocolApi)(t.protocol).batchSubscribe,
            params: {
                topics: e.map((s)=>s.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: i
        });
        try {
            return await await (0, _utils.createExpiringPromise)(this.relayer.request(i), this.subscribeTimeout);
        } catch  {
            this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(g.connection_stalled);
        }
    }
    rpcUnsubscribe(e, t, i) {
        const s = {
            method: (0, _utils.getRelayProtocolApi)(i.protocol).unsubscribe,
            params: {
                topic: e,
                id: t
            }
        };
        return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: s
        }), this.relayer.request(s);
    }
    onSubscribe(e, t) {
        this.setSubscription(e, ge(K({}, t), {
            id: e
        })), this.pending.delete(t.topic);
    }
    onBatchSubscribe(e) {
        e.length && e.forEach((t)=>{
            this.setSubscription(t.id, K({}, t)), this.pending.delete(t.topic);
        });
    }
    async onUnsubscribe(e, t, i) {
        this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
    }
    async setRelayerSubscriptions(e) {
        await this.relayer.core.storage.setItem(this.storageKey, e);
    }
    async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey);
    }
    setSubscription(e, t) {
        this.subscriptions.has(e) || (this.logger.debug("Setting subscription"), this.logger.trace({
            type: "method",
            method: "setSubscription",
            id: e,
            subscription: t
        }), this.addSubscription(e, t));
    }
    addSubscription(e, t) {
        this.subscriptions.set(e, K({}, t)), this.topicMap.set(t.topic, e), this.events.emit(C.created, t);
    }
    getSubscription(e) {
        this.logger.debug("Getting subscription"), this.logger.trace({
            type: "method",
            method: "getSubscription",
            id: e
        });
        const t = this.subscriptions.get(e);
        if (!t) {
            const { message: i } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw new Error(i);
        }
        return t;
    }
    deleteSubscription(e, t) {
        this.logger.debug("Deleting subscription"), this.logger.trace({
            type: "method",
            method: "deleteSubscription",
            id: e,
            reason: t
        });
        const i = this.getSubscription(e);
        this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(C.deleted, ge(K({}, i), {
            reason: t
        }));
    }
    async persist() {
        await this.setRelayerSubscriptions(this.values), this.events.emit(C.sync);
    }
    async reset() {
        if (this.cached.length) {
            const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
            for(let t = 0; t < e; t++){
                const i = this.cached.splice(0, this.batchSubscribeTopicsLimit);
                await this.batchSubscribe(i);
            }
        }
        this.events.emit(C.resubscribed);
    }
    async restore() {
        try {
            const e = await this.getRelayerSubscriptions();
            if (typeof e > "u" || !e.length) return;
            if (this.subscriptions.size) {
                const { message: t } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                subscriptions: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
        }
    }
    async batchSubscribe(e) {
        if (!e.length) return;
        const t = await this.rpcBatchSubscribe(e);
        (0, _utils.isValidArray)(t) && this.onBatchSubscribe(t.map((i, s)=>ge(K({}, e[s]), {
                id: i
            })));
    }
    async onConnect() {
        this.restartInProgress || (await this.restart(), this.onEnable());
    }
    onDisconnect() {
        this.onDisable();
    }
    async checkPending() {
        if (this.relayer.transportExplicitlyClosed) return;
        const e = [];
        this.pending.forEach((t)=>{
            e.push(t);
        }), await this.batchSubscribe(e);
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on((0, _heartbeat.HEARTBEAT_EVENTS).pulse, async ()=>{
            await this.checkPending();
        }), this.relayer.on(g.connect, async ()=>{
            await this.onConnect();
        }), this.relayer.on(g.disconnect, ()=>{
            this.onDisconnect();
        }), this.events.on(C.created, async (e)=>{
            const t = C.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), await this.persist();
        }), this.events.on(C.deleted, async (e)=>{
            const t = C.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), await this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    async restartToComplete() {
        this.restartInProgress && await new Promise((e)=>{
            const t = setInterval(()=>{
                this.restartInProgress || (clearInterval(t), e());
            }, this.pollingInterval);
        });
    }
}
var br = Object.defineProperty, Tt = Object.getOwnPropertySymbols, mr = Object.prototype.hasOwnProperty, Er = Object.prototype.propertyIsEnumerable, St = (r, e, t)=>e in r ? br(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, fr = (r, e)=>{
    for(var t in e || (e = {}))mr.call(e, t) && St(r, t, e[t]);
    if (Tt) for (var t of Tt(e))Er.call(e, t) && St(r, t, e[t]);
    return r;
};
class Pt extends (0, _types.IRelayer) {
    constructor(e){
        super(e), this.protocol = "wc", this.version = 2, this.events = new (0, _events.EventEmitter), this.name = nt, this.transportExplicitlyClosed = !1, this.initialized = !1, this.reconnecting = !1, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = [
            "socket hang up",
            "socket stalled"
        ], this.request = async (t)=>{
            this.logger.debug("Publishing Request Payload");
            try {
                return await this.toEstablishConnection(), await this.provider.request(t);
            } catch (i) {
                throw this.logger.debug("Failed to Publish Request"), this.logger.error(i), i;
            }
        }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? (0, _logger.generateChildLogger)(e.logger, this.name) : (0, _logger.pino)((0, _logger.getDefaultLoggerOptions)({
            level: e.logger || rt
        })), this.messages = new It(this.logger, e.core), this.subscriber = new Rt(this, this.logger), this.publisher = new ur(this, this.logger), this.relayUrl = e?.relayUrl || le, this.projectId = e.projectId, this.provider = {};
    }
    async init() {
        this.logger.trace("Initialized"), await this.createProvider(), await Promise.all([
            this.messages.init(),
            this.transportOpen(),
            this.subscriber.init()
        ]), this.registerEventListeners(), this.initialized = !0, setTimeout(async ()=>{
            this.subscriber.topics.length === 0 && (this.logger.info("No topics subscribted to after init, closing transport"), await this.transportClose(), this.transportExplicitlyClosed = !1);
        }, ct);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get connected() {
        return this.provider.connection.connected;
    }
    get connecting() {
        return this.provider.connection.connecting;
    }
    async publish(e, t, i) {
        this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({
            topic: e,
            message: t,
            publishedAt: Date.now()
        });
    }
    async subscribe(e, t) {
        var i;
        this.isInitialized();
        let s = ((i = this.subscriber.topicMap.get(e)) == null ? void 0 : i[0]) || "";
        return s || (await Promise.all([
            new Promise((n)=>{
                this.subscriber.once(C.created, (a)=>{
                    a.topic === e && n();
                });
            }),
            new Promise(async (n)=>{
                s = await this.subscriber.subscribe(e, t), n();
            })
        ]), s);
    }
    async unsubscribe(e, t) {
        this.isInitialized(), await this.subscriber.unsubscribe(e, t);
    }
    on(e, t) {
        this.events.on(e, t);
    }
    once(e, t) {
        this.events.once(e, t);
    }
    off(e, t) {
        this.events.off(e, t);
    }
    removeListener(e, t) {
        this.events.removeListener(e, t);
    }
    async transportClose() {
        this.transportExplicitlyClosed = !0, this.connected && (await this.provider.disconnect(), this.events.emit(g.transport_closed));
    }
    async transportOpen(e) {
        if (this.transportExplicitlyClosed = !1, !this.reconnecting) {
            this.relayUrl = e || this.relayUrl, this.reconnecting = !0;
            try {
                await Promise.all([
                    new Promise((t)=>{
                        this.initialized || t(), this.subscriber.once(C.resubscribed, ()=>{
                            t();
                        });
                    }),
                    await Promise.race([
                        new Promise(async (t, i)=>{
                            await (0, _utils.createExpiringPromise)(this.provider.connect(), 5e3, "socket stalled").catch((s)=>i(s)).then(()=>t()).finally(()=>this.removeListener(g.transport_closed, this.rejectTransportOpen));
                        }),
                        new Promise((t)=>this.once(g.transport_closed, this.rejectTransportOpen))
                    ])
                ]);
            } catch (t) {
                this.logger.error(t);
                const i = t;
                if (!this.isConnectionStalled(i.message)) throw t;
                this.events.emit(g.transport_closed);
            } finally{
                this.reconnecting = !1;
            }
        }
    }
    async restartTransport(e) {
        this.transportExplicitlyClosed || this.reconnecting || (this.relayUrl = e || this.relayUrl, this.connected && await Promise.all([
            new Promise((t)=>{
                this.provider.once(L.disconnect, ()=>{
                    t();
                });
            }),
            this.transportClose()
        ]), await this.createProvider(), await this.transportOpen());
    }
    isConnectionStalled(e) {
        return this.staleConnectionErrors.some((t)=>e.includes(t));
    }
    rejectTransportOpen() {
        throw new Error("Attempt to connect to relay via `transportOpen` has stalled. Retrying...");
    }
    async createProvider() {
        const e = await this.core.crypto.signJWT(this.relayUrl);
        this.provider = new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcWsConnectionDefault.default)((0, _utils.formatRelayRpcUrl)({
            sdkVersion: ht,
            protocol: this.protocol,
            version: this.version,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
            auth: e,
            useOnCloseEvent: !0
        }))), this.registerProviderListeners();
    }
    async recordMessageEvent(e) {
        const { topic: t, message: i } = e;
        await this.messages.set(t, i);
    }
    async shouldIgnoreMessageEvent(e) {
        const { topic: t, message: i } = e;
        return await this.subscriber.isSubscribed(t) ? this.messages.has(t, i) : !0;
    }
    async onProviderPayload(e) {
        if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "incoming",
            payload: e
        }), (0, _jsonrpcUtils.isJsonRpcRequest)(e)) {
            if (!e.method.endsWith(at)) return;
            const t = e.params, { topic: i, message: s, publishedAt: n } = t.data, a = {
                topic: i,
                message: s,
                publishedAt: n
            };
            this.logger.debug("Emitting Relayer Payload"), this.logger.trace(fr({
                type: "event",
                event: t.id
            }, a)), this.events.emit(t.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
        } else (0, _jsonrpcUtils.isJsonRpcResponse)(e) && this.events.emit(g.message_ack, e);
    }
    async onMessageEvent(e) {
        await this.shouldIgnoreMessageEvent(e) || (this.events.emit(g.message, e), await this.recordMessageEvent(e));
    }
    async acknowledgePayload(e) {
        const t = (0, _jsonrpcUtils.formatJsonRpcResult)(e.id, !0);
        await this.provider.connection.send(t);
    }
    registerProviderListeners() {
        this.provider.on(L.payload, (e)=>this.onProviderPayload(e)), this.provider.on(L.connect, ()=>{
            this.events.emit(g.connect);
        }), this.provider.on(L.disconnect, ()=>{
            this.onProviderDisconnect();
        }), this.provider.on(L.error, (e)=>{
            this.logger.error(e), this.events.emit(g.error, e);
        });
    }
    registerEventListeners() {
        this.events.on(g.connection_stalled, async ()=>{
            await this.restartTransport();
        });
    }
    onProviderDisconnect() {
        this.events.emit(g.disconnect), this.attemptToReconnect();
    }
    attemptToReconnect() {
        this.transportExplicitlyClosed || setTimeout(async ()=>{
            await this.restartTransport();
        }, (0, _time.toMiliseconds)(ot));
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    async toEstablishConnection() {
        if (!this.connected) {
            if (this.connecting) return await new Promise((e)=>{
                const t = setInterval(()=>{
                    this.connected && (clearInterval(t), e());
                }, this.connectionStatusPollingInterval);
            });
            await this.restartTransport();
        }
    }
}
var wr = Object.defineProperty, Ot = Object.getOwnPropertySymbols, vr = Object.prototype.hasOwnProperty, Ir = Object.prototype.propertyIsEnumerable, xt = (r, e, t)=>e in r ? wr(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, At = (r, e)=>{
    for(var t in e || (e = {}))vr.call(e, t) && xt(r, t, e[t]);
    if (Ot) for (var t of Ot(e))Ir.call(e, t) && xt(r, t, e[t]);
    return r;
};
class zt extends (0, _types.IStore) {
    constructor(e, t, i, s = O, n){
        super(e, t, i, s), this.core = e, this.logger = t, this.name = i, this.map = new Map, this.version = ut, this.cached = [], this.initialized = !1, this.storagePrefix = O, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((a)=>{
                this.getKey && a !== null && !(0, _utils.isUndefined)(a) ? this.map.set(this.getKey(a), a) : (0, _utils.isProposalStruct)(a) ? this.map.set(a.id, a) : (0, _utils.isSessionStruct)(a) && this.map.set(a.topic, a);
            }), this.cached = [], this.initialized = !0);
        }, this.set = async (a, o)=>{
            this.isInitialized(), this.map.has(a) ? await this.update(a, o) : (this.logger.debug("Setting value"), this.logger.trace({
                type: "method",
                method: "set",
                key: a,
                value: o
            }), this.map.set(a, o), await this.persist());
        }, this.get = (a)=>(this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({
                type: "method",
                method: "get",
                key: a
            }), this.getData(a)), this.getAll = (a)=>(this.isInitialized(), a ? this.values.filter((o)=>Object.keys(a).every((h)=>(0, _lodashIsequalDefault.default)(o[h], a[h]))) : this.values), this.update = async (a, o)=>{
            this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({
                type: "method",
                method: "update",
                key: a,
                update: o
            });
            const h = At(At({}, this.getData(a)), o);
            this.map.set(a, h), await this.persist();
        }, this.delete = async (a, o)=>{
            this.isInitialized(), this.map.has(a) && (this.logger.debug("Deleting value"), this.logger.trace({
                type: "method",
                method: "delete",
                key: a,
                reason: o
            }), this.map.delete(a), await this.persist());
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.storagePrefix = s, this.getKey = n;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get length() {
        return this.map.size;
    }
    get keys() {
        return Array.from(this.map.keys());
    }
    get values() {
        return Array.from(this.map.values());
    }
    async setDataStore(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getDataStore() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getData(e) {
        const t = this.map.get(e);
        if (!t) {
            const { message: i } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw this.logger.error(i), new Error(i);
        }
        return t;
    }
    async persist() {
        await this.setDataStore(this.values);
    }
    async restore() {
        try {
            const e = await this.getDataStore();
            if (typeof e > "u" || !e.length) return;
            if (this.map.size) {
                const { message: t } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                value: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class Nt {
    constructor(e, t){
        this.core = e, this.logger = t, this.name = Dt, this.version = yt, this.events = new (0, _eventsDefault.default), this.initialized = !1, this.storagePrefix = O, this.ignoredPayloadTypes = [
            (0, _utils.TYPE_1)
        ], this.registeredMethods = [], this.init = async ()=>{
            this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
        }, this.register = ({ methods: i })=>{
            this.isInitialized(), this.registeredMethods = [
                ...new Set([
                    ...this.registeredMethods,
                    ...i
                ])
            ];
        }, this.create = async ()=>{
            this.isInitialized();
            const i = (0, _utils.generateRandomBytes32)(), s = await this.core.crypto.setSymKey(i), n = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES)), a = {
                protocol: st
            }, o = {
                topic: s,
                expiry: n,
                relay: a,
                active: !1
            }, h = (0, _utils.formatUri)({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: s,
                symKey: i,
                relay: a
            });
            return await this.pairings.set(s, o), await this.core.relayer.subscribe(s), this.core.expirer.set(s, n), {
                topic: s,
                uri: h
            };
        }, this.pair = async (i)=>{
            this.isInitialized(), this.isValidPair(i);
            const { topic: s, symKey: n, relay: a } = (0, _utils.parseUri)(i.uri);
            if (this.pairings.keys.includes(s)) throw new Error(`Pairing already exists: ${s}`);
            if (this.core.crypto.hasKeys(s)) throw new Error(`Keychain already exists: ${s}`);
            const o = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES)), h = {
                topic: s,
                relay: a,
                expiry: o,
                active: !1
            };
            return await this.pairings.set(s, h), await this.core.crypto.setSymKey(n, s), await this.core.relayer.subscribe(s, {
                relay: a
            }), this.core.expirer.set(s, o), i.activatePairing && await this.activate({
                topic: s
            }), h;
        }, this.activate = async ({ topic: i })=>{
            this.isInitialized();
            const s = (0, _utils.calcExpiry)((0, _time.THIRTY_DAYS));
            await this.pairings.update(i, {
                active: !0,
                expiry: s
            }), this.core.expirer.set(i, s);
        }, this.ping = async (i)=>{
            this.isInitialized(), await this.isValidPing(i);
            const { topic: s } = i;
            if (this.pairings.keys.includes(s)) {
                const n = await this.sendRequest(s, "wc_pairingPing", {}), { done: a, resolve: o, reject: h } = (0, _utils.createDelayedPromise)();
                this.events.once((0, _utils.engineEvent)("pairing_ping", n), ({ error: d })=>{
                    d ? h(d) : o();
                }), await a();
            }
        }, this.updateExpiry = async ({ topic: i, expiry: s })=>{
            this.isInitialized(), await this.pairings.update(i, {
                expiry: s
            });
        }, this.updateMetadata = async ({ topic: i, metadata: s })=>{
            this.isInitialized(), await this.pairings.update(i, {
                peerMetadata: s
            });
        }, this.getPairings = ()=>(this.isInitialized(), this.pairings.values), this.disconnect = async (i)=>{
            this.isInitialized(), await this.isValidDisconnect(i);
            const { topic: s } = i;
            this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", (0, _utils.getSdkError)("USER_DISCONNECTED")), await this.deletePairing(s));
        }, this.sendRequest = async (i, s, n)=>{
            const a = (0, _jsonrpcUtils.formatJsonRpcRequest)(s, n), o = await this.core.crypto.encode(i, a), h = F[s].req;
            return this.core.history.set(i, a), this.core.relayer.publish(i, o, h), a.id;
        }, this.sendResult = async (i, s, n)=>{
            const a = (0, _jsonrpcUtils.formatJsonRpcResult)(i, n), o = await this.core.crypto.encode(s, a), h = await this.core.history.get(s, i), d = F[h.request.method].res;
            await this.core.relayer.publish(s, o, d), await this.core.history.resolve(a);
        }, this.sendError = async (i, s, n)=>{
            const a = (0, _jsonrpcUtils.formatJsonRpcError)(i, n), o = await this.core.crypto.encode(s, a), h = await this.core.history.get(s, i), d = F[h.request.method] ? F[h.request.method].res : F.unregistered_method.res;
            await this.core.relayer.publish(s, o, d), await this.core.history.resolve(a);
        }, this.deletePairing = async (i, s)=>{
            await this.core.relayer.unsubscribe(i), await Promise.all([
                this.pairings.delete(i, (0, _utils.getSdkError)("USER_DISCONNECTED")),
                this.core.crypto.deleteSymKey(i),
                s ? Promise.resolve() : this.core.expirer.del(i)
            ]);
        }, this.cleanup = async ()=>{
            const i = this.pairings.getAll().filter((s)=>(0, _utils.isExpired)(s.expiry));
            await Promise.all(i.map((s)=>this.deletePairing(s.topic)));
        }, this.onRelayEventRequest = (i)=>{
            const { topic: s, payload: n } = i, a = n.method;
            if (this.pairings.keys.includes(s)) switch(a){
                case "wc_pairingPing":
                    return this.onPairingPingRequest(s, n);
                case "wc_pairingDelete":
                    return this.onPairingDeleteRequest(s, n);
                default:
                    return this.onUnknownRpcMethodRequest(s, n);
            }
        }, this.onRelayEventResponse = async (i)=>{
            const { topic: s, payload: n } = i, a = (await this.core.history.get(s, n.id)).request.method;
            if (this.pairings.keys.includes(s)) switch(a){
                case "wc_pairingPing":
                    return this.onPairingPingResponse(s, n);
                default:
                    return this.onUnknownRpcMethodResponse(a);
            }
        }, this.onPairingPingRequest = async (i, s)=>{
            const { id: n } = s;
            try {
                this.isValidPing({
                    topic: i
                }), await this.sendResult(n, i, !0), this.events.emit("pairing_ping", {
                    id: n,
                    topic: i
                });
            } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
            }
        }, this.onPairingPingResponse = (i, s)=>{
            const { id: n } = s;
            setTimeout(()=>{
                (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("pairing_ping", n), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("pairing_ping", n), {
                    error: s.error
                });
            }, 500);
        }, this.onPairingDeleteRequest = async (i, s)=>{
            const { id: n } = s;
            try {
                this.isValidDisconnect({
                    topic: i
                }), await this.deletePairing(i), this.events.emit("pairing_delete", {
                    id: n,
                    topic: i
                });
            } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
            }
        }, this.onUnknownRpcMethodRequest = async (i, s)=>{
            const { id: n, method: a } = s;
            try {
                if (this.registeredMethods.includes(a)) return;
                const o = (0, _utils.getSdkError)("WC_METHOD_UNSUPPORTED", a);
                await this.sendError(n, i, o), this.logger.error(o);
            } catch (o) {
                await this.sendError(n, i, o), this.logger.error(o);
            }
        }, this.onUnknownRpcMethodResponse = (i)=>{
            this.registeredMethods.includes(i) || this.logger.error((0, _utils.getSdkError)("WC_METHOD_UNSUPPORTED", i));
        }, this.isValidPair = (i)=>{
            if (!(0, _utils.isValidParams)(i)) {
                const { message: s } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pair() params: ${i}`);
                throw new Error(s);
            }
            if (!(0, _utils.isValidUrl)(i.uri)) {
                const { message: s } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
                throw new Error(s);
            }
        }, this.isValidPing = async (i)=>{
            if (!(0, _utils.isValidParams)(i)) {
                const { message: n } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `ping() params: ${i}`);
                throw new Error(n);
            }
            const { topic: s } = i;
            await this.isValidPairingTopic(s);
        }, this.isValidDisconnect = async (i)=>{
            if (!(0, _utils.isValidParams)(i)) {
                const { message: n } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `disconnect() params: ${i}`);
                throw new Error(n);
            }
            const { topic: s } = i;
            await this.isValidPairingTopic(s);
        }, this.isValidPairingTopic = async (i)=>{
            if (!(0, _utils.isValidString)(i, !1)) {
                const { message: s } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
                throw new Error(s);
            }
            if (!this.pairings.keys.includes(i)) {
                const { message: s } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
                throw new Error(s);
            }
            if ((0, _utils.isExpired)(this.pairings.get(i).expiry)) {
                await this.deletePairing(i);
                const { message: s } = (0, _utils.getInternalError)("EXPIRED", `pairing topic: ${i}`);
                throw new Error(s);
            }
        }, this.core = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.pairings = new zt(this.core, this.logger, this.name, this.storagePrefix);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    registerRelayerEvents() {
        this.core.relayer.on(g.message, async (e)=>{
            const { topic: t, message: i } = e;
            if (this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i))) return;
            const s = await this.core.crypto.decode(t, i);
            (0, _jsonrpcUtils.isJsonRpcRequest)(s) ? (this.core.history.set(t, s), this.onRelayEventRequest({
                topic: t,
                payload: s
            })) : (0, _jsonrpcUtils.isJsonRpcResponse)(s) && (await this.core.history.resolve(s), this.onRelayEventResponse({
                topic: t,
                payload: s
            }));
        });
    }
    registerExpirerEvents() {
        this.core.expirer.on(w.expired, async (e)=>{
            const { topic: t } = (0, _utils.parseExpirerTarget)(e.target);
            t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit("pairing_expire", {
                topic: t
            }));
        });
    }
}
class Ut extends (0, _types.IJsonRpcHistory) {
    constructor(e, t){
        super(e, t), this.core = e, this.logger = t, this.records = new Map, this.events = new (0, _events.EventEmitter), this.name = bt, this.version = mt, this.cached = [], this.initialized = !1, this.storagePrefix = O, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i)=>this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
        }, this.set = (i, s, n)=>{
            if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({
                type: "method",
                method: "set",
                topic: i,
                request: s,
                chainId: n
            }), this.records.has(s.id)) return;
            const a = {
                id: s.id,
                topic: i,
                request: {
                    method: s.method,
                    params: s.params || null
                },
                chainId: n
            };
            this.records.set(a.id, a), this.events.emit(_.created, a);
        }, this.resolve = async (i)=>{
            if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({
                type: "method",
                method: "update",
                response: i
            }), !this.records.has(i.id)) return;
            const s = await this.getRecord(i.id);
            typeof s.response > "u" && (s.response = (0, _jsonrpcUtils.isJsonRpcError)(i) ? {
                error: i.error
            } : {
                result: i.result
            }, this.records.set(s.id, s), this.events.emit(_.updated, s));
        }, this.get = async (i, s)=>(this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({
                type: "method",
                method: "get",
                topic: i,
                id: s
            }), await this.getRecord(s)), this.delete = (i, s)=>{
            this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({
                type: "method",
                method: "delete",
                id: s
            }), this.values.forEach((n)=>{
                if (n.topic === i) {
                    if (typeof s < "u" && n.id !== s) return;
                    this.records.delete(n.id), this.events.emit(_.deleted, n);
                }
            });
        }, this.exists = async (i, s)=>(this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i : !1), this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get size() {
        return this.records.size;
    }
    get keys() {
        return Array.from(this.records.keys());
    }
    get values() {
        return Array.from(this.records.values());
    }
    get pending() {
        const e = [];
        return this.values.forEach((t)=>{
            if (typeof t.response < "u") return;
            const i = {
                topic: t.topic,
                request: (0, _jsonrpcUtils.formatJsonRpcRequest)(t.request.method, t.request.params, t.id),
                chainId: t.chainId
            };
            return e.push(i);
        }), e;
    }
    async setJsonRpcRecords(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getRecord(e) {
        this.isInitialized();
        const t = this.records.get(e);
        if (!t) {
            const { message: i } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw new Error(i);
        }
        return t;
    }
    async persist() {
        await this.setJsonRpcRecords(this.values), this.events.emit(_.sync);
    }
    async restore() {
        try {
            const e = await this.getJsonRpcRecords();
            if (typeof e > "u" || !e.length) return;
            if (this.records.size) {
                const { message: t } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                records: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
        }
    }
    registerEventListeners() {
        this.events.on(_.created, (e)=>{
            const t = _.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            }), this.persist();
        }), this.events.on(_.updated, (e)=>{
            const t = _.updated;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            }), this.persist();
        }), this.events.on(_.deleted, (e)=>{
            const t = _.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            }), this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class Lt extends (0, _types.IExpirer) {
    constructor(e, t){
        super(e, t), this.core = e, this.logger = t, this.expirations = new Map, this.events = new (0, _events.EventEmitter), this.name = Et, this.version = ft, this.cached = [], this.initialized = !1, this.storagePrefix = O, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i)=>this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
        }, this.has = (i)=>{
            try {
                const s = this.formatTarget(i);
                return typeof this.getExpiration(s) < "u";
            } catch  {
                return !1;
            }
        }, this.set = (i, s)=>{
            this.isInitialized();
            const n = this.formatTarget(i), a = {
                target: n,
                expiry: s
            };
            this.expirations.set(n, a), this.checkExpiry(n, a), this.events.emit(w.created, {
                target: n,
                expiration: a
            });
        }, this.get = (i)=>{
            this.isInitialized();
            const s = this.formatTarget(i);
            return this.getExpiration(s);
        }, this.del = (i)=>{
            if (this.isInitialized(), this.has(i)) {
                const s = this.formatTarget(i), n = this.getExpiration(s);
                this.expirations.delete(s), this.events.emit(w.deleted, {
                    target: s,
                    expiration: n
                });
            }
        }, this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get length() {
        return this.expirations.size;
    }
    get keys() {
        return Array.from(this.expirations.keys());
    }
    get values() {
        return Array.from(this.expirations.values());
    }
    formatTarget(e) {
        if (typeof e == "string") return (0, _utils.formatTopicTarget)(e);
        if (typeof e == "number") return (0, _utils.formatIdTarget)(e);
        const { message: t } = (0, _utils.getInternalError)("UNKNOWN_TYPE", `Target type: ${typeof e}`);
        throw new Error(t);
    }
    async setExpirations(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getExpirations() {
        return await this.core.storage.getItem(this.storageKey);
    }
    async persist() {
        await this.setExpirations(this.values), this.events.emit(w.sync);
    }
    async restore() {
        try {
            const e = await this.getExpirations();
            if (typeof e > "u" || !e.length) return;
            if (this.expirations.size) {
                const { message: t } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                expirations: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
        }
    }
    getExpiration(e) {
        const t = this.expirations.get(e);
        if (!t) {
            const { message: i } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw this.logger.error(i), new Error(i);
        }
        return t;
    }
    checkExpiry(e, t) {
        const { expiry: i } = t;
        (0, _time.toMiliseconds)(i) - Date.now() <= 0 && this.expire(e, t);
    }
    expire(e, t) {
        this.expirations.delete(e), this.events.emit(w.expired, {
            target: e,
            expiration: t
        });
    }
    checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach((e, t)=>this.checkExpiry(t, e));
    }
    registerEventListeners() {
        this.core.heartbeat.on((0, _heartbeat.HEARTBEAT_EVENTS).pulse, ()=>this.checkExpirations()), this.events.on(w.created, (e)=>{
            const t = w.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        }), this.events.on(w.expired, (e)=>{
            const t = w.expired;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        }), this.events.on(w.deleted, (e)=>{
            const t = w.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class Ft extends (0, _types.IVerify) {
    constructor(e, t){
        super(e, t), this.projectId = e, this.logger = t, this.name = J, this.initialized = !1, this.init = async (i)=>{
            (0, _utils.isReactNative)() || !(0, _utils.isBrowser)() || (this.verifyUrl = i?.verifyUrl || de, await this.createIframe());
        }, this.register = async (i)=>{
            var s;
            if (this.initialized || await this.init(), !!this.iframe) try {
                (s = this.iframe.contentWindow) == null || s.postMessage(i.attestationId, this.verifyUrl), this.logger.info(`postMessage sent: ${i.attestationId} ${this.verifyUrl}`);
            } catch  {}
        }, this.resolve = async (i)=>{
            var s;
            if (this.isDevEnv) return "";
            this.logger.info(`resolving attestation: ${i.attestationId}`);
            const n = this.startAbortTimer((0, _time.FIVE_SECONDS)), a = await fetch(`${this.verifyUrl}/attestation/${i.attestationId}`, {
                signal: this.abortController.signal
            });
            return clearTimeout(n), a.status === 200 ? (s = await a.json()) == null ? void 0 : s.origin : "";
        }, this.createIframe = async ()=>{
            try {
                await Promise.race([
                    new Promise((i, s)=>{
                        if (document.getElementById(J)) return i();
                        const n = document.createElement("iframe");
                        n.setAttribute("id", J), n.setAttribute("src", `${this.verifyUrl}/${this.projectId}`), n.style.display = "none", n.addEventListener("load", ()=>{
                            this.initialized = !0, i();
                        }), n.addEventListener("error", (a)=>{
                            s(a);
                        }), document.body.append(n), this.iframe = n;
                    }),
                    new Promise((i)=>{
                        setTimeout(()=>i("iframe load timeout"), (0, _time.toMiliseconds)((0, _time.ONE_SECOND) / 2));
                    })
                ]);
            } catch (i) {
                this.logger.error(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.error(i);
            }
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.verifyUrl = de, this.abortController = new AbortController, this.isDevEnv = (0, _utils.isNode)() && undefined;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    startAbortTimer(e) {
        return setTimeout(()=>this.abortController.abort(), (0, _time.toMiliseconds)(e));
    }
}
var Cr = Object.defineProperty, $t = Object.getOwnPropertySymbols, _r = Object.prototype.hasOwnProperty, Rr = Object.prototype.propertyIsEnumerable, Mt = (r, e, t)=>e in r ? Cr(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, Kt = (r, e)=>{
    for(var t in e || (e = {}))_r.call(e, t) && Mt(r, t, e[t]);
    if ($t) for (var t of $t(e))Rr.call(e, t) && Mt(r, t, e[t]);
    return r;
};
class H extends (0, _types.ICore) {
    constructor(e){
        super(e), this.protocol = ce, this.version = Ge, this.name = Y, this.events = new (0, _events.EventEmitter), this.initialized = !1, this.on = (i, s)=>this.events.on(i, s), this.once = (i, s)=>this.events.once(i, s), this.off = (i, s)=>this.events.off(i, s), this.removeListener = (i, s)=>this.events.removeListener(i, s), this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || le;
        const t = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, _logger.pino)((0, _logger.getDefaultLoggerOptions)({
            level: e?.logger || Ye.logger
        }));
        this.logger = (0, _logger.generateChildLogger)(t, this.name), this.heartbeat = new (0, _heartbeat.HeartBeat), this.crypto = new vt(this, this.logger, e?.keychain), this.history = new Ut(this, this.logger), this.expirer = new Lt(this, this.logger), this.storage = e != null && e.storage ? e.storage : new (0, _keyvaluestorageDefault.default)(Kt(Kt({}, Je), e?.storageOptions)), this.relayer = new Pt({
            core: this,
            logger: this.logger,
            relayUrl: this.relayUrl,
            projectId: this.projectId
        }), this.pairing = new Nt(this, this.logger), this.verify = new Ft(this.projectId || "", this.logger);
    }
    static async init(e) {
        const t = new H(e);
        await t.initialize();
        const i = await t.crypto.getClientId();
        return await t.storage.setItem(lt, i), t;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    async start() {
        this.initialized || await this.initialize();
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.initialized = !0, this.logger.info("Core Initialization Success");
        } catch (e) {
            throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
        }
    }
}
const Tr = H;

},{"events":"1VQLm","@walletconnect/keyvaluestorage":"2heaE","@walletconnect/heartbeat":"6G2yQ","@walletconnect/logger":"bTcqM","@walletconnect/types":"5ngc4","@walletconnect/safe-json":"cD1pC","@walletconnect/relay-auth":"1LVbO","@walletconnect/utils":"o3k5L","uint8arrays":"ctPgX","@walletconnect/time":"2hzsP","@walletconnect/jsonrpc-provider":"6zGTK","@walletconnect/jsonrpc-utils":"izCJ8","@walletconnect/jsonrpc-ws-connection":"gsp7F","lodash.isequal":"6emId","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2heaE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyValueStorage = void 0;
const tslib_1 = require("47e5cd453a0fda45");
const safe_json_utils_1 = require("4dfac6a81e059d83");
const localStorage_1 = tslib_1.__importDefault(require("d840cd3e3108c66e"));
const shared_1 = require("23610524c3f8e51d");
class KeyValueStorage {
    constructor(){
        this.localStorage = localStorage_1.default;
    }
    getKeys() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            return Object.keys(this.localStorage);
        });
    }
    getEntries() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            return Object.entries(this.localStorage).map(shared_1.parseEntry);
        });
    }
    getItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            const item = this.localStorage.getItem(key);
            if (item === null) return undefined;
            return safe_json_utils_1.safeJsonParse(item);
        });
    }
    setItem(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            this.localStorage.setItem(key, safe_json_utils_1.safeJsonStringify(value));
        });
    }
    removeItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            this.localStorage.removeItem(key);
        });
    }
}
exports.KeyValueStorage = KeyValueStorage;
exports.default = KeyValueStorage;

},{"47e5cd453a0fda45":"lRdW5","4dfac6a81e059d83":"30P0N","d840cd3e3108c66e":"eEfFJ","23610524c3f8e51d":"i8CA6"}],"30P0N":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
exports.safeJsonParse = safeJsonParse;
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSON.stringify(value, (key, value)=>typeof value === "undefined" ? null : value);
}
exports.safeJsonStringify = safeJsonStringify;

},{}],"eEfFJ":[function(require,module,exports) {
var global = arguments[3];
"use strict";
(function() {
    "use strict";
    let db;
    function LocalStorage() {}
    db = LocalStorage;
    db.prototype.getItem = function(key) {
        if (this.hasOwnProperty(key)) return String(this[key]);
        return null;
    };
    db.prototype.setItem = function(key, val) {
        this[key] = String(val);
    };
    db.prototype.removeItem = function(key) {
        delete this[key];
    };
    db.prototype.clear = function() {
        const self = this;
        Object.keys(self).forEach(function(key) {
            self[key] = undefined;
            delete self[key];
        });
    };
    db.prototype.key = function(i) {
        i = i || 0;
        return Object.keys(this)[i];
    };
    db.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length;
    });
    if (typeof global !== "undefined" && global.localStorage) module.exports = global.localStorage;
    else if (typeof window !== "undefined" && window.localStorage) module.exports = window.localStorage;
    else module.exports = new LocalStorage();
})();

},{}],"i8CA6":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("3e0108a643e64fa2");
tslib_1.__exportStar(require("27f716b12c1356c7"), exports);
tslib_1.__exportStar(require("ec9835f1892fbe64"), exports);

},{"3e0108a643e64fa2":"lRdW5","27f716b12c1356c7":"js2cZ","ec9835f1892fbe64":"uyrqi"}],"js2cZ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IKeyValueStorage = void 0;
class IKeyValueStorage {
}
exports.IKeyValueStorage = IKeyValueStorage;

},{}],"uyrqi":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseEntry = void 0;
const safe_json_utils_1 = require("e82c0d2854b87abf");
function parseEntry(entry) {
    var _a;
    return [
        entry[0],
        safe_json_utils_1.safeJsonParse((_a = entry[1]) !== null && _a !== void 0 ? _a : "")
    ];
}
exports.parseEntry = parseEntry;

},{"e82c0d2854b87abf":"30P0N"}],"6G2yQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("4d7c6d075a015636");
tslib_1.__exportStar(require("cb5b472d52d3cf50"), exports);
tslib_1.__exportStar(require("aa82b82d39f043"), exports);
tslib_1.__exportStar(require("ec5895e80e8d0f5f"), exports);

},{"4d7c6d075a015636":"lRdW5","cb5b472d52d3cf50":"9dFK0","aa82b82d39f043":"6osg5","ec5895e80e8d0f5f":"bn7R7"}],"9dFK0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeartBeat = void 0;
const tslib_1 = require("fcc1ffd649161ea4");
const events_1 = require("cb5aafd80d34fef8");
const time_1 = require("32850262962ecb3b");
const types_1 = require("6ea39d676cf5a689");
const constants_1 = require("564ba16c950b20da");
class HeartBeat extends types_1.IHeartBeat {
    constructor(opts){
        super(opts);
        this.events = new events_1.EventEmitter();
        this.interval = constants_1.HEARTBEAT_INTERVAL;
        this.interval = (opts === null || opts === void 0 ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL;
    }
    static init(opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            const heartbeat = new HeartBeat(opts);
            yield heartbeat.init();
            return heartbeat;
        });
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            yield this.initialize();
        });
    }
    stop() {
        clearInterval(this.intervalRef);
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            this.intervalRef = setInterval(()=>this.pulse(), time_1.toMiliseconds(this.interval));
        });
    }
    pulse() {
        this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
    }
}
exports.HeartBeat = HeartBeat;

},{"fcc1ffd649161ea4":"lRdW5","cb5aafd80d34fef8":"1VQLm","32850262962ecb3b":"2hzsP","6ea39d676cf5a689":"6osg5","564ba16c950b20da":"bn7R7"}],"6osg5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("5b3dbe629f809bf5");
tslib_1.__exportStar(require("893a5304e35a293d"), exports);

},{"5b3dbe629f809bf5":"lRdW5","893a5304e35a293d":"9jTKH"}],"9jTKH":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IHeartBeat = void 0;
const events_1 = require("f67179b2d86536f4");
class IHeartBeat extends events_1.IEvents {
    constructor(opts){
        super();
    }
}
exports.IHeartBeat = IHeartBeat;

},{"f67179b2d86536f4":"aO3HO"}],"aO3HO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _events = require("./events");
parcelHelpers.exportAll(_events, exports);

},{"./events":"1lzU5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1lzU5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IEvents", ()=>IEvents);
class IEvents {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bn7R7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("9b6f7226e21cdd0c");
tslib_1.__exportStar(require("35cb81f8d1226e8c"), exports);

},{"9b6f7226e21cdd0c":"lRdW5","35cb81f8d1226e8c":"jSiJT"}],"jSiJT":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HEARTBEAT_EVENTS = exports.HEARTBEAT_INTERVAL = void 0;
const time_1 = require("1d1abc30095d3dcd");
exports.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS;
exports.HEARTBEAT_EVENTS = {
    pulse: "heartbeat_pulse"
};

},{"1d1abc30095d3dcd":"2hzsP"}],"bTcqM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pino = void 0;
const tslib_1 = require("9bce242c0cb03546");
const pino_1 = tslib_1.__importDefault(require("37bb1f5bbd469c11"));
Object.defineProperty(exports, "pino", {
    enumerable: true,
    get: function() {
        return pino_1.default;
    }
});
tslib_1.__exportStar(require("fd8d0a678dc8732"), exports);
tslib_1.__exportStar(require("d2a5159aacccc4a7"), exports);

},{"9bce242c0cb03546":"lRdW5","37bb1f5bbd469c11":"a8XEU","fd8d0a678dc8732":"5l237","d2a5159aacccc4a7":"lk0xa"}],"a8XEU":[function(require,module,exports) {
"use strict";
const format = require("a7a441f97f89ff91");
module.exports = pino;
const _console = pfGlobalThisOrFallback().console || {};
const stdSerializers = {
    mapHttpRequest: mock,
    mapHttpResponse: mock,
    wrapRequestSerializer: passthrough,
    wrapResponseSerializer: passthrough,
    wrapErrorSerializer: passthrough,
    req: mock,
    res: mock,
    err: asErrValue
};
function shouldSerialize(serialize, serializers) {
    if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k) {
            return k !== "!stdSerializers.err";
        });
        return hasToFilter;
    } else if (serialize === true) return Object.keys(serializers);
    return false;
}
function pino(opts) {
    opts = opts || {};
    opts.browser = opts.browser || {};
    const transmit = opts.browser.transmit;
    if (transmit && typeof transmit.send !== "function") throw Error("pino: transmit option must have a send function");
    const proto = opts.browser.write || _console;
    if (opts.browser.write) opts.browser.asObject = true;
    const serializers = opts.serializers || {};
    const serialize = shouldSerialize(opts.browser.serialize, serializers);
    let stdErrSerialize = opts.browser.serialize;
    if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
    const levels = [
        "error",
        "fatal",
        "warn",
        "info",
        "debug",
        "trace"
    ];
    if (typeof proto === "function") proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
    if (opts.enabled === false) opts.level = "silent";
    const level = opts.level || "info";
    const logger = Object.create(proto);
    if (!logger.log) logger.log = noop;
    Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
    });
    Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
    });
    const setOpts = {
        transmit,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
    };
    logger.levels = pino.levels;
    logger.level = level;
    logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
    logger.serializers = serializers;
    logger._serialize = serialize;
    logger._stdErrSerialize = stdErrSerialize;
    logger.child = child;
    if (transmit) logger._logEvent = createLogEventShape();
    function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
    }
    function getLevel() {
        return this._level;
    }
    function setLevel(level) {
        if (level !== "silent" && !this.levels.values[level]) throw Error("unknown level " + level);
        this._level = level;
        set(setOpts, logger, "error", "log") // <-- must stay first
        ;
        set(setOpts, logger, "fatal", "error");
        set(setOpts, logger, "warn", "error");
        set(setOpts, logger, "info", "log");
        set(setOpts, logger, "debug", "log");
        set(setOpts, logger, "trace", "log");
    }
    function child(bindings, childOptions) {
        if (!bindings) throw new Error("missing bindings for child Pino");
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) childOptions.serializers = bindings.serializers;
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
            var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
            var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
            delete bindings.serializers;
            applySerializers([
                bindings
            ], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
            this._childLevel = (parent._childLevel | 0) + 1;
            this.error = bind(parent, bindings, "error");
            this.fatal = bind(parent, bindings, "fatal");
            this.warn = bind(parent, bindings, "warn");
            this.info = bind(parent, bindings, "info");
            this.debug = bind(parent, bindings, "debug");
            this.trace = bind(parent, bindings, "trace");
            if (childSerializers) {
                this.serializers = childSerializers;
                this._serialize = childSerialize;
            }
            if (transmit) this._logEvent = createLogEventShape([].concat(parent._logEvent.bindings, bindings));
        }
        Child.prototype = this;
        return new Child(this);
    }
    return logger;
}
pino.levels = {
    values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
    },
    labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
    }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, {
    nullTime,
    epochTime,
    unixTime,
    isoTime
});
function set(opts, logger, level, fallback) {
    const proto = Object.getPrototypeOf(logger);
    logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
    wrap(opts, logger, level);
}
function wrap(opts, logger, level) {
    if (!opts.transmit && logger[level] === noop) return;
    logger[level] = function(write) {
        return function LOG() {
            const ts = opts.timestamp();
            const args = new Array(arguments.length);
            const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
            for(var i = 0; i < args.length; i++)args[i] = arguments[i];
            if (opts.serialize && !opts.asObject) applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
            if (opts.asObject) write.call(proto, asObject(this, level, args, ts));
            else write.apply(proto, args);
            if (opts.transmit) {
                const transmitLevel = opts.transmit.level || logger.level;
                const transmitValue = pino.levels.values[transmitLevel];
                const methodValue = pino.levels.values[level];
                if (methodValue < transmitValue) return;
                transmit(this, {
                    ts,
                    methodLevel: level,
                    methodValue,
                    transmitLevel,
                    transmitValue: pino.levels.values[opts.transmit.level || logger.level],
                    send: opts.transmit.send,
                    val: logger.levelVal
                }, args);
            }
        };
    }(logger[level]);
}
function asObject(logger, level, args, ts) {
    if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
    const argsCloned = args.slice();
    let msg = argsCloned[0];
    const o = {};
    if (ts) o.time = ts;
    o.level = pino.levels.values[level];
    let lvl = (logger._childLevel | 0) + 1;
    if (lvl < 1) lvl = 1;
    // deliberate, catching objects, arrays
    if (msg !== null && typeof msg === "object") {
        while(lvl-- && typeof argsCloned[0] === "object")Object.assign(o, argsCloned.shift());
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : undefined;
    } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
    if (msg !== undefined) o.msg = msg;
    return o;
}
function applySerializers(args, serialize, serializers, stdErrSerialize) {
    for(const i in args){
        if (stdErrSerialize && args[i] instanceof Error) args[i] = pino.stdSerializers.err(args[i]);
        else if (typeof args[i] === "object" && !Array.isArray(args[i])) {
            for(const k in args[i])if (serialize && serialize.indexOf(k) > -1 && k in serializers) args[i][k] = serializers[k](args[i][k]);
        }
    }
}
function bind(parent, bindings, level) {
    return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for(var i = 1; i < args.length; i++)args[i] = arguments[i - 1];
        return parent[level].apply(this, args);
    };
}
function transmit(logger, opts, args) {
    const send = opts.send;
    const ts = opts.ts;
    const methodLevel = opts.methodLevel;
    const methodValue = opts.methodValue;
    const val = opts.val;
    const bindings = logger._logEvent.bindings;
    applySerializers(args, logger._serialize || Object.keys(logger.serializers), logger.serializers, logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize);
    logger._logEvent.ts = ts;
    logger._logEvent.messages = args.filter(function(arg) {
        // bindings can only be objects, so reference equality check via indexOf is fine
        return bindings.indexOf(arg) === -1;
    });
    logger._logEvent.level.label = methodLevel;
    logger._logEvent.level.value = methodValue;
    send(methodLevel, logger._logEvent, val);
    logger._logEvent = createLogEventShape(bindings);
}
function createLogEventShape(bindings) {
    return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: {
            label: "",
            value: 0
        }
    };
}
function asErrValue(err) {
    const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
    };
    for(const key in err)if (obj[key] === undefined) obj[key] = err[key];
    return obj;
}
function getTimeFunction(opts) {
    if (typeof opts.timestamp === "function") return opts.timestamp;
    if (opts.timestamp === false) return nullTime;
    return epochTime;
}
function mock() {
    return {};
}
function passthrough(a) {
    return a;
}
function noop() {}
function nullTime() {
    return false;
}
function epochTime() {
    return Date.now();
}
function unixTime() {
    return Math.round(Date.now() / 1000.0);
}
function isoTime() {
    return new Date(Date.now()).toISOString();
} // using Date.now() for testability
/* eslint-disable */ /* istanbul ignore next */ function pfGlobalThisOrFallback() {
    function defd(o) {
        return typeof o !== "undefined" && o;
    }
    try {
        if (typeof globalThis !== "undefined") return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
            get: function() {
                delete Object.prototype.globalThis;
                return this.globalThis = this;
            },
            configurable: true
        });
        return globalThis;
    } catch (e) {
        return defd(self) || defd(window) || defd(this) || {};
    }
} /* eslint-enable */ 

},{"a7a441f97f89ff91":"lB9rF"}],"lB9rF":[function(require,module,exports) {
"use strict";
function tryStringify(o) {
    try {
        return JSON.stringify(o);
    } catch (e) {
        return '"[Circular]"';
    }
}
module.exports = format;
function format(f, args, opts) {
    var ss = opts && opts.stringify || tryStringify;
    var offset = 1;
    if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1) return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for(var index = 1; index < len; index++)objects[index] = ss(args[index]);
        return objects.join(" ");
    }
    if (typeof f !== "string") return f;
    var argLen = args.length;
    if (argLen === 0) return f;
    var str = "";
    var a = 1 - offset;
    var lastPos = -1;
    var flen = f && f.length || 0;
    for(var i = 0; i < flen;){
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
            lastPos = lastPos > -1 ? lastPos : 0;
            switch(f.charCodeAt(i + 1)){
                case 100:
                case 102:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Number(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 105:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Math.floor(Number(args[a]));
                    lastPos = i + 2;
                    i++;
                    break;
                case 79:
                case 111:
                case 106:
                    if (a >= argLen) break;
                    if (args[a] === undefined) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    var type = typeof args[a];
                    if (type === "string") {
                        str += "'" + args[a] + "'";
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    if (type === "function") {
                        str += args[a].name || "<anonymous>";
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    str += ss(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 115:
                    if (a >= argLen) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += String(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 37:
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += "%";
                    lastPos = i + 2;
                    i++;
                    a--;
                    break;
            }
            ++a;
        }
        ++i;
    }
    if (lastPos === -1) return f;
    else if (lastPos < flen) str += f.slice(lastPos);
    return str;
}

},{}],"5l237":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PINO_CUSTOM_CONTEXT_KEY = exports.PINO_LOGGER_DEFAULTS = void 0;
exports.PINO_LOGGER_DEFAULTS = {
    level: "info"
};
exports.PINO_CUSTOM_CONTEXT_KEY = "custom_context";

},{}],"lk0xa":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateChildLogger = exports.formatChildLoggerContext = exports.getLoggerContext = exports.setBrowserLoggerContext = exports.getBrowserLoggerContext = exports.getDefaultLoggerOptions = void 0;
const constants_1 = require("ff70d7487a86d222");
function getDefaultLoggerOptions(opts) {
    return Object.assign(Object.assign({}, opts), {
        level: (opts === null || opts === void 0 ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level
    });
}
exports.getDefaultLoggerOptions = getDefaultLoggerOptions;
function getBrowserLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    return logger[customContextKey] || "";
}
exports.getBrowserLoggerContext = getBrowserLoggerContext;
function setBrowserLoggerContext(logger, context, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    logger[customContextKey] = context;
    return logger;
}
exports.setBrowserLoggerContext = setBrowserLoggerContext;
function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    let context = "";
    if (typeof logger.bindings === "undefined") context = getBrowserLoggerContext(logger, customContextKey);
    else context = logger.bindings().context || "";
    return context;
}
exports.getLoggerContext = getLoggerContext;
function formatChildLoggerContext(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    const parentContext = getLoggerContext(logger, customContextKey);
    const context = parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
    return context;
}
exports.formatChildLoggerContext = formatChildLoggerContext;
function generateChildLogger(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    const context = formatChildLoggerContext(logger, childContext, customContextKey);
    const child = logger.child({
        context
    });
    return setBrowserLoggerContext(child, context, customContextKey);
}
exports.generateChildLogger = generateChildLogger;

},{"ff70d7487a86d222":"5l237"}],"5ngc4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ICore", ()=>n);
parcelHelpers.export(exports, "ICrypto", ()=>l);
parcelHelpers.export(exports, "IEngine", ()=>S);
parcelHelpers.export(exports, "IEngineEvents", ()=>C);
parcelHelpers.export(exports, "IExpirer", ()=>E);
parcelHelpers.export(exports, "IJsonRpcHistory", ()=>h);
parcelHelpers.export(exports, "IKeyChain", ()=>x);
parcelHelpers.export(exports, "IMessageTracker", ()=>a);
parcelHelpers.export(exports, "IPairing", ()=>m);
parcelHelpers.export(exports, "IPublisher", ()=>u);
parcelHelpers.export(exports, "IRelayer", ()=>g);
parcelHelpers.export(exports, "ISignClient", ()=>b);
parcelHelpers.export(exports, "ISignClientEvents", ()=>v);
parcelHelpers.export(exports, "IStore", ()=>p);
parcelHelpers.export(exports, "ISubscriber", ()=>d);
parcelHelpers.export(exports, "ISubscriberTopicMap", ()=>I);
parcelHelpers.export(exports, "IVerify", ()=>y);
var _events = require("@walletconnect/events");
var _events1 = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events1);
class n extends (0, _events.IEvents) {
    constructor(s){
        super(), this.opts = s, this.protocol = "wc", this.version = 2;
    }
}
class l {
    constructor(s, t, o){
        this.core = s, this.logger = t;
    }
}
class h extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.core = s, this.logger = t, this.records = new Map;
    }
}
class a {
    constructor(s, t){
        this.logger = s, this.core = t;
    }
}
class u extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.relayer = s, this.logger = t;
    }
}
class g extends (0, _events.IEvents) {
    constructor(s){
        super();
    }
}
class p {
    constructor(s, t, o, w){
        this.core = s, this.logger = t, this.name = o;
    }
}
class I {
    constructor(){
        this.map = new Map;
    }
}
class d extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.relayer = s, this.logger = t;
    }
}
class x {
    constructor(s, t){
        this.core = s, this.logger = t;
    }
}
class E extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.core = s, this.logger = t;
    }
}
class m {
    constructor(s, t){
        this.logger = s, this.core = t;
    }
}
class y {
    constructor(s, t){
        this.projectId = s, this.logger = t;
    }
}
class v extends (0, _eventsDefault.default) {
    constructor(){
        super();
    }
}
class b {
    constructor(s){
        this.opts = s, this.protocol = "wc", this.version = 2;
    }
}
class C extends (0, _events1.EventEmitter) {
    constructor(){
        super();
    }
}
class S {
    constructor(s){
        this.client = s;
    }
}

},{"@walletconnect/events":"aO3HO","events":"1VQLm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cD1pC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "safeJsonParse", ()=>safeJsonParse);
parcelHelpers.export(exports, "safeJsonStringify", ()=>safeJsonStringify);
const JSONStringify = (data)=>JSON.stringify(data, (_, value)=>typeof value === "bigint" ? value.toString() + "n" : value);
const JSONParse = (json)=>{
    const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
    const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
    return JSON.parse(serializedData, (_, value)=>{
        const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
        if (isCustomFormatBigInt) return BigInt(value.substring(0, value.length - 1));
        return value;
    });
};
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSONParse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSONStringify(value) || "";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1LVbO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _api = require("./api");
parcelHelpers.exportAll(_api, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _utils = require("./utils");
parcelHelpers.exportAll(_utils, exports);

},{"./api":"jLFnA","./constants":"kR7dB","./types":"fH88W","./utils":"4sfmk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jLFnA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateKeyPair", ()=>generateKeyPair);
parcelHelpers.export(exports, "signJWT", ()=>signJWT);
parcelHelpers.export(exports, "verifyJWT", ()=>verifyJWT);
var _ed25519 = require("@stablelib/ed25519");
var _random = require("@stablelib/random");
var _time = require("@walletconnect/time");
var _constants = require("./constants");
var _utils = require("./utils");
function generateKeyPair(seed = (0, _random.randomBytes)((0, _constants.KEY_PAIR_SEED_LENGTH))) {
    return _ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = (0, _time.fromMiliseconds)(Date.now())) {
    const header = {
        alg: (0, _constants.JWT_IRIDIUM_ALG),
        typ: (0, _constants.JWT_IRIDIUM_TYP)
    };
    const iss = (0, _utils.encodeIss)(keyPair.publicKey);
    const exp = iat + ttl;
    const payload = {
        iss,
        sub,
        aud,
        iat,
        exp
    };
    const data = (0, _utils.encodeData)({
        header,
        payload
    });
    const signature = _ed25519.sign(keyPair.secretKey, data);
    return (0, _utils.encodeJWT)({
        header,
        payload,
        signature
    });
}
async function verifyJWT(jwt) {
    const { header, payload, data, signature } = (0, _utils.decodeJWT)(jwt);
    if (header.alg !== (0, _constants.JWT_IRIDIUM_ALG) || header.typ !== (0, _constants.JWT_IRIDIUM_TYP)) throw new Error("JWT must use EdDSA algorithm");
    const publicKey = (0, _utils.decodeIss)(payload.iss);
    return _ed25519.verify(publicKey, data, signature);
}

},{"@stablelib/ed25519":"fFyvt","@stablelib/random":"9Qs60","@walletconnect/time":"2hzsP","./constants":"kR7dB","./utils":"4sfmk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fFyvt":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertSecretKeyToX25519 = exports.convertPublicKeyToX25519 = exports.verify = exports.sign = exports.extractPublicKeyFromSecretKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.SEED_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.SIGNATURE_LENGTH = void 0;
/**
 * Package ed25519 implements Ed25519 public-key signature algorithm.
 */ const random_1 = require("77255b7d05262a33");
const sha512_1 = require("bb6b80f40d96255");
const wipe_1 = require("17372f190926d190");
exports.SIGNATURE_LENGTH = 64;
exports.PUBLIC_KEY_LENGTH = 32;
exports.SECRET_KEY_LENGTH = 64;
exports.SEED_LENGTH = 32;
// Returns new zero-filled 16-element GF (Float64Array).
// If passed an array of numbers, prefills the returned
// array with them.
//
// We use Float64Array, because we need 48-bit numbers
// for this implementation.
function gf(init) {
    const r = new Float64Array(16);
    if (init) for(let i = 0; i < init.length; i++)r[i] = init[i];
    return r;
}
// Base point.
const _9 = new Uint8Array(32);
_9[0] = 9;
const gf0 = gf();
const gf1 = gf([
    1
]);
const D = gf([
    0x78a3,
    0x1359,
    0x4dca,
    0x75eb,
    0xd8ab,
    0x4141,
    0x0a4d,
    0x0070,
    0xe898,
    0x7779,
    0x4079,
    0x8cc7,
    0xfe73,
    0x2b6f,
    0x6cee,
    0x5203
]);
const D2 = gf([
    0xf159,
    0x26b2,
    0x9b94,
    0xebd6,
    0xb156,
    0x8283,
    0x149a,
    0x00e0,
    0xd130,
    0xeef3,
    0x80f2,
    0x198e,
    0xfce7,
    0x56df,
    0xd9dc,
    0x2406
]);
const X = gf([
    0xd51a,
    0x8f25,
    0x2d60,
    0xc956,
    0xa7b2,
    0x9525,
    0xc760,
    0x692c,
    0xdc5c,
    0xfdd6,
    0xe231,
    0xc0a4,
    0x53fe,
    0xcd6e,
    0x36d3,
    0x2169
]);
const Y = gf([
    0x6658,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666
]);
const I = gf([
    0xa0b0,
    0x4a0e,
    0x1b27,
    0xc4ee,
    0xe478,
    0xad2f,
    0x1806,
    0x2f43,
    0xd7a7,
    0x3dfb,
    0x0099,
    0x2b4d,
    0xdf0b,
    0x4fc1,
    0x2480,
    0x2b83
]);
function set25519(r, a) {
    for(let i = 0; i < 16; i++)r[i] = a[i] | 0;
}
function car25519(o) {
    let c = 1;
    for(let i = 0; i < 16; i++){
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
}
function sel25519(p, q, b) {
    const c = ~(b - 1);
    for(let i = 0; i < 16; i++){
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
    }
}
function pack25519(o, n) {
    const m = gf();
    const t = gf();
    for(let i = 0; i < 16; i++)t[i] = n[i];
    car25519(t);
    car25519(t);
    car25519(t);
    for(let j = 0; j < 2; j++){
        m[0] = t[0] - 0xffed;
        for(let i = 1; i < 15; i++){
            m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 0xffff;
        }
        m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 0xffff;
        sel25519(t, m, 1 - b);
    }
    for(let i = 0; i < 16; i++){
        o[2 * i] = t[i] & 0xff;
        o[2 * i + 1] = t[i] >> 8;
    }
}
function verify32(x, y) {
    let d = 0;
    for(let i = 0; i < 32; i++)d |= x[i] ^ y[i];
    return (1 & d - 1 >>> 8) - 1;
}
function neq25519(a, b) {
    const c = new Uint8Array(32);
    const d = new Uint8Array(32);
    pack25519(c, a);
    pack25519(d, b);
    return verify32(c, d);
}
function par25519(a) {
    const d = new Uint8Array(32);
    pack25519(d, a);
    return d[0] & 1;
}
function unpack25519(o, n) {
    for(let i = 0; i < 16; i++)o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    o[15] &= 0x7fff;
}
function add(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] + b[i];
}
function sub(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] - b[i];
}
function mul(o, a, b) {
    let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    // t15 left as is
    // first car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    // second car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
}
function square(o, a) {
    mul(o, a, a);
}
function inv25519(o, i) {
    const c = gf();
    let a;
    for(a = 0; a < 16; a++)c[a] = i[a];
    for(a = 253; a >= 0; a--){
        square(c, c);
        if (a !== 2 && a !== 4) mul(c, c, i);
    }
    for(a = 0; a < 16; a++)o[a] = c[a];
}
function pow2523(o, i) {
    const c = gf();
    let a;
    for(a = 0; a < 16; a++)c[a] = i[a];
    for(a = 250; a >= 0; a--){
        square(c, c);
        if (a !== 1) mul(c, c, i);
    }
    for(a = 0; a < 16; a++)o[a] = c[a];
}
function edadd(p, q) {
    const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
    sub(a, p[1], p[0]);
    sub(t, q[1], q[0]);
    mul(a, a, t);
    add(b, p[0], p[1]);
    add(t, q[0], q[1]);
    mul(b, b, t);
    mul(c, p[3], q[3]);
    mul(c, c, D2);
    mul(d, p[2], q[2]);
    add(d, d, d);
    sub(e, b, a);
    sub(f, d, c);
    add(g, d, c);
    add(h, b, a);
    mul(p[0], e, f);
    mul(p[1], h, g);
    mul(p[2], g, f);
    mul(p[3], e, h);
}
function cswap(p, q, b) {
    for(let i = 0; i < 4; i++)sel25519(p[i], q[i], b);
}
function pack(r, p) {
    const tx = gf(), ty = gf(), zi = gf();
    inv25519(zi, p[2]);
    mul(tx, p[0], zi);
    mul(ty, p[1], zi);
    pack25519(r, ty);
    r[31] ^= par25519(tx) << 7;
}
function scalarmult(p, q, s) {
    set25519(p[0], gf0);
    set25519(p[1], gf1);
    set25519(p[2], gf1);
    set25519(p[3], gf0);
    for(let i = 255; i >= 0; --i){
        const b = s[i / 8 | 0] >> (i & 7) & 1;
        cswap(p, q, b);
        edadd(q, p);
        edadd(p, p);
        cswap(p, q, b);
    }
}
function scalarbase(p, s) {
    const q = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    set25519(q[0], X);
    set25519(q[1], Y);
    set25519(q[2], gf1);
    mul(q[3], X, Y);
    scalarmult(p, q, s);
}
// Generates key pair from secret 32-byte seed.
function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SEED_LENGTH) throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
    const d = (0, sha512_1.hash)(seed);
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    const publicKey = new Uint8Array(32);
    const p = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    scalarbase(p, d);
    pack(publicKey, p);
    const secretKey = new Uint8Array(64);
    secretKey.set(seed);
    secretKey.set(publicKey, 32);
    return {
        publicKey,
        secretKey
    };
}
exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
function generateKeyPair(prng) {
    const seed = (0, random_1.randomBytes)(32, prng);
    const result = generateKeyPairFromSeed(seed);
    (0, wipe_1.wipe)(seed);
    return result;
}
exports.generateKeyPair = generateKeyPair;
function extractPublicKeyFromSecretKey(secretKey) {
    if (secretKey.length !== exports.SECRET_KEY_LENGTH) throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
    return new Uint8Array(secretKey.subarray(32));
}
exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
const L = new Float64Array([
    0xed,
    0xd3,
    0xf5,
    0x5c,
    0x1a,
    0x63,
    0x12,
    0x58,
    0xd6,
    0x9c,
    0xf7,
    0xa2,
    0xde,
    0xf9,
    0xde,
    0x14,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0x10
]);
function modL(r, x) {
    let carry;
    let i;
    let j;
    let k;
    for(i = 63; i >= 32; --i){
        carry = 0;
        for(j = i - 32, k = i - 12; j < k; ++j){
            x[j] += carry - 16 * x[i] * L[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
        }
        x[j] += carry;
        x[i] = 0;
    }
    carry = 0;
    for(j = 0; j < 32; j++){
        x[j] += carry - (x[31] >> 4) * L[j];
        carry = x[j] >> 8;
        x[j] &= 255;
    }
    for(j = 0; j < 32; j++)x[j] -= carry * L[j];
    for(i = 0; i < 32; i++){
        x[i + 1] += x[i] >> 8;
        r[i] = x[i] & 255;
    }
}
function reduce(r) {
    const x = new Float64Array(64);
    for(let i = 0; i < 64; i++)x[i] = r[i];
    for(let i = 0; i < 64; i++)r[i] = 0;
    modL(r, x);
}
// Returns 64-byte signature of the message under the 64-byte secret key.
function sign(secretKey, message) {
    const x = new Float64Array(64);
    const p = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    const d = (0, sha512_1.hash)(secretKey.subarray(0, 32));
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    const signature = new Uint8Array(64);
    signature.set(d.subarray(32), 32);
    const hs = new sha512_1.SHA512();
    hs.update(signature.subarray(32));
    hs.update(message);
    const r = hs.digest();
    hs.clean();
    reduce(r);
    scalarbase(p, r);
    pack(signature, p);
    hs.reset();
    hs.update(signature.subarray(0, 32));
    hs.update(secretKey.subarray(32));
    hs.update(message);
    const h = hs.digest();
    reduce(h);
    for(let i = 0; i < 32; i++)x[i] = r[i];
    for(let i = 0; i < 32; i++)for(let j = 0; j < 32; j++)x[i + j] += h[i] * d[j];
    modL(signature.subarray(32), x);
    return signature;
}
exports.sign = sign;
function unpackneg(r, p) {
    const t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
    set25519(r[2], gf1);
    unpack25519(r[1], p);
    square(num, r[1]);
    mul(den, num, D);
    sub(num, num, r[2]);
    add(den, r[2], den);
    square(den2, den);
    square(den4, den2);
    mul(den6, den4, den2);
    mul(t, den6, num);
    mul(t, t, den);
    pow2523(t, t);
    mul(t, t, num);
    mul(t, t, den);
    mul(t, t, den);
    mul(r[0], t, den);
    square(chk, r[0]);
    mul(chk, chk, den);
    if (neq25519(chk, num)) mul(r[0], r[0], I);
    square(chk, r[0]);
    mul(chk, chk, den);
    if (neq25519(chk, num)) return -1;
    if (par25519(r[0]) === p[31] >> 7) sub(r[0], gf0, r[0]);
    mul(r[3], r[0], r[1]);
    return 0;
}
function verify(publicKey, message, signature) {
    const t = new Uint8Array(32);
    const p = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    const q = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    if (signature.length !== exports.SIGNATURE_LENGTH) throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
    if (unpackneg(q, publicKey)) return false;
    const hs = new sha512_1.SHA512();
    hs.update(signature.subarray(0, 32));
    hs.update(publicKey);
    hs.update(message);
    const h = hs.digest();
    reduce(h);
    scalarmult(p, q, h);
    scalarbase(q, signature.subarray(32));
    edadd(p, q);
    pack(t, p);
    if (verify32(signature, t)) return false;
    return true;
}
exports.verify = verify;
/**
 * Convert Ed25519 public key to X25519 public key.
 *
 * Throws if given an invalid public key.
 */ function convertPublicKeyToX25519(publicKey) {
    let q = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    if (unpackneg(q, publicKey)) throw new Error("Ed25519: invalid public key");
    // Formula: montgomeryX = (edwardsY + 1)*inverse(1 - edwardsY) mod p
    let a = gf();
    let b = gf();
    let y = q[1];
    add(a, gf1, y);
    sub(b, gf1, y);
    inv25519(b, b);
    mul(a, a, b);
    let z = new Uint8Array(32);
    pack25519(z, a);
    return z;
}
exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
/**
 *  Convert Ed25519 secret (private) key to X25519 secret key.
 */ function convertSecretKeyToX25519(secretKey) {
    const d = (0, sha512_1.hash)(secretKey.subarray(0, 32));
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    const o = new Uint8Array(d.subarray(0, 32));
    (0, wipe_1.wipe)(d);
    return o;
}
exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;

},{"77255b7d05262a33":"9Qs60","bb6b80f40d96255":"2a9Qp","17372f190926d190":"8owN2"}],"2a9Qp":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var binary_1 = require("c810033140540598");
var wipe_1 = require("78bca2fcbb454f02");
exports.DIGEST_LENGTH = 64;
exports.BLOCK_SIZE = 128;
/**
 * SHA-2-512 cryptographic hash algorithm.
 */ var SHA512 = /** @class */ function() {
    function SHA512() {
        /** Length of hash output */ this.digestLength = exports.DIGEST_LENGTH;
        /** Block size */ this.blockSize = exports.BLOCK_SIZE;
        // Note: Int32Array is used instead of Uint32Array for performance reasons.
        this._stateHi = new Int32Array(8); // hash state, high bytes
        this._stateLo = new Int32Array(8); // hash state, low bytes
        this._tempHi = new Int32Array(16); // temporary state, high bytes
        this._tempLo = new Int32Array(16); // temporary state, low bytes
        this._buffer = new Uint8Array(256); // buffer for data to hash
        this._bufferLength = 0; // number of bytes in buffer
        this._bytesHashed = 0; // number of total bytes hashed
        this._finished = false; // indicates whether the hash was finalized
        this.reset();
    }
    SHA512.prototype._initState = function() {
        this._stateHi[0] = 0x6a09e667;
        this._stateHi[1] = 0xbb67ae85;
        this._stateHi[2] = 0x3c6ef372;
        this._stateHi[3] = 0xa54ff53a;
        this._stateHi[4] = 0x510e527f;
        this._stateHi[5] = 0x9b05688c;
        this._stateHi[6] = 0x1f83d9ab;
        this._stateHi[7] = 0x5be0cd19;
        this._stateLo[0] = 0xf3bcc908;
        this._stateLo[1] = 0x84caa73b;
        this._stateLo[2] = 0xfe94f82b;
        this._stateLo[3] = 0x5f1d36f1;
        this._stateLo[4] = 0xade682d1;
        this._stateLo[5] = 0x2b3e6c1f;
        this._stateLo[6] = 0xfb41bd6b;
        this._stateLo[7] = 0x137e2179;
    };
    /**
     * Resets hash state making it possible
     * to re-use this instance to hash other data.
     */ SHA512.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
    };
    /**
     * Cleans internal buffers and resets hash state.
     */ SHA512.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._tempHi);
        wipe_1.wipe(this._tempLo);
        this.reset();
    };
    /**
     * Updates hash state with the given data.
     *
     * Throws error when trying to update already finalized hash:
     * instance must be reset to update it again.
     */ SHA512.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) dataLength = data.length;
        if (this._finished) throw new Error("SHA512: can't update because hash was finished.");
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
            while(this._bufferLength < exports.BLOCK_SIZE && dataLength > 0){
                this._buffer[this._bufferLength++] = data[dataPos++];
                dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
                hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
                this._bufferLength = 0;
            }
        }
        if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
            dataLength %= this.blockSize;
        }
        while(dataLength > 0){
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
        }
        return this;
    };
    /**
     * Finalizes hash state and puts hash into out.
     * If hash was already finalized, puts the same value.
     */ SHA512.prototype.finish = function(out) {
        if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 0x20000000 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 128 < 112 ? 128 : 256;
            this._buffer[left] = 0x80;
            for(var i = left + 1; i < padLength - 8; i++)this._buffer[i] = 0;
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
            this._finished = true;
        }
        for(var i = 0; i < this.digestLength / 8; i++){
            binary_1.writeUint32BE(this._stateHi[i], out, i * 8);
            binary_1.writeUint32BE(this._stateLo[i], out, i * 8 + 4);
        }
        return this;
    };
    /**
     * Returns the final hash digest.
     */ SHA512.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization. Returns hash state to be
     * used with restoreState(). Only chain value is saved, not buffers or
     * other state variables.
     */ SHA512.prototype.saveState = function() {
        if (this._finished) throw new Error("SHA256: cannot save finished state");
        return {
            stateHi: new Int32Array(this._stateHi),
            stateLo: new Int32Array(this._stateLo),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
        };
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization. Restores state saved by
     * saveState() and sets bytesHashed to the given value.
     */ SHA512.prototype.restoreState = function(savedState) {
        this._stateHi.set(savedState.stateHi);
        this._stateLo.set(savedState.stateLo);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) this._buffer.set(savedState.buffer);
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
    };
    /**
     * Cleans state returned by saveState().
     */ SHA512.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.stateHi);
        wipe_1.wipe(savedState.stateLo);
        if (savedState.buffer) wipe_1.wipe(savedState.buffer);
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
    };
    return SHA512;
}();
exports.SHA512 = SHA512;
// Constants
var K = new Int32Array([
    0x428a2f98,
    0xd728ae22,
    0x71374491,
    0x23ef65cd,
    0xb5c0fbcf,
    0xec4d3b2f,
    0xe9b5dba5,
    0x8189dbbc,
    0x3956c25b,
    0xf348b538,
    0x59f111f1,
    0xb605d019,
    0x923f82a4,
    0xaf194f9b,
    0xab1c5ed5,
    0xda6d8118,
    0xd807aa98,
    0xa3030242,
    0x12835b01,
    0x45706fbe,
    0x243185be,
    0x4ee4b28c,
    0x550c7dc3,
    0xd5ffb4e2,
    0x72be5d74,
    0xf27b896f,
    0x80deb1fe,
    0x3b1696b1,
    0x9bdc06a7,
    0x25c71235,
    0xc19bf174,
    0xcf692694,
    0xe49b69c1,
    0x9ef14ad2,
    0xefbe4786,
    0x384f25e3,
    0x0fc19dc6,
    0x8b8cd5b5,
    0x240ca1cc,
    0x77ac9c65,
    0x2de92c6f,
    0x592b0275,
    0x4a7484aa,
    0x6ea6e483,
    0x5cb0a9dc,
    0xbd41fbd4,
    0x76f988da,
    0x831153b5,
    0x983e5152,
    0xee66dfab,
    0xa831c66d,
    0x2db43210,
    0xb00327c8,
    0x98fb213f,
    0xbf597fc7,
    0xbeef0ee4,
    0xc6e00bf3,
    0x3da88fc2,
    0xd5a79147,
    0x930aa725,
    0x06ca6351,
    0xe003826f,
    0x14292967,
    0x0a0e6e70,
    0x27b70a85,
    0x46d22ffc,
    0x2e1b2138,
    0x5c26c926,
    0x4d2c6dfc,
    0x5ac42aed,
    0x53380d13,
    0x9d95b3df,
    0x650a7354,
    0x8baf63de,
    0x766a0abb,
    0x3c77b2a8,
    0x81c2c92e,
    0x47edaee6,
    0x92722c85,
    0x1482353b,
    0xa2bfe8a1,
    0x4cf10364,
    0xa81a664b,
    0xbc423001,
    0xc24b8b70,
    0xd0f89791,
    0xc76c51a3,
    0x0654be30,
    0xd192e819,
    0xd6ef5218,
    0xd6990624,
    0x5565a910,
    0xf40e3585,
    0x5771202a,
    0x106aa070,
    0x32bbd1b8,
    0x19a4c116,
    0xb8d2d0c8,
    0x1e376c08,
    0x5141ab53,
    0x2748774c,
    0xdf8eeb99,
    0x34b0bcb5,
    0xe19b48a8,
    0x391c0cb3,
    0xc5c95a63,
    0x4ed8aa4a,
    0xe3418acb,
    0x5b9cca4f,
    0x7763e373,
    0x682e6ff3,
    0xd6b2b8a3,
    0x748f82ee,
    0x5defb2fc,
    0x78a5636f,
    0x43172f60,
    0x84c87814,
    0xa1f0ab72,
    0x8cc70208,
    0x1a6439ec,
    0x90befffa,
    0x23631e28,
    0xa4506ceb,
    0xde82bde9,
    0xbef9a3f7,
    0xb2c67915,
    0xc67178f2,
    0xe372532b,
    0xca273ece,
    0xea26619c,
    0xd186b8c7,
    0x21c0c207,
    0xeada7dd6,
    0xcde0eb1e,
    0xf57d4f7f,
    0xee6ed178,
    0x06f067aa,
    0x72176fba,
    0x0a637dc5,
    0xa2c898a6,
    0x113f9804,
    0xbef90dae,
    0x1b710b35,
    0x131c471b,
    0x28db77f5,
    0x23047d84,
    0x32caab7b,
    0x40c72493,
    0x3c9ebe0a,
    0x15c9bebc,
    0x431d67c4,
    0x9c100d4c,
    0x4cc5d4be,
    0xcb3e42b6,
    0x597f299c,
    0xfc657e2a,
    0x5fcb6fab,
    0x3ad6faec,
    0x6c44198c,
    0x4a475817
]);
function hashBlocks(wh, wl, hh, hl, m, pos, len) {
    var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
    var h, l;
    var th, tl;
    var a, b, c, d;
    while(len >= 128){
        for(var i = 0; i < 16; i++){
            var j = 8 * i + pos;
            wh[i] = binary_1.readUint32BE(m, j);
            wl[i] = binary_1.readUint32BE(m, j + 4);
        }
        for(var i = 0; i < 80; i++){
            var bh0 = ah0;
            var bh1 = ah1;
            var bh2 = ah2;
            var bh3 = ah3;
            var bh4 = ah4;
            var bh5 = ah5;
            var bh6 = ah6;
            var bh7 = ah7;
            var bl0 = al0;
            var bl1 = al1;
            var bl2 = al2;
            var bl3 = al3;
            var bl4 = al4;
            var bl5 = al5;
            var bl6 = al6;
            var bl7 = al7;
            // add
            h = ah7;
            l = al7;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            // Sigma1
            h = (ah4 >>> 14 | al4 << 18) ^ (ah4 >>> 18 | al4 << 14) ^ (al4 >>> 9 | ah4 << 23);
            l = (al4 >>> 14 | ah4 << 18) ^ (al4 >>> 18 | ah4 << 14) ^ (ah4 >>> 9 | al4 << 23);
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // Ch
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // K
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // w
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 0xffff | d << 16;
            tl = a & 0xffff | b << 16;
            // add
            h = th;
            l = tl;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            // Sigma0
            h = (ah0 >>> 28 | al0 << 4) ^ (al0 >>> 2 | ah0 << 30) ^ (al0 >>> 7 | ah0 << 25);
            l = (al0 >>> 28 | ah0 << 4) ^ (ah0 >>> 2 | al0 << 30) ^ (ah0 >>> 7 | al0 << 25);
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // Maj
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 0xffff | d << 16;
            bl7 = a & 0xffff | b << 16;
            // add
            h = bh3;
            l = bl3;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 0xffff | d << 16;
            bl3 = a & 0xffff | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) for(var j = 0; j < 16; j++){
                // add
                h = wh[j];
                l = wl[j];
                a = l & 0xffff;
                b = l >>> 16;
                c = h & 0xffff;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;
                // sigma0
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 31) ^ (th >>> 8 | tl << 24) ^ th >>> 7;
                l = (tl >>> 1 | th << 31) ^ (tl >>> 8 | th << 24) ^ (tl >>> 7 | th << 25);
                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;
                // sigma1
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 13) ^ (tl >>> 29 | th << 3) ^ th >>> 6;
                l = (tl >>> 19 | th << 13) ^ (th >>> 29 | tl << 3) ^ (tl >>> 6 | th << 26);
                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 0xffff | d << 16;
                wl[j] = a & 0xffff | b << 16;
            }
        }
        // add
        h = ah0;
        l = al0;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[0];
        l = hl[0];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[0] = ah0 = c & 0xffff | d << 16;
        hl[0] = al0 = a & 0xffff | b << 16;
        h = ah1;
        l = al1;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[1];
        l = hl[1];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[1] = ah1 = c & 0xffff | d << 16;
        hl[1] = al1 = a & 0xffff | b << 16;
        h = ah2;
        l = al2;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[2];
        l = hl[2];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[2] = ah2 = c & 0xffff | d << 16;
        hl[2] = al2 = a & 0xffff | b << 16;
        h = ah3;
        l = al3;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[3];
        l = hl[3];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[3] = ah3 = c & 0xffff | d << 16;
        hl[3] = al3 = a & 0xffff | b << 16;
        h = ah4;
        l = al4;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[4];
        l = hl[4];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[4] = ah4 = c & 0xffff | d << 16;
        hl[4] = al4 = a & 0xffff | b << 16;
        h = ah5;
        l = al5;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[5];
        l = hl[5];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[5] = ah5 = c & 0xffff | d << 16;
        hl[5] = al5 = a & 0xffff | b << 16;
        h = ah6;
        l = al6;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[6];
        l = hl[6];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[6] = ah6 = c & 0xffff | d << 16;
        hl[6] = al6 = a & 0xffff | b << 16;
        h = ah7;
        l = al7;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[7];
        l = hl[7];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[7] = ah7 = c & 0xffff | d << 16;
        hl[7] = al7 = a & 0xffff | b << 16;
        pos += 128;
        len -= 128;
    }
    return pos;
}
function hash(data) {
    var h = new SHA512();
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.hash = hash;

},{"c810033140540598":"92RWm","78bca2fcbb454f02":"8owN2"}],"kR7dB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "JWT_IRIDIUM_ALG", ()=>JWT_IRIDIUM_ALG);
parcelHelpers.export(exports, "JWT_IRIDIUM_TYP", ()=>JWT_IRIDIUM_TYP);
parcelHelpers.export(exports, "JWT_DELIMITER", ()=>JWT_DELIMITER);
parcelHelpers.export(exports, "JWT_ENCODING", ()=>JWT_ENCODING);
parcelHelpers.export(exports, "JSON_ENCODING", ()=>JSON_ENCODING);
parcelHelpers.export(exports, "DATA_ENCODING", ()=>DATA_ENCODING);
parcelHelpers.export(exports, "DID_DELIMITER", ()=>DID_DELIMITER);
parcelHelpers.export(exports, "DID_PREFIX", ()=>DID_PREFIX);
parcelHelpers.export(exports, "DID_METHOD", ()=>DID_METHOD);
parcelHelpers.export(exports, "MULTICODEC_ED25519_ENCODING", ()=>MULTICODEC_ED25519_ENCODING);
parcelHelpers.export(exports, "MULTICODEC_ED25519_BASE", ()=>MULTICODEC_ED25519_BASE);
parcelHelpers.export(exports, "MULTICODEC_ED25519_HEADER", ()=>MULTICODEC_ED25519_HEADER);
parcelHelpers.export(exports, "MULTICODEC_ED25519_LENGTH", ()=>MULTICODEC_ED25519_LENGTH);
parcelHelpers.export(exports, "KEY_PAIR_SEED_LENGTH", ()=>KEY_PAIR_SEED_LENGTH);
const JWT_IRIDIUM_ALG = "EdDSA";
const JWT_IRIDIUM_TYP = "JWT";
const JWT_DELIMITER = ".";
const JWT_ENCODING = "base64url";
const JSON_ENCODING = "utf8";
const DATA_ENCODING = "utf8";
const DID_DELIMITER = ":";
const DID_PREFIX = "did";
const DID_METHOD = "key";
const MULTICODEC_ED25519_ENCODING = "base58btc";
const MULTICODEC_ED25519_BASE = "z";
const MULTICODEC_ED25519_HEADER = "K36";
const MULTICODEC_ED25519_LENGTH = 32;
const KEY_PAIR_SEED_LENGTH = 32;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4sfmk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "decodeJSON", ()=>decodeJSON);
parcelHelpers.export(exports, "encodeJSON", ()=>encodeJSON);
parcelHelpers.export(exports, "encodeIss", ()=>encodeIss);
parcelHelpers.export(exports, "decodeIss", ()=>decodeIss);
parcelHelpers.export(exports, "encodeSig", ()=>encodeSig);
parcelHelpers.export(exports, "decodeSig", ()=>decodeSig);
parcelHelpers.export(exports, "encodeData", ()=>encodeData);
parcelHelpers.export(exports, "decodeData", ()=>decodeData);
parcelHelpers.export(exports, "encodeJWT", ()=>encodeJWT);
parcelHelpers.export(exports, "decodeJWT", ()=>decodeJWT);
var _concat = require("uint8arrays/concat");
var _toString = require("uint8arrays/to-string");
var _fromString = require("uint8arrays/from-string");
var _safeJson = require("@walletconnect/safe-json");
var _constants = require("./constants");
function decodeJSON(str) {
    return (0, _safeJson.safeJsonParse)((0, _toString.toString)((0, _fromString.fromString)(str, (0, _constants.JWT_ENCODING)), (0, _constants.JSON_ENCODING)));
}
function encodeJSON(val) {
    return (0, _toString.toString)((0, _fromString.fromString)((0, _safeJson.safeJsonStringify)(val), (0, _constants.JSON_ENCODING)), (0, _constants.JWT_ENCODING));
}
function encodeIss(publicKey) {
    const header = (0, _fromString.fromString)((0, _constants.MULTICODEC_ED25519_HEADER), (0, _constants.MULTICODEC_ED25519_ENCODING));
    const multicodec = (0, _constants.MULTICODEC_ED25519_BASE) + (0, _toString.toString)((0, _concat.concat)([
        header,
        publicKey
    ]), (0, _constants.MULTICODEC_ED25519_ENCODING));
    return [
        (0, _constants.DID_PREFIX),
        (0, _constants.DID_METHOD),
        multicodec
    ].join((0, _constants.DID_DELIMITER));
}
function decodeIss(issuer) {
    const [prefix, method, multicodec] = issuer.split((0, _constants.DID_DELIMITER));
    if (prefix !== (0, _constants.DID_PREFIX) || method !== (0, _constants.DID_METHOD)) throw new Error(`Issuer must be a DID with method "key"`);
    const base = multicodec.slice(0, 1);
    if (base !== (0, _constants.MULTICODEC_ED25519_BASE)) throw new Error(`Issuer must be a key in mulicodec format`);
    const bytes = (0, _fromString.fromString)(multicodec.slice(1), (0, _constants.MULTICODEC_ED25519_ENCODING));
    const type = (0, _toString.toString)(bytes.slice(0, 2), (0, _constants.MULTICODEC_ED25519_ENCODING));
    if (type !== (0, _constants.MULTICODEC_ED25519_HEADER)) throw new Error(`Issuer must be a public key with type "Ed25519"`);
    const publicKey = bytes.slice(2);
    if (publicKey.length !== (0, _constants.MULTICODEC_ED25519_LENGTH)) throw new Error(`Issuer must be a public key with length 32 bytes`);
    return publicKey;
}
function encodeSig(bytes) {
    return (0, _toString.toString)(bytes, (0, _constants.JWT_ENCODING));
}
function decodeSig(encoded) {
    return (0, _fromString.fromString)(encoded, (0, _constants.JWT_ENCODING));
}
function encodeData(params) {
    return (0, _fromString.fromString)([
        encodeJSON(params.header),
        encodeJSON(params.payload)
    ].join((0, _constants.JWT_DELIMITER)), (0, _constants.DATA_ENCODING));
}
function decodeData(data) {
    const params = (0, _toString.toString)(data, (0, _constants.DATA_ENCODING)).split((0, _constants.JWT_DELIMITER));
    const header = decodeJSON(params[0]);
    const payload = decodeJSON(params[1]);
    return {
        header,
        payload
    };
}
function encodeJWT(params) {
    return [
        encodeJSON(params.header),
        encodeJSON(params.payload),
        encodeSig(params.signature)
    ].join((0, _constants.JWT_DELIMITER));
}
function decodeJWT(jwt) {
    const params = jwt.split((0, _constants.JWT_DELIMITER));
    const header = decodeJSON(params[0]);
    const payload = decodeJSON(params[1]);
    const signature = decodeSig(params[2]);
    const data = (0, _fromString.fromString)(params.slice(0, 2).join((0, _constants.JWT_DELIMITER)), (0, _constants.DATA_ENCODING));
    return {
        header,
        payload,
        signature,
        data
    };
}

},{"uint8arrays/concat":"gqJ9u","uint8arrays/to-string":"w8mvE","uint8arrays/from-string":"7qjkp","@walletconnect/safe-json":"cD1pC","./constants":"kR7dB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fH88W":[function(require,module,exports) {

},{}],"6zGTK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _provider = require("./provider");
var _providerDefault = parcelHelpers.interopDefault(_provider);
parcelHelpers.exportAll(_provider, exports);
exports.default = (0, _providerDefault.default);

},{"./provider":"b01Rn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b01Rn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "JsonRpcProvider", ()=>JsonRpcProvider);
var _events = require("events");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
class JsonRpcProvider extends (0, _jsonrpcUtils.IJsonRpcProvider) {
    constructor(connection){
        super(connection);
        this.events = new (0, _events.EventEmitter)();
        this.hasRegisteredEventListeners = false;
        this.connection = this.setConnection(connection);
        if (this.connection.connected) this.registerEventListeners();
    }
    async connect(connection = this.connection) {
        await this.open(connection);
    }
    async disconnect() {
        await this.close();
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    async request(request, context) {
        return this.requestStrict((0, _jsonrpcUtils.formatJsonRpcRequest)(request.method, request.params || [], request.id || (0, _jsonrpcUtils.getBigIntRpcId)().toString()), context);
    }
    async requestStrict(request, context) {
        return new Promise(async (resolve, reject)=>{
            if (!this.connection.connected) try {
                await this.open();
            } catch (e) {
                reject(e);
            }
            this.events.on(`${request.id}`, (response)=>{
                if ((0, _jsonrpcUtils.isJsonRpcError)(response)) reject(response.error);
                else resolve(response.result);
            });
            try {
                await this.connection.send(request, context);
            } catch (e) {
                reject(e);
            }
        });
    }
    setConnection(connection = this.connection) {
        return connection;
    }
    onPayload(payload) {
        this.events.emit("payload", payload);
        if ((0, _jsonrpcUtils.isJsonRpcResponse)(payload)) this.events.emit(`${payload.id}`, payload);
        else this.events.emit("message", {
            type: payload.method,
            data: payload.params
        });
    }
    onClose(event) {
        if (event && event.code === 3000) this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${event.code} ${event.reason ? `(${event.reason})` : ""}`));
        this.events.emit("disconnect");
    }
    async open(connection = this.connection) {
        if (this.connection === connection && this.connection.connected) return;
        if (this.connection.connected) this.close();
        if (typeof connection === "string") {
            await this.connection.open(connection);
            connection = this.connection;
        }
        this.connection = this.setConnection(connection);
        await this.connection.open();
        this.registerEventListeners();
        this.events.emit("connect");
    }
    async close() {
        await this.connection.close();
    }
    registerEventListeners() {
        if (this.hasRegisteredEventListeners) return;
        this.connection.on("payload", (payload)=>this.onPayload(payload));
        this.connection.on("close", (event)=>this.onClose(event));
        this.connection.on("error", (error)=>this.events.emit("error", error));
        this.connection.on("register_error", (error)=>this.onClose());
        this.hasRegisteredEventListeners = true;
    }
}
exports.default = JsonRpcProvider;

},{"events":"1VQLm","@walletconnect/jsonrpc-utils":"izCJ8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"izCJ8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _error = require("./error");
parcelHelpers.exportAll(_error, exports);
var _env = require("./env");
parcelHelpers.exportAll(_env, exports);
var _format = require("./format");
parcelHelpers.exportAll(_format, exports);
var _routing = require("./routing");
parcelHelpers.exportAll(_routing, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _url = require("./url");
parcelHelpers.exportAll(_url, exports);
var _validators = require("./validators");
parcelHelpers.exportAll(_validators, exports);

},{"./constants":"d7FKU","./error":"6cKI0","./env":"lEoTu","./format":"3MpJQ","./routing":"lN6fi","./types":"7i0GH","./url":"jQ6RQ","./validators":"6oD1U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d7FKU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PARSE_ERROR", ()=>PARSE_ERROR);
parcelHelpers.export(exports, "INVALID_REQUEST", ()=>INVALID_REQUEST);
parcelHelpers.export(exports, "METHOD_NOT_FOUND", ()=>METHOD_NOT_FOUND);
parcelHelpers.export(exports, "INVALID_PARAMS", ()=>INVALID_PARAMS);
parcelHelpers.export(exports, "INTERNAL_ERROR", ()=>INTERNAL_ERROR);
parcelHelpers.export(exports, "SERVER_ERROR", ()=>SERVER_ERROR);
parcelHelpers.export(exports, "RESERVED_ERROR_CODES", ()=>RESERVED_ERROR_CODES);
parcelHelpers.export(exports, "SERVER_ERROR_CODE_RANGE", ()=>SERVER_ERROR_CODE_RANGE);
parcelHelpers.export(exports, "STANDARD_ERROR_MAP", ()=>STANDARD_ERROR_MAP);
parcelHelpers.export(exports, "DEFAULT_ERROR", ()=>DEFAULT_ERROR);
const PARSE_ERROR = "PARSE_ERROR";
const INVALID_REQUEST = "INVALID_REQUEST";
const METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
const INVALID_PARAMS = "INVALID_PARAMS";
const INTERNAL_ERROR = "INTERNAL_ERROR";
const SERVER_ERROR = "SERVER_ERROR";
const RESERVED_ERROR_CODES = [
    -32700,
    -32600,
    -32601,
    -32602,
    -32603
];
const SERVER_ERROR_CODE_RANGE = [
    -32000,
    -32099
];
const STANDARD_ERROR_MAP = {
    [PARSE_ERROR]: {
        code: -32700,
        message: "Parse error"
    },
    [INVALID_REQUEST]: {
        code: -32600,
        message: "Invalid Request"
    },
    [METHOD_NOT_FOUND]: {
        code: -32601,
        message: "Method not found"
    },
    [INVALID_PARAMS]: {
        code: -32602,
        message: "Invalid params"
    },
    [INTERNAL_ERROR]: {
        code: -32603,
        message: "Internal error"
    },
    [SERVER_ERROR]: {
        code: -32000,
        message: "Server error"
    }
};
const DEFAULT_ERROR = SERVER_ERROR;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6cKI0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isServerErrorCode", ()=>isServerErrorCode);
parcelHelpers.export(exports, "isReservedErrorCode", ()=>isReservedErrorCode);
parcelHelpers.export(exports, "isValidErrorCode", ()=>isValidErrorCode);
parcelHelpers.export(exports, "getError", ()=>getError);
parcelHelpers.export(exports, "getErrorByCode", ()=>getErrorByCode);
parcelHelpers.export(exports, "validateJsonRpcError", ()=>validateJsonRpcError);
parcelHelpers.export(exports, "parseConnectionError", ()=>parseConnectionError);
var _constants = require("./constants");
function isServerErrorCode(code) {
    return code <= (0, _constants.SERVER_ERROR_CODE_RANGE)[0] && code >= (0, _constants.SERVER_ERROR_CODE_RANGE)[1];
}
function isReservedErrorCode(code) {
    return (0, _constants.RESERVED_ERROR_CODES).includes(code);
}
function isValidErrorCode(code) {
    return typeof code === "number";
}
function getError(type) {
    if (!Object.keys((0, _constants.STANDARD_ERROR_MAP)).includes(type)) return (0, _constants.STANDARD_ERROR_MAP)[0, _constants.DEFAULT_ERROR];
    return (0, _constants.STANDARD_ERROR_MAP)[type];
}
function getErrorByCode(code) {
    const match = Object.values((0, _constants.STANDARD_ERROR_MAP)).find((e)=>e.code === code);
    if (!match) return (0, _constants.STANDARD_ERROR_MAP)[0, _constants.DEFAULT_ERROR];
    return match;
}
function validateJsonRpcError(response) {
    if (typeof response.error.code === "undefined") return {
        valid: false,
        error: "Missing code for JSON-RPC error"
    };
    if (typeof response.error.message === "undefined") return {
        valid: false,
        error: "Missing message for JSON-RPC error"
    };
    if (!isValidErrorCode(response.error.code)) return {
        valid: false,
        error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
    if (isReservedErrorCode(response.error.code)) {
        const error = getErrorByCode(response.error.code);
        if (error.message !== (0, _constants.STANDARD_ERROR_MAP)[0, _constants.DEFAULT_ERROR].message && response.error.message === error.message) return {
            valid: false,
            error: `Invalid error code message for JSON-RPC: ${response.error.code}`
        };
    }
    return {
        valid: true
    };
}
function parseConnectionError(e, url, type) {
    return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e;
}

},{"./constants":"d7FKU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lEoTu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isNodeJs", ()=>isNodeJs);
var _environment = require("@walletconnect/environment");
parcelHelpers.exportAll(_environment, exports);
const isNodeJs = (0, _environment.isNode);

},{"@walletconnect/environment":"6xtT3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6xtT3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("7ea7787f9cb444bc");
tslib_1.__exportStar(require("224c4ee8cc5fb5e6"), exports);
tslib_1.__exportStar(require("ca369212861f50d2"), exports);

},{"7ea7787f9cb444bc":"lRdW5","224c4ee8cc5fb5e6":"4dzvu","ca369212861f50d2":"a11RJ"}],"4dzvu":[function(require,module,exports) {
var global = arguments[3];
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
function getBrowerCrypto() {
    return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
}
exports.getBrowerCrypto = getBrowerCrypto;
function getSubtleCrypto() {
    const browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
}
exports.getSubtleCrypto = getSubtleCrypto;
function isBrowserCryptoAvailable() {
    return !!getBrowerCrypto() && !!getSubtleCrypto();
}
exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;

},{}],"a11RJ":[function(require,module,exports) {
var process = require("6ccfe05cfad71fdb");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
function isReactNative() {
    return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
}
exports.isReactNative = isReactNative;
function isNode() {
    return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
}
exports.isNode = isNode;
function isBrowser() {
    return !isReactNative() && !isNode();
}
exports.isBrowser = isBrowser;

},{"6ccfe05cfad71fdb":"d5jf4"}],"3MpJQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "payloadId", ()=>payloadId);
parcelHelpers.export(exports, "getBigIntRpcId", ()=>getBigIntRpcId);
parcelHelpers.export(exports, "formatJsonRpcRequest", ()=>formatJsonRpcRequest);
parcelHelpers.export(exports, "formatJsonRpcResult", ()=>formatJsonRpcResult);
parcelHelpers.export(exports, "formatJsonRpcError", ()=>formatJsonRpcError);
parcelHelpers.export(exports, "formatErrorMessage", ()=>formatErrorMessage);
var _error = require("./error");
var _constants = require("./constants");
function payloadId(entropy = 3) {
    const date = Date.now() * Math.pow(10, entropy);
    const extra = Math.floor(Math.random() * Math.pow(10, entropy));
    return date + extra;
}
function getBigIntRpcId(entropy = 6) {
    return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
    return {
        id: id || payloadId(),
        jsonrpc: "2.0",
        method,
        params
    };
}
function formatJsonRpcResult(id, result) {
    return {
        id,
        jsonrpc: "2.0",
        result
    };
}
function formatJsonRpcError(id, error, data) {
    return {
        id,
        jsonrpc: "2.0",
        error: formatErrorMessage(error, data)
    };
}
function formatErrorMessage(error, data) {
    if (typeof error === "undefined") return (0, _error.getError)((0, _constants.INTERNAL_ERROR));
    if (typeof error === "string") error = Object.assign(Object.assign({}, (0, _error.getError)((0, _constants.SERVER_ERROR))), {
        message: error
    });
    if (typeof data !== "undefined") error.data = data;
    if ((0, _error.isReservedErrorCode)(error.code)) error = (0, _error.getErrorByCode)(error.code);
    return error;
}

},{"./error":"6cKI0","./constants":"d7FKU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lN6fi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isValidRoute", ()=>isValidRoute);
parcelHelpers.export(exports, "isValidDefaultRoute", ()=>isValidDefaultRoute);
parcelHelpers.export(exports, "isValidWildcardRoute", ()=>isValidWildcardRoute);
parcelHelpers.export(exports, "isValidLeadingWildcardRoute", ()=>isValidLeadingWildcardRoute);
parcelHelpers.export(exports, "isValidTrailingWildcardRoute", ()=>isValidTrailingWildcardRoute);
function isValidRoute(route) {
    if (route.includes("*")) return isValidWildcardRoute(route);
    if (/\W/g.test(route)) return false;
    return true;
}
function isValidDefaultRoute(route) {
    return route === "*";
}
function isValidWildcardRoute(route) {
    if (isValidDefaultRoute(route)) return true;
    if (!route.includes("*")) return false;
    if (route.split("*").length !== 2) return false;
    if (route.split("*").filter((x)=>x.trim() === "").length !== 1) return false;
    return true;
}
function isValidLeadingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7i0GH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsonrpcTypes = require("@walletconnect/jsonrpc-types");
parcelHelpers.exportAll(_jsonrpcTypes, exports);

},{"@walletconnect/jsonrpc-types":"TA1tb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"TA1tb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsonrpc = require("./jsonrpc");
parcelHelpers.exportAll(_jsonrpc, exports);
var _misc = require("./misc");
parcelHelpers.exportAll(_misc, exports);
var _provider = require("./provider");
parcelHelpers.exportAll(_provider, exports);
var _validator = require("./validator");
parcelHelpers.exportAll(_validator, exports);

},{"./jsonrpc":"jl24H","./misc":"8NPUm","./provider":"bxCYq","./validator":"bDite","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jl24H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8NPUm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IEvents", ()=>IEvents);
class IEvents {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bxCYq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IJsonRpcConnection", ()=>IJsonRpcConnection);
parcelHelpers.export(exports, "IBaseJsonRpcProvider", ()=>IBaseJsonRpcProvider);
parcelHelpers.export(exports, "IJsonRpcProvider", ()=>IJsonRpcProvider);
var _misc = require("./misc");
class IJsonRpcConnection extends (0, _misc.IEvents) {
    constructor(opts){
        super();
    }
}
class IBaseJsonRpcProvider extends (0, _misc.IEvents) {
    constructor(){
        super();
    }
}
class IJsonRpcProvider extends IBaseJsonRpcProvider {
    constructor(connection){
        super();
    }
}

},{"./misc":"8NPUm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bDite":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jQ6RQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isHttpUrl", ()=>isHttpUrl);
parcelHelpers.export(exports, "isWsUrl", ()=>isWsUrl);
parcelHelpers.export(exports, "isLocalhostUrl", ()=>isLocalhostUrl);
const HTTP_REGEX = "^https?:";
const WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
    const matches = url.match(new RegExp(/^\w+:/, "gi"));
    if (!matches || !matches.length) return;
    return matches[0];
}
function matchRegexProtocol(url, regex) {
    const protocol = getUrlProtocol(url);
    if (typeof protocol === "undefined") return false;
    return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
    return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
    return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6oD1U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isJsonRpcPayload", ()=>isJsonRpcPayload);
parcelHelpers.export(exports, "isJsonRpcRequest", ()=>isJsonRpcRequest);
parcelHelpers.export(exports, "isJsonRpcResponse", ()=>isJsonRpcResponse);
parcelHelpers.export(exports, "isJsonRpcResult", ()=>isJsonRpcResult);
parcelHelpers.export(exports, "isJsonRpcError", ()=>isJsonRpcError);
parcelHelpers.export(exports, "isJsonRpcValidationInvalid", ()=>isJsonRpcValidationInvalid);
function isJsonRpcPayload(payload) {
    return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
    return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
    return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
    return "result" in payload;
}
function isJsonRpcError(payload) {
    return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
    return "error" in validation && validation.valid === false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gsp7F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _ws = require("./ws");
var _wsDefault = parcelHelpers.interopDefault(_ws);
parcelHelpers.exportAll(_ws, exports);
exports.default = (0, _wsDefault.default);

},{"./ws":"h8dI4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h8dI4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WsConnection", ()=>WsConnection);
var _events = require("events");
var _safeJson = require("@walletconnect/safe-json");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
var global = arguments[3];
const EVENT_EMITTER_MAX_LISTENERS_DEFAULT = 10;
const resolveWebSocketImplementation = ()=>{
    if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") return global.WebSocket;
    if (typeof window !== "undefined" && typeof window.WebSocket !== "undefined") return window.WebSocket;
    return require("3a279a7c44eb7561");
};
const isBrowser = ()=>typeof window !== "undefined";
const WS = resolveWebSocketImplementation();
class WsConnection {
    constructor(url){
        this.url = url;
        this.events = new (0, _events.EventEmitter)();
        this.registering = false;
        if (!(0, _jsonrpcUtils.isWsUrl)(url)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
        this.url = url;
    }
    get connected() {
        return typeof this.socket !== "undefined";
    }
    get connecting() {
        return this.registering;
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    async open(url = this.url) {
        await this.register(url);
    }
    async close() {
        return new Promise((resolve, reject)=>{
            if (typeof this.socket === "undefined") {
                reject(new Error("Connection already closed"));
                return;
            }
            this.socket.onclose = (event)=>{
                this.onClose(event);
                resolve();
            };
            this.socket.close();
        });
    }
    async send(payload, context) {
        if (typeof this.socket === "undefined") this.socket = await this.register();
        try {
            this.socket.send((0, _safeJson.safeJsonStringify)(payload));
        } catch (e) {
            this.onError(payload.id, e);
        }
    }
    register(url = this.url) {
        if (!(0, _jsonrpcUtils.isWsUrl)(url)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
        if (this.registering) {
            const currentMaxListeners = this.events.getMaxListeners();
            if (this.events.listenerCount("register_error") >= currentMaxListeners || this.events.listenerCount("open") >= currentMaxListeners) this.events.setMaxListeners(currentMaxListeners + 1);
            return new Promise((resolve, reject)=>{
                this.events.once("register_error", (error)=>{
                    this.resetMaxListeners();
                    reject(error);
                });
                this.events.once("open", ()=>{
                    this.resetMaxListeners();
                    if (typeof this.socket === "undefined") return reject(new Error("WebSocket connection is missing or invalid"));
                    resolve(this.socket);
                });
            });
        }
        this.url = url;
        this.registering = true;
        return new Promise((resolve, reject)=>{
            const opts = !(0, _jsonrpcUtils.isReactNative)() ? {
                rejectUnauthorized: !(0, _jsonrpcUtils.isLocalhostUrl)(url)
            } : undefined;
            const socket = new WS(url, [], opts);
            if (isBrowser()) socket.onerror = (event)=>{
                const errorEvent = event;
                reject(this.emitError(errorEvent.error));
            };
            else socket.on("error", (errorEvent)=>{
                reject(this.emitError(errorEvent));
            });
            socket.onopen = ()=>{
                this.onOpen(socket);
                resolve(socket);
            };
        });
    }
    onOpen(socket) {
        socket.onmessage = (event)=>this.onPayload(event);
        socket.onclose = (event)=>this.onClose(event);
        this.socket = socket;
        this.registering = false;
        this.events.emit("open");
    }
    onClose(event) {
        this.socket = undefined;
        this.registering = false;
        this.events.emit("close", event);
    }
    onPayload(e) {
        if (typeof e.data === "undefined") return;
        const payload = typeof e.data === "string" ? (0, _safeJson.safeJsonParse)(e.data) : e.data;
        this.events.emit("payload", payload);
    }
    onError(id, e) {
        const error = this.parseError(e);
        const message = error.message || error.toString();
        const payload = (0, _jsonrpcUtils.formatJsonRpcError)(id, message);
        this.events.emit("payload", payload);
    }
    parseError(e, url = this.url) {
        return (0, _jsonrpcUtils.parseConnectionError)(e, url, "WS");
    }
    resetMaxListeners() {
        if (this.events.getMaxListeners() > EVENT_EMITTER_MAX_LISTENERS_DEFAULT) this.events.setMaxListeners(EVENT_EMITTER_MAX_LISTENERS_DEFAULT);
    }
    emitError(errorEvent) {
        const error = this.parseError(new Error((errorEvent === null || errorEvent === void 0 ? void 0 : errorEvent.message) || `WebSocket connection failed for URL: ${this.url}`));
        this.events.emit("register_error", error);
        return error;
    }
}
exports.default = WsConnection;

},{"events":"1VQLm","@walletconnect/safe-json":"cD1pC","@walletconnect/jsonrpc-utils":"izCJ8","3a279a7c44eb7561":"4OuWD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4OuWD":[function(require,module,exports) {
"use strict";
module.exports = function() {
    throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
};

},{}],"6emId":[function(require,module,exports) {
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the size to enable large array optimizations. */ var global = arguments[3];
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */ var HASH_UNDEFINED = "__lodash_hash_undefined__";
/** Used to compose bitmasks for value comparisons. */ var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
/** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */ var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */ var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */ var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */ var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
/** Detect free variable `self`. */ var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function("return this")();
/** Detect free variable `exports`. */ var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */ var freeModule = freeExports && true && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */ var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */ var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */ var nodeUtil = function() {
    try {
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {}
}();
/* Node.js helper references. */ var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */ function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while(++index < length){
        var value = array[index];
        if (predicate(value, index, array)) result[resIndex++] = value;
    }
    return result;
}
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */ function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while(++index < length)array[offset + index] = values[index];
    return array;
}
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */ function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while(++index < length){
        if (predicate(array[index], index, array)) return true;
    }
    return false;
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n)result[index] = iteratee(index);
    return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */ function baseUnary(func) {
    return function(value) {
        return func(value);
    };
}
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function cacheHas(cache, key) {
    return cache.has(key);
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function getValue(object, key) {
    return object == null ? undefined : object[key];
}
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */ function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
        result[++index] = [
            key,
            value
        ];
    });
    return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */ function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
        result[++index] = value;
    });
    return result;
}
/** Used for built-in method references. */ var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */ var coreJsData = root["__core-js_shared__"];
/** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect methods masquerading as native. */ var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
}();
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var nativeObjectToString = objectProto.toString;
/** Used to detect if a method is native. */ var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/** Built-in value references. */ var Buffer = moduleExports ? root.Buffer : undefined, Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined, nativeKeys = overArg(Object.keys, Object);
/* Built-in method references that are verified to be native. */ var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
/** Used to detect maps, sets, and weakmaps. */ var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
/** Used to convert symbols to primitives and strings. */ var symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
}
// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    if (index == lastIndex) data.pop();
    else splice.call(data, index, 1);
    --this.size;
    return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
        ++this.size;
        data.push([
            key,
            value
        ]);
    } else data[index][1] = value;
    return this;
}
// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
        "hash": new Hash,
        "map": new (Map || ListCache),
        "string": new Hash
    };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function mapCacheGet(key) {
    return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function mapCacheHas(key) {
    return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
}
// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */ function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache;
    while(++index < length)this.add(values[index]);
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */ function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */ function setCacheHas(value) {
    return this.__data__.has(value);
}
// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */ function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function stackGet(key) {
    return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function stackHas(key) {
    return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */ function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([
                key,
                value
            ]);
            this.size = ++data.size;
            return this;
        }
        data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
}
// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for(var key in value)if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) result.push(key);
    return result;
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function assocIndexOf(array, key) {
    var length = array.length;
    while(length--){
        if (eq(array[length][0], key)) return length;
    }
    return -1;
}
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */ function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
    if (value == null) return value === undefined ? undefinedTag : nullTag;
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */ function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
}
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */ function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) return true;
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) return value !== value && other !== other;
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) return false;
        objIsArr = true;
        objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
    }
    if (!isSameTag) return false;
    stack || (stack = new Stack);
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) return false;
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */ function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
    if (!isPrototype(object)) return nativeKeys(object);
    var result = [];
    for(var key in Object(object))if (hasOwnProperty.call(object, key) && key != "constructor") result.push(key);
    return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */ function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) return stacked == other;
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined;
    stack.set(array, other);
    stack.set(other, array);
    // Ignore non-index properties.
    while(++index < arrLength){
        var arrValue = array[index], othValue = other[index];
        if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        if (compared !== undefined) {
            if (compared) continue;
            result = false;
            break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
            if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex);
            })) {
                result = false;
                break;
            }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
        }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch(tag){
        case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
            object = object.buffer;
            other = other.buffer;
        case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
            return true;
        case boolTag:
        case dateTag:
        case numberTag:
            // Coerce booleans to `1` or `0` and dates to milliseconds.
            // Invalid dates are coerced to `NaN`.
            return eq(+object, +other);
        case errorTag:
            return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
            // Coerce regexes to strings and treat strings, primitives and objects,
            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
            // for more details.
            return object == other + "";
        case mapTag:
            var convert = mapToArray;
        case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) return false;
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked) return stacked == other;
            bitmask |= COMPARE_UNORDERED_FLAG;
            // Recursively compare objects (susceptible to call stack limits).
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
        case symbolTag:
            if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
    }
    return false;
}
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) return false;
    var index = objLength;
    while(index--){
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) return stacked == other;
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while(++index < objLength){
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
}
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */ function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) value[symToStringTag] = tag;
        else delete value[symToStringTag];
    }
    return result;
}
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */ var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) return [];
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
    });
};
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ var getTag = baseGetTag;
// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) switch(ctorString){
        case dataViewCtorString:
            return dataViewTag;
        case mapCtorString:
            return mapTag;
        case promiseCtorString:
            return promiseTag;
        case setCtorString:
            return setTag;
        case weakMapCtorString:
            return weakMapTag;
    }
    return result;
};
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function objectToString(value) {
    return nativeObjectToString.call(value);
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */ function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ var isArguments = baseIsArguments(function() {
    return arguments;
}()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */ var isBuffer = nativeIsBuffer || stubFalse;
/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */ function isEqual(value, other) {
    return baseIsEqual(value, other);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    if (!isObject(value)) return false;
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return value != null && typeof value == "object";
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */ var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */ function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */ function stubArray() {
    return [];
}
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */ function stubFalse() {
    return false;
}
module.exports = isEqual;

},{}],"dtBb9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _http = require("./http");
var _httpDefault = parcelHelpers.interopDefault(_http);
parcelHelpers.exportAll(_http, exports);
exports.default = (0, _httpDefault.default);

},{"./http":"jW3dW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jW3dW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HttpConnection", ()=>HttpConnection);
var _events = require("events");
var _crossFetch = require("cross-fetch");
var _crossFetchDefault = parcelHelpers.interopDefault(_crossFetch);
var _safeJson = require("@walletconnect/safe-json");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
const DEFAULT_HTTP_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json"
};
const DEFAULT_HTTP_METHOD = "POST";
const DEFAULT_FETCH_OPTS = {
    headers: DEFAULT_HTTP_HEADERS,
    method: DEFAULT_HTTP_METHOD
};
const EVENT_EMITTER_MAX_LISTENERS_DEFAULT = 10;
class HttpConnection {
    constructor(url, disableProviderPing = false){
        this.url = url;
        this.disableProviderPing = disableProviderPing;
        this.events = new (0, _events.EventEmitter)();
        this.isAvailable = false;
        this.registering = false;
        if (!(0, _jsonrpcUtils.isHttpUrl)(url)) throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
        this.url = url;
        this.disableProviderPing = disableProviderPing;
    }
    get connected() {
        return this.isAvailable;
    }
    get connecting() {
        return this.registering;
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    async open(url = this.url) {
        await this.register(url);
    }
    async close() {
        if (!this.isAvailable) throw new Error("Connection already closed");
        this.onClose();
    }
    async send(payload, context) {
        if (!this.isAvailable) await this.register();
        try {
            const body = (0, _safeJson.safeJsonStringify)(payload);
            const res = await (0, _crossFetchDefault.default)(this.url, Object.assign(Object.assign({}, DEFAULT_FETCH_OPTS), {
                body
            }));
            const data = await res.json();
            this.onPayload({
                data
            });
        } catch (e) {
            this.onError(payload.id, e);
        }
    }
    async register(url = this.url) {
        if (!(0, _jsonrpcUtils.isHttpUrl)(url)) throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
        if (this.registering) {
            const currentMaxListeners = this.events.getMaxListeners();
            if (this.events.listenerCount("register_error") >= currentMaxListeners || this.events.listenerCount("open") >= currentMaxListeners) this.events.setMaxListeners(currentMaxListeners + 1);
            return new Promise((resolve, reject)=>{
                this.events.once("register_error", (error)=>{
                    this.resetMaxListeners();
                    reject(error);
                });
                this.events.once("open", ()=>{
                    this.resetMaxListeners();
                    if (typeof this.isAvailable === "undefined") return reject(new Error("HTTP connection is missing or invalid"));
                    resolve();
                });
            });
        }
        this.url = url;
        this.registering = true;
        try {
            if (!this.disableProviderPing) {
                const body = (0, _safeJson.safeJsonStringify)({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "test",
                    params: []
                });
                await (0, _crossFetchDefault.default)(url, Object.assign(Object.assign({}, DEFAULT_FETCH_OPTS), {
                    body
                }));
            }
            this.onOpen();
        } catch (e) {
            const error = this.parseError(e);
            this.events.emit("register_error", error);
            this.onClose();
            throw error;
        }
    }
    onOpen() {
        this.isAvailable = true;
        this.registering = false;
        this.events.emit("open");
    }
    onClose() {
        this.isAvailable = false;
        this.registering = false;
        this.events.emit("close");
    }
    onPayload(e) {
        if (typeof e.data === "undefined") return;
        const payload = typeof e.data === "string" ? (0, _safeJson.safeJsonParse)(e.data) : e.data;
        this.events.emit("payload", payload);
    }
    onError(id, e) {
        const error = this.parseError(e);
        const message = error.message || error.toString();
        const payload = (0, _jsonrpcUtils.formatJsonRpcError)(id, message);
        this.events.emit("payload", payload);
    }
    parseError(e, url = this.url) {
        return (0, _jsonrpcUtils.parseConnectionError)(e, url, "HTTP");
    }
    resetMaxListeners() {
        if (this.events.getMaxListeners() > EVENT_EMITTER_MAX_LISTENERS_DEFAULT) this.events.setMaxListeners(EVENT_EMITTER_MAX_LISTENERS_DEFAULT);
    }
}
exports.default = HttpConnection;

},{"events":"1VQLm","cross-fetch":"j4ah4","@walletconnect/safe-json":"cD1pC","@walletconnect/jsonrpc-utils":"izCJ8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j4ah4":[function(require,module,exports) {
var global = typeof self !== "undefined" ? self : this;
var __self__ = function() {
    function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
    }
    F.prototype = global;
    return new F();
}();
(function(self1) {
    var irrelevant = function(exports1) {
        var support = {
            searchParams: "URLSearchParams" in self1,
            iterable: "Symbol" in self1 && "iterator" in Symbol,
            blob: "FileReader" in self1 && "Blob" in self1 && function() {
                try {
                    new Blob();
                    return true;
                } catch (e) {
                    return false;
                }
            }(),
            formData: "FormData" in self1,
            arrayBuffer: "ArrayBuffer" in self1
        };
        function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
            var viewClasses = [
                "[object Int8Array]",
                "[object Uint8Array]",
                "[object Uint8ClampedArray]",
                "[object Int16Array]",
                "[object Uint16Array]",
                "[object Int32Array]",
                "[object Uint32Array]",
                "[object Float32Array]",
                "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
        }
        function normalizeName(name) {
            if (typeof name !== "string") name = String(name);
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
            return name.toLowerCase();
        }
        function normalizeValue(value) {
            if (typeof value !== "string") value = String(value);
            return value;
        }
        // Build a destructive iterator for the value list
        function iteratorFor(items) {
            var iterator = {
                next: function() {
                    var value = items.shift();
                    return {
                        done: value === undefined,
                        value: value
                    };
                }
            };
            if (support.iterable) iterator[Symbol.iterator] = function() {
                return iterator;
            };
            return iterator;
        }
        function Headers(headers) {
            this.map = {};
            if (headers instanceof Headers) headers.forEach(function(value, name) {
                this.append(name, value);
            }, this);
            else if (Array.isArray(headers)) headers.forEach(function(header) {
                this.append(header[0], header[1]);
            }, this);
            else if (headers) Object.getOwnPropertyNames(headers).forEach(function(name) {
                this.append(name, headers[name]);
            }, this);
        }
        Headers.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
            for(var name in this.map)if (this.map.hasOwnProperty(name)) callback.call(thisArg, this.map[name], name, this);
        };
        Headers.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push(name);
            });
            return iteratorFor(items);
        };
        Headers.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
                items.push(value);
            });
            return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push([
                    name,
                    value
                ]);
            });
            return iteratorFor(items);
        };
        if (support.iterable) Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        function consumed(body) {
            if (body.bodyUsed) return Promise.reject(new TypeError("Already read"));
            body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result);
                };
                reader.onerror = function() {
                    reject(reader.error);
                };
            });
        }
        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
        }
        function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob);
            return promise;
        }
        function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for(var i = 0; i < view.length; i++)chars[i] = String.fromCharCode(view[i]);
            return chars.join("");
        }
        function bufferClone(buf) {
            if (buf.slice) return buf.slice(0);
            else {
                var view = new Uint8Array(buf.byteLength);
                view.set(new Uint8Array(buf));
                return view.buffer;
            }
        }
        function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
                this._bodyInit = body;
                if (!body) this._bodyText = "";
                else if (typeof body === "string") this._bodyText = body;
                else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body;
                else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body;
                else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this._bodyText = body.toString();
                else if (support.arrayBuffer && support.blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    // IE 10-11 can't handle a DataView body.
                    this._bodyInit = new Blob([
                        this._bodyArrayBuffer
                    ]);
                } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) this._bodyArrayBuffer = bufferClone(body);
                else this._bodyText = body = Object.prototype.toString.call(body);
                if (!this.headers.get("content-type")) {
                    if (typeof body === "string") this.headers.set("content-type", "text/plain;charset=UTF-8");
                    else if (this._bodyBlob && this._bodyBlob.type) this.headers.set("content-type", this._bodyBlob.type);
                    else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
            };
            if (support.blob) {
                this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    else if (this._bodyArrayBuffer) return Promise.resolve(new Blob([
                        this._bodyArrayBuffer
                    ]));
                    else if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                    else return Promise.resolve(new Blob([
                        this._bodyText
                    ]));
                };
                this.arrayBuffer = function() {
                    if (this._bodyArrayBuffer) return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                    else return this.blob().then(readBlobAsArrayBuffer);
                };
            }
            this.text = function() {
                var rejected = consumed(this);
                if (rejected) return rejected;
                if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                else if (this._bodyArrayBuffer) return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                else if (this._bodyFormData) throw new Error("could not read FormData body as text");
                else return Promise.resolve(this._bodyText);
            };
            if (support.formData) this.formData = function() {
                return this.text().then(decode);
            };
            this.json = function() {
                return this.text().then(JSON.parse);
            };
            return this;
        }
        // HTTP methods whose capitalization should be normalized
        var methods = [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "POST",
            "PUT"
        ];
        function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
                if (input.bodyUsed) throw new TypeError("Already read");
                this.url = input.url;
                this.credentials = input.credentials;
                if (!options.headers) this.headers = new Headers(input.headers);
                this.method = input.method;
                this.mode = input.mode;
                this.signal = input.signal;
                if (!body && input._bodyInit != null) {
                    body = input._bodyInit;
                    input.bodyUsed = true;
                }
            } else this.url = String(input);
            this.credentials = options.credentials || this.credentials || "same-origin";
            if (options.headers || !this.headers) this.headers = new Headers(options.headers);
            this.method = normalizeMethod(options.method || this.method || "GET");
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(body);
        }
        Request.prototype.clone = function() {
            return new Request(this, {
                body: this._bodyInit
            });
        };
        function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
                if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            });
            return form;
        }
        function parseHeaders(rawHeaders) {
            var headers = new Headers();
            // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
            // https://tools.ietf.org/html/rfc7230#section-3.2
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
                var parts = line.split(":");
                var key = parts.shift().trim();
                if (key) {
                    var value = parts.join(":").trim();
                    headers.append(key, value);
                }
            });
            return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
            if (!options) options = {};
            this.type = "default";
            this.status = options.status === undefined ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options ? options.statusText : "OK";
            this.headers = new Headers(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url
            });
        };
        Response.error = function() {
            var response = new Response(null, {
                status: 0,
                statusText: ""
            });
            response.type = "error";
            return response;
        };
        var redirectStatuses = [
            301,
            302,
            303,
            307,
            308
        ];
        Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) throw new RangeError("Invalid status code");
            return new Response(null, {
                status: status,
                headers: {
                    location: url
                }
            });
        };
        exports1.DOMException = self1.DOMException;
        try {
            new exports1.DOMException();
        } catch (err) {
            exports1.DOMException = function(message, name) {
                this.message = message;
                this.name = name;
                var error = Error(message);
                this.stack = error.stack;
            };
            exports1.DOMException.prototype = Object.create(Error.prototype);
            exports1.DOMException.prototype.constructor = exports1.DOMException;
        }
        function fetch(input, init) {
            return new Promise(function(resolve, reject) {
                var request = new Request(input, init);
                if (request.signal && request.signal.aborted) return reject(new exports1.DOMException("Aborted", "AbortError"));
                var xhr = new XMLHttpRequest();
                function abortXhr() {
                    xhr.abort();
                }
                xhr.onload = function() {
                    var options = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                    };
                    options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                    var body = "response" in xhr ? xhr.response : xhr.responseText;
                    resolve(new Response(body, options));
                };
                xhr.onerror = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.ontimeout = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.onabort = function() {
                    reject(new exports1.DOMException("Aborted", "AbortError"));
                };
                xhr.open(request.method, request.url, true);
                if (request.credentials === "include") xhr.withCredentials = true;
                else if (request.credentials === "omit") xhr.withCredentials = false;
                if ("responseType" in xhr && support.blob) xhr.responseType = "blob";
                request.headers.forEach(function(value, name) {
                    xhr.setRequestHeader(name, value);
                });
                if (request.signal) {
                    request.signal.addEventListener("abort", abortXhr);
                    xhr.onreadystatechange = function() {
                        // DONE (success or failure)
                        if (xhr.readyState === 4) request.signal.removeEventListener("abort", abortXhr);
                    };
                }
                xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
        }
        fetch.polyfill = true;
        if (!self1.fetch) {
            self1.fetch = fetch;
            self1.Headers = Headers;
            self1.Request = Request;
            self1.Response = Response;
        }
        exports1.Headers = Headers;
        exports1.Request = Request;
        exports1.Response = Response;
        exports1.fetch = fetch;
        Object.defineProperty(exports1, "__esModule", {
            value: true
        });
        return exports1;
    }({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
;
exports.default = ctx.fetch // For TypeScript consumers without esModuleInterop.
;
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
;
exports.Headers = ctx.Headers;
exports.Request = ctx.Request;
exports.Response = ctx.Response;
module.exports = exports;

},{}],"5e94t":[function(require,module,exports) {
module.exports = require("db826fe0ab9d7253")(require("64f1f19995a0edd8").getBundleURL("fcThf") + "dist.62777089.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("fZGhK"));

},{"db826fe0ab9d7253":"61B45","64f1f19995a0edd8":"lgJ39"}]},["1E2TZ"], null, "parcelRequired248")

//# sourceMappingURL=index.es.d679753d.js.map
