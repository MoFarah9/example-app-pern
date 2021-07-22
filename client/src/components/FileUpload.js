import React, { useState } from 'react'

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null)

  const onFileChange = (event) => setSelectedFile(event.target.files[0])

  const onFileUpload = () => {
    const formData = new FormData()

    if (!selectedFile) return

    formData.append('File', selectedFile, selectedFile.name)

    console.log(selectedFile)

    // Send formData object
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

  const fileData = selectedFile ? (
    <div>
      <h2>File Details:</h2>
      <p>File Name: {selectedFile.name}</p>
      <p>File Type: {selectedFile.type}</p>
      <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
    </div>
  ) : (
    <div>
      <h5>Choose before Pressing the Upload button</h5>
    </div>
  )

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>File Upload</h2>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData}
    </div>
  )
}
