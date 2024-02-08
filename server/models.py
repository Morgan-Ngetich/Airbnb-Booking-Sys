from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password_hash = db.Column(db.String)
    role = db.Column(db.String)
    profile_picture = db.Column(db.String)

class PropertyListing(db.Model):
    __tablename__ = 'property_listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2))
    location = db.Column(db.String)
    # Change the column type from ARRAY to String
    images = db.Column(db.String)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    host = db.relationship('User', backref=db.backref('property_listings', lazy=True))

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))   
    property_id = db.Column(db.Integer, db.ForeignKey('property_listings.id'))    
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    num_guests = db.Column(db.Integer)
    total_price = db.Column(db.Numeric(10, 2))
    status = db.Column(db.String)
    
    guest = db.relationship('User', backref=db.backref('bookings', lazy=True))
    property_listing = db.relationship('PropertyListing', backref=db.backref('bookings', lazy=True))

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'))    
    property_id = db.Column(db.Integer, db.ForeignKey('property_listings.id'))    
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    created_at = db.Column(db.TIMESTAMP)
    
    guest = db.relationship('User', backref=db.backref('reviews', lazy=True))
    property_listing = db.relationship('PropertyListing', backref=db.backref('reviews', lazy=True))
    
class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship('User', backref=db.backref('notifications', lazy=True))
        
    def __repr__(self):
        return f'<Notification {self.id}>'
