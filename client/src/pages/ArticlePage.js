import React from 'react'
import { useParams } from 'react-router-dom'
import Article from '../components/Article'

export default function ArticlePage() {
  let { id } = useParams()

  return <Article id={id} />
}
