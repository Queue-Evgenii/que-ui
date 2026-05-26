export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function sanitizeUrl(url: string): string {
  const t = url.trim()
  // block javascript: and data: but allow relative paths, absolute paths, anchors, and standard schemes
  return /^(javascript:|data:)/i.test(t) ? '#' : t
}
