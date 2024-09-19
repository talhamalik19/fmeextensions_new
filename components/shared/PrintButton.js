import { useRef } from 'react';

const PrintButton = () => {
  const contentRef = useRef(null);

  const handlePrint = () => {
    const contentToPrint = contentRef.current;

    if (contentToPrint) {
      // Open a new window and write the content to it
      const printWindow = window.open('', '_blank');
      printWindow.document.write(contentToPrint.innerHTML);
      printWindow.document.close();

      // Trigger the print dialog
      printWindow.print();
    }
  };

  return (
    <div>
      <div ref={contentRef}>
        {/* Your content goes here */}
        <p>This is the content you want to print.</p>
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default PrintButton;
