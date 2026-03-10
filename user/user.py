from flask import *

from utils.algorithms import get_algo
from utils.auth_utils import *
from utils.email import send_email
from utils.models import *
from utils.predict import result
import os

from werkzeug.utils import secure_filename


user_bp = Blueprint('user', __name__, url_prefix='/user')

# Dummy credentials
UPLOAD_FOLDER = 'uploads'


ALLOWED_EXTENSIONS = {'txt','csv'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_bp.route('/register')
def user():
    return render_template('user/user_register.html')

@user_bp.route('/registerAction', methods=['POST'])
def user_register():
    if request.method == 'POST':
        return signup()  

@user_bp.route('/login', methods=['GET', 'POST'])
def user_login():
    return render_template('user/user_login.html')


@user_bp.route('/loginAction', methods=['POST'])
def loginAction():
    if request.method == 'POST':
        return signin()

@user_bp.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login_page'))
    user = session['user']
    return render_template('user/user_dashboard.html', user=user)

@user_bp.route('/graph')
def graph():
    exaccuracy, exprecision, exrecall, exfscore = ExistingModel()
    proaccuracy, proprecision, prorecall, profscore = ProposedModel()
    extaccuracy, extprecision, extrecall, extfscore = ExtensionModel()
    
    graph_data = [
        {
            "model": get_algo("Existing"),
            "Accuracy": exaccuracy,
            "Precision": exprecision,
            "Recall": exrecall,
            "F1 Score": exfscore
        },
        {
            "model": get_algo("Proposed"),
            "Accuracy": proaccuracy,
            "Precision": proprecision,
            "Recall": prorecall,
            "F1 Score": profscore
        },
        {
            "model": get_algo("Extension"),
            "Accuracy": extaccuracy,
            "Precision": extprecision,
            "Recall": extrecall,
            "F1 Score": extfscore
        }
    ]

    return render_template("user/graph.html", graph_data=graph_data)

@user_bp.route('/predict')
def predict():
    return render_template('user/predict.html')

@user_bp.route('/predict', methods=['POST'])
def PredictAction():
    try:
        gender = float(request.form['Gender'])
        hemoglobin = float(request.form['Hemoglobin'])
        mch = float(request.form['MCH'])
        mchc = float(request.form['MCHC'])
        mcv = float(request.form['MCV'])

        # Call result()
        prediction, confidence, explanation = result(
            gender, hemoglobin, mch, mchc, mcv
        )

        if prediction == 1:
            result_text = "Anaemia"
            color = "red"
        else:
            result_text = "Not Anaemia"
            color = "green"
        html_body = f"""
        <h2 style='color:#007bff;'>Anaemia Prediction Report</h2>
        <p>Result: <b>{result_text}</b></p>
        <p>Confidence: <b>{confidence}%</b></p>
        """


        send_email(
            sender_email='mydoorlockproj@gmail.com',
            sender_password='opaw qjph hjpv yqji',
            to_email=session['user']['email'],
            subject="Prediction Result",
            body="This is the plain text version of your report.",
            html_body=html_body
        )
        return render_template(
            "/user/predict.html",
            result=result_text,
            color=color,
            confidence=confidence,
            explanation=explanation
        )

    except Exception as e:
        return render_template(
            "/user/predict.html",
            result=f"Error: {str(e)}",
            color="red"
        )

@user_bp.route('/edit_profile', methods=['POST'])
def profile_edit():
    if request.method == 'POST':
        return edit_profile()

@user_bp.route('/change_password', methods=['POST'])
def password_change():
    if request.method == 'POST':
        return change_password()



@user_bp.route('/logout')
def logout_user():
    return logout()
