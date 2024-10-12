from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate  
from .models.models import  db,patient,hospital,event_organizer,Blood,BloodStock

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'admin123'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Purnama123@localhost:5432/bloodnearme'

    db.init_app(app)
    migrate = Migrate(app, db)  
    login_manager = LoginManager()
    login_manager.init_app(app)

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
