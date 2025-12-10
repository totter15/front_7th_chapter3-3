import { GetUsersResponse } from "../model/user.dto"

const getUsersApi = async (): Promise<GetUsersResponse> => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("사용자 가져오기 오류:", error)
    return { users: [], total: 0, skip: 0, limit: 0 }
  }
}

export default getUsersApi
