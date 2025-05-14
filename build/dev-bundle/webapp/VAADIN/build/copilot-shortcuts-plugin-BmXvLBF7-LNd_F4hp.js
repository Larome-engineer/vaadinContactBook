import { o as ou, h as hl, w as w$1, u as ut, O, M as Ml, l as lu } from "./indexhtml-BEc_5Jrd.js";
import { i as i$1 } from "./base-panel-Cm-eTOpq-DQ3K0nfW.js";
import { e } from "./icons-wGs4ytLT-BPLiXn5f.js";
const v = 'copilot-shortcuts-panel{display:flex;flex-direction:column;padding:var(--space-150)}copilot-shortcuts-panel h3{font:var(--font-xsmall-semibold);margin-bottom:var(--space-100);margin-top:0}copilot-shortcuts-panel h3:not(:first-of-type){margin-top:var(--space-200)}copilot-shortcuts-panel ul{display:flex;flex-direction:column;list-style:none;margin:0;padding:0}copilot-shortcuts-panel ul li{display:flex;align-items:center;gap:var(--space-50);position:relative}copilot-shortcuts-panel ul li:not(:last-of-type):before{border-bottom:1px dashed var(--border-color);content:"";inset:auto 0 0 calc(var(--size-m) + var(--space-50));position:absolute}copilot-shortcuts-panel ul li span:has(svg){align-items:center;display:flex;height:var(--size-m);justify-content:center;width:var(--size-m)}copilot-shortcuts-panel .kbds{margin-inline-start:auto}copilot-shortcuts-panel kbd{align-items:center;border:1px solid var(--border-color);border-radius:var(--radius-2);box-sizing:border-box;display:inline-flex;font-family:var(--font-family);font-size:var(--font-size-1);line-height:var(--line-height-1);padding:0 var(--space-50)}', h = window.Vaadin.copilot.tree;
if (!h)
  throw new Error("Tried to access copilot tree before it was initialized.");
var x = (t, n, l, i) => {
  for (var a = n, p = t.length - 1, r; p >= 0; p--)
    (r = t[p]) && (a = r(a) || a);
  return a;
};
let u = class extends i$1 {
  constructor() {
    super(), this.onTreeUpdated = () => {
      this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback(), w$1.on("copilot-tree-created", this.onTreeUpdated);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), w$1.off("copilot-tree-created", this.onTreeUpdated);
  }
  render() {
    const t = h.hasFlowComponents();
    return ut`<style>
        ${v}
      </style>
      <h3>Global</h3>
      <ul>
        <li>
          <span>${e.vaadinLogo}</span>
          <span>Copilot</span>
          ${s(lu.toggleCopilot)}
        </li>
        <li>
          <span>${e.terminal}</span>
          <span>Command window</span>
          ${s(lu.toggleCommandWindow)}
        </li>
        <li>
          <span>${e.undo}</span>
          <span>Undo</span>
          ${s(lu.undo)}
        </li>
        <li>
          <span>${e.redo}</span>
          <span>Redo</span>
          ${s(lu.redo)}
        </li>
      </ul>
      <h3>Selected component</h3>
      <ul>
        <li>
          <span>${e.fileCodeAlt}</span>
          <span>Go to source</span>
          ${s(lu.goToSource)}
        </li>
        ${t ? ut`<li>
              <span>${e.code}</span>
              <span>Go to attach source</span>
              ${s(lu.goToAttachSource)}
            </li>` : O}
        <li>
          <span>${e.copy}</span>
          <span>Copy</span>
          ${s(lu.copy)}
        </li>
        <li>
          <span>${e.clipboard}</span>
          <span>Paste</span>
          ${s(lu.paste)}
        </li>
        <li>
          <span>${e.copyAlt}</span>
          <span>Duplicate</span>
          ${s(lu.duplicate)}
        </li>
        <li>
          <span>${e.userUp}</span>
          <span>Select parent</span>
          ${s(lu.selectParent)}
        </li>
        <li>
          <span>${e.userLeft}</span>
          <span>Select previous sibling</span>
          ${s(lu.selectPreviousSibling)}
        </li>
        <li>
          <span>${e.userRight}</span>
          <span>Select first child / next sibling</span>
          ${s(lu.selectNextSibling)}
        </li>
        <li>
          <span>${e.trash}</span>
          <span>Delete</span>
          ${s(lu.delete)}
        </li>
      </ul>`;
  }
};
u = x([
  hl("copilot-shortcuts-panel")
], u);
function s(t) {
  return ut`<span class="kbds">${Ml(t)}</span>`;
}
const C = ou({
  header: "Keyboard Shortcuts",
  tag: "copilot-shortcuts-panel",
  width: 400,
  height: 550,
  floatingPosition: {
    top: 50,
    left: 50
  }
}), P = {
  init(t) {
    t.addPanel(C);
  }
};
window.Vaadin.copilot.plugins.push(P);
