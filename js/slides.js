/**
 * Presentation Slides Data with Dramatic 3D Camera Angles & Case Study Content
 */

export const SLIDES = [
  {
    id: 1,
    title: "HITEC City Project",
    subtitle: "Planning, Governance, Risk & Long-Term Urban Impact",
    category: "CASE STUDY OVERVIEW",
    viewMode: "split-3d",
    authors: "N. Shravan Kumar (23EG110C43) & T. Chaitanya Kumar (23EG110C58) | B.Tech Data Science",
    description: "A comprehensive project management case study analyzing the iconic 151-acre flagship township development in Madhapur, Hyderabad that catalyzed India's IT export revolution.",
    bulletPoints: [
      "Case Study Focus: Governance, PPP Structuring, Risk & Delivery",
      "Anchor Infrastructure: Cyber Towers (5.2L sq ft) & STPI Earth Station",
      "Long-Term Impact: $15B+ Annual IT Exports & 10 Lakhs+ Workforce"
    ],
    stats: [
      { label: "Site Area", value: "151 Acres" },
      { label: "Phase 1 Area", value: "5.2L sq ft" },
      { label: "IT Exports", value: "$15B+" }
    ],
    camera: {
      position: { x: 75, y: 85, z: 105 },
      target: { x: 0, y: 0, z: 0 }
    }
  },
  {
    id: 2,
    title: "Project Charter",
    subtitle: "Formal Mandate, Governance Authority & Scope Boundaries",
    category: "PROJECT CHARTER",
    viewMode: "full-content",
    docId: "HC-PC-1996-001",
    charterData: {
      vision: "Transform Hyderabad into a globally preferred IT and engineering consultancy destination.",
      mission: "Deliver world-class plug-and-play office infrastructure through a balanced public-private partnership.",
      objectives: [
        "Develop 151-acre flagship township in Madhapur",
        "Achieve ≥90% anchor tenant occupancy upon completion",
        "Spearhead $15B+ annual software export growth"
      ],
      scopeIncludes: [
        "151-acre greenfield site master plan",
        "Cyber Towers 8-spoke circular building",
        "STPI satellite earth station link",
        "Dedicated 33/11kV power substation grid"
      ],
      scopeExcludes: [
        "City-wide civic road expansion outside 151-acre site",
        "External residential housing projects"
      ],
      governance: [
        { role: "Project Sponsor", entity: "Government of AP / Telangana" },
        { role: "Public Land Partner", entity: "APIIC (19% Equity)" },
        { role: "Private Developer", entity: "L&T Infocity Ltd (81% Equity)" },
        { role: "Leadership", entity: "Joint SPV Board & Project Director" }
      ]
    }
  },
  {
    id: 3,
    title: "Stakeholder Power–Interest Matrix",
    subtitle: "2D Power vs. Interest Grid & Engagement Strategies",
    category: "STAKEHOLDER ANALYSIS",
    viewMode: "full-content",
    matrix: {
      highPowerHighInterest: {
        title: "Manage Closely",
        strategy: "Key Players — Continuous Consultation & Joint Decision Making",
        stakeholders: ["Govt of AP / TG", "APIIC (19% Equity)", "L&T Infocity Ltd (81%)", "Anchor Tech Tenants (Microsoft, Wipro)"]
      },
      highPowerLowInterest: {
        title: "Keep Satisfied",
        strategy: "Sovereign & Financial Enablers — Consult on Key Regulatory Milestones",
        stakeholders: ["HUDA / HMDA Urban Planning", "Department of Finance", "Environmental Regulatory Agencies", "State Electricity Board (APSEB)"]
      },
      lowPowerHighInterest: {
        title: "Keep Informed",
        strategy: "End-Users & Industry Alliances — Regular Communication & Feedback Loops",
        stakeholders: ["IT Workforce & Engineers", "NASSCOM Industry Body", "General Public & Transit Commuters", "Local Tech Community"]
      },
      lowPowerLowInterest: {
        title: "Monitor",
        strategy: "Peripheral Stakeholders — Informational Updates as Needed",
        stakeholders: ["Equipment & Material Vendors", "Media Outlets", "Local Neighborhood Residents", "Academic Research Institutions"]
      }
    }
  },
  {
    id: 4,
    title: "PPP Project Governance Hierarchy",
    subtitle: "Structured SPV & Executive Command Chain",
    category: "ORGANIZATION CHART",
    viewMode: "full-content",
    hierarchy: {
      sponsorNode: {
        title: "Government of AP / Telangana",
        role: "State Sponsor & Sovereign Policy Enabler",
        badge: "State Level"
      },
      spvNodes: [
        { title: "APIIC (19% Equity)", role: "Public Land & Statutory Partner", badge: "Public Sector" },
        { title: "L&T Infocity Ltd (81% Equity)", role: "Private Developer & EPC Lead", badge: "Private Partner" }
      ],
      leadershipNodes: [
        { title: "HUDA / HMDA Regulatory Board", role: "Zoning & Environmental Oversight", badge: "Authority" },
        { title: "SPV Joint Board & Project Director", role: "Strategic Delivery & Executive Direction", badge: "Leadership" }
      ],
      executionNodes: [
        { title: "Construction & EPC Manager", role: "Civil, Structural & Pre-cast Infra", badge: "Delivery" },
        { title: "Estate & Operations Lead", role: "Facility Management & Leasing", badge: "Operations" },
        { title: "STPI Telecom & Substation Link", role: "Earth Station & Utility Grid", badge: "Utilities" }
      ]
    }
  },
  {
    id: 5,
    title: "Perimeter Infrastructure & 4 Gates",
    subtitle: "Real-World Access & Traffic Circulation",
    category: "INFRASTRUCTURE",
    viewMode: "split-3d",
    description: "Cyber Towers features 4 strategic perimeter access gates connecting main road traffic with internal multi-level parking and adjacent tech park corridors.",
    bulletPoints: [
      "Gate 1 & 2 (Front): Main Entrance & Exit facing Hitech City Road Rotary",
      "Gate 3 (Rear): Internal Basement & Multi-level Parking Exit (IBIS Link)",
      "Gate 4 (Rear): Facility Logistics & Service Bay Exit"
    ],
    stats: [
      { label: "Perimeter", value: "4 Gates" },
      { label: "Transit Link", value: "Metro Gate 1" },
      { label: "Parking", value: "Multi-Level" }
    ],
    camera: {
      position: { x: -8, y: 8, z: 32 },
      target: { x: 0, y: 4, z: 12 }
    }
  },
  {
    id: 6,
    title: "Project Lifecycle & Milestones",
    subtitle: "4-Phase Phased Execution History (1996 – Present)",
    category: "LIFECYCLE TIMELINE",
    viewMode: "split-3d",
    description: "Executed in 4 distinct lifecycle phases: from initial greenfield site selection in 1996 to fast-track 24-month civil construction and ongoing multi-park expansion.",
    bulletPoints: [
      "1996 Inception: 151-acre site selection & land acquisition",
      "1997 SPV: Formed 81:19 PPP JV with L&T Infocity Ltd",
      "1997–98 Build: Fast-track pre-cast civil build & STPI link",
      "1998–Present: Scaling into Cyber Gateway & Cyber Pearl"
    ],
    stats: [
      { label: "Timeline", value: "24 Months" },
      { label: "Phases", value: "4 Phases" },
      { label: "Delivery", value: "Nov 1998" }
    ],
    camera: {
      position: { x: 0, y: 46, z: 16 },
      target: { x: 0, y: 10, z: 0 }
    }
  },
  {
    id: 7,
    title: "Risk Register & Categorization",
    subtitle: "Academic Risk Matrix (R-01 to R-10)",
    category: "RISK MANAGEMENT",
    viewMode: "full-content",
    risks: [
      { id: "R-01", category: "Strategic & Financial", risk: "Cost Overrun & Funding Drag", prob: "High", impact: "High", mitigation: "PPP risk sharing & phased capex commitments" },
      { id: "R-02", category: "Delivery & Infra", risk: "Fast-Track Quality Control (14-mo)", prob: "Med", impact: "High", mitigation: "L&T QA/QC audits & ISO safety compliance" },
      { id: "R-03", category: "Delivery & Infra", risk: "Schedule Slippage (Monsoon)", prob: "High", impact: "Med", mitigation: "Critical path buffer & parallel construction fronts" },
      { id: "R-04", category: "Delivery & Infra", risk: "Utility Infrastructure Deficits", prob: "High", impact: "High", mitigation: "Captive 33kV substation & 100% N+1 DG backup" },
      { id: "R-05", category: "Technical & Env", risk: "Technology & Telecom Shift", prob: "Med", impact: "Med", mitigation: "Modular vertical risers & expandable fiber conduits" },
      { id: "R-06", category: "Strategic & Financial", risk: "Market Demand Slowdown", prob: "Med", impact: "High", mitigation: "Pre-committed anchor leases & STPI tax incentives" },
      { id: "R-07", category: "Legal & Ops", risk: "Land Acquisition Litigation", prob: "Med", impact: "Med", mitigation: "Comprehensive legal due diligence & EIA compliance" },
      { id: "R-08", category: "Technical & Env", risk: "Urban Heat & Concretisation", prob: "Med", impact: "Med", mitigation: "Green landscape buffers & rainwater harvesting" },
      { id: "R-09", category: "Legal & Ops", risk: "Political Policy Shifts", prob: "Med", impact: "High", mitigation: "Statutory SPV establishment & bipartisan MoUs" },
      { id: "R-10", category: "Legal & Ops", risk: "24×7 Facility Service Outage", prob: "Low", impact: "Med", mitigation: "Strict Facility Management SLAs & redundancy" }
    ]
  },
  {
    id: 8,
    title: "Mitigation & Future Expansion Roadmap",
    subtitle: "Risk Response Principles & Strategic Horizon (2024 – 2035)",
    category: "EXPANSION ROADMAP",
    viewMode: "full-content",
    lessons: [
      { title: "Anchor Pre-Commitment", desc: "Securing early anchor agreements (Microsoft, Wipro) guaranteed debt servicing and market credibility." },
      { title: "PPP Synergy", desc: "Government enabled land & approvals; private partner delivered engineering speed & quality." },
      { title: "Rolling-Wave Capex", desc: "Modular development allowed Phase 1 operational cash flows to fund Phase 2 expansion." }
    ],
    roadmap: [
      { year: "2024", milestone: "Kokapet Neopolis Expansion", desc: "Phase 2 commercial & financial district expansion." },
      { year: "2027", milestone: "Skill & Tech University", desc: "Establishing dedicated IT skill & AI research institute." },
      { year: "2030", milestone: "Airport Express Metro Link", desc: "Integrated Metro-IT smart transit corridor completion." },
      { year: "2035", milestone: "Net-Zero Carbon Township", desc: "Achieving 100% net-zero carbon footprint target across Cyberabad." }
    ]
  },
  {
    id: 9,
    title: "Key Project Outcomes & Legacy",
    subtitle: "Sustained Long-Term Impact & Strategic Synthesis",
    category: "PROJECT OUTCOMES",
    viewMode: "full-content",
    outcomes: [
      { metric: "$15 Billion+", label: "Annual IT Exports", detail: "Telangana State IT Export Engine" },
      { metric: "10 Lakhs+", label: "Direct IT Jobs", detail: "Created High-Skill Workforce" },
      { metric: "1,500+", label: "Active Enterprises", detail: "Global IT/ITES Companies" },
      { metric: "25+ Years", label: "Sustained Expansion", detail: "Continuous Urban Growth" }
    ],
    conclusions: [
      "Executable Vision: Structured project management turned a greenfield site into a premier global technology cluster.",
      "PPP Benchmark: SPV model balanced public developmental goals with private corporate execution discipline.",
      "National Reference: HITEC City established the master template for IT parks and SEZ developments across India.",
      "Academic References: Govt of TG IT Report (2023); HMDA Master Plan 2031; APIIC; NASSCOM (2023); PMI PMBOK (7th ed.)."
    ]
  },
  {
    id: 10,
    title: "Glossary, Summary & Thank You",
    subtitle: "Acronyms, Full Forms, Core Timeline & Final Acknowledgments",
    category: "SUMMARY & GLOSSARY",
    viewMode: "full-content",
    glossaryData: {
      acronyms: [
        { term: "PPP", full: "Public-Private Partnership", desc: "Collaborative infrastructure delivery model between Govt of AP & L&T Infocity Ltd." },
        { term: "SPV", full: "Special Purpose Vehicle", desc: "L&T Infocity Ltd joint venture entity (81% L&T equity, 19% APIIC land equity)." },
        { term: "APIIC", full: "Andhra Pradesh Industrial Infrastructure Corp.", desc: "Nodal state agency providing 151-acre land & statutory clearances." },
        { term: "HMDA / HUDA", full: "Hyderabad Metropolitan / Urban Dev. Authority", desc: "Zoning, urban master planning & environmental regulatory body." },
        { term: "STPI", full: "Software Technology Parks of India", desc: "Autonomous society facilitating high-speed satellite earth station connectivity." },
        { term: "EPC", full: "Engineering, Procurement, and Construction", desc: "L&T's turnkey civil engineering and structural delivery contract." },
        { term: "SEZ", full: "Special Economic Zone", desc: "Designated commercial zone offering tax incentives & duty concessions." },
        { term: "APSEB", full: "Andhra Pradesh State Electricity Board", desc: "Utility provider for dedicated 33/11kV substation grid power." },
        { term: "PMI PMBOK", full: "Project Management Body of Knowledge", desc: "Academic project management standard (7th ed.) applied in case study." }
      ],
      timelineSummary: [
        { phase: "Phase 1: Greenfield Inception (1996)", detail: "151-acre site selection in Madhapur & PPP charter formulation." },
        { phase: "Phase 2: Fast-Track Build (1997–98)", detail: "14-month construction of 5.2L sq ft Cyber Towers & STPI satellite earth station link." },
        { phase: "Phase 3: Flagship Launch (Nov 22, 1998)", detail: "Inauguration by AP CM N. Chandrababu Naidu with Microsoft as first anchor tenant." },
        { phase: "Phase 4: Multi-Park Expansion (2000–2035)", detail: "Scaling into Cyber Gateway, Cyber Pearl, Mindspace & Kokapet Neopolis." }
      ],
      thankYou: {
        title: "THANK YOU!",
        presenters: "N. Shravan Kumar (23EG110C43) & T. Chaitanya Kumar (23EG110C58)",
        program: "B.Tech Data Science — Project Management Case Study",
        footer: "Questions & Open Discussion"
      }
    }
  }
];

export const GATES_HOTSPOTS = [
  {
    id: "gate-1",
    label: "GATE 1 (FRONT ENTRANCE)",
    worldPos: { x: -6.0, y: 2.0, z: 15.2 },
    title: "Gate 1 - Main Front Entrance",
    description: "Front rotary concourse entrance for visitors and executive transport.",
    focusCamera: { position: { x: -14, y: 12, z: 34 }, target: { x: -6.0, y: 3.0, z: 12 } }
  },
  {
    id: "gate-2",
    label: "GATE 2 (FRONT EXIT)",
    worldPos: { x: 6.0, y: 2.0, z: 15.2 },
    title: "Gate 2 - Main Front Exit",
    description: "Main exit feeding directly onto Hitech City Road rotary junction.",
    focusCamera: { position: { x: 14, y: 12, z: 34 }, target: { x: 6.0, y: 3.0, z: 12 } }
  },
  {
    id: "gate-3",
    label: "GATE 3 (PARKING & BASEMENT EXIT 2)",
    worldPos: { x: 14.0, y: 2.0, z: -10.5 },
    title: "Gate 3 - Rear Parking & Basement Exit 2",
    description: "Rear exit connecting internal multi-level parking and IBIS Hotel corridor.",
    focusCamera: { position: { x: 36, y: 14, z: -16 }, target: { x: 14.0, y: 3.0, z: -10.5 } }
  },
  {
    id: "gate-4",
    label: "GATE 4 (REAR SERVICE ENTRANCE 2)",
    worldPos: { x: -14.0, y: 2.0, z: -10.5 },
    title: "Gate 4 - Rear Service Entrance 2",
    description: "Rear logistics quadrant gate handling facility deliveries and service vehicles.",
    focusCamera: { position: { x: -36, y: 14, z: -16 }, target: { x: -14.0, y: 3.0, z: -10.5 } }
  }
];
