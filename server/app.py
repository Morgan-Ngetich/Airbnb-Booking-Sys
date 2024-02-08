from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, PropertyListing, Booking, Review, Notification
from datetime import datetime


app = Flask(__name__)
api = Api(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Create tables
with app.app_context():
    db.create_all()

  
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
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        return {'id': user.id, 'username': user.username, 'email': user.email}, 200

    def put(self, user_id):
        # Example authentication logic - replace with actual authentication logic
        authenticated_user_id = 1  # Replace with actual authenticated user ID retrieval logic
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
        # Example authentication logic - replace with actual authentication logic
        authenticated_user_id = 1  # Replace with actual authenticated user ID retrieval logic
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
        authenticated_user_id = 1  # Replace with actual authenticated user ID retrieval logic
        data = request.json
        data['host_id'] = authenticated_user_id
        new_listing = PropertyListing(**data)
        db.session.add(new_listing)
        db.session.commit()
        return {'message': 'Property listing created successfully'}, 201

    def get(self):
        listings = PropertyListing.query.all()
        result = [{'id': listing.id, 'title': listing.title, 'description': listing.description} for listing in listings]
        return result, 200

# Notification resource
class NotificationResource(Resource):
    def get(self):
        # Example authentication logic - replace with actual authentication logic
        authenticated_user_id = 1  # Replace with actual authenticated user ID retrieval logic
        notifications = Notification.query.filter_by(user_id=authenticated_user_id).all()
        result = [{'id': notification.id, 'message': notification.message, 'timestamp': notification.timestamp} for notification in notifications]
        return result, 200

class NotificationDetailResource(Resource):
    def get(self, notification_id):
        notification = Notification.query.get(notification_id)
        if not notification:
            return {'error': 'Notification not found'}, 404
        return {'id': notification.id, 'message': notification.message, 'timestamp': notification.timestamp}, 200

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
        authenticated_user_id = 1  # Replace with actual authenticated user ID retrieval logic
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
      
# Resource routing
api.add_resource(UserResource, '/users')
api.add_resource(UserDetailResource, '/users/<int:user_id>')
api.add_resource(PropertyListingResource, '/listings')
api.add_resource(NotificationResource, '/notifications')
api.add_resource(NotificationDetailResource, '/notifications/<int:notification_id>')
api.add_resource(ReviewResource, '/reviews')
api.add_resource(BookingResource, '/bookings')
api.add_resource(BookingDetailResource, '/bookings/<int:booking_id>')

if __name__ == '__main__':
    app.run(debug=True)
