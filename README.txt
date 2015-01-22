Aroy Website:
	aroy.us:							#Will redirect all landing page to aroyinnovation.com
	aroyinnovation.com:
		/index.html
		/lang
			/zh-cn						#simplified Chinese
			/zh-hk 						#Traditional Chinese
		/News							#Press release
			/{Date}
			/index.html					#Home Page of press release site
		/src
			/css
				main.css				#For US Version
				main2.css				#For Chinese Version because haven't update the new design yet.
			/img
			/js
				main.js					#For US Version
				main2.js				#For Chinese Version because haven't update the new design yet.

	Subdomain(teaser.aroyinnovation.com):
		/teaser
			/1 						#teaser.aroyinnovation.com/1
				/img
				/index.html
			/src
				/css
				/img
				/js
			/index.php					#Redirect to the latest teaser
