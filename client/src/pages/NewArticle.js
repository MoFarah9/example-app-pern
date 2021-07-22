import React, { useState, useRef } from 'react'
import JoditEditor from 'jodit-react'

export default function NewArticle() {
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    minHeight: 300,
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(content)
  }

  return (
    <main>
      <h2>Write new article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  )
}
