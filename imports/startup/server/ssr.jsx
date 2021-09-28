import React from "react"
import { renderToString } from "react-dom/server"
import App from "../../ui/both/App"
import { LoadableCaptureProvider, preloadAllLoadables } from 'meteor/npdev:react-loadable'
import { ServerStyleSheet } from "styled-components"
import { FastRender } from "meteor/communitypackages:fast-render"

preloadAllLoadables().then(() => {
	FastRender.onPageLoad( (sink) => {
		const loadableHandle = {};
		const sheet = new ServerStyleSheet();
		const helmetContext = {};
		const html = renderToString(
			sheet.collectStyles(
				<LoadableCaptureProvider handle={loadableHandle}>
					<App location={sink.request.url} context={helmetContext} />
				</LoadableCaptureProvider>
			)
		);
		// Grab the CSS from emotion
		sink.appendToHead(sheet.getStyleTags());
		sink.appendToHead(loadableHandle.toScriptTag());
		sink.renderIntoElementById("react-target", html);
	});
});