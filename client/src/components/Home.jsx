import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from "./style/Tables.module.css";

const Home = () => {
    const [tables, setTables] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/tables`).then(r => {
            setTables(r.data);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={style.container}>
            Home
            {/*tables*/}
        </div>
    )
}

export default Home;