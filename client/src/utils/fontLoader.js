// Dynamic Google Fonts stylesheet injector with robust weights and loading callbacks

const loadedFonts = new Set();
const loadingCallbacks = new Map();

export const isFontLoaded = (fontFamily) => {
  if (!fontFamily) return false;
  return loadedFonts.has(fontFamily.trim());
};

export const loadGoogleFont = (fontFamily, onLoaded) => {
  if (!fontFamily) return;

  const cleanFamily = fontFamily.trim();
  const formattedFamily = cleanFamily.replace(/\s+/g, '+');
  const linkId = `gfont-${formattedFamily}`;

  if (onLoaded) {
    if (!loadingCallbacks.has(cleanFamily)) {
      loadingCallbacks.set(cleanFamily, new Set());
    }
    loadingCallbacks.get(cleanFamily).add(onLoaded);
  }

  const notifyLoaded = () => {
    loadedFonts.add(cleanFamily);
    const cbs = loadingCallbacks.get(cleanFamily);
    if (cbs) {
      cbs.forEach((cb) => {
        try { cb(cleanFamily); } catch {}
      });
      loadingCallbacks.delete(cleanFamily);
    }
  };

  if (document.getElementById(linkId)) {
    if (document.fonts && document.fonts.check && document.fonts.check(`32px "${cleanFamily}"`)) {
      notifyLoaded();
    } else if (document.fonts && document.fonts.load) {
      document.fonts.load(`32px "${cleanFamily}"`).then(notifyLoaded).catch(notifyLoaded);
    } else {
      notifyLoaded();
    }
    return;
  }

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';

  // Primary URL with multi-weight support
  link.href = `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@400;500;600;700;800;900&display=swap`;

  link.onload = () => {
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`32px "${cleanFamily}"`).then(notifyLoaded).catch(notifyLoaded);
    } else {
      notifyLoaded();
    }
  };

  // Graceful fallback URL if discrete weights are not available for this specific font
  link.onerror = () => {
    link.onerror = null;
    link.href = `https://fonts.googleapis.com/css2?family=${formattedFamily}&display=swap`;
    link.onload = () => {
      if (document.fonts && document.fonts.load) {
        document.fonts.load(`32px "${cleanFamily}"`).then(notifyLoaded).catch(notifyLoaded);
      } else {
        notifyLoaded();
      }
    };
  };

  document.head.appendChild(link);
};

export const loadMultipleGoogleFonts = (fonts = [], onAnyLoaded) => {
  if (!Array.isArray(fonts)) return;
  fonts.forEach((f) => {
    const family = typeof f === 'string' ? f : f?.fontFamily;
    if (family) loadGoogleFont(family, onAnyLoaded);
  });
};

