import { Dayjs } from 'dayjs'

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
  listing_id: number
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
    provider_link?: string
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
  provider_link?: string
  user_id: number
}

export type Role = {
  id: number
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

export type StudentProfile = {
  about: string
  full_name: string
  birthdate: Dayjs
  email: string
  age: number
  nationality: string
  gender: string
  state: string
  secondary_school_name: string
  secondary_school_year: string
  secondary_school_address: string
  secondary_school_phone_number: string
  secondary_school_awards: string
  secondary_school_organizations: string
  elementary_school_name: string
  elementary_school_year: string
  elementary_school_address: string
  elementary_school_phone_number: string
  elementary_school_awards: string
  elementary_school_organizations: string
  guardian_full_name: string
  guardian_contact_number: string
  guardian_relationship: string
}

export type User = {
  birthdate: string
  email_address: string
  password_digest?: string
  first_name: string
  id: number
  parent_id?: number
  is_active: number
  last_name: string
  role_id: number
  session_token: string
  role: Role
  scholarship_provider: ScholarshipProvider
  student_profile: StudentProfile
  scholarships?: ProviderScholarship[]
}
