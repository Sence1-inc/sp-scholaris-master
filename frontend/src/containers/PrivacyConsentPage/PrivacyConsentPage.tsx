import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './PrivacyConsentPage.css'

interface PrivacyPolicy {
  address: string
  afterword: string
  contact_number: string
  date_updated: string
  email_address: string
  disclaimer: string
  heading: string
  introduction: string
  main_items: {
    heading: string
    content: string
    sub_contents: {
      heading: string
      content: string
    }[]
    specific_to: string
  }[]
  thank_you_message: string
}

const PrivacyConsentPage: React.FC = () => {
  const [data, setData] = useState<PrivacyPolicy>({
    address: '',
    afterword: '',
    contact_number: '',
    disclaimer: '',
    date_updated: '',
    email_address: '',
    heading: '',
    introduction: '',
    main_items: Array(11).fill({
      heading: '',
      content: '',
      sub_contents: [],
      specific_to: '',
    }),
    thank_you_message: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.jsonbin.io/v3/b/${process.env.REACT_APP_BIN_ID_PRIVACY_POLICY}/${process.env.REACT_APP_BIN_VERSION}`,
          {
            headers: {
              'X-Master-Key': process.env.REACT_APP_BIN_API_KEY,
              'X-Bin-Meta': false,
            },
          }
        )
        setData(response.data.record)
      } catch (error) {
        if (error) {
          console.error('Error:', error)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <div className="content_privacy-body">
      <h2 className="content_privacy-body-header">Privacy Consent</h2>
      <p className="content_privacy-body-text">{data.heading}</p>
      <p className="content_privacy-body-text">{data.introduction}</p>

      {data.main_items.map(
        (
          item: {
            heading: string
            content: string
            sub_contents: {
              heading: string
              content: string
            }[]
            specific_to: string
          },
          index: number
        ) => {
          if (item.specific_to === '' || item.specific_to === 'scholaris') {
            return (
              <>
                <h3
                  key={`h3-${index}`}
                  className="content_privacy-body-subheader"
                >
                  {item.heading}
                </h3>
                <p key={`p-${index}`} className="content_privacy-body-text">
                  {item.content}
                </p>
                {item.sub_contents.length > 0
                  ? item.sub_contents.map(
                      (
                        sub_content: { heading: string; content: string },
                        ind: number
                      ) => {
                        return (
                          <>
                            <h4
                              key={`h4-${ind}`}
                              className="content_privacy-third-level-heading"
                            >
                              {sub_content.heading}
                            </h4>
                            <p
                              key={`p-${ind}`}
                              className="content_privacy-body-text"
                            >
                              {sub_content.content}
                            </p>
                          </>
                        )
                      }
                    )
                  : null}
              </>
            )
          }

          return null
        }
      )}

      <h3 className="content_privacy-body-subheader">Contact Information</h3>
      <p className="content_privacy-body-text">{data.afterword}</p>
      <div className="content_container-contact">
        <p className="content_contact-info">Company Address: {data.address}</p>
        <p className="content_contact-info">
          Contact Number: {data.contact_number}
        </p>
        <p className="content_contact-info">
          Email Address: {data.email_address}
        </p>
      </div>
      <p className="content_privacy-body-text"> {data.thank_you_message}</p>
    </div>
  )
}

export default PrivacyConsentPage
