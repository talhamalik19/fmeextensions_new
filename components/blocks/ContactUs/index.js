
import ContactForn from './ContactForn'
import ContactInfo from './ContactInfo'

export default function ContactUs({ cards, button, success_message, sarabun }) {
  return (
    <div className="section_padding zero_top">
        <div className="main_container">
            <div className="contact_pg">
                <div className="contact_block">
                    <ContactForn button={button} success_message={success_message}/>
                </div>
                <div className="contact_block">
                    <ContactInfo contactInfo={cards} sarabun={sarabun}/>
                </div>
            </div>
        </div>
    </div>
  )
}
