CREATE TABLE product (
  asin varchar PRIMARY KEY,
  info varchar
);

CREATE INDEX product_asin_index ON product(asin);
