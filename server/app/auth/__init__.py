from flask import Blueprint
auth = Blueprint('auth', __name__)

from .login import *
from .sign_up import *
from .update_blood import *
from .hospital_profile import *