import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'
import { Pane, CopyBtn } from '../components/ToolPage'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState(null)

  const process = (val, m) => {
    if (!val) { setOutput(''); setError(null); return }
    try {
      setOutput(m === 'encode' ? btoa(unescape(encodeURIComponent(val))) : decodeURIComponent(escape(atob(val))))
      setError(null)
    } catch { setError('Invalid input') }
  }

  const setModeAndProcess = (m) => { setMode(m); process(input, m) }
  const swap = () => { const m = mode === 'encode' ? 'decode' : 'encode'; setMode(m); setInput(output); process(output, m) }

  return (
    <>
      <div className="act-bar">
        <div className="seg">
          <button className={`seg-btn ${mode==='encode'?'on':''}`} onClick={()=>setModeAndProcess('encode')}>Encode</button>
          <button className={`seg-btn ${mode==='decode'?'on':''}`} onClick={()=>setModeAndProcess('decode')}>Decode</button>
        </div>
        <button className="btn" onClick={swap}><ArrowRightLeft size={15}/>Swap</button>
        {error && <div className="err">{error}</div>}
      </div>
      <Pane title={mode==='encode'?'Plain Text Input':'Base64 Input'}>
        <textarea className="ta" value={input}
          onChange={e=>{setInput(e.target.value);process(e.target.value,mode)}}
          placeholder={mode==='encode'?'Enter text to encode…':'Paste Base64 to decode…'}
        />
      </Pane>
      <Pane title={mode==='encode'?'Base64 Output':'Decoded Text'} actions={<CopyBtn text={output}/>}>
        <textarea className="ta ro" value={output} readOnly />
      </Pane>
    </>
  )
}
