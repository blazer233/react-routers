import React from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import Reacts from './videos/Reacts'
import Flutter from './videos/Flutter'
import Vue from './videos/Vue'

function Videos () {
  return(
    <div>
      <div className="topNav">
        <ul>
          <li><Link to="/videos/reacts">React教程</Link></li>
          <li><Link to="/videos/flutter">Flutter教程</Link></li>
          <li><Link to="/videos/vue">Vue教程</Link></li>
        </ul>
      </div>
      <hr/>
      <div className="videoContent">
        <h3>视频教程</h3>
        <Switch>
          <Route exact path="/videos" component={Reacts}></Route>
          <Route path="/videos/reacts" component={Reacts}></Route>
          <Route path="/videos/flutter" component={Flutter}></Route>
          <Route path="/videos/vue" component={Vue}></Route>
          <Route component={() => <Redirect to="/videos" />}></Route>
        </Switch>
      </div>
    </div>
  )
}

export default Videos
