import sqlite3
from flask import *
from utils.algorithms import get_algo
from utils.auth_utils import DB_PATH, get_all_users
from utils.load_dataset import analyze_dataset
from utils.models import *
from utils.preprocess_split import load_and_preprocess

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

# Dummy credentials
VALID_USERNAME = "admin"
VALID_PASSWORD = "1234"


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('admin/admin_login.html')


@admin_bp.route('/loginAction', methods=['POST'])
def loginAction():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == VALID_USERNAME and password == VALID_PASSWORD:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error"})


@admin_bp.route('/dashboard')
def admin_dashboard():
    return render_template('admin/dashboard.html')

@admin_bp.route('/view_data')
def analyze():
    dataset_html, summary, column_info, numeric_data = analyze_dataset()
    return render_template(
        "admin/view_data.html",
        dataset_html=dataset_html,
        summary=summary,
        column_info=column_info
    )

@admin_bp.route("/preprocess")
def dataset_split():
    split_info,label_counts = load_and_preprocess()  # only summary info for HTML
    return render_template("admin/preprocess.html", 
                           split_info=split_info,
                           label_counts=label_counts)
    
    
@admin_bp.route('/models')
def models():
    global exaccuracy, exprecision, exrecall, exfscore
    global proaccuracy, proprecision, prorecall, profscore
    global extaccuracy, extprecision, extrecall, extfscore
    
    exaccuracy, exprecision, exrecall, exfscore = ExistingModel()
    proaccuracy, proprecision, prorecall, profscore = ProposedModel()
    extaccuracy, extprecision, extrecall, extfscore = ExtensionModel()
    
    existingModel_card = {
        "title": get_algo("Existing"),
        "data": {
            "Accuracy": exaccuracy,
            "Precision": exprecision,
            "Recall": exrecall,
            "F1-Score": exfscore
        }
    }
    proposedModel_card = {
        "title": get_algo("Proposed"),
        "data": {
            "Accuracy": proaccuracy,
            "Precision": proprecision,
            "Recall": prorecall,
            "F1-Score": profscore
        }
    }
    extensionModel_card = {
        "title": get_algo("Extension"),
        "data": {
            "Accuracy": extaccuracy,
            "Precision": extprecision,
            "Recall": extrecall,
            "F1-Score": extfscore
        }
    }
    card_data = [ existingModel_card,proposedModel_card,extensionModel_card ]

    return render_template("admin/models.html", card_data=card_data)


@admin_bp.route('/graph')
def graph():
    # exaccuracy, exprecision, exrecall, exfscore = ExistingModel()
    # proaccuracy, proprecision, prorecall, profscore = ProposedModel()
    # extaccuracy, extprecision, extrecall, extfscore = ExtensionModel()
    
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

    return render_template("admin/graph.html", graph_data=graph_data)

@admin_bp.route("/all_user_list")
def all_users():
    return get_all_users()

@admin_bp.route("/delete/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    with sqlite3.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute("DELETE FROM info WHERE id = ?", (user_id,))
        con.commit()
    return jsonify({"status": "success", "message": "User deleted successfully!"})