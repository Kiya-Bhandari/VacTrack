import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from datetime import datetime, date
from api.vaccine_schedule.models import VaccineSchedule, VaccineStatus
from api.vaccine_schedule.serializers import VaccineScheduleSerializer
from api.dependent.models import Dependent
from api.vaccine.models import Vaccine
from api.vaccine.category.models import Category
from api.user.models import Parent
from api.user.services import ReminderSMSThread


class VaccineStatusType(DjangoObjectType):
    class Meta:
        model = VaccineStatus
        fields = ('id', 'status')


class VaccineScheduleType(DjangoObjectType):
    class Meta:
        model = VaccineSchedule
        fields = ('id', 'vaccine_id', 'beneficiary_id', 'status_id', 'dose_number',
                  'dose_datetime', 'category')


class Query(graphene.ObjectType):
    all_vaccine_schedule = graphene.List(VaccineScheduleType)
    vaccine_schedule_by_id = graphene.Field(
        VaccineScheduleType, id=graphene.String(required=True))
    all_vaccine_status = graphene.List(VaccineStatusType)

    def resolve_all_vaccine_schedule(root, info):
        return VaccineSchedule.objects.all()

    def resolve_vaccine_schedule_by_id(root, info, id):
        try:
            return VaccineSchedule.objects.get(id=id)
        except VaccineSchedule.DoesNotExist:
            return None

    def resolve_all_vaccine_status(root, info):
        return VaccineStatus.objects.all()


class CreateVaccineScheduleMutation(graphene.Mutation):
    vaccine_schedule = graphene.Field(VaccineScheduleType)

    class Arguments:
        vaccine_id = graphene.Int(required=True)
        beneficiary_id = graphene.Int(required=True)
        status_id = graphene.Int(required=True)
        dose_number = graphene.Int(required=True)
        category = graphene.Int(required=True)
        dose_datetime = graphene.String(required=True)

    def mutate(cls, self, vaccine_id, beneficiary_id, status_id, dose_number, category, dose_datetime):
        vaccine = Vaccine.objects.get(id=vaccine_id)
        beneficiary = Dependent.objects.get(id=beneficiary_id)
        status = VaccineStatus.objects.get(id=status_id)
        parent = Parent.objects.get(id=beneficiary.parent_id.id)
        category = Category.objects.get(id=category)
        vaccine_schedule = VaccineSchedule(
            vaccine_id=vaccine, beneficiary_id=beneficiary, status_id=status,  dose_number=dose_number,
            category=category, dose_datetime=dose_datetime)

        vaccine_schedule.save()
        scheduled_datetime = vaccine_schedule.dose_datetime.replace(
            'T', ' ').replace('Z', '')
        print("dose datetime scheduled datetime:",
              vaccine_schedule.dose_datetime, scheduled_datetime)
        scheduled_date = datetime.fromisoformat(scheduled_datetime).date()
        scheduled_time = datetime.fromisoformat(scheduled_datetime).time()
        message = ("Vaccination of your child " + beneficiary.first_name + ' '+beneficiary.last_name + " is scheduled on " + str(scheduled_date) +
                   " at "+str(scheduled_time))
        ReminderSMSThread(parent.mobile, message).start()
        return CreateVaccineScheduleMutation(vaccine_schedule=vaccine_schedule)


class UpdateVaccineScheduleMutation(graphene.Mutation):
    vaccine_schedule = graphene.Field(VaccineScheduleType)

    class Arguments:
        id = graphene.Int(required=True)
        status_id = graphene.String(required=True)
        dose_datetime = graphene.String(required=True)

    def mutate(self, info, id,  status_id, dose_datetime):
        print("id status dose DT:", id, status, dose_datetime)
        vaccine_schedule = VaccineSchedule.objects.get(id=id)
        status = VaccineStatus.objects.get(id=status_id)
        dependent = Dependent.objects.get(
            id=vaccine_schedule.beneficiary_id.id)
        parent = Parent.objects.get(id=dependent.parent_id.id)
        vaccine_schedule.status = status
        vaccine_schedule.dose_datetime = dose_datetime if dose_datetime != '' else vaccine_schedule.dose_datetime
        vaccine_schedule.save()
        dependent.is_notify = False
        dependent.save()
        parent.is_notify = False
        parent.save()
        return UpdateVaccineScheduleMutation(vaccine_schedule=vaccine_schedule)


class DeleteVaccineScheduleMutation(graphene.Mutation):
    message = graphene.Field(VaccineScheduleType)

    class Arguments:
        id = graphene.Int(required=True)

    def mutate(cls, self, info, id, name):
        vaccine_schedule = VaccineSchedule.objects.get(id=id)
        vaccine_schedule.delete()
        vaccine_schedule.save()
        return DeleteVaccineScheduleMutation(message=f"ID {id} id deleted")


class Mutation(graphene.ObjectType):
    create_vaccine_schedule = CreateVaccineScheduleMutation.Field()
    update_vaccine_schedule = UpdateVaccineScheduleMutation.Field()
    delete_vaccine_schedule = DeleteVaccineScheduleMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
