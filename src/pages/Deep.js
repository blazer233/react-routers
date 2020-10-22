import React, { Component } from 'react'

export default class Deep extends Component {
  render() {
    return (
      <div>
        Deep-我是首页
        <pre>
          Swicth
          渲染第一个被location匹配到的并且作为子元素的 Route 或者 Redirect
          <br/>
          exact是Route下的一个属性,react路由会匹配到所有能匹配到的路由组件,exact能够使得路由的匹配更严格一些
          <br/>
          lazy, Suspense 组合使用实现 懒加载组件
        </pre>
      </div>
    )
  }
}
