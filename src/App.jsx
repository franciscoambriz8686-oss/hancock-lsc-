import { useState, useRef, useEffect } from "react";

const COLORS = {
  bg: "#0f1117", surface: "#181c27", card: "#1e2333", border: "#2a3050",
  accent: "#4f8ef7", accentDim: "#1e3a6e", green: "#34d399", greenDim: "#064e3b",
  yellow: "#fbbf24", red: "#f87171", text: "#e8eaf0", muted: "#7a85a3",
};

const isMobile = () => window.innerWidth < 700;

const style = {
  app: { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'IBM Plex Sans','Segoe UI',sans-serif", display: "flex", flexDirection: "column" },
  header: { background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "0 20px", display: "flex", alignItems: "center", gap: 12, height: 52, position: "sticky", top: 0, zIndex: 100 },
  logo: { fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 14, color: COLORS.accent, letterSpacing: "0.04em", textTransform: "uppercase" },
  divider: { width: 1, height: 22, background: COLORS.border },
  subtitle: { fontSize: 11, color: COLORS.muted, letterSpacing: "0.06em", textTransform: "uppercase" },
  desktopNav: { display: "flex", gap: 4, marginLeft: "auto" },
  navBtn: (active) => ({ padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, background: active ? COLORS.accentDim : "transparent", color: active ? COLORS.accent : COLORS.muted, transition: "all 0.15s" }),
  main: (mobile) => ({ flex: 1, padding: mobile ? "16px 14px 90px" : "28px 24px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }),
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`, display: "flex", zIndex: 200, paddingBottom: "env(safe-area-inset-bottom)" },
  bottomBtn: (active) => ({ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 8px", border: "none", background: "transparent", cursor: "pointer", gap: 3, color: active ? COLORS.accent : COLORS.muted, transition: "color 0.15s" }),
  bottomLabel: (active) => ({ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: "0.04em" }),
  card: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 18px", marginBottom: 16 },
  sectionTitle: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 },
  badge: (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: color + "22", color, letterSpacing: "0.04em" }),
  input: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "9px 13px", color: COLORS.text, fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
  select: { background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "9px 12px", color: COLORS.text, fontSize: 13, outline: "none", cursor: "pointer", width: "100%", boxSizing: "border-box" },
  btn: (v = "primary") => ({ padding: "9px 18px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: v === "primary" ? COLORS.accent : v === "ghost" ? "transparent" : COLORS.surface, color: v === "primary" ? "#fff" : v === "ghost" ? COLORS.muted : COLORS.text, border: v === "ghost" ? `1px solid ${COLORS.border}` : "none", whiteSpace: "nowrap" }),
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "8px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: COLORS.muted, borderBottom: `1px solid ${COLORS.border}` },
  td: { padding: "10px 10px", fontSize: 12, borderBottom: `1px solid ${COLORS.border}22`, verticalAlign: "top" },
  tag: (c) => ({ display: "inline-block", padding: "2px 7px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: (c || COLORS.accent) + "22", color: c || COLORS.accent, marginRight: 4 }),
  formRow: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" },
  installBanner: { background: COLORS.accentDim, border: `1px solid ${COLORS.accent}44`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 13 },
};

// ─── INSTALL BANNER ───────────────────────────────────────────────────────────
function InstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    if (isStandalone) return;
    if (isIOS) { setShow(true); return; }
    window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); setDeferredPrompt(e); setShow(true); });
  }, []);

  if (!show) return null;

  const install = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; if (outcome === "accepted") setShow(false); }
  };

  return (
    <div style={style.installBanner}>
      <span style={{ fontSize: 20 }}>📲</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: COLORS.accent, marginBottom: 2 }}>Install on your phone</div>
        {isIOS
          ? <div style={{ fontSize: 12, color: COLORS.muted }}>Tap the Share button → "Add to Home Screen"</div>
          : <div style={{ fontSize: 12, color: COLORS.muted }}>Install this app for quick access anytime</div>}
      </div>
      {!isIOS && deferredPrompt && <button style={style.btn("primary")} onClick={install}>Install</button>}
      <button onClick={() => setShow(false)} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
    </div>
  );
}

// ─── AGENDA TAB ───────────────────────────────────────────────────────────────
const initialAgendaItems = [
  { id: 1, date: "2026-04-15", item: "Approve March meeting minutes", status: "pending", votes_yes: 0, votes_no: 0, votes_abstain: 0, notes: "" },
  { id: 2, date: "2026-04-15", item: "Principal evaluation timeline review", status: "pending", votes_yes: 0, votes_no: 0, votes_abstain: 0, notes: "" },
  { id: 3, date: "2026-03-18", item: "FY26 Budget amendment – Title I", status: "passed", votes_yes: 9, votes_no: 3, votes_abstain: 1, notes: "Super-majority required; passed 9-3-1" },
];

function AgendaTab({ mobile }) {
  const [items, setItems] = useState(initialAgendaItems);
  const [form, setForm] = useState({ date: "", item: "", notes: "" });
  const statusColor = { passed: COLORS.green, failed: COLORS.red, pending: COLORS.yellow, tabled: COLORS.muted };

  const addItem = () => {
    if (!form.item.trim()) return;
    setItems([...items, { ...form, id: Date.now(), status: "pending", votes_yes: 0, votes_no: 0, votes_abstain: 0 }]);
    setForm({ date: "", item: "", notes: "" });
  };

  const updateVotes = (id, field, val) => setItems(items.map(i => i.id === id ? { ...i, [field]: Math.max(0, Number(val)) } : i));
  const setStatus = (id, status) => setItems(items.map(i => i.id === id ? { ...i, status } : i));

  return (
    <div>
      <div style={style.card}>
        <div style={style.sectionTitle}>📋 Add Agenda Item</div>
        <div style={style.formRow}>
          <input type="date" style={{ ...style.input, width: mobile ? "100%" : 150 }} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div style={style.formRow}>
          <input style={style.input} placeholder="Item description" value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} />
        </div>
        <div style={style.formRow}>
          <input style={style.input} placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <button style={style.btn("primary")} onClick={addItem}>Add</button>
        </div>
      </div>

      {items.map(item => (
        <div key={item.id} style={style.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{item.item}</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{item.date || "No date"}</div>
            </div>
            <span style={style.badge(statusColor[item.status] || COLORS.muted)}>{item.status}</span>
          </div>
          {item.notes && <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 10, fontStyle: "italic" }}>{item.notes}</div>}
          <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
            {["votes_yes", "votes_no", "votes_abstain"].map((f, i) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11, color: [COLORS.green, COLORS.red, COLORS.muted][i] }}>{["Y", "N", "A"][i]}</span>
                <input type="number" min="0" style={{ ...style.input, width: 48, padding: "4px 8px", fontSize: 13 }}
                  value={item[f]} onChange={e => updateVotes(item.id, f, e.target.value)} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["passed", "failed", "tabled", "pending"].map(s => (
              <button key={s} style={{ padding: "3px 10px", borderRadius: 5, border: `1px solid ${item.status === s ? statusColor[s] : COLORS.border}`, background: item.status === s ? statusColor[s] + "22" : "transparent", color: item.status === s ? statusColor[s] : COLORS.muted, fontSize: 11, cursor: "pointer", fontWeight: 600 }}
                onClick={() => setStatus(item.id, s)}>{s}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── EVIDENCE TAB ─────────────────────────────────────────────────────────────
const DOMAINS = ["1 – Instructional Leadership", "2 – School Culture & Safety", "3 – Family & Community Engagement", "4 – Teacher Support & Development", "5 – Operational Efficiency"];
const EVIDENCE_TYPES = ["Observation", "Document", "Meeting Record", "Data/Report", "Communication", "Other"];

function EvidenceTab() {
  const [entries, setEntries] = useState([
    { id: 1, date: "2026-03-10", domain: "1 – Instructional Leadership", type: "Data/Report", description: "CEO rating: Excellent – Year 3 summative", rating: "Supports", source: "CPS Eval Portal" },
    { id: 2, date: "2026-02-18", domain: "2 – School Culture & Safety", type: "Document", description: "Attendance improvement: +4.2% vs prior year", rating: "Supports", source: "CPS Attendance Data" },
  ]);
  const [form, setForm] = useState({ date: "", domain: DOMAINS[0], type: EVIDENCE_TYPES[0], description: "", rating: "Supports", source: "" });
  const ratingColor = { Supports: COLORS.green, Neutral: COLORS.yellow, Against: COLORS.red };

  const addEntry = () => {
    if (!form.description.trim()) return;
    setEntries([...entries, { ...form, id: Date.now() }]);
    setForm({ date: "", domain: DOMAINS[0], type: EVIDENCE_TYPES[0], description: "", rating: "Supports", source: "" });
  };

  return (
    <div>
      <div style={style.card}>
        <div style={style.sectionTitle}>➕ Log Evidence – Principal Harper</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input type="date" style={style.input} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <select style={style.select} value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })}>
            {DOMAINS.map(d => <option key={d}>{d}</option>)}
          </select>
          <div style={{ display: "flex", gap: 8 }}>
            <select style={style.select} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              {EVIDENCE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select style={style.select} value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })}>
              {["Supports", "Neutral", "Against"].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <input style={style.input} placeholder="Evidence description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div style={{ display: "flex", gap: 8 }}>
            <input style={style.input} placeholder="Source" value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} />
            <button style={style.btn("primary")} onClick={addEntry}>Log</button>
          </div>
        </div>
      </div>

      {entries.map(e => (
        <div key={e.id} style={style.card}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={style.tag()}>{e.domain.split("–")[0].trim()}</span>
            <span style={style.badge(ratingColor[e.rating] || COLORS.muted)}>{e.rating}</span>
          </div>
          <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 4 }}>{e.description}</div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>{e.date} · {e.type} · {e.source}</div>
        </div>
      ))}
    </div>
  );
}

// ─── DATES TAB ────────────────────────────────────────────────────────────────
const KEY_DATES = [
  { date: "2026-05-01", event: "Principal Evaluation – May 1 deadline", type: "critical", notes: "Mid-year check-in required" },
  { date: "2026-07-01", event: "Annual Org Meeting window opens", type: "important", notes: "Officer elections July 1–14" },
  { date: "2026-07-14", event: "Annual Org Meeting window closes", type: "important", notes: "Chair election deadline" },
  { date: "2026-11-01", event: "Principal Evaluation – Nov 1 deadline", type: "critical", notes: "" },
  { date: "2026-11-30", event: "Principal Evaluation – Nov 30 deadline", type: "critical", notes: "" },
  { date: "2027-02-01", event: "Year 4 Cumulative Eval – 150-day deadline", type: "critical", notes: "150 days before June 30 contract end" },
];

function DatesTab() {
  const today = new Date();
  const typeColor = { critical: COLORS.red, important: COLORS.yellow, info: COLORS.accent };
  const sorted = [...KEY_DATES].sort((a, b) => new Date(a.date) - new Date(b.date));

  const daysUntil = (d) => Math.ceil((new Date(d) - today) / 86400000);

  return (
    <div>
      {sorted.map((d, i) => {
        const days = daysUntil(d.date);
        return (
          <div key={i} style={{ ...style.card, borderLeft: `3px solid ${typeColor[d.type]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div style={{ fontWeight: 600, fontSize: 13, flex: 1, paddingRight: 10 }}>{d.event}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: days < 30 ? COLORS.red : days < 90 ? COLORS.yellow : COLORS.green, whiteSpace: "nowrap" }}>
                {days > 0 ? `${days}d` : days === 0 ? "TODAY" : `${Math.abs(days)}d ago`}
              </div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>
              {d.date}{d.notes ? ` · ${d.notes}` : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── AI TAB ───────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an expert LSC (Local School Council) governance advisor for Chicago Public Schools, specializing in the CPS LSC Reference Guide, Robert's Rules of Order, and Illinois School Code. You assist LSC members at Hancock High School.

Key facts:
- 15-member high school LSC (quorum = 8)
- Factional divide: minority group (including parent rep Ana Ambriz) advocates for procedural fairness and proper principal evaluation; majority faction appears to be pushing for principal removal
- Principal Harper has strong CEO ratings
- Year 4 cumulative evaluation deadline: Feb 1 (150 days before June 30 contract end)
- Annual Organizational Meeting (officer elections): July 1–14
- Principal non-renewal despite strong CEO ratings triggers arbitration rights

Answer procedural questions accurately. Cite the LSC Reference Guide or Robert's Rules when relevant. Be concise and practical. Flag procedural violations or risks. Always prioritize student interests and due process.`;

function AITab() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Hancock LSC governance advisor. Ask me about procedures, Robert's Rules, evaluation deadlines, or parliamentary strategy." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: newMessages.slice(1).map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Sorry, couldn't get a response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch { setMessages([...newMessages, { role: "assistant", content: "Error contacting AI. Please try again." }]); }
    setLoading(false);
  };

  const suggestions = ["When does the agenda need to be posted?", "What votes need a super-majority?", "Can the Chair block agenda items?", "What if principal is non-renewed despite good CEO ratings?"];

  return (
    <div style={style.card}>
      <div style={style.sectionTitle}>🤖 LSC Governance Advisor</div>
      <div style={{ height: 340, overflowY: "auto", marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
            <div style={{ maxWidth: "82%", background: m.role === "user" ? COLORS.accentDim : COLORS.surface, border: `1px solid ${m.role === "user" ? COLORS.accent + "44" : COLORS.border}`, borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "10px 13px", fontSize: 13, lineHeight: 1.55, color: COLORS.text, whiteSpace: "pre-wrap" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", gap: 5, padding: "6px 12px" }}>{[0,1,2].map(n => <div key={n} style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accent, animation: `pulse 1.2s ease-in-out ${n*0.2}s infinite`, opacity: 0.7 }} />)}</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {suggestions.map(s => <button key={s} style={{ ...style.btn("ghost"), fontSize: 11, padding: "4px 9px" }} onClick={() => setInput(s)}>{s}</button>)}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input style={style.input} placeholder="Ask a governance question…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button style={style.btn("primary")} onClick={send} disabled={loading}>Send</button>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.4);opacity:1}}`}</style>
    </div>
  );
}

// ─── DASHBOARD TAB ────────────────────────────────────────────────────────────
function DashboardTab({ setTab }) {
  const today = new Date();
  const nextDeadline = [...KEY_DATES].filter(d => new Date(d.date) >= today).sort((a,b) => new Date(a.date)-new Date(b.date))[0];
  const daysUntil = nextDeadline ? Math.ceil((new Date(nextDeadline.date) - today) / 86400000) : null;

  return (
    <div>
      <InstallBanner />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Next Deadline", value: daysUntil ? `${daysUntil} days` : "None", sub: nextDeadline?.event || "", color: COLORS.red, tab: "dates" },
          { label: "Quorum", value: "8 members", sub: "HS LSC requirement", color: COLORS.accent },
          { label: "Super-Majority", value: "9 yes votes", sub: "Budget fund transfers", color: COLORS.yellow },
          { label: "OLSCR", value: "(773) 553-1400", sub: "Report violations", color: COLORS.green },
        ].map(c => (
          <div key={c.label} onClick={() => c.tab && setTab(c.tab)} style={{ ...style.card, borderLeft: `3px solid ${c.color}`, cursor: c.tab ? "pointer" : "default", marginBottom: 0, padding: "14px 14px" }}>
            <div style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: c.color, marginBottom: 2 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={style.card}>
        <div style={style.sectionTitle}>⚡ Quick Actions</div>
        {[
          { label: "Log evidence for Principal Harper", tab: "evidence", icon: "📁" },
          { label: "Add agenda item", tab: "agenda", icon: "📋" },
          { label: "Check upcoming deadlines", tab: "dates", icon: "📅" },
          { label: "Ask governance advisor", tab: "ai", icon: "🤖" },
        ].map(a => (
          <div key={a.label} onClick={() => setTab(a.tab)} style={{ padding: "11px 13px", borderRadius: 8, cursor: "pointer", background: COLORS.surface, marginBottom: 8, fontSize: 13, border: `1px solid ${COLORS.border}`, display: "flex", gap: 10, alignItems: "center" }}>
            <span>{a.icon}</span><span>{a.label}</span><span style={{ marginLeft: "auto", color: COLORS.muted }}>→</span>
          </div>
        ))}
      </div>

      <div style={style.card}>
        <div style={style.sectionTitle}>📌 Key Reminders</div>
        {[
          "Agenda must be posted 48 hrs before any meeting",
          "Items not on posted agenda cannot be voted on",
          "Principal & student reps excluded from evaluation votes",
          "Non-renewal despite strong CEO ratings → arbitration rights",
          "Annual Org Meeting (officer elections): July 1–14",
          "Chair must be a parent member",
        ].map((r, i) => (
          <div key={i} style={{ fontSize: 12.5, color: COLORS.muted, marginBottom: 8, paddingLeft: 10, borderLeft: `2px solid ${COLORS.border}` }}>{r}</div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", label: "Home", icon: "🏠" },
  { id: "agenda", label: "Agenda", icon: "📋" },
  { id: "evidence", label: "Evidence", icon: "📁" },
  { id: "dates", label: "Dates", icon: "📅" },
  { id: "ai", label: "Advisor", icon: "🤖" },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handle = () => setMobile(isMobile());
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div style={style.app}>
      <header style={style.header}>
        <span style={style.logo}>Hancock LSC</span>
        <span style={style.divider} />
        <span style={style.subtitle}>Governance</span>
        {!mobile && (
          <nav style={style.desktopNav}>
            {TABS.map(t => <button key={t.id} style={style.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>)}
          </nav>
        )}
      </header>

      <main style={style.main(mobile)}>
        {tab === "dashboard" && <DashboardTab setTab={setTab} />}
        {tab === "agenda" && <AgendaTab mobile={mobile} />}
        {tab === "evidence" && <EvidenceTab />}
        {tab === "dates" && <DatesTab />}
        {tab === "ai" && <AITab />}
      </main>

      {mobile && (
        <nav style={style.bottomNav}>
          {TABS.map(t => (
            <button key={t.id} style={style.bottomBtn(tab === t.id)} onClick={() => setTab(t.id)}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={style.bottomLabel(tab === t.id)}>{t.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
