import os
import traceback

from rest_framework import viewsets, status, decorators
from rest_framework.response import Response
from .serializers import ModelSerializer, ModelDescriptionSerializer
from .models import Model, ModelDescription
from .review import get_review
from .regression_custom_explainer import finishing
from django.shortcuts import render
from multiprocessing import Process
import threading
from .dashboard import runModel
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# import openai

def index(request):
    # print(request)
    # return request
    return render(request, "machine_learning/index.html")

def dashboard(request, pk):
    print("dashboard >>")

    os.system("npx kill-port 8050")
    runModel(pk)
    return "Success"

# @api_view(['POST'])
# def chatbot_response(request):
#     user_input = request.data.get('question')

#     # Make sure to handle exceptions and errors appropriately

#     response = openai.Completion.create(
#       engine="text-davinci-003",
#       prompt=user_input,
#       max_tokens=150
#     )

#     return JsonResponse({'response': response.choices[0].text})

class ModelViewSet(viewsets.ViewSet):

    def list(self, request):
        models = Model.objects.all().order_by('-id')
        print("Getting models >>>",models)
        serializer = ModelSerializer(models, many=True)
        return Response(serializer.data)

    def create(self, request):
        try:
            serializer = ModelSerializer(data=request.data)
            if serializer.is_valid():
                print("saving....", request.data)
                model = serializer.save()
                global saved_id
                saved_id = model.id
                print("Saved --------")
                result = get_review(model.data_set.path)
                
                description = ModelDescription.objects.create(
                    model=model, description={})
                description_serializer = ModelDescriptionSerializer(description)
                
                # about_to_finish = finishing()
                # print(about_to_finish)

                return Response(
                    {"response": result, 
                     "model": serializer.data, 
                     "description": description_serializer.data
                     })
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            traceback.print_exc()

    def destroy(self, request, pk):
        Model.objects.get(id=pk).delete()
        models = Model.objects.all().order_by('-id')
        serializer = ModelSerializer(models, many=True)
        return Response(serializer.data)
    
    def open(self, request, pk):
        print("dashboard >>>>>", pk)

        os.system("npx kill-port 8050")
        os.system('explainerdashboard run '+pk+'.yaml --no-browser')
        # os.system("explainerdashboard run explainer.joblib")

        return Response({"response":"Success"})


class ModelDescriptionViewSet(viewsets.ViewSet):

    def update(self, request, pk):
        description = ModelDescription.objects.get(id=pk)
        serializer = ModelDescriptionSerializer(description, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FlaskModelViewSet(viewsets.ViewSet):
    # {"model": 12, "id_column": "Survived", "prediction_column": "PassengerId", "not_to_use_columns": ["Name"],
    #        "projectTitle": "test", "algo": "", "auto": 1, "unit": "", "description": 12}
    def list(self, request):
        models = Model.objects.all().order_by('-id')
        for each_item in models:
            if each_item.model_type == "RG":
                each_item.model_type = "Regression"
            else:
                each_item.model_type = "Classification"
        serializer = ModelSerializer(models, many=True)
        return Response(serializer.data)

    def create(self, request):
        try:
            model_obj = Model.objects.get(id=request.data["model"])
            model_id = request.data["model"]
            model = model_obj.model_type
            description_obj = ModelDescription.objects.get(id=request.data["description"])
            train_csv_path = model_obj.data_set
            project_title = request.data["projectTitle"]
            auto = request.data["auto"]
            algo = request.data["algo"]
            model_obj.algorithm_name = algo
            model_obj.save()
            if algo == "":
                algo = "auto"
            if request.data["id_column"] == "":
                id_column = "null"
            else:
                id_column = request.data["id_column"]
            if request.data["prediction_column"] == "":
                predict = "null"
            else:
                predict = request.data["prediction_column"]
            if request.data["not_to_use_columns"]:
                drop = request.data["not_to_use_columns"]
            else:
                drop = ["null"]

            descriptions = description_obj.description
            unit = "null"
            label0 = "null"
            label1 = "null"
            split = "null"
            if "unit" in request.data:
                if request.data["unit"] != "":
                    unit = request.data["unit"]
            if "label0" in request.data:
                if request.data["label0"] != "":
                    label0 = request.data["label0"]
            if "label1" in request.data:
                if request.data["label1"] != "":
                    label1 = request.data["label1"]
            if "split" in request.data:
                if request.data["split"] != "":
                    split = request.data["split"]
            print(request.data)
            # linux
            # p = Process(target=self.run,
            #                      args=(
            #                          train_csv_path, project_title, auto, id_column, predict, drop, descriptions, algo,
            #                          model_id,
            #                          model, unit, label0, label1))

            # windows
            p = threading.Thread(target=self.run,
                                 args=(
                                     train_csv_path, project_title, auto, id_column, predict, drop, descriptions, algo,
                                     model_id,
                                     model, unit, label0, label1, split))
            print("thread+++++++++++")
            p.start()
            p.join()
            return Response(data={"message": "success"}, status=status.HTTP_200_OK)
        except Exception as e:
            traceback.print_exc()

    def run(self, train_csv_path, project_title, auto, id_column, predict, drop, descriptions, algo, model_id, model,
            unit, label0, label1, split):
        ""
        # linux
        # os.system("kill -9 `lsof -t -i:8050`")
        # windows
        print("Model id >>", model_id)
        os.system("npx kill-port 8050")
        if model in ['CL']:
            print("view--------------------")
            os.system(
                'python machine_learning/classifier_custom_explainer.py ' + str(
                    train_csv_path) + ' ' +'"'+ project_title +'"'+ ' ' + str(
                    auto) + ' ' +'"'+ id_column +'"'+ ' ' +'"'+ predict +'"'+ ' ' + '"' + str(drop) + '"' + ' ' +'"'+ str(
                    descriptions) +'"'+ ' ' + str(algo) + ' ' + str(model_id) + ' ' +'"'+ str(label0) +'"'+ ' ' +'"'+ str(label1) +'"'+ ' ' + '"' + str(split) + '"')
            print("end+++++++++++")
        else:
            os.system(
                'python machine_learning/regression_custom_explainer.py ' + str(
                    train_csv_path) + ' ' +'"'+ project_title +'"'+ ' ' + str(
                    auto) + ' ' +'"'+ id_column +'"'+ ' ' +'"'+ predict +'"'+ ' ' + '"' + str(drop) + '"' + ' ' +'"'+ str(
                    descriptions) +'"'+ ' ' + str(algo) + ' ' + str(model_id) + ' ' +'"'+ str(unit) +'"'+ ' ' + '"' + str(split) + '"')
