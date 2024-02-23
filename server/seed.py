import os

import random
import datetime
from faker import Faker
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from models import User, PropertyListing, Booking, Review, Notification


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


fake = Faker()

# Custom list of house image URLs
house_image_urls = [
    'https://i.pinimg.com/236x/96/9e/29/969e29466c4040aa181f7d80e6cac331.jpg',
    'https://i.pinimg.com/236x/0f/8b/a5/0f8ba5b8d78ed7c43ababd190aafb282.jpg',
    'https://i.pinimg.com/236x/56/10/19/5610195ae334cf5f7f1f4e6893eb4d4e.jpg',
    'https://i.pinimg.com/236x/d5/24/c9/d524c987a9b00dac65d845fac0f69b4f.jpg',
    'https://i.pinimg.com/236x/3c/b7/af/3cb7afd7aa8da7bf31d92f7a147e632b.jpg',
    'https://i.pinimg.com/236x/56/df/a1/56dfa1f96fb005764fcfef238d5d56d9.jpg',
    'https://i.pinimg.com/236x/f7/96/12/f7961202edaea745423d5017c9c433b2.jpg',
    'https://i.pinimg.com/236x/08/3d/f9/083df955784693efb30f244d0f4c1661.jpg',
    'https://i.pinimg.com/236x/8e/1b/8b/8e1b8b94e5b0c901b4cdd8a39832b378.jpg',
    'https://i.pinimg.com/236x/24/93/07/24930781b51e7d1ba2f73cb1443ec3ed.jpg',
    'https://i.pinimg.com/236x/a1/bf/8c/a1bf8c57eb582d2db69b8c917a853599.jpg',
    'https://i.pinimg.com/236x/75/83/2e/75832e8c6d18176c062bb11128f80649.jpg',
    'https://i.pinimg.com/236x/2c/55/21/2c5521af4bfbd2d545c388de165b9bb8.jpg',
    'https://i.pinimg.com/236x/fe/26/cc/fe26cc69e593fa5b9a990a897eb6ff29.jpg',
    'https://i.pinimg.com/236x/a8/72/72/a872728b57113a1adb2ad181167a1a5f.jpg',
    'https://i.pinimg.com/236x/85/ac/51/85ac5161e1bca68a03f3ff3c8a8feaaa.jpg',
    'https://i.pinimg.com/236x/6b/60/a1/6b60a17968faa55c574073f56c9065dd.jpg',
    'https://i.pinimg.com/236x/5e/ba/12/5eba124bbf9b071e847bc41f301febbf.jpg',
    'https://i.pinimg.com/236x/31/15/f2/3115f2bb28c994dce17391bae903b7d9.jpg',
    'https://i.pinimg.com/236x/d9/56/ca/d956ca6573763180714fc6edc14f0fdb.jpg',
    'https://i.pinimg.com/236x/01/92/48/0192489f020c925d63d6bdc691830405.jpg',
    'https://i.pinimg.com/236x/06/09/12/060912db19ae3c89079d6f2cd14aa054.jpg',
    'https://i.pinimg.com/236x/4d/db/ae/4ddbaef4ca552efc6f7f55511251bd18.jpg',
    'https://i.pinimg.com/236x/83/11/1e/83111e490a1ac45115a807fa67652e09.jpg',
    'https://i.pinimg.com/236x/bb/4f/6f/bb4f6f0098c6c28ab194ddaeb14f58f6.jpg',
    'https://i.pinimg.com/236x/23/5d/b3/235db3fdcf591573a5581ccf36f43591.jpg',
    'https://i.pinimg.com/236x/1b/4f/dd/1b4fdd6bc731b6f270c2f003507b4574.jpg',
    'https://i.pinimg.com/236x/da/b6/5e/dab65e4080b3209725d35dc52a1d6b16.jpg',
    'https://i.pinimg.com/236x/f5/24/80/f52480529d6822ebcf854ac52c7d41c1.jpg',
    'https://i.pinimg.com/236x/33/e5/59/33e559a135159f8c5fdd6232df34f342.jpg',
    'https://i.pinimg.com/236x/ec/c2/9d/ecc29dcfe496817feef8e91257a67c4e.jpg',
    'https://i.pinimg.com/236x/26/b1/ec/26b1ec666b633fa6e54b2279b5c09e01.jpg'    
]

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
                images=','.join([random.choice(house_image_urls) for _ in range(random.randint(1, 5))]),
                host_id=random.randint(1, num_users),
                check_in_date=fake.date_between(start_date='today', end_date='+30d'),
                check_out_date=fake.date_between(start_date='+31d', end_date='+60d')
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
    num_users = 10
    num_listings = 10
    num_bookings = 10
    num_reviews = 5
    num_notifications = 5
    
    generate_users(num_users)
    generate_property_listings(num_listings, num_users)
    generate_bookings(num_bookings, num_users, num_listings)
    generate_reviews(num_reviews, num_users, num_listings)
    generate_notifications(num_notifications, num_users)

    print("Data seeded successfully!")
