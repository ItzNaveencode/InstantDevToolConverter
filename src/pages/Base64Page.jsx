import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function Base64Page() {
  const tool = allTools.find(t => t.id === 'base64')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 Decoder & Encoder",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Encode or decode Base64 strings securely and instantly in your browser. Fast, private, and real-time Base64 conversion tool.",
    "url": "https://instant-dev-tool-converter.vercel.app/base64"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Base64 Encode & Decode Tool Online – InstantConverters</title>
        <meta name="description" content="Encode or decode Base64 strings securely and instantly in your browser. Fast, private, and real-time Base64 conversion tool." />
        <meta name="keywords" content="Base64 decoder" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Base64 Decoder & Encoder
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Encode or decode Base64 strings securely and instantly in your browser. Fast, private, and real-time Base64 conversion tool.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Base64 Decoder & Encoder?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Base64 encoding converts binary or text data into an ASCII string format. It is widely used to embed image data, encode API keys, or safely transmit data across text-based protocols."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Select either \"Encode\" or \"Decode\". Paste your text into the input field, and the tool will instantly provide the converted Base64 or plain-text string."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: Hello → Output: SGVsbG8="}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/json-to-ts" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try JSON → TypeScript →</Link>
          <Link to="/jwt-decoder" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try JWT Decoder →</Link>
          <Link to="/line-tools" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Sort & Dedupe Lines →</Link>
        </div>
      </div>
    </div>
  )
}
