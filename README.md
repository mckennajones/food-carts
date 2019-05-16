# portland food carts
🍔 An interactive map of food carts in the Portland, Oregon area.  

https://www.pdxfoodcarts.com

![](https://github.com/spikemadden/food-carts/blob/master/screenshots/search.png)

This application is serverless with the help of [Amazon Web Services](https://aws.amazon.com). Food cart data is collected using the [Yelp Fusion](https://www.yelp.com/fusion) API and runs as a [Lambda](https://aws.amazon.com/lambda) every 24 hours. The backend API to support search is an [Express](https://expressjs.com) app wrapped using [Serverless](https://serverless.com) and deployed as a Lambda. The frontend is written in [React](https://reactjs.org), built with [webpack](https://webpack.js.org) and deployed to [S3](https://aws.amazon.com/s3) with a [CloudFront](https://aws.amazon.com/cloudfront) distribution sitting on top.

If you have any questions, feel free to reach out! 👋🏼
