from flask import Blueprint
auth = Blueprint('auth', __name__)

from .login import *
from .sign_up import *