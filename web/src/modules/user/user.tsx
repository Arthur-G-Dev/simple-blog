import React, {ChangeEvent, useState} from 'react'
import styles from './styles.module.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {IUser} from "./index";
import {updateUser} from "./user-slice";

const User = () => {
  const {user} = useAppSelector(state => state.user)
  const [edit, toggleEdit] = useState<boolean>(false)
  const [nameEdit, toggleNameEdit] = useState<boolean>(false)
  const [form, setForm] = useState<IUser>({
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
    <div className={styles.userContainer}>
      <h3>User</h3>
      {!edit ?
        <div className={styles.wrapper}>
          {!nameEdit ? <h4>Nick Name: {user.nick_name}</h4> :
          <input type="text"
                 className={`input-main ${styles.input}`}
                 onChange={handleInputChange}
                 value={form.nick_name}
                 name='nick_name' placeholder='Nick name'/>}
          <h5>Email: {user.email}</h5>
          {!nameEdit ?
            <button className={styles.editBtn}
                    onClick={() => {
                      toggleNameEdit(!nameEdit)
                      const data = {...form}
                      data.nick_name = user.nick_name
                      setForm(data)
                    }}>Edit Nickname</button> :
            <input type="submit"
                   onClick={() => {
                     form.nick_name &&
                     dispatch(updateUser({nick_name: form.nick_name}))
                       .then(res => res && toggleNameEdit(!nameEdit))
                   }} value='Submit'/>}
          {!nameEdit && <button onClick={() => toggleEdit(!edit)}>Change Password</button>}
        </div> :
        <>
          <div className={styles.wrapper}>
            <input type='password'
                   value={form.password}
                   onChange={handleInputChange}
                   className={`input-main ${styles.input}`}
                   name='password' placeholder='New Password'/>
            <input type="submit"
                   onClick={() => {
                     form.password && dispatch(updateUser({password: form.password}))
                       .then(res => {
                         if(res) {
                           alert('Password has been updated')
                           toggleEdit(!edit)
                         }
                       })
                   }}
                   value='Submit'/>
          </div>
        </>
      }
    </div>
  )
}

export default User
