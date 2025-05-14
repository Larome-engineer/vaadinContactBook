import { R as Rl, u as ut, w as w$1, p as p$1, A as Ao, I as In, J as Jc, L as Le, $ as $s, b as bt, N as Nt, B as Bc, s as se, h as hl } from "./indexhtml-BEc_5Jrd.js";
import { g as g$1 } from "./state-D9hUSHhi-DOZcGucA.js";
import { i as i$1 } from "./base-panel-Cm-eTOpq-DQ3K0nfW.js";
import { e } from "./icons-wGs4ytLT-BPLiXn5f.js";
const _ = 'copilot-log-panel ul{list-style-type:none;margin:0;padding:0}copilot-log-panel ul li{align-items:start;display:flex;gap:var(--space-50);padding:var(--space-100) var(--space-50);position:relative}copilot-log-panel ul li:before{border-bottom:1px dashed var(--divider-color);content:"";inset:auto 0 0 calc(var(--size-m) + var(--space-100));position:absolute}copilot-log-panel ul li span.icon{display:flex;flex-shrink:0;justify-content:center;width:var(--size-m)}copilot-log-panel ul li.information span.icon{color:var(--blue-color)}copilot-log-panel ul li.warning span.icon{color:var(--warning-color)}copilot-log-panel ul li.error span.icon{color:var(--error-color)}copilot-log-panel ul li .message{display:flex;flex-direction:column;flex-grow:1;overflow:hidden}copilot-log-panel ul li:not(.expanded) span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}copilot-log-panel ul li button svg{transition:transform .15s cubic-bezier(.2,0,0,1)}copilot-log-panel ul li button[aria-expanded=true] svg{transform:rotate(90deg)}copilot-log-panel ul li code{margin-top:var(--space-50)}copilot-log-panel ul li.expanded .secondary{margin-top:var(--space-100)}';
var B = Object.defineProperty, C = Object.getOwnPropertyDescriptor, u = (e2, t, a, i) => {
  for (var o = i > 1 ? void 0 : i ? C(t, a) : t, d = e2.length - 1, s; d >= 0; d--)
    (s = e2[d]) && (o = (i ? s(t, a, o) : s(o)) || o);
  return i && o && B(t, a, o), o;
};
class b {
  constructor() {
    this.showTimestamps = false, Nt(this);
  }
  toggleShowTimestamps() {
    this.showTimestamps = !this.showTimestamps;
  }
}
const h = new b();
let r = class extends i$1 {
  constructor() {
    super(...arguments), this.unreadErrors = false, this.messages = [], this.nextMessageId = 1, this.transitionDuration = 0, this.errorHandlersAdded = false;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.onCommand("log", (e2) => {
      this.handleLogEventData({ type: e2.data.type, message: e2.data.message });
    }), this.onEventBus("log", (e2) => this.handleLogEvent(e2)), this.onEventBus("update-log", (e2) => this.updateLog(e2.detail)), this.onEventBus("notification-shown", (e2) => this.handleNotification(e2)), this.onEventBus("clear-log", () => this.clear()), this.reaction(
      () => p$1.sectionPanelResizing,
      () => {
        this.requestUpdate();
      }
    ), this.transitionDuration = parseInt(
      window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),
      10
    ), !this.errorHandlersAdded) {
      const e2 = (t) => {
        Bc(() => {
          se.attentionRequiredPanelTag = "copilot-log-panel";
        }), this.log(Le.ERROR, t.message, !!t.internal, t.details, t.link);
      };
      Ao((t) => {
        e2(t);
      }), In.forEach((t) => {
        e2(t);
      }), In.length = 0, this.errorHandlersAdded = true;
    }
  }
  clear() {
    this.messages = [];
  }
  handleNotification(e2) {
    this.log(e2.detail.type, e2.detail.message, true, e2.detail.details, e2.detail.link);
  }
  handleLogEvent(e2) {
    this.handleLogEventData(e2.detail);
  }
  handleLogEventData(e2) {
    this.log(
      e2.type,
      e2.message,
      !!e2.internal,
      e2.details,
      e2.link,
      Jc(e2.expandedMessage),
      Jc(e2.expandedDetails),
      e2.id
    );
  }
  activate() {
    this.unreadErrors = false, this.updateComplete.then(() => {
      const e2 = this.renderRoot.querySelector(".message:last-child");
      e2 && e2.scrollIntoView();
    });
  }
  render() {
    return ut`
      <style>
        ${_}
      </style>
      <ul>
        ${this.messages.map((e2) => this.renderMessage(e2))}
      </ul>
    `;
  }
  renderMessage(e$1) {
    let t, a;
    return e$1.type === Le.ERROR ? (a = e.alertTriangle, t = "Error") : e$1.type === Le.WARNING ? (a = e.warning, t = "Warning") : (a = e.info, t = "Info"), ut`
      <li
        class="${e$1.type} ${e$1.expanded ? "expanded" : ""} ${e$1.details || e$1.link ? "has-details" : ""}"
        data-id="${e$1.id}">
        <span aria-label="${t}" class="icon" title="${t}">${a}</span>
        <span class="message" @click=${() => this.toggleExpanded(e$1)}>
          <span class="timestamp" ?hidden=${!h.showTimestamps}>${W(e$1.timestamp)}</span>
          <span class="primary">
            ${e$1.expanded && e$1.expandedMessage ? e$1.expandedMessage : e$1.message}
          </span>
          ${e$1.expanded ? ut` <span class="secondary"> ${e$1.expandedDetails ?? e$1.details} </span>` : ut` <span class="secondary" ?hidden="${!e$1.details && !e$1.link}">
                ${Jc(e$1.details)}
                ${e$1.link ? ut` <a href="${e$1.link}" target="_blank">Learn more</a>` : ""}
              </span>`}
        </span>
        <!-- TODO: a11y, button needs aria-controls with unique ids -->
        <button
          aria-controls="content"
          aria-expanded="${e$1.expanded}"
          aria-label="Expand details"
          class="icon"
          @click=${() => this.toggleExpanded(e$1)}
          ?hidden=${!this.canBeExpanded(e$1)}>
          <span>${e.chevronRight}</span>
        </button>
      </li>
    `;
  }
  log(e2, t, a, i, o, d, s, E) {
    const T = this.nextMessageId;
    this.nextMessageId += 1, s || (s = t);
    const f = {
      id: T,
      type: e2,
      message: t,
      details: i,
      link: o,
      dontShowAgain: false,
      deleted: false,
      expanded: false,
      expandedMessage: d,
      expandedDetails: s,
      timestamp: /* @__PURE__ */ new Date(),
      internal: a,
      userId: E
    };
    for (this.messages.push(f); this.messages.length > r.MAX_LOG_ROWS; )
      this.messages.shift();
    return this.requestUpdate(), this.updateComplete.then(() => {
      const m = this.renderRoot.querySelector(".message:last-child");
      m ? (setTimeout(() => m.scrollIntoView({ behavior: "smooth" }), this.transitionDuration), this.unreadErrors = false) : e2 === Le.ERROR && (this.unreadErrors = true);
    }), f;
  }
  updateLog(e2) {
    let t = this.messages.find((a) => a.userId === e2.id);
    t || (t = this.log(Le.INFORMATION, "<Log message to update was not found>", false)), Object.assign(t, e2), $s(t.expandedDetails) && (t.expandedDetails = Jc(t.expandedDetails)), this.requestUpdate();
  }
  updated() {
    var _a;
    const e2 = this.querySelector(".row:last-child");
    e2 && this.isTooLong(e2.querySelector(".firstrowmessage")) && ((_a = e2.querySelector("button.expand")) == null ? void 0 : _a.removeAttribute("hidden"));
  }
  toggleExpanded(e2) {
    this.canBeExpanded(e2) && (e2.expanded = !e2.expanded, this.requestUpdate()), bt("use-log", { source: "toggleExpanded" });
  }
  canBeExpanded(e2) {
    var _a;
    if (e2.expandedMessage || e2.expanded)
      return true;
    const t = (_a = this.querySelector(`[data\\-id="${e2.id}"]`)) == null ? void 0 : _a.querySelector(
      ".firstrowmessage"
    );
    return this.isTooLong(t);
  }
  isTooLong(e2) {
    return e2 && e2.offsetWidth < e2.scrollWidth;
  }
};
r.MAX_LOG_ROWS = 1e3;
u([
  g$1()
], r.prototype, "unreadErrors", 2);
u([
  g$1()
], r.prototype, "messages", 2);
r = u([
  hl("copilot-log-panel")
], r);
let w = class extends Rl {
  createRenderRoot() {
    return this;
  }
  render() {
    return ut`
      <style>
        copilot-log-panel-actions {
          display: contents;
        }
      </style>
      <button
        aria-label="Clear log"
        class="icon"
        title="Clear log"
        @click=${() => {
      w$1.emit("clear-log", {});
    }}>
        <span>${e.trash}</span>
      </button>
      <button
        aria-label="Toggle timestamps"
        class="icon"
        title="Toggle timestamps"
        @click=${() => {
      h.toggleShowTimestamps();
    }}>
        <span class="${h.showTimestamps ? "on" : "off"}"> ${e.clock} </span>
      </button>
    `;
  }
};
w = u([
  hl("copilot-log-panel-actions")
], w);
const U = {
  header: "Log",
  expanded: true,
  panelOrder: 0,
  panel: "bottom",
  floating: false,
  tag: "copilot-log-panel",
  actionsTag: "copilot-log-panel-actions"
}, N = {
  init(e2) {
    e2.addPanel(U);
  }
};
window.Vaadin.copilot.plugins.push(N);
const y = { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3 };
let g;
try {
  g = new Intl.DateTimeFormat(navigator.language, y);
} catch (e2) {
  console.error("Failed to create date time formatter for ", navigator.language, e2), g = new Intl.DateTimeFormat("en-US", y);
}
function W(e2) {
  return g.format(e2);
}
export {
  w as Actions,
  r as CopilotLogPanel
};
