import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from api.dependent.models import Dependent
from rest_framework.response import Response
from api.user.models import Parent
from api.vaccine_schedule.models import VaccineSchedule


class VaccineScheduleType(DjangoObjectType):
    class Meta:
        model = VaccineSchedule
        fields = "__all__"


class DependentType(DjangoObjectType):
    class Meta:
        model = Dependent
        fields = ("id", "first_name", "last_name", "dob",
                  "blood_group", "gender", "image_url", "is_notify", "vaccine_schedule")


class ParentUserType(DjangoObjectType):
    class Meta:
        model = Parent
        fields = ("id", "dependent")


class Query(graphene.ObjectType):
    all_user = graphene.List(ParentUserType)
    user_by_id = graphene.Field(
        ParentUserType, id=graphene.Int(required=True))
    all_dependent = graphene.List(DependentType)
    dependent_by_id = graphene.Field(
        DependentType, id=graphene.Int(required=True))
    all_vaccine_schedule = graphene.List(VaccineScheduleType)
    vaccine_schedule_by_id = graphene.Field(
        VaccineScheduleType, id=graphene.String(required=True))
    vaccine_certificate = graphene.List(
        graphene.String, id=graphene.Int(required=True))

    def resolve_all_vaccine_schedule(root, info):
        return VaccineSchedule.objects.select_related("beneficiary_id").all()

    def resolve_vaccine_schedule_by_id(root, info, id):
        try:
            return VaccineSchedule.objects.get(id=id)
        except VaccineSchedule.DoesNotExist:
            return None

    def resolve_all_dependent(root, info):
        return Dependent.objects.select_related("parent_id").all()

    def resolve_dependent_by_id(root, info, id):
        try:
            return Dependent.objects.get(id=id)
        except Dependent.DoesNotExist:
            return None

    def resolve_all_user(root, info):
        return CustomUser.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return Parent.objects.get(id=id)
        except Parent.DoesNotExist:
            return None


class CreateDependentMutation(graphene.Mutation):
    dependent = graphene.Field(DependentType)

    class Arguments:
        parent_id = graphene.Int(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        gender = graphene.String(required=True)
        dob = graphene.String(required=True)
        image_url = graphene.String(required=True)
        blood_group = graphene.String(required=True)

    def mutate(cls, self, parent_id, first_name, last_name, gender, dob, image_url, blood_group):
        parent = Parent.objects.get(id=parent_id)
        dependent = Dependent(
            parent_id=parent, first_name=first_name, last_name=last_name, gender=gender, dob=dob, image_url=image_url, blood_group=blood_group)
        dependent.save()
        return CreateDependentMutation(dependent=dependent)


class UpdateDependentMutation(graphene.Mutation):
    dependent = graphene.Field(DependentType)

    class Arguments:
        id = graphene.Int(required=True)
        vaccine_id = graphene.Int(required=True)
        beneficiary_id = graphene.Int(required=True)
        dose_number = graphene.Int(required=True)
        dose_datetime = graphene.String(required=True)

    @ classmethod
    def mutate(cls, self, info, id,  parent_id, first_name, last_name, gender, dob, image_url, blood_group):
        dependent = Dependent.objects.get(id=id)
        parent = User.objects.get(id=parent_id)
        dependent.parent_id = parent
        dependent.first_name = first_name
        dependent.last_name = last_name
        dependent.gender = gender
        dependent.dob = dob
        dependent.image_url = image_url
        dependent.blood_group = blood_group
        return UpdateDependentMutation(dependent=dependent)


class DeleteDependentMutation(graphene.Mutation):
    message = graphene.Field(DependentType)

    class Arguments:
        id = graphene.Int(required=True)

    @ classmethod
    def mutate(cls, self, info, id, name):
        dependent = Dependent.objects.get(id=id)
        dependent.delete()
        dependent.save()
        return DeleteDependentMutation(message=f"ID {id} id deleted")


class Mutation(graphene.ObjectType):
    create_dependent = CreateDependentMutation.Field()
    update_dependent = UpdateDependentMutation.Field()
    delete_dependent = DeleteDependentMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
