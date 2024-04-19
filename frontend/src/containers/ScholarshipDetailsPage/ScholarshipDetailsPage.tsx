import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PrimaryButton from '../../components/Button/PrimaryButton'
import TextLoading from '../../components/Loading/TextLoading'
import useGetScholarshipData from '../../hooks/useGetScholarshipData'
import ProviderProfile from '../../public/images/pro-profile.png'
import { useAppSelector } from '../../redux/store'
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
  const navigate = useNavigate()
  const { getScholarshipData } = useGetScholarshipData()
  const result = useAppSelector(
    (state) => state.persistedReducer.scholarshipData
  ) as Results
  const [scholarshipData, setScholarshipData] =
    useState<ScholarshipData | null>(null)

  useEffect(() => {
    if (id) {
      getScholarshipData(id)
    }

    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    setScholarshipData(result.scholarshipData)
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
      <section id="details">
        <div className="container">
          <aside id="aside">
            <Button
              onClick={() => navigate(-1)}
              sx={{
                color: 'secondary.main',
                marginLeft: '30px',
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
          <h2 className="title2">Scholarship Details</h2>
          {scholarshipData && (
            <div className="details-card">
              <h3 className="title3">
                {scholarshipData.scholarship_name || <TextLoading />}
              </h3>
              {scholarshipData.benefits &&
                scholarshipData.benefits.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Benefits</h4>
                    <ol>
                      {scholarshipData.benefits.map((benefit: any) => (
                        <li key={benefit.id}>{benefit.benefit_name}</li>
                      ))}
                    </ol>
                  </div>
                )}
              {scholarshipData.requirements &&
                scholarshipData.requirements.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Requirements</h4>
                    <ol>
                      {scholarshipData.requirements.map((requirement: any) => (
                        <li key={requirement.id}>
                          {requirement.requirements_text}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              {scholarshipData.eligibilities &&
                scholarshipData.eligibilities.length > 0 && (
                  <div className="details-section">
                    <h4 className="title4">Eligibilities</h4>
                    <ol>
                      {scholarshipData.eligibilities.map((elibility: any) => (
                        <li key={elibility.id}>{elibility.eligibility_text}</li>
                      ))}
                    </ol>
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
                    S . Y : {scholarshipData.school_year}
                  </p>
                </div>
              </div>
              <div className="details-section">
                <PrimaryButton label="Apply" />
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
                  <p>
                    {
                      scholarshipData.scholarship_provider
                        .scholarship_provider_profile?.description
                    }
                  </p>
                  <div className="details-section">
                    <PrimaryButton label="Visit Profile" />
                  </div>
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
