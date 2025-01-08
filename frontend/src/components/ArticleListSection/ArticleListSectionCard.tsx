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

interface ArticleListSectionCardProps {
  article: Article
  isRelated?: boolean
  isSidebar?: boolean
  isSearched?: boolean
}

const ArticleListSectionCard: React.FC<ArticleListSectionCardProps> = ({
  article,
  isRelated = false,
  isSidebar = false,
  isSearched = false,
}) => {
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isRelated || isSearched ? 'column' : 'row',
        border: 'none',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: 'none',
        width: isSearched ? '45%' : '100%',
        gap: '10px',
      }}
      onClick={() => navigate(`/articles/${article.slug}`)}
    >
      <CardMedia
        component="img"
        alt={article.title}
        image={article.cover.formats.small?.url}
        sx={{
          borderRadius: '16px',
          width: isRelated || isSearched ? '100%' : { xs: 100, md: 150 },
          height: isSearched ? { xs: 100, md: 200 } : { xs: 50, md: 100 },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ padding: 0, width: '100%' }}>
          <Typography
            component="div"
            variant="h6"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: isSidebar
                ? { xs: '18vw', md: '14vw' }
                : { xs: '55vw', sm: '34vw', md: '30vw' },
            }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: isSidebar
                ? { xs: '18vw', md: '14vw' }
                : { xs: '34vw', md: '30vw' },
            }}
          >
            {article.description}
          </Typography>
        </CardContent>
        {!isSidebar && (
          <CardActions
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
                  }}
                  variant="outlined"
                >
                  {tag.name}
                </Button>
              )
            })}
          </CardActions>
        )}
      </Box>
    </Card>
  )
}

export default ArticleListSectionCard
