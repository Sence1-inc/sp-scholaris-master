import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { Box, Button, useMediaQuery, Tabs, Tab } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate,  } from 'react-router-dom'
import useGetScholarships from '../../hooks/useGetScholarships'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Scholarship } from '../../redux/types'
import { containerStyle } from '../../styles/globalStyles'
import theme from '../../styles/theme'
import profiletheme from '../../styles/profileTheme'
import BookmarkIcon from '@mui/icons-material/StarRounded';

interface GridRowDef {
  scholarshipName: string
  startDate: string | Date
  endDate: string | Date
  provider: string
  status: string
}

// This is only a placeholder 
const SampleScholarship = [
  {
    id: 1,
    listing_id: 123,
    scholarship_name: "My Scholarship",
    start_date: "01/20/2024",
    due_date: "01/20/2025",
    scholarship_provider: {
      id: 1,
      provider_name: "Me"
    },
    status: "active",
    content_status: "aaa",
    is_application_link_active: true,
  },
  {
    id: 2,
    listing_id: 124,
    scholarship_name: "My Scholarship 2",
    start_date: "01/20/2024",
    due_date: "01/20/2025",
    scholarship_provider: {
      id: 1,
      provider_name: "Me2"
    },
    status: "inactive",
    content_status: "aaa",
    is_application_link_active: true,
  }
]

const BookmarksPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getScholarships, areScholarshipsLoading } = useGetScholarships()
  const result: any = useAppSelector(
    (state) => state.persistedReducer.scholarships
  )
  const [page, setPage] = useState<number>(0)
  const params = useAppSelector((state) => state.searchParams)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(10)
  const [rowData, setRowData] = useState<GridRowDef[]>([])
  const [activeTab, setActiveTab] = useState<number>(0);
  const [filteredRows, setFilteredRows] = useState<GridRowDef[]>([]);
  
  const sm = useMediaQuery(theme.breakpoints.up('sm'))

  const columns = [
    {
      field: 'scholarshipId',
      headerName: 'ID',
      ...(sm ? { flex: 0.5 } : { width: 50 }),
    },
    {
      field: 'scholarshipName',
      headerName: 'Scholarship Name',
      ...(sm ? { flex: 1.5 } : { width: 200 }),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      ...(sm ? { flex: 1 } : { width: 150 }),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      ...(sm ? { flex: 1 } : { width: 150 }),
    },
    {
      field: 'provider',
      headerName: 'Organization',
      type: 'string',
      ...(sm ? { flex: 1.5 } : { width: 200 }),
    },
    {
      field: 'status',
      headerName: 'Status',
      ...(sm ? { flex: 0.6 } : { width: 100 }),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      ...(sm ? { flex: 1 } : {}),
      renderCell: (params: any) => renderActions(params),
    },
  ]

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBookmarksToggle = () => {
    console.log("bookmarks save/unsaved")
  }

  const renderActions = (params: any) => {
    console.log(params)
    return (
      <Box sx={{ ...containerStyle, padding: 0 }}>
        <Button
          onClick={handleBookmarksToggle}
          sx={profiletheme.bookmarks.bookmarksButtonActive}
        >
          <BookmarkIcon sx={{ color: '#FFFFFF' }} />Saved
        </Button>
      </Box>
    )
  }

  const formatScholarships = (data: Scholarship[]) => {
    const row = data.map((scholarship: Scholarship) => {
      return {
        id: scholarship.id,
        scholarshipId: scholarship.listing_id,
        scholarshipName: scholarship.scholarship_name,
        startDate: new Date(scholarship.start_date).toDateString(),
        endDate: new Date(scholarship.due_date).toDateString(),
        provider: scholarship.scholarship_provider.provider_name,
        status: scholarship.status,
      }
    })
    setIsLoading(false)
    setRowData(row)
  }

  const handlePageChange = (par: { page: number; pageSize: number }) => {
    setIsLoading(true)
    setPage(par.page + 1)
    dispatch(initializeParams({ ...params.params, limit: par.pageSize }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (page > 0) {
      dispatch(initializeParams({ ...params.params, page: page }))
    }
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    if (params.params.page) {
      getScholarships()
    }
    // eslint-disable-next-line
  }, [params.params.page])


  // NOTE
  // The contents in here is placeholder for now. 
  // Change this during integration
  // result.scholarships.scholarships
  // SampleScholarship data will be changed to the list of scholarship
  // with a bookmark true on the bookmark for the user. 
  useEffect(() => {
    if (
      Array.isArray(SampleScholarship) &&
      SampleScholarship.length > 0
    ) {
      formatScholarships(SampleScholarship)
      setTotalCount(result.scholarships.total_count)
    } else {
      setRowData([])
    }
    // eslint-disable-next-line
  }, [SampleScholarship])

  useEffect(() => {
    if ((params?.params?.page as number) > result?.scholarships?.total_pages) {
      setPage(result.scholarships.total_pages)
      dispatch(
        initializeParams({
          ...params.params,
          page: result.scholarships.total_pages,
        })
      )
    }
    // eslint-disable-next-line
  }, [params.params.page, result.scholarships.total_pages])

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/scholarships/${params.row.id}`)
  }

  useEffect(() => {
    const newFilteredRows = rowData.filter((row) => {
      if (activeTab === 1) return row.status === 'active';
      if (activeTab === 2) return row.status === 'inactive';
      return true; // All rows for Tab 0
    });

    setFilteredRows(newFilteredRows);
  }, [rowData, activeTab]);

  return (
    <Box component="section" sx={profiletheme.bookmarks.bookmarksSection}>
      <Box sx={profiletheme.container.sectionContainer}>
        <Button
          id="back-from-search-results-page"
          onClick={() => navigate('/scholarships')}
          sx={profiletheme.button.backButton}
        >
          <ArrowBackIos sx={{ fontSize: '1.2rem' }} />Back To Search
        </Button>
        <Box sx={profiletheme.bookmarks.bookmarksBox}>
          <Tabs sx={profiletheme.bookmarks.bookmarksTabs} value={activeTab} onChange={handleTabChange}>
            <Tab sx={profiletheme.bookmarks.bookmarksTab} disableRipple={true} label="All Bookmarks" />
            <Tab sx={profiletheme.bookmarks.bookmarksTab} disableRipple={true} label="Active Scholarships" />
            <Tab sx={profiletheme.bookmarks.bookmarksTab} disableRipple={true} label="Inactive Scholarships" />
          </Tabs>
          <DataGrid
            onRowClick={handleRowClick}
            localeText={{ noRowsLabel: 'No saved data' }}
            rows={filteredRows}
            rowCount={totalCount}
            columns={columns}
            onPaginationModelChange={handlePageChange}
            initialState={{
              pagination: {
                paginationModel: { page: page, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
            pagination
            paginationMode="server"
            loading={isLoading || areScholarshipsLoading}
            getRowClassName={(params) => 
              params.row.status === 'inactive' ? 'inactive' : 'active'
            }
            sx={[profiletheme.bookmarks.bookmarksGridTable, {
              height:
                Array.isArray(filteredRows) && filteredRows?.length > 0 ? 'auto' : 200,
              '.MuiDataGrid-overlayWrapper': {
                minHeight: '200px',
                height:
                  filteredRows.length > 0 ? 'auto !important' : '200px !important',
              },
              '.MuiDataGrid-overlayWrapperInner': {
                minHeight: '200px',
                height:
                  filteredRows.length > 0 ? 'auto !important' : '200px !important',
              },
            }]}
          />
        </Box>
      </Box>
    </Box>
  )
}


export default BookmarksPage;