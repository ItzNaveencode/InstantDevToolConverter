import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function LineToolsPage() {
  const tool = allTools.find(t => t.id === 'line-tools')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sort & Dedupe Lines",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Sort, reverse, and deduplicate text lines instantly in your browser. Clean your lists securely without uploading data.",
    "url": "https://instant-dev-tool-converter.vercel.app/line-tools"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Sort & Deduplicate Text Lines Online – InstantConverters</title>
        <meta name="description" content="Sort, reverse, and deduplicate text lines instantly in your browser. Clean your lists securely without uploading data." />
        <meta name="keywords" content="deduplicate lines tool" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Sort & Dedupe Lines
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Sort, reverse, and deduplicate text lines instantly in your browser. Clean your lists securely without uploading data.
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
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Sort & Dedupe Lines?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A line sorting tool helps clean up large lists of data by sorting them alphabetically, reversing the order, or removing duplicate entries entirely."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste your list of items. Click the action buttons to sort A-Z, remove duplicate rows, or reverse the entire list order."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: Apple\nApple\nBanana → Output: Apple\nBanana"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/url-encoder" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try URL Encoder & Decoder →</Link>
          <Link to="/url-parser" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try URL Parser →</Link>
          <Link to="/uuid" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try UUID Generator →</Link>
        </div>
      </div>
    </div>
  )
}
