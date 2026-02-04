'use client'

import useCD from "."

export default function (){
    const value = useCD()
    return <div>timestamp: {value}</div>
}