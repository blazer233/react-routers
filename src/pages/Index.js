import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Index extends Component {
  constructor (props) {
    super(props)
    console.log(props)

    this.state = {
      list: [
        { cid: 1, ctitle: '文章标题1' },
        { cid: 2, ctitle: '文章标题2' },
        { cid: 3, ctitle: '文章标题3' }
      ]
    }
  }

  render() {
    return (
      <div>
        <h3>page-Index</h3>
        <ul>
          {
            this.state.list.map((item) => {
              return (
                <li key={item.cid}>
                  <Link to={'list/' + item.cid}>{item.ctitle}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
