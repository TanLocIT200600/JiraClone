import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag, Avatar, Popover, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../store/constants/CyberBug';
import ReactHtmlParser from 'html-react-parser';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { Popconfirm, message } from 'antd';


export default function ProjectManagement(props) {
  const dispatch = useDispatch();
  const projectList = useSelector(state => state.ProjectJiraClone.projectList)
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA
    })
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirection: ['descend'],
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      // sortDirection: ['descend'],
    },
    {
      title: 'categoryName',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'creator',
      key: 'categoryName',
      render: (text, record, index) => {
        return <Tag color="green">
          {record.creator?.name}
        </Tag>
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => {
        return <div>
          {record.members?.map((member, index) => {
            return <Avatar key={index} src={member.avatar} />
          })}

          {record.members?.length > 3 ? <Avatar>...</Avatar> : ' '}
          <Popover placement="topLeft" title={"Add User"} content={() => {
            return <AutoComplete style={{ width: "100%" }} onSearch={(value) => {
              console.log("value", value);
            }}></AutoComplete>
          }} trigger="click">
            <Button>+</Button>
          </Popover>
        </div>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <button className="btn btn-primary" onClick={() => {
            const action = {
              type: 'OPEN_FORM_EDIT_PROJECT',
              Component: <FormEditProject />
            }
            dispatch(action)
            // dispatch dữ liệu dòng hiện tại lên reducers
            const actionEditProject = {
              type: 'EDIT_PROJECT',
              projectEditModal: record,
            }
            dispatch(actionEditProject);

          }}><EditOutlined /></button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: 'DELETE_PROJECT_SAGA',
                idProject: record.id,
              })
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger"><DeleteOutlined /></button>
          </Popconfirm>

        </Space>
      )
    },
  ];


  return (
    <div className="container">
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table rowKey={'id'} columns={columns} dataSource={projectList} onChange={handleChange} />
    </div>
  )
}
