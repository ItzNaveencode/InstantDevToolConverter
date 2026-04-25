import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function JsonToTsPage() {
  const tool = allTools.find(t => t.id === 'json-to-ts')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON → TypeScript",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Convert JSON to TypeScript interfaces instantly. Free online tool to generate static types from raw JSON objects in real-time.",
    "url": "https://instant-dev-tool-converter.vercel.app/json-to-ts"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>JSON to TypeScript Converter (Instant) – InstantConverters</title>
        <meta name="description" content="Convert JSON to TypeScript interfaces instantly. Free online tool to generate static types from raw JSON objects in real-time." />
        <meta name="keywords" content="JSON to TypeScript" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          JSON → TypeScript
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Convert JSON to TypeScript interfaces instantly. Free online tool to generate static types from raw JSON objects in real-time.
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
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a JSON → TypeScript?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A JSON to TypeScript converter automatically generates static type definitions (Interfaces) from dynamic JSON objects, saving you time when building strictly-typed frontend or backend applications."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste any valid JSON object or array. The tool instantly analyzes the property types (strings, numbers, booleans, nested objects) and produces ready-to-copy TypeScript interfaces."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: {\"id\": 1, \"name\": \"John\"} → Output: interface Root { id: number; name: string; }"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/hash" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Hash Generator →</Link>
          <Link to="/html-entity" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try HTML Entities →</Link>
          <Link to="/image-base64" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Image ↔ Base64 →</Link>
        </div>
      </div>
    </div>
  )
}
