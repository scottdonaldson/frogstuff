import sys
import requests
import boto # AWS python SDK
from boto.s3.key import Key

# CONFIG
url = 'http://localhost/frogstuff/' # local endpoint
bucket_name = 'bestfinestwedding.com'

S3 = boto.connect_s3()
bucket = S3.get_bucket(bucket_name)

html = [
	'index.php',
	'404.php'
]

for slug in html:

	r = requests.get( url + slug + '/?deploy=true&deploy-url=http://' + bucket_name)

	print 'deploying ' + slug

	k = Key(bucket)
	k.key = slug.replace('.php', '.html')
	k.content_type = 'text/html'
	k.set_contents_from_string(r.content)

css = [
	'css/style.css'
]

for slug in css:

	r = requests.get( url + slug )

	print 'deploying ' + slug

	k = Key(bucket)
	k.key = slug
	k.content_type = 'text/css'
	k.set_contents_from_string(r.content)

js = [
	'js/main.js'
]

for slug in js:

	r = requests.get( url + slug )

	print 'deploying ' + slug

	k = Key(bucket)
	k.key = slug
	k.content_type = 'application/x-javascript'
	k.set_contents_from_string(r.content)
