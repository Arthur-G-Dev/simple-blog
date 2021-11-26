import React, {ChangeEvent, useState} from 'react'
import styles from './styles.module.scss'
import {signUp} from '../user/user-slice'
import {useAppDispatch} from "../../app/hooks"
import {IUser} from "../user";

const SignUp = () => {
  const [form, setForm] = useState<IUser>({
    email: '',
    nick_name: '',
    password: ''
  })

  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const data: any = {...form}
    data[target.name] = target.value
    setForm(data)
  }

  return (
    <div className={`content-center ${styles.signup}`}>
      <h3>Sign up To Our Blog</h3>
      <div className={styles.form}>
        <input type="text"
               className={`input-main ${styles.input}`}
               onChange={handleInputChange}
               value={form.nick_name}
               name='nick_name' placeholder='Nick name'/>
        <input type="email"
               value={form.email}
               onChange={handleInputChange}
               className={`input-main ${styles.input}`}
               name='email' placeholder='Email'/>
        <input type='password'
               value={form.password}
               onChange={handleInputChange}
               className={`input-main ${styles.input}`}
               name='password' placeholder='Password'/>
      </div>
      <input type="submit"
             className={styles.submitBtn}
             onClick={() => dispatch(signUp(form))} value='Submit'/>
    </div>
  )
}

export default SignUp
