import React, {ChangeEvent, useEffect, useState} from 'react'
import styles from "./styles.module.scss";
import {ArticleForm} from "./index";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { createArticle } from './article-slice';
import {getCategories} from "../../app-slice";
import {useHistory} from "react-router-dom";

const Form = () => {
  const {categories} = useAppSelector(state => state.app)
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    text: '',
    category: '',
  })
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    const data = {...form}
    data.category = categories[0]?.name
    setForm(data)
  }, [categories])

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    const data: any = {...form}
    data[target.name] = target.value
    setForm(data)
  }

  return (
    <div className={`content-center ${styles.articleForm}`}>
      <h3>Create Article</h3>
      <div className={styles.form}>
        <input type="text"
               className={`input-main ${styles.input}`}
               onChange={handleInputChange}
               value={form.title}
               name='title' placeholder='Title'/>
        <textarea value={form.text}
               onChange={handleInputChange}
               className={`input-main ${styles.input}`}
               name='text' placeholder='text'/>
        <select name="category" value={form.category} onChange={handleInputChange}>
          {categories.map((e, key) => <option key={key} value={e.name}>{e.name}</option>)}
        </select>
      </div>
      <input type="submit"
             className={styles.submitBtn}
             onClick={() => {
               dispatch(createArticle(form))
                 .then(res => res && history.push('/articles'))
             }} value='Submit'/>
    </div>
  )
}

export default Form
