// Client-side Device Fingerprinting & Dual-Locking Utility
// Combines WebGL GPU parameters, Canvas rendering traits, screen depth, and system timezone

const TOKEN_KEY = 'nemu_guest_token';
const DFP_KEY = 'nemu_device_id';

// Simple, fast string hashing (DJB2 + sdbm)
function hashString(str) {
  let hash1 = 5381;
  let hash2 = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash1 = (hash1 * 33) ^ char;
    hash2 = char + (hash2 << 6) + (hash2 << 16) - hash2;
  }
  return (Math.abs(hash1).toString(16) + Math.abs(hash2).toString(16)).padStart(16, '0');
}

// Generate canvas pixel hash
function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-canvas';

    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial', sans-serif";
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('NEMU-AI,Visual-DNA#123', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('NEMU-AI,Visual-DNA#123', 4, 17);

    return hashString(canvas.toDataURL());
  } catch {
    return 'canvas-blocked';
  }
}

// Extract unmasked GPU vendor and renderer via WebGL
function getWebGLFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no-webgl';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'webgl-no-debug';

    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
    return `${vendor}~${renderer}`;
  } catch {
    return 'webgl-error';
  }
}

// Generate stable, persistent Device Fingerprint
export function getDeviceFingerprint() {
  try {
    let cachedDfp = localStorage.getItem(DFP_KEY);
    if (cachedDfp) return cachedDfp;

    const components = [
      getWebGLFingerprint(),
      getCanvasFingerprint(),
      window.screen?.width || 0,
      window.screen?.height || 0,
      window.screen?.colorDepth || 0,
      navigator?.hardwareConcurrency || 4,
      navigator?.language || 'id',
      Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || 'UTC'
    ];

    const raw = components.join('||');
    const dfp = `dfp_${hashString(raw)}`;
    localStorage.setItem(DFP_KEY, dfp);
    return dfp;
  } catch {
    return 'dfp_generic_fallback';
  }
}

// Dual-locking guest token helpers
export function getStoredGuestToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function setStoredGuestToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  } catch {}
}
