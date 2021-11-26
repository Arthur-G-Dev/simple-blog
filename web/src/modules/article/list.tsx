import React, {ChangeEvent, useEffect} from 'react'
import styles from './styles.module.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useHistory} from "react-router-dom";
import {getArticlesList} from './article-slice';

const List = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(getArticlesList())
  }, [dispatch])

  const search = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    dispatch(getArticlesList({[target.name]: target.value}))
  }

  const {list} = useAppSelector(state => state.article)

  return (
    <div className={styles.listContainer}>
      <div className={styles.header}>
        <h3>Articles</h3>
        <div className={styles.actions}>
          <input className={`input-main ${styles.input}`}
                 onChange={search}
                 name='query' type="text" placeholder='Search'/>
          <select name='order' onChange={search}>
            <option value="ASC">Oldest</option>
            <option value="DESC">Newest</option>
          </select>
          <button onClick={() => history.push('articles/create')}>Create</button>
        </div>
      </div>
      <div className={styles.list}>
        {list.map((el, i) =>
          <article key={i} onClick={() => history.push(`/articles/${el.id}`)} className={styles.item}>
            <h4 className={styles.title}>{el.title}</h4>
            <p className="text">{el.text}</p>
            <div className={styles.footer}>
              <p>Creator: {el.author}</p>
              <p>Created Date: {new Date(el.created_at).toLocaleDateString()}</p>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}

export default List
