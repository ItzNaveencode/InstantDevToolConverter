import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import QRCode from 'qrcode'
import { marked } from 'marked'
import { Pane, CopyBtn } from '../components/ToolPage'
import useStore from '../store'

export function UrlEncoder() {
  const [input, setInput] = useState('hello world & foo=bar')
  const [mode, setMode] = useState('encode')
  let output = ''
  try { output = mode==='encode' ? encodeURIComponent(input) : decodeURIComponent(input) } catch { output='Invalid input' }
  return (
    <>
      <div className="act-bar">
        <div className="seg">
          <button className={`seg-btn ${mode==='encode'?'on':''}`} onClick={()=>setMode('encode')}>Encode</button>
          <button className={`seg-btn ${mode==='decode'?'on':''}`} onClick={()=>setMode('decode')}>Decode</button>
        </div>
      </div>
      <div className="split-h">
        <Pane title="Input"><textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} /></Pane>
        <Pane title="Output" actions={<CopyBtn text={output}/>}><textarea className="ta ro" value={output} readOnly /></Pane>
      </div>
    </>
  )
}

export function HtmlEntity() {
  const [input, setInput] = useState('<h1 class="title">Hello & "World"</h1>')
  const [mode, setMode] = useState('encode')
  const encode = s => s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
  const decode = s => { const d=document.createElement('div'); d.innerHTML=s; return d.textContent||d.innerText }
  const output = mode==='encode' ? encode(input) : decode(input)
  return (
    <>
      <div className="act-bar">
        <div className="seg">
          <button className={`seg-btn ${mode==='encode'?'on':''}`} onClick={()=>setMode('encode')}>Escape</button>
          <button className={`seg-btn ${mode==='decode'?'on':''}`} onClick={()=>setMode('decode')}>Unescape</button>
        </div>
      </div>
      <div className="split-h">
        <Pane title="Input"><textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} /></Pane>
        <Pane title="Output" actions={<CopyBtn text={output}/>}><textarea className="ta ro" value={output} readOnly /></Pane>
      </div>
    </>
  )
}

export function MarkdownPreviewTool() {
  const [md, setMd] = useState('# Hello InstantDevToolConverter\n\nWrite **Markdown** and see a live preview.\n\n## Features\n- Instant preview\n- Full GFM support\n- Tables, code blocks & more\n\n```js\nconsole.log("Hello InstantDevToolConverter!")\n```\n\n> Your all-in-one developer toolkit')
  const html = marked.parse(md)
  return (
    <div className="split-h">
      <Pane title="Markdown"><textarea className="ta" value={md} onChange={e=>setMd(e.target.value)} /></Pane>
      <Pane title="Preview"><div className="md-out" dangerouslySetInnerHTML={{__html:html}} /></Pane>
    </div>
  )
}

export function WordCounter() {
  const [text, setText] = useState('')
  const words   = text.trim() ? text.trim().split(/\s+/).length : 0
  const chars   = text.length
  const noSp    = text.replace(/\s/g,'').length
  const lines   = text ? text.split(/\r?\n/).length : 0
  const readMin = Math.ceil(words/200)
  return (
    <>
      <div className="stat-row">
        <div className="stat-card"><div className="stat-val">{words}</div><div className="stat-lbl">Words</div></div>
        <div className="stat-card"><div className="stat-val">{chars}</div><div className="stat-lbl">Characters</div></div>
        <div className="stat-card"><div className="stat-val">{noSp}</div><div className="stat-lbl">No Spaces</div></div>
        <div className="stat-card"><div className="stat-val">{lines}</div><div className="stat-lbl">Lines</div></div>
        <div className="stat-card"><div className="stat-val">{readMin}m</div><div className="stat-lbl">Read Time</div></div>
      </div>
      <Pane title="Your Text"><textarea className="ta" value={text} onChange={e=>setText(e.target.value)} placeholder="Paste or type text here…" /></Pane>
    </>
  )
}

export function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [upper, setUpper] = useState(false)
  const [uuids, setUuids] = useState('')
  const gen = () => {
    const list = Array.from({length:count}, () => crypto.randomUUID())
    setUuids((upper ? list.map(u=>u.toUpperCase()) : list).join('\n'))
  }
  useEffect(gen, [count, upper])
  return (
    <>
      <div className="act-bar">
        <label className="lbl" style={{margin:0}}>Count</label>
        <input className="inp" type="number" style={{width:80}} value={count} onChange={e=>setCount(Math.max(1,Math.min(1000,+e.target.value)))} />
        <button className={`btn ${upper?'primary':''}`} onClick={()=>setUpper(!upper)}>UPPERCASE</button>
        <button className="btn" onClick={gen}>Regenerate</button>
      </div>
      <Pane title={`${count} UUIDs (v4)`} actions={<CopyBtn text={uuids}/>}>
        <textarea className="ta ro" value={uuids} readOnly />
      </Pane>
    </>
  )
}

export function QrCodeTool() {
  const [input, setInput]   = useState('https://devforge.dev')
  const [size, setSize]     = useState(300)
  const [qrUrl, setQrUrl]   = useState('')
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!input.trim()) { setQrUrl(''); return }
    QRCode.toDataURL(input, {
      width: size,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'H',
    })
      .then(url => { setQrUrl(url); setError(null) })
      .catch(e  => { setQrUrl(''); setError(e.message) })
  }, [input, size])

  const download = () => {
    if (!qrUrl) return
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <>
      <div className="act-bar">
        <div className="seg">
          {[200, 300, 400].map(s => (
            <button key={s} className={`seg-btn ${size === s ? 'on' : ''}`} onClick={() => setSize(s)}>
              {s}px
            </button>
          ))}
        </div>
        {qrUrl && (
          <button className="btn primary" onClick={download}>↓ Download PNG</button>
        )}
        {error && <div className="err">{error}</div>}
      </div>
      <div className="split-h">
        <Pane title="Text or URL">
          <textarea className="ta" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text, URL, or any data…" />
        </Pane>
        <Pane title="QR Code">
          <div className="qr-box">
            {qrUrl
              ? <img src={qrUrl} alt="QR Code" style={{width: size, height: size}} />
              : <span style={{color:'var(--t4)',fontSize:14}}>Enter text to generate</span>
            }
          </div>
        </Pane>
      </div>
    </>
  )
}


export function TimestampConverter() {
  const [ts, setTs] = useState(()=>Math.floor(Date.now()/1000).toString())
  const num = parseInt(ts)
  const valid = !isNaN(num)
  const date = valid ? new Date(ts.length>10 ? num : num*1000) : null
  const copy = useStore(s=>s.copyToClipboard)
  return (
    <>
      <div className="act-bar">
        <button className="btn" onClick={()=>setTs(Math.floor(Date.now()/1000).toString())}>Now (sec)</button>
        <button className="btn" onClick={()=>setTs(Date.now().toString())}>Now (ms)</button>
      </div>
      <Pane title="Unix Timestamp">
        <div style={{padding:16}}>
          <input className="inp" value={ts} onChange={e=>setTs(e.target.value)} placeholder="e.g. 1714000000" />
        </div>
      </Pane>
      {valid && date && (
        <Pane title="Converted">
          <div className="rlist">
            {[['UTC',date.toUTCString()],['Local',date.toString()],['ISO 8601',date.toISOString()],['Unix (s)',Math.floor(date.getTime()/1000).toString()],['Unix (ms)',date.getTime().toString()]].map(([l,v])=>(
              <div className="rrow" key={l}>
                <div className="rlabel">{l}</div>
                <div className="rval">{v}</div>
                <button className="btn sm ghost rcopy" onClick={()=>copy(v)}>Copy</button>
              </div>
            ))}
          </div>
        </Pane>
      )}
    </>
  )
}

export function StringCase() {
  const [input, setInput] = useState('hello world example text')
  const copy = useStore(s=>s.copyToClipboard)
  const tok = input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || []
  const cases = [
    ['lowercase',     input.toLowerCase()],
    ['UPPERCASE',     input.toUpperCase()],
    ['Title Case',    input.replace(/\b\w/g,c=>c.toUpperCase())],
    ['camelCase',     tok.map((w,i)=>i===0?w.toLowerCase():w[0].toUpperCase()+w.slice(1).toLowerCase()).join('')],
    ['PascalCase',    tok.map(w=>w[0].toUpperCase()+w.slice(1).toLowerCase()).join('')],
    ['snake_case',    tok.map(w=>w.toLowerCase()).join('_')],
    ['kebab-case',    tok.map(w=>w.toLowerCase()).join('-')],
    ['CONSTANT_CASE', tok.map(w=>w.toUpperCase()).join('_')],
  ]
  return (
    <>
      <Pane title="Input" style={{flexShrink:0,maxHeight:120}}>
        <textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:80}} />
      </Pane>
      <Pane title="All Formats">
        <div className="rlist">
          {cases.map(([l,v])=>(
            <div className="rrow" key={l}>
              <div className="rlabel">{l}</div>
              <div className="rval">{v||'—'}</div>
              <button className="btn sm ghost rcopy" onClick={()=>copy(v)}>Copy</button>
            </div>
          ))}
        </div>
      </Pane>
    </>
  )
}

export function NumberBase() {
  const [vals, setVals] = useState({dec:'255',hex:'ff',bin:'11111111',oct:'377'})
  const update = (v, base) => {
    const n = parseInt(v,base)
    if(isNaN(n)) setVals({dec:'',hex:'',bin:'',oct:''})
    else setVals({dec:n.toString(10),hex:n.toString(16),bin:n.toString(2),oct:n.toString(8)})
  }
  return (
    <Pane title="Number Base Converter">
      <div style={{padding:24,display:'flex',flexDirection:'column',gap:20,flex:1}}>
        {[['Decimal (Base 10)','dec',10],['Hexadecimal (Base 16)','hex',16],['Binary (Base 2)','bin',2],['Octal (Base 8)','oct',8]].map(([l,k,base])=>(
          <div key={k}><label className="lbl">{l}</label><input className="inp" value={vals[k]} onChange={e=>update(e.target.value,base)} /></div>
        ))}
      </div>
    </Pane>
  )
}

export function JwtDecoderTool() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('{}')
  const [payload, setPayload] = useState('{}')
  const [error, setError] = useState(null)
  useEffect(()=>{
    try {
      if(!token){setHeader('{}');setPayload('{}');setError(null);return}
      const p=token.split('.')
      if(p.length<2) throw new Error('Not a valid JWT (needs 3 parts)')
      const d=s=>JSON.stringify(JSON.parse(atob(s.replace(/-/g,'+').replace(/_/g,'/'))),null,2)
      setHeader(d(p[0])); setPayload(d(p[1])); setError(null)
    } catch(e){setError(e.message);setHeader('{}');setPayload('{}')}
  },[token])
  return (
    <>
      <Pane title="JWT Token" style={{flexShrink:0,maxHeight:130}}>
        <textarea className="ta" value={token} onChange={e=>setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…" style={{minHeight:80}} />
        {error && <div className="err">{error}</div>}
      </Pane>
      <div className="split-h">
        <Pane title="Header" actions={<CopyBtn text={header}/>}><div style={{flex:1,minHeight:0,overflow:'hidden'}}><Editor height="100%" language="json" theme="vs-dark" value={header} options={{readOnly:true,minimap:{enabled:false},fontSize:13,scrollBeyondLastLine:false}} /></div></Pane>
        <Pane title="Payload" actions={<CopyBtn text={payload}/>}><div style={{flex:1,minHeight:0,overflow:'hidden'}}><Editor height="100%" language="json" theme="vs-dark" value={payload} options={{readOnly:true,minimap:{enabled:false},fontSize:13,scrollBeyondLastLine:false}} /></div></Pane>
      </div>
    </>
  )
}
