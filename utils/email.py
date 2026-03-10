import smtplib
from email.message import EmailMessage
import mimetypes
import os

def send_email(sender_email, sender_password, to_email, subject, body, html_body=None, attachments=None):

    msg = EmailMessage()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Add plain text version
    msg.set_content(body)

    # Add HTML version if provided
    if html_body:
        msg.add_alternative(html_body, subtype='html')

    # Add attachments if any
    if attachments:
        for file_path in attachments:
            if os.path.exists(file_path):
                mime_type, _ = mimetypes.guess_type(file_path)
                mime_type, mime_subtype = mime_type.split('/')

                with open(file_path, 'rb') as f:
                    msg.add_attachment(
                        f.read(),
                        maintype=mime_type,
                        subtype=mime_subtype,
                        filename=os.path.basename(file_path)
                    )

    # SMTP Sending
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print("Email sent to:", to_email)
        return True
    except Exception as e:
        print("Email sending failed:", e)
        return False
