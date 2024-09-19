import dlv from "dlv";
import Script from "next/script";

const AnswerSchema = ({ faqs }) => {
  let mainEntity = [];
  try {
    mainEntity = faqs && faqs
      .filter(faq => faq.status !== 0)
      .map((faq) => {
        const question = {
          "@type": "Question",
          "name": dlv(faq, 'faq_title') || dlv(faq, 'title')
        };

        const answerText = dlv(faq, 'answers.0.answer');
        if (answerText) {
          question.acceptedAnswer = {
            "@type": "Answer",
            "text": answerText
          };
        }

        return question;
      });
  } catch (e) {}

  return (
    mainEntity.length > 0 && <Script type="application/ld+json" id="answer-schema">
      {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ${JSON.stringify(mainEntity, null, 2)}
        }
      `}
    </Script>
  );
};

export default AnswerSchema;
