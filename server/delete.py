from app import create_app
from models import db, User, PropertyListing, Booking, Review, Notification

# Create the app instance
app = create_app()

# Use the app context to make sure db.session is within the application context
with app.app_context():
    def delete_all_records():
        try:
            # Delete all notifications
            db.session.query(Notification).delete()
            
            # Delete all reviews
            db.session.query(Review).delete()

            # Delete all bookings
            db.session.query(Booking).delete()

            # Delete all property listings
            db.session.query(PropertyListing).delete()

            # Delete all users
            db.session.query(User).delete()

            # Commit the changes
            db.session.commit()

            print("All records deleted successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
            db.session.rollback()

    try:
        delete_all_records()
    except Exception as e:
        print(f"An error occurred: {e}")
