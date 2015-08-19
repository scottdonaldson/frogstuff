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
	'savethedate.php'
]

for slug in html:

	r = requests.get( url + slug + '/?deploy=true&deploy-url=http://' + bucket_name + '/dev')

	print 'deploying ' + slug

	k = Key(bucket)
	k.key = 'dev/index.html'
	k.content_type = 'text/html'
	k.set_contents_from_string(r.content)

css = [
	'css/style.css'
]

for slug in css:

	r = requests.get( url + slug )

	print 'deploying ' + slug

	k = Key(bucket)
	k.key = 'dev/' + slug
	k.content_type = 'text/css'
	k.set_contents_from_string(r.content)

js = [
	'js/main.js',
	'js/get-address.js',
	'js/plugins.js',
	'js/vendor/jquery-2.1.3.min.js',
	'js/vendor/modernizr-2.6.2.min.js'
]

for slug in js:

	r = requests.get( url + slug )

	print 'deploying ' + slug

	k = Key(bucket)
	k.key = 'dev/' + slug
	k.content_type = 'application/x-javascript'
	k.set_contents_from_string(r.content)
