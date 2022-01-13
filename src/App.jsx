/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/7 下午12:00:45
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/7 下午12:00:45
  @Github: https://tcly861204.github.io
*/
import React, { Component } from 'react'
import BigData from './bigData/index'
import { Spin } from 'antd'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      columns: [
        {
          type: 'selection',
          align: 'center',
          fixed: 'left',
          width: 50,
        },
        {
          label: '序号',
          type: 'index',
          fixed: 'left',
          headerAlign: 'center',
          align: 'center',
          width: 60,
        },
        {
          label: '标题',
          prop: 'title',
          fixed: 'left',
          width: 180,
          resizable: true,
        },
        {
          label: '姓名',
          prop: 'name',
          width: 120,
          resizable: true,
        },
        {
          label: '地区',
          prop: 'region',
          width: 100,
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 150,
          resizable: true,
        },
        {
          label: '姓别',
          prop: 'sex',
          width: 140,
          resizable: true,
        },
        {
          label: '操作',
          headerAlign: 'center',
          type: 'delete',
          width: 56,
          resizable: false,
          fixed: 'right',
          component: (props) => {
            // eslint-disable-next-line react/prop-types
            const { index, callback } = props
            return (
              <div
                onClick={() => {
                  callback && typeof callback === 'function' && callback(index)
                }}
                style={{
                  textAlign: 'center',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#409eff',
                }}
              >
                删除
              </div>
            )
          },
        },
      ],
      data: [],
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })
    fetch(`./public/data.json`)
      .then((response) => response.json())
      .then((res) => {
        if (res.msg === 'OK') {
          this.setState({
            loading: false,
            data: res.data.list,
          })
        }
      })
  }

  render() {
    const { loading, columns, data } = this.state
    return (
      <section
        style={{
          padding: '50px',
        }}
      >
        <Spin spinning={loading}>
          <BigData
            columns={columns}
            data={data}
            deleteCallback={(index) => {
              data.splice(index, 1)
              this.setState({
                data: data,
              })
            }}
            handleSelected={(target) => {
              this.setState({
                data: data.map((item) => {
                  item._checked = target
                  return item
                }),
              })
            }}
          />
        </Spin>
      </section>
    )
  }
}
export default App
