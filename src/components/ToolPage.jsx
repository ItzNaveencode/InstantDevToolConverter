import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import useStore from '../store'
import JsonFormatter from './tools/JsonFormatter'
import Base64Encoder from './tools/Base64Encoder'
import {
  UrlEncoder, HtmlEntity, MarkdownPreviewTool, WordCounter,
  UuidGenerator, QrCodeTool, TimestampConverter, StringCase,
  NumberBase, JwtDecoderTool
} from './tools/GenericTools'
import { HashGenerator, LoremIpsum, ColorConverter, UrlParser } from './tools/GenericTools2'
import {
  RegexTester, TextDiff, PasswordGenerator, LineSortDedupe,
  TextEscape, XmlFormatter, JsonToTs, ImageBase64
} from './tools/GenericTools3'

const MAP = {
  'json-formatter':   JsonFormatter,
  'base64':           Base64Encoder,
  'url-encoder':      UrlEncoder,
  'html-entity':      HtmlEntity,
  'markdown-preview': MarkdownPreviewTool,
  'word-counter':     WordCounter,
  'uuid':             UuidGenerator,
  'qrcode':           QrCodeTool,
  'timestamp':        TimestampConverter,
  'string-case':      StringCase,
  'number-base':      NumberBase,
  'jwt-decoder':      JwtDecoderTool,
  'hash':             HashGenerator,
  'lorem-ipsum':      LoremIpsum,
  'color-converter':  ColorConverter,
  'url-parser':       UrlParser,
  'regex-tester':     RegexTester,
  'text-diff':        TextDiff,
  'password':         PasswordGenerator,
  'line-tools':       LineSortDedupe,
  'text-escape':      TextEscape,
  'xml-formatter':    XmlFormatter,
  'json-to-ts':       JsonToTs,
  'image-base64':     ImageBase64,
}

export default function ToolPage({ tool }) {
  const Comp = MAP[tool.id]
  const Icon = tool.icon
  return (
    <div className="tool-page tool-enter" key={tool.id}>
      <div className="tool-page-header">
        <Link to="/" className="back-btn" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={14} /> All Tools
        </Link>
        <div className="tool-page-divider" />
        <div className="tool-page-icon" style={{ color: tool.iconColor || 'var(--brand)' }}><Icon size={18} /></div>
        <div>
          <div className="tool-page-name">{tool.name}</div>
          <div className="tool-page-desc">{tool.description}</div>
        </div>
      </div>
      <div className="tool-page-body">
        {Comp
          ? <Comp />
          : <div style={{color:'var(--t3)',textAlign:'center',padding:'60px 0',fontSize:15}}>This tool is coming soon</div>
        }
      </div>
    </div>
  )
}

// ── Shared UI primitives used by all tools ──
export function Pane({ title, actions, children, style }) {
  return (
    <div className="pane" style={style}>
      <div className="pane-head">
        <span>{title}</span>
        {actions && <div className="pane-head-actions">{actions}</div>}
      </div>
      <div className="pane-body">{children}</div>
    </div>
  )
}

export function CopyBtn({ text, label = 'Copy' }) {
  const copy = useStore(s => s.copyToClipboard)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copy(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className="btn sm ghost" onClick={handleCopy} style={{ minWidth: 60, justifyContent: 'center', transition: 'all 0.2s' }}>
      {copied ? <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>Copied ✓</span> : label}
    </button>
  )
}
