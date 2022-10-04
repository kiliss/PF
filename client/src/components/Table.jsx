// import React from 'react';
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getTable,getTableDetail } from '../redux/actions';
// import { useEffect } from 'react';

// export default function Table(){
//     const {id}=useParams()
//     navigate=useNavigate()
//     const dispatch = useDispatch();
//     let details = useSelector((state)=>state.details)
//     useEffect(()=>{
//       dispatch(getTableDetail(id))  
//     },[dispatch,id])
//    //console.log(details)
//     return (
//         <div >
//             <div>
//                 <div className='details'>
//                 <h3 className='numTable'>{details.num_Table}</h3>
//                 <img src="" alt="mesa" />
//                 <h5 className='state'>{details.state}</h5>
//                 <p className='chairs'>{details.chairs}</p>
//                 </div>          
                
//             </div>
//         </div>
//     )
// }