import React from 'react'
import format from '@/lib/format'

interface PriceTagProps{
    price: number,
    className?:string
}

const PriceTag = ({price, className} : PriceTagProps) => {
  return (
    <span className={`badge badge-neutral ${className}`}>{format(price)}</span>
  )
}

export default PriceTag