import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function UuidPage() {
  const tool = allTools.find(t => t.id === 'uuid')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UUID Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Generate version 4 UUIDs in bulk instantly. Free, secure, unique ID generator with no tracking and real-time generation.",
    "url": "https://instant-dev-tool-converter.vercel.app/uuid"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Bulk UUID v4 Generator Online – InstantConverters</title>
        <meta name="description" content="Generate version 4 UUIDs in bulk instantly. Free, secure, unique ID generator with no tracking and real-time generation." />
        <meta name="keywords" content="UUID generator" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          UUID Generator
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Generate version 4 UUIDs in bulk instantly. Free, secure, unique ID generator with no tracking and real-time generation.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a UUID Generator?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A UUID (Universally Unique Identifier) generator creates randomized 128-bit values used to uniquely identify database records, sessions, or API transactions globally without collisions."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Simply select the number of UUIDs you need and click generate. You can copy individual IDs or the entire list instantly."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Output: 550e8400-e29b-41d4-a716-446655440000"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/markdown-preview" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Markdown Preview →</Link>
          <Link to="/number-base" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Number Base Converter →</Link>
          <Link to="/password" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Password Generator →</Link>
        </div>
      </div>
    </div>
  )
}
