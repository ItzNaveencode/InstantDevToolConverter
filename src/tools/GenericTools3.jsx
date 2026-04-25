import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Pane, CopyBtn } from '../components/ToolPage'
import useStore from '../store'

// ── Regex Tester ──────────────────────────────────
export function RegexTester() {
  const [pattern, setPattern] = useState('\\b\\w+forge\\b')
  const [flags, setFlags]     = useState('gi')
  const [text, setText]       = useState('Welcome to InstantDevToolConverter! InstantDevToolConverter has 24 tools for developers.')

  // Pure derived computation — no setState during render
  let highlighted = text
  let matches = []
  let error = null
  try {
    const safeFlags = flags.replace(/[^gimsuy]/g, '')
    const gFlags = safeFlags.includes('g') ? safeFlags : safeFlags + 'g'
    const re  = new RegExp(pattern, safeFlags)
    const reG = new RegExp(pattern, gFlags)
    matches = [...text.matchAll(reG)]
    highlighted = text.replace(re, m => `<mark style="background:rgba(99,102,241,.18);border-bottom:2px solid #4f46e5;border-radius:2px;padding:0 2px">${m}</mark>`)
  } catch(e) { error = e.message }

  return (
    <>
      <div className="act-bar">
        <div style={{flex:1}}>
          <label className="lbl">Pattern</label>
          <div style={{display:'flex',flex:1,background:'var(--inp)',border:'1px solid var(--bdr)',borderRadius:'var(--r)',overflow:'hidden',fontSize:14}}>
            <span style={{padding:'8px 12px',color:'var(--t3)',fontFamily:'var(--mono)',background:'var(--hov)',borderRight:'1px solid var(--bdr)'}}>/ </span>
            <input className="inp" style={{border:'none',borderRadius:0,background:'transparent',flex:1}} value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="regex pattern" />
            <span style={{padding:'8px 12px',color:'var(--t3)',fontFamily:'var(--mono)',background:'var(--hov)',borderLeft:'1px solid var(--bdr)'}}> /</span>
            <input className="inp" style={{border:'none',borderRadius:0,background:'transparent',width:60,fontFamily:'var(--mono)'}} value={flags} onChange={e=>setFlags(e.target.value)} placeholder="gi" />
          </div>
        </div>
        <div style={{alignSelf:'flex-end',padding:'8px 14px',background:'var(--inp)',border:'1px solid var(--bdr)',borderRadius:'var(--r)',fontSize:13,color:matches.length?'#059669':'var(--t3)',fontWeight:600}}>
          {matches.length} match{matches.length!==1?'es':''}
        </div>
      </div>
      {error && <div className="err">{error}</div>}
      <Pane title="Test String">
        <textarea className="ta" value={text} onChange={e=>setText(e.target.value)} />
      </Pane>
      <Pane title="Highlighted Matches">
        <div style={{flex:1,padding:18,fontFamily:'var(--mono)',fontSize:13,lineHeight:1.7,color:'var(--t1)',background:'var(--card)',overflowY:'auto',whiteSpace:'pre-wrap',wordBreak:'break-word'}} dangerouslySetInnerHTML={{__html:highlighted}} />
      </Pane>
    </>
  )
}

// ── Text Diff ──────────────────────────────────────
export function TextDiff() {
  const [a, setA] = useState('The quick brown fox jumps over the lazy dog.')
  const [b, setB] = useState('The quick red fox leaps over the sleeping cat.')

  const diff = () => {
    const wa = a.split(/\s+/), wb = b.split(/\s+/)
    const setA2 = new Set(wa), setB2 = new Set(wb)
    const aH = wa.map(w => setB2.has(w) ? w : `<del style="background:rgba(239,68,68,.2);color:var(--red);text-decoration:line-through;padding:0 2px;border-radius:3px">${w}</del>`).join(' ')
    const bH = wb.map(w => setA2.has(w) ? w : `<ins style="background:rgba(16,185,129,.15);color:var(--green);text-decoration:none;padding:0 2px;border-radius:3px">${w}</ins>`).join(' ')
    return { aH, bH }
  }
  const { aH, bH } = diff()
  return (
    <div className="split-v">
      <div className="split-h" style={{flex:'0 0 auto'}}>
        <Pane title="Text A" style={{minHeight:140}}>
          <textarea className="ta" value={a} onChange={e=>setA(e.target.value)} />
        </Pane>
        <Pane title="Text B" style={{minHeight:140}}>
          <textarea className="ta" value={b} onChange={e=>setB(e.target.value)} />
        </Pane>
      </div>
      <div className="split-h">
        <Pane title="A — Removed words highlighted">
          <div style={{flex:1,padding:18,fontFamily:'var(--sans)',fontSize:14,lineHeight:1.75,color:'var(--t1)',background:'var(--s1)',overflowY:'auto'}} dangerouslySetInnerHTML={{__html:aH}} />
        </Pane>
        <Pane title="B — Added words highlighted">
          <div style={{flex:1,padding:18,fontFamily:'var(--sans)',fontSize:14,lineHeight:1.75,color:'var(--t1)',background:'var(--s1)',overflowY:'auto'}} dangerouslySetInnerHTML={{__html:bH}} />
        </Pane>
      </div>
    </div>
  )
}

// ── Password Generator ─────────────────────────────
export function PasswordGenerator() {
  const [length, setLength] = useState(20)
  const [opts, setOpts] = useState({ upper:true, lower:true, numbers:true, symbols:true })
  const [password, setPassword] = useState('')
  const copy = useStore(s=>s.copyToClipboard)

  const gen = () => {
    const sets = []
    if(opts.upper)   sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    if(opts.lower)   sets.push('abcdefghijklmnopqrstuvwxyz')
    if(opts.numbers) sets.push('0123456789')
    if(opts.symbols) sets.push('!@#$%^&*()_+-=[]{}|;:,.<>?')
    if(!sets.length) return
    const pool = sets.join('')
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    setPassword(Array.from(arr, n=>pool[n%pool.length]).join(''))
  }
  useEffect(gen, [length, opts])

  const strength = () => {
    let s = 0
    if(opts.upper) s++; if(opts.lower) s++; if(opts.numbers) s++; if(opts.symbols) s++
    if(length>=16) s++; if(length>=24) s++
    if(s<=2) return {label:'Weak',color:'var(--red)',w:'30%'}
    if(s<=4) return {label:'Good',color:'var(--yellow)',w:'65%'}
    return {label:'Strong',color:'var(--green)',w:'100%'}
  }
  const { label, color, w } = strength()

  const toggle = k => setOpts(o=>({...o,[k]:!o[k]}))

  return (
    <>
      <Pane title="Generated Password" actions={<button className="btn sm" onClick={gen}>Regenerate</button>}>
        <div style={{padding:24,display:'flex',gap:12,alignItems:'center'}}>
          <div style={{flex:1,fontFamily:'var(--mono)',fontSize:18,letterSpacing:2,color:'var(--t1)',wordBreak:'break-all'}}>{password}</div>
          <button className="btn primary" onClick={()=>copy(password)}>Copy</button>
        </div>
        <div style={{padding:'0 24px 20px'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <span style={{fontSize:12,color:'var(--t3)'}}>Strength</span>
            <span style={{fontSize:12,fontWeight:700,color}}>{label}</span>
          </div>
          <div style={{height:4,background:'var(--s4)',borderRadius:4}}>
            <div style={{height:'100%',width:w,background:color,borderRadius:4,transition:'width .3s'}} />
          </div>
        </div>
      </Pane>
      <Pane title="Options">
        <div style={{padding:24,display:'flex',flexDirection:'column',gap:20}}>
          <div>
            <label className="lbl">Length — {length}</label>
            <input type="range" min={8} max={64} value={length} onChange={e=>setLength(+e.target.value)} style={{width:'100%',accentColor:'var(--accent)'}} />
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            {[['upper','A–Z Uppercase'],['lower','a–z Lowercase'],['numbers','0–9 Numbers'],['symbols','!@# Symbols']].map(([k,l])=>(
              <label key={k} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14,color:opts[k]?'var(--t1)':'var(--t3)'}}>
                <input type="checkbox" checked={opts[k]} onChange={()=>toggle(k)} style={{accentColor:'var(--accent)',width:16,height:16}} />
                {l}
              </label>
            ))}
          </div>
        </div>
      </Pane>
    </>
  )
}

// ── Line Sort & Dedupe ─────────────────────────────
export function LineSortDedupe() {
  const [input, setInput] = useState('banana\napple\ncherry\napple\ndate\nbanana')
  const [output, setOutput] = useState('')
  const run = (fn) => setOutput(fn(input.split('\n')).join('\n'))
  return (
    <>
      <div className="act-bar">
        <button className="btn" onClick={()=>run(l=>[...l].sort())}>Sort A→Z</button>
        <button className="btn" onClick={()=>run(l=>[...l].sort().reverse())}>Sort Z→A</button>
        <button className="btn" onClick={()=>run(l=>[...new Set(l)])}>Remove Duplicates</button>
        <button className="btn" onClick={()=>run(l=>[...l].reverse())}>Reverse</button>
        <button className="btn" onClick={()=>run(l=>l.filter(x=>x.trim()))}>Remove Empty</button>
        <button className="btn" onClick={()=>run(l=>{const s=[...l];for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]]};return s})}>Shuffle</button>
      </div>
      <div className="split-h">
        <Pane title="Input Lines"><textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} /></Pane>
        <Pane title="Output" actions={<CopyBtn text={output}/>}><textarea className="ta ro" value={output} readOnly /></Pane>
      </div>
    </>
  )
}

// ── String Escape ──────────────────────────────────
export function TextEscape() {
  const [input, setInput] = useState('Hello "World"\nThis has a tab:\there\nAnd a backslash: \\')
  const [mode, setMode] = useState('escape')
  const escape = s => s.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\t/g,'\\t')
  const unescape = s => s.replace(/\\n/g,'\n').replace(/\\r/g,'\r').replace(/\\t/g,'\t').replace(/\\"/g,'"').replace(/\\\\/g,'\\')
  const output = mode==='escape' ? escape(input) : unescape(input)
  return (
    <>
      <div className="act-bar">
        <div className="seg">
          <button className={`seg-btn ${mode==='escape'?'on':''}`} onClick={()=>setMode('escape')}>Escape</button>
          <button className={`seg-btn ${mode==='unescape'?'on':''}`} onClick={()=>setMode('unescape')}>Unescape</button>
        </div>
      </div>
      <div className="split-h">
        <Pane title="Input"><textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} /></Pane>
        <Pane title="Output" actions={<CopyBtn text={output}/>}><textarea className="ta ro" value={output} readOnly /></Pane>
      </div>
    </>
  )
}

// ── XML Formatter ──────────────────────────────────
export function XmlFormatter() {
  const [input, setInput] = useState('<root><person><name>Alice</name><age>30</age></person></root>')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)
  const format = () => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input,'application/xml')
      const err = doc.querySelector('parsererror')
      if(err) throw new Error('Invalid XML')
      const ser = new XMLSerializer()
      let xml = ser.serializeToString(doc)
      // simple indent
      let pad = 0
      xml = xml.replace(/(<\/[^>]+>|<[^/][^>]*\/>|<[^/][^>]*>)/g, tag => {
        if(tag.startsWith('</')) { pad--; return '\n'+' '.repeat(pad*2)+tag }
        const res = '\n'+' '.repeat(pad*2)+tag
        if(!tag.endsWith('/>')) pad++
        return res
      })
      setOutput(xml.trim()); setError(null)
    } catch(e) { setError(e.message) }
  }
  return (
    <>
      <div className="act-bar">
        <button className="btn primary" onClick={format}>Format XML</button>
        {error && <div className="err">{error}</div>}
      </div>
      <div className="split-h">
        <Pane title="Input XML"><textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} /></Pane>
        <Pane title="Formatted XML" actions={<CopyBtn text={output}/>}><textarea className="ta ro" value={output} readOnly /></Pane>
      </div>
    </>
  )
}

// ── JSON → TypeScript ──────────────────────────────
export function JsonToTs() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Alice",\n  "active": true,\n  "tags": ["dev","admin"],\n  "address": {\n    "city": "NYC",\n    "zip": "10001"\n  }\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)

  const toTs = (obj, name='Root', depth=0) => {
    const pad = '  '.repeat(depth)
    const innerPad = '  '.repeat(depth+1)
    if(Array.isArray(obj)) {
      if(obj.length===0) return 'unknown[]'
      const t = toTs(obj[0],name,depth)
      return `${t}[]`
    }
    if(typeof obj==='object' && obj!==null) {
      const fields = Object.entries(obj).map(([k,v])=>{
        let type
        if(typeof v==='string') type='string'
        else if(typeof v==='number') type='number'
        else if(typeof v==='boolean') type='boolean'
        else if(v===null) type='null'
        else if(Array.isArray(v)) { const inner=v.length?toTs(v[0],k,depth+1):'unknown'; type=`${inner}[]` }
        else if(typeof v==='object') { type=`{\n${Object.entries(v).map(([k2,v2])=>`${innerPad}  ${k2}: ${typeof v2};`).join('\n')}\n${innerPad}}` }
        else type='unknown'
        return `${innerPad}${k}: ${type};`
      })
      return `{\n${fields.join('\n')}\n${pad}}`
    }
    return typeof obj
  }

  const convert = () => {
    try {
      const parsed = JSON.parse(input)
      const body = toTs(parsed,'Root',0)
      setOutput(`interface Root ${body}`)
      setError(null)
    } catch(e) { setError(e.message) }
  }

  return (
    <>
      <div className="act-bar">
        <button className="btn primary" onClick={convert}>Convert</button>
        {error && <div className="err">{error}</div>}
      </div>
      <div className="split-h">
        <Pane title="JSON Input"><div style={{flex:1,minHeight:0,overflow:'hidden'}}><Editor height="100%" language="json" theme="vs-dark" value={input} onChange={v=>setInput(v||'')} options={{minimap:{enabled:false},fontSize:14,padding:{top:14},scrollBeyondLastLine:false}} /></div></Pane>
        <Pane title="TypeScript Interface" actions={<CopyBtn text={output}/>}><div style={{flex:1,minHeight:0,overflow:'hidden'}}><Editor height="100%" language="typescript" theme="vs-dark" value={output} options={{minimap:{enabled:false},fontSize:14,readOnly:true,padding:{top:14},scrollBeyondLastLine:false}} /></div></Pane>
      </div>
    </>
  )
}

// ── Image ↔ Base64 ─────────────────────────────────
export function ImageBase64() {
  const [b64, setB64]     = useState('')
  const [preview, setPrev] = useState('')
  const [mode, setMode]   = useState('encode')
  const copy = useStore(s=>s.copyToClipboard)

  const onFile = e => {
    const f = e.target.files?.[0]; if(!f) return
    const r = new FileReader()
    r.onload = ev => { const d = ev.target.result; setB64(d); setPrev(d) }
    r.readAsDataURL(f)
  }
  const decode = () => {
    try { setPrev(b64.startsWith('data:') ? b64 : `data:image/png;base64,${b64}`) } catch {}
  }

  return (
    <>
      <div className="act-bar">
        <div className="seg">
          <button className={`seg-btn ${mode==='encode'?'on':''}`} onClick={()=>setMode('encode')}>Image → Base64</button>
          <button className={`seg-btn ${mode==='decode'?'on':''}`} onClick={()=>setMode('decode')}>Base64 → Image</button>
        </div>
      </div>
      {mode==='encode' ? (
        <>
          <Pane title="Upload Image" style={{flexShrink:0,maxHeight:120}}>
            <div style={{padding:24,display:'flex',gap:16,alignItems:'center'}}>
              <input type="file" accept="image/*" onChange={onFile} style={{color:'var(--t2)',fontSize:14}} />
            </div>
          </Pane>
          {b64 && (
            <>
              <div style={{display:'flex',gap:16}}>
                {preview && <img src={preview} alt="preview" style={{height:120,borderRadius:8,border:'1px solid var(--b1)'}} />}
              </div>
              <Pane title="Base64 Data URI" actions={<CopyBtn text={b64}/>}>
                <textarea className="ta ro" value={b64} readOnly />
              </Pane>
            </>
          )}
        </>
      ) : (
        <>
          <Pane title="Base64 Input">
            <textarea className="ta" value={b64} onChange={e=>setB64(e.target.value)} placeholder="Paste base64 string or data URI…" />
          </Pane>
          <div className="act-bar">
            <button className="btn primary" onClick={decode}>Show Image</button>
          </div>
          {preview && (
            <Pane title="Preview">
              <div style={{padding:24,display:'flex',justifyContent:'center'}}>
                <img src={preview} alt="decoded" style={{maxWidth:'100%',maxHeight:300,borderRadius:8,border:'1px solid var(--b1)'}} onError={()=>setPrev('')} />
              </div>
            </Pane>
          )}
        </>
      )}
    </>
  )
}
