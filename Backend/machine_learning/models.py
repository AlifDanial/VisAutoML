from django.db import models

model_types = [
    ("RG", "Regression"),
    ("CL", "Classification")
]


class Model(models.Model):
    model_name = models.CharField(max_length=100, blank=False, null=False)
    model_type = models.CharField(max_length=2, choices=model_types)
    algorithm_name = models.CharField(max_length=100, blank=True, null=True)
    overall_score = models.DecimalField(
        blank=True, null=True, decimal_places=1, max_digits=4)
    data_set = models.FileField(upload_to="datasets/")

    def __str__(self):
        return self.model_name


class ModelDescription(models.Model):
    model = models.OneToOneField(Model, on_delete=models.CASCADE)
    description = models.JSONField()
