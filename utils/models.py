
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier, VotingClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier

from utils.preprocess_split import load_and_preprocess



#function to calculate all metrics
#define global variables to save accuracy and other metrics
accuracy = []
precision = []
recall = []
fscore = []

X_train, X_test, y_train, y_test = load_and_preprocess(return_full_data=True)

def calculateMetrics(algorithm, testY, predict):
    p = round(precision_score(testY, predict,average='macro') * 100,2)
    r = round(recall_score(testY, predict,average='macro') * 100,2)
    f = round(f1_score(testY, predict,average='macro') * 100,2)
    a = round(accuracy_score(testY,predict)*100,2)
    accuracy.append(a)
    precision.append(p)
    recall.append(r)
    fscore.append(f)
    print(algorithm+" Accuracy  : "+str(a))
    print(algorithm+" Precision : "+str(p))
    print(algorithm+" Recall    : "+str(r))
    print(algorithm+" FSCORE    : "+str(f))
    return a,p,r,f
    
    

def ExistingModel():
    #train decision tree algorithm on 80% training features and then apply trained model on 20% test to calculate prediction accuracy
    dt_cls = DecisionTreeClassifier(min_weight_fraction_leaf=0.2)
    #train model on training features
    dt_cls.fit(X_train, y_train)
    #call this function to predict on test data
    predict = dt_cls.predict(X_test)
    #call this function to calculate accuracy and other metrics
    accuracy,precision,recall,fscore= calculateMetrics("Existing DT", y_test, predict)
    return accuracy,precision,recall,fscore

def ProposedModel():
    #train Gradient Boosting algorithm on 80% training features and then apply trained model on 20% test to calculate prediction accuracy
    gb_cls = GradientBoostingClassifier(min_weight_fraction_leaf=0.49, learning_rate=2.4)
    #train model on training features
    gb_cls.fit(X_train, y_train)
    #call this function to predict on test data
    predict = gb_cls.predict(X_test)
    #call this function to calculate accuracy and other metrics

    accuracy,precision,recall,fscore=calculateMetrics("Propose GB Model", y_test, predict)
    return accuracy,precision,recall,fscore

def ExtensionModel():
    #train Hybrid algorithm by combining multple algorithms such as Random Forest and XGBOOSt and then get trained on 80%
#training features and then apply trained model on 20% test to calculate prediction accuracy
#defining base estimators
    xg = XGBClassifier(n_estimators=2)
    rf =RandomForestClassifier(n_estimators=2)
    estimators = [('xg', xg), ('rf', rf)]
    #defining hybrid model by combining Random Forest and XGBOOSt 
    hybrid_model = VotingClassifier(estimators = estimators, voting='hard')
    #train model on training features
    hybrid_model.fit(X_train, y_train)
    #call this function to predict on test data
    predict = hybrid_model.predict(X_test)
    #call this function to predict on test data


    accuracy,precision,recall,fscore=calculateMetrics("Extension Voting WIth Attention Model", y_test, predict)
    return accuracy,precision,recall,fscore