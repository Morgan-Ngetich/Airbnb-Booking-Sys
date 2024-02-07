import React, {useState} from 'react';

const Login = () => {
  return (
    <div class='login-container'>
      <h2>Welcome to Airbnb</h2>
      <input type="text" placeholder='Username' />
      <input type='password' placeholder='Password' />
      <button class='login-button'>Login</button>
      <p>We’ll call or text you to confirm your number. Standard message and data rates apply. Privacy Policy</p>
    </div>    
  );
};

const SignUp = () => {
  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button class="signup-button">Sign Up</button>
    </div>
  );
};

const UserProfile = () => {
  // Sample user data (Will replace this with sample data from the bakckend. GET)
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: 'https://example.com/profile-picture.jpg'
  });

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-picture">
          <img src={user.profilePicture} alt="Profile" />
        </div>
        <div className="user-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
        </div>
      </div>
      {/* Option to edit profile */}
      <button className="edit-profile-button">Edit Profile</button>
    </div>
  );
};

export default UserProfile;

export { Login, SignUp, UserProfile };
