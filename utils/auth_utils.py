# auth_utils.py
import sqlite3
from flask import redirect, request, render_template, jsonify,session, url_for
from flask_login import login_required, current_user  
DB_PATH = 'signup.db'

# Initialize the database and ensure the table exists
def init_db():
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                user TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        ''')
        con.commit()

init_db()

def signup():
    try:
        # Get POST form data
        data = request.get_json()
        username = data.get("username", "").strip()
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        
        if not username or not name or not email or not password:
            return render_template("/user/user_register.html")

        # Insert user into DB
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO info (name, email, user, password) VALUES (?, ?, ?, ?)",
                (name, email, username,  password)
            )
            con.commit()

        return jsonify({"status": "success"})
    except sqlite3.IntegrityError:
            return jsonify({"status": "error"})
    except Exception as e:
        return jsonify({"status": "error"})


def signin():
    try:
        data = request.get_json()
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        if not username or not password:
            return jsonify({"status": "error", "message": "Username and password are required."})

        # Static admin credentials
        if username == 'user' and password == 'user':
            session['user'] = {
                "username": username,
                "name": "Demo User",
                "email": "demo@example.com",
                "role": "admin"
            }
            return jsonify({
                "status": "success",
                "message": "Test User login successful!",
                "user": session['user']
            })

        # Fetch latest user from DB
        with sqlite3.connect(DB_PATH) as con:
            con.row_factory = sqlite3.Row  # get dict-like access
            cur = con.cursor()
            cur.execute("SELECT user, name, email, password FROM info WHERE user = ?", (username,))
            user = cur.fetchone()

        # Validate password
        if user and user["password"] == password:
            user_data = {
                "username": user["user"],
                "name": user["name"],
                "email": user["email"],
                "role": "user"
            }

            # Always store fresh data in session
            session['user'] = user_data

            return jsonify({
                "status": "success",
                "message": "User login successful!",
                "user": user_data  # return directly to frontend
            })
        else:
            return jsonify({"status": "error", "message": "Invalid credentials. Please try again."})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})


def edit_profile():
    if 'user' not in session:
        return jsonify({"status": "error", "message": "User not logged in"}), 401

    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    username = data.get('username', '').strip()

    if not all([name, email, username]):
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    try:
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute("""
                UPDATE info
                SET name = ?, email = ?, user = ?
                WHERE user = ?
            """, (name, email, username, session['user']['username']))
            con.commit()

        # Update session data
        session['user'].update({
            "username": username,
            "name": name,
            "email": email
        })

        # Prepare user data to send back
        updated_user = {
            "username": username,
            "name": name,
            "email": email
        }
        print(updated_user)

        return jsonify({
            "status": "success",
            "message": "Profile updated successfully!",
            "user_data": updated_user
        })

    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "message": "Username already exists!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

def get_all_users():
    try:
        with sqlite3.connect(DB_PATH) as con:
            con.row_factory = sqlite3.Row
            cur = con.cursor()
            cur.execute("SELECT id, name, email, user AS username FROM info")
            users = [dict(row) for row in cur.fetchall()]

        if not users:
            return jsonify({
                "status": "success",
                "message": "No users found.",
                "users": []
            })

        return jsonify({
            "status": "success",
            "message": "Users fetched successfully!",
            "users": users
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


def change_password():
    if 'user' not in session:
        return jsonify({"status": "error", "message": "User not logged in"}), 401

    data = request.get_json()
    old_password = data.get('old_password', '').strip()
    new_password = data.get('new_password', '').strip()
    confirm_password = data.get('confirm_password', '').strip()

    # Validation
    if not all([old_password, new_password, confirm_password]):
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    if new_password != confirm_password:
        return jsonify({"status": "error", "message": "New passwords do not match"}), 400

    try:
        with sqlite3.connect(DB_PATH) as con:
            cur = con.cursor()
            # Verify current password
            cur.execute("SELECT password FROM info WHERE user = ?", (session['user']['username'],))
            result = cur.fetchone()

            if not result or result[0] != old_password:
                return jsonify({"status": "error", "message": "Old password is incorrect"}), 400

            # Update to new password
            cur.execute("UPDATE info SET password = ? WHERE user = ?", (new_password, session['user']['username']))
            con.commit()

        return jsonify({"status": "success", "message": "Password updated successfully!"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500



def logout():
    session.pop('user', None)
    return redirect(url_for('user.user_login'))
