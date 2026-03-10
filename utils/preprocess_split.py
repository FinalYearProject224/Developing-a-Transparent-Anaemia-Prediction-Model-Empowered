# utils/preprocess_split.py
import pandas as pd
import numpy as np
from sklearn.feature_selection import RFE
from sklearn.preprocessing import  StandardScaler  
from sklearn.model_selection import train_test_split

# Cache to avoid multiple loading
DATA_CACHE = {}
labels = ['Not Anemic', 'Anemic']
def load_and_preprocess(dataset_path="Dataset/anemia.csv",
                        pickle_file="model/data.pckl",
                        return_full_data=False,
                        use_cache=True):
    global DATA_CACHE

    if use_cache and DATA_CACHE:
        if return_full_data:
            return (DATA_CACHE['X_train'], DATA_CACHE['X_test'],
                    DATA_CACHE['y_train'], DATA_CACHE['y_test'],
    )
        else:
            return DATA_CACHE['split_info'], DATA_CACHE['label_counts']

    # Load dataset
    dataset = pd.read_csv(dataset_path)

    label_counts = dataset['Result'].value_counts().to_dict()

    #extracting X & Y features from dataset and then replacing missing values with mean and then normalizing dataset features
    dataset.fillna(dataset.mean(), inplace = True)#replace missing values with mean
    Y = dataset['Result'].ravel()
    Y = Y.astype('int')
    dataset.drop(['Result'], axis = 1,inplace=True)
    X = dataset.values
    scaler = StandardScaler()
    X = scaler.fit_transform(X)#normalize features
    print("Normalized Training Features = "+str(X))
    #split dataset features into train (80% & test (20%)
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
    print("Dataset Split Details")
    print("80% dataset features used to train algorithms : "+str(X_train.shape[0]))
    print("20% dataset features used to test algorithms : "+str(X_test.shape[0]))
    



    # Summary info for dashboard
    split_info = {
        "Total Samples": dataset.shape[0],
        "Features": dataset.shape[1],
        "Training Samples": X_train.shape[0],
        "Test Samples": X_test.shape[0],
        "Unique Labels": len(np.unique(Y))
    }

    # Cache data
    DATA_CACHE = {
        "split_info": split_info,
        "label_counts": label_counts,
        "X_train": X_train,
        "X_test": X_test,
        "y_train": y_train,
        "y_test": y_test,
       
    }

    if return_full_data:
        return X_train, X_test, y_train, y_test 
    else:
        return split_info, label_counts
