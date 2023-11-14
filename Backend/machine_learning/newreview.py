import pandas as pd
import math
from ydata_profiling import ProfileReport
import pandas as pd
from scipy import stats
import numpy as np
from sklearn.preprocessing import StandardScaler


def find_columns_to_scale_and_normalize(df, skew_threshold=1.0, std_dev_threshold=2.0):
    """
    Identify numerical columns suitable for scaling and normalization based on data distribution.

    Parameters:
    - df (DataFrame): The Pandas DataFrame containing the data.
    - skew_threshold (float): The threshold for skewness to identify right-skewed columns (default is 1.0).
    - std_dev_threshold (float): The threshold for standard deviation to identify columns with wide variations (default is 2.0).

    Returns:
    - list: A list of column names suitable for scaling and normalization.
    """
    suitable_columns = []

    for column_name in df.select_dtypes(include=['number']):
        # Calculate the skewness of the column
        skewness = stats.skew(df[column_name])

        # Calculate the standard deviation of the column
        std_dev = df[column_name].std()

        # Check if the column is right-skewed and has wide variations
        if skewness > skew_threshold and std_dev > std_dev_threshold:
            suitable_columns.append(column_name)

    return suitable_columns

def scale_and_normalize_data(df, columns_to_scale, normalization_range=(0, 1)):
    """
    Scale and normalize specified numerical columns in a DataFrame.

    Parameters:
    - df (DataFrame): The Pandas DataFrame containing the data.
    - columns_to_scale (list): A list of column names to be scaled and normalized.
    - normalization_range (tuple): A tuple specifying the desired range for normalization (default is [0, 1]).

    Returns:
    - DataFrame: A new DataFrame with specified columns scaled and normalized.
    """
    # Create a copy of the original DataFrame
    df_scaled_normalized = df.copy()

    # Initialize the StandardScaler
    scaler = StandardScaler()

    # Scale and normalize the specified columns
    for column_name in columns_to_scale:
        # Scale the column using StandardScaler
        df_scaled_normalized[column_name] = scaler.fit_transform(df_scaled_normalized[[column_name]])

        # Normalize the scaled values to the desired range
        min_range, max_range = normalization_range
        min_value = df_scaled_normalized[column_name].min()
        max_value = df_scaled_normalized[column_name].max()
        df_scaled_normalized[column_name] = ((df_scaled_normalized[column_name] - min_value) / (max_value - min_value)) * (max_range - min_range) + min_range

    return df_scaled_normalized

def handle_skewed_data(df, threshold=0.5):
    """
    Handle skewed data by applying logarithmic transformation to positively skewed columns.

    Parameters:
    - df (DataFrame): The Pandas DataFrame containing the data.
    - threshold (float): The threshold for skewness. Columns with skewness above this threshold will be transformed (default is 0.5).

    Returns:
    - DataFrame: A new DataFrame with skewed data transformed.
    """
    # Calculate skewness for each numeric column
    skewness = df.select_dtypes(include=['number']).apply(lambda x: x.skew())

    # Identify columns with skewness above the threshold
    skewed_columns = skewness[skewness > threshold].index

    # Apply logarithmic transformation to positively skewed columns
    for col in skewed_columns:
        if df[col].min() > 0:  # Ensure all values are positive to avoid undefined log(0)
            df[col] = np.log1p(df[col])

    return df

def preprocessdata(file):
    df = file
    print("Preprocess for Comparison")

    cols = df.columns
    cols_dtypes = df.dtypes
    is_null = df.isnull().any()
    null_cols = []
    for col in cols:
        if is_null[col] == True:
            null_cols.append(col)
            if cols_dtypes[col] == 'float':
                df[col].fillna(df[col].mean(), inplace=True)
            else:
                df[col].fillna(df[col].mode()[0], inplace=True)
    df.drop_duplicates(inplace=True)

    # catCols = df.select_dtypes("object").columns
    # nCols = df.select_dtypes(exclude='object').columns
    # catCols = list(set(catCols))
    # nCols = list(set(nCols))

    # catCols = df.select_dtypes("object").columns
    # catCols = list(set(catCols))
    # df = pd.get_dummies(df, columns=catCols)

    suitable_columns = find_columns_to_scale_and_normalize(df)
    df = scale_and_normalize_data(df, suitable_columns)
    df = handle_skewed_data(df, threshold=0.5)
    betterReport = ProfileReport(
        df,
        title="Cleaned Data",
        samples=None,
        correlations=None,
        interactions=None, 
        progress_bar = True,
        html={"navbar_show": False,
              "minify_html": True,}
    )

    return betterReport


def get_review(file):
    file = pd.read_csv(file)
    print(file)
    empty_percentage = file.isnull().mean()*100
    empty = empty_percentage.to_dict()
    res = file.dtypes.to_frame('dtypes').reset_index()
    types = res.set_index('index')['dtypes'].astype(str).to_dict()
    columns = file.columns
    rows = len(file)
    result = []
    fit_for_use = []
    histogram = {}
    for column in columns:
        data = {"name": column, "empty": math.floor(empty[column]), "fit_for_use": math.floor(
            empty[column]) <= 5, "type": types[column]}
        result.append(data)
        fit_for_use.append(math.floor(
            empty[column]) <= 5)
        if types[column] == "int64":
            histogram[column] = file[column].value_counts().to_dict()
    fileFitForUse = fit_for_use.count(True) > 3 and (rows >= (len(columns)*30))
    

    file = file.fillna('')
    nullRows = file.isna().any(axis=1).sum()
    print(f"nullRows: {nullRows}")
    
    betterReport = preprocessdata(file)
    # json_data = file.to_json(orient="records")
    json_data = []
    for row in file:
        json_data.append(row)
    # Use the loaded configuration in your ProfileReport
    profile = ProfileReport(
        file,
        title="Uncleaned Data",
        samples=None,
        correlations=None,
        interactions=None, 
        progress_bar = True,
        html={"navbar_show": False,
              "minify_html": True,}
    )

    
    comparison_report = profile.compare(betterReport)
    nprofile = comparison_report.to_html()
    return {"result": result, "fileFitForUse": fileFitForUse, "rows": rows, "columnsLength": len(columns), "columns": columns, "unfitColumns": fit_for_use.count(False), "unfitRows": nullRows, "histogram": file, "profile":nprofile}
