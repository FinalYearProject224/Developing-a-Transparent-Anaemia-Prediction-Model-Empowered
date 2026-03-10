import pandas as pd
import pandas as pd 
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from xgboost import XGBClassifier
import shap
from utils.preprocess_split import load_and_preprocess


labels = ['Not Anemia', 'Anemia']
label_encoder = []

def get_model():   
    X_train, X_test, y_train, y_test = load_and_preprocess(return_full_data=True)
    xg = XGBClassifier(n_estimators=2)
    rf =RandomForestClassifier(n_estimators=2)
    estimators = [('xg', xg), ('rf', rf)]
    #defining hybrid model by combining Random Forest and XGBOOSt 
    hybrid_model = VotingClassifier(estimators = estimators, voting='soft')
    #train model on training features
    hybrid_model.fit(X_train, y_train)
    #call this function to predict on test data
    predict = hybrid_model.predict(X_test)
    #call this function to predict on test data         
    return hybrid_model      


    
def result(gender, hemoglobin, mch, mchc, mcv):
    print("Processing input data...")

    # Load training dataset
    dataset = pd.read_csv("Dataset/anemia.csv")
    dataset.fillna(dataset.mean(), inplace=True)

    X_original = dataset.drop(['Result'], axis=1)
    Y = dataset['Result'].astype(int).values
    feature_names = X_original.columns.tolist()

    # Load trained model
    hybrid_model = get_model()

    # Scaling
    scaler = StandardScaler()
    scaler.fit(X_original.values)

    # User input (ORIGINAL VALUES)
    input_df = pd.DataFrame(
        [[gender, hemoglobin, mch, mchc, mcv]],
        columns=['Gender', 'Hemoglobin', 'MCH', 'MCHC', 'MCV']
    )

    # Scale for model prediction
    scaled_input = scaler.transform(input_df.values)

    # Prediction
    prediction = hybrid_model.predict(scaled_input)[0]

    # Confidence Score
    proba = hybrid_model.predict_proba(scaled_input)[0]
    confidence = round(max(proba) * 100, 2)

    # ======= FIXED SHAP FOR VOTING CLASSIFIER ======= #

    # SHAP must use original input, not scaled
    background = X_original.sample(50, random_state=42).values  

    def model_proba_original(x):
        # scale inside the function
        scaled = scaler.transform(x)
        return hybrid_model.predict_proba(scaled)

    explainer = shap.KernelExplainer(model_proba_original, background)
 
    shap_values = explainer.shap_values(input_df.values)

    shap_scores = shap_values[prediction][0]   # SHAP for predicted class

    explanation = dict(zip(feature_names, [round(v, 4) for v in shap_scores]))
    # Sort SHAP values by importance (absolute value)
    sorted_items = sorted(explanation.items(), key=lambda x: abs(x[1]), reverse=True)

    # Prepare colored explanation
    colored_explanation = []
    max_val = abs(sorted_items[0][1])  # highest impact

    for feature, value in sorted_items:
        impact = abs(value)

        if impact == max_val:
            color = "green"       # highest feature
        elif impact >= max_val * 0.50:
            color = "yellow"      # medium feature
        else:
            color = "red"         # lowest feature

        colored_explanation.append({
            "feature": feature,
            "value": value,
            "color": color
        })
    print("Prediction:", prediction)
    print("Confidence:", confidence)
    print("Explanation:", explanation)
    return prediction, confidence, colored_explanation
  

  
