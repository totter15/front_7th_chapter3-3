import { mapUserDtoToUser } from "../types/user.mapper"
import { User } from "../types/user"

const getUserApi = async ({ id }: { id: number }): Promise<User | undefined> => {
  try {
    const response = await fetch(`/api/users/${id}`)
    const data = await response.json()
    return mapUserDtoToUser(data)
  } catch (error) {
    console.error("사용자 가져오기 오류:", error)
  }
}

export default getUserApi
