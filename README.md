A nodejs based project, which can used to host/deploy react projects by providing the github url .

The upload service accepts a github url for react project and uploads it to aws-s3 kind object store .
The deploy service downloads the react project files into local storage to build them into html, css, js files, then pushes/stores the ready to deploy files into aws-s3 bucket.
The request handler service allows the users get the react project up and running on the given port by mapping it through an url.
Using a readymade frontend we route the requests and responses to respective endpoints to keep the service up and running.
