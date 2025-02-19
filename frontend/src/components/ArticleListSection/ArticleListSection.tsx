import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Article, Tag } from '../../redux/types'
import ArticleListSectionCard from './ArticleListSectionCard'

/**
 * Props for the {@link ArticleListSection} component.
 *
 * @property header - The main header for the article list section.
 * @property subheader - The subheader for additional context.
 * @property articles - An array of articles to display.
 * @property type - The type of articles being displayed (e.g., popular, latest).
 */
interface ArticleListSectionProps {
  header: string
  subheader: string
  articles: Article[] | []
  type: 'popular' | 'latest' | 'provider' | 'student'
}

/**
 * A component that displays a list of articles in a structured layout.
 *
 * @remarks
 * This component renders a header, subheader, and a list of articles.
 * The first article is displayed prominently, while the rest are shown in a grid format.
 *
 * @param props - The properties for the component.
 * @param props.header - The main header for the article list section.
 * @param props.subheader - The subheader for additional context.
 * @param props.articles - An array of articles to display.
 * @param props.type - The type of articles being displayed.
 *
 * @returns A JSX element representing the article list section.
 */
const ArticleListSection: React.FC<ArticleListSectionProps> = ({
  header,
  subheader,
  articles,
  type,
}) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
      }}
    >
      <Box>
        <Typography variant="subtitle1">{subheader}</Typography>
        <Typography variant="h5">{header}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '20px',
        }}
      >
        <Card
          sx={{
            width: { xs: '100%', sm: '60%' },
            border: 'none',
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: 'none',
          }}
          onClick={() => navigate(`/articles/${articles[0]?.slug}`)}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={articles[0]?.cover.formats.small?.url}
            sx={{ borderRadius: '16px' }}
          />
          <CardContent sx={{ backgroundColor: 'white', padding: '16px 0' }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ lineHeight: 1.2 }}
            >
              {articles[0]?.title}
            </Typography>
            <Box sx={{ backgroundColor: 'white', padding: 0, margin: '4px 0' }}>
              {articles[0]?.tags.map((tag: Tag, index: number) => {
                return (
                  <Button
                    key={`${tag.slug}-${index}`}
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
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {articles[0]?.description}
            </Typography>
          </CardContent>
        </Card>
        <Box
          sx={{
            width: { xs: '100%', sm: '40%' },
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {articles.slice(1, 4).map((article: Article) => {
            return <ArticleListSectionCard key={article.id} article={article} />
          })}
        </Box>
      </Box>
      <Link
        component="button"
        variant="subtitle1"
        onClick={() => {
          navigate(`/articles/search/all?type=${type}`)
        }}
        sx={{ alignSelf: 'flex-start' }}
      >
        Explore more articles
      </Link>
    </Box>
  )
}

export default ArticleListSection
