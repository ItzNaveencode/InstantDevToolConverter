import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function StringCasePage() {
  const tool = allTools.find(t => t.id === 'string-case')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Case Converter",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "Convert text between camelCase, snake_case, PascalCase, and UPPER. Instant online formatting for developers.",
    "url": "https://instant-dev-tool-converter.vercel.app/string-case"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>String Case Converter Tool (camelCase, snake_case) – InstantConverters</title>
        <meta name="description" content="Convert text between camelCase, snake_case, PascalCase, and UPPER. Instant online formatting for developers." />
        <meta name="keywords" content="case converter" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          Case Converter
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          Convert text between camelCase, snake_case, PascalCase, and UPPER. Instant online formatting for developers.
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a Case Converter?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"A string case converter reformats variable names and text blocks into specific programming naming conventions (like snake_case for Python, or camelCase for JavaScript)."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {"Paste your text. The tool instantly provides versions of your string in camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE."}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {"Input: Hello World → Output: helloWorld, hello_world, hello-world"}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <Link to="/regex-tester" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Regex Tester →</Link>
          <Link to="/text-diff" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try Text Diff Checker →</Link>
          <Link to="/text-escape" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try String Escape Tool →</Link>
        </div>
      </div>
    </div>
  )
}
