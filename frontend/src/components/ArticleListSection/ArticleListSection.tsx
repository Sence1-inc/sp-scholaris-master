import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Article, Tag } from '../../redux/types'
import ArticleListSectionCard from './ArticleListSectionCard'

interface ArticleListSectionProps {
  header: string
  subheader: string
  articles: Article[] | []
}

const ArticleListSection: React.FC<ArticleListSectionProps> = ({
  header,
  subheader,
  articles,
}) => {
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Box>
        <Typography variant="subtitle1">{subheader}</Typography>
        <Typography variant="h5">{header}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Card
          sx={{
            width: '50%',
            border: 'none',
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: 'none',
          }}
          onClick={() => navigate(`/articles/${articles[0].slug}`)}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={articles[0].cover.formats.small?.url}
            sx={{ borderRadius: '16px' }}
          />
          <CardContent sx={{ backgroundColor: 'white', padding: '16px 0' }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ lineHeight: 1.2 }}
            >
              {articles[0].title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {articles[0].description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ backgroundColor: 'white', padding: 0, margin: '4px 0' }}
          >
            {articles[0].tags.map((tag: Tag, index: number) => {
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
                  }}
                  variant="outlined"
                >
                  {tag.name}
                </Button>
              )
            })}
          </CardActions>
        </Card>
        <Box
          sx={{
            width: '50%',
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
    </Box>
  )
}

export default ArticleListSection
