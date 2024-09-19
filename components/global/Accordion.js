import dlv from "dlv";

export default function Accordion({ acc, sarabun }) {

  const handleClick = (e) => {
    try {
      const target = e.currentTarget;
      const panel = target.nextElementSibling;
      const coursePanel = document.getElementsByClassName("acc_dtl");
      const accordionBlocks = document.getElementsByClassName("accordion_block");

      // Remove "active_block" class from all accordion blocks
      for (var i = 0; i < accordionBlocks.length; i++) {
        accordionBlocks[i].classList.remove("active_block");
      }

      // If panel is already open - minimize
      if (panel.style.maxHeight) {
        // Minifies current panel if already open
        panel.style.maxHeight = null;
        // Removes the 'active' class
        target.classList.remove("active_acc");
      } else { // Panel isn't open...
        // Goes through the buttons and removes the 'active' css
        const courseAccordionActive = document.getElementsByClassName("acc_title active_acc");
        for (var ii = 0; ii < courseAccordionActive.length; ii++) {
          courseAccordionActive[ii].classList.remove("active_acc");
        }
        // Goes through and removes 'active' from the css, also minifies any 'panels' that might be open
        for (var iii = 0; iii < coursePanel.length; iii++) {
          coursePanel[iii].style.maxHeight = null;
        }
        // Opens the specified panel
        panel.style.maxHeight = panel.scrollHeight + "px";
        // Adds the 'active' addition to the css.
        target.classList.add("active_acc");
        // Adds the 'active_block' class to the accordion_block div
        target.parentNode.classList.add("active_block");
      }
    } catch (Exception) {
      console.error(Exception);
    }
  };

  return (

    acc && <div className="accordion_wrapper">
      <ul className="accordion">
        {
          acc.faqs.map((faq, index) =>
            index < 6 &&
            <li className='accordion_list' key={faq.id}>
              <div className="accordion_block" key={faq.id}>
                <h3 className={`${sarabun} acc_title`} onClick={handleClick}><span>{dlv(faq, 'title')}</span></h3>
                <div className="acc_dtl">
                  {
                    faq.answers.map((items) => (
                      <p className="primary_text" key={items.id}>{items.answer}</p>
                    ))
                  }
                </div>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}
