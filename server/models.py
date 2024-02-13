from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
import bcrypt
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)

    @validates('username', 'email', 'password_hash')
    def validate_fields(self, key, value):
        if not value:
            raise ValueError(f"{key.capitalize()} cannot be empty")
        return value
    
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, plaintext_password):
        self.password_hash = bcrypt.hashpw(plaintext_password.encode('utf-8'), bcrypt.gensalt())

    def verify_password(self, plaintext_password):
        return bcrypt.checkpw(plaintext_password.encode('utf-8'), self.password_hash)


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User

class PropertyListing(db.Model):
    __tablename__ = 'property_listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    location = db.Column(db.String, nullable=False)
    images = db.Column(db.String, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    host = db.relationship('User', backref=db.backref('property_listings', lazy=True))

    @validates('title', 'description', 'price', 'location', 'images')
    def validate_fields(self, key, value):
        if not value:
            raise ValueError(f"{key.capitalize()} cannot be empty")
        return value

class PropertyListingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = PropertyListing


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property_listings.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    num_guests = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String, nullable=False)

    guest = db.relationship('User', backref=db.backref('bookings', lazy=True))
    property_listing = db.relationship('PropertyListing', backref=db.backref('bookings', lazy=True))

    @validates('num_guests', 'total_price', 'status')
    def validate_fields(self, key, value):
        if not value:
            raise ValueError(f"{key.replace('_', ' ').capitalize()} cannot be empty")
        return value

class BookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Booking


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property_listings.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False)

    guest = db.relationship('User', backref=db.backref('reviews', lazy=True))
    property_listing = db.relationship('PropertyListing', backref=db.backref('reviews', lazy=True))

    @validates('rating', 'comment', 'created_at')
    def validate_fields(self, key, value):
        if not value:
            raise ValueError(f"{key.replace('_', ' ').capitalize()} cannot be empty")
        return value

class ReviewSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Review


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.now(), nullable=False)

    user = db.relationship('User', backref=db.backref('notifications', lazy=True))

    @validates('message', 'timestamp')
    def validate_fields(self, key, value):
        if not value:
            raise ValueError(f"{key.capitalize()} cannot be empty")
        return value
        
    def __repr__(self):
        return f'<Notification {self.id}>'

class NotificationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Notification
