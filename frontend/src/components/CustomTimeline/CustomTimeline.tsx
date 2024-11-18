import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import { Typography } from '@mui/material'

export default function CustomeTimeline() {
  return (
    <Timeline sx={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography>Request History</Typography>

      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          November 15, 2024 09:30 am <br />
          Scholaris admin to Megaworld
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          Please revise the description to clarify that only tuition fees are
          fully covered, while housing, meals, and personal expenses receive
          partial support. The current wording may mislead applicants by
          suggesting that all expenses are fully covered.
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          November 15, 2024 01:30 pm <br />
          Megaworld
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Megaworld updated their description</TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
