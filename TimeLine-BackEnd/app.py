from flask import Flask, jsonify, request, g
import sqlite3
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Database file path
DB_FILE = 'database.db'

# Create the database file if it doesn't exist
if not os.path.exists(DB_FILE):
    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
    conn.execute('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, image_url TEXT, date_hash INTEGER)')
    conn.close()

# Database connection
conn = sqlite3.connect(DB_FILE, check_same_thread=False)

# Routes
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/events', methods=['GET'])
def get_events():
    cursor = conn.execute('SELECT * FROM events ORDER BY date_hash ASC')
    events = [{'id': row[0], 'title': row[1], 'description': row[2], 'date': row[3], 'image_url': row[4], 'date_hash': row[5]} for row in cursor.fetchall()]
    return jsonify(events)

@app.route('/events', methods=['POST'])
def create_event():
    event = request.get_json()
    title = event.get('title')
    description = event.get('description')
    date = event.get('date')
    image_url = event.get('image_url')
    date_hash = date.replace('-', '')[4:8] + date.replace('-', '')[0:4]
    conn.execute('INSERT INTO events (title, description, date, image_url, date_hash) VALUES (?, ?, ?, ?, ?)', (title, description, date, image_url, date_hash))
    conn.commit()
    return jsonify({'message': 'Event created successfully'})

if __name__ == '__main__':
    app.run(debug=True)

