import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function HashPage() {
  const tool = allTools.find(t => t.id === 'hash')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hash Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Generate SHA-1, SHA-256, and SHA-512 hashes securely in the browser. Instant, offline cryptographic hash generation.",
    "url": "https://instant-dev-tool-converter.vercel.app/hash"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Free SHA-256 Hash Generator Online – InstantConverters</title>
        <meta name="description" content="Generate SHA-1, SHA-256, and SHA-512 hashes securely in the browser. Instant, offline cryptographic hash generation." />
        <meta name="keywords" content="SHA-256 hash generator" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Hash Generator
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Generate SHA-1, SHA-256, and SHA-512 hashes securely in the browser. Instant, offline cryptographic hash generation.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Hash Generator?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A cryptographic hash generator takes an input string and produces a fixed-size, irreversible hash. It is heavily used in password hashing, data integrity checks, and cryptography."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Type your input string. The tool will instantly compute multiple hash variants (MD5, SHA-1, SHA-256, SHA-512) in real-time."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: admin → Output: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"}
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
