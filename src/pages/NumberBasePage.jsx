import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function NumberBasePage() {
  const tool = allTools.find(t => t.id === 'number-base')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Number Base Converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Convert between Decimal, Hexadecimal, Binary, and Octal numbers in real time. Essential utility for developers.",
    "url": "https://instant-dev-tool-converter.vercel.app/number-base"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Hex to Decimal Number Converter – InstantConverters</title>
        <meta name="description" content="Convert between Decimal, Hexadecimal, Binary, and Octal numbers in real time. Essential utility for developers." />
        <meta name="keywords" content="hex to decimal converter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Number Base Converter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Convert between Decimal, Hexadecimal, Binary, and Octal numbers in real time. Essential utility for developers.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Number Base Converter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A number base converter translates numeric values between decimal (base 10), hexadecimal (base 16), binary (base 2), and octal (base 8) systems."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Type your number into any of the base input fields. The tool will calculate and populate the converted values in all other bases simultaneously."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input Decimal: 255 → Output Hex: FF, Binary: 11111111"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/xml-formatter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try XML Formatter →</Link>
          <Link to="/base64" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Base64 Decoder & Encoder →</Link>
          <Link to="/color-converter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Color Converter →</Link>
        </div>
      </div>
    </div>
  )
}
