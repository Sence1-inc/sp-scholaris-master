export type Scholarship = {
  id: number
  scholarship_name: string
  start_date: string
  due_date: string
  scholarship_provider: {
    id: number
    provider_name: string
  }
  status: string
}

export type ScholarshipData = {
  id: string
  scholarship_name: string
  description: string
  start_date: string
  due_date: string
  application_link: string
  school_year: string
  status: string
  scholarship_type: {
    id: number
    scholarship_type_name: string
  }
  scholarship_provider: {
    id: number
    provider_name: string
    scholarship_provider_profile: {
      id: number
      description: string
    }
  }
  requirements: [
    {
      id: number
      requirements_text: string
    },
  ]
  eligibilities: [
    {
      id: number
      eligibility_text: string
    },
  ]
  benefits: [
    {
      id: number
      benefit_name: string
    },
  ]
}

export type ProviderData = {
  id: number
  provider_type: string
  description: string
  scholarship_provider: {
      id: number
      provider_name: string
      user_id: number
  }
  region: {
    id: number
    region_name: string
  }
  city: {
    id: number
    city_name: string
  }
  province: {
    id: number
    province_name: string
  }
}

export type Params = {
  [key: string]: string | null | Date | number
}
