import { R as Rl, u as ut, w as w$1, a as Nc, c as su, D as Do, b as bt, d as pu, p as p$1, O, e as Rc, g as gu, v as vu, f as er, L as Le, h as hl } from "./indexhtml-BEc_5Jrd.js";
import { g } from "./state-D9hUSHhi-DOZcGucA.js";
import { i as i$1 } from "./base-panel-Cm-eTOpq-DQ3K0nfW.js";
import { e } from "./icons-wGs4ytLT-BPLiXn5f.js";
import { e as e$1 } from "./early-project-state-CqEloDes-CqEloDes.js";
const W = "copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel div.info-tray{display:flex;flex-direction:column;gap:10px}copilot-info-panel vaadin-button{margin-inline:var(--lumo-space-l)}copilot-info-panel dl{display:grid;grid-template-columns:auto auto;gap:0;margin:var(--space-100) var(--space-50);font:var(--font-xsmall)}copilot-info-panel dl>dt,copilot-info-panel dl>dd{padding:3px 10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel dd span.true{color:var(--dev-tools-green-color);font-size:large}copilot-info-panel dd span.false{color:var(--dev-tools-red-color);font-size:large}copilot-info-panel code{white-space:nowrap;-webkit-user-select:all;user-select:all}copilot-info-panel .checks{display:inline-grid;grid-template-columns:auto 1fr;gap:var(--space-50)}copilot-info-panel span.hint{font-size:var(--font-size-0);background:var(--gray-50);padding:var(--space-75);border-radius:var(--radius-2)}";
var D, S;
function _() {
  return S || (S = 1, D = function() {
    var e2 = document.getSelection();
    if (!e2.rangeCount)
      return function() {
      };
    for (var t = document.activeElement, o = [], s = 0; s < e2.rangeCount; s++)
      o.push(e2.getRangeAt(s));
    switch (t.tagName.toUpperCase()) {
      // .toUpperCase handles XHTML
      case "INPUT":
      case "TEXTAREA":
        t.blur();
        break;
      default:
        t = null;
        break;
    }
    return e2.removeAllRanges(), function() {
      e2.type === "Caret" && e2.removeAllRanges(), e2.rangeCount || o.forEach(function(l) {
        e2.addRange(l);
      }), t && t.focus();
    };
  }), D;
}
var E, $;
function z() {
  if ($) return E;
  $ = 1;
  var e2 = _(), t = {
    "text/plain": "Text",
    "text/html": "Url",
    default: "Text"
  }, o = "Copy to clipboard: #{key}, Enter";
  function s(n) {
    var a = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
    return n.replace(/#{\s*key\s*}/g, a);
  }
  function l(n, a) {
    var i, u, f, g2, d, r, h = false;
    a || (a = {}), i = a.debug || false;
    try {
      f = e2(), g2 = document.createRange(), d = document.getSelection(), r = document.createElement("span"), r.textContent = n, r.ariaHidden = "true", r.style.all = "unset", r.style.position = "fixed", r.style.top = 0, r.style.clip = "rect(0, 0, 0, 0)", r.style.whiteSpace = "pre", r.style.webkitUserSelect = "text", r.style.MozUserSelect = "text", r.style.msUserSelect = "text", r.style.userSelect = "text", r.addEventListener("copy", function(c) {
        if (c.stopPropagation(), a.format)
          if (c.preventDefault(), typeof c.clipboardData > "u") {
            i && console.warn("unable to use e.clipboardData"), i && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
            var x = t[a.format] || t.default;
            window.clipboardData.setData(x, n);
          } else
            c.clipboardData.clearData(), c.clipboardData.setData(a.format, n);
        a.onCopy && (c.preventDefault(), a.onCopy(c.clipboardData));
      }), document.body.appendChild(r), g2.selectNodeContents(r), d.addRange(g2);
      var R = document.execCommand("copy");
      if (!R)
        throw new Error("copy command was unsuccessful");
      h = true;
    } catch (c) {
      i && console.error("unable to copy using execCommand: ", c), i && console.warn("trying IE specific stuff");
      try {
        window.clipboardData.setData(a.format || "text", n), a.onCopy && a.onCopy(window.clipboardData), h = true;
      } catch (x) {
        i && console.error("unable to copy using clipboardData: ", x), i && console.error("falling back to prompt"), u = s("message" in a ? a.message : o), window.prompt(u, n);
      }
    } finally {
      d && (typeof d.removeRange == "function" ? d.removeRange(g2) : d.removeAllRanges()), r && document.body.removeChild(r), f();
    }
    return h;
  }
  return E = l, E;
}
var G = z();
const K = /* @__PURE__ */ Nc(G);
var X = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, w = (e2, t, o, s) => {
  for (var l = s > 1 ? void 0 : s ? Y(t, o) : t, n = e2.length - 1, a; n >= 0; n--)
    (a = e2[n]) && (l = (s ? a(t, o, l) : a(l)) || l);
  return s && l && X(t, o, l), l;
};
let b = class extends i$1 {
  constructor() {
    super(...arguments), this.serverInfo = [], this.clientInfo = [{ name: "Browser", version: navigator.userAgent }], this.handleServerInfoEvent = (e2) => {
      const t = JSON.parse(e2.data.info);
      this.serverInfo = t.versions, su().then((o) => {
        o && (this.clientInfo.unshift({ name: "Vaadin Employee", version: "true", more: void 0 }), this.requestUpdate("clientInfo"));
      }), Do() === "success" && bt("hotswap-active", { value: pu() });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("copilot-info", this.handleServerInfoEvent), this.onEventBus("system-info-with-callback", (e2) => {
      e2.detail.callback(this.getInfoForClipboard(e2.detail.notify));
    }), this.reaction(
      () => p$1.idePluginState,
      () => {
        this.requestUpdate("serverInfo");
      }
    );
  }
  getIndex(e2) {
    return this.serverInfo.findIndex((t) => t.name === e2);
  }
  render() {
    const e2 = [...this.serverInfo, ...this.clientInfo];
    let t = this.getIndex("Spring") + 1;
    return t === 0 && (t = e2.length), e$1.springSecurityEnabled && (e2.splice(t, 0, { name: "Spring Security", version: "true" }), t++), e$1.springJpaDataEnabled && (e2.splice(t, 0, { name: "Spring Data JPA", version: "true" }), t++), ut` <style>
        ${W}
      </style>
      <div class="info-tray">
        <dl>
          ${e2.map(
      (o) => ut`
              <dt>${o.name}</dt>
              <dd title="${o.version}" style="${o.name === "Java Hotswap" ? "white-space: normal" : ""}">
                ${this.renderValue(o.version)} ${o.more}
              </dd>
            `
    )}
          ${this.renderDevWorkflowSection()}
        </dl>
        ${this.renderDevelopmentWorkflowButton()}
      </div>`;
  }
  renderDevWorkflowSection() {
    const e2 = Do(), t = this.getIdePluginLabelText(p$1.idePluginState), o = this.getHotswapAgentLabelText(e2);
    return ut`
      <dt>Java Hotswap</dt>
      <dd>${v(e2 === "success")} ${o}</dd>
      ${Rc() !== "unsupported" ? ut`<dt>IDE Plugin</dt>
            <dd>${v(Rc() === "success")} ${t}</dd>` : O}
    `;
  }
  renderDevelopmentWorkflowButton() {
    const e$12 = gu();
    let t = "", o = null;
    return e$12.status === "success" ? (t = "More details...", o = e.successColorful) : e$12.status === "warning" ? (t = "Improve Development Workflow...", o = e.warningColorful) : e$12.status === "error" && (t = "Fix Development Workflow...", o = ut`<span style="color: var(--red)">${e.error}</span>`), ut`
      <vaadin-button
        id="development-workflow-guide"
        @click="${() => {
      vu();
    }}">
        <span slot="prefix"> ${o}</span>
        ${t}</vaadin-button
      >
    `;
  }
  getHotswapAgentLabelText(e2) {
    return e2 === "success" ? "Java Hotswap is enabled" : e2 === "error" ? "Hotswap is partially enabled" : "Hotswap is not enabled";
  }
  getIdePluginLabelText(e2) {
    if (Rc() !== "success")
      return "Not installed";
    if (e2 == null ? void 0 : e2.version) {
      let t = null;
      return (e2 == null ? void 0 : e2.ide) && ((e2 == null ? void 0 : e2.ide) === "intellij" ? t = "IntelliJ" : (e2 == null ? void 0 : e2.ide) === "vscode" ? t = "VS Code" : (e2 == null ? void 0 : e2.ide) === "eclipse" && (t = "Eclipse")), t ? `${e2 == null ? void 0 : e2.version} ${t}` : e2 == null ? void 0 : e2.version;
    }
    return "Not installed";
  }
  renderValue(e2) {
    return e2 === "false" ? v(false) : e2 === "true" ? v(true) : e2;
  }
  getInfoForClipboard(e2) {
    const t = this.renderRoot.querySelectorAll(".info-tray dt"), l = Array.from(t).map((n) => ({
      key: n.textContent.trim(),
      value: n.nextElementSibling.textContent.trim()
    })).filter((n) => n.key !== "Live reload").filter((n) => !n.key.startsWith("Vaadin Emplo")).map((n) => {
      var _a;
      const { key: a } = n;
      let { value: i } = n;
      if (a === "IDE Plugin")
        i = this.getIdePluginLabelText(p$1.idePluginState) ?? "false";
      else if (a === "Java Hotswap") {
        const u = (_a = p$1.jdkInfo) == null ? void 0 : _a.jrebel, f = Do();
        u && f === "success" ? i = "JRebel is in use" : i = this.getHotswapAgentLabelText(f);
      }
      return `${a}: ${i}`;
    }).join(`
`);
    return e2 && er({
      type: Le.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), l.trim();
  }
};
w([
  g()
], b.prototype, "serverInfo", 2);
w([
  g()
], b.prototype, "clientInfo", 2);
b = w([
  hl("copilot-info-panel")
], b);
let T = class extends Rl {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return ut`<button title="Copy to clipboard" aria-label="Copy to clipboard" theme="icon tertiary">
      <span
        @click=${() => {
      w$1.emit("system-info-with-callback", {
        callback: K,
        notify: true
      });
    }}
        >${e.copy}</span
      >
    </button>`;
  }
};
T = w([
  hl("copilot-info-actions")
], T);
const Q = {
  header: "Info",
  expanded: false,
  panelOrder: 15,
  panel: "right",
  floating: false,
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions",
  eager: true
  // Render even when collapsed as error handling depends on this
}, Z = {
  init(e2) {
    e2.addPanel(Q);
  }
};
window.Vaadin.copilot.plugins.push(Z);
function v(e2) {
  return e2 ? ut`<span class="true">☑</span>` : ut`<span class="false">☒</span>`;
}
export {
  T as Actions,
  b as CopilotInfoPanel
};
