import React, { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function NewArticleEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    // console.log(editorState)
    if (window) window.editorState = editorState
  }, [editorState])

  return (
    <div>
      <h2>Write new article</h2>

      <Editor
        wrapperClassName="editor-wrapper"
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'blockType', 'link', 'emoji', 'image', 'remove', 'history'],
        }}
      />
    </div>
  )
}
