import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Article } from '../../redux/types'

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const APP_URL = process.env.REACT_APP_CMS_API_URL

  const getArticle = async (id: string) => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/articles/${id}?populate=*`
      )
      console.log('THIS', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        const data = await getArticle(id)
        setArticle(data.data)
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (loading) {
    return <CircularProgress />
  }

  if (!article) {
    return <Typography variant="h6">Article not found</Typography>
  }

  return (
    <Container sx={{ padding: '20px' }}>
      <Card>
        {article.cover && (
          <CardMedia
            component="img"
            height="300"
            image={`${APP_URL}/${article.cover.formats.medium?.url}`}
            alt={article.title}
          />
        )}
        <CardContent sx={{ backgroundColor: 'common.white' }}>
          <Typography variant="h4" component="h1">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Published on
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {article.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ArticleDetailPage
