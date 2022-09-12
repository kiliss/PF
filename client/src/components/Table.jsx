import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from "./style/Table.module.css";

const Table = () => {
    const { id } = useParams();
    const [table, setTable] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/tables/${id}`).then(r => {
            setTable(r.data);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={style.container}>
            Table
            {/*table*/}
        </div>
    )
}

export default Table;