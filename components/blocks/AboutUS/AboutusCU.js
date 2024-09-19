
import dlv from "dlv";
import Link from "next/link";
export default function AboutusCU({ contactusblock, sarabun }) {
  const Line42 = "images/Line42.png";
  return (
    <div className="section_padding ">
      <div className="main_container ">
        {/* {contactusblock.map((items) => ( */}
          <div className=" aboutus_CU">
            <div className="head_section">
              <p className="primary_text">{dlv(contactusblock,'title')}</p>
              <h2 className={`${sarabun} primary_title`}>{dlv(contactusblock,'heading')}</h2>
            </div>
            <div className="aboutus_chat">
              {dlv(contactusblock,'links').map((descitems, index) => (
                <div className="contact_info" key={index}>
                  <p className="primary_text">{dlv(contactusblock,`descriptions.${index}.field_text`)}</p>
                  {descitems && (
                    <Link href={`${dlv(descitems,'field_redirect')}`}>
                      {dlv(descitems,'field_text')}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
}
