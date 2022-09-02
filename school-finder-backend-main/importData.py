from api.models import School
import json

f = open('extra/out/school_list.json', 'r')
a = json.load(f)

for element in a:
    school = School(name=element.get('name'), level=element.get('level'), address=element.get('address'),
                    postal_code=element.get('postal_code'), latitude=element.get('latitude'),
                    longitude=element.get('longitude'), website_url=element.get('website_url'),
                    email_address=element.get('email_address'), telephone_no=element.get('telephone_no'),
                    ccas=element.get('ccas'), subjects=element.get('subjects'), cutoff=element.get('cutoff'),
                    courses=element.get('courses'))
    school.save()
