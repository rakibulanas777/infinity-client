import React, { useState } from 'react'
import { useUserContext } from '../../context/userContext';

const Notification = () => {
    const { user, setUser } = useUserContext();


    return (
        <div>
            <div className="container px-10 py-8 pt-[30vh] mx-auto">
                <h1>Notification</h1>
                {
                    user?.user.notifications.map(n => <h1>{n.message}</h1>)
                }

            </div>
        </div>
    )
}

export default Notification