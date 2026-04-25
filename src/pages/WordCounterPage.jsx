import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function WordCounterPage() {
  const tool = allTools.find(t => t.id === 'word-counter')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Word Counter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Count words, characters, and lines instantly with this free text tool. Perfect for SEO tracking and copywriting.",
    "url": "https://instant-dev-tool-converter.vercel.app/word-counter"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>Live Word & Character Counter Online – InstantConverters</title>
        <meta name="description" content="Count words, characters, and lines instantly with this free text tool. Perfect for SEO tracking and copywriting." />
        <meta name="keywords" content="word counter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Word Counter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Count words, characters, and lines instantly with this free text tool. Perfect for SEO tracking and copywriting.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Word Counter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A word and character counter provides real-time statistics on text blocks, crucial for SEO meta descriptions, tweet limits, and essay requirements."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Start typing or paste your text. The tool instantly calculates the total character count, word count, and line count."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: Hello World → Output: 2 words, 11 characters"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/string-case" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Case Converter →</Link>
          <Link to="/text-diff" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Text Diff Checker →</Link>
          <Link to="/text-escape" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try String Escape Tool →</Link>
        </div>
      </div>
    </div>
  )
}
