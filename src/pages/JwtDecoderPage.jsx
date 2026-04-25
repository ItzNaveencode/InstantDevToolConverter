import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function JwtDecoderPage() {
  const tool = allTools.find(t => t.id === 'jwt-decoder')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JWT Decoder",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Decode JSON Web Tokens securely online. No payloads sent to servers. Instant local parsing of JWT headers and claims.",
    "url": "https://instant-dev-tool-converter.vercel.app/jwt-decoder"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>JWT Decoder & Inspector (Instant) – InstantConverters</title>
        <meta name="description" content="Decode JSON Web Tokens securely online. No payloads sent to servers. Instant local parsing of JWT headers and claims." />
        <meta name="keywords" content="JWT decoder" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          JWT Decoder
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Decode JSON Web Tokens securely online. No payloads sent to servers. Instant local parsing of JWT headers and claims.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a JWT Decoder?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A JWT decoder breaks down a JSON Web Token into its Header, Payload, and Signature components, allowing developers to read claims like user IDs and expiration dates."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste your eyJ... JWT string. The tool will instantly parse and pretty-print the JSON payload directly in your browser without making any network requests."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: eyJ... → Output: { \"sub\": \"123\", \"exp\": 1714000000 }"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/lorem-ipsum" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Lorem Ipsum Generator →</Link>
          <Link to="/markdown-preview" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Markdown Preview →</Link>
          <Link to="/number-base" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Number Base Converter →</Link>
        </div>
      </div>
    </div>
  )
}
