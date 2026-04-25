import {
  FileJson, Hash, Clock, Binary, Key, Type, Palette, Link,
  Code, FileText, QrCode, AlignLeft, Search, Fingerprint,
  Calculator, Globe, FileCode2, SplitSquareHorizontal, Edit3,
  Shield, Braces, Shuffle, ListOrdered, ImageIcon
} from 'lucide-react'

// Each category gets a distinct color — like iLovePDF's colored icons
export const toolCategories = [
  {
    name: 'Formatters',
    color: '#3b82f6',   // blue
    tools: [
      { id: 'json-formatter',   name: 'JSON Formatter',     icon: FileJson,             description: 'Format, validate & minify JSON',          category: 'Formatters', type: 'json', route: '/json-formatter' },
      { id: 'json-to-ts',       name: 'JSON → TypeScript',  icon: Braces,               description: 'Convert JSON to TypeScript interfaces',   category: 'Formatters', type: 'json', route: '/json-to-ts' },
      { id: 'markdown-preview', name: 'Markdown Preview',   icon: FileText,             description: 'Live Markdown to HTML preview',            category: 'Formatters', type: 'markdown', route: '/markdown-preview' },
      { id: 'xml-formatter',    name: 'XML Formatter',      icon: FileCode2,            description: 'Format and prettify XML code',             category: 'Formatters', type: 'xml', route: '/xml-formatter' },
    ]
  },
  {
    name: 'Encoders & Decoders',
    color: '#10b981',   // green
    tools: [
      { id: 'base64',      name: 'Base64',             icon: Binary,  description: 'Encode or decode Base64 strings',   category: 'Encoders', type: 'base64', route: '/base64' },
      { id: 'url-encoder', name: 'URL Encoder',        icon: Link,    description: 'Encode or decode URL strings',      category: 'Encoders', type: 'url', route: '/url-encoder' },
      { id: 'html-entity', name: 'HTML Entities',      icon: Code,    description: 'Escape & unescape HTML entities',   category: 'Encoders', type: 'html', route: '/html-entity' },
      { id: 'jwt-decoder', name: 'JWT Decoder',        icon: Key,     description: 'Decode JSON Web Tokens securely',  category: 'Encoders', type: 'jwt', route: '/jwt-decoder' },
    ]
  },
  {
    name: 'Generators',
    color: '#f59e0b',   // amber
    tools: [
      { id: 'hash',        name: 'Hash Generator', icon: Hash,        description: 'SHA-1, SHA-256, SHA-512 hashes',   category: 'Generators', route: '/hash' },
      { id: 'uuid',        name: 'UUID Generator', icon: Fingerprint, description: 'Generate v4 UUIDs in bulk',        category: 'Generators', type: 'uuid', route: '/uuid' },
      { id: 'password',    name: 'Password Gen',   icon: Shield,      description: 'Secure random passwords',          category: 'Generators', route: '/password' },
      { id: 'lorem-ipsum', name: 'Lorem Ipsum',    icon: AlignLeft,   description: 'Generate placeholder text',        category: 'Generators', route: '/lorem-ipsum' },
      { id: 'qrcode',      name: 'QR Code',        icon: QrCode,      description: 'Generate QR codes from any text', category: 'Generators', route: '/qrcode' },
    ]
  },
  {
    name: 'Text Tools',
    color: '#8b5cf6',   // violet
    tools: [
      { id: 'string-case',  name: 'Case Converter',   icon: Type,                 description: 'camelCase, snake_case, UPPER',       category: 'Text Tools', route: '/string-case' },
      { id: 'word-counter', name: 'Word Counter',     icon: Edit3,                description: 'Count words, characters & lines',    category: 'Text Tools', route: '/word-counter' },
      { id: 'regex-tester', name: 'Regex Tester',     icon: Search,               description: 'Test regular expressions live',      category: 'Text Tools', route: '/regex-tester' },
      { id: 'text-diff',    name: 'Text Diff',        icon: SplitSquareHorizontal,description: 'Compare two text blocks',            category: 'Text Tools', route: '/text-diff' },
      { id: 'line-tools',   name: 'Sort & Dedupe',    icon: ListOrdered,          description: 'Sort, reverse & deduplicate lines',  category: 'Text Tools', route: '/line-tools' },
      { id: 'text-escape',  name: 'String Escape',    icon: Shuffle,              description: 'Escape / unescape JSON strings',     category: 'Text Tools', route: '/text-escape' },
    ]
  },
  {
    name: 'Converters',
    color: '#ef4444',   // red
    tools: [
      { id: 'timestamp',       name: 'Unix Timestamp', icon: Clock,      description: 'Convert timestamps to dates',    category: 'Converters', type: 'timestamp', route: '/timestamp' },
      { id: 'color-converter', name: 'Color Converter',icon: Palette,    description: 'HEX, RGB, HSL conversions',      category: 'Converters', type: 'color', route: '/color-converter' },
      { id: 'number-base',     name: 'Number Base',    icon: Calculator, description: 'Dec ↔ Hex ↔ Binary ↔ Octal',    category: 'Converters', route: '/number-base' },
      { id: 'url-parser',      name: 'URL Parser',     icon: Globe,      description: 'Parse & inspect URL components', category: 'Converters', type: 'url', route: '/url-parser' },
      { id: 'image-base64',    name: 'Image ↔ Base64', icon: ImageIcon,  description: 'Images to Base64 data URIs',     category: 'Converters', route: '/image-base64' },
    ]
  },
]

// Build a color lookup for quick access
export const categoryColorMap = Object.fromEntries(
  toolCategories.map(c => [c.name, c.color])
)

export const allTools = toolCategories.flatMap(c =>
  c.tools.map(t => ({ ...t, iconColor: c.color }))
)
