import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from api.vaccine.category.models import Category
from api.vaccine.route.models import Route
from api.vaccine.vaccine_site.models import VaccineSite
from api.vaccine.models import Vaccine


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "name", "vaccine")


class RouteType(DjangoObjectType):
    class Meta:
        model = Route
        fields = ("id", "name")


class VaccineSiteType(DjangoObjectType):
    class Meta:
        model = VaccineSite
        fields = ("id", "name")


class VaccineType(DjangoObjectType):
    class Meta:
        model = Vaccine
        fields = ("id", "name", 'vac_code', 'category',
                  'description', 'dosage_number', 'dose', 'route', 'vaccine_site')


class Query(graphene.ObjectType):
    all_category = graphene.List(CategoryType)
    category_by_name = graphene.Field(
        CategoryType, name=graphene.String(required=True))
    all_route = graphene.List(RouteType)
    route_by_name = graphene.Field(
        RouteType, name=graphene.String(required=True))
    all_vaccine_site = graphene.List(VaccineSiteType)
    vaccine_site_by_name = graphene.Field(
        VaccineSiteType, name=graphene.String(required=True))
    all_vaccine = graphene.List(VaccineType)
    vaccine_by_name = graphene.Field(
        VaccineType, name=graphene.String(required=True))

    def resolve_all_category(root, info):
        return Category.objects.all()

    def resolve_category_by_name(root, info, name):
        try:
            return Category.objects.get(name=name)
        except Category.DoesNotExist:
            return None

    def resolve_all_route(root, info):
        return Route.objects.all()

    def resolve_route_by_name(root, info, name):
        try:
            return Route.objects.get(name=name)
        except Route.DoesNotExist:
            return None

    def resolve_all_vaccine_site(root, info):
        return VaccineSite.objects.all()

    def resolve_vaccine_site_by_name(root, info, name):
        try:
            return VaccineSite.objects.get(name=name)
        except Route.DoesNotExist:
            return None

    def resolve_all_vaccine(root, info):
        return Vaccine.objects.select_related("category").all()


schema = graphene.Schema(query=Query)
