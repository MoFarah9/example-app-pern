import React from 'react'
import NewArticleEditor from '../components/NewArticleEditor'
import FileUpload from '../components/FileUpload'

export default function NewArticle() {
  return (
    <main>
      <NewArticleEditor />
      <FileUpload />
    </main>
  )
}
