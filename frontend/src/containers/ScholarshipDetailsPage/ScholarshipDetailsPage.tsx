import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextLoading from '../../components/Loading/TextLoading'
import useGetScholarshipData from '../../hooks/useGetScholarshipData'
import ProviderProfile from '../../public/images/pro-profile.png'
import { initializeScholarshipData } from '../../redux/reducers/ScholarshipDataReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ScholarshipData } from '../../redux/types'
import './ScholarshipDetailsPage.css'

interface Results {
  scholarshipData: ScholarshipData
}

interface ScholarshipDataResultsPageProps {
  isASection: boolean
}

export const ScholarshipDetailsPage: React.FC<
  ScholarshipDataResultsPageProps
> = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getScholarshipData } = useGetScholarshipData()
  const result = useAppSelector(
    (state) => state.persistedReducer.scholarshipData
  ) as Results
  const [scholarshipData, setScholarshipData] =
    useState<ScholarshipData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (id) {
      getScholarshipData(id)
      setIsLoading(false)
    }

    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    setScholarshipData(result.scholarshipData)
    if (
      Object.keys(result.scholarshipData).length > 0 &&
      !result.scholarshipData.scholarship_name
    ) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [result.scholarshipData])

  const getDate = (date: string): string => {
    const parseDate = new Date(Date.parse(date))
    const year = parseDate.getFullYear()
    const month = parseDate.getMonth() + 1
    const day = parseDate.getDate()

    const format = (number: number, count: number) => {
      let str = number.toString()
      let numCount = count - str.length
      for (let i = 0; i < numCount; i++) {
        str = '0' + str
      }

      return str
    }

    return `${format(month, 2)}-${format(day, 2)}-${year}`
  }

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <section id="details">
        <div className="container" style={{ padding: '80px 20px' }}>
          <aside id="aside">
            <Button
              onClick={() => {
                dispatch(initializeScholarshipData({}))
                navigate(-1)
              }}
              sx={{
                color: 'secondary.main',
                fontSize: '24px',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <ArrowBackIosIcon /> Back to Search Results
            </Button>
          </aside>
          {scholarshipData && (
            <div className="details-card">
              <h3 className="title3">
                {scholarshipData.scholarship_name || <TextLoading />}
              </h3>
              {scholarshipData.benefits &&
                scholarshipData.benefits.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Benefits</h4>
                    {scholarshipData.benefits.map((benefit: any) => (
                      <p
                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}
                        key={benefit.id}
                      >
                        {benefit.benefit_name}
                      </p>
                    ))}
                  </div>
                )}
              {scholarshipData.requirements &&
                scholarshipData.requirements.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Requirements</h4>
                    {scholarshipData.requirements.map((requirement: any) => (
                      <p
                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}
                        key={requirement.id}
                      >
                        {requirement.requirements_text}
                      </p>
                    ))}
                  </div>
                )}
              {scholarshipData.eligibilities &&
                scholarshipData.eligibilities.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Eligibilities</h4>
                    {scholarshipData.eligibilities.map((elibility: any) => (
                      <p
                        style={{ whiteSpace: 'pre-wrap', lineHeight: 1.3 }}
                        key={elibility.id}
                      >
                        {elibility.eligibility_text}
                      </p>
                    ))}
                  </div>
                )}
              {scholarshipData.application_link && (
                <div className="details-section">
                  <h4 className="title4">Application Link</h4>
                  <Link to={scholarshipData.application_link} target="_blank">
                    {scholarshipData.application_link}
                  </Link>
                </div>
              )}
              <div className="details-section details-columns">
                <div className="details-column">
                  <h5 className="title4">Application Start Date</h5>
                  <p className="bordered">
                    {getDate(scholarshipData.start_date)}
                  </p>
                </div>
                <div className="details-column">
                  <h5 className="title4">Application End Date</h5>
                  <p className="bordered">
                    {getDate(scholarshipData.due_date)}
                  </p>
                </div>
                <div className="details-column">
                  <h5 className="title4">School Year</h5>
                  <p className="bordered">
                    S. Y. : {scholarshipData.school_year}
                  </p>
                </div>
              </div>
            </div>
          )}
          {scholarshipData && scholarshipData.scholarship_provider && (
            <div className="profiles-card">
              <div className="profiles-column">
                <div className="profiles-image">
                  <img src={ProviderProfile} alt="" />
                </div>
                <div className="profiles-details">
                  <h3 className="title3">
                    {scholarshipData.scholarship_provider.provider_name}
                  </h3>
                  <p style={{ marginBottom: '20px' }}>
                    {
                      scholarshipData.scholarship_provider
                        .scholarship_provider_profile?.description
                    }
                  </p>
                  <a
                    target="_blank"
                    style={{ color: '#002147', marginTop: '20px' }}
                    href={`https://${scholarshipData.scholarship_provider.provider_link}`}
                  >
                    Link to Provider Page
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section id="details">
        <div className="container"></div>
      </section>
    </>
  )
}
