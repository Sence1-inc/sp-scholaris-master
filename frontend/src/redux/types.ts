export type Scholarship = {
    id: number,
    scholarship_name: string,
    start_date: string,
    due_date: string,
    scholarship_provider: {
        id: number,
        provider_name: string
    }
}

export type Params = {
    [key: string]: string | null | Date
  }