import React, { useState } from 'react'

export default function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState(null)

  const onFileChange = (event) => setSelectedFiles(event.target.files)

  const uploadFiles = () => {
    if (!selectedFiles) return

    const formData = new FormData()

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i], selectedFiles[i].name)
    }

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Upload Success:', result)
      })
      .catch((error) => {
        console.error('Upload Error:', error)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    uploadFiles()
  }

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2>Files Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="files" multiple onChange={onFileChange} />
        <button type="submit">Upload!</button>
      </form>
    </section>
  )
}
