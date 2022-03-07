from django.conf import settings
from django.core.mail import BadHeaderError, send_mail
from twilio.rest import Client
import threading


class SMSThread(threading.Thread):

    def __init__(self, phone_numbers, message):
        self.phone_numbers = phone_numbers
        self.message = message
        threading.Thread.__init__(self)
        self._return = None

    def run(self):
        client = Client(settings.TWILIO_ACCOUNT_SID,
                        settings.TWILIO_AUTH_TOKEN)
        try:
            for recipient in self.phone_numbers:
                if recipient:
                    client.messages.create(to=recipient,
                                           from_=settings.TWILIO_NUMBER,
                                           body=self.message)
            self._return = {"success": "SMS send"}
        except Exception as e:
            self._return = {"error": "Phone Number does not exists"}

    def join(self):
        threading.Thread.join(self)
        return self._return


class ReminderSMSThread(threading.Thread):

    def __init__(self, phone_number, message):
        self.phone_number = phone_number
        self.message = message
        # self.dependent_name = dependent_name
        # self.scheduled_date = scheduled_date
        # self.scheduled_time = scheduled_time
        threading.Thread.__init__(self)
        self._return = None

    def run(self):
        # message = "Reminder !! Vaccination of your child " + self.dependent_name + \
        #     " is scheduled on "+str(self.scheduled_date) + \
        #     " at "+str(self.scheduled_time)
        print("message:", self.message)
        client = Client(settings.TWILIO_ACCOUNT_SID,
                        settings.TWILIO_AUTH_TOKEN)
        try:
            # client.messages.create(to=self.phone_number,
            #                        from_=settings.TWILIO_NUMBER,
            #                        body=self.message)
            self._return = {"success": "SMS send"}
        except Exception as e:
            # self._return = {"error": "Phone Number does not exists"}
            print("ex:", e)

    def join(self):
        threading.Thread.join(self)
        return self._return


class MailThread(threading.Thread):

    def __init__(self, subject, message, recipient_list):
        self.subject = subject
        self.message = message
        self.recipient_list = recipient_list
        threading.Thread.__init__(self)
        self._return = None

    def run(self):
        from_email = settings.EMAIL_HOST_USER
        try:
            send_mail(self.subject, self.message,
                      from_email, self.recipient_list)
            self._return = {'success': 'Mail Send!'}
        except BadHeaderError:
            self._return = {'error': 'Invalid header found.'}

    def join(self):
        threading.Thread.join(self)
        return self._return


def otp_sms(phone, OTP):
    print("phone otp : ", phone, OTP)
    try:
        message_to_broadcast = ("Your VacTrack OTP is : " + OTP)
        client = Client(settings.TWILIO_ACCOUNT_SID,
                        settings.TWILIO_AUTH_TOKEN)
        # client.messages.create(to=phone,
        #                        from_=settings.TWILIO_NUMBER,
        #                        body=message_to_broadcast)
        # return "OTP sent!"
        return {"success": "OTP sent!"}
    except Exception as e:
        print("e : ", e)
        # return "Phone Number does not exists"
        return {"error": "Phone Number does not exists"}
