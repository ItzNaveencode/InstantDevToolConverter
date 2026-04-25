import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function JsonFormatterPage() {
  const tool = allTools.find(t => t.id === 'json-formatter')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Format, validate, and prettify JSON instantly. Free online JSON formatter with real-time output, smart input detection, and error checking.",
    "url": "https://instant-dev-tool-converter.vercel.app/json-formatter"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Free JSON Formatter Online – InstantConverters</title>
        <meta name="description" content="Format, validate, and prettify JSON instantly. Free online JSON formatter with real-time output, smart input detection, and error checking." />
        <meta name="keywords" content="JSON formatter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          JSON Formatter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Format, validate, and prettify JSON instantly. Free online JSON formatter with real-time output, smart input detection, and error checking.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a JSON Formatter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A JSON formatter is a tool that takes minified or unreadable JSON strings and converts them into a cleanly indented, readable format. It also validates the structure to ensure it conforms to JSON standards."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Simply paste your raw JSON payload into the input box. The tool instantly parses your data, checks for syntax errors, and outputs a perfectly formatted JSON tree on the right."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: {\"key\":\"value\"} → Output:\n{\n  \"key\": \"value\"\n}"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/color-converter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Color Converter →</Link>
          <Link to="/hash" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Hash Generator →</Link>
          <Link to="/html-entity" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try HTML Entities →</Link>
        </div>
      </div>
    </div>
  )
}
