import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function TimestampPage() {
  const tool = allTools.find(t => t.id === 'timestamp')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Unix Timestamp Converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Convert Unix timestamps to readable dates (UTC, Local, ISO) instantly. Fast, real-time date math utility.",
    "url": "https://instant-dev-tool-converter.vercel.app/timestamp"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Unix Epoch Timestamp Converter (Instant) – InstantConverters</title>
        <meta name="description" content="Convert Unix timestamps to readable dates (UTC, Local, ISO) instantly. Fast, real-time date math utility." />
        <meta name="keywords" content="Unix timestamp converter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Unix Timestamp Converter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Convert Unix timestamps to readable dates (UTC, Local, ISO) instantly. Fast, real-time date math utility.
        </p>
      </div>

      {/* Tool Container (fixed height so flexbox children don't collapse) */}
      <div style={{ flexShrink: 0, height: '75vh', minHeight: 600, display: 'flex', flexDirection: 'column', maxWidth: 1200, width: '100%', margin: '0 auto', padding: '16px 0' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid var(--bdr)', borderRadius: 'var(--r-lg)', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>
          <ToolPage tool={tool} />
        </div>
      </div>

      {/* SEO Content Sections (below tool) */}
      <section style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '24px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Unix Timestamp Converter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A Unix timestamp converter translates the number of seconds (or milliseconds) elapsed since Jan 1, 1970 into human-readable date formats like UTC or ISO 8601."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste a numeric timestamp (e.g. 1714000000). The tool will instantly display the exact Date and Time in UTC, your local timezone, and standard ISO formats."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: 1714000000 → Output: Thu, 25 Apr 2024 00:53:20 GMT"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/uuid" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try UUID Generator →</Link>
          <Link to="/word-counter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Word Counter →</Link>
          <Link to="/xml-formatter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try XML Formatter →</Link>
        </div>
      </div>
    </div>
  )
}
