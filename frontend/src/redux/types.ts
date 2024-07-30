export type Scholarship = {
  id: number
  listing_id: number
  scholarship_name: string
  start_date: string
  due_date: string
  scholarship_provider: {
    id: number
    provider_name: string
  }
  status: string
}

export type BenefitCategory = {
  id: number
  category_name: string
}

export type ScholarshipData = {
  id: string
  scholarship_name: string
  description: string
  start_date: string
  due_date: string
  application_link: string
  application_email: string
  school_year: string
  status: string
  scholarship_type: {
    id: number
    scholarship_type_name: string
  }
  scholarship_provider: {
    id: number
    provider_name: string
    provider_link: string
    scholarship_provider_profile: {
      id: number
      description: string
    }
  }
  benefit_categories: BenefitCategory[]
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
  scholarship_provider: ScholarshipProvider
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

export type Profile = {
  id: number
  provider_type: string
  description: string
  scholarship_provider: ScholarshipProvider
  ph_address: {
    id: number
    city: string
    province: string
    region: string
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

export type ScholarshipProvider = {
  id: number
  provider_name: string
  provider_link: string
  user_id: number
}

export type Role = {
  id: number | null
  role_name: string
}

export type ScholarshipType = {
  id: string
  name: string
}

export type City = {
  id: number
  city_name: string
}

export type Region = {
  id: number
  region_name: string
}

export type Province = {
  id: number
  province_name: string
}

export type School = {
  city_id: number
  id: number
  province_id: number
  region_id: number
  school_name: string
}

export type ProviderScholarship = {
  application_link: string
  description: string
  due_date: string
  start_date: string
  scholarship_name: string
  school_year: string
  status: string
  benefits: { id: number; benefit_name: string }[]
  eligibilities: { id: number; eligibility_text: string }[]
  requirements: { id: number; requirements_text: string }[]
  courses: { id: number; course_name: string; degree_level: string }[]
  schools: School[]
  scholarship_provider: ScholarshipProvider
  scholarship_type: ScholarshipType
}

export type User = {
  birthdate: string
  email_address: string
  first_name: string
  id: number
  is_active: number
  last_name: string
  role_id: number
  session_token: string
  role: Role
  scholarship_provider: ScholarshipProvider
  scholarships?: ProviderScholarship[]
}
