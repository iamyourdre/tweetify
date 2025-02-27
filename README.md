# Tweetify - A Twitter Wannabe App

<p align="center">
  <img src="https://github.com/iamyourdre/tweetify/blob/main/1.png?raw=true" width="300">
  <img src="https://github.com/iamyourdre/tweetify/blob/main/2.png?raw=true" width="300">
  <img src="https://github.com/iamyourdre/tweetify/blob/main/3.png?raw=true" width="300">
</p>
<p align="center">
  <img src="https://github.com/iamyourdre/tweetify/blob/main/4.png?raw=true" width="300">
  <img src="https://github.com/iamyourdre/tweetify/blob/main/5.png?raw=true" width="300">
</p>

## Introduction
Recently, I embarked on a journey to build a Twitter-like application with MERN Stack. This project was both challenging and rewarding, providing me with valuable insights into Full-Stack JavaScript development. Here's a breakdown of the features I implemented and the tech stack I used.

## Features

### User Authentication
- **Sign Up**: Users can create an account by providing their full name, username, password, and gender.
- **Login**: Users can log in using their username and password.
- **Logout**: Users can securely log out of their accounts.

### Posts
- **Create Post**: Users can create new posts with text and images.
- **Repost**: Users can repost content from other users.
- **Comment**: Users can comment on posts.
- **Like**: Users can like and unlike posts.
- **Delete Post**: Users can delete their posts along with any child posts.

### Notifications
- **Real-time Notifications**: Users receive real-time notifications for likes, comments, reposts, and follows.
- **Mark as Read**: Users can mark notifications as read.

### Messaging
- **Real-time Messaging**: Users can send and receive messages in real-time.
- **Conversations**: Users can view their conversations with other users.

### Follow System
- **Follow/Unfollow**: Users can follow and unfollow other users.
- **Followers/Following**: Users can view their followers and the users they are following.

## Tech Stack

### Frontend
- **React**: Used for building the user interface.
- **Zustand**: State management library for managing global state.
- **React Router**: For handling routing in the application.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Socket.io-client**: For real-time communication with the backend.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: Runtime environment for executing JavaScript on the server.
- **Express.js**: Web framework for building the backend API.
- **MongoDB**: NoSQL database for storing user data, posts, messages, and notifications.
- **Mongoose**: ODM library for MongoDB.
- **Socket.io**: For real-time communication between the server and clients.
- **JWT**: For secure authentication using JSON Web Tokens.
- **Multer**: Middleware for handling file uploads.

### DevOps
- **Nodemon**: For automatically restarting the server during development.
- **dotenv**: For managing environment variables.

## Conclusion
Building this Twitter wannabe app was an incredible learning experience. I gained a deeper understanding of full-stack development, real-time communication, and state management. The project also highlighted the importance of a well-structured codebase and efficient state management. I'm excited to continue improving this app and exploring new features and technologies.
