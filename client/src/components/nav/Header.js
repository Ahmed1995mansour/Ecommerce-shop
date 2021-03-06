import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, signOut } from '../../firebase';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: 'LOGOUT',
          payload: null,
        });
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode='horizontal'
      className='d-block'
    >
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>

      {!user && (
        <Item key='register' icon={<UserAddOutlined />} className='float-right'>
          <Link to='/register'>Register</Link>
        </Item>
      )}

      {!user && (
        <Item key='login' icon={<LoginOutlined />} className='float-right'>
          <Link to='/login'>Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key='SubMenu'
          icon={<UserOutlined />}
          title={user.email && user.email.split('@')[0]}
          className='float-right'
        >
          {user && user.role === 'subscriber' && (
            <Item key='setting:1'>
              <Link to='/user/history'>Dashboard</Link>
            </Item>
          )}

          {user && user.role === 'admin' && (
            <Item key='setting:1'>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
          )}

          <Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
