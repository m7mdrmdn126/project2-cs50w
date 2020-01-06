from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_socketio import SocketIO, emit
from flask_session import Session
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


channels = []



# the index page where all the thing are done
@app.route("/")
def index():
    username = session.get('user')
    if username is None:
        return redirect(url_for('login'))

    return render_template("index.html")



# login route and saving the username in a session
@app.route("/login", methods =['GET', 'POST'])
def login():
    if request.method == 'POST' :
        username = request.form.get("username")
        session["user"] = username
        return redirect(url_for('index'))
    if session.get("user") is None :
        return render_template("login.html")
    else:
        return "you have been alredy logged in"





# the server route where we can make a new channel
@app.route("/create", methods=["POST", "GET"])
def create():
    user = session.get("user")
    channel_name = request.form.get("room_name")
    chat = []
    channels.append(channel_name)
    message = f"{user} has been created this channel"

    return jsonify({"name":channel_name, "chat":chat, "message":message})


# this function working on request from client side code to make the user join the room 
@app.route("/join_room", methods = ['POST', 'GET'])
def join_room():
    channel_name = request.form.get("room_name")

    if channel_name not in channels :
        return jsonify({"success":False})

    return jsonify({"success":True})








@app.route("/logout")
def logout():
    session["user"] = None
    return redirect(url_for('index'))






if __name__ == "__main__" :
    app.run()
