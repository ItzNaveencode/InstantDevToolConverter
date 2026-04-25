import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function XmlFormatterPage() {
  const tool = allTools.find(t => t.id === 'xml-formatter')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XML Formatter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Format and prettify XML code instantly. Clean your XML payloads securely with this free, fast, and local in-browser developer tool.",
    "url": "https://instant-dev-tool-converter.vercel.app/xml-formatter"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Free XML Formatter & Prettier Online – InstantConverters</title>
        <meta name="description" content="Format and prettify XML code instantly. Clean your XML payloads securely with this free, fast, and local in-browser developer tool." />
        <meta name="keywords" content="XML formatter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          XML Formatter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Format and prettify XML code instantly. Clean your XML payloads securely with this free, fast, and local in-browser developer tool.
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
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a XML Formatter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"An XML formatter takes raw, minified XML payloads and adds proper indentation and line breaks, making complex SOAP APIs or configuration files readable."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste your unformatted XML into the input area. The tool will parse the tags and automatically indent the document for human readability."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: <root><item>1</item></root> → Output:\n<root>\n  <item>1</item>\n</root>"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/image-base64" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Image ↔ Base64 →</Link>
          <Link to="/json-formatter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try JSON Formatter →</Link>
          <Link to="/json-to-ts" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try JSON → TypeScript →</Link>
        </div>
      </div>
    </div>
  )
}
