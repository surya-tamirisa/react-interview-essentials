import React, { useEffect, useState } from "react";

const notificationsFromBE = [
    {
        id: 1,
        status: 0,
        content: 'This is a test notification',
        timestamp: '13/11/24 9:52pm'
    },
    {
        id: 2,
        status: 0,
        content: 'This is a test notification',
        timestamp: '13/11/24 9:52pm'
    },
    {
        id: 3,
        status: 0,
        content: 'This is a test notification',
        timestamp: '13/11/24 9:52pm'
    },
    {
        id: 4,
        status: 0,
        content: 'This is a test notification',
        timestamp: '13/11/24 9:52pm'
    },
    {
        id: 5,
        status: 1,
        content: 'This is a test notification',
        timestamp: '13/11/24 9:52pm'
    }
];

const NotificationEntity = React.memo(({notificationEntity, markAsRead}) => {
    console.log(notificationEntity);
    return (
        <div className="notification-entity">
            <br></br>

            <div>{notificationEntity.timestamp}</div>
            <div>{notificationEntity.content}</div>
            {notificationEntity.status===0 && 
                <button onClick={() => markAsRead(notificationEntity.id)}>
                    Mark as Read
                </button>
            }
            <br></br>
            <br></br>
        </div>
    );
})

const EMOne = () => {
    let [notificationsData, setNotificationData] = useState(notificationsFromBE);
    let [filteredNotifications, setFilteredNotifications] = useState(notificationsFromBE);
    let [filterRead, setFilterRead] = useState(false);

    const markAsRead = (id) => {
        let curArr = [...notificationsData];
        curArr.map((i) => {
            if(i.id === id){
                i.status = 1;
            }
            return i;
        });
        setNotificationData(curArr)
    }

    useEffect(() => {
        console.log('filt: ', filteredNotifications);
        if(filterRead)
            setFilteredNotifications(notificationsData.filter((n) => n.status===0))
        else 
            setFilteredNotifications(notificationsData);
    }, [filterRead]);

    return (
        <div className="em-one-container">
            <button 
                onClick={() => setFilterRead((prev) => !prev)}>
                {filterRead ? 'Show All' : 'Show Unread'}
            </button>
            <div>
            {filteredNotifications.map((N) => {
                return (<NotificationEntity notificationEntity={N} markAsRead={() => markAsRead(N.id)}></NotificationEntity>);
            })}
            </div>
        </div>
    );
};

export default EMOne;