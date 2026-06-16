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

// Initialize
preloadImages();
preloadSecondImages();
resizeCanvas();
