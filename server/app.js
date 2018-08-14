const express = require('express');
const path = require('path');
const db = require('./helpers/db-connection');
const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

db.connect().then(() => {
  const app = express();

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config');

  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      hot: true,
      quiet: true,
    })
  );

  app.use(webpackHotMiddleware(compiler));

  app.set('views', path.join(process.cwd(), 'server', 'views'));
  app.set('view engine', 'pug');
  app.get('/', (req, res) => res.render('index'));

  app.get('/products/:asin', async (req, res) => {
    const asin = req.params.asin;

    const { rows: matchingProducts } = await db.query(`SELECT * FROM product where asin = '${asin}'`);

    if (matchingProducts.length > 0) {
      const response = {
        product: JSON.parse(unescape(matchingProducts[0].info)),
      };

      res.send(JSON.stringify(response));
    } else {
      const productInfoRequest = axios.get(`https://www.browsenodes.com/amazon.com/itemLookup/${asin}.html`);

      const salesRankRequest = axios.post(
        `https://octatools.com/salesrank_checker/ajax.php`,
        querystring.stringify({
          type: 'ASIN',
          values: asin,
        })
      );

      const productInfoPage = await productInfoRequest;
      const $product = cheerio.load(productInfoPage.data);
      const productInfoJSON = $product('body > main > div > div > div:nth-child(2) > pre > code');

      if (productInfoJSON.length < 1) {
        res.status(404);
        res.send('Unable to retrieve product info');
        return;
      }

      const productInfo = JSON.parse(productInfoJSON.text());

      const salesRankPage = await salesRankRequest;
      const $salesRank = cheerio.load(salesRankPage.data);
      const salesRank = $salesRank('.tr_1 > .keywords_td');

      if (salesRank.length < 1) {
        res.status(404);
        res.send('Unable to retrieve product sales rank');
        return;
      }

      productInfo.SalesRank = Number(salesRank.text());

      if (typeof productInfo.SalesRank !== 'number') {
        res.status(404);
        res.send(`Unexpected value for product sales rank: ${productInfo.SalesRank}`);
        return;
      }

      res.send(JSON.stringify({ product: productInfo }));

      await db.query(`INSERT INTO product (asin, info) VALUES ('${asin}', '${escape(JSON.stringify(productInfo))}')`);
    }
  });

  app.listen(8080, () => {
    console.log('Listening on port 8080.');
  });
});
