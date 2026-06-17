import './style.css'
import Lenis from '@studio-freight/lenis';

// --- FIRST ANIMATION GLOBALS ---
const canvas = document.getElementById('animation-canvas');
const context = canvas.getContext('2d');
const heroTitle = document.getElementById('hero-title');
const heroInfo = document.getElementById('hero-info');

const frameCount = 240;
const currentFrame = index => (
  `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
let loadedImages = 0;

// --- SECOND ANIMATION GLOBALS ---
const secondCanvas = document.getElementById('second-canvas');
const secondContext = secondCanvas.getContext('2d');
const manifestoSection = document.getElementById('manifesto-section');
const manifestoTitle = document.getElementById('manifesto-title');
const manifestoInfo = document.getElementById('manifesto-info');

const secondFrameCount = 300;
const currentSecondFrame = index => (
  `/second-frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const secondImages = [];
let loadedSecondImages = 0;

// --- FLAVORS ANIMATION GLOBALS ---
const flavorsSection = document.getElementById('flavors-section');
const canClassic = document.getElementById('can-classic');
const canCherry = document.getElementById('can-cherry');
const canCaffeine = document.getElementById('can-caffeine');

const textClassic = document.getElementById('text-classic');
const textCherry = document.getElementById('text-cherry');
const textCaffeine = document.getElementById('text-caffeine');

// --- EVOLUTION GLOBALS ---
const evolutionSection = document.getElementById('evolution-section');
const evolutionYearBg = document.getElementById('evolution-year-bg');
const evoCan1992 = document.getElementById('evo-can-1992');
const evoCan2000 = document.getElementById('evo-can-2000');
const evoCan2011 = document.getElementById('evo-can-2011');
const evoCan2018 = document.getElementById('evo-can-2018');
const evoCanClassic = document.getElementById('evo-can-classic');
const evolutionInfoPanel = document.getElementById('evolution-info-panel');
const evoInfoArchiveLabel = document.getElementById('evo-info-archive-label');

// --- PRADA ANIMATION GLOBALS ---
const pradaSection = document.getElementById('prada-section');
const pradaTextContainer = document.getElementById('prada-text-container');
const pradaArtwork = document.getElementById('prada-artwork');
const pradaBigX = document.getElementById('prada-big-x');
const pradaCokeCan = document.getElementById('prada-coke-can');

// --- FAQ GLOBALS ---
const faqCan1 = document.getElementById('faq-can-1');
const faqCan2 = document.getElementById('faq-can-2');
const faqCan3 = document.getElementById('faq-can-3');

// --- PRELOADERS ---
function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      loadedImages++;
      
      const scrollTop = window.scrollY;
      const scrubHeight = window.innerHeight * 3;
      const scrollFraction = scrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / scrubHeight));
      const targetIndex = Math.max(0, Math.floor(scrollFraction * (frameCount - 1)));
      
      if (i - 1 === targetIndex) {
        updateCanvas(targetIndex);
      }
    };
    images.push(img);
  }
}

function preloadSecondImages() {
  for (let i = 1; i <= secondFrameCount; i++) {
    const img = new Image();
    img.src = currentSecondFrame(i);
    img.onload = () => {
      loadedSecondImages++;
      
      if (!manifestoSection) return;
      
      const rect = manifestoSection.getBoundingClientRect();
      const relativeScroll = -rect.top;
      const sectionScrubHeight = window.innerHeight * 3;
      const scrollFraction = sectionScrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, relativeScroll / sectionScrubHeight));
      const targetIndex = Math.max(0, Math.floor(scrollFraction * (secondFrameCount - 1)));
      
      if (i - 1 === targetIndex) {
        updateSecondCanvas(targetIndex);
      }
      // Draw first frame instantly if we are at the top
      if (i === 1 && targetIndex === 0) {
        updateSecondCanvas(0);
      }
    };
    secondImages.push(img);
  }
}


// --- CANVAS UPDATERS ---
function updateCanvas(index) {
  if (images[index] && images[index].complete && images[index].naturalWidth > 0) {
    const img = images[index];
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }
}

function updateSecondCanvas(index) {
  if (secondImages[index] && secondImages[index].complete && secondImages[index].naturalWidth > 0) {
    const img = secondImages[index];
    
    const canvasRatio = secondCanvas.width / secondCanvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawHeight = secondCanvas.height;
      drawWidth = img.width * (secondCanvas.height / img.height);
      offsetX = (secondCanvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = secondCanvas.width;
      drawHeight = img.height * (secondCanvas.width / img.width);
      offsetX = 0;
      offsetY = (secondCanvas.height - drawHeight) / 2;
    }

    secondContext.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
    secondContext.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }
}


// --- MAIN LOOP ---
function updateFrame() {
  const scrollTop = window.scrollY;
  const scrubHeight = window.innerHeight * 3; // 300vh for video scrubbing
  
  // 1. Update First Video Frame
  const scrollFraction = scrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / scrubHeight));
  const frameIndex = Math.max(0, Math.floor(scrollFraction * (frameCount - 1)));
  updateCanvas(frameIndex);
  
  // 2. Control Hero Title
  const titleFadeStart = window.innerHeight * 2.0; 
  const titleFadeEnd = window.innerHeight * 2.8; 
  
  if (scrollTop < titleFadeStart) {
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = 'translateY(40px)';
  } else if (scrollTop >= titleFadeStart && scrollTop <= titleFadeEnd) {
    const fadeFraction = (scrollTop - titleFadeStart) / (titleFadeEnd - titleFadeStart);
    const easeOut = 1 - Math.pow(1 - fadeFraction, 3);
    heroTitle.style.opacity = easeOut;
    heroTitle.style.transform = `translateY(${40 - (easeOut * 40)}px)`;
  } else {
    heroTitle.style.opacity = 1;
    heroTitle.style.transform = 'translateY(0px)';
  }
  
  // 3. Control Hero Info
  const infoFadeStart = window.innerHeight * 2.8; 
  const infoFadeEnd = window.innerHeight * 3.5; 
  
  if (scrollTop < infoFadeStart) {
    heroInfo.style.opacity = 0;
    heroInfo.style.transform = 'translateY(40px)';
  } else if (scrollTop >= infoFadeStart && scrollTop <= infoFadeEnd) {
    const fadeFraction = (scrollTop - infoFadeStart) / (infoFadeEnd - infoFadeStart);
    const easeOut = 1 - Math.pow(1 - fadeFraction, 3);
    heroInfo.style.opacity = easeOut;
    heroInfo.style.transform = `translateY(${40 - (easeOut * 40)}px)`;
  } else {
    heroInfo.style.opacity = 1;
    heroInfo.style.transform = 'translateY(0px)';
  }
  
  // 4. Update Second Video Frame and Elements
  if (manifestoSection) {
    const rect = manifestoSection.getBoundingClientRect();
    const relativeScroll = -rect.top; // Positive when section top reaches viewport top
    const sectionScrubHeight = window.innerHeight * 3; // Scrub over 300vh
    
    // Scrub canvas
    const secondScrollFraction = sectionScrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, relativeScroll / sectionScrubHeight));
    const secondFrameIndex = Math.max(0, Math.floor(secondScrollFraction * (secondFrameCount - 1)));
    updateSecondCanvas(secondFrameIndex);
    
    // Animate Manifesto Title
    const mTitleFadeStart = window.innerHeight * 1.5;
    const mTitleFadeEnd = window.innerHeight * 2.2;
    
    if (relativeScroll < mTitleFadeStart) {
      manifestoTitle.style.opacity = 0;
      manifestoTitle.style.transform = 'translateY(40px)';
    } else if (relativeScroll >= mTitleFadeStart && relativeScroll <= mTitleFadeEnd) {
      const fadeFrac = (relativeScroll - mTitleFadeStart) / (mTitleFadeEnd - mTitleFadeStart);
      const easeOut = 1 - Math.pow(1 - fadeFrac, 3);
      manifestoTitle.style.opacity = easeOut;
      manifestoTitle.style.transform = `translateY(${40 - (easeOut * 40)}px)`;
    } else {
      manifestoTitle.style.opacity = 1;
      manifestoTitle.style.transform = 'translateY(0px)';
    }

    // Animate Manifesto Info
    const mInfoFadeStart = window.innerHeight * 2.2;
    const mInfoFadeEnd = window.innerHeight * 2.9;
    
    if (relativeScroll < mInfoFadeStart) {
      manifestoInfo.style.opacity = 0;
      manifestoInfo.style.transform = 'translateY(40px)';
    } else if (relativeScroll >= mInfoFadeStart && relativeScroll <= mInfoFadeEnd) {
      const fadeFrac = (relativeScroll - mInfoFadeStart) / (mInfoFadeEnd - mInfoFadeStart);
      const easeOut = 1 - Math.pow(1 - fadeFrac, 3);
      manifestoInfo.style.opacity = easeOut;
      manifestoInfo.style.transform = `translateY(${40 - (easeOut * 40)}px)`;
    } else {
      manifestoInfo.style.opacity = 1;
      manifestoInfo.style.transform = 'translateY(0px)';
    }
  }
  
  // 5. Update Flavors Fan-Out Animation
  if (flavorsSection && canClassic && canCherry && canCaffeine) {
    const rect = flavorsSection.getBoundingClientRect();
    const relativeScroll = -rect.top;
    const sectionScrubHeight = window.innerHeight * 2; // 300vh total, 200vh scrub
    
    // Calculate progress from 0 to 1
    const progress = sectionScrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, relativeScroll / sectionScrubHeight));
    
    // Easing function for smoother fan-out
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    // Animate Cans
    canClassic.style.transform = `scale(${1 + (easeOut * 0.15)})`;
    
    // Translate out further on desktop than mobile
    const xOffset = window.innerWidth > 768 ? 60 : 40; 
    
    canCherry.style.transform = `translateX(${-xOffset * easeOut}%) rotate(${-15 * easeOut}deg) scale(${0.8 + (easeOut * 0.1)})`;
    canCaffeine.style.transform = `translateX(${xOffset * easeOut}%) rotate(${15 * easeOut}deg) scale(${0.8 + (easeOut * 0.1)})`;
    
    // Animate Text
    if (progress > 0.3) {
      const textProgress = Math.min(1, (progress - 0.3) / 0.7);
      const textEaseOut = 1 - Math.pow(1 - textProgress, 3);
      
      textClassic.style.opacity = textEaseOut;
      textClassic.style.transform = `translate(-50%, ${20 - (20 * textEaseOut)}px)`; 
      
      textCherry.style.opacity = textEaseOut;
      textCherry.style.transform = `translateY(${20 - (20 * textEaseOut)}px)`;
      
      textCaffeine.style.opacity = textEaseOut;
      textCaffeine.style.transform = `translateY(${20 - (20 * textEaseOut)}px)`;
    } else {
      textClassic.style.opacity = 0;
      textClassic.style.transform = `translate(-50%, 20px)`;
      textCherry.style.opacity = 0;
      textCherry.style.transform = `translateY(20px)`;
      textCaffeine.style.opacity = 0;
      textCaffeine.style.transform = `translateY(20px)`;
    }
  }

  // 5.5 Update Evolution Section Parallax
  if (evolutionSection) {
    const rect = evolutionSection.getBoundingClientRect();
    const relativeScroll = -rect.top;
    const sectionScrubHeight = window.innerHeight * 3; // 400vh total -> 300vh scrub
    
    const progress = sectionScrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, relativeScroll / sectionScrubHeight));
    
    // 1. Scroll-based animation of the "EVOLUTION" title
    if (evolutionInfoPanel) {
      if (progress < 0.2) {
        const p = progress / 0.2; // 0 to 1
        const easeP = 1 - Math.pow(1 - p, 3); // ease-out
        
        // Large & centered to small & top
        const startY = window.innerHeight * 0.35; // approximate vertical center offset
        const currentY = startY * (1 - easeP);
        const currentScale = 5.5 - (4.5 * easeP); // Huge scale(5.5) to occupy screen width
        
        // Title is fully visible while massive
        const titleOpacity = 1;
        
        evolutionInfoPanel.style.transform = `translate(-50%, ${currentY}px) scale(${currentScale})`;
        evolutionInfoPanel.style.opacity = titleOpacity;
        
        // Keep other texts fully invisible until p is near 0.2
        const subheaderOpacity = Math.max(0, (p - 0.7) / 0.3);
        if (evoInfoArchiveLabel) evoInfoArchiveLabel.style.opacity = subheaderOpacity;
        evoInfoName.style.opacity = subheaderOpacity;
        evoInfoDesc.style.opacity = subheaderOpacity;
      } else {
        // Final top position
        evolutionInfoPanel.style.transform = 'translate(-50%, 0px) scale(1)';
        evolutionInfoPanel.style.opacity = '0.9';
        if (evoInfoArchiveLabel) evoInfoArchiveLabel.style.opacity = '0.9';
        // Ensure default subheader opacity when not currently hovered
        if (!evolutionCansContainer.classList.contains('has-hovered')) {
          evoInfoName.style.opacity = '0.9';
          evoInfoDesc.style.opacity = '0.9';
        }
      }
    }

    if (progress > 0) {
      // Phase 1: 1992 Can Entrance (0.20 to 0.40)
      if (progress < 0.20) {
        // Before cans appear
        evoCan1992.style.opacity = 0;
        evoCan2000.style.opacity = 0;
        evoCan2011.style.opacity = 0;
        evoCan2018.style.opacity = 0;
        evoCanClassic.style.opacity = 0;
      }
      else if (progress >= 0.20 && progress < 0.40) {
        const p = (progress - 0.20) / 0.20;
        const easeP = 1 - Math.pow(1 - p, 3);
        
        evoCan1992.style.opacity = Math.min(1, easeP * 2);
        evoCan1992.style.transform = `translateX(25%) scale(${0.8 + 0.2 * easeP}) translateY(${50 * (1 - easeP)}px)`;
        
        evoCan2000.style.opacity = 0;
        evoCan2011.style.opacity = 0;
        evoCan2018.style.opacity = 0;
        evoCanClassic.style.opacity = 0;
      }
      // Phase 2: 2000 peels out (0.40 to 0.55)
      else if (progress >= 0.40 && progress < 0.55) {
        const p = (progress - 0.40) / 0.15;
        const easeP = 1 - Math.pow(1 - p, 3);
        
        evoCan1992.style.opacity = 1;
        evoCan1992.style.transform = 'translateX(25%) scale(1) translateY(0px)';
        
        evoCan2000.style.opacity = Math.min(1, easeP * 2);
        evoCan2000.style.transform = `translateX(${25 - easeP * 15}%) scale(${1 - easeP * 0.1})`;
        
        evoCan2011.style.opacity = 0;
        evoCan2018.style.opacity = 0;
        evoCanClassic.style.opacity = 0;
      } 
      // Phase 3: 2011 peels out (0.55 to 0.70)
      else if (progress >= 0.55 && progress < 0.70) {
        const p = (progress - 0.55) / 0.15;
        const easeP = 1 - Math.pow(1 - p, 3);
        
        evoCan1992.style.opacity = 1;
        evoCan1992.style.transform = 'translateX(25%) scale(1) translateY(0px)';
        
        evoCan2000.style.opacity = 1;
        evoCan2000.style.transform = `translateX(10%) scale(0.9)`;
        
        evoCan2011.style.opacity = Math.min(1, easeP * 2);
        evoCan2011.style.transform = `translateX(${10 - easeP * 15}%) scale(${0.9 - easeP * 0.1})`;
        
        evoCan2018.style.opacity = 0;
        evoCanClassic.style.opacity = 0;
      }
      // Phase 4: 2018 peels out (0.70 to 0.85)
      else if (progress >= 0.70 && progress < 0.85) {
        const p = (progress - 0.70) / 0.15;
        const easeP = 1 - Math.pow(1 - p, 3);
        
        evoCan1992.style.opacity = 1;
        evoCan1992.style.transform = 'translateX(25%) scale(1) translateY(0px)';
        
        evoCan2000.style.opacity = 1;
        evoCan2000.style.transform = `translateX(10%) scale(0.9)`;
        
        evoCan2011.style.opacity = 1;
        evoCan2011.style.transform = `translateX(-5%) scale(0.8)`;
        
        evoCan2018.style.opacity = Math.min(1, easeP * 2);
        evoCan2018.style.transform = `translateX(${-5 - easeP * 15}%) scale(${0.8 - easeP * 0.1})`;
        
        evoCanClassic.style.opacity = 0;
      }
      // Phase 5: Classic peels out (0.85 to 1.0)
      else if (progress >= 0.85) {
        const p = Math.min(1, (progress - 0.85) / 0.15);
        const easeP = 1 - Math.pow(1 - p, 3);
        
        evoCan1992.style.opacity = 1;
        evoCan1992.style.transform = 'translateX(25%) scale(1) translateY(0px)';
        
        evoCan2000.style.opacity = 1;
        evoCan2000.style.transform = `translateX(10%) scale(0.9)`;
        
        evoCan2011.style.opacity = 1;
        evoCan2011.style.transform = `translateX(-5%) scale(0.8)`;
        
        evoCan2018.style.opacity = 1;
        evoCan2018.style.transform = `translateX(-20%) scale(0.7)`;
        
        evoCanClassic.style.opacity = Math.min(1, easeP * 2);
        evoCanClassic.style.transform = `translateX(${-20 - easeP * 15}%) scale(${0.7 - easeP * 0.1})`;
      }
    } else {
      evoCan1992.style.transform = `translateX(25%)`;
      evoCan1992.style.opacity = 0;
      evoCan2000.style.opacity = 0;
      evoCan2011.style.opacity = 0;
      evoCan2018.style.opacity = 0;
      evoCanClassic.style.opacity = 0;
    }
  }

  // 6. Update Prada Section Parallax
  if (pradaSection && pradaTextContainer && pradaArtwork && pradaBigX) {
    const rect = pradaSection.getBoundingClientRect();
    const relativeScroll = -rect.top;
    const sectionScrubHeight = window.innerHeight * 2; // 300vh total -> 200vh scrub
    
    const progress = sectionScrubHeight <= 0 ? 0 : Math.min(1, Math.max(0, relativeScroll / sectionScrubHeight));
    
    // Animate Big X
    const xProgress = Math.min(1, progress / 0.5); 
    const xEase = 1 - Math.pow(1 - xProgress, 3);
    const xScale = 3 - (2 * xEase); 
    const xOpacity = 0.05 * xEase; 
    pradaBigX.style.transform = `scale(${xScale})`;
    pradaBigX.style.opacity = xOpacity;

    // Artwork slides in from right
    if (progress > 0.1) {
      const artProgress = Math.min(1, (progress - 0.1) / 0.7);
      const artEaseOut = 1 - Math.pow(1 - artProgress, 3);
      pradaArtwork.style.opacity = artEaseOut;
      pradaArtwork.style.transform = `translateX(${100 - (100 * artEaseOut)}px)`;
    } else {
      pradaArtwork.style.opacity = 0;
      pradaArtwork.style.transform = `translateX(100px)`;
    }
    
    // Typography slides in from left
    if (progress > 0.2) {
      const textProgress = Math.min(1, (progress - 0.2) / 0.7);
      const textEaseOut = 1 - Math.pow(1 - textProgress, 3);
      pradaTextContainer.style.opacity = textEaseOut;
      pradaTextContainer.style.transform = `translateX(${-100 + (100 * textEaseOut)}px)`;
    } else {
      pradaTextContainer.style.opacity = 0;
      pradaTextContainer.style.transform = `translateX(-100px)`;
    }
    
    // Coke Can slides up to overlap poster
    if (pradaCokeCan) {
      if (progress > 0.3) {
        const canProgress = Math.min(1, (progress - 0.3) / 0.7);
        const canEaseOut = 1 - Math.pow(1 - canProgress, 3);
        pradaCokeCan.style.opacity = canEaseOut;
        pradaCokeCan.style.transform = `translateY(${100 - (100 * canEaseOut)}px)`;
      } else {
        pradaCokeCan.style.opacity = 0;
        pradaCokeCan.style.transform = `translateY(100px)`;
      }
    }
  }

  // 7. Update FAQ Floating Cans Parallax
  const faqSection = document.getElementById('faq-section');
  if (faqSection && faqCan1 && faqCan2 && faqCan3) {
    const rect = faqSection.getBoundingClientRect();
    const viewportOffset = rect.top; 
    
    // Can 1 floats up slowly
    faqCan1.style.transform = `translateY(${viewportOffset * 0.2}px) rotate(${viewportOffset * 0.02}deg)`;
    
    // Can 2 floats down faster
    faqCan2.style.transform = `translateY(${viewportOffset * -0.3}px) rotate(${viewportOffset * -0.05}deg)`;
    
    // Can 3 floats up very slowly
    faqCan3.style.transform = `translateY(${viewportOffset * 0.1}px) rotate(${viewportOffset * 0.01}deg)`;
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  if (secondCanvas) {
    secondCanvas.width = window.innerWidth;
    secondCanvas.height = window.innerHeight;
  }
  
  updateFrame();
}

window.addEventListener('resize', resizeCanvas);


// --- START ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  updateFrame();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- HOVER LOGIC ---
const flavorsGlow = document.getElementById('flavors-glow');
if (canCherry && canCaffeine && canClassic && flavorsGlow) {
  // Ensure the transition property is explicitly set so the styles animate smoothly
  flavorsGlow.style.transition = 'background 0.7s ease, opacity 0.7s ease';
  
  // Set explicit default background and opacity
  const defaultBackground = 'radial-gradient(circle, rgba(228,30,42,0.05) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)';
  const defaultOpacity = '0.5';

  const cherryBackground = 'radial-gradient(circle, rgba(228,30,42,0.4) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)';
  const cherryOpacity = '0.9';

  const caffeineBackground = 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)';
  const caffeineOpacity = '0.9';

  const classicBackground = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)';
  const classicOpacity = '0.9';
  
  // Initialize to default
  flavorsGlow.style.background = defaultBackground;
  flavorsGlow.style.opacity = defaultOpacity;

  canCherry.addEventListener('mouseenter', () => { 
    flavorsGlow.style.background = cherryBackground;
    flavorsGlow.style.opacity = cherryOpacity;
  });
  canCherry.addEventListener('mouseleave', () => { 
    flavorsGlow.style.background = defaultBackground;
    flavorsGlow.style.opacity = defaultOpacity;
  });
  
  canCaffeine.addEventListener('mouseenter', () => { 
    flavorsGlow.style.background = caffeineBackground;
    flavorsGlow.style.opacity = caffeineOpacity;
  });
  canCaffeine.addEventListener('mouseleave', () => { 
    flavorsGlow.style.background = defaultBackground;
    flavorsGlow.style.opacity = defaultOpacity;
  });

  canClassic.addEventListener('mouseenter', () => { 
    flavorsGlow.style.background = classicBackground;
    flavorsGlow.style.opacity = classicOpacity;
  });
  canClassic.addEventListener('mouseleave', () => { 
    flavorsGlow.style.background = defaultBackground;
    flavorsGlow.style.opacity = defaultOpacity;
  });
}

// --- EVOLUTION HOVER LOGIC ---
const evolutionCansContainer = document.getElementById('evolution-cans-container');
const evoInfoYear = document.getElementById('evo-info-year');
const evoInfoName = document.getElementById('evo-info-name');
const evoInfoDesc = document.getElementById('evo-info-desc');

const evolutionData = {
  'evo-can-1992': {
    year: '1992',
    name: 'The Silver Wave Era',
    description: 'Introduced the iconic dynamic red ribbon logo wrapped around a clean silver canvas, defining the look of a generation.'
  },
  'evo-can-2000': {
    year: '2000',
    name: 'Millennial Bold',
    description: 'Stepping into the new millennium with oversized vertical typography and a striking contrast of bold red against sleek metallic silver.'
  },
  'evo-can-2011': {
    year: '2011',
    name: 'Marc Jacobs Special Edition',
    description: 'A high-fashion collaboration featuring playful black bowties and sophisticated silhouettes, merging runway couture with everyday refreshment.'
  },
  'evo-can-2018': {
    year: '2018',
    name: 'Minimalist Red Stripe',
    description: 'A modern design featuring a bold, vertical red stripe running down the center of a streamlined matte silver can.'
  },
  'evo-can-classic': {
    year: 'Classic',
    name: 'Signature Diet Coke',
    description: 'The legendary and beloved design representing zero compromise, absolute clarity, and unapologetic effervescence.'
  }
};

const defaultEvoInfo = {
  year: 'EVOLUTION',
  name: 'Hover a can to explore history',
  description: 'Trace the visual history of Diet Coke through its design milestones.'
};

if (evolutionCansContainer && evoInfoYear && evoInfoName && evoInfoDesc) {
  const wrappers = evolutionCansContainer.querySelectorAll('.evo-can-wrapper');
  let activeTimeout = null;
  let currentlyHoveredId = null;

  const updateHoverState = (mouseX) => {
    let closestWrapper = null;
    let minDistance = Infinity;

    wrappers.forEach(wrapper => {
      // We only target elements that are actually active/visible in scroll space
      // Check if wrapper opacity is non-zero (so hidden cans in timeline aren't hovered)
      const opacity = window.getComputedStyle(wrapper).opacity;
      if (parseFloat(opacity) < 0.1) return;

      const img = wrapper.querySelector('.evolution-can-img');
      if (!img) return;

      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - centerX);

      // We only trigger if cursor is within a reasonable distance or is the absolute closest
      if (distance < minDistance) {
        minDistance = distance;
        closestWrapper = wrapper;
      }
    });

    if (closestWrapper && closestWrapper.id !== currentlyHoveredId) {
      currentlyHoveredId = closestWrapper.id;
      const data = evolutionData[currentlyHoveredId];

      // Clear previous timeout if any
      if (activeTimeout) clearTimeout(activeTimeout);

      // Add hover state classes
      evolutionCansContainer.classList.add('has-hovered');
      wrappers.forEach(w => {
        if (w === closestWrapper) {
          w.classList.add('is-hovered');
        } else {
          w.classList.remove('is-hovered');
        }
      });

      // Fade out current text
      evoInfoYear.style.opacity = '0';
      evoInfoName.style.opacity = '0';
      evoInfoDesc.style.opacity = '0';

      // Swap content and fade in
      activeTimeout = setTimeout(() => {
        evoInfoYear.textContent = data.year;
        evoInfoName.textContent = data.name;
        evoInfoDesc.textContent = data.description;

        evoInfoYear.style.color = '#E41E2A'; // Red color on hover
        evoInfoYear.style.transform = 'scale(1.05)';

        evoInfoYear.style.opacity = '1';
        evoInfoName.style.opacity = '1';
        evoInfoDesc.style.opacity = '1';
      }, 150);
    }
  };

  evolutionCansContainer.addEventListener('mousemove', (e) => {
    updateHoverState(e.clientX);
  });

  evolutionCansContainer.addEventListener('mouseleave', () => {
    if (activeTimeout) clearTimeout(activeTimeout);
    currentlyHoveredId = null;

    // Remove hover state classes
    evolutionCansContainer.classList.remove('has-hovered');
    wrappers.forEach(w => w.classList.remove('is-hovered'));

    // Fade out current text
    evoInfoYear.style.opacity = '0';
    evoInfoName.style.opacity = '0';
    evoInfoDesc.style.opacity = '0';

    // Swap back to defaults and fade in
    activeTimeout = setTimeout(() => {
      evoInfoYear.textContent = defaultEvoInfo.year;
      evoInfoName.textContent = defaultEvoInfo.name;
      evoInfoDesc.textContent = defaultEvoInfo.description;

      evoInfoYear.style.color = '#FFFFFF';
      evoInfoYear.style.transform = 'scale(1)';

      evoInfoYear.style.opacity = '0.9';
      evoInfoName.style.opacity = '0.9';
      evoInfoDesc.style.opacity = '0.9';
    }, 150);
  });
}

// Initialize
preloadImages();
preloadSecondImages();
resizeCanvas();
