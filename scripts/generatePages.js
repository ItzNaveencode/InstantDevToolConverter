import fs from 'fs'
import path from 'path'

const tools = [
  { 
    id: 'json-formatter',   
    name: 'JSON Formatter',     
    title: 'Free JSON Formatter Online – InstantConverters',
    description: 'Format, validate, and prettify JSON instantly. Free online JSON formatter with real-time output, smart input detection, and error checking.', 
    keyword: 'JSON formatter',
    seo: {
      what: 'A JSON formatter is a tool that takes minified or unreadable JSON strings and converts them into a cleanly indented, readable format. It also validates the structure to ensure it conforms to JSON standards.',
      how: 'Simply paste your raw JSON payload into the input box. The tool instantly parses your data, checks for syntax errors, and outputs a perfectly formatted JSON tree on the right.',
      example: 'Input: {"key":"value"} → Output:\n{\n  "key": "value"\n}'
    }
  },
  { 
    id: 'json-to-ts',       
    name: 'JSON → TypeScript',  
    title: 'JSON to TypeScript Converter (Instant) – InstantConverters',
    description: 'Convert JSON to TypeScript interfaces instantly. Free online tool to generate static types from raw JSON objects in real-time.', 
    keyword: 'JSON to TypeScript',
    seo: {
      what: 'A JSON to TypeScript converter automatically generates static type definitions (Interfaces) from dynamic JSON objects, saving you time when building strictly-typed frontend or backend applications.',
      how: 'Paste any valid JSON object or array. The tool instantly analyzes the property types (strings, numbers, booleans, nested objects) and produces ready-to-copy TypeScript interfaces.',
      example: 'Input: {"id": 1, "name": "John"} → Output: interface Root { id: number; name: string; }'
    }
  },
  { 
    id: 'markdown-preview', 
    name: 'Markdown Preview',   
    title: 'Live Markdown Previewer Online – InstantConverters',
    description: 'Live Markdown to HTML preview tool. Test and render markdown files instantly in your browser with real-time feedback and GitHub flavor.', 
    keyword: 'Markdown previewer',
    seo: {
      what: 'A Markdown previewer allows you to write raw Markdown syntax and instantly see how it renders as HTML. It supports GitHub Flavored Markdown, including tables, code blocks, and lists.',
      how: 'Type or paste your Markdown text into the left editor. The right panel will render the formatted HTML live as you type.',
      example: 'Input: **Bold Text** → Output: Bold Text (rendered bold)'
    }
  },
  { 
    id: 'xml-formatter',    
    name: 'XML Formatter',      
    title: 'Free XML Formatter & Prettier Online – InstantConverters',
    description: 'Format and prettify XML code instantly. Clean your XML payloads securely with this free, fast, and local in-browser developer tool.', 
    keyword: 'XML formatter',
    seo: {
      what: 'An XML formatter takes raw, minified XML payloads and adds proper indentation and line breaks, making complex SOAP APIs or configuration files readable.',
      how: 'Paste your unformatted XML into the input area. The tool will parse the tags and automatically indent the document for human readability.',
      example: 'Input: <root><item>1</item></root> → Output:\n<root>\n  <item>1</item>\n</root>'
    }
  },
  { 
    id: 'base64',      
    name: 'Base64 Decoder & Encoder',             
    title: 'Base64 Encode & Decode Tool Online – InstantConverters',
    description: 'Encode or decode Base64 strings securely and instantly in your browser. Fast, private, and real-time Base64 conversion tool.', 
    keyword: 'Base64 decoder',
    seo: {
      what: 'Base64 encoding converts binary or text data into an ASCII string format. It is widely used to embed image data, encode API keys, or safely transmit data across text-based protocols.',
      how: 'Select either "Encode" or "Decode". Paste your text into the input field, and the tool will instantly provide the converted Base64 or plain-text string.',
      example: 'Input: Hello → Output: SGVsbG8='
    }
  },
  { 
    id: 'url-encoder', 
    name: 'URL Encoder & Decoder',        
    title: 'Free URL Encoder & Decoder Online – InstantConverters',
    description: 'Encode or decode URL strings safely. Essential web tool for parsing queries, escaping special characters, and testing HTTP requests.', 
    keyword: 'URL encoder',
    seo: {
      what: 'URL encoding (percent-encoding) converts special characters into a format that can be safely transmitted over the Internet. It prevents special characters from breaking HTTP requests.',
      how: 'Paste a raw URL or query parameter. Click Encode to make it web-safe, or Decode to convert a percent-encoded string back to normal text.',
      example: 'Input: /path?name=john doe → Output: %2Fpath%3Fname%3Djohn%20doe'
    }
  },
  { 
    id: 'html-entity', 
    name: 'HTML Entities',      
    title: 'HTML Entity Encoder / Decoder (Instant) – InstantConverters',
    description: 'Escape and unescape HTML entities to prevent XSS. Fast, real-time string conversion for safe rendering in web applications.', 
    keyword: 'HTML entities escape',
    seo: {
      what: 'HTML Entity escaping converts special characters (like < and >) into safely renderable text equivalents (like &lt; and &gt;), preventing browser injection and XSS vulnerabilities.',
      how: 'Paste your HTML code. The tool will instantly escape dangerous characters for safe database storage, or unescape encoded entities back to raw HTML.',
      example: 'Input: <script> → Output: &lt;script&gt;'
    }
  },
  { 
    id: 'jwt-decoder', 
    name: 'JWT Decoder',        
    title: 'JWT Decoder & Inspector (Instant) – InstantConverters',
    description: 'Decode JSON Web Tokens securely online. No payloads sent to servers. Instant local parsing of JWT headers and claims.', 
    keyword: 'JWT decoder',
    seo: {
      what: 'A JWT decoder breaks down a JSON Web Token into its Header, Payload, and Signature components, allowing developers to read claims like user IDs and expiration dates.',
      how: 'Paste your eyJ... JWT string. The tool will instantly parse and pretty-print the JSON payload directly in your browser without making any network requests.',
      example: 'Input: eyJ... → Output: { "sub": "123", "exp": 1714000000 }'
    }
  },
  { 
    id: 'hash',        
    name: 'Hash Generator', 
    title: 'Free SHA-256 Hash Generator Online – InstantConverters',
    description: 'Generate SHA-1, SHA-256, and SHA-512 hashes securely in the browser. Instant, offline cryptographic hash generation.', 
    keyword: 'SHA-256 hash generator',
    seo: {
      what: 'A cryptographic hash generator takes an input string and produces a fixed-size, irreversible hash. It is heavily used in password hashing, data integrity checks, and cryptography.',
      how: 'Type your input string. The tool will instantly compute multiple hash variants (MD5, SHA-1, SHA-256, SHA-512) in real-time.',
      example: 'Input: admin → Output: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
    }
  },
  { 
    id: 'uuid',        
    name: 'UUID Generator', 
    title: 'Bulk UUID v4 Generator Online – InstantConverters',
    description: 'Generate version 4 UUIDs in bulk instantly. Free, secure, unique ID generator with no tracking and real-time generation.', 
    keyword: 'UUID generator',
    seo: {
      what: 'A UUID (Universally Unique Identifier) generator creates randomized 128-bit values used to uniquely identify database records, sessions, or API transactions globally without collisions.',
      how: 'Simply select the number of UUIDs you need and click generate. You can copy individual IDs or the entire list instantly.',
      example: 'Output: 550e8400-e29b-41d4-a716-446655440000'
    }
  },
  { 
    id: 'password',    
    name: 'Password Generator',   
    title: 'Secure Password Generator (Local) – InstantConverters',
    description: 'Create highly secure, randomized passwords locally in your browser. Fast, safe generation of symbols, numbers, and strings.', 
    keyword: 'secure password generator',
    seo: {
      what: 'A secure password generator creates strong, unpredictable strings containing uppercase, lowercase, numbers, and symbols to protect accounts from brute-force attacks.',
      how: 'Select your desired password length and character requirements (e.g. include symbols). The tool generates cryptographically secure passwords locally on your device.',
      example: 'Length 16 → Output: z&P9#mK2$qL5*vN1'
    }
  },
  { 
    id: 'lorem-ipsum', 
    name: 'Lorem Ipsum Generator',    
    title: 'Free Lorem Ipsum Generator Online – InstantConverters',
    description: 'Generate placeholder lorem ipsum text for your web designs and mockups. Instant paragraphs with a single click.', 
    keyword: 'Lorem Ipsum generator',
    seo: {
      what: 'Lorem Ipsum is standard placeholder text used in UI/UX design and typesetting to demonstrate the visual form of a document without relying on meaningful content.',
      how: 'Enter the number of paragraphs or sentences you need. The generator will instantly output the required amount of standard Latin placeholder text.',
      example: 'Input: 1 Paragraph → Output: Lorem ipsum dolor sit amet...'
    }
  },
  { 
    id: 'qrcode',      
    name: 'QR Code Generator',        
    title: 'Free QR Code Generator Online – InstantConverters',
    description: 'Generate scannable QR codes from any text or URL instantly. Free, local barcode creation with fast PNG downloads.', 
    keyword: 'QR Code generator',
    seo: {
      what: 'A QR code generator takes text, URLs, or data and encodes it into a 2D matrix barcode that can be instantly scanned by smartphone cameras.',
      how: 'Paste any text or link into the input box. The QR code will render immediately. You can adjust the size and download it as a PNG file.',
      example: 'Input: https://google.com → Output: [Downloadable PNG Image]'
    }
  },
  { 
    id: 'string-case',  
    name: 'Case Converter',   
    title: 'String Case Converter Tool (camelCase, snake_case) – InstantConverters',
    description: 'Convert text between camelCase, snake_case, PascalCase, and UPPER. Instant online formatting for developers.', 
    keyword: 'case converter',
    seo: {
      what: 'A string case converter reformats variable names and text blocks into specific programming naming conventions (like snake_case for Python, or camelCase for JavaScript).',
      how: 'Paste your text. The tool instantly provides versions of your string in camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE.',
      example: 'Input: Hello World → Output: helloWorld, hello_world, hello-world'
    }
  },
  { 
    id: 'word-counter', 
    name: 'Word Counter',     
    title: 'Live Word & Character Counter Online – InstantConverters',
    description: 'Count words, characters, and lines instantly with this free text tool. Perfect for SEO tracking and copywriting.', 
    keyword: 'word counter',
    seo: {
      what: 'A word and character counter provides real-time statistics on text blocks, crucial for SEO meta descriptions, tweet limits, and essay requirements.',
      how: 'Start typing or paste your text. The tool instantly calculates the total character count, word count, and line count.',
      example: 'Input: Hello World → Output: 2 words, 11 characters'
    }
  },
  { 
    id: 'regex-tester', 
    name: 'Regex Tester',     
    title: 'Free Online Regex Tester & Matcher – InstantConverters',
    description: 'Test regular expressions live against text. Highlight matches instantly with this free in-browser developer tool.', 
    keyword: 'regex tester',
    seo: {
      what: 'A Regex (Regular Expression) tester allows developers to write search patterns and immediately verify if they successfully match specific target strings in a block of text.',
      how: 'Enter your regex pattern in the top field (e.g. \\d+). Paste your test data below. All matching strings will be highlighted in real-time.',
      example: 'Pattern: \\d+ | Text: Age 25 → Match: 25'
    }
  },
  { 
    id: 'text-diff',    
    name: 'Text Diff Checker',        
    title: 'Free Text Diff Checker & Comparer – InstantConverters',
    description: 'Compare two text blocks to find additions and deletions instantly. Visual diff tool for code, content, and commits.', 
    keyword: 'text diff checker',
    seo: {
      what: 'A text diff checker compares an original text block against a modified version, visually highlighting exact insertions, deletions, and changes between the two.',
      how: 'Paste your original text on the left, and the modified text on the right. The tool will calculate the diff and highlight changes in red (removed) and green (added).',
      example: 'Left: Cat | Right: Cats → Output: +s (highlighted green)'
    }
  },
  { 
    id: 'line-tools',   
    name: 'Sort & Dedupe Lines',    
    title: 'Sort & Deduplicate Text Lines Online – InstantConverters',
    description: 'Sort, reverse, and deduplicate text lines instantly in your browser. Clean your lists securely without uploading data.', 
    keyword: 'deduplicate lines tool',
    seo: {
      what: 'A line sorting tool helps clean up large lists of data by sorting them alphabetically, reversing the order, or removing duplicate entries entirely.',
      how: 'Paste your list of items. Click the action buttons to sort A-Z, remove duplicate rows, or reverse the entire list order.',
      example: 'Input: Apple\nApple\nBanana → Output: Apple\nBanana'
    }
  },
  { 
    id: 'text-escape',  
    name: 'String Escape Tool',    
    title: 'JSON String Escape Tool Online – InstantConverters',
    description: 'Escape or unescape JSON strings quickly for safe payload transfers. Instant string processing for seamless API testing.', 
    keyword: 'string escape tool',
    seo: {
      what: 'A string escape tool automatically adds backslashes (\\) to special characters so they can be safely embedded inside JSON payloads or programming string literals.',
      how: 'Paste your raw text. The tool will escape quotes, newlines, and tabs, making it ready to be injected into a JSON string field.',
      example: 'Input: "Hello" → Output: \\"Hello\\"'
    }
  },
  { 
    id: 'timestamp',       
    name: 'Unix Timestamp Converter', 
    title: 'Unix Epoch Timestamp Converter (Instant) – InstantConverters',
    description: 'Convert Unix timestamps to readable dates (UTC, Local, ISO) instantly. Fast, real-time date math utility.', 
    keyword: 'Unix timestamp converter',
    seo: {
      what: 'A Unix timestamp converter translates the number of seconds (or milliseconds) elapsed since Jan 1, 1970 into human-readable date formats like UTC or ISO 8601.',
      how: 'Paste a numeric timestamp (e.g. 1714000000). The tool will instantly display the exact Date and Time in UTC, your local timezone, and standard ISO formats.',
      example: 'Input: 1714000000 → Output: Thu, 25 Apr 2024 00:53:20 GMT'
    }
  },
  { 
    id: 'color-converter', 
    name: 'Color Converter',
    title: 'Free HEX to RGB Color Converter – InstantConverters',
    description: 'Convert between HEX, RGB, and HSL color formats instantly. UI tool for modern web designers and frontend engineers.', 
    keyword: 'HEX to RGB converter',
    seo: {
      what: 'A color converter translates design color codes between HEX, RGB, and HSL formats, essential for frontend developers translating Figma designs into CSS code.',
      how: 'Paste any HEX code or RGB string. The tool will render a color preview and output the exact equivalent codes in all other web formats.',
      example: 'Input: #ffffff → Output: rgb(255, 255, 255), hsl(0, 0%, 100%)'
    }
  },
  { 
    id: 'number-base',     
    name: 'Number Base Converter',    
    title: 'Hex to Decimal Number Converter – InstantConverters',
    description: 'Convert between Decimal, Hexadecimal, Binary, and Octal numbers in real time. Essential utility for developers.', 
    keyword: 'hex to decimal converter',
    seo: {
      what: 'A number base converter translates numeric values between decimal (base 10), hexadecimal (base 16), binary (base 2), and octal (base 8) systems.',
      how: 'Type your number into any of the base input fields. The tool will calculate and populate the converted values in all other bases simultaneously.',
      example: 'Input Decimal: 255 → Output Hex: FF, Binary: 11111111'
    }
  },
  { 
    id: 'url-parser',      
    name: 'URL Parser',     
    title: 'Live URL Parser & Query Inspector – InstantConverters',
    description: 'Parse and inspect URL components and query parameters easily. Instant web decoding and link analysis tool.', 
    keyword: 'URL parser',
    seo: {
      what: 'A URL parser breaks down a complex web address into its individual components: protocol, host, pathname, and extracts query string parameters into a readable JSON object.',
      how: 'Paste a full URL. The tool parses it instantly, allowing you to easily inspect hidden UTM tags or deeply nested query parameters.',
      example: 'Input: https://example.com?id=1 → Output: Protocol: https:, Host: example.com, Params: { id: "1" }'
    }
  },
  { 
    id: 'image-base64',    
    name: 'Image ↔ Base64', 
    title: 'Image to Base64 Data URI Converter – InstantConverters',
    description: 'Convert images to Base64 data URIs securely in your browser. Fast local conversion for CSS and HTML payloads.', 
    keyword: 'image to base64 converter',
    seo: {
      what: 'An image to Base64 converter takes an image file and converts it into a Data URI string. This allows developers to embed images directly within HTML or CSS without making external HTTP requests.',
      how: 'Upload an image file from your computer. The tool will process the file locally and output the raw Base64 string that you can copy into your code.',
      example: 'Input: logo.png → Output: data:image/png;base64,iVBORw0K...'
    }
  },
]

function toPascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

const dir = path.join(process.cwd(), 'src', 'pages')
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const getInternalLinks = (currentId) => {
  const others = tools.filter(t => t.id !== currentId)
  const mixed = others.sort((a, b) => (a.id > b.id ? 1 : -1))
  const idx = tools.findIndex(t => t.id === currentId)
  return [
    mixed[(idx + 1) % mixed.length],
    mixed[(idx + 2) % mixed.length],
    mixed[(idx + 3) % mixed.length]
  ]
}

tools.forEach(tool => {
  const componentName = toPascalCase(tool.id) + 'Page'
  const links = getInternalLinks(tool.id)
  
  const content = `import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { allTools } from '../utils/toolConfig'
import ToolPage from '../components/ToolPage'

export default function ${componentName}() {
  const tool = allTools.find(t => t.id === '${tool.id}')
  if (!tool) return null

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "${tool.name}",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "${tool.description}",
    "url": "https://instant-dev-tool-converter.vercel.app/${tool.id}"
  }

  return (
    <div className="seo-page-wrapper">
      <Helmet>
        <title>${tool.title}</title>
        <meta name="description" content="${tool.description}" />
        <meta name="keywords" content="${tool.keyword}" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Visible SEO Content (above tool) */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingTop: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>
          ${tool.name}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.5 }}>
          ${tool.description}
        </p>
      </div>

      <ToolPage tool={tool} />

      {/* SEO Content Sections (below tool) */}
      <section style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 24px' }} className="space-y-4 seo-content-section">
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>What is a ${tool.name}?</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {${JSON.stringify(tool.seo.what)}}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>How to use this tool</h2>
        <p style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6 }}>
          {${JSON.stringify(tool.seo.how)}}
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--t1)', marginBottom: 8 }}>Example</h2>
        <pre style={{ fontSize: 14, color: 'var(--t3)', marginBottom: 24, lineHeight: 1.6, fontFamily: 'var(--mono)', background: 'var(--inp)', padding: '12px', borderRadius: '6px', border: '1px solid var(--bdr)', whiteSpace: 'pre-wrap' }}>
          {${JSON.stringify(tool.seo.example)}}
        </pre>
      </section>

      {/* Internal Linking (below tool) */}
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '24px', borderTop: '1px solid var(--bdr)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 16 }}>More Developer Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          ${links.map(l => `<Link to="/${l.id}" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}>Try ${l.name} →</Link>`).join('\n          ')}
        </div>
      </div>
    </div>
  )
}
`
  fs.writeFileSync(path.join(dir, `${componentName}.jsx`), content)
})

console.log('Generated ' + tools.length + ' page components with structured data and improved titles.')
