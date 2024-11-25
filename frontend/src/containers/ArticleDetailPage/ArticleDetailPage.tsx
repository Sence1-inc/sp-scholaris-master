import { ArrowBackIos } from '@mui/icons-material'
import {
  Button,
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
import { useNavigate, useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Article } from '../../redux/types'

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const APP_URL = process.env.REACT_APP_CMS_API_URL
  const theme = useTheme()

  const markdonwStyles = {
    h1: ({ node, ...props }: ReactMarkdownProps) => (
      // eslint-disable-next-line
      <h1
        style={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.h1.fontSize,
          fontFamily: theme.typography.h1.fontFamily,
          fontWeight: theme.typography.h1.fontWeight,
          marginTop: theme.spacing(2),
        }}
        {...props}
      />
    ),
    h2: ({ node, ...props }: ReactMarkdownProps) => (
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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

  const getArticle = async (slug: string) => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`
      )

      return response.data
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        const data = await getArticle(slug)
        setArticle(data.data[0])
        setLoading(false)
      }
    }
    fetchArticle()

    // eslint-disable-next-line
  }, [slug])

  if (loading) {
    return (
      <Container
        sx={{
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    )
  }

  if (!article) {
    return <Typography variant="h6">Article not found</Typography>
  }

  return (
    <Container sx={{ padding: '20px' }}>
      <Button
        id="back-to-search"
        onClick={() => navigate('/articles')}
        sx={{
          color: 'secondary.main',
          fontSize: '1.2rem',
          fontWeight: 700,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <ArrowBackIos sx={{ fontSize: '1.2rem' }} /> Back to Articles
      </Button>
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
