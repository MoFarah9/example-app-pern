import React, { useState } from 'react'

export default function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState(null)

  const onFileChange = (event) => setSelectedFiles(event.target.files)

  const onFileUpload = () => {
    if (!selectedFiles) return

    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('File', selectedFiles[i], selectedFiles[i].name)
    }

    console.log(selectedFiles)

    fetch('api/uploadFiles', {
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

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2>Files Upload</h2>
      <div>
        <input type="file" multiple onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
    </section>
  )
}
