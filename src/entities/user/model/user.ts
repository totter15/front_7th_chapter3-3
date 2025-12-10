export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  username: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}
