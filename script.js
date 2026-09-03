/**
 * Western Multi-Family Renovation (WMFR) - Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Modal Logic (Request a Quote) ──
  const quoteModal = document.getElementById('quote-modal');
  const btnOpenQuote = document.getElementById('btn-open-quote');
  const btnCustomQuote = document.getElementById('btn-custom-remodel-quote');
  const btnCloseQuote = document.getElementById('btn-close-quote');
  const quoteForm = document.getElementById('quote-form');

  const openQuoteModal = (serviceOption = null) => {
    if (quoteModal) {
      if (serviceOption) {
        const select = document.getElementById('q-service');
        if (select) {
          select.value = serviceOption;
        }
      }
      quoteModal.classList.add('active');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeQuoteModal = () => {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (btnOpenQuote) {
    btnOpenQuote.addEventListener('click', () => openQuoteModal());
  }

  if (btnCustomQuote) {
    btnCustomQuote.addEventListener('click', () => {
      openQuoteModal('NEW: Single Family Custom Remodel (Kitchen & Bath)');
    });
  }

  if (btnCloseQuote) {
    btnCloseQuote.addEventListener('click', closeQuoteModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeQuoteModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
      closeQuoteModal();
    }
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your quote request has been received. A WMFR project executive will contact you shortly.');
      quoteForm.reset();
      closeQuoteModal();
    });
  }

  // ── 2. Navigation Active State on Click & Scroll ──
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // ── 3. Toluca Hills CGI Site Map Zone Filters ──
  const legendButtons = document.querySelectorAll('.legend-pill');
  const hotspotPins = document.querySelectorAll('.hotspot-pin');

  legendButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      legendButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      hotspotPins.forEach(pin => {
        const zone = pin.getAttribute('data-zone');
        if (filter === 'all' || zone === filter) {
          pin.style.display = 'block';
          pin.style.opacity = '1';
        } else {
          pin.style.opacity = '0.2';
        }
      });
    });
  });

  // ── 4. Mobile Menu Toggle ──
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navWrapper = document.querySelector('.nav-wrapper');

  if (mobileMenuBtn && navWrapper) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navWrapper.style.display === 'flex') {
        navWrapper.style.display = 'none';
      } else {
        navWrapper.style.display = 'flex';
        navWrapper.style.position = 'absolute';
        navWrapper.style.top = '100%';
        navWrapper.style.left = '16px';
        navWrapper.style.right = '16px';
        navWrapper.style.background = '#FFFFFF';
        navWrapper.style.padding = '16px';
        navWrapper.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        navWrapper.style.borderRadius = '12px';
        navWrapper.style.zIndex = '999';
        const navTabs = document.querySelector('.nav-tabs');
        if (navTabs) {
          navTabs.style.flexDirection = 'column';
          navTabs.style.alignItems = 'flex-start';
          navTabs.style.gap = '14px';
          navTabs.style.width = '100%';
        }
      }
    });
  }

  // ── 5. NEW: CUSTOM REMODEL Tab Click Special Action ──
  const badgeCustom = document.getElementById('badge-custom-remodel');
  if (badgeCustom) {
    badgeCustom.addEventListener('click', (e) => {
      e.stopPropagation();
      const remodelSection = document.getElementById('custom-remodel');
      if (remodelSection) {
        remodelSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        remodelSection.style.transition = 'box-shadow 0.4s ease';
        remodelSection.style.boxShadow = '0 0 30px rgba(229, 152, 25, 0.6)';
        setTimeout(() => {
          remodelSection.style.boxShadow = '';
        }, 1800);
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 6. CINEMATIC LOGO INTRO ANIMATION (REMOTION REPLICA)
  // ─────────────────────────────────────────────────────────────
  // Fast, accurate bezier easing (Newton-Raphson with bisection fallback)
  function bezierEasing(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2) return function(x) { return x; };
    const sampleValues = new Float32Array(11);
    function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
    function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
    function C(aA1)      { return 3.0 * aA1; }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }
    for (let i = 0; i < 11; ++i) {
      sampleValues[i] = calcBezier(i * 0.1, mX1, mX2);
    }
    function getTForX(aX) {
      let intervalStart = 0.0;
      let currentSample = 1;
      for (; currentSample !== 10 && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += 0.1;
      }
      --currentSample;
      const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      const guessForT = intervalStart + dist * 0.1;
      const initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= 0.001) {
        let t = guessForT;
        for (let i = 0; i < 4; ++i) {
          const currentSlope = getSlope(t, mX1, mX2);
          if (currentSlope === 0.0) return t;
          const currentX = calcBezier(t, mX1, mX2) - aX;
          t -= currentX / currentSlope;
        }
        return t;
      }
      if (initialSlope === 0.0) return guessForT;
      let aA = intervalStart, aB = intervalStart + 0.1, t = guessForT;
      for (let i = 0; i < 10; ++i) {
        const currentX = calcBezier(t, mX1, mX2) - aX;
        if (Math.abs(currentX) < 1e-7) return t;
        if (currentX > 0.0) aB = t; else aA = t;
        t = (aB + aA) * 0.5;
      }
      return t;
    }
    return function(x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      return calcBezier(getTForX(x), mY1, mY2);
    };
  }

  const introOverlay = document.getElementById('intro-overlay');
  const headerLogo = document.getElementById('header-logo');

  const introLogoPill = document.getElementById('intro-logo-pill');
  const introSunGroup = document.getElementById('intro-sun-group');
  const introCactusGroup = document.getElementById('intro-cactus-group');
  const introPalmGroup = document.getElementById('intro-palm-group');
  const introTextGroup = document.getElementById('intro-text-group');
  const introLightSweep = document.getElementById('intro-light-sweep');
  const introShimmerBar = document.querySelector('.intro-shimmer-bar');
  const introBorderRect = document.getElementById('intro-border-rect');

  const EASE_SUN = bezierEasing(0.22, 0.61, 0.36, 1);
  const EASE_TEXT = bezierEasing(0.22, 0.61, 0.36, 1);
  const EASE_BORDER = bezierEasing(0.16, 1, 0.3, 1);
  const EASE_SWEEP = bezierEasing(0.25, 0.46, 0.45, 0.94);
  const EASE_DOCK = bezierEasing(0.65, 0, 0.35, 1);
  const EASE_HERO_SCALE = bezierEasing(0.2, 0.8, 0.2, 1);
  const EASE_SHADOW = bezierEasing(0.42, 0, 0.58, 1);

  let introAnimId = null;
  let introStartTime = null;
  let introIsRunning = false;

  const PERIMETER = 2162;

  function build3dShadow(depth) {
    if (depth < 0.1) return 'none';
    const parts = [];
    const sw = Math.min(2.2, depth * 0.35);
    parts.push(
      (-sw).toFixed(1) + 'px ' + (-sw).toFixed(1) + 'px 0 #FFFFFF',
      (sw).toFixed(1) + 'px ' + (-sw).toFixed(1) + 'px 0 #FFFFFF',
      (-sw).toFixed(1) + 'px ' + (sw).toFixed(1) + 'px 0 #FFFFFF',
      (sw).toFixed(1) + 'px ' + (sw).toFixed(1) + 'px 0 #FFFFFF'
    );
    const steps = Math.max(1, Math.round(depth * 1.5));
    for (let i = 1; i <= steps; i++) {
      const frac = i / steps;
      const curDist = depth * frac * 0.85;
      const r = Math.round(225 - frac * 115);
      const g = Math.round(230 - frac * 115);
      const b = Math.round(236 - frac * 110);
      parts.push(curDist.toFixed(1) + 'px ' + curDist.toFixed(1) + 'px 0 rgb(' + r + ',' + g + ',' + b + ')');
    }
    const shadowDist = depth * 0.85;
    parts.push(
      shadowDist.toFixed(1) + 'px ' + shadowDist.toFixed(1) + 'px 0 #05182B',
      (shadowDist + 1.0).toFixed(1) + 'px ' + (shadowDist + 1.0).toFixed(1) + 'px 0 #05182B',
      (shadowDist + 2.0).toFixed(1) + 'px ' + (shadowDist + 2.0).toFixed(1) + 'px 0 rgba(5,24,43,0.4)',
      (shadowDist + 3.0).toFixed(1) + 'px ' + (shadowDist + 3.0).toFixed(1) + 'px 0 rgba(5,24,43,0.2)'
    );
    return parts.join(', ');
  }

  // Exact Remotion spring({ damping: 200 }) curve for vegetation (smooth exponential rise and glide)
  const VEG_SPRING_TABLE = [
    0, 0.0028, 0.0106, 0.0227, 0.0384, 0.0571, 0.0783, 0.1015, 0.1263, 0.1523,
    0.1793, 0.2069, 0.2348, 0.2544, 0.2912, 0.3192, 0.347, 0.3744, 0.4012, 0.4276,
    0.4533, 0.4783, 0.5026, 0.5262, 0.549, 0.571, 0.5867, 0.6126, 0.6322, 0.6511,
    0.6691, 0.6864, 0.703, 0.7188, 0.7339, 0.7483, 0.762, 0.7751, 0.7875, 0.7968,
    0.8106, 0.8213, 0.8314, 0.841, 0.8501, 0.8587, 0.8669, 0.8746, 0.882, 0.8889,
    0.8954, 0.9016, 0.9065, 0.913, 0.9182, 0.9231, 0.9277, 0.9321, 0.9362, 0.9401,
    0.9437, 0.9472, 0.9504, 0.9534, 0.9563, 0.9587, 0.9616, 0.9639, 0.9662, 0.9683,
    0.9703, 0.9721, 0.9739, 0.9755, 0.9771, 0.9785, 0.9799, 0.9812, 0.9823, 0.9835,
    0.9845, 0.9855, 0.9864, 0.9873, 0.9881, 0.9889, 0.9896, 0.9903, 0.9909, 0.9915,
    0.992, 0.9925, 0.993, 0.9935, 0.9939, 0.9943, 0.9947, 0.995, 0.9954, 0.9957, 1
  ];

  function getVegProgress(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    const idx = t * (VEG_SPRING_TABLE.length - 1);
    const low = Math.floor(idx);
    const high = Math.min(low + 1, VEG_SPRING_TABLE.length - 1);
    const frac = idx - low;
    return VEG_SPRING_TABLE[low] + frac * (VEG_SPRING_TABLE[high] - VEG_SPRING_TABLE[low]);
  }

  function clamp(val, min = 0, max = 1) {
    return Math.max(min, Math.min(max, val));
  }

  function interp(val, inMin, inMax, outMin, outMax) {
    if (inMax === inMin) return outMin;
    const t = clamp((val - inMin) / (inMax - inMin));
    return outMin + t * (outMax - outMin);
  }

  function runIntroAnimation() {
    if (!introOverlay || !introLogoPill) return;

    introIsRunning = true;
    introStartTime = null;
    lastShadowIndex = -1;
    if (introAnimId) cancelAnimationFrame(introAnimId);

    document.body.classList.add('intro-playing');
    document.body.classList.remove('intro-docking');
    introOverlay.classList.remove('hidden', 'fade-out');
    if (headerLogo) headerLogo.classList.add('dock-hidden');

    if (introCactusGroup) {
      introCactusGroup.style.opacity = '0';
      introCactusGroup.style.transform = 'translateY(50px) scale(0)';
    }
    if (introPalmGroup) {
      introPalmGroup.style.opacity = '0';
      introPalmGroup.style.transform = 'translateY(50px) scale(0)';
    }
    if (introTextGroup) {
      introTextGroup.style.transform = 'translateY(45px)';
      introTextGroup.style.opacity = '0.2';
      introTextGroup.style.webkitTextStroke = '0px transparent';
      introTextGroup.style.textShadow = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    let dockTarget = null;
    function updateDockTarget() {
      if (!headerLogo) return { deltaX: -795, deltaY: -462, scale: 0.194 };
      const r = headerLogo.getBoundingClientRect();
      const targetCenterX = r.left + r.width / 2;
      const targetCenterY = r.top + r.height / 2;
      const vCenterX = window.innerWidth / 2;
      const vCenterY = window.innerHeight / 2;
      const deltaX = targetCenterX - vCenterX;
      const deltaY = targetCenterY - vCenterY;
      const targetScale = r.height / 350;
      return { deltaX, deltaY, scale: targetScale };
    }

    const baseHeroScale = Math.min(1.45, Math.max(0.7, (window.innerWidth * 0.85) / 900));
    const startHeroScale = baseHeroScale * 0.72;

    const FPS = 30;
    const TOTAL_FRAMES = 375;

    function step(timestamp) {
      if (!introStartTime) introStartTime = timestamp;
      const elapsed = (timestamp - introStartTime) / 1000;
      const frame = elapsed * FPS;

      // 1. Sun & Text Rise (0 to 160 frames)
      const sunT = clamp(frame / 160);
      const sunEased = EASE_SUN(sunT);
      const sunTY = (1 - sunEased) * 210;
      const sunOp = interp(frame, 0, 160, 0.2, 1);
      if (introSunGroup) {
        introSunGroup.style.transform = `translateY(${sunTY.toFixed(2)}px)`;
        introSunGroup.style.opacity = sunOp.toFixed(3);
      }

      const textT = clamp(frame / 160);
      const textEased = EASE_TEXT(textT);
      const textTY = (1 - textEased) * 45;
      const textOp = 0.2 + EASE_SHADOW(textT) * 0.8;

      // 2. 3D Shadow Depth (50 -> 160 builds up to 12, 320 -> 365 flattens to 0)
      let shadowDepth = 0;
      if (frame < 50) {
        shadowDepth = 0;
      } else if (frame <= 160) {
        const sT = EASE_SHADOW((frame - 50) / 110);
        shadowDepth = sT * 12;
      } else if (frame <= 320) {
        shadowDepth = 12;
      } else if (frame <= 365) {
        const fT = EASE_DOCK((frame - 320) / 45);
        shadowDepth = (1 - fT) * 12;
      } else {
        shadowDepth = 0;
      }

      if (introTextGroup) {
        introTextGroup.style.transform = `translateY(${textTY.toFixed(2)}px) translateZ(0)`;
        introTextGroup.style.opacity = textOp.toFixed(3);
        introTextGroup.style.webkitTextStroke = shadowDepth > 0.4 ? '2px #FFFFFF' : '0px transparent';
        introTextGroup.style.textShadow = build3dShadow(shadowDepth);
      }

      // 3. Vegetation (Palm & Cactus) Pop (150 to 195 frames) - Silky Smooth Remotion Spring
      if (frame < 150) {
        if (introCactusGroup) {
          introCactusGroup.style.opacity = '0';
          introCactusGroup.style.transform = 'translateY(50px) scale(0)';
        }
        if (introPalmGroup) {
          introPalmGroup.style.opacity = '0';
          introPalmGroup.style.transform = 'translateY(50px) scale(0)';
        }
      } else if (frame <= 195) {
        const vegT = (frame - 150) / 45;
        const vegProg = getVegProgress(vegT);
        const vegScale = vegProg;
        const vegTY = (1 - vegProg) * 50;
        const vegOp = clamp(vegProg * 3.5, 0, 1);
        const vegTransform = `translateY(${vegTY.toFixed(2)}px) scale(${vegScale.toFixed(4)})`;
        if (introCactusGroup) {
          introCactusGroup.style.opacity = vegOp.toFixed(3);
          introCactusGroup.style.transform = vegTransform;
        }
        if (introPalmGroup) {
          introPalmGroup.style.opacity = vegOp.toFixed(3);
          introPalmGroup.style.transform = vegTransform;
        }
      } else {
        if (introCactusGroup) {
          introCactusGroup.style.opacity = '1';
          introCactusGroup.style.transform = 'translateY(0px) scale(1)';
        }
        if (introPalmGroup) {
          introPalmGroup.style.opacity = '1';
          introPalmGroup.style.transform = 'translateY(0px) scale(1)';
        }
      }

      // 4. Pill Border Draw (175 to 220 frames)
      if (introBorderRect) {
        if (frame < 175) {
          introBorderRect.style.strokeDashoffset = String(PERIMETER);
        } else if (frame <= 220) {
          const bT = clamp((frame - 175) / 45);
          const bEased = EASE_BORDER(bT);
          const dashOff = (1 - bEased) * PERIMETER;
          introBorderRect.style.strokeDashoffset = dashOff.toFixed(1);
        } else {
          introBorderRect.style.strokeDashoffset = '0';
        }
      }

      // 5. Light Sweep (220 to 258 frames)
      if (introLightSweep && introShimmerBar) {
        if (frame >= 220 && frame <= 258) {
          introLightSweep.style.display = 'block';
          const swT = (frame - 220) / 38;
          const swEased = EASE_SWEEP(swT);
          const sweepX = -150 + swEased * 580;
          introShimmerBar.style.transform = `translateX(${sweepX.toFixed(1)}px)`;

          let swOp = 1;
          if (frame < 224) swOp = (frame - 220) / 4;
          else if (frame > 252) swOp = (258 - frame) / 6;
          introLightSweep.style.opacity = clamp(swOp).toFixed(2);
        } else {
          introLightSweep.style.display = 'none';
          introLightSweep.style.opacity = '0';
        }
      }

      // 6. Center Scale & Docking (320 -> 365)
      let curScale = baseHeroScale;
      let curTX = 0;
      let curTY = 0;

      if (frame <= 165) {
        const scT = EASE_HERO_SCALE(frame / 165);
        curScale = startHeroScale + scT * (baseHeroScale - startHeroScale);
      } else if (frame < 320) {
        curScale = baseHeroScale;
      } else if (frame <= 365) {
        if (!dockTarget) dockTarget = updateDockTarget();
        const dkT = clamp((frame - 320) / 45);
        const dkEased = EASE_DOCK(dkT);
        curScale = baseHeroScale + dkEased * (dockTarget.scale - baseHeroScale);
        curTX = dkEased * dockTarget.deltaX;
        curTY = dkEased * dockTarget.deltaY;
      } else {
        if (!dockTarget) dockTarget = updateDockTarget();
        curScale = dockTarget.scale;
        curTX = dockTarget.deltaX;
        curTY = dockTarget.deltaY;
      }

      introLogoPill.style.transform = `translate(${curTX.toFixed(2)}px, ${curTY.toFixed(2)}px) scale(${curScale.toFixed(4)})`;

      // 7. Page Reveal Trigger at frame 350
      if (frame >= 350 && !document.body.classList.contains('intro-docking')) {
        document.body.classList.add('intro-docking');
      }

      // 8. Dock Hand-off at frame 365
      if (frame >= 365) {
        if (headerLogo && headerLogo.classList.contains('dock-hidden')) {
          headerLogo.classList.remove('dock-hidden');
        }
        if (introOverlay && !introOverlay.classList.contains('fade-out')) {
          introOverlay.classList.add('fade-out');
        }
      }

      // 9. Completion at frame 375
      if (frame >= TOTAL_FRAMES) {
        finishIntro();
        return;
      }

      introAnimId = requestAnimationFrame(step);
    }

    introAnimId = requestAnimationFrame(step);
  }

  function finishIntro() {
    if (introAnimId) cancelAnimationFrame(introAnimId);
    introAnimId = null;
    introIsRunning = false;

    if (headerLogo) headerLogo.classList.remove('dock-hidden');
    document.body.classList.remove('intro-playing');
    document.body.classList.add('intro-docking');

    if (introCactusGroup) {
      introCactusGroup.style.opacity = '1';
      introCactusGroup.style.transform = 'translateY(0px) scale(1)';
    }
    if (introPalmGroup) {
      introPalmGroup.style.opacity = '1';
      introPalmGroup.style.transform = 'translateY(0px) scale(1)';
    }
    if (introTextGroup) {
      introTextGroup.style.transform = 'translateY(0px)';
      introTextGroup.style.opacity = '1';
      introTextGroup.style.webkitTextStroke = '2px #FFFFFF';
      introTextGroup.style.textShadow = 'none';
    }

    if (introOverlay) {
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.classList.add('hidden');
      }, 400);
    }
  }

  // Auto-run intro on initial load
  runIntroAnimation();
});

