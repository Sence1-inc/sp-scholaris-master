import { Dayjs } from 'dayjs'

/**
 * @interface Scholarship
 * @description Represents a scholarship
 * @property {number} id - Unique identifier for the scholarship
 * @property {number} listing_id - Listing identifier
 * @property {string} scholarship_name - Name of the scholarship
 * @property {string} provider_name - Name of the provider
 * @property {string} start_date - Start date of the scholarship
 * @property {string} due_date - Due date of the scholarship
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {string} status - Status of the scholarship
 * @property {string} content_status - Content status of the scholarship
 * @property {boolean} is_application_link_active - Application link active flag
 * @property {boolean} is_bookmarked - Bookmarked flag
 * @property {number} bookmark_id - Bookmark identifier
 */
export type Scholarship = {
  id: number
  listing_id: number
  scholarship_name: string
  provider_name?: string
  start_date: string
  due_date: string
  scholarship_provider: {
    id: number
    provider_name: string
  }
  status: string
  content_status: string
  is_application_link_active: boolean
  is_bookmarked: boolean
  bookmark_id?: number
}

/**
 * @interface BenefitCategory
 * @description Represents a category of benefits for scholarships
 * @property {number} id - Unique identifier for the benefit category
 * @property {string} category_name - Name of the benefit category
 */
export type BenefitCategory = {
  id: number
  category_name: string
}

/**
 * @interface ScholarshipData
 * @description Represents scholarship data
 * @property {string} id - Unique identifier for the scholarship data
 * @property {string} content_status - Content status of the scholarship data
 * @property {string} scholarship_name - Name of the scholarship
 * @property {number} listing_id - Listing identifier
 * @property {string} description - Description of the scholarship
 * @property {string} start_date - Start date of the scholarship
 * @property {string} due_date - Due date of the scholarship
 * @property {string} application_link - Application link for the scholarship
 * @property {string} application_email - Application email for the scholarship
 * @property {string} school_year - School year of the scholarship
 * @property {string} status - Status of the scholarship
 * @property {boolean} is_application_link_active - Application link active flag
 * @property {ScholarshipType} scholarship_type - Scholarship type details
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {BenefitCategory[]} benefit_categories - Array of benefit categories
 * @property {Requirement[]} requirements - Array of requirements
 * @property {Eligibility[]} eligibilities - Array of eligibilities
 * @property {Benefit[]} benefits - Array of benefits
 * @property {boolean} is_bookmarked - Bookmarked flag
 * @property {number} bookmark_id - Bookmark identifier
 */
export type ScholarshipData = {
  id: string
  content_status: string
  scholarship_name: string
  listing_id: number
  description: string
  start_date: string
  due_date: string
  application_link: string
  application_email: string
  school_year: string
  status: string
  is_application_link_active: boolean
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
  is_bookmarked: boolean
  bookmark_id?: number
}

/**
 * @interface ProviderData
 * @description Represents provider data
 * @property {number} id - Unique identifier for the provider
 * @property {string} provider_type - Type of the provider
 * @property {string} description - Description of the provider
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {Region} region - Region details
 * @property {City} city - City details
 * @property {Province} province - Province details
 */
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

/**
 * @interface Profile
 * @description Represents a profile
 * @property {number} id - Unique identifier for the profile
 * @property {string} provider_type - Type of the provider
 * @property {string} description - Description of the profile
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {PhAddress} ph_address - Postal address details
 * @property {Region} region - Region details
 * @property {City} city - City details
 * @property {Province} province - Province details
 */
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

/**
 * @interface Params
 * @description Generic parameter type for API requests and filters
 * @property {string | null | Date | number} [key] - Dynamic key-value pairs for parameters
 */
export type Params = {
  [key: string]: string | null | Date | number
}

/**
 * @interface ScholarshipApplication
 * @description Represents a scholarship application
 * @property {number} id - Unique identifier for the scholarship application
 * @property {string} scholarship_name - Name of the scholarship
 * @property {string} student_name - Name of the student
 * @property {string} created_at - Creation timestamp
 * @property {string} recipient_email - Recipient email for the application
 * @property {String} user_message - User message for the application
 * @property {string} updated_at - Last update timestamp
 * @property {number} scholarship_id - Scholarship identifier
 * @property {string} student_email - Student email for the application
 * @property {number | null} user_id - User identifier
 * @property {number} status - Status of the application
 * @property {string} notes - Notes for the application
 * @property {string} batch - Batch identifier
 * @property {Scholarship} scholarship - Scholarship details
 * @property {User} user - User details
 */
export type ScholarshipApplication = {
  id: number
  scholarship_name: string
  student_name: string
  created_at: string
  recipient_email: string
  user_message: String
  updated_at: string
  scholarship_id: number
  student_email: string
  user_id: number | null
  status: number
  notes: string
  batch: string
  scholarship: Scholarship
  user?: User
}

/**
 * @interface ScholarshipProvider
 * @description Represents a scholarship provider
 * @property {number} id - Unique identifier for the provider
 * @property {string} provider_name - Name of the provider
 * @property {string} provider_link - Provider link
 * @property {number} user_id - User identifier
 * @property {Profile} scholarship_provider_profile - Scholarship provider profile details
 * @property {ScholarshipApplication[]} scholarship_applications - Array of scholarship applications
 */
export type ScholarshipProvider = {
  id: number
  provider_name: string
  provider_link?: string
  user_id: number
  scholarship_provider_profile?: Profile
  scholarship_applications?: ScholarshipApplication[]
}

/**
 * @interface Role
 * @description Represents a role
 * @property {number} id - Unique identifier for the role
 * @property {string} role_name - Name of the role
 */
export type Role = {
  id: number
  role_name: string
}

/**
 * @interface ScholarshipType
 * @description Represents a scholarship type
 * @property {string} id - Unique identifier for the scholarship type
 * @property {string} name - Name of the scholarship type
 */
export type ScholarshipType = {
  id: string
  name: string
}

/**
 * @interface City
 * @description Represents a city
 * @property {number} id - Unique identifier for the city
 * @property {string} city_name - Name of the city
 */
export type City = {
  id: number
  city_name: string
}

/**
 * @interface Region
 * @description Represents a region
 * @property {number} id - Unique identifier for the region
 * @property {string} region_name - Name of the region
 */
export type Region = {
  id: number
  region_name: string
}

/**
 * @interface Province
 * @description Represents a province
 * @property {number} id - Unique identifier for the province
 * @property {string} province_name - Name of the province
 */
export type Province = {
  id: number
  province_name: string
}

/**
 * @interface School
 * @description Represents a school
 * @property {number} city_id - City identifier
 * @property {number} id - Unique identifier for the school
 * @property {number} province_id - Province identifier
 * @property {number} region_id - Region identifier
 * @property {string} school_name - Name of the school
 */
export type School = {
  city_id: number
  id: number
  province_id: number
  region_id: number
  school_name: string
}

/**
 * @interface ProviderScholarship
 * @description Represents a provider scholarship
 * @property {string} application_link - Application link for the scholarship
 * @property {string} description - Description of the scholarship
 * @property {string} due_date - Due date of the scholarship
 * @property {string} start_date - Start date of the scholarship
 * @property {string} scholarship_name - Name of the scholarship
 * @property {string} school_year - School year of the scholarship
 * @property {string} status - Status of the scholarship
 * @property {BenefitData[]} benefits - Array of benefits
 * @property {EligibilityData[]} eligibilities - Array of eligibilities
 * @property {RequirementData[]} requirements - Array of requirements
 * @property {CourseData[]} courses - Array of courses
 * @property {School[]} schools - Array of schools
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {ScholarshipType} scholarship_type - Scholarship type details
 */
export type ProviderScholarship = {
  application_link: string
  description: string
  due_date: string
  start_date: string
  scholarship_name: string
  school_year: string
  status: string
  benefits: BenefitData[]
  eligibilities: EligibilityData[]
  requirements: RequirementData[]
  courses: CourseData[]
  schools: School[]
  scholarship_provider: ScholarshipProvider
  scholarship_type: ScholarshipType
}

/**
 * @interface BenefitData
 * @description Represents a benefit
 * @property {number} id - Unique identifier for the benefit
 * @property {string} benefit_name - Name of the benefit
 */
export type BenefitData = {
  id: number
  benefit_name: string
}

/**
 * @interface EligibilityData
 * @description Represents an eligibility
 * @property {number} id - Unique identifier for the eligibility
 * @property {string} eligibility_text - Text of the eligibility
 */
export type EligibilityData = {
  id: number
  eligibility_text: string
}

/**
 * @interface RequirementData
 * @description Represents a requirement
 * @property {number} id - Unique identifier for the requirement
 * @property {string} requirements_text - Text of the requirement
 */
export type RequirementData = {
  id: number
  requirements_text: string
}

/**
 * @interface CourseData
 * @description Represents a course
 * @property {number} id - Unique identifier for the course
 * @property {string} course_name - Name of the course
 * @property {string} degree_level - Degree level of the course
 */
export type CourseData = {
  id: number
  course_name: string
  degree_level: string
}

/**
 * @interface StudentProfile
 * @description Represents a student profile
 * @property {string} about - About the student
 * @property {string} full_name - Full name of the student
 * @property {Dayjs} birthdate - Birthdate of the student
 * @property {string} email - Email address of the student
 * @property {number} age - Age of the student
 * @property {string} nationality - Nationality of the student
 * @property {string} gender - Gender of the student
 * @property {string} state - State of the student
 * @property {string} secondary_school_name - Name of the secondary school
 * @property {string} secondary_school_year - Year of the secondary school
 * @property {string} secondary_school_address - Address of the secondary school
 * @property {string} secondary_school_phone_number - Phone number of the secondary school
 * @property {string} secondary_school_awards - Awards received at the secondary school
 * @property {string} secondary_school_organizations - Organizations participated in at the secondary school
 * @property {string} elementary_school_name - Name of the elementary school
 * @property {string} elementary_school_year - Year of the elementary school
 * @property {string} elementary_school_address - Address of the elementary school
 * @property {string} elementary_school_phone_number - Phone number of the elementary school
 * @property {string} elementary_school_awards - Awards received at the elementary school
 * @property {string} elementary_school_organizations - Organizations participated in at the elementary school
 * @property {string} guardian_full_name - Full name of the guardian
 * @property {string} guardian_contact_number - Contact number of the guardian
 * @property {string} guardian_relationship - Relationship of the guardian
 */
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

/**
 * @interface User
 * @description Represents a user
 * @property {string} birthdate - Birthdate of the user
 * @property {string} email_address - Email address of the user
 * @property {string} password_digest - Password digest of the user
 * @property {string} first_name - First name of the user
 * @property {number} id - Unique identifier for the user
 * @property {number} parent_id - Parent identifier
 * @property {number} is_active - Active flag
 * @property {string} last_name - Last name of the user
 * @property {number} role_id - Role identifier
 * @property {string} session_token - Session token
 * @property {Role} role - Role details
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {Profile} profile - Profile details
 * @property {StudentProfile} student_profile - Student profile details
 * @property {ProviderScholarship[]} scholarships - Array of scholarships
 */
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
  profile?: Profile
  student_profile: StudentProfile
  scholarships?: ProviderScholarship[]
}

/**
 * @interface Article
 * @description Represents a blog or news article
 * @property {number} id - Unique identifier for the article
 * @property {string} documentId - Document reference ID
 * @property {string} excerpt - Short summary of the article
 * @property {Cover} cover - Cover image details
 * @property {string} author - Author of the article
 * @property {string} content - Main content of the article
 * @property {string} title - Article title
 * @property {string} description - Detailed description
 * @property {string} slug - URL-friendly identifier
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string} publishedAt - Publication timestamp
 * @property {Tag[]} tags - Associated tags
 * @property {Project} project - Associated project
 * @property {boolean} is_popular - Popularity flag
 * @property {boolean} is_provider_specific - Provider-specific content flag
 * @property {boolean} is_student_specific - Student-specific content flag
 */
export type Article = {
  id: number
  documentId: string
  excerpt: string
  cover: Cover
  author: string
  content: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  tags: Tag[]
  project: Project
  is_popular: boolean
  is_provider_specific: boolean
  is_student_specific: boolean
}

/**
 * @interface Project
 * @description Represents a project
 * @property {string} createdAt - Creation timestamp
 * @property {string} documentId - Document reference ID
 * @property {number} id - Unique identifier for the project
 * @property {string} name - Name of the project
 * @property {string} publishedAt - Publication timestamp
 * @property {string} slug - URL-friendly identifier
 * @property {string} updatedAt - Last update timestamp
 */
export type Project = {
  createdAt: string
  documentId: string
  id: number
  name: string
  publishedAt: string
  slug: string
  updatedAt: string
}

/**
 * @interface Tag
 * @description Represents a tag
 * @property {string} createdAt - Creation timestamp
 * @property {string} description - Description of the tag
 * @property {string} documentId - Document reference ID
 * @property {number} id - Unique identifier for the tag
 * @property {string} name - Name of the tag
 * @property {string} publishedAt - Publication timestamp
 * @property {string} slug - URL-friendly identifier
 * @property {string} updatedAt - Last update timestamp
 */
export type Tag = {
  createdAt: string
  description: string
  documentId: string
  id: number
  name: string
  publishedAt: string
  slug: string
  updatedAt: string
}

/**
 * @interface Cover
 * @description Represents a cover image
 * @property {number} id - Unique identifier for the cover image
 * @property {string} documentId - Document reference ID
 * @property {string} name - Name of the cover image
 * @property {string | null} alternativeText - Alternative text for the cover image
 * @property {string | null} caption - Caption for the cover image
 * @property {string} ext - File extension of the cover image
 * @property {string} mime - MIME type of the cover image
 * @property {number} size - Size of the cover image
 * @property {number} width - Width of the cover image
 * @property {number} height - Height of the cover image
 * @property {string} url - URL of the cover image
 * @property {string} hash - Hash of the cover image
 * @property {string | null} previewUrl - Preview URL of the cover image
 * @property {string} provider - Provider of the cover image
 * @property {Record<string, unknown> | null} provider_metadata - Provider metadata
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string} publishedAt - Publication timestamp
 * @property {Formats} formats - Formats of the cover image
 */
export type Cover = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  ext: string
  mime: string
  size: number
  width: number
  height: number
  url: string
  hash: string
  previewUrl: string | null
  provider: string
  provider_metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  formats: Formats
}

type ImageFormat = {
  ext: string
  url: string
  hash?: string
  mime?: string
  name?: string
  path?: string
  size?: number
  width?: number
  height?: number
}

type Formats = {
  large?: ImageFormat
  medium?: ImageFormat
  small?: ImageFormat
  thumbnail?: ImageFormat
}

/**
 * @interface ScholarshipFeedback
 * @description Represents a scholarship feedback
 * @property {number} id - Unique identifier for the feedback
 * @property {number} scholarship_id - Scholarship identifier
 * @property {ScholarshipProvider} scholarship_provider - Scholarship provider details
 * @property {string} feedback - Feedback text
 * @property {string} notes - Notes for the feedback
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Last update timestamp
 */
export type ScholarshipFeedback = {
  id: number
  scholarship_id: number
  scholarship_provider: ScholarshipProvider
  feedback: string
  notes: string
  created_at: string
  updated_at: string
}

/**
 * @interface Bookmark
 * @description Represents a bookmark
 * @property {number} id - Unique identifier for the bookmark
 * @property {string} provider_name - Name of the provider
 * @property {number} scholarship_id - Scholarship identifier
 * @property {string} scholarship_name - Name of the scholarship
 * @property {number} scholarship_provider_id - Scholarship provider identifier
 * @property {number} user_id - User identifier
 */
export type Bookmark = {
  id: number
  provider_name: string
  scholarship_id: number
  scholarship_name: string
  scholarship_provider_id: number
  user_id: number
}
