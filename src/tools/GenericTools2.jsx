import { useState, useEffect } from 'react'
import { Pane, CopyBtn } from '../components/ToolPage'
import useStore from '../store'

export function HashGenerator() {
  const [input, setInput] = useState('hello devforge')
  const [hashes, setHashes] = useState({})
  useEffect(()=>{
    (async()=>{
      const enc = new TextEncoder().encode(input)
      const hex = buf => Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
      const [h1,h256,h512] = await Promise.all([
        crypto.subtle.digest('SHA-1',enc),crypto.subtle.digest('SHA-256',enc),crypto.subtle.digest('SHA-512',enc)
      ])
      setHashes({'SHA-1':hex(h1),'SHA-256':hex(h256),'SHA-512':hex(h512)})
    })()
  },[input])
  const copy = useStore(s=>s.copyToClipboard)
  return (
    <>
      <Pane title="Input Text" style={{flexShrink:0,maxHeight:130}}>
        <textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:80}} />
      </Pane>
      <Pane title="Hash Results">
        <div className="rlist">
          {Object.entries(hashes).map(([k,v])=>(
            <div className="rrow" key={k}>
              <div className="rlabel">{k}</div>
              <div className="rval" style={{fontSize:12}}>{v}</div>
              <button className="btn sm ghost rcopy" onClick={()=>copy(v)}>Copy</button>
            </div>
          ))}
        </div>
      </Pane>
    </>
  )
}

export function LoremIpsum() {
  const sentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "Ut labore et dolore magnam aliquam quaerat voluptatem."
  ]
  const [paras, setParas] = useState(3)
  const [type, setType] = useState('paragraphs')
  const gen = () => {
    if(type==='words') return Array.from({length:paras}, (_,i)=>sentences[i%sentences.length].split(' ')).flat().slice(0,paras).join(' ')
    if(type==='sentences') return Array.from({length:paras}, (_,i)=>sentences[i%sentences.length]).join(' ')
    return Array.from({length:paras}, (_,i)=>sentences.slice(i*2%sentences.length,(i*2%sentences.length)+3).join(' ')).join('\n\n')
  }
  const output = gen()
  return (
    <>
      <div className="act-bar">
        <div className="seg">
          <button className={`seg-btn ${type==='paragraphs'?'on':''}`} onClick={()=>setType('paragraphs')}>Paragraphs</button>
          <button className={`seg-btn ${type==='sentences'?'on':''}`} onClick={()=>setType('sentences')}>Sentences</button>
          <button className={`seg-btn ${type==='words'?'on':''}`} onClick={()=>setType('words')}>Words</button>
        </div>
        <label className="lbl" style={{margin:0}}>Count</label>
        <input className="inp" type="number" style={{width:80}} value={paras} onChange={e=>setParas(Math.max(1,Math.min(100,+e.target.value)))} />
      </div>
      <Pane title={`${paras} ${type}`} actions={<CopyBtn text={output}/>}>
        <textarea className="ta ro" value={output} readOnly />
      </Pane>
    </>
  )
}

export function ColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const valid = /^#[0-9A-Fa-f]{6}$/.test(hex)
  const r = valid?parseInt(hex.slice(1,3),16):0
  const g = valid?parseInt(hex.slice(3,5),16):0
  const b = valid?parseInt(hex.slice(5,7),16):0
  const toHSL = () => {
    const r1=r/255,g1=g/255,b1=b/255,mx=Math.max(r1,g1,b1),mn=Math.min(r1,g1,b1)
    let h,s,l=(mx+mn)/2
    if(mx===mn){h=s=0}else{const d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);switch(mx){case r1:h=((g1-b1)/d+(g1<b1?6:0))/6;break;case g1:h=((b1-r1)/d+2)/6;break;default:h=((r1-g1)/d+4)/6}}
    return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`
  }
  const copy = useStore(s=>s.copyToClipboard)
  return (
    <>
      <div className="color-swatch" style={{background:valid?hex:'var(--s3)'}} />
      <div style={{display:'flex',gap:12,alignItems:'flex-end'}}>
        <div style={{flex:1}}><label className="lbl">HEX Color</label><input className="inp" value={hex} onChange={e=>setHex(e.target.value)} style={{maxWidth:240}} /></div>
        <input type="color" value={valid?hex:'#6366f1'} onChange={e=>setHex(e.target.value)} style={{height:40,width:56,padding:2,background:'none',border:'1px solid var(--b1)',borderRadius:8,cursor:'pointer'}} />
      </div>
      <Pane title="Color Values">
        <div className="rlist">
          {[['HEX',hex],['RGB',`rgb(${r}, ${g}, ${b})`],['HSL',toHSL()],['R',r.toString()],['G',g.toString()],['B',b.toString()]].map(([l,v])=>(
            <div className="rrow" key={l}>
              <div className="rlabel">{l}</div>
              <div className="rval">{v}</div>
              <button className="btn sm ghost rcopy" onClick={()=>copy(v)}>Copy</button>
            </div>
          ))}
        </div>
      </Pane>
    </>
  )
}

export function UrlParser() {
  const [input, setInput] = useState('https://user:pass@sub.example.com:8080/path?query=foo&bar=1#section')
  const copy = useStore(s=>s.copyToClipboard)
  let parsed = null
  try {
    const u = new URL(input)
    const params = {}
    u.searchParams.forEach((v,k)=>params[k]=v)
    parsed = {protocol:u.protocol,username:u.username||'(none)',password:u.password?'***':'(none)',hostname:u.hostname,port:u.port||'(default)',pathname:u.pathname,search:u.search||'(none)',hash:u.hash||'(none)',origin:u.origin,'query params':JSON.stringify(params)}
  } catch {}
  return (
    <>
      <Pane title="URL Input" style={{flexShrink:0,maxHeight:100}}>
        <textarea className="ta" value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:60}} />
      </Pane>
      <Pane title="Parsed Components">
        {parsed ? (
          <div className="rlist">
            {Object.entries(parsed).map(([k,v])=>(
              <div className="rrow" key={k}>
                <div className="rlabel">{k}</div>
                <div className={`rval ${v==='(none)'?'empty':''}`}>{v}</div>
                {v!=='(none)'&&<button className="btn sm ghost rcopy" onClick={()=>copy(v)}>Copy</button>}
              </div>
            ))}
          </div>
        ) : <div style={{padding:16,color:'var(--red)'}}>Invalid URL</div>}
      </Pane>
    </>
  )
}
