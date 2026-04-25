import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function MarkdownPreviewPage() {
  const tool = allTools.find(t => t.id === 'markdown-preview')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Markdown Preview",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Live Markdown to HTML preview tool. Test and render markdown files instantly in your browser with real-time feedback and GitHub flavor.",
    "url": "https://instant-dev-tool-converter.vercel.app/markdown-preview"
  }

  return (
    <div className="app" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Live Markdown Previewer Online – InstantConverters</title>
        <meta name="description" content="Live Markdown to HTML preview tool. Test and render markdown files instantly in your browser with real-time feedback and GitHub flavor." />
        <meta name="keywords" content="Markdown previewer" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '24px 24px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Markdown Preview
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 0, lineHeight: 1.5 }}>
          Live Markdown to HTML preview tool. Test and render markdown files instantly in your browser with real-time feedback and GitHub flavor.
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
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Markdown Preview?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A Markdown previewer allows you to write raw Markdown syntax and instantly see how it renders as HTML. It supports GitHub Flavored Markdown, including tables, code blocks, and lists."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Type or paste your Markdown text into the left editor. The right panel will render the formatted HTML live as you type."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: **Bold Text** → Output: Bold Text (rendered bold)"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ flexShrink: 0, maxWidth: 1200, width: '100%', margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/html-entity" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try HTML Entities →</Link>
          <Link to="/image-base64" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Image ↔ Base64 →</Link>
          <Link to="/json-formatter" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try JSON Formatter →</Link>
        </div>
      </div>
    </div>
  )
}
