'''
constants for dependent app
'''
DEPENDENT = 'dependent'
DEPENDENT_VERBOSE_NAME = 'Dependent'
DEPENDENT_VERBOSE_NAME_PLURAL = 'Dependents'
GENDER_CHOICES = (
    ('MALE', 'Male'),
    ('FEMALE', 'Female'),
    ('OTHER', 'Other'),
)
DEPENDENT_CHANGE_BUTTON_HTML = '<a href="/admin/dependent/dependent/{}/change/">Edit</a>'
DEPENDENT_DELETE_BUTTON_HTML = '<a href = "/admin/dependent/dependent/{}/delete/"class = "deletelink" > Delete < /a >'
