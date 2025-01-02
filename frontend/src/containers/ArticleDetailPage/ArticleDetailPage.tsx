import { ArrowRightOutlined, NavigateNextOutlined } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { useNavigate, useParams } from 'react-router-dom'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import ArticleListSectionCard from '../../components/ArticleListSection/ArticleListSectionCard'
import GradImage from '../../public/images/banner-bg.png'
import { Article, Tag } from '../../redux/types'
import { containerStyle } from '../../styles/globalStyles'

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [searchKey, setSearchKey] = useState<string>('')
  const [relatedArticles, setRelatedArticles] = useState<Article[] | []>([])
  const [popularArticles, setPopularArticles] = useState<Article[] | []>([])
  const [loading, setLoading] = useState(true)
  const APP_URL = process.env.REACT_APP_CMS_API_URL
  const theme = useTheme()

  const isXs = useMediaQuery(() => theme.breakpoints.down('sm'))

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

  const getRelatedArticles = async () => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/articles?filters[project][slug][$eq]=scholaris&filters[tags][name][$eq]=${article?.tags[0].name}&sort[0]=publishedAt:desc&populate=*`
      )

      return response.data
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    }
  }

  const getPopularArticles = async () => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/articles?filters[project][slug][$eq]=scholaris&filters[is_popular][$eq]=${true}&sort[0]=publishedAt:desc&populate=*`
      )

      setPopularArticles(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(String(slug))
      setArticle(data.data[0])
      setLoading(false)
    }

    if (slug) {
      fetchArticle()
    }

    // eslint-disable-next-line
  }, [slug])

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      const data = await getRelatedArticles()
      setRelatedArticles(data.data)
      setLoading(false)
    }

    if (article) {
      fetchRelatedArticles()
      getPopularArticles()
    }

    // eslint-disable-next-line
  }, [article])

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

  const mainTag = () => {
    if (article.is_popular) {
      return 'Popular Article'
    } else if (article.is_provider_specific) {
      return 'Provider Article'
    } else if (article.is_student_specific) {
      return 'Student Article'
    } else {
      return 'Latest Article'
    }
  }

  const mainType = () => {
    if (article.is_popular) {
      return 'popular'
    } else if (article.is_provider_specific) {
      return 'provider'
    } else if (article.is_student_specific) {
      return 'student'
    } else {
      return 'latest'
    }
  }

  const breadcrumbs = [
    <Link
      sx={{ cursor: 'pointer' }}
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate('/articles')}
    >
      Articles
    </Link>,
    <Link
      sx={{ cursor: 'pointer' }}
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate(`/articles/search/all?type=${mainType()}`)}
    >
      {mainTag()}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {article.title}
    </Typography>,
  ]

  return (
    <Container
      sx={{
        ...containerStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        padding: '20px',
        width: '100%',
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextOutlined fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
        }}
      >
        <Box>
          <Typography variant="h1">{article.title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box
            sx={{
              width: { xs: '100%', sm: '70%' },
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <img
                src={`${article.cover.formats.medium?.url ?? article.cover.formats.small?.url}`}
                alt={article.title}
                style={{ borderRadius: '16px' }}
                width="100%"
              />
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdonwStyles}
              >
                {article.content}
              </ReactMarkdown>
              <Box
                sx={{ backgroundColor: 'white', padding: 0, margin: '4px 0' }}
              >
                {article.tags.map((tag: Tag, index: number) => {
                  return (
                    <Button
                      key={`${tag.slug}=${index}`}
                      color="secondary"
                      size="small"
                      sx={{
                        padding: '2px 6px',
                        fontSize: '10px',
                        textTransform: 'unset',
                        borderRadius: '20px',
                        marginLeft: '4px',
                      }}
                      variant="outlined"
                    >
                      {tag.name}
                    </Button>
                  )
                })}
              </Box>
            </Box>
          </Box>
          {!isXs && (
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <Typography variant="h6">Search Article</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    placeholder="Search Article"
                    variant="outlined"
                    InputLabelProps={{ shrink: false }}
                    sx={{
                      padding: '4px 6px',
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': { fontSize: '1rem' },
                    }}
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: '1rem',
                      borderRadius: '20px',
                      lineHeight: '1rem',
                    }}
                    onClick={() => {
                      if (searchKey === '') {
                        navigate(`/articles/search/all?type=latest`)
                      } else {
                        navigate(`/articles/search/${searchKey}`)
                      }
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography variant="h6">Popular Articles</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {popularArticles
                  .filter((popArticle: Article) => article.id !== popArticle.id)
                  .slice(0, 6)
                  .map((article: Article) => {
                    return (
                      <ArticleListSectionCard
                        key={article.id}
                        article={article}
                        isSidebar={true}
                      />
                    )
                  })}
              </Box>
              <Card
                sx={{
                  border: 'none',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  minHeight: '500px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundImage: `url(${GradImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => navigate('/scholarships')}
              >
                <CardContent
                  sx={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(2px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Typography variant="h5">
                    Search Scholarship with Scholaris
                  </Typography>
                  <Typography variant="body2">
                    Looking for scholarships?
                  </Typography>
                  <Button
                    size="small"
                    sx={{
                      padding: '2px 6px',
                      fontSize: '10px',
                      textTransform: 'unset',
                      borderRadius: '20px',
                      width: '50%',
                    }}
                    variant="outlined"
                  >
                    View Scholarships <ArrowRightOutlined />
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Box>
      {relatedArticles.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '60px',
            maxWidth: '100%',
          }}
        >
          <Box>
            <Typography variant="subtitle1">{article.tags[0].name}</Typography>
            <Typography variant="h5">Related Articles</Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '10px',
            }}
          >
            {relatedArticles
              .slice(0, 4)
              .filter((relArticle: Article) => article.id !== relArticle.id)
              .map((article: Article) => {
                return (
                  <ArticleListSectionCard
                    key={article.id}
                    article={article}
                    isRelated={true}
                  />
                )
              })}
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default ArticleDetailPage
