import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function NewArticleEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [title, setTitle] = useState('')
  const [newId, setNewId] = useState(null)

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

      setNewId(result.id)
      setTitle('')
      setEditorState(EditorState.createEmpty())
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImageCallBack = async (file) => {
    const data = new FormData()
    data.append('files', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data })
      const result = await res.json()
      console.log('Image was Uploaded:', result)
      const imageUrl = 'http://localhost:5000/uploads/' + result.files[0].filename
      return { data: { link: imageUrl } }
    } catch (error) {
      console.error('Image upload error:', error)
      throw error
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
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          image: {
            uploadEnabled: true,
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false },
            previewImage: true,
          },
        }}
      />
      <br />
      <button onClick={submitArticle}>Submit Article</button>
      {newId && (
        <p>
          Article was published.{' '}
          <a target="_blank" rel="noreferrer" href={`/article/${newId}`}>
            View here
          </a>{' '}
        </p>
      )}
    </div>
  )
}
