import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function TextEscapePage() {
  const tool = allTools.find(t => t.id === 'text-escape')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "String Escape Tool",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Escape or unescape JSON strings quickly for safe payload transfers. Instant string processing for seamless API testing.",
    "url": "https://instant-dev-tool-converter.vercel.app/text-escape"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>JSON String Escape Tool Online – InstantConverters</title>
        <meta name="description" content="Escape or unescape JSON strings quickly for safe payload transfers. Instant string processing for seamless API testing." />
        <meta name="keywords" content="string escape tool" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          String Escape Tool
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Escape or unescape JSON strings quickly for safe payload transfers. Instant string processing for seamless API testing.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a String Escape Tool?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A string escape tool automatically adds backslashes (\\) to special characters so they can be safely embedded inside JSON payloads or programming string literals."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste your raw text. The tool will escape quotes, newlines, and tabs, making it ready to be injected into a JSON string field."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: \"Hello\" → Output: \\\"Hello\\\""}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/url-parser" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try URL Parser →</Link>
          <Link to="/uuid" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try UUID Generator →</Link>
          <Link to="/word-counter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Word Counter →</Link>
        </div>
      </div>
    </div>
  )
}
