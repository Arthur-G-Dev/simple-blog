export interface User {
  email?: string
  nick_name?: string
  password?: string
}

export interface InitialState {
  user: User,
  userLogged: boolean
}
