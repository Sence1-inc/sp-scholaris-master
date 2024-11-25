import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Article } from '../../redux/types'

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const APP_URL = process.env.REACT_APP_CMS_API_URL
  const theme = useTheme()

  const markdonwStyles = {
    h1: ({ node, ...props }: ReactMarkdownProps) => (
      <h1
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h4.fontSize,
          fontFamily: theme.typography.h4.fontFamily,
          fontWeight: theme.typography.h4.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    h2: ({ node, ...props }: ReactMarkdownProps) => (
      <h2
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h2.fontSize,
          fontFamily: theme.typography.h2.fontFamily,
          fontWeight: theme.typography.h2.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    h3: ({ node, ...props }: ReactMarkdownProps) => (
      <h3
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h3.fontSize,
          fontFamily: theme.typography.h3.fontFamily,
          fontWeight: theme.typography.h3.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    h4: ({ node, ...props }: ReactMarkdownProps) => (
      <h4
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h4.fontSize,
          fontFamily: theme.typography.h4.fontFamily,
          fontWeight: theme.typography.h4.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    h5: ({ node, ...props }: ReactMarkdownProps) => (
      <h5
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h5.fontSize,
          fontFamily: theme.typography.h5.fontFamily,
          fontWeight: theme.typography.h5.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    h6: ({ node, ...props }: ReactMarkdownProps) => (
      <h6
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h6.fontSize,
          fontFamily: theme.typography.h6.fontFamily,
          fontWeight: theme.typography.h6.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    p: ({ node, ...props }: ReactMarkdownProps) => (
      <p
        style={{
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.body1.fontFamily,
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    a: ({ node, ...props }: ReactMarkdownProps) => (
      <a
        style={{
          color: theme.palette.secondary.main,
          textDecoration: 'underline',
          fontFamily: theme.typography.body1.fontFamily,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    ul: ({ node, ...props }: ReactMarkdownProps) => (
      <ul
        style={{
          listStyleType: 'circle',
          paddingLeft: theme.spacing(2),
          fontSize: theme.typography.body1.fontSize,
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.body1.fontFamily,
          fontWeight: theme.typography.body1.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    li: ({ node, ...props }: ReactMarkdownProps) => (
      <li
        style={{
          marginBottom: theme.spacing(1),
          fontSize: theme.typography.body1.fontSize,
          fontFamily: theme.typography.body1.fontFamily,
          lineHeight: theme.typography.body1.lineHeight,
          color: theme.palette.text.primary,
          fontWeight: theme.typography.body1.fontWeight,
          marginTop: theme.spacing(1),
        }}
        {...props}
      />
    ),
    img: ({ node, ...props }: ReactMarkdownProps) => (
      <img
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: theme.shape.borderRadius,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    strong: ({ node, ...props }: ReactMarkdownProps) => (
      <strong
        style={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.body1.fontFamily,
        }}
        {...props}
      />
    ),
    em: ({ node, ...props }: ReactMarkdownProps) => (
      <em
        style={{
          fontStyle: 'italic',
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.body1.fontFamily,
        }}
        {...props}
      />
    ),
  }

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
            image={`${article.cover.formats.medium?.url}`}
            alt={article.title}
          />
        )}
        <CardContent sx={{ backgroundColor: 'common.white' }}>
          <Typography variant="h1" sx={{ textAlign: 'center' }}>
            {article.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', marginBottom: '60px' }}
          >
            Published on {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdonwStyles}
          >
            {article.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ArticleDetailPage
