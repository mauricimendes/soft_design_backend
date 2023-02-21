export default interface ICreateUsersDTO {
  name: string
  email: string
  password: string
  phone: string
  is_admin?: boolean
}