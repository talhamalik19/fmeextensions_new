import React from 'react'

export default function ProdComboBadge({discount}) {
  return (
    discount && <div className="combo_badge">{discount}</div>
  )
}
