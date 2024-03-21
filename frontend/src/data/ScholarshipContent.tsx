export interface ScholarshipType {
  id: string
  name: string
}

export const SCHOLARSHIP_TYPES: ScholarshipType[] = [
  { id: '1', name: 'Merit-based' },
  { id: '2', name: 'Need-based' },
  { id: '3', name: 'Demographic-based' },
  { id: '4', name: 'Industry-based' },
  { id: '5', name: 'Athletic' },
  { id: '6', name: 'Artistic' },
  { id: '7', name: 'Field of Study' },
]
