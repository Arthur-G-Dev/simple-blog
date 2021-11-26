import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getArticle} from "./article-slice";
import styles from './styles.module.scss'
import {Comment} from '../comment'
import {createComment, getComments} from '../comment/comments-slice';

const Article = () => {
  const dispatch = useAppDispatch()
  const {article} = useAppSelector(state => state.article)
  const {list} = useAppSelector(state => state.comments)
  const {userLogged} = useAppSelector(state => state.user)
  const {id}: any = useParams();
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    dispatch(getArticle(id))
    dispatch(getComments(id))
  }, [dispatch, id])

  const submit = () => {
    if(comment) {
      dispatch(createComment(comment))
      setComment('')
    }
  }

  return (
    <div className={`content-center`}>
      <article className={styles.articleContainer}>
        <h2>{article.title}</h2>
        <h3>Category: {article.category}</h3>
        <h4>Created By: {article.author}</h4>
        <h5>Date: {new Date(article.created_at).toLocaleDateString()}</h5>
        <p className="text">{article.text}</p>
      </article>
      {list.length > 0 &&
      <div className={`${styles.commentsWrapper}`}>
        {list.map((el, i) => <Comment key={i} text={el.text}/>)}
      </div>}
      {userLogged &&
      <div className={`${styles.commentInputWrapper}`}>
        <input type='text'
               className='input-main'
               onChange={(e) => setComment(e.target.value)}
               onKeyUp={(e) => {
                 if(e.keyCode === 13) submit()
               }}
               placeholder='Add Comment' value={comment}/>
        <button className='ml-10' onClick={submit}>Add Comment</button>
      </div>}
    </div>
  )
}

export default Article
