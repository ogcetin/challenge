import React, { useState, useEffect } from 'react';
import Request from '../../helpers/Request';

const Activity = (props) => {
    const [activityList, setActivityList] = useState([]);

    useEffect(() => {
        getActivityList();
    }, [props]);

    const getActivityList = async () => {
        const response = await Request.Get("activities/"+props.data_id);
        setActivityList(response);
    }

    return <div>Activity Component</div>
};

export default Activity;