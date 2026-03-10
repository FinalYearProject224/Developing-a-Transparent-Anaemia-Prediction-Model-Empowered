import pandas as pd
import numpy as np

def analyze_dataset(file_path="Dataset/anemia.csv"):
    try:
        df = pd.read_csv(file_path)
        df.fillna(0, inplace=True)

        summary = {
            "rows": df.shape[0],
            "columns": df.shape[1],
            "missing_values": int(df.isnull().sum().sum()),
            "duplicates": df.duplicated().sum(),
            "numeric_cols": len(df.select_dtypes(include=np.number).columns),
            "categorical_cols": len(df.select_dtypes(exclude=np.number).columns),
        }

        # Column-level info
        column_info = []
        for col in df.columns:
            column_info.append({
                "name": col,
                "dtype": str(df[col].dtype),
                "unique": df[col].nunique(),
                "missing": df[col].isnull().sum(),
                "sample": ", ".join(df[col].astype(str).unique()[:3])  # first 3 samples
            })

        # For chart section (frontend can visualize)
        numeric_data = df.describe().to_dict()

        return df.head(10).to_html(
            classes='table table-bordered table-striped', index=False), summary, column_info, numeric_data

    except Exception as e:
        return f"<p class='text-danger'>Error: {str(e)}</p>", None, None, None
