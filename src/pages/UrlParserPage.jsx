import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function UrlParserPage() {
  const tool = allTools.find(t => t.id === 'url-parser')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Parser",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Parse and inspect URL components and query parameters easily. Instant web decoding and link analysis tool.",
    "url": "https://instant-dev-tool-converter.vercel.app/url-parser"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Live URL Parser & Query Inspector – InstantConverters</title>
        <meta name="description" content="Parse and inspect URL components and query parameters easily. Instant web decoding and link analysis tool." />
        <meta name="keywords" content="URL parser" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          URL Parser
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Parse and inspect URL components and query parameters easily. Instant web decoding and link analysis tool.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a URL Parser?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A URL parser breaks down a complex web address into its individual components: protocol, host, pathname, and extracts query string parameters into a readable JSON object."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste a full URL. The tool parses it instantly, allowing you to easily inspect hidden UTM tags or deeply nested query parameters."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: https://example.com?id=1 → Output: Protocol: https:, Host: example.com, Params: { id: \"1\" }"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/base64" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Base64 Decoder & Encoder →</Link>
          <Link to="/color-converter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Color Converter →</Link>
          <Link to="/hash" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Hash Generator →</Link>
        </div>
      </div>
    </div>
  )
}
