-- EventEase Database Setup
-- Run these commands in MySQL to set up the database

-- Create database
CREATE DATABASE IF NOT EXISTS eventease_db;
USE eventease_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(200),
    organizer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    event_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (user_id, event_id)
);

-- Insert sample data (optional)
INSERT INTO users (name, email, phone, profile_picture) VALUES
('John Doe', 'john@example.com', '+1234567890', 'default-avatar.jpg'),
('Jane Smith', 'jane@example.com', '+0987654321', 'default-avatar.jpg');

INSERT INTO events (title, description, event_date, event_time, location, organizer_id) VALUES
('Tech Conference 2024', 'Annual technology conference featuring industry leaders', '2024-12-15', '09:00:00', 'Convention Center', 1),
('Art Exhibition', 'Local artists showcase their work', '2024-12-20', '18:00:00', 'Art Gallery', 2);
