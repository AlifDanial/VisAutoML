import pandas as pd
import math
from ydata_profiling import ProfileReport

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
    
    # json_data = file.to_json(orient="records")
    json_data = []
    for row in file:
        json_data.append(row)
    profile = ProfileReport(
        file,
        title="Analyzed Data",
        samples=None,
        correlations=None,
        interactions=None, 
        progress_bar = True,
        html={"navbar_show": False,
              "minify_html": True,}
    ).to_html()
    return {"result": result, "fileFitForUse": fileFitForUse, "rows": rows, "columnsLength": len(columns), "columns": columns, "unfitColumns": fit_for_use.count(False), "unfitRows": nullRows, "histogram": file, "profile":profile}
