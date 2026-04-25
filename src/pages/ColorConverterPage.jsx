import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function ColorConverterPage() {
  const tool = allTools.find(t => t.id === 'color-converter')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Color Converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Convert between HEX, RGB, and HSL color formats instantly. UI tool for modern web designers and frontend engineers.",
    "url": "https://instant-dev-tool-converter.vercel.app/color-converter"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Free HEX to RGB Color Converter – InstantConverters</title>
        <meta name="description" content="Convert between HEX, RGB, and HSL color formats instantly. UI tool for modern web designers and frontend engineers." />
        <meta name="keywords" content="HEX to RGB converter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Color Converter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Convert between HEX, RGB, and HSL color formats instantly. UI tool for modern web designers and frontend engineers.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Color Converter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A color converter translates design color codes between HEX, RGB, and HSL formats, essential for frontend developers translating Figma designs into CSS code."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste any HEX code or RGB string. The tool will render a color preview and output the exact equivalent codes in all other web formats."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: #ffffff → Output: rgb(255, 255, 255), hsl(0, 0%, 100%)"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/word-counter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Word Counter →</Link>
          <Link to="/xml-formatter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try XML Formatter →</Link>
          <Link to="/base64" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Base64 Decoder & Encoder →</Link>
        </div>
      </div>
    </div>
  )
}
