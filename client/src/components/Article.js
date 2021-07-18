import { useState, useEffect } from 'react'

export default function Article({ id }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticle(id)
      .then(({ title, body }) => {
        setTitle(title)
        setBody(body)
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>{title}</h2>
      <article dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

async function fetchArticle(id) {
  const apiRoot = 'http://localhost:5000/api'
  try {
    const res = await fetch(`${apiRoot}/articles/${id}`)
    if (res.status === 404) throw new Error("This article doesn't exist")
    return await res.json()
  } catch (error) {
    throw new Error('Error fetching the article')
  }
}
