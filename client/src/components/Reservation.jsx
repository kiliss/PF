import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from "./style/Reservation.module.css";

const Reservations = () => {
    const [tables, setTables] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/tables`).then(r => {
            setTables(r.data);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={style.container}>
            Reservations
            {/*tables*/}
        </div>
    )
}

export default Reservations;