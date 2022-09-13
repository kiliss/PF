import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getMenus } from "../redux/actions";

export const Prueba = () => {
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getMenus())
    },[])
    return (
        <div>Pruebita</div>
    )
}