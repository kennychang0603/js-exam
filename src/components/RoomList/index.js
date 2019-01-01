import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';
import style from './RoomList.module.scss';

const RoomList = ({ rooms, isLoading }) => (
  <List
    itemLayout="horizontal"
    dataSource={rooms}
    loading={isLoading}
    renderItem={room => (
      <Link
        to={{
          pathname: `/admin/dispatch/${room.id}`,
        }}
      >
        <List.Item
          style={{ borderBottom: '1px solid #ddd' }}
          className={style.listItem}
        >
          <List.Item.Meta
            avatar={<Avatar icon="home" className={style.avatar} />}
            title={<p>Room: {room.description}</p>}
            description={room.status}
          />
        </List.Item>
      </Link>
    )}
  />
);

RoomList.propTypes = {
  rooms: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default RoomList;