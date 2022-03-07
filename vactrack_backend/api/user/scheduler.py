import logging
from datetime import datetime, timedelta, date
from django.conf import settings
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ProcessPoolExecutor, ThreadPoolExecutor
from django_apscheduler.jobstores import register_events, register_job
from api.vaccine_schedule.models import VaccineSchedule
from api.dependent.models import Dependent
from api.user.models import Parent
from api.user.services import ReminderSMSThread
from api.vaccine_schedule.serializers import VaccineScheduleSerializer


scheduler_job = BackgroundScheduler(settings.SCHEDULER_CONFIG)


def start():
    # logging.basicConfig()
    # logging.getLogger('apscheduler').setLevel(logging.DEBUG)
    # scheduler_job.add_job(logging_status, 'interval',
    #                       seconds=120, replace_existing=True)
    # register_events(scheduler_job)
    # scheduler_job.start()
    # logging_status()
    pass


def set_reminder(scheduled_date):
    current_date = date.today()
    days_left = (scheduled_date - current_date).days
    print("s c left:", scheduled_date, current_date, days_left)
    if days_left <= 15:
        return True
    else:
        return False


def logging_status():
    print("logging status of the job assigned:")
    vaccine_schedule_obj = VaccineSchedule.objects.all()
    print("vaccine schedule:", vaccine_schedule_obj.exists())
    if vaccine_schedule_obj.exists():
        vaccine_schedule_serializer = VaccineScheduleSerializer(
            vaccine_schedule_obj, many=True)
        for vaccine_schedule in vaccine_schedule_serializer.data:
            scheduled_datetime = vaccine_schedule['dose_datetime'].replace(
                'T', ' ').replace('Z', '')
            print("dose datetime scheduled datetime:",
                  vaccine_schedule['dose_datetime'], scheduled_datetime)
            scheduled_date = datetime.fromisoformat(scheduled_datetime).date()
            scheduled_time = datetime.fromisoformat(scheduled_datetime).time()
            print("scheduled date n time : ", scheduled_date, scheduled_time)
            if set_reminder(scheduled_date):
                print("true: ", vaccine_schedule['beneficiary_id'])
                dependent = Dependent.objects.get(
                    id=vaccine_schedule['beneficiary_id'])
                dependent.is_notify = True
                dependent.save()
                parent = Parent.objects.get(id=dependent.parent_id.id)
                parent.is_notify = True
                parent.save()
                print("parent number dependent name:", parent.mobile,
                      dependent.first_name, dependent.last_name)
                message = ("Reminder !! Vaccination of your child " + dependent.first_name +
                           ' '+dependent.last_name +
                           " is scheduled on "+str(scheduled_date) +
                           " at "+str(scheduled_time))
                ReminderSMSThread(parent.mobile, message).start()
