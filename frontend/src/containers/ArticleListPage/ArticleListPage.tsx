import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Article } from '../../redux/types'

const ArticleListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const APP_URL = process.env.REACT_APP_CMS_API_URL

  const getArticles = async () => {
    try {
      const response = await axios.get(`${APP_URL}/api/articles?populate=*`)
      return response.data
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles()
      setArticles(data.data)
      setLoading(false)
    }
    fetchArticles()
    // eslint-disable-next-line
  }, [])

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

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Articles
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card
              onClick={() => navigate(`/articles/${article.slug}`)}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {article.cover && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`${article.cover.formats.small?.url}`}
                  alt={article.title}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.excerpt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ArticleListPage
