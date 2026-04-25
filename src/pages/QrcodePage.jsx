import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function QrcodePage() {
  const tool = allTools.find(t => t.id === 'qrcode')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "QR Code Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Generate scannable QR codes from any text or URL instantly. Free, local barcode creation with fast PNG downloads.",
    "url": "https://instant-dev-tool-converter.vercel.app/qrcode"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Free QR Code Generator Online – InstantConverters</title>
        <meta name="description" content="Generate scannable QR codes from any text or URL instantly. Free, local barcode creation with fast PNG downloads." />
        <meta name="keywords" content="QR Code generator" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          QR Code Generator
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Generate scannable QR codes from any text or URL instantly. Free, local barcode creation with fast PNG downloads.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a QR Code Generator?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A QR code generator takes text, URLs, or data and encodes it into a 2D matrix barcode that can be instantly scanned by smartphone cameras."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste any text or link into the input box. The QR code will render immediately. You can adjust the size and download it as a PNG file."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: https://google.com → Output: [Downloadable PNG Image]"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/regex-tester" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Regex Tester →</Link>
          <Link to="/string-case" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Case Converter →</Link>
          <Link to="/text-diff" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Text Diff Checker →</Link>
        </div>
      </div>
    </div>
  )
}
