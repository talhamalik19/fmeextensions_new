import { sendMail } from "../../service/mailService";

const rfqhandler = async (req, res) => {

  if (req.method === "POST") {
    try {
      const { yourName, companyName, email, phone, moduleName, date, budgetStatus, uploadFile, message } = req.body;

      const subject = "FME - Request a Quote Form Submission";
      const toEmail = `${email}`;
      const emailText = `
      <!DOCTYPE html>
<html>

<head>
    <title>FME - Request a Quote Form Submission</title>
</head>

<body>
    <table style="max-width:800px; width:100%; margin:auto; border-collapse: collapse; background-color:#FAF9F9;">
        <tbody>
            <tr>
                <td style="background-color:#FAF9F9; padding:40px 30px;">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td style="padding:10px 10px; text-align: center;">
                                    <img src="https://datam2.fmeextensions.com/media/.thumbswysiwyg/logo.png?rand=1698062843"
                                        alt="logo">
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="font-size: 16px; font-weight: 700; line-height: 24px; padding:10px 10px; text-align: center;">
                                    FME - Request a Quote Form Submission</td>
                            </tr>
                            <tr>
                                <td>
                                    <table style="width:100%; border-collapse: collapse;">
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Name:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${yourName}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Company Name:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${companyName}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Email:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${email}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Phone Number:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${phone}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Module Name:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${moduleName}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Date:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${date}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Budget Status:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${budgetStatus}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Uploaded File:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${uploadFile}</td>
                                        </tr>
                                        <tr style="border:1px solid #D3D3D3;">
                                            <td
                                                style="font-size: 16px; font-weight: 600; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                Message:</td>
                                            <td
                                                style="font-size: 16px; font-weight: 400; line-height: 24px; padding:10px 10px; border:1px solid #D3D3D3">
                                                ${message}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="font-size: 14px; font-weight: 400; line-height: 24px; padding:20px 10px; text-align: center;">
                                    Thank you for contacting us. We've received your message and will get back to you
                                    soon.</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
        `;
      const thankMsg = "Thank you for contacting us. We've received your message and will get back to you soon."

      try {
        await sendMail(subject, toEmail, emailText);
        res.status(200).json({ message: "Form submitted successfully" });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default rfqhandler;