import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setInfoTrip } from '../actions';

function Passengers() {
    const [isPessengersBoxOpen , setIsPessengersBoxOpen] = useState(false);
    const dispatch = useDispatch();
    const  infoTrip = useSelector((state)=>state.infoTrip.infoTrip);
    const { nbrAdults,nbrChildren,nbrInfants } = infoTrip;
    function togglePassengersDropDown(e) {
        e.stopPropagation();
        setIsPessengersBoxOpen(!isPessengersBoxOpen);
    }
    function handleNumberOfPassenger(element,val) {
        dispatch(setInfoTrip({[element] : val}))
    }
    useEffect(()=>{
        const closeOutsideDropDownBox = () => {
            setIsPessengersBoxOpen(false)
          };
      
          document.addEventListener('click', closeOutsideDropDownBox);
          return () => document.removeEventListener('click', closeOutsideDropDownBox);
    },[isPessengersBoxOpen])
  return (
    <div className="passengers-box w-full sm:w-80 relative">
        <div onClick={(e)=>togglePassengersDropDown(e)} className='border w-full px-5 py-3 text-lg bg-white text-gray-600 cursor-pointer' style={isPessengersBoxOpen?{borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}:{borderRadius:'10px'}}>
            {`${nbrAdults} ${nbrAdults>1 ?"Adults":"Adult"}, ${nbrChildren} ${nbrChildren>1 ?"Childs":"Child"} , ${nbrInfants} ${nbrInfants>1 ?"Infants":"Infant"}`}
            </div>
        {isPessengersBoxOpen &&
        <div className="drop-down-select space-y-3 px-5 py-3 text-lg border rounded-b absolute z-10 w-full bg-white">
            <div className='flex justify-between items-center'>
                <div>adults</div>
                <div className='flex border rounded-lg w-fit'>
                    <div onClick={(event)=>{nbrAdults > 1  && handleNumberOfPassenger('nbrAdults',nbrAdults - 1);event.stopPropagation()}} className='minus w-11 flex justify-center items-center cursor-pointer'>-</div>
                    <input type="number" value={nbrAdults} readOnly className='w-20 h-10 text-center border-l border-r outline-none focus:border focus:border-sky-400' min={0} max={5}/>
                    <div onClick={(event)=>{nbrAdults < 5  && handleNumberOfPassenger('nbrAdults',nbrAdults + 1);;event.stopPropagation()}} className='plus w-11  flex justify-center items-center cursor-pointer'>+</div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div>child</div>
                <div className='flex border rounded-lg w-fit'>
                    <div onClick={(event)=>{nbrChildren > 0  && handleNumberOfPassenger('nbrChildren',nbrChildren - 1);event.stopPropagation()}} className='minus w-11 flex justify-center items-center cursor-pointer'>-</div>
                    <input type="number" value={nbrChildren} readOnly className='w-20 h-10 text-center border-l border-r outline-none focus:border focus:border-sky-400' min={0} max={5}/>
                    <div onClick={(event)=>{nbrChildren < 5  && handleNumberOfPassenger('nbrChildren',nbrChildren + 1);event.stopPropagation()}} className='plus w-11  flex justify-center items-center cursor-pointer'>+</div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div>infants</div>
                <div className='flex border rounded-lg w-fit'>
                    <div onClick={(event)=>{nbrInfants > 0  && handleNumberOfPassenger('nbrInfants', nbrInfants - 1);event.stopPropagation()}} className='minus w-11 flex justify-center items-center cursor-pointer'>-</div>
                    <input type="number" value={nbrInfants} readOnly className='w-20 h-10 text-center border-l border-r outline-none focus:border focus:border-sky-400' min={0} max={5}/>
                    <div onClick={(event)=>{nbrInfants < 5  && handleNumberOfPassenger('nbrInfants', nbrInfants + 1);event.stopPropagation()}} className='plus w-11  flex justify-center items-center cursor-pointer'>+</div>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Passengers;