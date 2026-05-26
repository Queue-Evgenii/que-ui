export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function sanitizeUrl(url: string): string {
  return /^(https?:|mailto:|tel:|\/|#)/i.test(url.trim()) ? url : '#'
}
