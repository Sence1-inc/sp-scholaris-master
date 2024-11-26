import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import { Article, Tag } from '../../redux/types'

interface ArticleListSectionCardProps {
  article: Article
}

const ArticleListSectionCard: React.FC<ArticleListSectionCardProps> = ({
  article,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        border: 'none',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: 'none',
        width: '100%',
        gap: '10px',
      }}
    >
      <CardMedia
        component="img"
        alt={article.title}
        image={article.cover.formats.small?.url}
        sx={{
          borderRadius: '16px',
          width: { xs: 100, md: 150 },
          height: { xs: 100, md: 150 },
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
              width: { xs: '34vw', md: '30vw' },
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
              width: { xs: '34vw', md: '30vw' },
            }}
          >
            {article.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ backgroundColor: 'white', padding: 0, margin: '4px 0' }}
        >
          {article.tags.map((tag: Tag) => {
            return (
              <Button
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
      </Box>
    </Card>
  )
}

export default ArticleListSectionCard
