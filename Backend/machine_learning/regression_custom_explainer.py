import ast
import json
import sqlite3
import sys
import os

from sklearn.ensemble import RandomForestClassifier, BaggingClassifier, ExtraTreesClassifier, GradientBoostingRegressor, RandomForestRegressor, AdaBoostClassifier, GradientBoostingClassifier, BaggingRegressor, ExtraTreesRegressor

from sklearn.tree import DecisionTreeClassifier
from lightgbm import LGBMClassifier
from xgboost.sklearn import XGBClassifier
from sklearn.linear_model import LogisticRegression
from explainerdashboard import *
from explainerdashboard.datasets import *
import joblib
from explainerdashboard.custom import *
# import dash_html_components as html
import dash as html
import dash_bootstrap_components as dbc
from explainerdashboard.custom import *
from explainerdashboard import ExplainerDashboard
import pandas as pd
import csv
from pathlib import Path
import pandas as pd
from scipy import stats
import numpy as np
from sklearn.preprocessing import StandardScaler


db_path = 'db.sqlite3'
finish = 0
mapping_json = {
    "LogisticRegression": LogisticRegression,
    "RandomForestClassifier": RandomForestClassifier,
    "GradientBoostingClassifier": GradientBoostingClassifier,
    "DecisionTreeClassifier": DecisionTreeClassifier,
    "LGBMClassifier": LGBMClassifier,
    "XGBClassifier": XGBClassifier,
    "RandomForestRegressor": RandomForestRegressor,
    "GradientBoostingRegressor": GradientBoostingRegressor,
    "BaggingRegressor": BaggingRegressor,
    "ExtraTreesRegressor": ExtraTreesRegressor}

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


def prepare_model(drop, IDColumn):
    df = pd.read_csv(train_csv)
    has_header = csv.Sniffer().has_header(open(train_csv).read(2048))

    # id column set
    if (IDColumn != ""):        
        df.set_index(IDColumn, drop=True, inplace=True)
        df.index.name = IDColumn
        # IDColumn = IDColumn.replace(' ', '_')

    # predict to columns
    result = predict.replace(' ', '_')

    # convert list drop
    if drop != []:
        converter = lambda x: x.replace(' ', '_')
        drop = list(map(converter, drop))
        drop

    # space to underscore for all headers
    if has_header == False:
        df.columns = ['co_' + str(i + 1) for i in range(len(df.iloc[0].values))]
    df.columns = df.columns.str.replace(' ', '_')

    # drop unused columns
    if drop != []:
        df.drop(columns=drop, axis=1, inplace=True)

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

    catCols = df.select_dtypes("object").columns
    nCols = df.select_dtypes(exclude='object').columns
    catCols = list(set(catCols))
    nCols = list(set(nCols))

    catCols = df.select_dtypes("object").columns
    catCols = list(set(catCols))
    df = pd.get_dummies(df, columns=catCols)

    suitable_columns = find_columns_to_scale_and_normalize(df)
    # df = scale_and_normalize_data(df, suitable_columns)
    # df = handle_skewed_data(df, threshold=0.5)

    df1 = df[[result]]
    df.drop([result], axis=1, inplace=True)
    from sklearn.model_selection import train_test_split
    testingSize = 100-int(split)
    x_train, x_test, y_train, y_test = train_test_split(df, df1, test_size=testingSize, random_state=42, shuffle=True)

    return x_train, x_test, y_train, y_test, catCols

def finishing(finish):    
    a = finish
    return a

def flask_main(x_train, x_test, y_train, y_test, catCols, model_id):
    if auto == 1:
        b = []
        a = [RandomForestRegressor, GradientBoostingRegressor, ExtraTreesRegressor]

        for i in a:
            model = i().fit(x_train, y_train.values.ravel())

            # testing training accuracy
            from sklearn.metrics import mean_squared_error
            from sklearn.metrics import explained_variance_score
            from sklearn.metrics import max_error
            from sklearn.metrics import mean_absolute_error
            from sklearn.metrics import mean_squared_error
            from sklearn.metrics import r2_score

            y_pred = model.predict(x_test)

            # x = model.score(x_test, y_pred)
            # y = mean_squared_error(y_test, y_pred)
            # z = explained_variance_score(y_test, y_pred)
            # z1 = max_error(y_test, y_pred)
            # z2 = mean_absolute_error(y_test, y_pred)
            # z4 = r2_score(y_test, y_pred)
            # v = z1 + y + z2
            # b.append((300 - (v)) / 300 / 0.01)
            # print("Accuracy:", x, "MSE:", y, "EVS:", z, "ME:", z1, "MAE:", z2, "R2:", z4)

            # Calculate metrics
            accuracy = model.score(x_test, y_test)
            mse = mean_squared_error(y_test, y_pred)
            evs = explained_variance_score(y_test, y_pred)
            me = max_error(y_test, y_pred)
            mae = mean_absolute_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)

            if accuracy < 0:
                accuracy=-1*accuracy
            if evs < 0:
                evs=-1*evs
            score = 90 * accuracy + 10 * evs

            # Print results
            print(f"Accuracy: {accuracy}, MSE: {mse}, EVS: {evs}, ME: {me}, MAE: {mae}, R2: {r2}")
            print(f"Score: {score}\n")
            b.append(score)

        print(b)
        init_score = max(b)
        index = b.index(init_score)

        def switch(index):
            if index == 0:
                return [RandomForestRegressor]
            elif index == 1:
                return [GradientBoostingRegressor]
            elif index == 2:
                return [ExtraTreesRegressor]

        print(switch(index))
        automodel = switch(index)
        best_score = max(b)
        print("automodel", automodel)
        automodel_string = str(automodel[0]).split(".")[-1].replace("'>","")

        from sklearn import preprocessing
        import numpy as np

        b = preprocessing.normalize([b])
        smallest = np.min(b)
        # save best score as final best score in home page
        # best_score = ((1 - smallest) / 0.01)
        # print(smallest)
        # print(best_score)
        # if smallest != 1:
        #     best_score=((1 - smallest) / 0.01)

        # latest comment 
        # if smallest < 0:
        #     best_score=((smallest*-1)/ 0.01)
        # else:
        #     best_score=(smallest/0.01)
        # print(smallest)
        # best_score = x
        print(best_score)
        connpath = sqlite3.connect(db_path)
        with connpath as db:
            c = db.cursor()
            data = (str(best_score), model_id)
            sql_update_query = """Update machine_learning_model set overall_score = ? where id = ?"""
            c.execute(sql_update_query, data)
            db.commit()
            data = (str(automodel_string), model_id)
            sql_update_query = """Update machine_learning_model set algorithm_name = ? where id = ?"""
            c.execute(sql_update_query, data)
            db.commit()
        try:
            connpath.close()
        except:
            pass

        for i in automodel:
            model = i().fit(x_train, y_train.values.ravel())
            explainer = RegressionExplainer(model, x_test, y_test,
                                            cats=catCols,
                                            descriptions=descriptions,
                                            units=unit)

            explainer.plot_contributions(0)

            class CustomDashboard(ExplainerComponent):
                def __init__(self, explainer, name=None, **kwargs):
                    super().__init__(explainer, title="Impact")
                    self.shap_summary = ShapSummaryComponent(explainer, name=self.name + "summary",
                                                             hide_title=True, hide_depth=True)
                    self.precision = PrecisionComponent(explainer, name=self.name + "precision",
                                                        hide_cutoff=True, hide_binsize=True,
                                                        hide_binmethod=True, hide_multiclass=True,
                                                        hide_selector=True, hide_title=True, hide_footer=True,
                                                        cutoff=None, hide_depth=True)

                    self.featuredesc = FeatureDescriptionsComponent(explainer, name=self.name + "featuredesc",
                                                                    hide_title=True, hide_subtitle=True)
                    # self.connector = ShapSummaryDependenceConnector(self.shap_summary, self.shap_dependence)
                    self.predictiontab = FeatureInputComponent(explainer, name=self.name + "predictiontab",
                                                               title="What If..",
                                                               subtitle="Adjust the column values to change the prediction",
                                                               hide_index=False, hide_depth=False, fill_row_first=True)
                    self.predictiongraph = ShapContributionsGraphComponent(explainer,
                                                                           name=self.name + "predictiongraph",
                                                                           hide_title=False,
                                                                           subtitle="How has each value contributed to the prediction?",
                                                                           hide_index=False, hide_depth=False,
                                                                           hide_sort=False,
                                                                           feature_input_component=self.predictiontab,
                                                                           hide_selector=False)
                    self.predictioncontrib = ShapContributionsTableComponent(explainer,
                                                                             name=self.name + "predictioncontrib",
                                                                             hide_title=False,
                                                                             subtitle="How has each value contributed to the prediction?",
                                                                             hide_index=False, hide_depth=False,
                                                                             hide_sort=False,
                                                                             feature_input_component=self.predictiontab,
                                                                             hide_selector=False)
                    self.predictionsum = ClassifierPredictionSummaryComponent(explainer,
                                                                              name=self.name + "predictionsum",
                                                                              **kwargs)
                    self.predictionsum1 = ImportancesComponent(explainer, name=self.name + "predictionsum1",
                                                               hide_type=True,
                                                               hide_selector=True, hide_title=True, hide_subtitle=True)

                def layout(self):
                    return dbc.Container([
                        # dbc.Row([
                        #     dbc.Col([
                        #         html.H3("Feature Descriptions"),
                        #         self.featuredesc.layout()
                        #     ], style=dict(margin=20)),
                        #     ], style=dict(margin=20)),
                        dbc.Row([
                            dbc.Col([
                                html.H3("Column Impact"),
                                html.Div(
                                    "Analyze the impact each column has sorted from highest to lowest on the prediction."),
                                html.Div(f"{self.explainer.columns_ranked_by_shap()[0]} had the biggest impact"
                                         f", followed by {self.explainer.columns_ranked_by_shap()[1]}"
                                         f" and {self.explainer.columns_ranked_by_shap()[2]}."),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.predictionsum1.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                html.H3("Individual Value Impact"),
                                html.Div(
                                    "Explore the values from each column that have the greatest and least impact on the prediction."),
                                # self.predictiontab.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.predictiontab.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        # dbc.Row([
                        #     dbc.Col([
                        #         self.predictiongraph.layout()
                        #     ], width=4, style=dict(margin=20)),
                        #     ]),
                        dbc.Row([
                            dbc.Col(self.predictioncontrib.layout(), style=dict(margin=10)),
                            dbc.Col(self.predictiongraph.layout(), style=dict(margin=10)),
                            # dbc.Col([
                            #     self.predictiongraph.layout()
                            # ]),
                        ], style=dict(margin=10)),
                        # dbc.Row([
                        #     dbc.Col([
                        #         html.H3("Prediction Summary"),
                        #         self.predsum.layout()
                        #     ], style=dict(margin=20)),
                        #     ]),
                    ])

            class CustomPredictionsTab(ExplainerComponent):
                def __init__(self, explainer, name=None):
                    super().__init__(explainer, title="Impact Relationship")
                    self.shap_summary = ShapSummaryComponent(explainer, name=self.name + "summary",
                                                             hide_title=True, hide_subtitle=True)
                    self.shap_dependence = ShapDependenceComponent(explainer, name=self.name + "dependence",
                                                                   title="Impact Relationship",
                                                                   subtitle="Relationship between Feature value and Impact value")
                    self.connector = ShapSummaryDependenceConnector(self.shap_summary, self.shap_dependence)

                def layout(self):
                    return dbc.Container([
                        dbc.Row([
                            dbc.Col([
                                html.H3("Link between Columns & Impact"),
                                html.Div("Analyze the relationship each column has on the impact."),
                                html.Div(
                                    "Click on a column in the Impact graph to explore the visualization in the Impact Relationship graph below."),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.shap_summary.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.shap_dependence.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                    ])

            class Interactions(ExplainerComponent):
                def __init__(self, explainer, name=None):
                    super().__init__(explainer, title="Impact Interaction")
                    self.interaction = InteractionSummaryComponent(explainer, name=self.name + "interaction",
                                                                   hide_depth=True)
                    self.interactiond = InteractionDependenceComponent(explainer, name=self.name + "interactiond",
                                                                       hide_depth=True)
                    self.interactioncon = InteractionSummaryDependenceConnector(self.interaction, self.interactiond)

                def layout(self):
                    return dbc.Container([
                        dbc.Row([
                            dbc.Col([
                                html.H3("Deep Dive"),
                                html.Div("Explore the effect of"),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.interaction.layout()
                            ], style=dict(margin=10)),
                        ]),
                        dbc.Row([
                            dbc.Col([
                                html.H3("Feature impact plot"),
                                self.interactiond.layout()
                            ], style=dict(margin=10)),
                        ]),
                    ])

            class Classif(ExplainerComponent):
                def __init__(self, explainer, name=None):
                    super().__init__(explainer, title="Regression Metrics")
                    self.predsum = RegressionModelSummaryComponent(explainer, name=self.name + "predsum",
                                                                   hide_cutoff=True,
                                                                   cutoff=0.5)
                    self.interaction = PredictedVsActualComponent(explainer, name=self.name + "interaction",
                                                                  hide_cutoff=True, cutoff=0.5)
                    self.interactiond = PrecisionComponent(explainer, name=self.name + "interactiond")
                    self.interaction1 = RegressionVsColComponent(explainer, name=self.name + "interaction1")

                def layout(self):
                    return dbc.Container([
                        dbc.Row([
                            dbc.Col([
                                html.H3("Evaluate Regression Model Metrics"),
                                html.Div("Hover onto each metric to understand the regression model performance"),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.predsum.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        # dbc.Row([
                        #     dbc.Col([
                        #         self.interaction.layout()
                        #     ], style=dict(margin=10)),
                        # ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.interaction.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.interaction1.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                    ])

            return explainer, CustomDashboard, CustomPredictionsTab, Classif
    else:
        b = []
        for i in algo:
            model = i().fit(x_train, y_train.values.ravel())

            # testing training accuracy
            from sklearn.metrics import mean_squared_error
            from sklearn.metrics import explained_variance_score
            from sklearn.metrics import max_error
            from sklearn.metrics import mean_absolute_error
            from sklearn.metrics import mean_squared_error
            from sklearn.metrics import r2_score

            y_pred = model.predict(x_test)

            # x = model.score(x_test, y_pred)
            # y = mean_squared_error(y_test, y_pred)
            # z = explained_variance_score(y_test, y_pred)
            # z1 = max_error(y_test, y_pred)
            # z2 = mean_absolute_error(y_test, y_pred)
            # z4 = r2_score(y_test, y_pred)
            # v = z1 + y + z2
            # b.append((300 - (v)) / 300 / 0.01)
            # print("Accuracy:", x, "MSE:", y, "EVS:", z, "ME:", z1, "MAE:", z2, "R2:", z4)

            # Calculate metrics
            accuracy = model.score(x_test, y_test)
            mse = mean_squared_error(y_test, y_pred)
            evs = explained_variance_score(y_test, y_pred)
            me = max_error(y_test, y_pred)
            mae = mean_absolute_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)

            if accuracy < 0:
                accuracy=-1*accuracy
            if evs < 0:
                evs=-1*evs
            score = 90 * accuracy + 10 * evs

            # Print results
            print(f"Accuracy: {accuracy}, MSE: {mse}, EVS: {evs}, ME: {me}, MAE: {mae}, R2: {r2}")
            print(f"Score: {score}\n")
            b.append(score)

            from sklearn import preprocessing
            import numpy as np

            # b = preprocessing.normalize([b])
            # smallest = np.min(b)
            # # save best score as final best score in home page
            # best_score = ((1 - smallest) / 0.01)
            # print(smallest)
            best_score = max(b)
            print(best_score)
            connpath = sqlite3.connect(db_path)
            with connpath as db:
                c = db.cursor()
                data = (str(best_score), model_id)
                sql_update_query = """Update machine_learning_model set overall_score = ? where id = ?"""
                c.execute(sql_update_query, data)
                db.commit()
            try:
                connpath.close()
            except:
                pass

            explainer = RegressionExplainer(model, x_test, y_test,
                                            cats=catCols,
                                            descriptions=descriptions,
                                            units=unit)

            explainer.plot_contributions(0)

            class CustomDashboard(ExplainerComponent):
                def __init__(self, explainer, name=None, **kwargs):
                    super().__init__(explainer, title="Impact")
                    self.shap_summary = ShapSummaryComponent(explainer, name=self.name + "summary",
                                                             hide_title=True, hide_depth=True)
                    self.precision = PrecisionComponent(explainer, name=self.name + "precision",
                                                        hide_cutoff=True, hide_binsize=True,
                                                        hide_binmethod=True, hide_multiclass=True,
                                                        hide_selector=True, hide_title=True, hide_footer=True,
                                                        cutoff=None, hide_depth=True)

                    self.featuredesc = FeatureDescriptionsComponent(explainer, name=self.name + "featuredesc",
                                                                    hide_title=True, hide_subtitle=True)
                    # self.connector = ShapSummaryDependenceConnector(self.shap_summary, self.shap_dependence)
                    self.predictiontab = FeatureInputComponent(explainer, name=self.name + "predictiontab",
                                                               title="What If..",
                                                               subtitle="Adjust the column values to change the prediction",
                                                               hide_index=False, hide_depth=False, fill_row_first=True)
                    self.predictiongraph = ShapContributionsGraphComponent(explainer,
                                                                           name=self.name + "predictiongraph",
                                                                           hide_title=False,
                                                                           subtitle="How has each value contributed to the prediction?",
                                                                           hide_index=False, hide_depth=False,
                                                                           hide_sort=False,
                                                                           feature_input_component=self.predictiontab,
                                                                           hide_selector=False)
                    self.predictioncontrib = PredictionSummaryComponent(explainer, title='Prediction Summary', name=self.name + "predictioncontrib",)
                    self.predictionsum = ClassifierPredictionSummaryComponent(explainer,
                                                                              name=self.name + "predictionsum",
                                                                              **kwargs)
                    self.predictionsum1 = ImportancesComponent(explainer, name=self.name + "predictionsum1",
                                                               hide_type=True,
                                                               hide_selector=True, hide_title=True, hide_subtitle=True)

                def layout(self):
                    return dbc.Container([
                        # dbc.Row([
                        #     dbc.Col([
                        #         html.H3("Feature Descriptions"),
                        #         self.featuredesc.layout()
                        #     ], style=dict(margin=20)),
                        #     ], style=dict(margin=20)),
                        dbc.Row([
                            dbc.Col([
                                html.H3("Column Impact"),
                                html.Div(
                                    "Analyze the impact each column has sorted from highest to lowest on the prediction."),
                                html.Div(f"{self.explainer.columns_ranked_by_shap()[0]} had the biggest impact"
                                         f", followed by {self.explainer.columns_ranked_by_shap()[1]}"
                                         f" and {self.explainer.columns_ranked_by_shap()[2]}."),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.predictionsum1.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                html.H3("Individual Value Impact"),
                                html.Div(
                                    "Explore the values from each column that have the greatest and least impact on the prediction."),
                                # self.predictiontab.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col(self.predictiontab.layout(), style=dict(margin=10)),
                            dbc.Col(self.predictiongraph.layout(), style=dict(margin=10)),
                            # dbc.Col(self.predictioncontrib.layout(), style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        # dbc.Row([
                        #     dbc.Col([
                        #         self.predictiongraph.layout()
                        #     ], width=4, style=dict(margin=20)),
                        #     ]),
                        # dbc.Row([
                            # dbc.Col(self.predictioncontrib.layout(), style=dict(margin=10)),
                        #     # dbc.Col(self.predictiongraph.layout(), style=dict(margin=10)),
                        #     # dbc.Col([
                        #     #     self.predictiongraph.layout()
                            # ]),
                        # ], style=dict(margin=10)),
                        # dbc.Row([
                        #     dbc.Col([
                        #         html.H3("Prediction Summary"),
                        #         self.predsum.layout()
                        #     ], style=dict(margin=20)),
                        #     ]),
                    ])

            class CustomPredictionsTab(ExplainerComponent):
                def __init__(self, explainer, name=None):
                    super().__init__(explainer, title="Impact Relationship")
                    self.shap_summary = ShapSummaryComponent(explainer, name=self.name + "summary",
                                                             hide_title=True, hide_subtitle=True)
                    self.shap_dependence = ShapDependenceComponent(explainer, name=self.name + "dependence",
                                                                   title="Impact Relationship",
                                                                   subtitle="Relationship between Feature value and Impact value")
                    self.connector = ShapSummaryDependenceConnector(self.shap_summary, self.shap_dependence)

                def layout(self):
                    return dbc.Container([
                        dbc.Row([
                            dbc.Col([
                                html.H3("Link between Columns & Impact"),
                                html.Div("Analyze the relationship each column has on the impact."),
                                html.Div(
                                    "Click on a column in the Impact graph to explore the visualization in the Impact Relationship graph below."),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.shap_summary.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.shap_dependence.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                    ])

            class Interactions(ExplainerComponent):
                def __init__(self, explainer, name=None):
                    super().__init__(explainer, title="Impact Interaction")
                    self.interaction = InteractionSummaryComponent(explainer, name=self.name + "interaction",
                                                                   hide_depth=True)
                    self.interactiond = InteractionDependenceComponent(explainer, name=self.name + "interactiond",
                                                                       hide_depth=True)
                    self.interactioncon = InteractionSummaryDependenceConnector(self.interaction, self.interactiond)

                def layout(self):
                    return dbc.Container([
                        dbc.Row([
                            dbc.Col([
                                html.H3("Deep Dive"),
                                html.Div("Explore the effect of"),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.interaction.layout()
                            ], style=dict(margin=10)),
                        ]),
                        dbc.Row([
                            dbc.Col([
                                html.H3("Feature impact plot"),
                                self.interactiond.layout()
                            ], style=dict(margin=10)),
                        ]),
                    ])

            class Classif(ExplainerComponent):
                def __init__(self, explainer, name=None):
                    super().__init__(explainer, title="Regression Metrics")
                    self.predsum = RegressionModelSummaryComponent(explainer, name=self.name + "predsum",
                                                                   hide_cutoff=True,
                                                                   cutoff=0.5, show_metrics=['mean-squared-error','root-mean-squared-error','mean-absolute-error','R-squared'])
                    self.interaction = PredictedVsActualComponent(explainer, name=self.name + "interaction",
                                                                  hide_cutoff=True, cutoff=0.5)
                    self.interactiond = PrecisionComponent(explainer, name=self.name + "interactiond")
                    self.interaction1 = RegressionVsColComponent(explainer, name=self.name + "interaction1")

                def layout(self):
                    return dbc.Container([
                        dbc.Row([
                            dbc.Col([
                                html.H3("Evaluate Regression Model Metrics"),
                                html.Div("Hover onto each metric to understand the regression model performance"),
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.predsum.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        # dbc.Row([
                        #     dbc.Col([
                        #         self.interaction.layout()
                        #     ], style=dict(margin=10)),
                        # ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.interaction.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                        dbc.Row([
                            dbc.Col([
                                self.interaction1.layout()
                            ], style=dict(margin=10)),
                        ], style=dict(margin=10)),
                    ])

            return explainer, CustomDashboard, CustomPredictionsTab, Classif
        

if __name__ == '__main__':
    # variables to be passed
    print(sys.argv[0:])
    train_csv_path = sys.argv[1]
    projecttitle = sys.argv[2]
    catCols = ""
    if sys.argv[3] in [False, "False", "0", 0]:
        auto = 0
    elif sys.argv[3] in [True, "True", 1, "1"]:
        auto = 1
    else:
        auto = int(sys.argv[3])
    algo = sys.argv[8]
    if str(algo) in mapping_json:
        algo = [mapping_json[algo]]
    else:
        algo = [""]
    IDColumn = sys.argv[4]
    if IDColumn == "null":
        IDColumn = ""
    predict = sys.argv[5]
    if predict == "null":
        predict = ""
    model_id = sys.argv[9]
    unit = sys.argv[10]
    if unit == "null":
        unit = ""
    split = sys.argv[11]
    if split == "null":
        split = str(70)
    print(sys.argv[6])

    filename = model_id
    print("Filename >>>", filename)
    drop = ast.literal_eval(sys.argv[6])
    if drop == ["null"]:
        drop = []
    descriptions = json.loads(sys.argv[7])
    train_csv = 'media/' + train_csv_path
    x_train, x_test, y_train, y_test, catCols = prepare_model(drop, IDColumn)
    explainer, CustomDashboard, CustomPredictionsTab, Classif = flask_main(x_train, x_test, y_train, y_test, catCols,
                                                                     model_id)
    

    # Save the joblib file using the constructed path
    print("========================")
    finish = 1
    finishing(finish)

    # explainer.dump(filename+".joblib")
    print("Saved joblib file...")
    # db = ExplainerDashboard(explainer, [
    #     CustomDashboard, CustomPredictionsTab, Classif], boostrap=dbc.themes.FLATLY,
    #                    title=projecttitle, hide_poweredby=True, plot_sample=1000, header_hide_selector=True, hide_header=True)
    db = ExplainerDashboard(
        explainer, 
        boostrap=dbc.themes.LITERA,
        title=projecttitle, 
        hide_poweredby=True, 
        plot_sample=1000, 
        header_hide_selector=True, 
        hide_header=True, 
        shap_interaction=False,
        decision_trees=False,
        hide_pdp=True,
        hide_whatifpdp=True,
        hide_contributiontable=True,
        hide_residuals=True,
        hide_regvscol=True,
        hide_whatifcontributiontable=True,
        hide_log_x=True, # hide x-axis logs toggle on regression plots
        hide_log_y=True, precision='float32', depth=6, 

    )
    
    db.to_yaml(filename+".yaml", explainerfile=filename+".joblib")
    explainer.dump(filename+".joblib")
    # os.system("explainerdashboard run explainer.joblib --no-browser")
    db.run()
