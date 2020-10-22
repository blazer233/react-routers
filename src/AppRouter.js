import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import Index from './pages/Index'
import List from './pages/List'
import Home from './pages/Home'

// 无状态组件
// function Index () {
//   return <h3>page-Index</h3>
// }

// function List () {
//   return <h3>page-List</h3>
// }

/**
 * exact 精确匹配
 * 
 * Redirect 重定向
 */
function AppRouter () {
  return (
    <Router>
      <ul>
        <li>
          <Link to='/index'>首页</Link>
          <Link to='/list'>列表</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/index' component={Index}/>
        <Route exact path='/list/:id' component={List}/>
        <Route exact path='/home' component={Home}/>
        {/* 不匹配则重定向 */}
        <Route component={() => <Redirect to='/index' />} />
      </Switch>
    </Router>
  )
}

export default AppRouter
