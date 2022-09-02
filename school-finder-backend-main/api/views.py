from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from .models import School
from .serializers import SchoolListSerializer, SchoolDetailSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
import requests
import json
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers

# Create your views here.


def schoolList(request):
    school_list = School.objects.all()
    serializer = SchoolListSerializer(school_list, many=True)
    return JsonResponse(serializer.data, safe=False)


def schoolDetail(request, pk):
    try:
        school_detail = School.objects.get(pk=pk)

    except School.DoesNotExist:
        return HttpResponse(status=404)

    serializer = SchoolDetailSerializer(school_detail)
    return JsonResponse(serializer.data)


class schoolFilter(generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = {
        'name': ["icontains"], # icontains ,exact, gte, lte, in
        'level' : ["icontains"] # if you want to add more fields, you can
    }

def getDist(request):
    distance = {}

    if 'From' in request.GET:
        origin = request.GET['From']
        destination = request.GET['To']                                                                                                                                                                   
        apikey = 'AIzaSyCFPRsIG6toBuKsNUWgGPEUVd6gzVBkjVM'
        url = 'https://maps.googleapis.com/maps/api/distancematrix/json?&mode=transit&origins=Singapore' + origin + ',DC&destinations=' + destination + '&key=' + apikey      
        response = requests.get(url)
        distance = response.json()
        print(url)
        print(distance)
    return render(request, 'distance.html', {'distance': distance})


def reset(request):
    School.objects.all().update(distance=-1.0, eta=-1.0)
    return JsonResponse(data='{status: "ready" }', safe=False)

class DistanceView(APIView):

    @method_decorator(cache_page(60*60*30))
    def get(self, request, origin, format=None):

        print(origin)
        origin_dest = origin
        apikey = 'AIzaSyBaMhxZJ3DVcR9PTS7GI1cvRtxZrmEC9hI'
        url1 = 'https://maps.googleapis.com/maps/api/distancematrix/json?region=SG&language=en&mode=transit&origins='
        url2 = '&destinations='
        url3 = '&key='
        i = 1
        j = 1
        elements = []
        while i <= School.objects.all().count():
            old_destination = ''
            count = 0
            while True:
                try:
                    school = School.objects.get(id=i)
                    temp_destination = str(school.address)+', Singapore '+str(school.postal_code)
                    new_destination = old_destination + '|' + temp_destination
                    url = url1+origin_dest+url2+new_destination+url3+apikey
                    if len(url) >= 8192:
                        url = url1+origin_dest+url2+old_destination+url3+apikey
                        break
                    i += 1
                    old_destination = new_destination
                    count += 1
                    if i > School.objects.all().count() or count >= 25:
                        break
                except School.DoesNotExist:
                    pass

            print(url)
            response = requests.get(url).json()
            elements = elements + response.get('rows')[0].get('elements')

        print(len(elements))
        schools = School.objects.all()
        for school in schools:
            element = elements[school.id-1]
            if 'distance' in element.keys():
                distance = element.get('distance').get('value')
                eta = element.get('duration').get('value')
            else:
                distance = -1
                eta = -1
            school.distance = round(distance, 2)
            school.eta = round(eta / 60.0, 2)
            school.save()

        # School.objects.bulk_update(schools, ['distance', 'eta'])

        school_list = School.objects.all()
        serializer = SchoolListSerializer(school_list, many=True)
        return JsonResponse(serializer.data, safe=False)
