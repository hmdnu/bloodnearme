from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate  
from .models.models import  db,patient,hospital,event_organizer
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager

def create_app():
    load_dotenv()
    
    app = Flask(__name__)
    
    # Konfigurasi aplikasi dari .env
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY']= os.getenv('JWT_SECRET_KEY')
    
    
    db.init_app(app)
    migrate = Migrate(app, db)  
    login_manager = LoginManager()
    login_manager.init_app(app)
    jwt = JWTManager(app)

    @login_manager.user_loader
    def load_user(user_id):
        user = patient.query.get(int(user_id)) or hospital.query.get(int(user_id)) or event_organizer.query.get(int(user_id))
        return user
    
    login_manager.login_view = 'auth.login'
    
    with app.app_context():
        db.create_all() 
    
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    
    return app
