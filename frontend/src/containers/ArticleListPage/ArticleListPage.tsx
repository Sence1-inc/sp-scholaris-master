import { CircularProgress, Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ArticleListSection from '../../components/ArticleListSection/ArticleListSection'
import Jumbotron from '../../components/Jumbotron/Jumbotron'
import SubscribeJumbotron from '../../components/Jumbotron/SubscribeJumbotron'
import { useSnackbar } from '../../context/SnackBarContext'
import { Article } from '../../redux/types'
import { containerStyle } from '../../styles/globalStyles'

const ArticleListPage: React.FC = () => {
  const { showMessage } = useSnackbar()
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const APP_URL = process.env.REACT_APP_CMS_API_URL

  useEffect(() => {
    setIsLoading(true)
    const getArticles = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/api/articles?filters[project][slug][$eq]=scholaris&sort[0]=publishedAt:desc&populate=*`
        )

        setArticles(response.data.data)
        setIsLoading(false)
      } catch (error) {
        showMessage('Error fetching articles', 'error')
      }
    }

    getArticles()
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
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
    <Container sx={{ ...containerStyle, gap: '60px' }}>
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
        articles={articles}
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
      <SubscribeJumbotron />
    </Container>
  )
}

export default ArticleListPage
