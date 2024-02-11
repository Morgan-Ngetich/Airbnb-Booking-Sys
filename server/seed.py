import random
import datetime
from faker import Faker
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import User, PropertyListing, Booking, Review, Notification

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

fake = Faker()

def generate_users(num_users):
    with app.app_context():
        for _ in range(num_users):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password_hash=fake.password(),
                role=random.choice(['admin', 'user']),
                profile_picture=fake.image_url()
            )
            db.session.add(user)
        db.session.commit()

def generate_property_listings(num_listings, num_users):
    with app.app_context():
        for _ in range(num_listings):
            listing = PropertyListing(
                title=fake.catch_phrase(),
                description=fake.text(),
                price=random.uniform(50, 1000),
                location=fake.address(),
                images=fake.image_url(),
                host_id=random.randint(1, num_users)
            )
            db.session.add(listing)
        db.session.commit()

def generate_bookings(num_bookings, num_users, num_listings):
    with app.app_context():
        for _ in range(num_bookings):
            booking = Booking(
                guest_id=random.randint(1, num_users),
                property_id=random.randint(1, num_listings),
                start_date=fake.date_between(start_date='-30d', end_date='+30d'),
                end_date=fake.date_between(start_date='+31d', end_date='+60d'),
                num_guests=random.randint(1, 10),
                total_price=random.uniform(50, 1000),
                status=random.choice(['confirmed', 'pending', 'cancelled'])
            )
            db.session.add(booking)
        db.session.commit()

def generate_reviews(num_reviews, num_users, num_listings):
    with app.app_context():
        for _ in range(num_reviews):
            review = Review(
                guest_id=random.randint(1, num_users),
                property_id=random.randint(1, num_listings),
                rating=random.randint(1, 5),
                comment=fake.text(),
                created_at=fake.date_time_between(start_date='-30d', end_date='now')
            )
            db.session.add(review)
        db.session.commit()

def generate_notifications(num_notifications, num_users):
    with app.app_context():
        for _ in range(num_notifications):
            notification = Notification(
                user_id=random.randint(1, num_users),
                message=fake.sentence()
            )
            db.session.add(notification)
        db.session.commit()

if __name__ == '__main__':
    num_users = 20
    num_listings = 20
    num_bookings = 50
    num_reviews = 30
    num_notifications = 40
    
    generate_users(num_users)
    generate_property_listings(num_listings, num_users)
    generate_bookings(num_bookings, num_users, num_listings)
    generate_reviews(num_reviews, num_users, num_listings)
    generate_notifications(num_notifications, num_users)

    print("Data seeded successfully!")
