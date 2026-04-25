import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function HtmlEntityPage() {
  const tool = allTools.find(t => t.id === 'html-entity')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HTML Entities",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Escape and unescape HTML entities to prevent XSS. Fast, real-time string conversion for safe rendering in web applications.",
    "url": "https://instant-dev-tool-converter.vercel.app/html-entity"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>HTML Entity Encoder / Decoder (Instant) – InstantConverters</title>
        <meta name="description" content="Escape and unescape HTML entities to prevent XSS. Fast, real-time string conversion for safe rendering in web applications." />
        <meta name="keywords" content="HTML entities escape" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          HTML Entities
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Escape and unescape HTML entities to prevent XSS. Fast, real-time string conversion for safe rendering in web applications.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a HTML Entities?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"HTML Entity escaping converts special characters (like < and >) into safely renderable text equivalents (like &lt; and &gt;), preventing browser injection and XSS vulnerabilities."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste your HTML code. The tool will instantly escape dangerous characters for safe database storage, or unescape encoded entities back to raw HTML."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: <script> → Output: &lt;script&gt;"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/line-tools" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Sort & Dedupe Lines →</Link>
          <Link to="/lorem-ipsum" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Lorem Ipsum Generator →</Link>
          <Link to="/markdown-preview" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Markdown Preview →</Link>
        </div>
      </div>
    </div>
  )
}
