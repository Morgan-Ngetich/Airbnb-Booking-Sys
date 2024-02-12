from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import bcrypt

from models import db, User, PropertyListing, Booking, Review, Notification

app = Flask(__name__)
CORS(app)
api = Api(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Initialize Flask-JWT-Extended
app.config['JWT_SECRET_KEY'] = 'b1293b030621e7fae3ba76e9544b26b03b792faecae8be6def59a205fc622eda'
jwt = JWTManager(app)

# Create tables
with app.app_context():
    db.create_all()

# User registration (signup)
class SignUp(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return {'error': 'Please provide username, email, and password'}, 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {'error': 'Email address already exists'}, 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        new_user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

# User authentication (login)
class Login(Resource):
    def post(self):
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return {'error': 'Please provide email and password'}, 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.verify_password(password):
            return {'error': 'Invalid email or password'}, 401

        # Create JWT access token
        access_token = create_access_token(identity=user.id)
        return {'access_token': access_token}, 200

# User logout
class Logout(Resource):
    @jwt_required()
    def post(self):
        jti = get_raw_jwt()['jti']
        # Add JTI to the blacklist
        blacklist.add(jti)
        return {'message': 'Successfully logged out'}, 200

# Check session
class CheckSession(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        return {'user_id': current_user_id}, 200

# User resource
class UserResource(Resource):
    def post(self):
        data = request.json
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

    def get(self):
        users = User.query.all()
        result = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
        return result, 200

class UserDetailResource(Resource):
    def get(self, user_id):
        # Retrieve the ID of the authenticated user
        authenticated_user_id = get_jwt_identity()
        
        # Check if the authenticated user ID matches the requested user ID
        if user_id != authenticated_user_id:
            return {'error': 'Unauthorized'}, 401

        # Proceed with retrieving the user details
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        return {'id': user.id, 'username': user.username, 'email': user.email}, 200

    def put(self, user_id):
        # Retrieve the ID of the authenticated user
        authenticated_user_id = get_jwt_identity()

        # Check if the authenticated user ID matches the requested user ID
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
        # Retrieve the ID of the authenticated user
        authenticated_user_id = get_jwt_identity()

        # Check if the authenticated user ID matches the requested user ID
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
        # Example authentication logic - replace with actual authentication logic
        authenticated_user_id = get_jwt_identity()
        data = request.json
        data['host_id'] = authenticated_user_id
        new_listing = PropertyListing(**data)
        db.session.add(new_listing)
        db.session.commit()
        return {'message': 'Property listing created successfully'}, 201

    def get(self):
        listings = PropertyListing.query.all()
        result = [{'id': listing.id, 'title': listing.title, 'description': listing.description , 'price': listing.price, 'location': listing.location, 'images': listing.images} for listing in listings]
        return make_response(jsonify(result), 200)
    
    
# ListingDetailResource
class ListingDetailResource(Resource):
    def get(self, listing_id):
        listing = PropertyListing.query.get(listing_id)
        if not listing:
            return {'error': 'Listing not found'}, 404
        result = {
            'id': listing.id,
            'title': listing.title,
            'description': listing.description,
            'price': float(listing.price),
            'location': listing.location,
            'images': listing.images,
            'host_id': listing.host_id
        }
        return make_response(jsonify(result), 200)

# Notification resource
class NotificationResource(Resource):
    def get(self):
        # Example authentication logic - replace with actual authentication logic
        authenticated_user_id = get_jwt_identity()
        notifications = Notification.query.filter_by(user_id=authenticated_user_id).all()
        result = [{
            'id': notification.id, 
            'message': notification.message, 
            'timestamp': notification.timestamp
            } for notification in notifications]
        return make_response(jsonify(result), 200)

class NotificationDetailResource(Resource):
    def get(self, notification_id):
        notification = Notification.query.get(notification_id)
        if not notification:
            return {'error': 'Notification not found'}, 404
        result = [{'id': notification.id, 'message': notification.message, 'timestamp': notification.timestamp}]
        return make_response(jsonify(result), 200)
        
    def delete(self, notification_id):
        notification = Notification.query.get(notification_id)
        if not notification:
            return {'error': 'Notification not found'}, 404
        db.session.delete(notification)
        db.session.commit()
        return {'message': 'Notification deleted successfully'}, 200

# Review resource
class ReviewResource(Resource):
    def post(self):
        # Example authentication logic - replace with actual authentication logic
        authenticated_user_id = get_jwt_identity()
        data = request.json
        data['guest_id'] = authenticated_user_id        
        # Convert created_at string to datetime object
        data['created_at'] = datetime.strptime(data['created_at'], "%Y-%m-%dT%H:%M:%S")
        new_review = Review(**data)
        db.session.add(new_review)
        db.session.commit()
        return {'message': 'Review created successfully'}, 201

    def get(self):
        reviews = Review.query.all()
        result = [{'id': review.id, 'guest_id': review.guest_id, 'property_id': review.property_id, 'rating': review.rating, 'comment': review.comment} for review in reviews]
        return result, 200
    
# ReviewDetailResource
class ReviewDetailResource(Resource):
    def get(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {'error': 'Review not found'}, 404
        result = {
            'id': review.id,
            'guest_id': review.guest_id,
            'property_id': review.property_id,
            'rating': review.rating,
            'comment': review.comment,
            'created_at': review.created_at.strftime("%Y-%m-%dT%H:%M:%S")
        }
        return make_response(jsonify(result), 200)
    

# Booking resource
class BookingResource(Resource):
    def post(self):
        data = request.json
        # Convert date strings to Python date objects
        data['start_date'] = datetime.strptime(data['start_date'], "%Y-%m-%d")
        data['end_date'] = datetime.strptime(data['end_date'], "%Y-%m-%d")
        new_booking = Booking(**data)
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({'message': 'Booking created successfully'}), 201

    def get(self):
        bookings = Booking.query.all()
        result = []
        for booking in bookings:
            booking_data = {
                'id': booking.id,
                'guest_id': booking.guest_id,
                'property_id': booking.property_id,
                'start_date': booking.start_date.strftime("%Y-%m-%d"),
                'end_date': booking.end_date.strftime("%Y-%m-%d"),
                'num_guests': booking.num_guests,
                'total_price': float(booking.total_price),
                'status': booking.status
            }
            result.append(booking_data)            
        return make_response(jsonify(result), 200)

class BookingDetailResource(Resource):
    def get(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {'error': 'Booking not found'}, 404
        return make_response(jsonify({
            'id': booking.id,
            'guest_id': booking.guest_id,
            'property_id': booking.property_id,
            'start_date': booking.start_date.strftime("%Y-%m-%d"),
            'end_date': booking.end_date.strftime("%Y-%m-%d"),
            'num_guests': booking.num_guests,
            'total_price': float(booking.total_price),
            'status': booking.status
        }), 200
        )

    def put(self, booking_id):
        data = request.json
        booking = Booking.query.get(booking_id)
        if not booking:
            return {'error': 'Booking not found'}, 404
        
        # Convert date strings to Python date objects
        if 'start_date' in data:
            data['start_date'] = datetime.strptime(data['start_date'], "%Y-%m-%d").date()
        if 'end_date' in data:
            data['end_date'] = datetime.strptime(data['end_date'], "%Y-%m-%d").date()
        
        # Update booking attributes
        for key, value in data.items():
            setattr(booking, key, value)
        
        # Commit changes to the database
        db.session.commit()
        
        return {'message': 'Booking updated successfully'}, 200


    def delete(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {'error': 'Booking not found'}, 404
        db.session.delete(booking)
        db.session.commit()
        return {'message': 'Booking deleted successfully'}, 200

# Authentication Routes
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/checksession')

# Resource routing
api.add_resource(UserResource, '/users')
api.add_resource(UserDetailResource, '/users/<int:user_id>')
api.add_resource(PropertyListingResource, '/listings')
api.add_resource(ListingDetailResource, '/listings/<int:listing_id>')
api.add_resource(NotificationResource, '/notifications')
api.add_resource(NotificationDetailResource, '/notifications/<int:notification_id>')
api.add_resource(ReviewResource, '/reviews')
api.add_resource(ReviewDetailResource, '/reviews/<int:review_id>')
api.add_resource(BookingResource, '/bookings')
api.add_resource(BookingDetailResource, '/bookings/<int:booking_id>')

if __name__ == '__main__':
    app.run(debug=True)
