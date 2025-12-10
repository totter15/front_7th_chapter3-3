import { mapUserDtoToUser } from "../model/user.mapper"
import { User } from "../model/user"

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
