import sys
import requests
import boto # AWS python SDK
from boto.s3.key import Key

# must accept one argument: www or staging
if len(sys.argv) == 2:
	target = sys.argv[1]
else:
	print 'Specify a target: www or staging'
	sys.exit()

url = 'http://localhost/frogstuff/' # local endpoint
if target == 'www':
	bucket_name = 'bestfinestwedding.com'
elif target == 'staging':
	bucket_name = 'staging.bestfinestwedding.com'

S3 = boto.connect_s3()
bucket = S3.get_bucket(bucket_name)

html = {
	'index.php': 'index.html',
	'rsvp.php': 'rsvp/index.html'
}

for key, value in html.iteritems():

	r = requests.get( url + key + '/?deploy=true&deploy-url=http://' + bucket_name)

	print 'deploying ' + key

	k = Key(bucket)
	k.key = value
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
	'js/output/rsvp.js',
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
	k.key = slug
	k.content_type = 'application/x-javascript'
	k.set_contents_from_string(r.content)
