var _a, _b;
import { z as vl, h as hl, o as ou, T as Tc, s as se$1, w as w$1, K as Kc, F as Fc, b as bt, f as er, L as Le, C as Cc, E as kc, p as p$1, R as Rl, D as Do, u as ut, B as Bc, O as O$1, d as pu, r as qn, t as ve, j as De, Z as Zc, G as Gc, P as au, Q as ue$1, S as Qc, V as te$1, W as mc, _ as Wc, a0 as fn, a1 as dt, v as vu, g as gu, a2 as Eo, l as lu, a3 as tl, a4 as cu, a5 as Ac, a6 as uu, M as Ml, a7 as Oc, J as Jc, a8 as bo } from "./indexhtml-BEc_5Jrd.js";
import { g, h } from "./state-D9hUSHhi-DOZcGucA.js";
import { v, u } from "./overlay-monkeypatch-2WhKaNKQ-DMiYMd7x.js";
import { e as e$1 } from "./icons-wGs4ytLT-BPLiXn5f.js";
import { e } from "./early-project-state-CqEloDes-CqEloDes.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Oe(e2) {
  return (t, o) => {
    const i = typeof t == "function" ? t : t[o];
    Object.assign(i, e2);
  };
}
var _e = Object.defineProperty, je = Object.getOwnPropertyDescriptor, k = (e2, t, o, i) => {
  for (var n = i > 1 ? void 0 : i ? je(t, o) : t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = (i ? r(t, o, n) : r(n)) || n);
  return i && n && _e(t, o, n), n;
};
const F = "data-drag-initial-index", O = "data-drag-final-index";
let P = class extends Rl {
  constructor() {
    super(...arguments), this.position = "right", this.opened = false, this.keepOpen = false, this.resizing = false, this.closingForcefully = false, this.draggingSectionPanel = null, this.documentMouseUpListener = () => {
      this.resizing && w$1.emit("user-select", { allowSelection: true }), this.resizing = false, p$1.setDrawerResizing(false), this.removeAttribute("resizing");
    }, this.activationAnimationTransitionEndListener = () => {
      this.style.removeProperty("--closing-delay"), this.style.removeProperty("--initial-position"), this.removeEventListener("transitionend", this.activationAnimationTransitionEndListener);
    }, this.resizingMouseMoveListener = (e2) => {
      if (!this.resizing)
        return;
      const { x: t, y: o } = e2;
      e2.stopPropagation(), e2.preventDefault(), requestAnimationFrame(() => {
        let i;
        if (this.position === "right") {
          const n = document.body.clientWidth - t;
          this.style.setProperty("--size", `${n}px`), ue$1.saveDrawerSize(this.position, n), i = { width: n };
        } else if (this.position === "left") {
          const n = t;
          this.style.setProperty("--size", `${n}px`), ue$1.saveDrawerSize(this.position, n), i = { width: n };
        } else if (this.position === "bottom") {
          const n = document.body.clientHeight - o;
          this.style.setProperty("--size", `${n}px`), ue$1.saveDrawerSize(this.position, n), i = { height: n };
        }
        se$1.panels.filter((n) => !n.floating && n.panel === this.position).forEach((n) => {
          se$1.updatePanel(n.tag, i);
        });
      });
    }, this.sectionPanelDraggingStarted = (e2, t) => {
      this.draggingSectionPanel = e2, w$1.emit("user-select", { allowSelection: false }), this.draggingSectionPointerStartY = t.clientY, e2.toggleAttribute("dragging", true), e2.style.zIndex = "1000", Array.from(this.querySelectorAll("copilot-section-panel-wrapper")).forEach((o, i) => {
        o.setAttribute(F, `${i}`);
      }), document.addEventListener("mousemove", this.sectionPanelDragging), document.addEventListener("mouseup", this.sectionPanelDraggingFinished);
    }, this.sectionPanelDragging = (e2) => {
      if (!this.draggingSectionPanel)
        return;
      const { clientX: t, clientY: o } = e2;
      if (!Qc(this.getBoundingClientRect(), t, o)) {
        this.cleanUpDragging();
        return;
      }
      const i = o - this.draggingSectionPointerStartY;
      this.draggingSectionPanel.style.transform = `translateY(${i}px)`, this.updateSectionPanelPositionsWhileDragging();
    }, this.sectionPanelDraggingFinished = () => {
      if (!this.draggingSectionPanel)
        return;
      w$1.emit("user-select", { allowSelection: true });
      const e2 = this.getAllPanels().filter(
        (t) => {
          var _a2;
          return t.hasAttribute(O) && ((_a2 = t.panelInfo) == null ? void 0 : _a2.panelOrder) !== Number.parseInt(t.getAttribute(O), 10);
        }
      ).map((t) => ({
        tag: t.panelTag,
        order: Number.parseInt(t.getAttribute(O), 10)
      }));
      this.cleanUpDragging(), se$1.updateOrders(e2), document.removeEventListener("mouseup", this.sectionPanelDraggingFinished), document.removeEventListener("mousemove", this.sectionPanelDragging);
    }, this.updateSectionPanelPositionsWhileDragging = () => {
      const e2 = this.draggingSectionPanel.getBoundingClientRect().height;
      this.getAllPanels().sort((t, o) => {
        const i = t.getBoundingClientRect(), n = o.getBoundingClientRect(), s = (i.top + i.bottom) / 2, r = (n.top + n.bottom) / 2;
        return s - r;
      }).forEach((t, o) => {
        var _a2;
        if (t.setAttribute(O, `${o}`), t.panelTag !== ((_a2 = this.draggingSectionPanel) == null ? void 0 : _a2.panelTag)) {
          const i = Number.parseInt(t.getAttribute(F), 10);
          i > o ? t.style.transform = `translateY(${-e2}px)` : i < o ? t.style.transform = `translateY(${e2}px)` : t.style.removeProperty("transform");
        }
      });
    };
  }
  static get styles() {
    return [
      te$1(mc),
      vl`
        :host {
          --size: 350px;
          --min-size: 20%;
          --max-size: 80%;
          --default-content-height: 300px;
          --transition-duration: var(--duration-2);
          --opening-delay: var(--duration-2);
          --closing-delay: var(--duration-3);
          --hover-size: 18px;
          --initial-position: 0px;
          position: absolute;
          z-index: var(--z-index-drawer);
          transition: translate var(--transition-duration) var(--closing-delay);
        }

        :host([no-transition]),
        :host([no-transition]) .container {
          transition: none;
          -webkit-transition: none;
          -moz-transition: none;
          -o-transition: none;
        }

        :host(:is([position='left'], [position='right'])) {
          width: var(--size);
          min-width: var(--min-size);
          max-width: var(--max-size);
          top: 0;
          bottom: 0;
        }

        :host([position='left']) {
          left: var(--initial-position);
          translate: calc(-100% + var(--hover-size)) 0%;
          padding-right: var(--hover-size);
        }

        :host([position='right']) {
          right: var(--initial-position);
          translate: calc(100% - var(--hover-size)) 0%;
          padding-left: var(--hover-size);
        }

        :host([position='bottom']) {
          height: var(--size);
          min-height: var(--min-size);
          max-height: var(--max-size);
          bottom: var(--initial-position);
          left: 0;
          right: 0;
          translate: 0% calc(100% - var(--hover-size));
          padding-top: var(--hover-size);
        }

        /* The visible container. Needed to have extra space for hover and resize handle outside it. */

        .container {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          height: 100%;
          background: var(--background-color);
          -webkit-backdrop-filter: var(--surface-backdrop-filter);
          backdrop-filter: var(--surface-backdrop-filter);
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: var(--surface-box-shadow-2);
          transition:
            opacity var(--transition-duration) var(--closing-delay),
            visibility calc(var(--transition-duration) * 2) var(--closing-delay);
          opacity: 0;
          /* For accessibility (restored when open) */
          visibility: hidden;
        }

        :host([position='left']) .container {
          border-right: 1px solid var(--surface-border-color);
        }

        :host([position='right']) .container {
          border-left: 1px solid var(--surface-border-color);
        }

        :host([position='bottom']) .container {
          border-top: 1px solid var(--surface-border-color);
        }

        /* Opened state */

        :host(:is([opened], [keepopen])) {
          translate: 0% 0%;
          transition-delay: var(--opening-delay);
          z-index: var(--z-index-opened-drawer);
        }

        :host(:is([opened], [keepopen])) .container {
          transition-delay: var(--opening-delay);
          visibility: visible;
          opacity: 1;
        }

        .drawer-indicator {
          align-items: center;
          border-radius: 9999px;
          box-shadow: inset 0 0 0 1px hsl(0 0% 0% / 0.2);
          color: white;
          display: flex;
          height: 1.75rem;
          justify-content: center;
          overflow: hidden;
          opacity: 1;
          position: absolute;
          transition-delay: 0.5s;
          transition-duration: 0.2s;
          transition-property: opacity;
          width: 1.75rem;
        }

        .drawer-indicator::before {
          animation: 5s swirl linear infinite;
          animation-play-state: running;
          background-image: radial-gradient(circle at 50% -10%, hsl(221 100% 55% / 0.6) 0%, transparent 60%),
            radial-gradient(circle at 25% 40%, hsl(303 71% 64%) 0%, transparent 70%),
            radial-gradient(circle at 80% 10%, hsla(262, 38%, 9%, 0.5) 0%, transparent 80%),
            radial-gradient(circle at 110% 50%, hsla(147, 100%, 77%, 1) 20%, transparent 100%);
          content: '';
          inset: 0;
          opacity: 1;
          position: absolute;
          transition: opacity 0.5s;
        }
        :host([attention-required]) .drawer-indicator::before {
          background-image: radial-gradient(circle at 50% -10%, hsl(0deg 100% 55% / 60%) 0%, transparent 60%),
            radial-gradient(circle at 25% 40%, hsl(0deg 71% 64%) 0%, transparent 70%),
            radial-gradient(circle at 80% 10%, hsl(0deg 38% 9% / 50%) 0%, transparent 80%),
            radial-gradient(circle at 110% 50%, hsl(0deg 100% 77%) 20%, transparent 100%);
        }
        :host([opened]) .drawer-indicator {
          opacity: 0;
          transition-delay: 0s;
        }

        .drawer-indicator svg {
          height: 0.75rem;
          width: 0.75rem;
          z-index: 1;
        }

        :host([position='right']) .drawer-indicator {
          left: 0.25rem;
          top: calc(50% - 0.875rem);
        }

        :host([position='right']) .drawer-indicator svg {
          margin-inline-start: -0.625rem;
          transform: rotate(-90deg);
        }

        :host([position='left']) .drawer-indicator {
          right: 0.25rem;
          top: calc(50% - 0.875rem);
        }

        :host([position='left']) .drawer-indicator svg {
          margin-inline-end: -0.625rem;
          transform: rotate(90deg);
        }

        :host([position='bottom']) .drawer-indicator {
          left: calc(50% - 0.875rem);
          top: 0.25rem;
        }

        :host([position='bottom']) .drawer-indicator svg {
          margin-top: -0.625rem;
        }

        .overflow-indicator {
          align-items: center;
          border-radius: 9999px;
          bottom: -0.875rem;
          box-shadow: inset 0 0 0 1px hsl(0 0% 0% / 0.2);
          color: white;
          display: flex;
          height: 1.75rem;
          justify-content: center;
          left: calc(50% - 0.875rem);
          overflow: hidden;
          opacity: 0;
          position: absolute;
          transition: opacity 0.2s;
          width: 1.75rem;
        }

        .overflow-indicator::after {
          background: hsl(0 0% 0% / 0.5);
          border-radius: 9999px;
          content: '';
          inset: 2px;
          opacity: 1;
          position: absolute;
        }

        .overflow-indicator::before {
          animation: 5s swirl linear infinite;
          animation-play-state: running;
          background-image: radial-gradient(circle at 50% -10%, hsl(221 100% 55% / 0.6) 0%, transparent 60%),
            radial-gradient(circle at 25% 40%, hsl(303 71% 64%) 0%, transparent 70%),
            radial-gradient(circle at 80% 10%, hsla(262, 38%, 9%, 0.5) 0%, transparent 80%),
            radial-gradient(circle at 110% 50%, hsla(147, 100%, 77%, 1) 20%, transparent 100%);
          content: '';
          inset: 0;
          opacity: 1;
          position: absolute;
          transition: opacity 0.5s;
        }

        .overflow-indicator svg {
          height: 0.75rem;
          margin-top: -0.625rem;
          width: 0.75rem;
          z-index: 1;
        }

        :host([position='left']) [canscroll] .overflow-indicator,
        :host([position='right']) [canscroll] .overflow-indicator {
          opacity: 1;
        }

        .resize {
          position: absolute;
          z-index: 10;
          inset: 0;
        }

        :host(:is([position='left'], [position='right'])) .resize {
          width: var(--hover-size);
          cursor: col-resize;
        }

        :host([position='left']) .resize {
          left: auto;
          right: calc(var(--hover-size) * 0.5);
        }

        :host([position='right']) .resize {
          right: auto;
          left: calc(var(--hover-size) * 0.5);
        }

        :host([position='bottom']) .resize {
          height: var(--hover-size);
          bottom: auto;
          top: calc(var(--hover-size) * 0.5);
          cursor: row-resize;
        }

        :host([resizing]) .container {
          /* vaadin-grid (used in the outline) blocks the mouse events */
          pointer-events: none;
        }

        /* Visual indication of the drawer */

        :host::before {
          content: '';
          position: absolute;
          pointer-events: none;
          z-index: -1;
          inset: var(--hover-size);
          transition: opacity var(--transition-duration) var(--closing-delay);
        }

        :host([document-hidden])::before {
          animation: none;
        }

        :host([document-hidden]) .drawer-indicator {
          -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
          filter: grayscale(100%);
        }

        :host(:is([opened], [keepopen]))::before {
          transition-delay: var(--opening-delay);
          opacity: 0;
        }

        .hasmoreContainer {
          height: 100%;
          position: relative;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => se$1.panels,
      () => this.requestUpdate()
    ), this.reaction(
      () => p$1.operationInProgress,
      (t) => {
        t === au.DragAndDrop && !this.opened && !this.keepOpen ? this.style.setProperty("pointer-events", "none") : this.style.setProperty("pointer-events", "auto");
      }
    ), this.reaction(
      () => se$1.getAttentionRequiredPanelConfiguration(),
      () => {
        const t = se$1.getAttentionRequiredPanelConfiguration();
        t && !t.floating && this.toggleAttribute(Wc, t.panel === this.position);
      }
    ), this.reaction(
      () => p$1.active,
      () => {
        if (!p$1.active || !fn.isActivationAnimation() || p$1.activatedFrom === "restore" || p$1.activatedFrom === "test")
          return;
        const t = se$1.getAttentionRequiredPanelConfiguration();
        t && !t.floating && t.panel === this.position || (this.addEventListener("transitionend", this.activationAnimationTransitionEndListener), this.toggleAttribute("no-transition", true), this.opened = true, this.style.setProperty("--closing-delay", "var(--duration-1)"), this.style.setProperty("--initial-position", "calc(-1 * (max(var(--size), var(--min-size)) * 1) / 3)"), requestAnimationFrame(() => {
          this.toggleAttribute("no-transition", false), this.opened = false;
        }));
      }
    ), document.addEventListener("mouseup", this.documentMouseUpListener);
    const e2 = ue$1.getDrawerSize(this.position);
    e2 && this.style.setProperty("--size", `${e2}px`), document.addEventListener("mousemove", this.resizingMouseMoveListener), this.addEventListener("mouseenter", this.mouseEnterListener), w$1.on("document-activation-change", (t) => {
      this.toggleAttribute("document-hidden", !t.detail.active);
    });
  }
  firstUpdated(e2) {
    super.firstUpdated(e2), requestAnimationFrame(() => this.toggleAttribute("no-transition", false)), this.resizeElement.addEventListener("mousedown", (t) => {
      t.button === 0 && (this.resizing = true, p$1.setDrawerResizing(true), this.setAttribute("resizing", ""), w$1.emit("user-select", { allowSelection: false }));
    });
  }
  updated(e2) {
    super.updated(e2), e2.has("opened") && this.opened && this.hasAttribute(Wc) && (this.removeAttribute(Wc), se$1.clearAttention()), this.updateScrollable();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mousemove", this.resizingMouseMoveListener), document.removeEventListener("mouseup", this.documentMouseUpListener), this.removeEventListener("mouseenter", this.mouseEnterListener);
  }
  /**
   * Cleans up attributes/styles etc... for dragging operations
   * @private
   */
  cleanUpDragging() {
    this.draggingSectionPanel && (p$1.setSectionPanelDragging(false), this.draggingSectionPanel.style.zIndex = "", Array.from(this.querySelectorAll("copilot-section-panel-wrapper")).forEach((e2) => {
      e2.style.removeProperty("transform"), e2.removeAttribute(O), e2.removeAttribute(F);
    }), this.draggingSectionPanel.removeAttribute("dragging"), this.draggingSectionPanel = null);
  }
  getAllPanels() {
    return Array.from(this.querySelectorAll("copilot-section-panel-wrapper"));
  }
  /**
   * Closes the drawer and disables mouse enter event for a while.
   */
  forceClose() {
    this.closingForcefully = true, this.opened = false, setTimeout(() => {
      this.closingForcefully = false;
    }, 0.5);
  }
  mouseEnterListener(e2) {
    if (this.closingForcefully || p$1.sectionPanelResizing)
      return;
    document.querySelector("copilot-main").shadowRoot.querySelector("copilot-drawer-panel[opened]") || (this.opened = true);
  }
  render() {
    return ut`
      <div class="hasmoreContainer">
        <div class="container" @scroll=${this.updateScrollable}>
          <slot></slot>
        </div>
        <div class="overflow-indicator">${e$1.chevronDown}</div>
      </div>
      <div class="resize"></div>
      <div class="drawer-indicator">${e$1.chevronUp}</div>
    `;
  }
  updateScrollable() {
    this.hasmoreContainer.toggleAttribute(
      "canscroll",
      this.container.scrollHeight - this.container.scrollTop - this.container.clientHeight > 10
    );
  }
};
k([
  h({ reflect: true, attribute: true })
], P.prototype, "position", 2);
k([
  h({ reflect: true, type: Boolean })
], P.prototype, "opened", 2);
k([
  h({ reflect: true, type: Boolean })
], P.prototype, "keepOpen", 2);
k([
  v(".container")
], P.prototype, "container", 2);
k([
  v(".hasmoreContainer")
], P.prototype, "hasmoreContainer", 2);
k([
  v(".resize")
], P.prototype, "resizeElement", 2);
k([
  Oe({ passive: true })
], P.prototype, "updateScrollable", 1);
P = k([
  hl("copilot-drawer-panel")
], P);
var Te = Object.defineProperty, He = Object.getOwnPropertyDescriptor, ge = (e2, t, o, i) => {
  for (var n = i > 1 ? void 0 : i ? He(t, o) : t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = (i ? r(t, o, n) : r(n)) || n);
  return i && n && Te(t, o, n), n;
};
let Y = class extends dt {
  constructor() {
    super(...arguments), this.checked = false;
  }
  static get styles() {
    return vl`
      .switch {
        display: inline-flex;
        align-items: center;
        gap: var(--space-100);
      }

      .switch input {
        height: 0;
        opacity: 0;
        width: 0;
      }

      .slider {
        background-color: var(--gray-300);
        border-radius: 9999px;
        cursor: pointer;
        inset: 0;
        position: absolute;
        transition: 0.4s;
        height: 0.75rem;
        position: relative;
        width: 1.5rem;
        min-width: 1.5rem;
      }

      .slider:before {
        background-color: white;
        border-radius: 50%;
        bottom: 1px;
        content: '';
        height: 0.625rem;
        left: 1px;
        position: absolute;
        transition: 0.4s;
        width: 0.625rem;
      }

      input:checked + .slider {
        background-color: var(--selection-color);
      }

      input:checked + .slider:before {
        transform: translateX(0.75rem);
      }

      label:has(input:focus) {
        outline: 2px solid var(--selection-color);
        outline-offset: 2px;
      }
    `;
  }
  render() {
    return ut`
      <label class="switch">
        <input
          class="feature-toggle"
          id="feature-toggle-${this.id}"
          type="checkbox"
          ?checked="${this.checked}"
          @change=${(e2) => {
      e2.preventDefault(), this.checked = e2.target.checked, this.dispatchEvent(new CustomEvent("on-change"));
    }} />
        <span class="slider"></span>
        ${this.title}
      </label>
    `;
  }
  //  @change=${(e: InputEvent) => this.toggleFeatureFlag(e, feature)}
};
ge([
  h({ reflect: true, type: Boolean })
], Y.prototype, "checked", 2);
Y = ge([
  hl("copilot-toggle-button")
], Y);
class Be {
  constructor() {
    this.offsetX = 0, this.offsetY = 0;
  }
  draggingStarts(t, o) {
    this.offsetX = o.clientX - t.getBoundingClientRect().left, this.offsetY = o.clientY - t.getBoundingClientRect().top;
  }
  dragging(t, o) {
    const i = o.clientX, n = o.clientY, s = i - this.offsetX, r = i - this.offsetX + t.getBoundingClientRect().width, p = n - this.offsetY, u2 = n - this.offsetY + t.getBoundingClientRect().height;
    return this.adjust(t, s, p, r, u2);
  }
  adjust(t, o, i, n, s) {
    let r, p, u2, v2;
    const w = document.documentElement.getBoundingClientRect().width, J = document.documentElement.getBoundingClientRect().height;
    return (n + o) / 2 < w / 2 ? (t.style.setProperty("--left", `${o}px`), t.style.setProperty("--right", ""), v2 = void 0, r = Math.max(0, o)) : (t.style.removeProperty("--left"), t.style.setProperty("--right", `${w - n}px`), r = void 0, v2 = Math.max(0, w - n)), (i + s) / 2 < J / 2 ? (t.style.setProperty("--top", `${i}px`), t.style.setProperty("--bottom", ""), u2 = void 0, p = Math.max(0, i)) : (t.style.setProperty("--top", ""), t.style.setProperty("--bottom", `${J - s}px`), p = void 0, u2 = Math.max(0, J - s)), {
      left: r,
      right: v2,
      top: p,
      bottom: u2
    };
  }
  anchor(t) {
    const { left: o, top: i, bottom: n, right: s } = t.getBoundingClientRect();
    return this.adjust(t, o, i, s, n);
  }
  anchorLeftTop(t) {
    const { left: o, top: i } = t.getBoundingClientRect();
    return t.style.setProperty("--left", `${o}px`), t.style.setProperty("--right", ""), t.style.setProperty("--top", `${i}px`), t.style.setProperty("--bottom", ""), {
      left: o,
      top: i
    };
  }
}
const x = new Be();
var Ue = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, R = (e2, t, o, i) => {
  for (var n = i > 1 ? void 0 : i ? Ne(t, o) : t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = (i ? r(t, o, n) : r(n)) || n);
  return i && n && Ue(t, o, n), n;
};
const ee = "https://github.com/JetBrains/JetBrainsRuntime/releases";
function Je(e2, t) {
  if (!t)
    return true;
  const [o, i, n] = t.split(".").map((u2) => parseInt(u2)), [s, r, p] = e2.split(".").map((u2) => parseInt(u2));
  if (o < s)
    return true;
  if (o === s) {
    if (i < r)
      return true;
    if (i === r)
      return n < p;
  }
  return false;
}
const te = "Download complete";
let b = class extends Rl {
  constructor() {
    super(), this.javaPluginSectionOpened = false, this.hotswapSectionOpened = false, this.hotswapTab = "hotswapagent", this.downloadStatusMessages = [], this.downloadProgress = 0, this.onDownloadStatusUpdate = this.downloadStatusUpdate.bind(this), this.reaction(
      () => [p$1.jdkInfo, p$1.idePluginState],
      () => {
        p$1.idePluginState && (!p$1.idePluginState.ide || !p$1.idePluginState.active ? this.javaPluginSectionOpened = true : (!(/* @__PURE__ */ new Set(["vscode", "intellij"])).has(p$1.idePluginState.ide) || !p$1.idePluginState.active) && (this.javaPluginSectionOpened = false)), p$1.jdkInfo && Do() !== "success" && (this.hotswapSectionOpened = true);
      },
      { fireImmediately: true }
    );
  }
  connectedCallback() {
    super.connectedCallback(), w$1.on("set-up-vs-code-hotswap-status", this.onDownloadStatusUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), w$1.off("set-up-vs-code-hotswap-status", this.onDownloadStatusUpdate);
  }
  render() {
    var _a2, _b2, _c, _d;
    const e2 = {
      intellij: ((_a2 = p$1.idePluginState) == null ? void 0 : _a2.ide) === "intellij",
      vscode: ((_b2 = p$1.idePluginState) == null ? void 0 : _b2.ide) === "vscode",
      eclipse: ((_c = p$1.idePluginState) == null ? void 0 : _c.ide) === "eclipse",
      idePluginInstalled: !!((_d = p$1.idePluginState) == null ? void 0 : _d.active)
    };
    return ut`
      <div part="container">${this.renderPluginSection(e2)} ${this.renderHotswapSection(e2)}</div>
      <div part="footer">
        <vaadin-button
          id="close"
          @click="${() => se$1.updatePanel(G.tag, { floating: false })}"
          >Close
        </vaadin-button>
      </div>
    `;
  }
  renderPluginSection(e2) {
    let t = "";
    e2.intellij ? t = "IntelliJ" : e2.vscode ? t = "VS Code" : e2.eclipse && (t = "Eclipse");
    let o, i;
    e2.vscode || e2.intellij ? e2.idePluginInstalled ? (o = `Plugin for ${t} installed`, i = this.renderPluginInstalledContent()) : (o = `Plugin for ${t} not installed`, i = this.renderPluginIsNotInstalledContent(e2)) : e2.eclipse ? (o = "Eclipse development workflow is not supported yet", i = this.renderEclipsePluginContent()) : (o = "No IDE found", i = this.renderNoIdePluginContent());
    const n = e2.idePluginInstalled ? e$1.successColorful : e$1.warningColorful;
    return ut`
      <details
        part="panel"
        .open=${this.javaPluginSectionOpened}
        @toggle=${(s) => {
      Bc(() => {
        this.javaPluginSectionOpened = s.target.open;
      });
    }}>
        <summary part="header">
          <span class="icon">${n}</span>
          <div>${o}</div>
        </summary>
        <div part="content">${i}</div>
      </details>
    `;
  }
  renderNoIdePluginContent() {
    return ut`
      <div>
        <div>We could not detect an IDE</div>
        ${this.recommendSupportedPlugin()}
      </div>
    `;
  }
  renderEclipsePluginContent() {
    return ut`
      <div>
        <div>Eclipse workflow environment is not supported yet.</div>
        ${this.recommendSupportedPlugin()}
      </div>
    `;
  }
  recommendSupportedPlugin() {
    return ut`<p>
      Please use <a href="https://code.visualstudio.com">Visual Studio Code</a> or
      <a href="https://www.jetbrains.com/idea">IntelliJ IDEA</a> for better development experience
    </p>`;
  }
  renderPluginInstalledContent() {
    return ut` <p>You have a running plugin. Enjoy your awesome development workflow!</p> `;
  }
  renderPluginIsNotInstalledContent(e2) {
    let t = null, o = "Install from Marketplace";
    return e2.intellij ? (t = Zc, o = "Install from JetBrains Marketplace") : e2.vscode && (t = Gc, o = "Install from VSCode Marketplace"), ut`
      <div>
        <div>Install the Vaadin IDE Plugin to ensure a smooth development workflow</div>
        <p>
          Installing the plugin is not required, but strongly recommended.<br />Some Vaadin Copilot functionality, such
          as undo, will not function optimally without the plugin.
        </p>
        ${t ? ut` <div>
              <vaadin-button
                @click="${() => {
      window.open(t, "_blank");
    }}"
                >${o}
                <vaadin-icon icon="vaadin:external-link"></vaadin-icon>
              </vaadin-button>
            </div>` : O$1}
      </div>
    `;
  }
  renderHotswapSection(e2) {
    const { jdkInfo: t } = p$1;
    if (!t)
      return O$1;
    const o = Do(), i = pu();
    let n, s, r;
    return o === "success" ? (n = e$1.successColorful, r = "Java Hotswap is enabled") : o === "warning" ? (n = e$1.warningColorful, r = "Java Hotswap is not enabled") : o === "error" && (n = e$1.warningColorful, r = "Java Hotswap is partially enabled"), this.hotswapTab === "jrebel" ? t.jrebel ? s = this.renderJRebelInstalledContent() : s = this.renderJRebelNotInstalledContent() : e2.intellij ? s = this.renderHotswapAgentIntelliJPluginContent() : s = this.renderHotswapAgentNotInstalledContent(e2), ut` <details
      part="panel"
      .open=${this.hotswapSectionOpened}
      @toggle=${(p) => {
      Bc(() => {
        this.hotswapSectionOpened = p.target.open;
      });
    }}>
      <summary part="header">
        <span class="icon">${n}</span>
        <div>${r}</div>
      </summary>
      <div part="content">
        ${i !== "none" ? ut`${i === "jrebel" ? this.renderJRebelInstalledContent() : this.renderHotswapAgentInstalledContent()}` : ut`
            <div class="tabs" role="tablist">
              <button
                aria-selected="${this.hotswapTab === "hotswapagent" ? "true" : "false"}"
                class="tab"
                role="tab"
                @click=${() => {
      this.hotswapTab = "hotswapagent";
    }}>
                Hotswap Agent
              </button>
              <button
                aria-selected="${this.hotswapTab === "jrebel" ? "true" : "false"}"
                class="tab"
                role="tab"
                @click=${() => {
      this.hotswapTab = "jrebel";
    }}>
                JRebel
              </button>
            </div>
            <div part="content">${s}</div>
            </div>
            </details>
          `}
      </div>
    </details>`;
  }
  renderJRebelNotInstalledContent() {
    return ut`
      <div>
        <a href="https://www.jrebel.com">JRebel ${e$1.share}</a> is a commercial hotswap solution. Vaadin detects the
        JRebel Agent and automatically reloads the application in the browser after the Java changes have been
        hotpatched.
        <p>
          Go to
          <a href="https://www.jrebel.com/products/jrebel/learn" target="_blank" rel="noopener noreferrer">
            https://www.jrebel.com/products/jrebel/learn ${e$1.share}</a
          >
          to get started
        </p>
      </div>
    `;
  }
  renderHotswapAgentNotInstalledContent(e2) {
    const t = [
      this.renderJavaRunningInDebugModeSection(),
      this.renderHotswapAgentJdkSection(e2),
      this.renderInstallHotswapAgentJdkSection(e2),
      this.renderHotswapAgentVersionSection(),
      this.renderHotswapAgentMissingArgParam(e2)
    ];
    return ut` <div part="hotswap-agent-section-container">${t}</div> `;
  }
  renderHotswapAgentIntelliJPluginContent() {
    const t = Do() === "success";
    return ut`
      <div part="hotswap-agent-section-container">
        <div class="inner-section">
          <details class="inner" .open="${!t}">
            <summary>
              <span class="icon">${t ? e$1.successColorful : e$1.warningColorful}</span>
              <div>Use 'Debug using Hotswap Agent' launch configuration</div>
            </summary>
            <div class="hint">
              Vaadin IntelliJ plugin offers launch mode that does not require any manual configuration!
              <p>
                In order to run recommended launch configuration, you should click three dots right next to Debug button
                and select <code>Debug using Hotswap Agent</code> option.
              </p>
            </div>
          </details>
        </div>
      </div>
    `;
  }
  renderJavaRunningInDebugModeSection() {
    var _a2;
    const e2 = (_a2 = p$1.jdkInfo) == null ? void 0 : _a2.runningInJavaDebugMode;
    return ut`
      <div class="inner-section">
        <details class="inner" .open="${!e2}">
          <summary>
            <span class="icon">${e2 ? e$1.successColorful : e$1.warningColorful}</span>
            <div>Run Java in debug mode</div>
          </summary>
          <div class="hint">Start the application in debug mode in the IDE</div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentMissingArgParam(e2) {
    var _a2, _b2;
    const t = ((_a2 = p$1.jdkInfo) == null ? void 0 : _a2.runningWitHotswap) && ((_b2 = p$1.jdkInfo) == null ? void 0 : _b2.runningWithExtendClassDef);
    return ut`
      <div class="inner-section">
        <details class="inner" .open="${!t}">
          <summary>
            <span class="icon">${t ? e$1.successColorful : e$1.warningColorful}</span>
            <div>Enable HotswapAgent</div>
          </summary>
          <div class="hint">
            <ul>
              ${e2.intellij ? ut`<li>Launch as mentioned in the previous step</li>` : O$1}
              ${e2.intellij ? ut`<li>
                    To manually configure IntelliJ, add the
                    <code>-XX:HotswapAgent=fatjar -XX:+AllowEnhancedClassRedefinition -XX:+UpdateClasses</code> JVM
                    arguments when launching the application
                  </li>` : ut`<li>
                    Add the
                    <code>-XX:HotswapAgent=fatjar -XX:+AllowEnhancedClassRedefinition -XX:+UpdateClasses</code> JVM
                    arguments when launching the application
                  </li>`}
            </ul>
          </div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentJdkSection(e2) {
    var _a2, _b2, _c;
    const t = (_a2 = p$1.jdkInfo) == null ? void 0 : _a2.extendedClassDefCapable, o = ((_b2 = this.downloadStatusMessages) == null ? void 0 : _b2[this.downloadStatusMessages.length - 1]) === te;
    return ut`
      <div class="inner-section">
        <details class="inner" .open="${!t}">
          <summary>
            <span class="icon">${t ? e$1.successColorful : e$1.warningColorful}</span>
            <div>Run using JetBrains Runtime JDK</div>
          </summary>
          <div class="hint">
            JetBrains Runtime provides much better hotswapping compared to other JDKs.
            <ul>
              ${e2.intellij && Je("1.3.0", (_c = p$1.idePluginState) == null ? void 0 : _c.version) ? ut` <li>Upgrade to the latest IntelliJ plugin</li>` : O$1}
              ${e2.intellij ? ut` <li>Launch the application in IntelliJ using "Debug using Hotswap Agent"</li>` : O$1}
              ${e2.vscode ? ut` <li>
                    <a href @click="${(i) => this.downloadJetbrainsRuntime(i)}"
                      >Let Copilot download and set up JetBrains Runtime for VS Code</a
                    >
                    ${this.downloadProgress > 0 ? ut`<vaadin-progress-bar
                          .value="${this.downloadProgress}"
                          min="0"
                          max="1"></vaadin-progress-bar>` : O$1}
                    <ul>
                      ${this.downloadStatusMessages.map((i) => ut`<li>${i}</li>`)}
                      ${o ? ut`<h3>Go to VS Code and launch the 'Debug using Hotswap Agent' configuration</h3>` : O$1}
                    </ul>
                  </li>` : O$1}
              <li>
                ${e2.intellij || e2.vscode ? ut`If there is a problem, you can manually
                      <a target="_blank" href="${ee}">download JetBrains Runtime JDK</a> and set up
                      your debug configuration to use it.` : ut`<a target="_blank" href="${ee}">Download JetBrains Runtime JDK</a> and set up
                      your debug configuration to use it.`}
              </li>
            </ul>
          </div>
        </details>
      </div>
    `;
  }
  renderInstallHotswapAgentJdkSection(e2) {
    var _a2, _b2;
    const t = (_a2 = p$1.jdkInfo) == null ? void 0 : _a2.hotswapAgentFound, o = (_b2 = p$1.jdkInfo) == null ? void 0 : _b2.extendedClassDefCapable;
    return ut`
      <div class="inner-section">
        <details class="inner" .open="${!t}">
          <summary>
            <span class="icon">${t ? e$1.successColorful : e$1.warningColorful}</span>
            <div>Install HotswapAgent</div>
          </summary>
          <div class="hint">
            Hotswap Agent provides application level support for hot reloading, such as reinitalizing Vaadin @Route or
            @BrowserCallable classes when they are updated
            <ul>
              ${e2.intellij ? ut`<li>Launch as mentioned in the previous step</li>` : O$1}
              ${!e2.intellij && !o ? ut`<li>First install JetBrains Runtime as mentioned in the step above.</li>` : O$1}
              ${e2.intellij ? ut`<li>
                    To manually configure IntelliJ, download HotswapAgent and install the jar file as
                    <code>[JAVA_HOME]/lib/hotswap/hotswap-agent.jar</code> in the JetBrains Runtime JDK. Note that the
                    file must be renamed to exactly match this path.
                  </li>` : ut`<li>
                    Download HotswapAgent and install the jar file as
                    <code>[JAVA_HOME]/lib/hotswap/hotswap-agent.jar</code> in the JetBrains Runtime JDK. Note that the
                    file must be renamed to exactly match this path.
                  </li>`}
            </ul>
          </div>
        </details>
      </div>
    `;
  }
  renderHotswapAgentVersionSection() {
    var _a2, _b2, _c, _d;
    if (!((_a2 = p$1.jdkInfo) == null ? void 0 : _a2.hotswapAgentFound))
      return O$1;
    const e2 = (_b2 = p$1.jdkInfo) == null ? void 0 : _b2.hotswapVersionOk, t = (_c = p$1.jdkInfo) == null ? void 0 : _c.hotswapVersion, o = (_d = p$1.jdkInfo) == null ? void 0 : _d.hotswapAgentLocation;
    return ut`
      <div class="inner-section">
        <details class="inner" .open="${!e2}">
          <summary>
            <span class="icon">${e2 ? e$1.successColorful : e$1.warningColorful}</span>
            <div>Hotswap version requires update</div>
          </summary>
          <div class="hint">
            HotswapAgent version ${t} is in use
            <a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
              >Download the latest HotswapAgent</a
            >
            and place it in <code>${o}</code>
          </div>
        </details>
      </div>
    `;
  }
  renderJRebelInstalledContent() {
    return ut` <div>JRebel is in use. Enjoy your awesome development workflow!</div> `;
  }
  renderHotswapAgentInstalledContent() {
    return ut` <div>Hotswap agent is in use. Enjoy your awesome development workflow!</div> `;
  }
  async downloadJetbrainsRuntime(e2) {
    return e2.target.disabled = true, e2.preventDefault(), this.downloadStatusMessages = [], qn(`${De}set-up-vs-code-hotswap`, {}, (t) => {
      t.data.error ? (ve("Error downloading JetBrains runtime", t.data.error), this.downloadStatusMessages = [...this.downloadStatusMessages, "Download failed"]) : this.downloadStatusMessages = [...this.downloadStatusMessages, te];
    });
  }
  downloadStatusUpdate(e2) {
    const t = e2.detail.progress;
    t ? this.downloadProgress = t : this.downloadStatusMessages = [...this.downloadStatusMessages, e2.detail.message];
  }
};
b.NAME = "copilot-development-setup-user-guide";
b.styles = vl`
    :host {
      --icon-size: 24px;
      --summary-header-gap: 10px;
      --footer-height: calc(50px + var(--space-150));
      color: var(--color);
    }
    :host code {
      background-color: var(--gray-50);
      font-size: var(--font-size-0);
      display: inline-block;
      margin-top: var(--space-100);
      margin-bottom: var(--space-100);
      user-select: all;
    }

    [part='container'] {
      display: flex;
      flex-direction: column;
      gap: var(--space-150);
      padding: var(--space-150);
      box-sizing: border-box;
      height: calc(100% - var(--footer-height));
      overflow: auto;
    }

    [part='footer'] {
      display: flex;
      justify-content: flex-end;
      height: var(--footer-height);
      padding-left: var(--space-150);
      padding-right: var(--space-150);
    }
    [part='hotswap-agent-section-container'] {
      display: flex;
      flex-direction: column;
      gap: var(--space-100);
    }
    [part='content'] {
      display: flex;
      padding: var(--space-150);
      flex-direction: column;
    }
    div.inner-section div.hint {
      margin-left: calc(var(--summary-header-gap) + var(--icon-size));
      margin-top: var(--space-75);
    }
    details {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      & > summary span.icon {
        width: var(--icon-size);
        height: var(--icon-size);
      }
      & > summary,
      summary::part(header) {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        position: relative;
        gap: var(--summary-header-gap);
        font: var(--font);
      }
      summary::after,
      summary::part(header)::after {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        border-color: var(--color);
        opacity: var(--panel-toggle-opacity, 0.2);
        border-width: 2px;
        border-style: solid solid none none;
        transform: rotate(var(--panel-toggle-angle, -45deg));
        position: absolute;
        right: 15px;
        top: calc(50% - var(--panel-toggle-offset, 2px));
      }
      &:not([open]) {
        --panel-toggle-angle: 135deg;
        --panel-toggle-offset: 4px;
      }
    }
    details[part='panel'] {
      background: var(--card-bg);
      border: var(--card-border);
      border-radius: 4px;
      user-select: none;

      &:has(summary:hover) {
        border-color: var(--accent-color);
      }

      & > summary,
      summary::part(header) {
        padding: 10px 10px;
        padding-right: 25px;
      }

      summary:hover,
      summary::part(header):hover {
        --panel-toggle-opacity: 0.5;
      }

      input[type='checkbox'],
      summary::part(checkbox) {
        margin: 0;
      }

      &:not([open]):hover {
        background: var(--card-hover-bg);
      }

      &[open] {
        background: var(--card-open-bg);
        box-shadow: var(--card-open-shadow);

        & > summary {
          font-weight: bold;
        }
      }
      .tabs {
        border-bottom: 1px solid var(--border-color);
        box-sizing: border-box;
        display: flex;
        height: 2.25rem;
      }

      .tab {
        background: none;
        border: none;
        border-bottom: 1px solid transparent;
        color: var(--color);
        font: var(--font-button);
        height: 2.25rem;
        padding: 0 0.75rem;
      }

      .tab[aria-selected='true'] {
        color: var(--color-high-contrast);
        border-bottom-color: var(--color-high-contrast);
      }

      .tab-content {
        flex: 1 1 auto;
        gap: var(--space-150);
        overflow: auto;
        padding: var(--space-150);
      }
    }
  `;
R([
  g()
], b.prototype, "javaPluginSectionOpened", 2);
R([
  g()
], b.prototype, "hotswapSectionOpened", 2);
R([
  g()
], b.prototype, "hotswapTab", 2);
R([
  g()
], b.prototype, "downloadStatusMessages", 2);
R([
  g()
], b.prototype, "downloadProgress", 2);
b = R([
  hl(b.NAME)
], b);
const G = ou({
  header: "Development Workflow",
  tag: Tc,
  width: 800,
  height: 800,
  floatingPosition: {
    top: 50,
    left: 50
  },
  individual: true
}), Ve = {
  init(e2) {
    e2.addPanel(G);
  }
};
window.Vaadin.copilot.plugins.push(Ve);
se$1.addPanel(G);
var Xe = (e2, t, o, i) => {
  for (var n = t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = r(n) || n);
  return n;
};
let ie = class extends Rl {
  constructor() {
    super(...arguments), this.clickListener = vu;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("custom-menu-item"), this.addEventListener("click", this.clickListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.clickListener);
  }
  render() {
    const e2 = gu(), t = e2.status === "warning" || e2.status === "error";
    return ut`
      <div style="flex-grow: 1;">
        <div class="label">Development workflow</div>
        <div class="status ${t ? e2.status : ""}">${e2.message}</div>
      </div>
      ${t ? ut`<div class="${e2.status} icon"></div>` : O$1}
    `;
  }
};
ie = Xe([
  hl("copilot-activation-button-development-workflow")
], ie);
var Ge = (e2, t, o, i) => {
  for (var n = t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = r(n) || n);
  return n;
};
let ne = class extends Rl {
  constructor() {
    super(), this.clickListener = this.getClickListener(), this.reaction(
      () => p$1.userInfo,
      () => {
        this.requestUpdate();
      }
    );
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("custom-menu-item"), this.addEventListener("click", this.clickListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.clickListener);
  }
  render() {
    const e2 = this.getStatus();
    return ut`
      <div style="flex-grow: 1;">
        <div class="label user">${this.getUsername()}</div>
        ${e2 ? ut`<div class="warning status">${e2}</div>` : O$1}
      </div>
      ${this.renderPortrait()} ${this.renderDot()}
    `;
  }
  getClickListener() {
    var _a2;
    return ((_a2 = p$1.userInfo) == null ? void 0 : _a2.validLicense) ? () => window.open("https://vaadin.com/myaccount", "_blank", "noopener") : () => p$1.setLoginCheckActive(true);
  }
  getUsername() {
    var _a2;
    return ((_a2 = p$1.userInfo) == null ? void 0 : _a2.firstName) ? `${p$1.userInfo.firstName} ${p$1.userInfo.lastName}` : "Log in";
  }
  getStatus() {
    var _a2, _b2, _c;
    if (!((_a2 = p$1.userInfo) == null ? void 0 : _a2.validLicense)) {
      if (Eo.active) {
        const e2 = Math.round(Eo.remainingTimeInMillis / 864e5);
        return `Preview expires in ${e2}${e2 === 1 ? " day" : " days"}`;
      }
      if (Eo.expired && !((_b2 = p$1.userInfo) == null ? void 0 : _b2.validLicense))
        return "Preview expired";
      if (!Eo.active && !Eo.expired && !((_c = p$1.userInfo) == null ? void 0 : _c.validLicense))
        return "No valid license available";
    }
  }
  renderPortrait() {
    var _a2;
    return ((_a2 = p$1.userInfo) == null ? void 0 : _a2.portraitUrl) ? ut`<div
        class="portrait"
        style="background-image: url('https://vaadin.com${p$1.userInfo.portraitUrl}')"></div>` : O$1;
  }
  renderDot() {
    var _a2;
    return ((_a2 = p$1.userInfo) == null ? void 0 : _a2.validLicense) ? O$1 : Eo.active || Eo.expired ? ut`<div class="icon warning"></div>` : O$1;
  }
};
ne = Ge([
  hl("copilot-activation-button-user-info")
], ne);
function y(e2) {
  return ue("vaadin-menu-bar-item", e2);
}
function q(e2) {
  return ue("vaadin-context-menu-item", e2);
}
function ue(e2, t) {
  const o = document.createElement(e2);
  if (t.style && (o.className = t.style), t.icon)
    if (typeof t.icon == "string") {
      const i = document.createElement("vaadin-icon");
      i.setAttribute("icon", t.icon), o.append(i);
    } else
      o.append(Ke(t.icon.strings[0]));
  if (t.label) {
    const i = document.createElement("span");
    i.className = "label", i.innerHTML = t.label, o.append(i);
  }
  if (t.hint) {
    const i = document.createElement("span");
    i.className = "hint", i.innerHTML = t.hint, o.append(i);
  }
  return o;
}
function Ke(e2) {
  if (!e2) return null;
  const t = document.createElement("template");
  t.innerHTML = e2;
  const o = t.content.children;
  return o.length === 1 ? o[0] : o;
}
var Ze = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, N = (e2, t, o, i) => {
  for (var n = i > 1 ? void 0 : i ? Qe(t, o) : t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = (i ? r(t, o, n) : r(n)) || n);
  return i && n && Ze(t, o, n), n;
};
const et = 8;
let _ = class extends Rl {
  constructor() {
    super(...arguments), this.initialMouseDownPosition = null, this.dragging = false, this.items = [], this.mouseDownListener = (e2) => {
      this.initialMouseDownPosition = { x: e2.clientX, y: e2.clientY }, x.draggingStarts(this, e2), document.addEventListener("mousemove", this.documentDraggingMouseMoveEventListener);
    }, this.documentDraggingMouseMoveEventListener = (e2) => {
      if (this.initialMouseDownPosition && !this.dragging) {
        const { clientX: t, clientY: o } = e2;
        this.dragging = Math.abs(t - this.initialMouseDownPosition.x) + Math.abs(o - this.initialMouseDownPosition.y) > et;
      }
      this.dragging && (this.setOverlayVisibility(false), x.dragging(this, e2));
    }, this.documentMouseUpListener = (e2) => {
      if (this.initialMouseDownPosition = null, document.removeEventListener("mousemove", this.documentDraggingMouseMoveEventListener), this.dragging) {
        const t = x.dragging(this, e2);
        fn.setActivationButtonPosition(t), this.setOverlayVisibility(true);
      } else
        this.setMenuBarOnClick();
      this.dragging = false;
    }, this.closeMenuMouseMoveListener = (e2) => {
      e2.composedPath().some((i) => {
        if (i instanceof HTMLElement) {
          const n = i;
          if (n.localName === this.localName || n.localName === "vaadin-menu-bar-overlay" && n.classList.contains("activation-button-menu"))
            return true;
        }
        return this.checkPointerIsInRangeInSurroundingRectangle(e2);
      }) || this.closeMenu();
    }, this.checkPointerIsInRangeInSurroundingRectangle = (e2) => {
      var _a2, _b2;
      const o = (_b2 = (_a2 = document.querySelector("copilot-main")) == null ? void 0 : _a2.shadowRoot) == null ? void 0 : _b2.querySelector("vaadin-menu-bar-overlay.activation-button-menu"), i = this.menubar;
      if (!o)
        return false;
      const n = o.querySelector("vaadin-menu-bar-list-box");
      if (!n)
        return false;
      const s = n.getBoundingClientRect(), r = i.getBoundingClientRect(), p = Math.min(s.x, r.x), u2 = Math.min(s.y, r.y), v2 = Math.max(s.width, r.width), w = s.height + r.height;
      return Qc(new DOMRect(p, u2, v2, w), e2.clientX, e2.clientY);
    }, this.dispatchSpotlightActivationEvent = (e2) => {
      this.dispatchEvent(
        new CustomEvent("spotlight-activation-changed", {
          detail: e2
        })
      );
    }, this.activationBtnClicked = (e2) => {
      if (p$1.active && this.handleAttentionRequiredOnClick()) {
        e2 == null ? void 0 : e2.stopPropagation(), e2 == null ? void 0 : e2.preventDefault();
        return;
      }
      e2 == null ? void 0 : e2.stopPropagation(), this.dispatchEvent(new CustomEvent("activation-btn-clicked"));
    }, this.handleAttentionRequiredOnClick = () => {
      const e2 = se$1.getAttentionRequiredPanelConfiguration();
      return e2 ? e2.panel && !e2.floating ? (w$1.emit("open-attention-required-drawer", null), true) : (se$1.clearAttention(), true) : false;
    }, this.closeMenu = () => {
      this.menubar._close(), document.removeEventListener("mousemove", this.closeMenuMouseMoveListener);
    }, this.setMenuBarOnClick = () => {
      const e2 = this.shadowRoot.querySelector("vaadin-menu-bar-button");
      e2 && (e2.onclick = this.activationBtnClicked);
    };
  }
  static get styles() {
    return [
      te$1(mc),
      vl`
        :host {
          --space: 8px;
          --height: 28px;
          --width: 28px;
          position: absolute;
          top: clamp(var(--space), var(--top), calc(100vh - var(--height) - var(--space)));
          left: clamp(var(--space), var(--left), calc(100vw - var(--width) - var(--space)));
          bottom: clamp(var(--space), var(--bottom), calc(100vh - var(--height) - var(--space)));
          right: clamp(var(--space), var(--right), calc(100vw - var(--width) - var(--space)));
          user-select: none;
          -ms-user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          --indicator-color: var(--red);
          /* Don't add a z-index or anything else that creates a stacking context */
        }

        :host .menu-button {
          min-width: unset;
        }

        :host([document-hidden]) {
          -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
          filter: grayscale(100%);
        }

        .menu-button::part(container) {
          overflow: visible;
        }

        .menu-button vaadin-menu-bar-button {
          all: initial;
          display: block;
          position: relative;
          z-index: var(--z-index-activation-button);
          width: var(--width);
          height: var(--height);
          overflow: hidden;
          color: transparent;
          background: hsl(0 0% 0% / 0.25);
          border-radius: 8px;
          box-shadow: 0 0 0 1px hsl(0 0% 100% / 0.1);
          cursor: default;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          transition:
            box-shadow 0.2s,
            background-color 0.2s;
        }

        /* visual effect when active */

        .menu-button vaadin-menu-bar-button::before {
          all: initial;
          content: '';
          background-image: radial-gradient(circle at 50% -10%, hsl(221 100% 55% / 0.6) 0%, transparent 60%),
            radial-gradient(circle at 25% 40%, hsl(303 71% 64%) 0%, transparent 70%),
            radial-gradient(circle at 80% 10%, hsla(262, 38%, 9%, 0.5) 0%, transparent 80%),
            radial-gradient(circle at 110% 50%, hsla(147, 100%, 77%, 1) 20%, transparent 100%);
          animation: 5s swirl linear infinite;
          animation-play-state: paused;
          inset: -6px;
          opacity: 0;
          position: absolute;
          transition: opacity 0.5s;
        }

        /* vaadin symbol */

        .menu-button vaadin-menu-bar-button::after {
          all: initial;
          content: '';
          position: absolute;
          inset: 1px;
          background: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7407 9.70401C12.7407 9.74417 12.7378 9.77811 12.7335 9.81479C12.7111 10.207 12.3897 10.5195 11.9955 10.5195C11.6014 10.5195 11.2801 10.209 11.2577 9.8169C11.2534 9.7801 11.2504 9.74417 11.2504 9.70401C11.2504 9.31225 11.1572 8.90867 10.2102 8.90867H7.04307C5.61481 8.90867 5 8.22698 5 6.86345V5.70358C5 5.31505 5.29521 5 5.68008 5C6.06495 5 6.35683 5.31505 6.35683 5.70358V6.09547C6.35683 6.53423 6.655 6.85413 7.307 6.85413H10.4119C11.8248 6.85413 11.9334 7.91255 11.98 8.4729H12.0111C12.0577 7.91255 12.1663 6.85413 13.5791 6.85413H16.6841C17.3361 6.85413 17.614 6.54529 17.614 6.10641L17.6158 5.70358C17.6158 5.31505 17.9246 5 18.3095 5C18.6943 5 19 5.31505 19 5.70358V6.86345C19 8.22698 18.3763 8.90867 16.9481 8.90867H13.7809C12.8338 8.90867 12.7407 9.31225 12.7407 9.70401Z" fill="white"/><path d="M12.7536 17.7785C12.6267 18.0629 12.3469 18.2608 12.0211 18.2608C11.6907 18.2608 11.4072 18.0575 11.2831 17.7668C11.2817 17.7643 11.2803 17.7619 11.279 17.7595C11.2761 17.7544 11.2732 17.7495 11.2704 17.744L8.45986 12.4362C8.3821 12.2973 8.34106 12.1399 8.34106 11.9807C8.34106 11.4732 8.74546 11.0603 9.24238 11.0603C9.64162 11.0603 9.91294 11.2597 10.0985 11.6922L12.0216 15.3527L13.9468 11.6878C14.1301 11.2597 14.4014 11.0603 14.8008 11.0603C15.2978 11.0603 15.7021 11.4732 15.7021 11.9807C15.7021 12.1399 15.6611 12.2973 15.5826 12.4374L12.7724 17.7446C12.7683 17.7524 12.7642 17.7597 12.7601 17.767C12.7579 17.7708 12.7557 17.7746 12.7536 17.7785Z" fill="white"/></svg>');
          background-size: 100%;
        }

        .menu-button vaadin-menu-bar-button[focus-ring] {
          outline: 2px solid var(--selection-color);
          outline-offset: 2px;
        }

        .menu-button vaadin-menu-bar-button:hover {
          background: hsl(0 0% 0% / 0.8);
          box-shadow:
            0 0 0 1px hsl(0 0% 100% / 0.1),
            0 2px 8px -1px hsl(0 0% 0% / 0.3);
        }

        :host([active]) .menu-button vaadin-menu-bar-button {
          background-color: transparent;
          box-shadow:
            inset 0 0 0 1px hsl(0 0% 0% / 0.2),
            0 2px 8px -1px hsl(0 0% 0% / 0.3);
        }

        :host([active]) .menu-button vaadin-menu-bar-button::before {
          opacity: 1;
          animation-play-state: running;
        }

        :host([attention-required]) {
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        [part='indicator'] {
          top: -6px;
          right: -6px;
          width: 12px;
          height: 12px;
          box-sizing: border-box;
          border-radius: 100%;
          position: absolute;
          display: var(--indicator-display, none);
          background: var(--indicator-color);
          z-index: calc(var(--z-index-activation-button) + 1);
          border: 2px solid var(--indicator-border);
        }

        :host([indicator='warning']) {
          --indicator-display: block;
          --indicator-color: var(--yellow);
        }

        :host([indicator='error']) {
          --indicator-display: block;
          --indicator-color: var(--red);
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.reaction(
      () => se$1.attentionRequiredPanelTag,
      () => {
        this.toggleAttribute(Wc, se$1.attentionRequiredPanelTag !== null), this.updateIndicator();
      }
    ), this.reaction(
      () => p$1.active,
      () => {
        this.toggleAttribute("active", p$1.active);
      },
      { fireImmediately: true }
    ), this.addEventListener("mousedown", this.mouseDownListener), document.addEventListener("mouseup", this.documentMouseUpListener);
    const e2 = fn.getActivationButtonPosition();
    e2 ? (this.style.setProperty("--left", `${e2.left}px`), this.style.setProperty("--bottom", `${e2.bottom}px`), this.style.setProperty("--right", `${e2.right}px`), this.style.setProperty("--top", `${e2.top}px`)) : (this.style.setProperty("--bottom", "var(--space)"), this.style.setProperty("--right", "var(--space)")), w$1.on("document-activation-change", (t) => {
      this.toggleAttribute("document-hidden", !t.detail.active);
    }), this.reaction(
      () => [p$1.jdkInfo, p$1.idePluginState],
      () => {
        this.updateIndicator();
      }
    ), this.reaction(
      () => [p$1.active, p$1.idePluginState, fn.isActivationAnimation()],
      () => {
        this.generateItems();
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mousedown", this.mouseDownListener), document.removeEventListener("mouseup", this.documentMouseUpListener);
  }
  updateIndicator() {
    if (this.hasAttribute(Wc)) {
      this.setAttribute("indicator", "error");
      return;
    }
    const e2 = gu();
    e2.status !== "success" ? this.setAttribute("indicator", e2.status) : this.removeAttribute("indicator");
  }
  /**
   * To hide overlay while dragging
   * @param visible
   */
  setOverlayVisibility(e2) {
    const t = this.shadowRoot.querySelector("vaadin-menu-bar-button").__overlay;
    e2 ? (t == null ? void 0 : t.style.setProperty("display", "flex"), t == null ? void 0 : t.style.setProperty("visibility", "visible")) : (t == null ? void 0 : t.style.setProperty("display", "none"), t == null ? void 0 : t.style.setProperty("visibility", "invisible"));
  }
  generateItems() {
    var _a2, _b2, _c;
    const e2 = p$1.active, t = e2 && ((_a2 = p$1.userInfo) == null ? void 0 : _a2.copilotProjectCannotLeaveLocalhost) !== true, o = e2 && !!((_c = (_b2 = p$1.idePluginState) == null ? void 0 : _b2.supportedActions) == null ? void 0 : _c.find((n) => n === "undo")), i = [
      {
        text: "Vaadin Copilot",
        children: [
          { visible: e2, component: "copilot-activation-button-user-info" },
          { visible: e2, component: "hr" },
          { component: "copilot-activation-button-development-workflow" },
          {
            component: "hr",
            visible: e2
          },
          {
            visible: o,
            component: y({
              label: "Undo",
              hint: lu.undo
            }),
            action: () => {
              w$1.emit("undoRedo", { undo: true });
            }
          },
          {
            visible: o,
            component: y({
              label: "Redo",
              hint: lu.redo
            }),
            action: () => {
              w$1.emit("undoRedo", { undo: false });
            }
          },
          {
            visible: t,
            component: y({
              label: "Toggle Command Window",
              hint: lu.toggleCommandWindow,
              style: "toggle-spotlight"
            }),
            action: () => {
              p$1.setSpotlightActive(!p$1.spotlightActive);
            }
          },
          {
            component: "hr",
            visible: e2
          },
          {
            visible: e2,
            text: "Settings",
            children: [
              {
                component: y({
                  label: "Activation shortcut enabled",
                  hint: fn.isActivationShortcut() ? "✓" : void 0
                }),
                action: () => {
                  fn.setActivationShortcut(!fn.isActivationShortcut());
                }
              },
              {
                component: y({
                  label: "Show animation when activating",
                  hint: fn.isActivationAnimation() ? "✓" : void 0
                }),
                action: () => {
                  fn.setActivationAnimation(!fn.isActivationAnimation());
                }
              },
              { component: "hr" },
              {
                visible: e2,
                component: y({
                  label: "Show welcome message"
                }),
                action: () => {
                  p$1.setWelcomeActive(true), p$1.setSpotlightActive(true);
                }
              },
              {
                visible: e2,
                component: y({
                  label: "Show keyboard shortcuts"
                }),
                action: () => {
                  se$1.updatePanel("copilot-shortcuts-panel", {
                    floating: true
                  });
                }
              }
            ]
          },
          { component: "hr" },
          {
            visible: e2,
            component: y({
              label: "Tell us what you think"
              // Label used also in ScreenshotsIT.java
            }),
            action: () => {
              se$1.updatePanel("copilot-feedback-panel", {
                floating: true
              });
            }
          },
          {
            component: y({
              label: '<span class="deactivate">Deactivate</span><span class="activate">Activate</span> Copilot',
              hint: fn.isActivationShortcut() ? lu.toggleCopilot : void 0
            }),
            action: () => {
              this.activationBtnClicked();
            }
          }
        ]
      }
    ];
    this.items = i.filter(tl);
  }
  render() {
    return ut`
      <vaadin-menu-bar
        class="menu-button"
        .items="${this.items}"
        @item-selected="${(e2) => {
      this.handleMenuItemClick(e2.detail.value);
    }}"
        ?open-on-hover=${!this.dragging}
        @mouseenter="${() => {
      document.addEventListener("mousemove", this.closeMenuMouseMoveListener);
    }}"
        overlay-class="activation-button-menu">
      </vaadin-menu-bar>
      <div part="indicator"></div>
    `;
  }
  handleMenuItemClick(e2) {
    if (this.closeMenu(), e2.onClick) {
      e2.onClick();
      return;
    }
    e2.action();
  }
  firstUpdated() {
    this.setMenuBarOnClick(), u(this.shadowRoot);
  }
};
N([
  v("vaadin-menu-bar")
], _.prototype, "menubar", 2);
N([
  g()
], _.prototype, "dragging", 2);
N([
  g()
], _.prototype, "items", 2);
_ = N([
  hl("copilot-activation-button")
], _);
var tt = Object.defineProperty, it = Object.getOwnPropertyDescriptor, E = (e2, t, o, i) => {
  for (var n = i > 1 ? void 0 : i ? it(t, o) : t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = (i ? r(t, o, n) : r(n)) || n);
  return i && n && tt(t, o, n), n;
};
const f = "resize-dir", X = "floating-resizing-active";
let A = class extends Rl {
  constructor() {
    super(...arguments), this.panelTag = "", this.dockingItems = [
      {
        component: q({
          icon: e$1.dockRight,
          label: "Dock right"
        }),
        panel: "right"
      },
      {
        component: q({
          icon: e$1.dockLeft,
          label: "Dock left"
        }),
        panel: "left"
      },
      {
        component: q({
          icon: e$1.dockBottom,
          label: "Dock bottom"
        }),
        panel: "bottom"
      }
    ], this.floatingResizingStarted = false, this.resizingInDrawerStarted = false, this.toggling = false, this.rectangleBeforeResizing = null, this.floatingResizeHandlerMouseMoveListener = (e2) => {
      var _a2, _b2;
      if (!((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || this.floatingResizingStarted || !((_b2 = this.panelInfo) == null ? void 0 : _b2.expanded))
        return;
      const t = this.getBoundingClientRect(), o = Math.abs(e2.clientX - t.x), i = Math.abs(t.x + t.width - e2.clientX), n = Math.abs(e2.clientY - t.y), s = Math.abs(t.y + t.height - e2.clientY), r = Number.parseInt(
        window.getComputedStyle(this).getPropertyValue("--floating-offset-resize-threshold"),
        10
      );
      let p = "";
      o < r ? n < r ? (p = "nw-resize", this.setAttribute(f, "top left")) : s < r ? (p = "sw-resize", this.setAttribute(f, "bottom left")) : (p = "col-resize", this.setAttribute(f, "left")) : i < r ? n < r ? (p = "ne-resize", this.setAttribute(f, "top right")) : s < r ? (p = "se-resize", this.setAttribute(f, "bottom right")) : (p = "col-resize", this.setAttribute(f, "right")) : s < r ? (p = "row-resize", this.setAttribute(f, "bottom")) : n < r && (p = "row-resize", this.setAttribute(f, "top")), p !== "" ? (this.rectangleBeforeResizing = this.getBoundingClientRect(), this.style.setProperty("--resize-cursor", p)) : (this.style.removeProperty("--resize-cursor"), this.removeAttribute(f)), this.toggleAttribute(X, p !== "");
    }, this.floatingResizingMouseDownListener = (e2) => {
      if (!this.hasAttribute(X) || e2.button !== 0)
        return;
      e2.stopPropagation(), e2.preventDefault(), x.anchorLeftTop(this), this.floatingResizingStarted = true, this.toggleAttribute("resizing", true);
      const t = this.getResizeDirections(), { clientX: o, clientY: i } = e2;
      (t.includes("top") || t.includes("bottom")) && this.style.setProperty("--section-height", null), t.forEach((n) => this.setResizePosition(n, o, i)), p$1.setSectionPanelResizing(true);
    }, this.floatingResizingMouseLeaveListener = () => {
      var _a2;
      ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && (this.floatingResizingStarted || (this.removeAttribute("resizing"), this.removeAttribute(X), this.removeAttribute("dragging"), this.style.removeProperty("--resize-cursor"), this.removeAttribute(f)));
    }, this.floatingResizingMouseMoveListener = (e2) => {
      var _a2;
      if (!((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || !this.floatingResizingStarted)
        return;
      e2.stopPropagation(), e2.preventDefault();
      const t = this.getResizeDirections(), { clientX: o, clientY: i } = e2;
      t.forEach((n) => this.setResizePosition(n, o, i));
    }, this.setFloatingResizeDirectionProps = (e2, t, o, i) => {
      o && o > Number.parseFloat(window.getComputedStyle(this).getPropertyValue("--min-width")) && (this.style.setProperty(`--${e2}`, `${t}px`), this.style.setProperty("width", `${o}px`));
      const n = window.getComputedStyle(this), s = Number.parseFloat(n.getPropertyValue("--header-height")), r = Number.parseFloat(n.getPropertyValue("--floating-offset-resize-threshold")) / 2;
      i && i > s + r && (this.style.setProperty(`--${e2}`, `${t}px`), this.style.setProperty("height", `${i}px`), this.container.style.setProperty("margin-top", "calc(var(--floating-offset-resize-threshold) / 4)"), this.container.style.height = `calc(${i}px - var(--floating-offset-resize-threshold) / 2)`);
    }, this.floatingResizingMouseUpListener = (e2) => {
      var _a2;
      if (!this.floatingResizingStarted || !((_a2 = this.panelInfo) == null ? void 0 : _a2.floating))
        return;
      e2.stopPropagation(), e2.preventDefault(), this.floatingResizingStarted = false, p$1.setSectionPanelResizing(false);
      const { width: t, height: o } = this.getBoundingClientRect(), { left: i, top: n, bottom: s, right: r } = x.anchor(this), p = window.getComputedStyle(this.container), u2 = Number.parseInt(p.borderTopWidth, 10), v2 = Number.parseInt(p.borderBottomWidth, 10);
      se$1.updatePanel(this.panelInfo.tag, {
        width: t,
        height: o - (u2 + v2),
        floatingPosition: {
          ...this.panelInfo.floatingPosition,
          left: i,
          top: n,
          bottom: s,
          right: r
        }
      }), this.style.removeProperty("width"), this.style.removeProperty("height"), this.container.style.removeProperty("height"), this.container.style.removeProperty("margin-top"), this.setCssSizePositionProperties(), this.toggleAttribute("dragging", false);
    }, this.transitionEndEventListener = () => {
      this.toggling && (this.toggling = false, x.anchor(this));
    }, this.resizeInDrawerMouseDownListener = (e2) => {
      e2.button === 0 && (this.resizingInDrawerStarted = true, this.setAttribute("resizing", ""), w$1.emit("user-select", { allowSelection: false }));
    }, this.resizeInDrawerMouseMoveListener = (e2) => {
      if (!this.resizingInDrawerStarted)
        return;
      const { y: t } = e2;
      e2.stopPropagation(), e2.preventDefault();
      const o = t - this.getBoundingClientRect().top;
      this.style.setProperty("--section-height", `${o}px`), se$1.updatePanel(this.panelInfo.tag, {
        height: o
      });
    }, this.resizeInDrawerMouseUpListener = () => {
      var _a2;
      this.resizingInDrawerStarted && (((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || (this.resizingInDrawerStarted = false, this.removeAttribute("resizing"), w$1.emit("user-select", { allowSelection: true }), this.style.setProperty("--section-height", `${this.getBoundingClientRect().height}px`)));
    }, this.sectionPanelMouseEnterListener = () => {
      this.hasAttribute(Wc) && (this.removeAttribute(Wc), se$1.clearAttention());
    }, this.contentAreaMouseDownListener = () => {
      se$1.bringToFront(this.panelInfo.tag);
    }, this.documentMouseUpEventListener = () => {
      var _a2;
      document.removeEventListener("mousemove", this.draggingEventListener), ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && (this.toggleAttribute("dragging", false), p$1.setSectionPanelDragging(false));
    }, this.panelHeaderMouseDownEventListener = (e2) => {
      e2.button === 0 && (se$1.bringToFront(this.panelInfo.tag), !this.hasAttribute(f) && (e2.target instanceof HTMLButtonElement && e2.target.getAttribute("part") === "title-button" ? this.startDraggingDebounce(e2) : this.startDragging(e2)));
    }, this.panelHeaderMouseUpEventListener = (e2) => {
      e2.button === 0 && this.startDraggingDebounce.clear();
    }, this.startDragging = (e2) => {
      var _a2;
      x.draggingStarts(this, e2), document.addEventListener("mousemove", this.draggingEventListener), p$1.setSectionPanelDragging(true), ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) ? this.toggleAttribute("dragging", true) : this.parentElement.sectionPanelDraggingStarted(this, e2), e2.preventDefault(), e2.stopPropagation();
    }, this.startDraggingDebounce = Cc(this.startDragging, 200), this.draggingEventListener = (e2) => {
      var _a2, _b2;
      const t = x.dragging(this, e2);
      if (((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && ((_b2 = this.panelInfo) == null ? void 0 : _b2.floatingPosition)) {
        e2.preventDefault();
        const { left: o, top: i, bottom: n, right: s } = t;
        se$1.updatePanel(this.panelInfo.tag, {
          floatingPosition: {
            ...this.panelInfo.floatingPosition,
            left: o,
            top: i,
            bottom: n,
            right: s
          }
        });
      }
    }, this.setCssSizePositionProperties = () => {
      var _a2;
      const e2 = se$1.getPanelByTag(this.panelTag);
      if (e2 && (e2.height !== void 0 && (((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) || e2.panel === "left" || e2.panel === "right" ? this.style.setProperty("--section-height", `${e2.height}px`) : this.style.removeProperty("--section-height")), e2.width !== void 0 && (e2.floating || e2.panel === "bottom" ? this.style.setProperty("--section-width", `${e2.width}px`) : this.style.removeProperty("--section-width")), e2.floating && e2.floatingPosition && !this.toggling)) {
        const { left: t, top: o, bottom: i, right: n } = e2.floatingPosition;
        this.style.setProperty("--left", t !== void 0 ? `${t}px` : "auto"), this.style.setProperty("--top", o !== void 0 ? `${o}px` : "auto"), this.style.setProperty("--bottom", i !== void 0 ? `${i}px` : ""), this.style.setProperty("--right", n !== void 0 ? `${n}px` : "");
      }
    }, this.renderPopupButton = () => {
      if (!this.panelInfo)
        return O$1;
      let e2;
      return this.panelInfo.panel === void 0 ? e2 = "Close the popup" : e2 = this.panelInfo.floating ? `Dock ${this.panelInfo.header} to ${this.panelInfo.panel}` : `Open ${this.panelInfo.header} as a popup`, ut`
      <vaadin-context-menu .items=${this.dockingItems} @item-selected="${this.changeDockingPanel}">
        <button
          @click="${(t) => this.changePanelFloating(t)}"
          @mousedown="${(t) => t.stopPropagation()}"
          aria-label=${e2}
          class="icon"
          part="popup-button"
          title="${e2}">
          ${this.getPopupButtonIcon()}
        </button>
      </vaadin-context-menu>
    `;
    }, this.changePanelFloating = (e2) => {
      var _a2, _b2, _c;
      if (this.panelInfo)
        if (e2.stopPropagation(), cu(this), (_a2 = this.panelInfo) == null ? void 0 : _a2.floating)
          se$1.updatePanel(this.panelInfo.tag, { floating: false });
        else {
          let t;
          if (this.panelInfo.floatingPosition)
            t = this.panelInfo.floatingPosition;
          else {
            const { left: n, top: s } = this.getBoundingClientRect();
            t = {
              left: n,
              top: s
            };
          }
          let o = (_b2 = this.panelInfo) == null ? void 0 : _b2.height;
          o === void 0 && this.panelInfo.expanded && (o = Number.parseInt(window.getComputedStyle(this).height, 10)), this.parentElement.forceClose(), se$1.updatePanel(this.panelInfo.tag, {
            floating: true,
            expanded: true,
            width: ((_c = this.panelInfo) == null ? void 0 : _c.width) || Number.parseInt(window.getComputedStyle(this).width, 10),
            height: o,
            floatingPosition: t
          }), se$1.bringToFront(this.panelInfo.tag);
        }
    }, this.toggleExpand = (e2) => {
      this.panelInfo && (e2.stopPropagation(), x.anchorLeftTop(this), se$1.updatePanel(this.panelInfo.tag, {
        expanded: !this.panelInfo.expanded
      }), this.toggling = true, this.toggleAttribute("expanded", this.panelInfo.expanded));
    };
  }
  static get styles() {
    return [
      te$1(mc),
      te$1(Ac),
      vl`
        * {
          box-sizing: border-box;
        }

        :host {
          flex: none;
          display: grid;
          align-content: start;
          grid-template-rows: auto 1fr;
          transition: grid-template-rows var(--duration-2);
          overflow: hidden;
          position: relative;
          --min-width: 160px;
          --resize-div-size: 10px;
          --header-height: 36px;
          --content-height: calc(var(--section-height) - var(--header-height));
          --content-width: var(--content-width, 100%);
          --floating-border-width: 1px;
          --floating-offset-resize-threshold: 8px;
          cursor: var(--cursor, var(--resize-cursor, default));
        }

        :host(:not([expanded])) {
          grid-template-rows: auto 0fr;
          --content-height: 0px !important;
        }

        [part='header'] {
          align-items: center;
          color: var(--color-high-contrast);
          display: flex;
          flex: none;
          font: var(--font-small-medium);
          gap: var(--space-50);
          justify-content: space-between;
          min-width: 100%;
          padding: var(--space-50);
          user-select: none;
          -webkit-user-select: none;
          width: var(--min-width);
        }

        :host([floating]:not([expanded])) [part='header'] {
          --min-width: unset;
        }

        :host([floating]) [part='header'] {
          transition: border-color var(--duration-2);
        }

        :host([floating]:not([expanded])) [part='header'] {
          border-color: transparent;
        }

        [part='title'] {
          flex: auto;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        [part='title']:first-child {
          margin-inline-start: var(--space-100);
        }

        [part='content'] {
          height: var(--content-height);
          overflow: auto;
          transition:
            height var(--duration-2),
            width var(--duration-2),
            opacity var(--duration-2),
            visibility calc(var(--duration-2) * 2);
        }

        [part='drawer-resize'] {
          resize: vertical;
          cursor: row-resize;
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 10px;
        }

        :host([floating]) [part='drawer-resize'] {
          display: none;
        }

        :host(:not([expanded])) [part='drawer-resize'] {
          display: none;
        }

        :host(:not([floating]):not(:last-child)) {
          border-bottom: 1px solid var(--border-color);
        }

        :host(:not([expanded])) [part='content'] {
          opacity: 0;
          visibility: hidden;
        }

        :host([floating]:not([expanded])) [part='content'] {
          width: 0;
          height: 0;
        }

        :host(:not([expanded])) [part='content'][style*='height'] {
          height: 0 !important;
        }

        :host(:not([expanded])) [part='content'][style*='width'] {
          width: 0 !important;
        }

        :host([floating]) {
          position: fixed;
          min-width: 0;
          min-height: 0;
          z-index: calc(var(--z-index-floating-panel) + var(--z-index-focus, 0));
          top: clamp(0px, var(--top), calc(100vh - var(--section-height, var(--header-height)) * 0.5));
          left: clamp(calc(var(--section-width) * -0.5), var(--left), calc(100vw - var(--section-width) * 0.5));
          bottom: clamp(
            calc(var(--section-height, var(--header-height)) * -0.5),
            var(--bottom),
            calc(100vh - var(--section-height, var(--header-height)) * 0.5)
          );
          right: clamp(calc(var(--section-width) * -0.5), var(--right), calc(100vw - var(--section-width) * 0.5));
          width: var(--section-width);
          overflow: visible;
        }
        :host([floating]) [part='container'] {
          background: var(--surface);
          border: var(--floating-border-width) solid var(--surface-border-color);
          -webkit-backdrop-filter: var(--surface-backdrop-filter);
          backdrop-filter: var(--surface-backdrop-filter);
          border-radius: var(--radius-2);
          margin: auto;
          box-shadow: var(--surface-box-shadow-2);
        }
        [part='container'] {
          overflow: hidden;
        }
        :host([floating][expanded]) {
          max-height: 100vh;
        }
        :host([floating][expanded]) [part='container'] {
          height: calc(100% - var(--floating-offset-resize-threshold) / 2);
          width: calc(100% - var(--floating-offset-resize-threshold) / 2);
        }

        :host([floating]:not([expanded])) {
          width: unset;
        }

        :host([floating]) .drag-handle {
          cursor: var(--resize-cursor, move);
        }

        :host([floating][expanded]) [part='content'] {
          min-width: var(--min-width);
          min-height: 0;
          width: var(--content-width);
        }

        /* :hover for Firefox, :active for others */

        :host([floating][expanded]) [part='content']:is(:hover, :active) {
          transition: none;
        }

        [part='title-button'] {
          padding: 0;
          text-align: start;
        }

        [part='toggle-button'] svg {
          transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1);
        }

        [part='toggle-button'][aria-expanded='true'] svg {
          transform: rotate(90deg);
        }

        .actions {
          display: none;
        }

        :host([expanded]) .actions {
          display: contents;
        }

        ::slotted(*) {
          box-sizing: border-box;
          display: block;
          height: var(--content-height, var(--default-content-height, 100%));
          /* padding: var(--space-150); */
          width: 100%;
        }

        /*workaround for outline to have a explicit height while floating by default. 
          may be removed after https://github.com/vaadin/web-components/issues/7620 is solved
        */
        :host([floating][expanded][paneltag='copilot-outline-panel']) {
          --grid-default-height: 400px;
        }

        :host([dragging]) {
          opacity: 0.4;
        }

        :host([dragging]) [part='content'] {
          pointer-events: none;
        }

        :host([resizing]),
        :host([resizing]) [part='content'] {
          transition: none;
        }
        :host([resizing]) [part='content'] {
          height: 100%;
        }

        :host([hiding-while-drag-and-drop]) {
          display: none;
        }

        // dragging in drawer

        :host(:not([floating])) .drag-handle {
          cursor: grab;
        }

        :host(:not([floating])[dragging]) .drag-handle {
          cursor: grabbing;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.setAttribute("role", "region"), this.reaction(
      () => se$1.getAttentionRequiredPanelConfiguration(),
      () => {
        const e2 = se$1.getAttentionRequiredPanelConfiguration();
        this.toggleAttribute(Wc, (e2 == null ? void 0 : e2.tag) === this.panelTag && (e2 == null ? void 0 : e2.floating));
      }
    ), this.addEventListener("mouseenter", this.sectionPanelMouseEnterListener), document.addEventListener("mousemove", this.resizeInDrawerMouseMoveListener), document.addEventListener("mouseup", this.resizeInDrawerMouseUpListener), this.reaction(
      () => p$1.operationInProgress,
      () => {
        requestAnimationFrame(() => {
          var _a2;
          this.toggleAttribute(
            "hiding-while-drag-and-drop",
            p$1.operationInProgress === au.DragAndDrop && ((_a2 = this.panelInfo) == null ? void 0 : _a2.floating) && !this.panelInfo.showWhileDragging
          );
        });
      }
    ), this.reaction(
      () => se$1.floatingPanelsZIndexOrder,
      () => {
        this.style.setProperty("--z-index-focus", `${se$1.getFloatingPanelZIndex(this.panelTag)}`);
      },
      { fireImmediately: true }
    ), this.addEventListener("transitionend", this.transitionEndEventListener), this.addEventListener("mousemove", this.floatingResizeHandlerMouseMoveListener), this.addEventListener("mousedown", this.floatingResizingMouseDownListener), this.addEventListener("mouseleave", this.floatingResizingMouseLeaveListener), document.addEventListener("mousemove", this.floatingResizingMouseMoveListener), document.addEventListener("mouseup", this.floatingResizingMouseUpListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseenter", this.sectionPanelMouseEnterListener), this.drawerResizeElement.removeEventListener("mousedown", this.resizeInDrawerMouseDownListener), document.removeEventListener("mousemove", this.resizeInDrawerMouseMoveListener), document.removeEventListener("mouseup", this.resizeInDrawerMouseUpListener), this.removeEventListener("mousemove", this.floatingResizeHandlerMouseMoveListener), this.removeEventListener("mousedown", this.floatingResizingMouseDownListener), document.removeEventListener("mousemove", this.floatingResizingMouseMoveListener), document.removeEventListener("mouseup", this.floatingResizingMouseUpListener);
  }
  setResizePosition(e2, t, o) {
    const i = this.rectangleBeforeResizing, n = 0, s = window.innerWidth, r = 0, p = window.innerHeight, u2 = Math.max(n, Math.min(s, t)), v2 = Math.max(r, Math.min(p, o));
    if (e2 === "left")
      this.setFloatingResizeDirectionProps(
        "left",
        u2,
        i.left - u2 + i.width
      );
    else if (e2 === "right")
      this.setFloatingResizeDirectionProps(
        "right",
        u2,
        u2 - i.right + i.width
      );
    else if (e2 === "top") {
      const w = i.top - v2 + i.height;
      this.setFloatingResizeDirectionProps("top", v2, void 0, w);
    } else if (e2 === "bottom") {
      const w = v2 - i.bottom + i.height;
      this.setFloatingResizeDirectionProps("bottom", v2, void 0, w);
    }
  }
  willUpdate(e2) {
    var _a2;
    super.willUpdate(e2), e2.has("panelTag") && (this.panelInfo = se$1.getPanelByTag(this.panelTag), this.setAttribute("aria-labelledby", this.panelInfo.tag.concat("-title"))), this.toggleAttribute("floating", (_a2 = this.panelInfo) == null ? void 0 : _a2.floating);
  }
  updated(e2) {
    super.updated(e2), this.setCssSizePositionProperties();
  }
  firstUpdated(e2) {
    var _a2, _b2;
    super.firstUpdated(e2), document.addEventListener("mouseup", this.documentMouseUpEventListener), this.headerDraggableArea.addEventListener("mousedown", this.panelHeaderMouseDownEventListener), this.headerDraggableArea.addEventListener("mouseup", this.panelHeaderMouseUpEventListener), this.toggleAttribute("expanded", (_a2 = this.panelInfo) == null ? void 0 : _a2.expanded), this.toggleAttribute("individual", ((_b2 = this.panelInfo) == null ? void 0 : _b2.individual) ?? false), uu(this), this.setCssSizePositionProperties(), this.contentArea.addEventListener("mousedown", this.contentAreaMouseDownListener), this.drawerResizeElement.addEventListener("mousedown", this.resizeInDrawerMouseDownListener), u(this.shadowRoot);
  }
  render() {
    return this.panelInfo ? ut`
      <div part="container">
        <div part="header" class="drag-handle">
          ${this.panelInfo.expandable !== false ? ut` <button
                @mousedown="${(e2) => e2.stopPropagation()}"
                @click="${(e2) => this.toggleExpand(e2)}"
                aria-controls="content"
                aria-expanded="${this.panelInfo.expanded}"
                aria-label="Expand ${this.panelInfo.header}"
                class="icon"
                part="toggle-button">
                <span>${e$1.chevronRight}</span>
              </button>` : O$1}
          <h2 id="${this.panelInfo.tag}-title" part="title">
            <button
              part="title-button"
              @dblclick="${(e2) => {
      this.toggleExpand(e2), this.startDraggingDebounce.clear();
    }}">
              ${se$1.getPanelHeader(this.panelInfo)}
            </button>
          </h2>
          <div class="actions" @mousedown="${(e2) => e2.stopPropagation()}">${this.renderActions()}</div>
          ${this.renderHelpButton()} ${this.renderPopupButton()}
        </div>
        <div part="content" id="content">
          <slot name="content"></slot>
        </div>
        <div part="drawer-resize"></div>
      </div>
    ` : O$1;
  }
  getPopupButtonIcon() {
    return this.panelInfo ? this.panelInfo.panel === void 0 ? e$1.close : this.panelInfo.floating ? this.panelInfo.panel === "bottom" ? e$1.dockBottom : this.panelInfo.panel === "left" ? e$1.dockLeft : this.panelInfo.panel === "right" ? e$1.dockRight : O$1 : e$1.share : O$1;
  }
  renderHelpButton() {
    var _a2;
    return ((_a2 = this.panelInfo) == null ? void 0 : _a2.helpUrl) ? ut` <button
      @click="${() => window.open(this.panelInfo.helpUrl, "_blank")}"
      @mousedown="${(e2) => e2.stopPropagation()}"
      title="More information about ${this.panelInfo.header}"
      aria-label="More information about ${this.panelInfo.header}">
      ${e$1.help}
    </button>` : O$1;
  }
  renderActions() {
    var _a2;
    if (!((_a2 = this.panelInfo) == null ? void 0 : _a2.actionsTag))
      return O$1;
    const e2 = this.panelInfo.actionsTag;
    return Ml(`<${e2}></${e2}>`);
  }
  changeDockingPanel(e2) {
    var _a2;
    const t = e2.detail.value.panel;
    if (((_a2 = this.panelInfo) == null ? void 0 : _a2.panel) !== t) {
      const o = se$1.panels.filter((i) => i.panel === t).map((i) => i.panelOrder).sort((i, n) => n - i)[0];
      cu(this), se$1.updatePanel(this.panelInfo.tag, { panel: t, panelOrder: o + 1 });
    }
    this.panelInfo.floating && this.changePanelFloating(e2);
  }
  getResizeDirections() {
    const e2 = this.getAttribute(f);
    return e2 ? e2.split(" ") : [];
  }
};
E([
  h()
], A.prototype, "panelTag", 2);
E([
  v(".drag-handle")
], A.prototype, "headerDraggableArea", 2);
E([
  v("#content")
], A.prototype, "contentArea", 2);
E([
  v('[part="drawer-resize"]')
], A.prototype, "drawerResizeElement", 2);
E([
  v('[part="container"]')
], A.prototype, "container", 2);
E([
  g()
], A.prototype, "dockingItems", 2);
A = E([
  hl("copilot-section-panel-wrapper")
], A);
function nt(e2) {
  p$1.setOperationWaitsHmrUpdate(e2, 3e4);
}
w$1.on("undoRedo", (e2) => {
  const o = { files: e2.detail.files ?? Fc(), uiId: Kc() }, i = e2.detail.undo ? "copilot-plugin-undo" : "copilot-plugin-redo", n = e2.detail.undo ? "undo" : "redo";
  bt(n), nt(au.RedoUndo), w$1.send(i, o);
});
var at = (e2, t, o, i) => {
  for (var n = t, s = e2.length - 1, r; s >= 0; s--)
    (r = e2[s]) && (n = r(n) || n);
  return n;
};
let oe = class extends Rl {
  static get styles() {
    return [
      te$1(mc),
      te$1(Ac),
      te$1(Oc),
      vl`
        :host {
          --lumo-secondary-text-color: var(--dev-tools-text-color);
          --lumo-contrast-80pct: var(--dev-tools-text-color-emphasis);
          --lumo-contrast-60pct: var(--dev-tools-text-color-secondary);
          --lumo-font-size-m: 14px;

          position: fixed;
          bottom: 2.5rem;
          right: 0rem;
          visibility: visible; /* Always show, even if copilot is off */
          user-select: none;
          z-index: 10000;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);

          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        @supports (backdrop-filter: blur(1px)) {
          .notification-tray div.message {
            backdrop-filter: blur(8px);
          }

          .notification-tray div.message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 40rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          word-break: break-all;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          max-width: 100%;
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
          display: flex;
          flex-direction: column;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }
      `
    ];
  }
  render() {
    return ut`<div class="notification-tray">
      ${p$1.notifications.map((e2) => this.renderNotification(e2))}
    </div>`;
  }
  renderNotification(e2) {
    return ut`
      <div
        class="message ${e2.type} ${e2.animatingOut ? "animate-out" : ""} ${e2.details || e2.link ? "has-details" : ""}"
        data-testid="message">
        <div class="message-content">
          <div class="message-heading">${e2.message}</div>
          <div class="message-details" ?hidden="${!e2.details && !e2.link}">
            ${Jc(e2.details)}
            ${e2.link ? ut`<a class="ahreflike" href="${e2.link}" target="_blank">Learn more</a>` : ""}
          </div>
          ${e2.dismissId ? ut`<div
                class="persist ${e2.dontShowAgain ? "on" : "off"}"
                @click=${() => {
      this.toggleDontShowAgain(e2);
    }}>
                ${rt(e2)}
              </div>` : ""}
        </div>
        <div
          class="dismiss-message"
          @click=${(t) => {
      bo(e2), t.stopPropagation();
    }}>
          Dismiss
        </div>
      </div>
    `;
  }
  toggleDontShowAgain(e2) {
    e2.dontShowAgain = !e2.dontShowAgain, this.requestUpdate();
  }
};
oe = at([
  hl("copilot-notifications-container")
], oe);
function rt(e2) {
  return e2.dontShowAgainMessage ? e2.dontShowAgainMessage : "Do not show this again";
}
er({
  type: Le.WARNING,
  message: "Development Mode",
  details: "This application is running in development mode.",
  dismissId: "devmode"
});
const K = Cc(async () => {
  await kc();
});
w$1.on("vite-after-update", () => {
  K();
});
const se = (_b = (_a = window == null ? void 0 : window.Vaadin) == null ? void 0 : _a.connectionState) == null ? void 0 : _b.stateChangeListeners;
se ? se.add((e2, t) => {
  e2 === "loading" && t === "connected" && p$1.active && K();
}) : console.warn("Unable to add listener for connection state changes");
w$1.on("copilot-plugin-state", (e2) => {
  p$1.setIdePluginState(e2.detail), e2.preventDefault();
});
w$1.on("copilot-early-project-state", (e$12) => {
  e.setSpringSecurityEnabled(e$12.detail.springSecurityEnabled), e.setSpringJpaDataEnabled(e$12.detail.springJpaDataEnabled), e.setSupportsHilla(e$12.detail.supportsHilla), e.setUrlPrefix(e$12.detail.urlPrefix), e$12.preventDefault();
});
w$1.on("location-changed", (e2) => {
  K();
});
w$1.on("copilot-ide-notification", (e2) => {
  er({
    type: Le[e2.detail.type],
    message: e2.detail.message,
    dismissId: e2.detail.dismissId
  }), e2.preventDefault();
});
