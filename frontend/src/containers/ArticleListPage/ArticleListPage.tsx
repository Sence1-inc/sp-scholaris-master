import { CircularProgress, Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ArticleListSection from '../../components/ArticleListSection/ArticleListSection'
import Jumbotron from '../../components/Jumbotron/Jumbotron'
import { Article } from '../../redux/types'
import { containerStyle } from '../../styles/globalStyles'

const ArticleListPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const APP_URL = process.env.REACT_APP_CMS_API_URL

  const getArticles = async () => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/articles?filters[project][slug][$eq]=scholaris&sort[0]=publishedAt:desc&populate=*`
      )

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
    <Container sx={{ ...containerStyle, gap: '15vh' }}>
      <Jumbotron />
      {articles.some((article: Article) => article.is_popular) && (
        <ArticleListSection
          type="popular"
          articles={articles.filter((article: Article) => article.is_popular)}
          header="Popular Articles"
          subheader="Articles"
        />
      )}
      <ArticleListSection
        type="latest"
        articles={articles.filter((article: Article) => !article.is_popular)}
        header="Latest Articles"
        subheader="Articles"
      />
      {articles.some((article: Article) => article.is_provider_specific) && (
        <ArticleListSection
          type="provider"
          articles={articles.filter(
            (article: Article) => article.is_provider_specific
          )}
          header="Know More About Scholarship Providers"
          subheader="Articles"
        />
      )}
      {articles.some((article: Article) => article.is_student_specific) && (
        <ArticleListSection
          type="student"
          articles={articles.filter(
            (article: Article) => article.is_student_specific
          )}
          header="Know More About Scholarships"
          subheader="Articles"
        />
      )}
    </Container>
  )
}

export default ArticleListPage
