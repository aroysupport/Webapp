#/usr/bin/env python
from __future__ import division
from __future__ import absolute_import
from __future__ import print_function
#from __future__ import unicode_literals

import shutil
import os
import sys
import uuid
from os.path import join, splitext

# import image processing, scale, reduce quality ...etc
#from PIL import Image

from boto.s3.connection import S3Connection
from boto.s3.key import Key

# aws power user access and secret keys
PUSER_ACC_KEY = 'AKIAI5X2RVWKHK4SX6PQ'
PUSER_SEC_KEY = 'xgXMKSlibxt/24GWVtByiATaQ6iZqxSe5s6OJ9Le'
BUCKET = "test.aroy"
S3_END_POINT = "http://s3-us-west-2.amazonaws.com"


# rename and reduce the image quality
sourcefile = sys.argv[1];

source = os.path.dirname(os.path.abspath(sourcefile))
sourcefilename = os.path.basename(os.path.abspath(sourcefile))
destination = os.path.abspath(sys.argv[2])

if not os.path.exists(destination): os.makedirs(destination)

id = uuid.uuid4()
ext = splitext(sourcefilename)[1]
newname = str(id) + ext.lower();

resizedfile = os.path.join(destination,sourcefilename)
movetofile = os.path.join(destination, newname)

# disable reduce image quality for now.
#im = Image.open(sourcefile)
#im.save(resizedfile, optimize=True, quality=75)

#os.rename(sourcefile, movetofile)
shutil.copy2(sourcefile, movetofile);


conn = S3Connection(PUSER_ACC_KEY, PUSER_SEC_KEY)
b = conn.get_bucket('test.aroy')
k = Key(b)
k.key = newname
k.set_contents_from_filename(movetofile, replace=False, encrypt_key=True)
b.set_acl('public-read', newname)

print (S3_END_POINT+"/"+BUCKET+"/"+newname)
os.remove(movetofile)
