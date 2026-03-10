ALGORITHMS = {
    "Existing": "Decision Tree",
    "Proposed": "Gradient Boosting",
    "Extension": "Voting Classifier"
}
def get_algo(name):
    return ALGORITHMS.get(name)
