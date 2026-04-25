/* ─── Smart type detector ─── */
export const TYPE_METADATA = {
  'jwt': { label: 'JWT Token', color: '#7c3aed' },
  'uuid': { label: 'UUID', color: '#2563eb' },
  'json': { label: 'JSON', color: '#059669' },
  'xml': { label: 'XML', color: '#dc2626' },
  'url': { label: 'URL', color: '#0891b2' },
  'timestamp': { label: 'Unix Timestamp', color: '#0891b2' },
  'color': { label: 'Hex Color', color: '#db2777' },
  'cron': { label: 'Cron Expression', color: '#7c3aed' },
  'base64': { label: 'Base64', color: '#d97706' },
  'markdown': { label: 'Markdown', color: '#2563eb' }
}

export function detectInputType(raw) {
  const s = raw.trim()
  if (!s || s.length < 4) return null

  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(s)) return 'jwt'
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)) return 'uuid'
  if (s[0] === '{' || s[0] === '[') {
    try { JSON.parse(s); return 'json' } catch {}
  }
  if (s[0] === '<' && s.includes('>')) return 'xml'
  if (/^https?:\/\//i.test(s)) return 'url'
  if (/^\d{10}$/.test(s) || /^\d{13}$/.test(s)) return 'timestamp'
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(s)) return 'color'
  if (/^[\d*/,\-?LW#]+(\s+[\d*/,\-?LW#]+){4,5}$/.test(s)) return 'cron'
  if (/^[A-Za-z0-9+/]+=*$/.test(s) && s.length >= 8 && s.length % 4 === 0) {
    try { const d = atob(s); if (d.length > 0) return 'base64' } catch {}
  }
  if (/^#{1,6}\s/.test(s) || s.includes('```')) return 'markdown'
  return null
}

/* ─── Inline output computer ─── */
export function computeOutput(input, type) {
  const s = input.trim()
  try {
    if (type === 'jwt') {
      const [h, p] = s.split('.')
      const b64 = x => x.replace(/-/g, '+').replace(/_/g, '/')
      const header  = JSON.parse(atob(b64(h)))
      const payload = JSON.parse(atob(b64(p)))
      const lines = []
      lines.push('── Header ─────────────────────')
      lines.push(JSON.stringify(header, null, 2))
      lines.push('')
      lines.push('── Payload ────────────────────')
      lines.push(JSON.stringify(payload, null, 2))
      if (payload.iat) lines.push(`\n  iat → ${new Date(payload.iat * 1000).toUTCString()}`)
      if (payload.exp) lines.push(`  exp → ${new Date(payload.exp * 1000).toUTCString()}`)
      return lines.join('\n')
    }
    if (type === 'json') {
      return JSON.stringify(JSON.parse(s), null, 2)
    }
    if (type === 'base64') {
      return atob(s)
    }
    if (type === 'url') {
      const url = new URL(s)
      const params = Object.fromEntries(url.searchParams)
      return JSON.stringify({
        protocol: url.protocol,
        host:     url.host,
        pathname: url.pathname,
        search:   url.search || '(none)',
        params,
        hash:     url.hash || '(none)',
      }, null, 2)
    }
    if (type === 'timestamp') {
      const n  = Number(s)
      const ms = s.length === 10 ? n * 1000 : n
      const d  = new Date(ms)
      return [
        `UTC:     ${d.toUTCString()}`,
        `ISO:     ${d.toISOString()}`,
        `Local:   ${d.toLocaleString()}`,
        `Unix ms: ${ms}`,
        `Unix s:  ${Math.floor(ms / 1000)}`,
      ].join('\n')
    }
    if (type === 'color') {
      const hex = s.replace('#', '').padEnd(6, '0')
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const toHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h = 0, s = 0, l = (max + min) / 2
        if (max !== min) {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
          switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
          }
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
      }
      return [
        `Hex:  ${s.toUpperCase()}`,
        `RGB:  rgb(${r}, ${g}, ${b})`,
        `HSL:  ${toHsl(r, g, b)}`,
        `R: ${r}  G: ${g}  B: ${b}`,
      ].join('\n')
    }
    if (type === 'uuid') {
      const parts = s.split('-')
      const version = parseInt(parts[2][0])
      return [
        `UUID:    ${s}`,
        `Version: ${version}`,
        `Variant: RFC 4122`,
        `Segment: ${parts.join(' — ')}`,
      ].join('\n')
    }
    if (type === 'cron') {
      const fields = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week', 'Year (opt)']
      return s.split(/\s+/).map((p, i) => `${(fields[i] || '?').padEnd(14)}: ${p}`).join('\n')
    }
  } catch(e) {
    return `⚠ Error: ${e.message}`
  }
  return s
}
