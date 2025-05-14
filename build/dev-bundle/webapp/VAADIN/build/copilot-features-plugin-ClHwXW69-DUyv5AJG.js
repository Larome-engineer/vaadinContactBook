import { u as ut, p as p$1, b as bt, f as er, L as Le, h as hl } from "./indexhtml-BEc_5Jrd.js";
import { i as i$1 } from "./base-panel-Cm-eTOpq-DQ3K0nfW.js";
import { e } from "./icons-wGs4ytLT-BPLiXn5f.js";
const m = "copilot-features-panel{padding:var(--space-100);font:var(--font-xsmall);display:grid;grid-template-columns:auto 1fr;gap:var(--space-50);height:auto}copilot-features-panel a{display:flex;align-items:center;gap:var(--space-50);white-space:nowrap}copilot-features-panel a svg{height:12px;width:12px;min-height:12px;min-width:12px}";
var $ = (t, e2, a, s) => {
  for (var o = e2, l = t.length - 1, n; l >= 0; l--)
    (n = t[l]) && (o = n(o) || o);
  return o;
};
const i = window.Vaadin.devTools;
let p = class extends i$1 {
  render() {
    return ut` <style>
        ${m}
      </style>
      ${p$1.featureFlags.map(
      (t) => ut`
          <copilot-toggle-button
            .title="${t.title}"
            ?checked=${t.enabled}
            @on-change=${(e2) => this.toggleFeatureFlag(e2, t)}>
          </copilot-toggle-button>
          <a class="ahreflike" href="${t.moreInfoLink}" title="Learn more" target="_blank"
            >learn more ${e.share}</a
          >
        `
    )}`;
  }
  toggleFeatureFlag(t, e2) {
    const a = t.target.checked;
    bt("use-feature", { source: "toggle", enabled: a, id: e2.id }), i.frontendConnection ? (i.frontendConnection.send("setFeature", { featureId: e2.id, enabled: a }), er({
      type: Le.INFORMATION,
      message: `“${e2.title}” ${a ? "enabled" : "disabled"}`,
      details: e2.requiresServerRestart ? "This feature requires a server restart" : void 0,
      dismissId: `feature${e2.id}${a ? "Enabled" : "Disabled"}`
    })) : i.log("error", `Unable to toggle feature ${e2.title}: No server connection available`);
  }
};
p = $([
  hl("copilot-features-panel")
], p);
const x = {
  header: "Features",
  expanded: false,
  panelOrder: 35,
  panel: "right",
  floating: false,
  tag: "copilot-features-panel",
  helpUrl: "https://vaadin.com/docs/latest/flow/configuration/feature-flags"
}, F = {
  init(t) {
    t.addPanel(x);
  }
};
window.Vaadin.copilot.plugins.push(F);
export {
  p as CopilotFeaturesPanel
};
