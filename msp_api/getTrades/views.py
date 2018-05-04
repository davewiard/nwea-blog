# render is not needed when the app is returning JSON
# from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection


def getTradeData():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM trade")
        row = cursor.fetchone()
        return 


def index(request):
    # get and print one row from the Trade table
    getTradeData()

    # return a hard-coded JSON-encoded string
    d = {'name': 'value'}
    return JsonResponse(d)

    # to render an HTML page from a template:
    # return render(request, 'index.html')
