import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function LoremIpsumPage() {
  const tool = allTools.find(t => t.id === 'lorem-ipsum')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lorem Ipsum Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Generate placeholder lorem ipsum text for your web designs and mockups. Instant paragraphs with a single click.",
    "url": "https://instant-dev-tool-converter.vercel.app/lorem-ipsum"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Free Lorem Ipsum Generator Online – InstantConverters</title>
        <meta name="description" content="Generate placeholder lorem ipsum text for your web designs and mockups. Instant paragraphs with a single click." />
        <meta name="keywords" content="Lorem Ipsum generator" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Lorem Ipsum Generator
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Generate placeholder lorem ipsum text for your web designs and mockups. Instant paragraphs with a single click.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Lorem Ipsum Generator?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Lorem Ipsum is standard placeholder text used in UI/UX design and typesetting to demonstrate the visual form of a document without relying on meaningful content."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Enter the number of paragraphs or sentences you need. The generator will instantly output the required amount of standard Latin placeholder text."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: 1 Paragraph → Output: Lorem ipsum dolor sit amet..."}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/qrcode" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try QR Code Generator →</Link>
          <Link to="/regex-tester" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Regex Tester →</Link>
          <Link to="/string-case" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Case Converter →</Link>
        </div>
      </div>
    </div>
  )
}
