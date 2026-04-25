import useStore from '../store'
import { allTools } from '../utils/toolConfig'
import { Copy } from 'lucide-react'

// Lazy imports for all tools
import JsonFormatter from '../tools/JsonFormatter'
import Base64Encoder from '../tools/Base64Encoder'
import { UrlEncoder, HtmlEntity, MarkdownPreviewTool, WordCounter, UuidGenerator, QrCodeTool, TimestampConverter, StringCase, NumberBase, JwtDecoderTool } from '../tools/GenericTools'
import { HashGenerator, LoremIpsum, ColorConverter, UrlParser } from '../tools/GenericTools2'
import { RegexTester, TextDiff, PasswordGenerator, LineSortDedupe, TextEscape, XmlFormatter, JsonToTs, ImageBase64 } from '../tools/GenericTools3'

const toolMap = {
  'json-formatter': JsonFormatter,
  'base64': Base64Encoder,
  'url-encoder': UrlEncoder,
  'html-entity': HtmlEntity,
  'markdown-preview': MarkdownPreviewTool,
  'word-counter': WordCounter,
  'uuid': UuidGenerator,
  'qrcode': QrCodeTool,
  'timestamp': TimestampConverter,
  'string-case': StringCase,
  'number-base': NumberBase,
  'jwt-decoder': JwtDecoderTool,
  'hash': HashGenerator,
  'lorem-ipsum': LoremIpsum,
  'color-converter': ColorConverter,
  'url-parser': UrlParser,
  'regex-tester': RegexTester,
  'text-diff': TextDiff,
  'password': PasswordGenerator,
  'line-tools': LineSortDedupe,
  'text-escape': TextEscape,
  'xml-formatter': XmlFormatter,
  'json-to-ts': JsonToTs,
  'image-base64': ImageBase64,
}

export default function ToolContainer() {
  const activeToolId = useStore(s => s.activeTool)
  const tool = allTools.find(t => t.id === activeToolId)
  if (!tool) return null

  const ToolComponent = toolMap[activeToolId]
  const Icon = tool.icon

  return (
    <div className="main-stage">
      <div className="tool-header">
        <div className="tool-header-icon"><Icon size={24} /></div>
        <div className="tool-header-text">
          <h2>{tool.name}</h2>
          <p>{tool.description}</p>
        </div>
      </div>
      <div className="tool-body">
        {ToolComponent ? <ToolComponent /> : <div style={{color:'var(--text-3)',textAlign:'center',padding:40}}>Coming soon</div>}
      </div>
    </div>
  )
}

// Shared components for tools
export function CardPane({ title, actions, children }) {
  return (
    <div className="card-pane">
      <div className="card-pane-header">
        <span>{title}</span>
        {actions && <div style={{display:'flex',gap:6}}>{actions}</div>}
      </div>
      <div className="card-pane-body">{children}</div>
    </div>
  )
}

export function CopyBtn({ text }) {
  const copy = useStore(s => s.copyToClipboard)
  return <button className="df-btn sm ghost" onClick={() => copy(text)} title="Copy"><Copy size={14} /> Copy</button>
}
