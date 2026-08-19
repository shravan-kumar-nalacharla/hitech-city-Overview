/**
 * Main Application Orchestrator for 3D Cyber Towers Presentation & Case Study Content
 */

import { CyberScene } from './scene.js';
import { SLIDES, GATES_HOTSPOTS } from './slides.js';
import { soundFx } from './audio.js';

class PresentationApp {
  constructor() {
    this.currentSlide = 0;
    this.isAutoPlaying = false;
    this.autoPlayTimer = null;
    this.isExploreMode = false;

    // DOM Elements
    this.loaderScreen = document.getElementById('loader-screen');
    this.progressBar = document.getElementById('progress-bar');
    this.progressText = document.getElementById('progress-text');

    this.slideOverlay = document.getElementById('slide-overlay');
    this.slideCard = document.getElementById('slide-card');
    this.slideCategory = document.getElementById('slide-category');
    this.slideNumberBadge = document.getElementById('slide-number-badge');
    this.slideTitle = document.getElementById('slide-title');
    this.slideSubtitle = document.getElementById('slide-subtitle');
    this.slideDescription = document.getElementById('slide-description');
    this.slideBullets = document.getElementById('slide-bullets');
    this.slideStats = document.getElementById('slide-stats');

    this.btnHitecOutline = document.getElementById('btn-hitec-outline');
    this.btnToggleCity = document.getElementById('btn-toggle-city');
    this.btnPrev = document.getElementById('btn-prev');
    this.btnNext = document.getElementById('btn-next');
    this.btnAutoPlay = document.getElementById('btn-autoplay');
    this.btnExploreMode = document.getElementById('btn-explore-mode');
    this.btnSound = document.getElementById('btn-sound');
    this.btnNotes = document.getElementById('btn-notes');
    this.btnFullscreen = document.getElementById('btn-fullscreen');
    this.btnResetCam = document.getElementById('btn-reset-cam');

    this.slideDotsContainer = document.getElementById('slide-dots');
    this.hotspotsContainer = document.getElementById('hotspots-container');

    this.notesDrawer = document.getElementById('speaker-notes-drawer');
    this.notesContent = document.getElementById('notes-content');
    this.btnCloseNotes = document.getElementById('btn-close-notes');

    this.init();
  }

  init() {
    const canvasContainer = document.getElementById('canvas-container');

    this.scene = new CyberScene(
      canvasContainer,
      (progressPercent) => this.onLoadingProgress(progressPercent),
      () => this.onLoadingComplete()
    );

    this.buildSlideDots();
    this.attachEventListeners();
  }

  onLoadingProgress(percent) {
    if (this.progressBar) this.progressBar.style.width = `${percent}%`;
    if (this.progressText) this.progressText.textContent = `${percent}%`;
  }

  onLoadingComplete() {
    setTimeout(() => {
      if (this.loaderScreen) {
        this.loaderScreen.classList.add('hidden');
      }
      this.goToSlide(0);
      // Starting Animation: Show 151-acre HITEC City red boundary line high overview, then zoom in
      this.scene.showHitecCityBoundaryView(0.1);
      setTimeout(() => {
        if (this.currentSlide === 0 && SLIDES[0].camera) {
          this.scene.animateCameraTo(SLIDES[0].camera.position, SLIDES[0].camera.target, 2.2);
        }
      }, 1600);
    }, 400);
  }

  buildSlideDots() {
    this.slideDotsContainer.innerHTML = '';
    SLIDES.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        soundFx.playClick();
        this.goToSlide(idx);
      });
      this.slideDotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    const dots = Array.from(this.slideDotsContainer.children);
    dots.forEach((dot, idx) => {
      if (idx === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  renderProjectCharterHTML(slide) {
    const d = slide.charterData;
    return `
      <div class="charter-card">
        <div class="charter-doc-stamp">PROJECT CHARTER  •  DOC ID: ${slide.docId}  •  STATUS: APPROVED</div>
        
        <div class="charter-grid">
          <div class="charter-section">
            <h4>1. Project Vision & Mission</h4>
            <p><strong>Vision:</strong> ${d.vision}</p>
            <p style="margin-top:6px;"><strong>Mission:</strong> ${d.mission}</p>
            
            <h4 style="margin-top:14px;">2. Strategic Objectives</h4>
            <ul style="padding-left:14px;">
              ${d.objectives.map(o => `<li>${o}</li>`).join('')}
            </ul>
          </div>

          <div class="charter-section">
            <h4>3. Scope Boundaries</h4>
            <p><strong>Includes:</strong></p>
            <ul style="padding-left:14px; margin-bottom:8px;">
              ${d.scopeIncludes.map(i => `<li>${i}</li>`).join('')}
            </ul>
            <p><strong>Excludes:</strong></p>
            <ul style="padding-left:14px;">
              ${d.scopeExcludes.map(e => `<li>${e}</li>`).join('')}
            </ul>
          </div>
        </div>

        <h4 style="margin-top:16px;">4. Governance Authority & Leadership</h4>
        <div class="governance-grid">
          ${d.governance.map(g => `
            <div class="gov-box">
              <div class="gov-role">${g.role}</div>
              <div class="gov-entity">${g.entity}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderStakeholderMatrix2DHTML(slide) {
    const m = slide.matrix;
    return `
      <div class="matrix-ref-wrapper">
        <!-- Top Y-Axis Label -->
        <div class="matrix-top-axis-label">▲ High Power / Influence</div>

        <div class="matrix-main-flex-row">
          <!-- Left X-Axis Label -->
          <div class="matrix-left-axis-label">◄ Low Interest</div>

          <!-- Central Matrix Grid Container -->
          <div class="matrix-cards-grid">
            
            <!-- Center Intersecting Axis Lines (runs cleanly between cards) -->
            <div class="matrix-axis-cross-container">
              <div class="axis-line-h">
                <span class="arrow-left">◄</span>
                <span class="arrow-right">►</span>
              </div>
              <div class="axis-line-v">
                <span class="arrow-top">▲</span>
                <span class="arrow-bottom">▼</span>
              </div>
              <div class="axis-center-origin">(0,0)</div>
            </div>

            <!-- Top-Left: Engaged Supporters / Keep Satisfied (Quadrant II) -->
            <div class="matrix-quadrant-card quad-peach">
              <div class="quad-icon-badge">🤝 Engaged Supporters</div>
              <h4 class="quad-headline">Quadrant II: ${m.highPowerLowInterest.title}</h4>
              <div class="quad-strat-tag">${m.highPowerLowInterest.strategy}</div>
              <div class="quad-stakeholders-list">
                ${m.highPowerLowInterest.stakeholders.map(s => `<span class="stake-pill-peach">${s}</span>`).join('')}
              </div>
            </div>

            <!-- Top-Right: Key Decision Makers / Manage Closely (Quadrant I) -->
            <div class="matrix-quadrant-card quad-rose">
              <div class="quad-icon-badge">📝 Key Decision Makers ★</div>
              <h4 class="quad-headline">Quadrant I: ${m.highPowerHighInterest.title}</h4>
              <div class="quad-strat-tag">${m.highPowerHighInterest.strategy}</div>
              <div class="quad-stakeholders-list">
                ${m.highPowerHighInterest.stakeholders.map(s => `<span class="stake-pill-rose">${s}</span>`).join('')}
              </div>
            </div>

            <!-- Bottom-Left: Minimal Impact Stakeholders / Monitor (Quadrant III) -->
            <div class="matrix-quadrant-card quad-yellow">
              <div class="quad-icon-badge">💤 Minimal Impact</div>
              <h4 class="quad-headline">Quadrant III: ${m.lowPowerLowInterest.title}</h4>
              <div class="quad-strat-tag">${m.lowPowerLowInterest.strategy}</div>
              <div class="quad-stakeholders-list">
                ${m.lowPowerLowInterest.stakeholders.map(s => `<span class="stake-pill-yellow">${s}</span>`).join('')}
              </div>
            </div>

            <!-- Bottom-Right: Potential Influencers / Keep Informed (Quadrant IV) -->
            <div class="matrix-quadrant-card quad-pink">
              <div class="quad-icon-badge">📢 Potential Influencers</div>
              <div class="quad-headline">Quadrant IV: ${m.lowPowerHighInterest.title}</div>
              <div class="quad-strat-tag">${m.lowPowerHighInterest.strategy}</div>
              <div class="quad-stakeholders-list">
                ${m.lowPowerHighInterest.stakeholders.map(s => `<span class="stake-pill-pink">${s}</span>`).join('')}
              </div>
            </div>

          </div>

          <!-- Right X-Axis Label -->
          <div class="matrix-right-axis-label">High Interest ►</div>
        </div>

        <!-- Bottom Y-Axis Label -->
        <div class="matrix-bottom-axis-label">▼ Low Power / Influence</div>
      </div>
    `;
  }

  renderGovernanceHierarchyTreeHTML(slide) {
    const h = slide.hierarchy;
    return `
      <div class="org-tree-graph">
        <!-- Level 1: Sponsor Node -->
        <div class="tree-branch-level">
          <div class="org-node-box sponsor">
            <div class="node-badge">STATE SPONSOR</div>
            <div class="node-title">${h.sponsorNode.title}</div>
            <div class="node-subtitle">${h.sponsorNode.role}</div>
          </div>
        </div>

        <!-- SVG Edge Connector 1 -> 2 (State Mandate to SPV Partners) -->
        <svg class="edge-svg-container" viewBox="0 0 800 32" preserveAspectRatio="none">
          <path d="M 400 0 L 400 16 L 200 16 L 200 32 M 400 16 L 600 16 L 600 32" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>

        <!-- Level 2: SPV Equity Owners -->
        <div class="tree-branch-level split-2">
          ${h.spvNodes.map(node => `
            <div class="org-node-box spv">
              <div class="node-badge">${node.badge}</div>
              <div class="node-title">${node.title}</div>
              <div class="node-subtitle">${node.role}</div>
            </div>
          `).join('')}
        </div>

        <!-- SVG Edge Connector 2 -> 3 (Owners to Statutory Authority & Project Lead) -->
        <svg class="edge-svg-container" viewBox="0 0 800 32" preserveAspectRatio="none">
          <path d="M 200 0 L 200 32 M 600 0 L 600 32" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>

        <!-- Level 3: Leadership & Authority -->
        <div class="tree-branch-level split-2">
          ${h.leadershipNodes.map((node, i) => `
            <div class="org-node-box ${i === 0 ? 'authority' : 'leadership'}">
              <div class="node-badge">${node.badge}</div>
              <div class="node-title">${node.title}</div>
              <div class="node-subtitle">${node.role}</div>
            </div>
          `).join('')}
        </div>

        <!-- SVG Edge Connector 3 -> 4 (Project Lead to Field Execution Units) -->
        <svg class="edge-svg-container" viewBox="0 0 800 32" preserveAspectRatio="none">
          <path d="M 600 0 L 600 16 L 133 16 L 133 32 M 600 16 L 400 16 L 400 32 M 600 16 L 667 16 L 667 32" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>

        <!-- Level 4: Execution Units -->
        <div class="tree-branch-level split-3">
          ${h.executionNodes.map(node => `
            <div class="org-node-box exec">
              <div class="node-badge">${node.badge}</div>
              <div class="node-title">${node.title}</div>
              <div class="node-subtitle">${node.role}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderTimelineHTML(slide) {
    return `
      <div class="timeline-grid">
        ${slide.timelinePhases.map(p => `
          <div class="timeline-card">
            <div class="phase-tag">${p.phase}</div>
            <div class="phase-year">${p.year}</div>
            <div class="phase-title">${p.title}</div>
            <div class="phase-details">${p.details}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderRiskRegisterHTML(slide) {
    return `
      <table class="risk-table">
        <thead>
          <tr>
            <th>Risk ID</th>
            <th>Category</th>
            <th>Risk Description</th>
            <th>Prob.</th>
            <th>Impact</th>
            <th>Mitigation Response Strategy</th>
          </tr>
        </thead>
        <tbody>
          ${slide.risks.map(r => `
            <tr>
              <td><strong>${r.id}</strong></td>
              <td>${r.category}</td>
              <td><strong>${r.risk}</strong></td>
              <td><span class="risk-badge ${r.prob === 'High' ? 'risk-high' : 'risk-med'}">${r.prob}</span></td>
              <td><span class="risk-badge ${r.impact === 'High' ? 'risk-high' : 'risk-med'}">${r.impact}</span></td>
              <td>${r.mitigation}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  renderRoadmapHTML(slide) {
    return `
      <div class="roadmap-container">
        <div>
          <h4 style="margin-bottom:14px; font-family:'Avenue', sans-serif; font-size:1.15rem;">Key PM Mitigation Lessons</h4>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${slide.lessons.map(l => `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px 16px; border-radius:8px;">
                <div style="font-weight:600; color:#0f172a; font-size:0.96rem; margin-bottom:4px;">${l.title}</div>
                <div style="font-size:0.88rem; color:#475569; line-height:1.55;">${l.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 style="margin-bottom:14px; font-family:'Avenue', sans-serif; font-size:1.15rem;">Future Expansion Horizon (2024–2035)</h4>
          <div class="roadmap-timeline">
            ${slide.roadmap.map(rm => `
              <div class="roadmap-item">
                <div class="road-year">${rm.year}</div>
                <div>
                  <div style="font-weight:600; color:#0f172a; font-size:0.96rem;">${rm.milestone}</div>
                  <div style="font-size:0.85rem; color:#64748b; margin-top:2px;">${rm.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderImpactDashboardHTML(slide) {
    return `
      <div class="impact-grid">
        ${slide.outcomes.map(o => `
          <div class="impact-card">
            <div class="impact-metric">${o.metric}</div>
            <div class="impact-label">${o.label}</div>
            <div class="impact-detail">${o.detail}</div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:20px; background:#f8fafc; border:1px solid #e2e8f0; padding:18px 22px; border-radius:10px;">
        <h4 style="font-family:'Avenue', sans-serif; font-size:1.15rem; margin-bottom:10px;">Strategic Conclusions & Academic References</h4>
        <ul style="padding-left:20px; font-size:0.92rem; color:#475569; display:flex; flex-direction:column; gap:8px; line-height:1.5;">
          ${slide.conclusions.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  renderSummaryGlossaryHTML(slide) {
    const g = slide.glossaryData;
    return `
      <div class="glossary-wrapper">
        <!-- 2-Column Grid: Full Forms & Key Timeline Summary -->
        <div class="glossary-grid">
          
          <!-- Column 1: Full Forms of Key Acronyms -->
          <div class="glossary-card">
            <div class="glossary-card-header">
              <span class="glossary-badge">ACRONYMS &amp; FULL FORMS</span>
              <h4 class="glossary-card-title">Project Management Terms</h4>
            </div>
            <div class="acronyms-list">
              ${g.acronyms.map(item => `
                <div class="acronym-row">
                  <div class="acronym-term-badge">${item.term}</div>
                  <div class="acronym-details">
                    <div class="acronym-full-name">${item.full}</div>
                    <div class="acronym-desc">${item.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: Executive Timeline & Governance Summary -->
          <div class="glossary-card">
            <div class="glossary-card-header">
              <span class="glossary-badge" style="background:#e0f2fe; color:#0369a1;">EXECUTIVE SUMMARY</span>
              <h4 class="glossary-card-title">Key Project Lifecycle Milestones</h4>
            </div>
            <div class="timeline-summary-list">
              ${g.timelineSummary.map(t => `
                <div class="summary-timeline-row">
                  <div class="summary-phase-title">${t.phase}</div>
                  <div class="summary-phase-desc">${t.detail}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Thank You Closing Banner Card -->
        <div class="thank-you-banner">
          <div class="thank-you-sparkle">✨</div>
          <h2 class="thank-you-title">${g.thankYou.title}</h2>
          <p class="thank-you-subtitle">Presented by <strong>${g.thankYou.presenters}</strong> | ${g.thankYou.program}</p>
          <div class="thank-you-footer">${g.thankYou.footer}</div>
        </div>
      </div>
    `;
  }

  goToSlide(index, customCameraTarget = null) {
    if (index < 0 || index >= SLIDES.length) return;

    this.currentSlide = index;
    const slide = SLIDES[index];

    this.slideCard.classList.add('slide-animating');

    setTimeout(() => {
      const curNum = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      const totalNum = SLIDES.length < 10 ? `0${SLIDES.length}` : `${SLIDES.length}`;

      this.slideCategory.textContent = slide.category;
      this.slideNumberBadge.textContent = `${curNum} / ${totalNum}`;
      this.slideTitle.textContent = slide.title;
      this.slideSubtitle.textContent = slide.subtitle;

      if (slide.authors) {
        this.slideDescription.innerHTML = `<div class="slide-authors">🎓 Presented by: ${slide.authors}</div>` + (slide.description || '');
      } else {
        this.slideDescription.textContent = slide.description || '';
      }

      // Check View Mode (full-content vs split-3d)
      if (slide.viewMode === 'full-content') {
        this.slideOverlay.classList.add('full-content-mode');
        this.scene.fadeCanvasOut(0.4);
        this.scene.updateHotspots([], this.hotspotsContainer, () => {});

        // Build Custom Diagram Content
        let customContent = '';
        if (slide.charterData) {
          customContent = this.renderProjectCharterHTML(slide);
        } else if (slide.matrix) {
          customContent = this.renderStakeholderMatrix2DHTML(slide);
        } else if (slide.hierarchy) {
          customContent = this.renderGovernanceHierarchyTreeHTML(slide);
        } else if (slide.timelinePhases) {
          customContent = this.renderTimelineHTML(slide);
        } else if (slide.risks) {
          customContent = this.renderRiskRegisterHTML(slide);
        } else if (slide.roadmap) {
          customContent = this.renderRoadmapHTML(slide);
        } else if (slide.outcomes) {
          customContent = this.renderImpactDashboardHTML(slide);
        } else if (slide.glossaryData) {
          customContent = this.renderSummaryGlossaryHTML(slide);
        }

        this.slideBullets.style.display = 'none';
        this.slideStats.style.display = 'none';

        // Inject custom diagram container
        let diagramContainer = document.getElementById('custom-diagram-container');
        if (!diagramContainer) {
          diagramContainer = document.createElement('div');
          diagramContainer.id = 'custom-diagram-container';
          this.slideCard.appendChild(diagramContainer);
        }
        diagramContainer.innerHTML = customContent;
        diagramContainer.style.display = 'block';

      } else {
        // Split-3D Mode
        this.slideOverlay.classList.remove('full-content-mode');
        this.scene.fadeCanvasIn(0.4);

        const diagramContainer = document.getElementById('custom-diagram-container');
        if (diagramContainer) diagramContainer.style.display = 'none';

        this.slideBullets.style.display = 'flex';
        this.slideStats.style.display = 'grid';

        if (slide.bulletPoints) {
          this.slideBullets.innerHTML = slide.bulletPoints
            .map(bullet => `<li>${bullet}</li>`)
            .join('');
        }

        if (slide.stats) {
          this.slideStats.innerHTML = slide.stats
            .map(stat => `
              <div class="stat-card">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
              </div>
            `)
            .join('');
        }

        // Animate 3D Camera to Custom Gate Target or Slide Default Camera
        if (customCameraTarget) {
          this.scene.animateCameraTo(customCameraTarget.position, customCameraTarget.target);
        } else if (slide.camera) {
          this.scene.animateCameraTo(slide.camera.position, slide.camera.target);
        }

        this.scene.updateHotspots(GATES_HOTSPOTS, this.hotspotsContainer, (hotspot) => {
          soundFx.playClick();
          this.scene.animateCameraTo(hotspot.focusCamera.position, hotspot.focusCamera.target);
        });
      }

      this.notesContent.innerHTML = `
        <h4 style="color:#0f172a; font-family:'Avenue', sans-serif; font-size:1.1rem; margin-bottom:8px;">${slide.title}</h4>
        <p><strong>Category:</strong> ${slide.category}</p>
        <p style="margin-top:8px;">${slide.subtitle}</p>
      `;

      this.slideCard.classList.remove('slide-animating');
    }, 250);

    this.updateDots();
    soundFx.playTransition();
  }

  nextSlide() {
    const nextIdx = (this.currentSlide + 1) % SLIDES.length;
    this.goToSlide(nextIdx);
  }

  prevSlide() {
    const prevIdx = (this.currentSlide - 1 + SLIDES.length) % SLIDES.length;
    this.goToSlide(prevIdx);
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;

    if (this.isAutoPlaying) {
      this.btnAutoPlay.classList.add('playing');
      document.getElementById('autoplay-icon').textContent = '⏸';
      document.getElementById('autoplay-label').textContent = 'Pause';
      this.autoPlayTimer = setInterval(() => this.nextSlide(), 8000);
    } else {
      this.btnAutoPlay.classList.remove('playing');
      document.getElementById('autoplay-icon').textContent = '▶';
      document.getElementById('autoplay-label').textContent = 'Auto-Play';
      if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
    }
  }

  toggleExploreMode() {
    this.isExploreMode = !this.isExploreMode;

    if (this.isExploreMode) {
      this.btnExploreMode.classList.add('active');
      this.btnExploreMode.innerHTML = `<span class="icon">📊</span> Slide View`;
      this.slideOverlay.style.opacity = '0';
      this.slideOverlay.style.pointerEvents = 'none';
      this.scene.fadeCanvasIn(0.3);
    } else {
      this.btnExploreMode.classList.remove('active');
      this.btnExploreMode.innerHTML = `<span class="icon">🔍</span> Explore 3D`;
      this.slideOverlay.style.opacity = '1';
      this.slideOverlay.style.pointerEvents = 'auto';
      if (SLIDES[this.currentSlide].viewMode === 'full-content') {
        this.scene.fadeCanvasOut(0.3);
      }
    }
  }

  attachEventListeners() {
    this.btnNext.addEventListener('click', () => {
      soundFx.playClick();
      this.nextSlide();
    });

    this.btnPrev.addEventListener('click', () => {
      soundFx.playClick();
      this.prevSlide();
    });

    if (this.btnHitecOutline) {
      this.btnHitecOutline.addEventListener('click', () => {
        soundFx.playClick();
        this.goToSlide(0);
        this.scene.showHitecCityBoundaryView(2.0);
      });
    }

    if (this.btnToggleCity) {
      this.btnToggleCity.addEventListener('click', () => {
        soundFx.playClick();
        const isShown = this.scene.toggleCityModel();
        if (isShown) {
          this.btnToggleCity.classList.add('active');
          this.btnToggleCity.innerHTML = `<span class="icon">🏙️</span> City Map: ON`;
        } else {
          this.btnToggleCity.classList.remove('active');
          this.btnToggleCity.innerHTML = `<span class="icon">🏙️</span> City Map: OFF`;
        }
      });
    }

    document.querySelectorAll('.btn-gate-nav:not(.outline-btn)').forEach(btn => {
      btn.addEventListener('click', () => {
        soundFx.playClick();
        const gateIdx = parseInt(btn.dataset.gate, 10);
        const hotspot = GATES_HOTSPOTS[gateIdx];

        // Highlight active gate button
        document.querySelectorAll('.btn-gate-nav').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Jump to Slide 5 (Perimeter Infrastructure & 4 Gates) with gate camera target
        this.goToSlide(4, hotspot ? hotspot.focusCamera : null);
      });
    });

    this.btnAutoPlay.addEventListener('click', () => {
      soundFx.playClick();
      this.toggleAutoPlay();
    });

    this.btnExploreMode.addEventListener('click', () => {
      soundFx.playClick();
      this.toggleExploreMode();
    });

    this.btnSound.addEventListener('click', () => {
      const state = soundFx.toggleSound();
      document.getElementById('sound-icon').textContent = state ? '🔊' : '🔇';
    });

    this.btnNotes.addEventListener('click', () => {
      soundFx.playClick();
      this.notesDrawer.classList.toggle('open');
    });

    this.btnCloseNotes.addEventListener('click', () => {
      this.notesDrawer.classList.remove('open');
    });

    this.btnResetCam.addEventListener('click', () => {
      soundFx.playClick();
      this.goToSlide(0);
    });

    this.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        this.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        this.btnFullscreen.click();
      } else if (e.key.toLowerCase() === 'n') {
        this.notesDrawer.classList.toggle('open');
      } else if (e.key.toLowerCase() === 'r') {
        this.btnResetCam.click();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new PresentationApp();
});
