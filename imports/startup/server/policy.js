Meteor.startup(function() {
	var domainBare, domainStaging, domainWWW, trusted, trustedWS, urlBare, urlWWW;
	console.log('Browser Policy Setup');
	console.log(Meteor.absoluteUrl());
	if (Meteor.absoluteUrl().indexOf("gitpod.io") >= 0) {
		BrowserPolicy.framing.allowAll();
		BrowserPolicy.content.allowSameOriginForAll('*');
		BrowserPolicy.content.allowDataUrlForAll('*');
		return BrowserPolicy.content.allowOriginForAll('*');
	} else {
		urlWWW = Meteor.absoluteUrl().replace("http://", "").replace("https://", "").replace("/", "");
		urlBare = urlWWW.replace("www.", "");
		domainBare = Meteor.settings["public"].domainBare;
		domainWWW = "www." + domainBare;
		domainStaging = "staging." + domainBare;
		trustedWS = ['onesignal.com','*.stripe.com','*.onesignal.com' ];
		if (!Meteor.isProduction) {
			ngrok = Meteor.settings["private"].ngrok;
			console.log(`Dev Policy Localhost and NGROK ${ngrok}`)
			trustedWS.push(ngrok);
			trustedWS.push('localhost:3000');
		}
		trustedWS.push(domainBare);
		trustedWS.push(domainWWW);
		trustedWS.push(domainStaging);
		if (urlBare === urlWWW) {
			trustedWS.push(urlBare);
		} else {
			trustedWS.push(urlBare);
			trustedWS.push(urlWWW);
		}
		console.log(trustedWS)
		trustedWS.forEach((origin) => {
			BrowserPolicy.content.allowConnectOrigin("wss://" + origin);
			BrowserPolicy.content.allowConnectOrigin("ws://" + origin);
			BrowserPolicy.content.allowOriginForAll(origin)
		});
		BrowserPolicy.framing.disallow();
		BrowserPolicy.content.allowFrameOrigin("https://*.stripe.com");
		BrowserPolicy.content.allowFrameOrigin("https://*.vimeo.com");
		BrowserPolicy.content.allowFrameOrigin("https://*.cloudinary.com");
		BrowserPolicy.content.allowContentTypeSniffing();
		BrowserPolicy.content.allowInlineScripts();
		BrowserPolicy.content.allowEval();
		BrowserPolicy.content.allowInlineStyles();
		BrowserPolicy.content.allowSameOriginForAll();
		BrowserPolicy.content.allowOriginForAll("blob:");
		BrowserPolicy.content.allowMediaDataUrl();
		BrowserPolicy.content.allowStyleOrigin("https://*.googleapis.com");
		BrowserPolicy.content.allowFontOrigin("https://*.gstatic.com");
		BrowserPolicy.content.allowFontOrigin('https://*.fontawesome.com');
		BrowserPolicy.content.allowImageOrigin("https://*.vimeocdn.com");

		BrowserPolicy.content.allowImageOrigin("https://purecatamphetamine.github.io");

		BrowserPolicy.content.allowImageOrigin("https://*.googleapis.com");
		BrowserPolicy.content.allowImageOrigin("https://*.cloudinary.com");
		BrowserPolicy.content.allowImageOrigin("https://*.gravatar.com");
		BrowserPolicy.content.allowImageOrigin("https://*.placeholder.com");
		BrowserPolicy.content.allowImageOrigin("https://*.googleusercontent.com");
		BrowserPolicy.content.allowImageOrigin("https://*.ggpht.com");
		BrowserPolicy.content.allowMediaOrigin("https://*.cloudinary.com");
		BrowserPolicy.content.allowObjectOrigin("https://*.cloudinary.com");
		BrowserPolicy.content.allowScriptOrigin('https://*.fontawesome.com');
		BrowserPolicy.content.allowScriptOrigin('https://*.googleapis.com');
		BrowserPolicy.content.allowDataUrlForAll();
		console.log('Browser Policy Setup Complete');
	}
});
