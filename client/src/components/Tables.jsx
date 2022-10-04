// import React, { useEffect } from 'react';
// import style from "./style/Tables.module.css";
// import { getTable } from '../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import mesa from '../assets/table/mesa.jpg'
// const Tables = () => {
//     const dispatch = useDispatch()
    
//     useEffect(() => {
//         dispatch(getTable())
//     }, [dispatch])
//     const tables = useSelector((state) => state.tables)
//     //console.log(tables)
//     return (
//         <div className={style.container}>
//              <div className="mt-11 flex min-h-full items-stretch justify-center text-left md:items-center md:px-2 lg:px-4">
//              {tables.map((el) => {
//                 return (
//                     <div className="w-full lg:w-4/12 px-4 mx-auto pt-6" key={el.id}>
//                         <h3 className='num_Table'>Table number {el.num_Table}</h3>
//                         <img src={mesa} alt="image table" />
//                         <h4 className='state'>{el.state}</h4>
//                         <h5 className='chairs'>Chairs number {el.chairs}</h5>
//                     </div>
//                 )
//             })}
//              </div>
           
//         </div>
//     )
// }

// export default Tables;