import pyotp
import graphene
import base64
import graphql_jwt
from datetime import datetime
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_auth import mutations
from api.user.models import Doctor, Parent
from api.user.services import otp_sms, SMSThread, MailThread
from graphql_auth.schema import UserQuery, MeQuery
from graphene.types.generic import GenericScalar
from api.user.constants import *


class ParentType(DjangoObjectType):
    class Meta:
        model = Parent


class DoctorType(DjangoObjectType):
    class Meta:
        model = Doctor


class generateKey:
    @staticmethod
    def returnValue(phone):
        return str(phone) + str(datetime.date(datetime.now())) + "Some Random Secret Key"


class Query(graphene.ObjectType):
    # generate_otp = graphene.String(required=True, phone=graphene.String())
    generate_otp = graphene.JSONString(required=True, phone=graphene.String())
    parent_by_doctor_count = graphene.Int(
        required=True, doctor_id=graphene.Int())
    parent_by_doctor_pages = graphene.List(
        ParentType,
        doctor_id=graphene.Int(),
        data_per_page=graphene.Int(),
        skip=graphene.Int(),
    )
    

    def resolve_generate_otp(root, info, phone):
        keygen = generateKey()
        key = base64.b32encode(keygen.returnValue(
            phone).encode())  # Key is generated
        # TOTP Model for OTP is created
        TOTP = pyotp.TOTP(key, digits=6, interval=600)
        OTP = TOTP.now()
        # Using Multi-Threading send the OTP Using Messaging Services like Twilio or Fast2sms
        response = otp_sms(phone, OTP)
        return response  # Just for demonstration

    def resolve_parent_by_doctor_count(root, info, doctor_id):
        doctor = Doctor.objects.get(id=doctor_id)
        parent_length = len(Parent.objects.filter(doctor_id=doctor))
        return parent_length

    def resolve_parent_by_doctor_pages(self, info, doctor_id, data_per_page=None, skip=None, **kwargs):
        doctor = Doctor.objects.get(id=doctor_id)
        order = ['-is_notify', 'first_name']
        parent = Parent.objects.filter(
            doctor_id=doctor.id).order_by(*order)

        if skip:
            parent = parent[skip:]

        if data_per_page:
            parent = parent[:data_per_page]

        return parent


class VerifyOtpMutation(graphene.Mutation):

    message = graphene.JSONString(required=True)

    class Arguments:
        phone = graphene.String(required=True)
        otp = graphene.String(required=True)
        role_id = graphene.Int(required=True)

    def mutate(self, info, phone, otp, role_id):
        try:
            keygen = generateKey()
            key = base64.b32encode(keygen.returnValue(
                phone).encode())  # Generating Key
            TOTP = pyotp.TOTP(key, digits=6, interval=600)  # TOTP Model
            if TOTP.verify(otp):
                print("otp verified")  # Verifying the OTP
                if role_id == Role["DOCTOR"]:
                    print("create doctor")
                    doctor, _ = Doctor.objects.get_or_create(
                        mobile=phone,
                    )
                    return VerifyOtpMutation(message={"success": "Otp verified", "role_id": role_id, "id": doctor.id, "first_name": doctor.first_name, "email": doctor.email})
                else:
                    parent = Parent.objects.get(
                        mobile=phone,
                    )
                    return VerifyOtpMutation(message={"success": "Otp verified", "role_id": role_id, "id": parent.id, "first_name": parent.first_name, "email": parent.email})
            print("otp wrong")
            return VerifyOtpMutation(message={"error": "OTP is wrong"})
        except Exception as exception:
            print("error:", exception)


class CreateParentMutation(graphene.Mutation):
    parent = graphene.Field(ParentType)

    class Arguments:
        doctor_id = graphene.Int(required=True)
        role_id = graphene.Int(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        phone = graphene.String(required=True)
        email = graphene.String(required=True)
        is_notify = graphene.Boolean(required=True)

    def mutate(self, info, doctor_id, role_id, first_name, last_name, phone, email, is_notify=False):
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            if role_id == Role["PARENT"]:
                parent = Parent(
                    doctor_id=doctor,
                    first_name=first_name,
                    last_name=last_name,
                    mobile=phone,
                    email=email,
                    is_notify=is_notify
                )
                parent.save()
            return CreateParentMutation(parent=parent)
        except Exception as e:
            pass


class UpdateParentMutation(graphene.Mutation):
    parent = graphene.Field(ParentType)

    class Arguments:
        id = graphene.Int()
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()
        email = graphene.String()

    def mutate(self, info, id, first_name, last_name, phone, email):
        try:
            parent = Parent.objects.get(id=id)

            parent.save()
            return UpdateParentMutation(parent=parent)
        except Exception as e:
            pass


class DeleteParentMutation(graphene.Mutation):
    parent_id = graphene.Int(required=True)

    class Arguments:
        id = graphene.Int(required=True)

    def mutate(self, info, id):
        parent = Parent.objects.get(id=id)
        if parent is not None:
            parent.delete()
        # parent.save()
        return DeleteParentMutation(parent_id=id)


class CreateUpdateDoctorProfile(graphene.Mutation):
    doctor = graphene.Field(DoctorType)

    class Arguments:
        id = graphene.Int()
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()
        email = graphene.String()

    def mutate(self, info, id, first_name, last_name, email, phone=None):
        try:
            doctor = Doctor.objects.get(id=id)
            doctor.first_name = first_name if first_name is not None else doctor.first_name
            doctor.last_name = last_name if last_name is not None else doctor.last_name
            doctor.mobile = phone if phone is not None else doctor.mobile
            doctor.email = email if email is not None else doctor.email

            doctor.save()
            return CreateUpdateDoctorProfile(doctor=doctor)
        except Exception as e:
            pass


class SendSMS(graphene.Mutation):
    message = graphene.JSONString()

    class Arguments:
        phone_numbers = graphene.List(graphene.String, required=True)
        message = graphene.String(required=True)

    def mutate(self, info, phone_numbers, message):
        thread = SMSThread(phone_numbers, message)
        thread.start()
        return SendSMS(message=thread.join())


class SendMail(graphene.Mutation):
    message = graphene.JSONString()

    class Arguments:
        subject = graphene.String(required=True)
        message = graphene.String(required=True)
        recipient_list = graphene.List(graphene.String, required=True)

    def mutate(self, info, subject, message,  recipient_list):
        thread = MailThread(subject, message, recipient_list)
        thread.start()
        return SendMail(message=thread.join())


class Mutation(graphene.ObjectType):
    verify_otp = VerifyOtpMutation.Field()
    create_parent = CreateParentMutation.Field()
    delete_parent = DeleteParentMutation.Field()
    create_update_doctor_profile = CreateUpdateDoctorProfile.Field()
    send_sms = SendSMS.Field()
    send_mail = SendMail.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
