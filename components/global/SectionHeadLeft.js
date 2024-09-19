
export default function SectionHeadLeft({title, desc}) {
  return (
    
    <div className="section_head left_align">
        <h2 className="primary_title">{title}</h2>
        {desc && <p className="primary_text">{desc}</p>}
    </div>
  )
}
