import React, { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import FileUpload from '../components/FileUpload'

export default function NewArticle() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    // console.log(editorState)
    if (window) window.editorState = editorState
  }, [editorState])

  return (
    <main>
      <h2>Write new article</h2>

      <Editor
        wrapperClassName="editor-wrapper"
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'link', 'emoji', 'image', 'remove', 'history'],
        }}
      />
      <FileUpload />
    </main>
  )
}
