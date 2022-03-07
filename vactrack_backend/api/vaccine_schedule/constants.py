VACCINE_SCHEDULE = 'vaccine_schedule'
VACCINE_SCHEDULE_VERBOSE_NAME = 'vaccine_schedule'
VACCINE_SCHEDULE_VERBOSE_NAME_PLURAL = 'vaccine_schedules'
VACCINE_SCHEDULE_CHANGE_BUTTON_HTML = '<a href="/admin/vaccine_schedule/vaccineschedule/{}/change/">Edit</a>'
VACCINE_SCHEDULE_DELETE_BUTTON_HTML = '<a href="/admin/vaccine_schedule/vaccineschedule/{}/delete/" class="deletelink">Delete</a>'

VACCINE_STATUS = 'vaccine_status'
VACCINE_STATUS_VERBOSE_NAME = 'vaccine_status'
VACCINE_STATUS_VERBOSE_NAME_PLURAL = 'vaccine_status'
VACCINE_STATUS_CHANGE_BUTTON_HTML = '<a href="/admin/vaccine_schedule/vaccinestatus/{}/change/">Edit</a>'
VACCINE_STATUS_DELETE_BUTTON_HTML = '<a href="/admin/vaccine_schedule/vaccinestatus/{}/delete/" class="deletelink">Delete</a>'

STATUS_CHOICES = (
    ('SCHEDULED', 'Scheduled'),
    ('DONE', 'Done'),
    ('MISSED', 'Missed'),
    ('NOT DONE', 'Not Done')
)
