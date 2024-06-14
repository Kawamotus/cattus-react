import React from 'react';
import { Container } from 'react-bootstrap';
import { getData } from '../Functions/Req';

const Activities = () => {

    const [activities, setActivities] = React.useState([]);


    React.useEffect(() => { //criar uma função async fora pra puxar os dados async :DDDDD
        setActivities(getData("/activity/charts/average-animal-activity/all", ""));
        
    }, [])

    console.log(activities);

    return (
        <Container>

        </Container>
    )
}

export default Activities
