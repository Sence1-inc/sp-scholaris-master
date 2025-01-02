import { ArrowRightOutlined, NavigateNextOutlined } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Link,
  Pagination,
  Typography,
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import ArticleListSectionCard from '../../components/ArticleListSection/ArticleListSectionCard'
import Jumbotron from '../../components/Jumbotron/Jumbotron'
import SubscribeJumbotron from '../../components/Jumbotron/SubscribeJumbotron'
import GradImage from '../../public/images/banner-bg.png'
import { Article, Tag } from '../../redux/types'
import { containerStyle } from '../../styles/globalStyles'
import theme from '../../styles/theme'

const ArticleSearchListPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { keyword } = useParams<{ keyword: string }>()
  const [searchedArticles, setSearchedArticles] = useState<Article[] | []>([])
  const [tags, setTags] = useState<Tag[] | []>([])
  const [page, setPage] = useState<number>(1)
  const APP_URL = process.env.REACT_APP_CMS_API_URL
  const [searchParams] = useSearchParams()
  const [totalPages, setTotalPages] = useState<number>(1)
  const [tagSlug, setTagSlug] = useState<string>('')
  const [type, setType] = useState<string>('')
  const isXs = useMediaQuery(() => theme.breakpoints.down('sm'))

  useEffect(() => {
    if (searchParams.get('tag')) {
      setTagSlug(searchParams.get('tag') as string)
    }

    if (searchParams.get('type')) {
      setType(searchParams.get('type') as string)
    }

    // eslint-disable-next-line
  }, [searchParams])

  const getArticlesWithQuery = async (
    filters: Record<string, string | boolean>,
    page: number,
    keyword: string
  ) => {
    try {
      let query = `${APP_URL}/api/articles?filters[project][slug][$eq]=scholaris`
      Object.entries(filters).forEach(([key, value]) => {
        if (key === 'tags') {
          query += `&filters[${key}][slug][$eq]=${value}`
        } else {
          query += `&filters[${key}][$eq]=${value}`
        }
      })

      if ((keyword && keyword !== 'all' && type) || (keyword && !type)) {
        query += `&filters[title][$contains]=${keyword}`
      }
      query += `&sort[0]=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=10&populate=*`

      const response = await axios.get(query)

      setSearchedArticles(response.data.data)
      setPage(1)
      setTotalPages(response.data.meta.pagination.pageCount)
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  useEffect(() => {
    const fetchArticlesByTypeAndOrTag = () => {
      const filtersMap: Record<string, Record<string, boolean | string>> = {
        popular: { is_popular: true },
        provider: { is_provider_specific: true },
        student: { is_student_specific: true },
      }

      let filters: Record<string, string | boolean> = {}

      if (type !== 'latest') {
        filters = { ...filters, ...filtersMap[type] }
      }

      if (tagSlug) {
        filters['tags'] = tagSlug
      }

      if (page) {
        getArticlesWithQuery(filters, page, String(keyword))
      }
    }

    fetchArticlesByTypeAndOrTag()

    // eslint-disable-next-line
  }, [type, keyword, page, tagSlug])

  const getTags = async () => {
    try {
      const response = await axios.get(
        `${APP_URL}/api/tags?filters[projects][slug][$eq]=scholaris&populate=*`
      )
      setTags(response.data.data)
    } catch (error) {
      console.error('Error fetching article:', error)
    }
  }

  useEffect(() => {
    getTags()

    // eslint-disable-next-line
  }, [])

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
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
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Search
    </Typography>,
  ]

  return (
    <Container sx={{ ...containerStyle, gap: '10vh' }}>
      <Jumbotron />
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography variant="h5">Search Articles</Typography>
          <Typography variant="body1">Search Result: {keyword}</Typography>
          {tagSlug && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography variant="body1">Filters:</Typography>
              <Chip
                sx={{ margin: '0 4px' }}
                label={tagSlug
                  ?.replace(/-/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                variant="outlined"
                onDelete={() => {
                  setTagSlug('')
                  const params = new URLSearchParams(location.search)
                  params.delete('tag')

                  navigate({
                    pathname: location.pathname,
                    search: params.toString() ? `?${params.toString()}` : '',
                  })
                }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: { xs: '100%', sm: '70%' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {searchedArticles.map((article: Article) => {
                return (
                  <ArticleListSectionCard
                    key={article.id}
                    article={article}
                    isSearched={true}
                  />
                )
              })}
            </Box>
            <Link
              component="button"
              variant="subtitle1"
              onClick={() => {
                navigate('/articles')
              }}
              sx={{ alignSelf: 'flex-start' }}
            >
              Explore more articles
            </Link>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
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
              {tags.length > 0 && (
                <Box>
                  <Typography variant="h6" marginBottom="10px">
                    Filter Results
                  </Typography>
                  {tags?.map((tag: Tag, index: number) => {
                    return (
                      <Chip
                        sx={{ margin: '4px' }}
                        key={`${tag.name}-${index}`}
                        color="secondary"
                        label={tag.name}
                        variant="outlined"
                        onClick={() => {
                          if (type) {
                            const updatedSearchParams = new URLSearchParams(
                              searchParams
                            )
                            updatedSearchParams.set('tag', tag.slug)
                            navigate(
                              `/articles/search/${keyword}?${updatedSearchParams.toString()}`
                            )
                          } else {
                            navigate(
                              `/articles/search/${keyword}?tag=${tag.slug}`
                            )
                          }
                        }}
                      />
                    )
                  })}
                </Box>
              )}
              <Card
                sx={{
                  border: 'none',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  height: '500px',
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
      <SubscribeJumbotron />
    </Container>
  )
}

export default ArticleSearchListPage
