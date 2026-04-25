import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function RegexTesterPage() {
  const tool = allTools.find(t => t.id === 'regex-tester')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Regex Tester",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Test regular expressions live against text. Highlight matches instantly with this free in-browser developer tool.",
    "url": "https://instant-dev-tool-converter.vercel.app/regex-tester"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Free Online Regex Tester & Matcher – InstantConverters</title>
        <meta name="description" content="Test regular expressions live against text. Highlight matches instantly with this free in-browser developer tool." />
        <meta name="keywords" content="regex tester" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Regex Tester
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Test regular expressions live against text. Highlight matches instantly with this free in-browser developer tool.
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
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Regex Tester?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A Regex (Regular Expression) tester allows developers to write search patterns and immediately verify if they successfully match specific target strings in a block of text."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Enter your regex pattern in the top field (e.g. \\d+). Paste your test data below. All matching strings will be highlighted in real-time."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Pattern: \\d+ | Text: Age 25 → Match: 25"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/text-escape" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try String Escape Tool →</Link>
          <Link to="/timestamp" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Unix Timestamp Converter →</Link>
          <Link to="/url-encoder" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try URL Encoder & Decoder →</Link>
        </div>
      </div>
    </div>
  )
}
