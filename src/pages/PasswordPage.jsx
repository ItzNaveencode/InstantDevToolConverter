import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function PasswordPage() {
  const tool = allTools.find(t => t.id === 'password')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Password Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Create highly secure, randomized passwords locally in your browser. Fast, safe generation of symbols, numbers, and strings.",
    "url": "https://instant-dev-tool-converter.vercel.app/password"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Secure Password Generator (Local) – InstantConverters</title>
        <meta name="description" content="Create highly secure, randomized passwords locally in your browser. Fast, safe generation of symbols, numbers, and strings." />
        <meta name="keywords" content="secure password generator" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Password Generator
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Create highly secure, randomized passwords locally in your browser. Fast, safe generation of symbols, numbers, and strings.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Password Generator?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A secure password generator creates strong, unpredictable strings containing uppercase, lowercase, numbers, and symbols to protect accounts from brute-force attacks."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Select your desired password length and character requirements (e.g. include symbols). The tool generates cryptographically secure passwords locally on your device."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Length 16 → Output: z&P9#mK2$qL5*vN1"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/number-base" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Number Base Converter →</Link>
          <Link to="/qrcode" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try QR Code Generator →</Link>
          <Link to="/regex-tester" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Regex Tester →</Link>
        </div>
      </div>
    </div>
  )
}
