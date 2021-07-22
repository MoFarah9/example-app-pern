import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function NewArticleEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [title, setTitle] = useState('')

  const submitArticle = async () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    const article = { title, body: markup }

    try {
      const rowRes = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      })

      const result = await rowRes.json()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Write new article</h2>
      <div>
        <h4>
          <label htmlFor="title">Title</label>
        </h4>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          required
        />
      </div>
      <h4>Body</h4>
      <Editor
        wrapperClassName="editor-wrapper"
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'link', 'emoji', 'image', 'remove', 'history'],
        }}
      />
      <br />
      <button onClick={submitArticle}>Submit Article</button>
    </div>
  )
}
