export const PROVIDER_TYPE: string = 'provider'
export const STUDENT_TYPE: string = 'student'
export const STUDENT_ROLE_ID: number = 3
export const PROVIDER_ROLE_ID: number = 4

// FOR NEW STATUSES, MAKE SURE TO UPDATE BACKEND CONSTANT VALUES AS WELL
export const APPLICATION_STATUSES: { [key: number]: string } = {
  1: 'submitted',
  2: 'under_review',
  3: 'shortlisted',
  4: 'interview_scheduled',
  5: 'inteview_completed',
  6: 'recommended',
  7: 'approved',
  8: 'awarded',
  9: 'rejected',
  10: 'waitlisted',
  11: 'withdrawn',
  12: 'deferred',
  13: 'incomplete',
}
