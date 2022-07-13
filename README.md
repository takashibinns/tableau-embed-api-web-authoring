# Tableau Embedding API Tutorial: Web Authoring
Tutorial for getting started using Tableau's Embedding API's new `<tableau-authoring-viz>` component

## Setup
Download the source code from github, really only **index.html** and **main.js** are required.  Within main.js, update the import statement to pull the Tableau Embedding API from either your Tableau Server (version 2022.2+) or Tableau Cloud.  

Also, the **details** variable contains a list of Tableau Vizzes to embed.  This list should be updated to reference some Vizzes on your Tableau Server (version 2022.2+) or Tableau Cloud.

## Deployment
If you have a web server, put both these files in the same directory and access through your web browser.  If you don't have a web server, you can use python to start one up.  Check out [this site](https://stackabuse.com/serving-files-with-pythons-simplehttpserver-module/) which covers how to start a python web server.
