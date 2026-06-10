// QRCraft - Core JS Logik

// Global state
const state = {
  text: 'https://google.com',
  qrColorFg: '#090a0f',
  qrColorBg: '#ffffff',
  qrStyle: 'square', // square, rounded, star
  presetLogo: 'none', // none, link, wifi, envelope, youtube, facebook, instagram, twitter, github
  customLogoSrc: null, // HTMLImageElement
  customLogoName: '',
  logoSizeScale: 18, // 10 to 28
  logoBgCircle: true,
  frameStyle: 'none', // none, badge, top, bubble, bracket, phone
  frameText: 'SCAN ME',
  frameColorBg: '#6366f1',
  frameColorText: '#ffffff',
  frameFont: 'outfit',
  framePadding: 2, // 1: thin, 2: medium, 3: thick
  quality: 3, // resolution factor (1: SD, 3: HD, 5: Ultra)
};

// Font Maping for Canvas
const FONT_MAP = {
  outfit: "'Outfit', sans-serif",
  sans: "'Plus Jakarta Sans', sans-serif",
  mono: "'Space Mono', monospace",
  bebas: "'Bebas Neue', sans-serif",
  serif: "'Playfair Display', serif",
  hand: "'Caveat', cursive"
};

// Brand SVG Path Pressets (Viewbox 16x16)
const BRAND_PRESETS = {
  link: {
    path: "M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.8-1.8a3 3 0 0 0 .002-4.244.5.5 0 0 1 .707-.707 4 4 0 0 1-.002 5.658l-1.8 1.8a4 4 0 1 1-5.657-5.657l1.42-1.42a.5.5 0 0 1 .708.708zm3.06-3.06a.5.5 0 0 1 .707 0l1.42 1.42a4 4 0 1 1-5.657 5.657l-1.8 1.8a4 4 0 0 1-5.658-.002.5.5 0 0 1 .707-.707 3 3 0 0 0 4.244.002l1.8-1.8a3 3 0 0 0 0-4.243.5.5 0 0 1 0-.707z",
    color: "#6366f1",
  },
  wifi: {
    path: "M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049 M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065 M11.046 10.453c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09 A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091z M9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707",
    color: "#10b981",
  },
  envelope: {
    path: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722z",
    color: "#64748b",
  },
  youtube: {
    path: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z",
    color: "#ef4444",
  },
  facebook: {
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
    color: "#1877f2",
  },
  instagram: {
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    color: "#e1306c",
  },
  twitter: {
    path: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z",
    color: "#0f111a",
  },
  github: {
    path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8",
    color: "#0f111a",
  }
};

// Initalize Listners on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupAccordion();
  bindInputs();
  
  // Set inital colors and genereate
  syncColorValues();
  
  // Tigger redraw after fonts are ready to ensure canvas renders custum styles corectly
  document.fonts.ready.then(() => {
    generateQR();
  });
});

// Setup accordian toggling (sinlge expand style)
function setupAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('button');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Keep color picker inputs and thier hex text inputs in sync
function syncColorValues() {
  document.getElementById('qr-color-fg-hex').value = state.qrColorFg.toUpperCase();
  document.getElementById('qr-color-bg-hex').value = state.qrColorBg.toUpperCase();
  document.getElementById('frame-color-bg-hex').value = state.frameColorBg.toUpperCase();
  document.getElementById('frame-color-text-hex').value = state.frameColorText.toUpperCase();
}

// Bind all HTML inputs to state and tigger updates
function bindInputs() {
  // 1. Text input & Generate Button
  const generateBtn = document.getElementById('btn-generate');
  const qrTextInput = document.getElementById('qr-text');

  generateBtn.addEventListener('click', () => {
    state.text = qrTextInput.value || ' ';
    generateQR();
  });

  qrTextInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      generateBtn.click();
    }
  });

  // 2. Color setups
  setupColorPair('qr-color-fg', 'qr-color-fg-hex', 'qrColorFg');
  setupColorPair('qr-color-bg', 'qr-color-bg-hex', 'qrColorBg');
  setupColorPair('frame-color-bg', 'frame-color-bg-hex', 'frameColorBg');
  setupColorPair('frame-color-text', 'frame-color-text-hex', 'frameColorText');

  // 3. Logo Options
  const logoSizeInput = document.getElementById('logo-size');
  logoSizeInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.logoSizeScale = val;
    document.getElementById('logo-size-val').innerText = `${val}%`;
    generateQR();
  });

  const logoBgCheckbox = document.getElementById('logo-bg-circle');
  logoBgCheckbox.addEventListener('change', (e) => {
    state.logoBgCircle = e.target.checked;
    generateQR();
  });

  // Custum logo file loadar
  const logoFileInput = document.getElementById('logo-file-input');
  logoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          state.customLogoSrc = img;
          state.customLogoName = file.name;
          state.presetLogo = 'none'; // clear presets
          
          // Show file statuss badge
          const status = document.getElementById('upload-status');
          document.getElementById('upload-name').innerText = file.name;
          status.classList.remove('hidden');
          
          clearPresetBorders();
          generateQR();
        };
        img.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // 4. Frame settings
  const frameTextInput = document.getElementById('frame-text');
  frameTextInput.addEventListener('input', (e) => {
    state.frameText = e.target.value || '';
    generateQR();
  });

  const frameFontSelect = document.getElementById('frame-font');
  frameFontSelect.addEventListener('change', (e) => {
    state.frameFont = e.target.value;
    generateQR();
  });

  const framePaddingInput = document.getElementById('frame-padding');
  framePaddingInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.framePadding = val;
    const labels = ['Narrow', 'Medium', 'Wide'];
    document.getElementById('frame-padding-val').innerText = labels[val - 1];
    generateQR();
  });
}

// Helpar to bind color picker and hex text input togheter
function setupColorPair(pickerId, hexId, stateKey) {
  const picker = document.getElementById(pickerId);
  const hex = document.getElementById(hexId);

  picker.addEventListener('input', (e) => {
    const val = e.target.value;
    hex.value = val.toUpperCase();
    state[stateKey] = val;
    generateQR();
  });

  hex.addEventListener('input', (e) => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      picker.value = val;
      state[stateKey] = val;
      generateQR();
    }
  });
}

// Presets removed

// Preset color click handlar
function setColors(fg, bg) {
  state.qrColorFg = fg;
  state.qrColorBg = bg;
  
  document.getElementById('qr-color-fg').value = fg;
  document.getElementById('qr-color-bg').value = bg;
  
  syncColorValues();
  generateQR();
}

// Select QR modul drawing stlye
function setQrStyle(style) {
  state.qrStyle = style;
  
  // Update button hightlights
  const styles = ['square', 'rounded', 'star'];
  styles.forEach(s => {
    const btn = document.getElementById(`btn-style-${s === 'star' ? 'fun' : s}`);
    if (s === style) {
      btn.className = "py-2.5 rounded-xl border border-indigo-500 bg-indigo-500/10 text-white font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-all";
    } else {
      btn.className = "py-2.5 rounded-xl border border-transparent bg-slate-900/60 hover:bg-slate-900/90 text-slate-400 hover:text-slate-200 text-xs flex flex-col items-center justify-center gap-1 transition-all";
    }
  });
  
  generateQR();
}

// Select brand logo pressets
function selectPresetLogo(preset) {
  state.presetLogo = preset;
  state.customLogoSrc = null; // Clear custom upload if preset is chosen
  document.getElementById('upload-status').classList.add('hidden');
  
  // Hightlight active preset button
  clearPresetBorders();
  const activeBtn = document.getElementById(`preset-logo-${preset}`);
  if (activeBtn) {
    activeBtn.classList.remove('border-[rgba(255,255,255,0.05)]', 'bg-slate-900', 'text-slate-300');
    activeBtn.classList.add('border-2', 'border-indigo-500', 'bg-indigo-500/10');
  }
  
  // If we selected a preset logo and frameColorBg is current frame color, match text if nice
  // Wait, just render the logo with fg color or preset color
  generateQR();
}

// Clear highliighting on preset logo seletions
function clearPresetBorders() {
  const presets = ['none', 'link', 'wifi', 'envelope', 'youtube', 'facebook', 'instagram', 'twitter', 'github'];
  presets.forEach(p => {
    const btn = document.getElementById(`preset-logo-${p}`);
    if (btn) {
      btn.className = "w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-105";
      if (p === 'youtube') btn.classList.add('text-red-500');
      else if (p === 'facebook') btn.classList.add('text-blue-500');
      else if (p === 'instagram') btn.classList.add('text-pink-500');
      else if (p === 'twitter') btn.classList.add('text-sky-400');
      else if (p === 'wifi') btn.classList.add('text-emerald-400');
      else if (p === 'none') btn.classList.add('text-indigo-400');
      else btn.classList.add('text-slate-300');
      
      btn.classList.add('bg-slate-900', 'border', 'border-[rgba(255,255,255,0.05)]');
    }
  });
}

// Remove custum uploaded logo
function removeCustomLogo() {
  state.customLogoSrc = null;
  state.customLogoName = '';
  document.getElementById('upload-status').classList.add('hidden');
  document.getElementById('logo-file-input').value = '';
  selectPresetLogo('none');
}

// Selcet frame template
function selectFrameStyle(style) {
  state.frameStyle = style;
  
  // Show / Hide frame custumizers based on frame selction
  const customizers = document.getElementById('frame-customization-options');
  if (style === 'none') {
    customizers.classList.add('opacity-30', 'pointer-events-none');
  } else {
    customizers.classList.remove('opacity-30', 'pointer-events-none');
  }
  
  // Hightlight frame selection button
  const frames = ['none', 'badge', 'top', 'bubble', 'bracket', 'phone'];
  frames.forEach(f => {
    const btn = document.getElementById(`frame-style-${f}`);
    if (f === style) {
      btn.className = "p-3 rounded-xl border-2 border-indigo-500 bg-indigo-500/5 text-white flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-[1.02]";
    } else {
      btn.className = "p-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-slate-900/60 hover:bg-slate-900/90 text-slate-400 hover:text-slate-200 flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-[1.02]";
    }
  });
  
  generateQR();
}

// Change resoluton / export quailty
function setQuality(qualityFactor) {
  state.quality = qualityFactor;
  
  // Updaet quailty toggle seletion state
  const resolutions = { 1: 'res-normal', 3: 'res-hd', 5: 'res-ultra' };
  Object.keys(resolutions).forEach(q => {
    const btn = document.getElementById(resolutions[q]);
    if (parseInt(q) === qualityFactor) {
      btn.className = "px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-600 rounded shadow-md transition-all";
    } else {
      btn.className = "px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-300 rounded transition-all";
    }
  });
  
  generateQR();
}

// Helpar: check if row/col sits inside one of the three finder pattarns
function getFinderPatternType(r, c, size) {
  if (r < 7 && c < 7) {
    if (r === 0 && c === 0) return 'tl';
    return 'inside';
  }
  if (r < 7 && c >= size - 7) {
    if (r === 0 && c === size - 7) return 'tr';
    return 'inside';
  }
  if (r >= size - 7 && c < 7) {
    if (r === size - 7 && c === 0) return 'bl';
    return 'inside';
  }
  return 'none';
}

// Helpar: draw canvas rounded rectangls
function drawRoundedRect(ctx, x, y, width, height, radius, fill = true, stroke = false) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

// Draw a single QR finder pattern (the 3 corner squares) at position x,y
// A finder pattern is a 7×7 grid: outer dark ring → white ring → dark center 3×3
function drawFinderPattern(ctx, x, y, S, fgColor, bgColor) {
  // 1. Outer dark square — 7 modules × 7 modules
  ctx.fillStyle = fgColor;
  drawRoundedRect(ctx, x, y, S * 7, S * 7, S * 0.8, true, false);

  // 2. White separator ring — 5 modules × 5 modules (inset 1 module on each side)
  ctx.fillStyle = bgColor;
  drawRoundedRect(ctx, x + S, y + S, S * 5, S * 5, S * 0.5, true, false);

  // 3. Inner dark square — 3 modules × 3 modules (inset 2 modules on each side)
  ctx.fillStyle = fgColor;
  drawRoundedRect(ctx, x + S * 2, y + S * 2, S * 3, S * 3, S * 0.4, true, false);
}

// Canvas Compositing Engien: Generates the actual ouput image in real-time
function generateQR() {
  if (typeof QRCode === 'undefined') return;

  try {
    // Genereate raw QR code matrix (useing error corection H to facillitate center branding)
    const qrMatrix = QRCode.create(state.text, { errorCorrectionLevel: 'H' });
    const N = qrMatrix.modules.size;
    
    // Proporions
    const W_qr = 300 * state.quality;
    const S = W_qr / N; // modul size in pixels
    
    let W_canvas = W_qr;
    let H_canvas = W_qr;
    let X_qr = 0;
    let Y_qr = 0;
    
    // Frame paddin varibles based on slider value (1: thin, 2: medium, 3: thick)
    const paddingMultiplier = 0.04 * state.framePadding; // e.g. 0.04, 0.08, 0.12
    const P = W_qr * paddingMultiplier;
    
    // Calulate total canvas dimention and QR coordiantes acordding to selected Frame
    switch (state.frameStyle) {
      case 'badge':
        const bottomTextSpace = W_qr * 0.22;
        W_canvas = W_qr + 2 * P;
        H_canvas = W_qr + P + bottomTextSpace;
        X_qr = P;
        Y_qr = P;
        break;
      case 'top':
        const topTextSpace = W_qr * 0.22;
        W_canvas = W_qr + 2 * P;
        H_canvas = W_qr + P + topTextSpace;
        X_qr = P;
        Y_qr = topTextSpace;
        break;
      case 'bubble':
        const tailHeight = W_qr * 0.12;
        const bubbleBottomText = W_qr * 0.25;
        W_canvas = W_qr + 2 * P;
        H_canvas = W_qr + P + bubbleBottomText + tailHeight;
        X_qr = P;
        Y_qr = P;
        break;
      case 'bracket':
        const floatSpacing = W_qr * 0.18;
        W_canvas = W_qr + 2 * P;
        H_canvas = W_qr + 2 * P + floatSpacing;
        X_qr = P;
        Y_qr = P;
        break;
      case 'phone':
        const sidePhoneP = W_qr * 0.14;
        const topBezel = W_qr * 0.32;
        const bottomBezel = W_qr * 0.32;
        W_canvas = W_qr + 2 * sidePhoneP;
        H_canvas = W_qr + topBezel + bottomBezel;
        X_qr = sidePhoneP;
        Y_qr = topBezel;
        break;
      default: // 'none'
        W_canvas = W_qr;
        H_canvas = W_qr;
        X_qr = 0;
        Y_qr = 0;
    }
    
    const canvas = document.getElementById('qr-composite-canvas');
    canvas.width = W_canvas;
    canvas.height = H_canvas;
    const ctx = canvas.getContext('2d');
    
    // 1. Draw Frame Background
    ctx.clearRect(0, 0, W_canvas, H_canvas);
    
    if (state.frameStyle !== 'none' && state.frameStyle !== 'bracket') {
      // Solid card backgorunds for badge, top, bubble, phone frames
      ctx.fillStyle = state.frameColorBg;
      
      if (state.frameStyle === 'bubble') {
        const bubbleH = H_canvas - (W_qr * 0.12); // exclude tail
        drawRoundedRect(ctx, 0, 0, W_canvas, bubbleH, W_canvas * 0.05, true, false);
        
        // Draw speach tail
        ctx.beginPath();
        const tailCenter = W_canvas / 2;
        const tailY = bubbleH;
        const tailW = W_qr * 0.10;
        const tailH = W_qr * 0.12;
        
        ctx.moveTo(tailCenter - tailW, tailY - 2);
        ctx.lineTo(tailCenter + tailW, tailY - 2);
        ctx.lineTo(tailCenter - tailW * 0.2, tailY + tailH);
        ctx.closePath();
        ctx.fill();
      } else if (state.frameStyle === 'phone') {
        // Outer Phone body
        const phoneRadius = W_canvas * 0.08;
        drawRoundedRect(ctx, 0, 0, W_canvas, H_canvas, phoneRadius, true, false);
        
        // Inner phone sreen panel (holds QR + bottom text)
        const innerGap = W_canvas * 0.02;
        ctx.fillStyle = state.qrColorBg;
        drawRoundedRect(
          ctx, 
          innerGap, 
          innerGap, 
          W_canvas - 2 * innerGap, 
          H_canvas - 2 * innerGap, 
          phoneRadius * 0.8, 
          true, 
          false
        );
      } else {
        // Classic badge / top frames
        drawRoundedRect(ctx, 0, 0, W_canvas, H_canvas, W_canvas * 0.04, true, false);
      }
    }
    
    // 2. Draw QR code background panel
    if (state.frameStyle !== 'none' && state.frameStyle !== 'phone') {
      ctx.fillStyle = state.qrColorBg;
      // Draws a white card panel slighly larger than the QR code itself
      drawRoundedRect(ctx, X_qr, Y_qr, W_qr, W_qr, S * 1.5, true, false);
    } else if (state.frameStyle === 'none') {
      ctx.fillStyle = state.qrColorBg;
      ctx.fillRect(0, 0, W_canvas, H_canvas);
    }
    
    // 3. Render QR Code Modules
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const isDark = qrMatrix.modules.data[r * N + c];
        const findType = getFinderPatternType(r, c, N);
        
        const modX = X_qr + c * S;
        const modY = Y_qr + r * S;
        
        if (findType === 'inside') {
          continue; // Skip indiviual modules inside finder pattrns (handled in 'tl','tr','bl')
        }
        
        if (findType === 'tl' || findType === 'tr' || findType === 'bl') {
          // Draw nsetd rounded finder pattterns
          drawFinderPattern(ctx, modX, modY, S, state.qrColorFg, state.qrColorBg);
        } else if (isDark) {
          // Draw standarrd modules
          ctx.fillStyle = state.qrColorFg;
          
          if (state.qrStyle === 'rounded') {
            ctx.beginPath();
            ctx.arc(modX + S/2, modY + S/2, S/2 * 0.82, 0, 2 * Math.PI);
            ctx.fill();
          } else if (state.qrStyle === 'star') {
            ctx.beginPath();
            ctx.moveTo(modX + S/2, modY + S * 0.08);
            ctx.lineTo(modX + S - S * 0.08, modY + S/2);
            ctx.lineTo(modX + S/2, modY + S - S * 0.08);
            ctx.lineTo(modX + S * 0.08, modY + S/2);
            ctx.closePath();
            ctx.fill();
          } else { // 'square'
            // Fill excat square module
            ctx.fillRect(modX, modY, S, S);
          }
        }
      }
    }
    
    // 4. Render center logo
    const hasPreset = state.presetLogo !== 'none';
    const hasCustom = state.customLogoSrc !== null;
    
    if (hasPreset || hasCustom) {
      const centerX = X_qr + W_qr / 2;
      const centerY = Y_qr + W_qr / 2;
      const logoSize = W_qr * (state.logoSizeScale / 100);
      
      // Draw sheild backgorund to overlay modules
      if (state.logoBgCircle) {
        ctx.fillStyle = state.qrColorBg;
        
        ctx.beginPath();
        // Slighly larger than the logo to give it a neat breathin border
        ctx.arc(centerX, centerY, logoSize * 0.62, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add a suttble border contur on the circle mask to match details
        ctx.strokeStyle = state.qrColorFg + "15"; // transperant fg overlay
        ctx.lineWidth = S * 0.4;
        ctx.stroke();
      }
      
      // Render brand preset SVG or custum iamge upload
      if (hasCustom) {
        ctx.drawImage(
          state.customLogoSrc,
          centerX - logoSize / 2,
          centerY - logoSize / 2,
          logoSize,
          logoSize
        );
      } else if (hasPreset) {
        const logoData = BRAND_PRESETS[state.presetLogo];
        if (logoData) {
          ctx.save();
          ctx.translate(centerX, centerY);
          
          // Presets are loaded in 16x16 standarrd coordiantes. Scale acordingly.
          const scale = logoSize / 16;
          ctx.scale(scale, scale);
          ctx.translate(-8, -8); // Centar point shift
          
          ctx.fillStyle = logoData.color;
          ctx.fill(new Path2D(logoData.path));
          ctx.restore();
        }
      }
    }
    
    // 5. Draw Frame text label / details
    if (state.frameStyle !== 'none') {
      const fontFamilyName = FONT_MAP[state.frameFont] || FONT_MAP.outfit;
      
      // Adjut bold/style defalts acordding to typograpy styles
      let fontPrefix = 'bold';
      if (state.frameFont === 'hand') fontPrefix = 'normal';
      else if (state.frameFont === 'serif') fontPrefix = 'italic bold';
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let textX = W_canvas / 2;
      let textY = 0;
      let fontS = W_qr * 0.075; // dynaimc font sizing relitive to QR scale
      
      if (state.frameStyle === 'badge') {
        const bottomTextSpace = W_qr * 0.22;
        textY = Y_qr + W_qr + P + (bottomTextSpace - P) / 2;
        ctx.fillStyle = state.frameColorText;
        ctx.font = `${fontPrefix} ${fontS}px ${fontFamilyName}`;
        ctx.fillText(state.frameText.toUpperCase(), textX, textY);
        
      } else if (state.frameStyle === 'top') {
        const topTextSpace = W_qr * 0.22;
        textY = topTextSpace / 2;
        ctx.fillStyle = state.frameColorText;
        ctx.font = `${fontPrefix} ${fontS}px ${fontFamilyName}`;
        ctx.fillText(state.frameText.toUpperCase(), textX, textY);
        
      } else if (state.frameStyle === 'bubble') {
        const bubbleH = H_canvas - (W_qr * 0.12);
        const bottomSpace = bubbleH - (Y_qr + W_qr);
        textY = Y_qr + W_qr + bottomSpace / 2 + 3;
        ctx.fillStyle = state.frameColorText;
        ctx.font = `${fontPrefix} ${fontS}px ${fontFamilyName}`;
        ctx.fillText(state.frameText.toUpperCase(), textX, textY);
        
      } else if (state.frameStyle === 'phone') {
        const innerGap = W_canvas * 0.02;
        const bottomSpace = (H_canvas - 2 * innerGap) - (Y_qr + W_qr);
        textY = Y_qr + W_qr + bottomSpace / 2;
        
        ctx.fillStyle = state.frameColorBg; // Text matches phone cover color on white backdrop
        ctx.font = `${fontPrefix} ${fontS * 0.9}px ${fontFamilyName}`;
        ctx.fillText(state.frameText.toUpperCase(), textX, textY);
        
        // Draw decorative phone features: Speaker capsule at top center
        ctx.fillStyle = state.frameColorBg;
        const speakerW = W_canvas * 0.15;
        const speakerH = W_canvas * 0.02;
        drawRoundedRect(
          ctx, 
          W_canvas / 2 - speakerW / 2, 
          innerGap + innerGap * 0.8, 
          speakerW, 
          speakerH, 
          speakerH / 2, 
          true, 
          false
        );
        
      } else if (state.frameStyle === 'bracket') {
        const floatSpacing = W_qr * 0.18;
        textY = Y_qr + W_qr + P + floatSpacing / 2;
        
        // Draw custum pill badge
        ctx.font = `${fontPrefix} ${fontS * 0.8}px ${fontFamilyName}`;
        const textMetrics = ctx.measureText(state.frameText.toUpperCase());
        const textWidth = textMetrics.width;
        
        const pillH = fontS * 1.6;
        const pillW = textWidth + fontS * 1.5;
        const pillX = W_canvas / 2 - pillW / 2;
        const pillY = textY - pillH / 2;
        
        ctx.fillStyle = state.frameColorBg;
        drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2, true, false);
        
        ctx.fillStyle = state.frameColorText;
        ctx.fillText(state.frameText.toUpperCase(), textX, textY);
        
        // Draw 4 asthetic crop marks in the corners of the QR card containar
        ctx.strokeStyle = state.frameColorBg;
        ctx.lineWidth = S * 0.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'miter';
        
        const bracketL = W_qr * 0.12; // Lenght of bracket arms
        const bx = X_qr;
        const by = Y_qr;
        const bw = W_qr;
        const bh = W_qr;
        
        // Top-Left
        ctx.beginPath();
        ctx.moveTo(bx, by + bracketL);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + bracketL, by);
        ctx.stroke();
        
        // Top-Right
        ctx.beginPath();
        ctx.moveTo(bx + bw - bracketL, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + bracketL);
        ctx.stroke();
        
        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(bx, by + bh - bracketL);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + bracketL, by + bh);
        ctx.stroke();
        
        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(bx + bw - bracketL, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by + bh - bracketL);
        ctx.stroke();
      }
    }
    
  } catch (err) {
    console.error("Error drawing QR code: ", err);
  }
}

// Downlod artwork as PNG or JPEG image
function downloadImage(format) {
  const canvas = document.getElementById('qr-composite-canvas');
  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const extension = format === 'jpeg' ? 'jpg' : 'png';
  
  // Create donwload anchor and tigger
  const link = document.createElement('a');
  link.download = `qrcraft-artwork.${extension}`;
  link.href = canvas.toDataURL(mimeType, 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export artwork insdie a high-DPI PDF dokument
function downloadPDF() {
  const canvas = document.getElementById('qr-composite-canvas');
  const { jsPDF } = window.jspdf;
  
  // Setup documet size to match canvas excat proportions
  const doc = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  // Draw the high-res composit image centerd on page
  const dataUrl = canvas.toDataURL('image/png');
  doc.addImage(dataUrl, 'PNG', 0, 0, canvas.width, canvas.height);
  doc.save('qrcraft-artwork.pdf');
}
