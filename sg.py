from flask import Flask, url_for, request, render_template, send_file, jsonify, after_this_request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import string
import random
import json
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    trackTemp = db.Column(db.Integer, nullable=False)
    car = db.Column(db.String(5), nullable=False)
    track = db.Column(db.String(5), nullable=False)
    setupNotes = db.Column(db.String(161), nullable=False)
    setup_file = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.trackTemp}', '{self.car}', '{self.track}', '{self.setupNotes}', '{self.setup_file}')" 

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        req = request.form
        uplBool = req['uplBool']
        if uplBool == "yes":
            username = req['username']
            trackTemp = req['tracktemp']
            car = req['car']
            track = req['track']
            setupNotes = req['setupNotes']
            setup = request.files['file']
            if not setup:
                return "No setup uploaded", 400
            setupName = secure_filename(setup.filename)
            print(username, trackTemp, car, track, setupName)
            new_setup = User(username=username, trackTemp=trackTemp, car=car, track=track, setupNotes=setupNotes, setup_file=json.loads((setup).read()))
            db.session.add(new_setup)
            db.session.commit()
            return render_template("uploads.html")
        if uplBool == "no":
            carG = req['carLoad']
            trackG = req['trackLoad']
            if (not carG or not trackG):
                return render_template("index.html")
            else:
                return redirect(url_for('allsetups', carArg=carG, trackArg=trackG))
    return render_template('index.html')
    
@app.route('/allsetups/<carArg>/<trackArg>', methods=['GET','POST'])
def allsetups(carArg, trackArg):
        return render_template('allsetups.html', items=User.query.filter_by(car=carArg, track=trackArg))

@app.route('/about', methods=['GET','POST'])
def about():
        return render_template('about.html')

@app.route('/guides', methods=['GET','POST'])
def guides():
        return render_template('guides.html')

@app.route('/download/<int:id>', methods=['GET'])
def download(id):
    item = User().query.filter_by(id=id).first()
    filename = "SG by-"+item.username+" car_track- " +item.car+"_"+item.track+".json"
    print (filename)
    downfile = open(filename, "w+")
    json.dump(item.setup_file, downfile)
    downfile.close()
    todownload = "./"+filename
    @after_this_request
    def remove_file(response):
        try:
            os.remove(filename)
            downfile.close()
        except Exception as error:
            app.logger.error("Err. removign or closing the file", error)
        return(response)
    return send_file(todownload, as_attachment=True)

@app.errorhandler(404)
def not_found(error):
    return "Oooops, wrong page mate, me or you messed up something.", 404

if __name__ == "__main__":
    db.create_all()
    app.run(host='0.0.0.0', debug=True)