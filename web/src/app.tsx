import React, {useEffect} from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import './app.scss'
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getUser} from "./modules/user/user-slice";
import {Article, Form as ArticleForm, List} from './modules/article'
import {User} from './modules/user'
import {Login, SignUp} from './modules/auth-forms'
import {Header} from './layout'



export default function App() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const {userLogged} = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const ArticleRoutes = () => {
    let {path} = useRouteMatch();
    return (
      <Switch>
        <Route exact path={path} component={List}/>
        {userLogged ? <Route path={`${path}/create`} component={ArticleForm}/> : <Redirect to={'/login'}/>}
        <Route path={`${path}/:id`} component={Article}/>
      </Switch>
    )
  }

  return (
    <Router history={history}>
      <div className='container'>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Redirect to='articles'/>
          </Route>
          <Route path="/articles">
            <ArticleRoutes/>
          </Route>
          <Route path="/user" component={User}/>
          {!userLogged ?
            <>
              <Route path='/login' component={Login}/>
              <Route path='/sign-up' component={SignUp}/>
            </> : <Redirect to={'/articles'}/>}
        </Switch>
      </div>
    </Router>
  );
}


