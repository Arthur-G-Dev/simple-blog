import React, {ChangeEvent, useState} from 'react'
import styles from "./styles.module.scss";
import {login} from "../user/user-slice";
import {IUser} from "../user";
import {useAppDispatch} from "../../app/hooks";

const Login = () => {

  const [form, setForm] = useState<IUser>({
    email: '',
    password: ''
  })

  const [errMsg, setErrMsg] = useState<string>('Please fill in all required fields')

  const [formValid, setFormValid] = useState<boolean>(true)

  const dispatch = useAppDispatch()

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const data: any = {...form}
    data[target.name] = target.value
    setForm(data)
  }

  const submit = () => {
    setFormValid(true)
    if (form.email && form.password) {
      dispatch(login(form))
        .then(err => {
          setFormValid(false)
          setErrMsg(err)
          console.log('RES', err)
        })
    } else {
      setFormValid(false)
      setErrMsg('Please fill in all required fields')
    }
  }

  return (
    <div className={`content-center ${styles.login}`}>
      <h3>Login To Our Blog</h3>
      <div className={styles.form}>
        <input type="email"
               value={form.email}
               onChange={handleInputChange}
               className={`input-main ${styles.input} ${!formValid && !form.email ? 'input-error' : ''}`}
               name='email' placeholder='Email'/>
        <input type='password'
               value={form.password}
               onChange={handleInputChange}
               className={`input-main ${styles.input} ${!formValid && !form.password ? 'input-error' : ''}`}
               name='password' placeholder='Password'/>
      </div>
      <input type="submit"
             className={styles.submitBtn}
             onClick={submit} value='Submit'/>
      {!formValid && <span className='text-error'>*{errMsg}</span>}
    </div>
  )
}

export default Login
