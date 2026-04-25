import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Pane, CopyBtn } from '../ToolPage'

export default function JsonFormatter() {
  const [input, setInput] = useState('{\n  "name": "InstantDevToolConverter",\n  "version": "1.0",\n  "tools": 24,\n  "free": true,\n  "private": true\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)

  const run = (compact) => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, compact ? 0 : 2)); setError(null) }
    catch(e) { setError(e.message) }
  }

  return (
    <>
      <div className="act-bar">
        <button className="btn primary" onClick={() => run(false)}>Format JSON</button>
        <button className="btn" onClick={() => run(true)}>Minify</button>
        {error && <div className="err">{error}</div>}
      </div>
      <div className="split-h">
        <Pane title="Input JSON">
          <div style={{flex:1,minHeight:0,overflow:'hidden'}}>
            <Editor height="100%" language="json" theme="vs-dark" value={input}
              onChange={v => setInput(v||'')}
              options={{minimap:{enabled:false},fontSize:14,padding:{top:12},scrollBeyondLastLine:false}} />
          </div>
        </Pane>
        <Pane title="Formatted Output" actions={<CopyBtn text={output}/>}>
          <div style={{flex:1,minHeight:0,overflow:'hidden'}}>
            <Editor height="100%" language="json" theme="vs-dark" value={output}
              options={{minimap:{enabled:false},fontSize:14,readOnly:true,padding:{top:12},scrollBeyondLastLine:false}} />
          </div>
        </Pane>
      </div>
    </>
  )
}
