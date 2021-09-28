import "../imports/startup/client/index"
import React from 'react'
import { render } from "react-dom"
import App from '../imports/ui/both/App'
import { preloadLoadables } from 'meteor/npdev:react-loadable'
import { FastRender } from "meteor/communitypackages:fast-render"

FastRender.onPageLoad( () => {
	indexedDB.open("dummy")
	preloadLoadables().then(() =>{
		render(<App/>, document.getElementById("react-target")
		)
	})
})
