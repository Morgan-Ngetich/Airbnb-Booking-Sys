import os


from flask import Flask, jsonify, request, make_response, session, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_cors import CORS
from datetime import datetime
import bcrypt
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from flask_wtf.csrf import generate_csrf
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from email_validator import validate_email, EmailNotValidError
from models import db, User, PropertyListing, Booking, Review, Notification
from flask_migrate import Migrate
from flask_caching import Cache

def create_app():
    app = Flask(
        __name__,
        static_url_path='',
        static_folder='../client/build',
        template_folder='../client/build'
    )
    

    # Configure SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://airbnb-booking-sys-1.onrender.com", "allow_headers": ["Content-Type"]}} )
    # CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*",  "allow_headers": ["Content-Type"]}})

    # CORS(app, resources={r"/*": {"origins": "https://airbnb-booking-sys-1.onrender.com"}})
    # CORS(app)


    # Initialize SQLAlchemy
    db.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, db)

    api = Api(app)

    # Initialize CSRF protection

    # Configure session to use cookies
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'
    app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem for storing session data
    app.secret_key = 'b1293b030621e7fae3ba76e9544b26b03b792faecae8be6def59a205fc622eda'

    
    csrf = CSRFProtect(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
        
        # Configure caching
    app.config['CACHE_TYPE'] = 'simple'
    cache = Cache(app)
    


    # User registration form
    class RegistrationForm(FlaskForm):
        username = StringField('Username', validators=[DataRequired(), Length(min=3, max=50)])
        email = StringField('Email', validators=[DataRequired(), Email()])
        password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
        submit = SubmitField('Sign Up')

        def validate_email(self, field):
            try:
                validate_email(field.data)
            except EmailNotValidError:
                raise ValidationError('Invalid email address')

    # User registration (signup)
    class SignUp(Resource):
        def post(self):
            form = RegistrationForm()
            if form.validate_on_submit():
                username = form.username.data
                email = form.email.data
                password = form.password.data

                existing_user = User.query.filter_by(email=email).first()
                if existing_user:
                    return {'error': 'Email address already exists'}, 400

                # Hash the password
                hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

                new_user = User(username=username, email=email, password_hash=hashed_password)
                db.session.add(new_user)
                db.session.commit()
                return {'message': 'User created successfully'}, 201
            else:
                errors = {}
                for field, errs in form.errors.items():
                    errors[field] = errs[0]
                return {'error': errors}, 400
        
        def get(self):
            form = LoginForm()
            return render_template('signup.html', form=form)

    # User login form
    class LoginForm(FlaskForm):
        email = StringField('Email', validators=[DataRequired(), Email()])
        password = PasswordField('Password', validators=[DataRequired()])
        submit = SubmitField('Login')

    # User authentication (login)
    class Login(Resource):
        def post(self):
            form = LoginForm(request.form)
            if form.validate():
                email = form.email.data
                password = form.password.data

                user = User.query.filter_by(email=email).first()
                if not user or not user.verify_password(password):
                    return {'error': 'Invalid email or password'}, 401

                # Create session for the authenticated user
                session['user_id'] = user.id

                return {'message': 'Login successful'}, 200
            else:
                errors = {}
                for field, errs in form.errors.items():
                    errors[field] = errs[0]
                return {'error': errors}, 400

        def get(self):
            form = LoginForm()
            return render_template('login.html', form=form)

    # User logout
    class Logout(Resource):
        def post(self):
            # Clear the session data
            session.clear()
            return {'message': 'Logout successful'}, 200

    # Check session
    class CheckSession(Resource):
        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self):
            user = User.query.filter(User.id == session.get('user_id')).first()
            if user:
                return jsonify(user.to_dict())
            else:
                return {'message': '401: Not Authorized'}, 401

    # Generate and return CSRF token
    class CSRFToken(Resource):        
        def get(self):
            csrf_token = generate_csrf()
            return {'csrf_token': csrf_token}, 200

    # User resource
    class UserResource(Resource):        
        def post(self):
            data = request.json
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'User created successfully'}, 201
        
        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self):
            users = User.query.all()
            result = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
            return result, 200

    # User detail resource
    class UserDetailResource(Resource):
        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self, user_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            authenticated_user_id = session['user_id']

            if user_id != authenticated_user_id:
                return {'error': 'Unauthorized'}, 401

            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404
            return {'id': user.id, 'username': user.username, 'email': user.email}, 200
        
        
        def patch(self, user_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            authenticated_user_id = session['user_id']

            if user_id != authenticated_user_id:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404
            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()
            return {'message': 'User updated successfully'}, 200

        def delete(self, user_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            authenticated_user_id = session['user_id']

            if user_id != authenticated_user_id:
                return {'error': 'Unauthorized'}, 401

            user = User.query.get(user_id)
            if not user:
                return {'error': 'User not found'}, 404
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}, 200

    # Property listing resource
    class PropertyListingResource(Resource):        
        def post(self):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            new_property_listing = PropertyListing(**data)
            db.session.add(new_property_listing)
            db.session.commit()
            return {'message': 'Property listing created successfully'}, 201

        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self):            
            property_listings = PropertyListing.query.all()
            result = []
            for listing in property_listings:
                host_username = User.query.get(listing.host_id).username
                result.append({
                    'id': listing.id,
                    'title': listing.title,
                    'description': listing.description,
                    'price': float(listing.price),
                    'location': listing.location,
                    'images': listing.images,
                    'check_in_date': listing.check_in_date.strftime('%Y-%m-%d'),
                    'check_out_date': listing.check_out_date.strftime('%Y-%m-%d'),
                    'host_username': host_username
                })
            return result, 200

    # Property listing detail resource
    class PropertyListingDetailResource(Resource):
        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self, listing_id):
            listing = PropertyListing.query.get(listing_id)
            if not listing:
                return {'error': 'Property listing not found'}, 404

            # Query the User model to get the username associated with the host_id
            host_username = User.query.get(listing.host_id).username

            return {
                'id': listing.id,
                'title': listing.title,
                'description': listing.description,
                'price': float(listing.price),
                'location': listing.location,
                'images': listing.images,
                'check_in_date': listing.check_in_date.strftime('%Y-%m-%d'),
                'check_out_date': listing.check_in_date.strftime('%Y-%m-%d'),
                'host_username': host_username
            }, 200

        def put(self, listing_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            listing = PropertyListing.query.get(listing_id)
            if not listing:
                return {'error': 'Property listing not found'}, 404
            for key, value in data.items():
                setattr(listing, key, value)
            db.session.commit()
            return {'message': 'Property listing updated successfully'}, 200

        def delete(self, listing_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            listing = PropertyListing.query.get(listing_id)
            if not listing:
                return {'error': 'Property listing not found'}, 404
            db.session.delete(listing)
            db.session.commit()
            return {'message': 'Property listing deleted successfully'}, 200

    # Booking resource
    class BookingResource(Resource):
        def post(self):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            new_booking = Booking(**data)
            db.session.add(new_booking)
            db.session.commit()
            return {'message': 'Booking created successfully'}, 201

        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self):
            user_id = request.args.get('user_id')
            if not user_id:
                return {'error': 'User ID is required'}, 400

            bookings = Booking.query.filter_by(guest_id=user_id).all()
            if not bookings:
                return {'error': "User hasn't made any bookings yet."}, 404

            result = []
            for booking in bookings:
                guest = User.query.get(booking.guest_id)
                property_listing = PropertyListing.query.get(booking.property_id)
                result.append({
                    'id': booking.id,
                    'guest_id': booking.guest_id,
                    'guest_username': guest.username,
                    'property_id': booking.property_id,
                    'property_title': property_listing.title,
                    'num_guests': booking.num_guests,
                    'start_date': booking.start_date.strftime('%Y-%m-%d'),  # Convert to string
                    'end_date': booking.end_date.strftime('%Y-%m-%d'),  # Convert to string
                    'total_price': str(booking.total_price),
                    'status': booking.status
                })
            return result, 200

    # Booking detail resource
    class BookingDetailResource(Resource):
        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self, booking_id):
            booking = Booking.query.get(booking_id)
            if not booking:
                return {'error': "Booking not found."}, 404

            guest = User.query.get(booking.guest_id)
            property_listing = PropertyListing.query.get(booking.property_id)

            return {
                'id': booking.id,
                'guest_id': booking.guest_id,
                'guest_username': guest.username,
                'property_id': booking.property_id,
                'property_title': property_listing.title,
                'num_guests': booking.num_guests,
                'start_date': booking.start_date.strftime('%Y-%m-%d'),
                'end_date': booking.end_date.strftime('%Y-%m-%d'),
                'total_price': str(booking.total_price),
                'status': booking.status
            }, 200

        def post(self, booking_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json

            data['start_date'] = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
            data['end_date'] = datetime.strptime(data['end_date'], '%Y-%m-%d').date()

            booking = Booking.query.get(booking_id)
            if not booking:
                # Create a new booking if the booking_id is not found
                new_booking = Booking(**data)
                db.session.add(new_booking)
                db.session.commit()
                return {'message': 'Booking created successfully'}, 201

            # Update the existing booking if the booking_id is found
            for key, value in data.items():
                setattr(booking, key, value)
            db.session.commit()
            return {'message': 'Booking updated successfully'}, 200

        def delete(self, booking_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            booking = Booking.query.get(booking_id)
            if not booking:
                return {'error': 'Booking not found'}, 404
            db.session.delete(booking)
            db.session.commit()
            return {'message': 'Booking deleted successfully'}, 200

    # Review resource
    class ReviewResource(Resource):
        def post(self):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            guest_id = session['user_id']  # Assuming 'user_id' is stored in the session
            created_at = data.get('created_at')
            
            if created_at is None:
                created_at = datetime.utcnow()  # Set to current timestamp if not provided

            new_review = Review(guest_id=guest_id, created_at=created_at, **data)
            db.session.add(new_review)
            db.session.commit()
            return {'message': 'Review created successfully'}, 201


        
        def get(self):
            property_id = request.args.get('property_id')
            if not property_id:
                return {'error': 'Property ID is required'}, 400

            reviews = Review.query.filter_by(property_id=property_id).all()

            result = []
            for review in reviews:
                guest_username = User.query.get(review.guest_id).username
                result.append(
                    {
                        'id': review.id,
                        'property_id': review.property_id,
                        'guest_id': review.guest_id,
                        'guest_username': guest_username,
                        'rating': review.rating,
                        'comment': review.comment,
                        'created_at': review.created_at.strftime('%Y-%m-%d')
                    })
            return result, 200

    # Review detail resource
    class ReviewDetailResource(Resource):
        
        def get(self, review_id):
            review = Review.query.get(review_id)
            if not review:
                return {'error': 'Review not found'}, 404
            guest_username = User.query.get(review.guest_id).username
            return [
                {
                    'id': review.id,
                    'property_id': review.property_id,
                    'guest_id': review.guest_id,
                    'guest_username': guest_username,
                    'rating': review.rating,
                    'comment': review.comment,
                    'created_at': review.created_at.strftime('%Y-%m-%d')
                }], 200

        def post(self, review_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            guest_id = session['user_id']  # user_id stored in session
            property_id = data.get('property_id')  # property_id in the request data
            created_at = data.get('created_at')

            if created_at is None:
                created_at = datetime.now()

            new_review = Review(guest_id=guest_id, created_at=created_at, **data)
            db.session.add(new_review)
            db.session.commit()

        def delete(self, review_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            review = Review.query.get(review_id)
            if not review:
                return {'error': 'Review not found'}, 404           

        
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review deleted successfully'}, 200

    # Notification resource
    class NotificationResource(Resource):
        def post(self):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            new_notification = Notification(**data)
            db.session.add(new_notification)
            db.session.commit()
            return {'message': 'Notification created successfully'}, 201

        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self):
            notifications = Notification.query.all()
            result = [{'id': notification.id, 'message': notification.message} for notification in notifications]
            return result, 200

    # Notification detail resource
    class NotificationDetailResource(Resource):
        @cache.cached(timeout=300)  # Cache the response for 5 minutes
        def get(self, notification_id):
            notification = Notification.query.get(notification_id)
            if not notification:
                return {'error': 'Notification not found'}, 404
            return {'id': notification.id, 'message': notification.message}, 200

        def put(self, notification_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            data = request.json
            notification = Notification.query.get(notification_id)
            if not notification:
                return {'error': 'Notification not found'}, 404
            for key, value in data.items():
                setattr(notification, key, value)
            db.session.commit()
            return {'message': 'Notification updated successfully'}, 200

        def delete(self, notification_id):
            if 'user_id' not in session:
                return {'error': 'Unauthorized'}, 401

            notification = Notification.query.get(notification_id)
            if not notification:
                return {'error': 'Notification not found'}, 404
            db.session.delete(notification)
            db.session.commit()
            return {'message': 'Notification deleted successfully'}, 200

    # Add resources to API
    api.add_resource(SignUp, '/signup')
    api.add_resource(Login, '/login')
    api.add_resource(Logout, '/logout')
    api.add_resource(CheckSession, '/check_session')
    api.add_resource(CSRFToken, '/csrf_token')

    # Resource routes
    api.add_resource(UserResource, '/users')
    api.add_resource(UserDetailResource, '/users/<int:user_id>')
    api.add_resource(PropertyListingResource, '/listings')
    api.add_resource(PropertyListingDetailResource, '/listings/<int:listing_id>')
    api.add_resource(BookingResource, '/bookings')
    api.add_resource(BookingDetailResource, '/bookings/<int:booking_id>')
    api.add_resource(ReviewResource, '/reviews')
    api.add_resource(ReviewDetailResource, '/reviews/<int:review_id>')
    api.add_resource(NotificationResource, '/notifications')
    api.add_resource(NotificationDetailResource, '/notifications/<int:notification_id>')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5555)
