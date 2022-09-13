import React from 'react';
import axios from 'axios';
import style from "./style/Profile.module.css";

const Profile = () => {
    // traer datos de user
    // traer datos de bill
    return (
        <div className={style.container}>
            <div>
                <img src="" alt="Image Not Found" />
                <h2></h2>
            </div>
            <div>
                <h1>Perfil</h1>
                <h3>NOMBRE COMPLETO: </h3>
                <h3>EMAIL: </h3>
            </div>
            <div>
                <h3>HISTORIAL DE COMIDAS: </h3>
                <ul>
                    <li>Hamburguesa completa $900</li> 
                        <button>Feedback</button>
                    <li>Milanesa a la napolitana con fritas $1400</li> 
                        <button>Feedback</button>
                </ul>
            </div>
            <div>
                <button>Config.</button>
            </div>
        </div>
    )
}

export default Profile;