import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import style from "./style/Menu.module.css";

const Menu = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/menu/${id}`).then(r => {
            setMenu(r.data);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div className={style.container}>
            Menu
            {/*menu*/}
        </div>
    )
}

export default Menu;