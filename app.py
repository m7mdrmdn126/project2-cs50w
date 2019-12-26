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




@app.route("/")
def index():
    return render_template("index.html")




@app.route("/create", methods=["POST", "GET"])
def create():
    channel_name = request.form.get("room_name")
    user = session.get("user")

    chat = []
    users = []
    users.append(user)
    message = f"{user} has been created this channel"
    channels.append(channel_name)

    return jsonify({"name":channel_name, "chat":chat, "users":users, "message":message, "channels":channels})









if __name__ == "__main__" :
    app.run()
