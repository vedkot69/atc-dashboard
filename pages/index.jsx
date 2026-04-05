import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const projectsByBranch = [
  { branch: "KSA", active: 12, pipeline: 8, completed: 34, revenue: 2.4 },
  { branch: "USA", active: 6, pipeline: 5, completed: 18, revenue: 1.8 },
  { branch: "UK", active: 9, pipeline: 4, completed: 22, revenue: 1.1 },
  { branch: "Poland", active: 3, pipeline: 6, completed: 11, revenue: 0.7 },
];

const revenueMonthly = [
  { month: "Oct", KSA: 380, USA: 280, UK: 160, Poland: 90 },
  { month: "Nov", KSA: 420, USA: 310, UK: 180, Poland: 110 },
  { month: "Dec", KSA: 350, USA: 260, UK: 140, Poland: 85 },
  { month: "Jan", KSA: 460, USA: 330, UK: 200, Poland: 120 },
  { month: "Feb", KSA: 490, USA: 290, UK: 190, Poland: 105 },
  { month: "Mar", KSA: 520, USA: 350, UK: 210, Poland: 130 },
];

const activeProjects = [
  { id: "ATC-KSA-047", client: "Saudi Aramco", type: "Condition Monitoring", branch: "KSA", stage: "Execution", value: "$185K", daysActive: 42, health: "on-track" },
  { id: "ATC-KSA-051", client: "SABIC", type: "Transformer Overhaul", branch: "KSA", stage: "Procurement", value: "$320K", daysActive: 28, health: "at-risk" },
  { id: "ATC-USA-023", client: "Con Edison", type: "Electrical Maintenance", branch: "USA", stage: "Quoting", value: "$95K", daysActive: 7, health: "on-track" },
  { id: "ATC-UK-019", client: "National Grid", type: "Panel Integration", branch: "UK", stage: "Execution", value: "$140K", daysActive: 56, health: "delayed" },
  { id: "ATC-KSA-052", client: "Ma'aden", type: "Vibration Analysis", branch: "KSA", stage: "Assessment", value: "$75K", daysActive: 12, health: "on-track" },
  { id: "ATC-PL-008", client: "PGE Energia", type: "European Procurement", branch: "Poland", stage: "Procurement", value: "$210K", daysActive: 35, health: "on-track" },
  { id: "ATC-UK-021", client: "BP", type: "Thermography Survey", branch: "UK", stage: "Execution", value: "$88K", daysActive: 21, health: "on-track" },
  { id: "ATC-USA-025", client: "Chevron", type: "Motor Analysis", branch: "USA", stage: "Invoicing", value: "$62K", daysActive: 68, health: "on-track" },
];

const procurementItems = [
  { part: "ABB ACS880 Drive Module", project: "ATC-KSA-051", supplier: "ABB Sweden", status: "Ordered", eta: "Apr 18", daysOpen: 22 },
  { part: "Siemens 7UT86 Relay", project: "ATC-UK-019", supplier: "Siemens Germany", status: "Quoted", eta: "Pending", daysOpen: 14 },
  { part: "Fluke Ti480 PRO Camera", project: "ATC-UK-021", supplier: "Fluke Netherlands", status: "Delivered", eta: "Delivered", daysOpen: 0 },
  { part: "SKF CMXA 80 Analyzer", project: "ATC-KSA-047", supplier: "SKF Poland", status: "Shipped", eta: "Apr 12", daysOpen: 18 },
  { part: "Megger MIT1025 Insulation Tester", project: "ATC-USA-023", supplier: "Megger UK", status: "Requested", eta: "TBD", daysOpen: 5 },
  { part: "Ekofluid Regeneration Column", project: "ATC-KSA-051", supplier: "Ekofluid Poland", status: "Ordered", eta: "Apr 25", daysOpen: 30 },
  { part: "GE Kelman DGA 900", project: "ATC-PL-008", supplier: "GE Hungary", status: "Quoted", eta: "Pending", daysOpen: 11 },
];

const clients = [
  { name: "Saudi Aramco", branch: "KSA", projects: 14, ltv: "$2.1M", lastActivity: "3 days ago", status: "active" },
  { name: "SABIC", branch: "KSA", projects: 9, ltv: "$1.4M", lastActivity: "1 week ago", status: "active" },
  { name: "National Grid", branch: "UK", projects: 7, ltv: "$890K", lastActivity: "2 months ago", status: "dormant" },
  { name: "Con Edison", branch: "USA", projects: 5, ltv: "$620K", lastActivity: "1 week ago", status: "active" },
  { name: "BP", branch: "UK", projects: 6, ltv: "$780K", lastActivity: "3 weeks ago", status: "active" },
  { name: "Chevron", branch: "USA", projects: 4, ltv: "$510K", lastActivity: "2 days ago", status: "active" },
  { name: "PGE Energia", branch: "Poland", projects: 3, ltv: "$340K", lastActivity: "4 months ago", status: "dormant" },
  { name: "Ma'aden", branch: "KSA", projects: 8, ltv: "$1.1M", lastActivity: "2 weeks ago", status: "active" },
];

const serviceBreakdown = [
  { name: "Condition Monitoring", value: 28 },
  { name: "Transformer Services", value: 22 },
  { name: "Electrical Maintenance", value: 19 },
  { name: "Parts Supply", value: 16 },
  { name: "Panel Integration", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = {
  bg: "#08080c", card: "#101018", border: "#262636",
  accent: "#7B2FBE", accentLight: "#9B5FDE", accentDim: "#4A1A72",
  text: "#e4e4ef", textDim: "#8888a0", textMuted: "#55556a",
  green: "#22c55e", red: "#ef4444", amber: "#f59e0b", blue: "#3b82f6",
  coral: "#f97316", teal: "#14b8a6",
};

const PIE_COLORS = [COLORS.accent, COLORS.blue, COLORS.teal, COLORS.coral, COLORS.amber, COLORS.textMuted];
const tabs = ["Overview", "Projects", "Procurement", "Clients"];

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "18px 20px", flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: accent || COLORS.text, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function HealthBadge({ health }) {
  const c = health === "on-track" ? COLORS.green : health === "at-risk" ? COLORS.amber : COLORS.red;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: c, background: c + "18", border: `1px solid ${c}40` }}>
      {health.replace("-", " ").toUpperCase()}
    </span>
  );
}

function StatusBadge({ status }) {
  const colorMap = { Requested: COLORS.textDim, Quoted: COLORS.amber, Ordered: COLORS.blue, Shipped: COLORS.accent, Delivered: COLORS.green };
  const c = colorMap[status] || COLORS.textDim;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: c, background: c + "18", border: `1px solid ${c}40` }}>
      {status.toUpperCase()}
    </span>
  );
}

function ClientStatusBadge({ status }) {
  const c = status === "active" ? COLORS.green : COLORS.red;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: c, background: c + "18", border: `1px solid ${c}40` }}>
      {status === "dormant" ? "DORMANT — RE-ENGAGE" : "ACTIVE"}
    </span>
  );
}

export default function ATCDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [branchFilter, setBranchFilter] = useState("All");

  const totalActive = projectsByBranch.reduce((s, b) => s + b.active, 0);
  const totalPipeline = projectsByBranch.reduce((s, b) => s + b.pipeline, 0);
  const totalRevenue = projectsByBranch.reduce((s, b) => s + b.revenue, 0);
  const totalCompleted = projectsByBranch.reduce((s, b) => s + b.completed, 0);

  const filteredProjects = branchFilter === "All" ? activeProjects : activeProjects.filter(p => p.branch === branchFilter);
  const filteredProcurement = branchFilter === "All" ? procurementItems : procurementItems.filter(p => {
    const proj = activeProjects.find(ap => ap.id === p.project);
    return proj && proj.branch === branchFilter;
  });
  const filteredClients = branchFilter === "All" ? clients : clients.filter(c => c.branch === branchFilter);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', -apple-system, sans-serif", padding: 0 }}>
      <div style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>ATC Operations Platform</div>
          <div style={{ fontSize: 11, color: COLORS.accent, marginTop: 2 }}>DEMO — Built with sample data | Powered by CaratSense</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "KSA", "USA", "UK", "Poland"].map(b => (
            <button key={b} onClick={() => setBranchFilter(b)} style={{
              padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
              background: branchFilter === b ? COLORS.accent : COLORS.border, color: branchFilter === b ? "#fff" : COLORS.textDim,
              transition: "all 0.15s"
            }}>{b}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${COLORS.border}`, background: COLORS.card }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: "transparent",
            color: activeTab === t ? COLORS.accent : COLORS.textDim, borderBottom: activeTab === t ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            transition: "all 0.15s"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "20px 24px", maxWidth: 1200, margin: "0 auto" }}>
        {activeTab === "Overview" && (
          <>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
              <StatCard label="Active Projects" value={totalActive} sub="across 4 branches" accent={COLORS.accent} />
              <StatCard label="Pipeline" value={totalPipeline} sub="quotes pending" accent={COLORS.amber} />
              <StatCard label="Revenue (YTD)" value={`$${totalRevenue.toFixed(1)}M`} sub={`${totalCompleted} completed`} accent={COLORS.green} />
              <StatCard label="At Risk" value={activeProjects.filter(p => p.health !== "on-track").length} sub="need attention" accent={COLORS.red} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: COLORS.textDim }}>REVENUE BY BRANCH (6 MONTHS, $K)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={revenueMonthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="KSA" stroke={COLORS.accent} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="USA" stroke={COLORS.blue} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="UK" stroke={COLORS.teal} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Poland" stroke={COLORS.coral} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: COLORS.textDim }}>PROJECTS BY SERVICE TYPE (%)</div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                      {serviceBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: COLORS.textDim }}>BRANCH PERFORMANCE</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={projectsByBranch} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="branch" tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="active" fill={COLORS.accent} radius={[4,4,0,0]} name="Active" />
                  <Bar dataKey="pipeline" fill={COLORS.amber} radius={[4,4,0,0]} name="Pipeline" />
                  <Bar dataKey="completed" fill={COLORS.green} radius={[4,4,0,0]} name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === "Projects" && (
          <>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
              <StatCard label="Active" value={filteredProjects.length} accent={COLORS.accent} />
              <StatCard label="On Track" value={filteredProjects.filter(p => p.health === "on-track").length} accent={COLORS.green} />
              <StatCard label="At Risk" value={filteredProjects.filter(p => p.health === "at-risk").length} accent={COLORS.amber} />
              <StatCard label="Delayed" value={filteredProjects.filter(p => p.health === "delayed").length} accent={COLORS.red} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: COLORS.bg }}>
                    {["Project ID", "Client", "Type", "Branch", "Stage", "Value", "Days", "Health"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: COLORS.textDim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p, i) => (
                    <tr key={p.id} style={{ background: i % 2 === 0 ? "transparent" : COLORS.bg + "80", borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600, color: COLORS.accent, fontFamily: "monospace", fontSize: 12 }}>{p.id}</td>
                      <td style={{ padding: "10px 14px" }}>{p.client}</td>
                      <td style={{ padding: "10px 14px", color: COLORS.textDim }}>{p.type}</td>
                      <td style={{ padding: "10px 14px" }}>{p.branch}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>{p.stage}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>{p.value}</td>
                      <td style={{ padding: "10px 14px", color: p.daysActive > 50 ? COLORS.red : COLORS.textDim }}>{p.daysActive}d</td>
                      <td style={{ padding: "10px 14px" }}><HealthBadge health={p.health} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "Procurement" && (
          <>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
              <StatCard label="Open Requests" value={filteredProcurement.filter(p => p.status !== "Delivered").length} accent={COLORS.accent} />
              <StatCard label="Awaiting Quote" value={filteredProcurement.filter(p => p.status === "Requested" || p.status === "Quoted").length} accent={COLORS.amber} />
              <StatCard label="In Transit" value={filteredProcurement.filter(p => p.status === "Shipped").length} accent={COLORS.blue} />
              <StatCard label="Delivered" value={filteredProcurement.filter(p => p.status === "Delivered").length} accent={COLORS.green} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: COLORS.bg }}>
                    {["Part / Equipment", "Project", "Supplier", "Status", "ETA", "Days Open"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: COLORS.textDim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProcurement.map((p, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : COLORS.bg + "80", borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>{p.part}</td>
                      <td style={{ padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: COLORS.accent }}>{p.project}</td>
                      <td style={{ padding: "10px 14px", color: COLORS.textDim }}>{p.supplier}</td>
                      <td style={{ padding: "10px 14px" }}><StatusBadge status={p.status} /></td>
                      <td style={{ padding: "10px 14px" }}>{p.eta}</td>
                      <td style={{ padding: "10px 14px", color: p.daysOpen > 20 ? COLORS.red : COLORS.textDim, fontWeight: p.daysOpen > 20 ? 700 : 400 }}>{p.daysOpen > 0 ? `${p.daysOpen}d` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "Clients" && (
          <>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
              <StatCard label="Total Clients" value={filteredClients.length} accent={COLORS.accent} />
              <StatCard label="Active" value={filteredClients.filter(c => c.status === "active").length} accent={COLORS.green} />
              <StatCard label="Dormant" value={filteredClients.filter(c => c.status === "dormant").length} sub="need re-engagement" accent={COLORS.red} />
              <StatCard label="Total LTV" value={`$${(filteredClients.reduce((s, c) => s + parseFloat(c.ltv.replace(/[$MK]/g, "")) * (c.ltv.includes("M") ? 1000 : 1), 0) / 1000).toFixed(1)}M`} accent={COLORS.blue} />
            </div>

            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: COLORS.bg }}>
                    {["Client", "Branch", "Projects", "Lifetime Value", "Last Activity", "Status"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: COLORS.textDim, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8, borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.sort((a, b) => (a.status === "dormant" ? -1 : 1)).map((c, i) => (
                    <tr key={c.name} style={{ background: c.status === "dormant" ? COLORS.red + "08" : i % 2 === 0 ? "transparent" : COLORS.bg + "80", borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: "10px 14px" }}>{c.branch}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>{c.projects}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 700, color: COLORS.accent }}>{c.ltv}</td>
                      <td style={{ padding: "10px 14px", color: c.status === "dormant" ? COLORS.red : COLORS.textDim }}>{c.lastActivity}</td>
                      <td style={{ padding: "10px 14px" }}><ClientStatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
