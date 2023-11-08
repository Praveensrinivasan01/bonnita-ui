import  { useEffect, useState } from 'react'

const useDebounce = (value,delay=500) => {
    const [debounceValue, setDebounceValue ]= useState()
    useEffect(()=>{
        const id = setTimeout(()=>{
            console.log(value,"setTimeout")
            setDebounceValue(value)
        },delay)

        return()=>{
            console.log(value,"ClearTimeout")
            clearTimeout(id)
        }

    },[value,delay])
  return debounceValue
}

export default useDebounce