import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function ImageBase64Page() {
  const tool = allTools.find(t => t.id === 'image-base64')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image ↔ Base64",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Convert images to Base64 data URIs securely in your browser. Fast local conversion for CSS and HTML payloads.",
    "url": "https://instant-dev-tool-converter.vercel.app/image-base64"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Image to Base64 Data URI Converter – InstantConverters</title>
        <meta name="description" content="Convert images to Base64 data URIs securely in your browser. Fast local conversion for CSS and HTML payloads." />
        <meta name="keywords" content="image to base64 converter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Image ↔ Base64
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Convert images to Base64 data URIs securely in your browser. Fast local conversion for CSS and HTML payloads.
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
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Image ↔ Base64?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"An image to Base64 converter takes an image file and converts it into a Data URI string. This allows developers to embed images directly within HTML or CSS without making external HTTP requests."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Upload an image file from your computer. The tool will process the file locally and output the raw Base64 string that you can copy into your code."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: logo.png → Output: data:image/png;base64,iVBORw0K..."}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/color-converter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Color Converter →</Link>
          <Link to="/hash" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Hash Generator →</Link>
          <Link to="/html-entity" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try HTML Entities →</Link>
        </div>
      </div>
    </div>
  )
}
