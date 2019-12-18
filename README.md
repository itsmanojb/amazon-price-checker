# Amazon Price Checker
A Node.js application to track Amazon's prices of a given product.

### How to check

Run the follwoing command:
<pre>
$ node parser.js [amazon_product_id] [min_price]
</pre>

### Example
- Visit amazon.in and grab the product id.

- Generally amazon products have url like, _www.amazon .in/dp/[productId]/random_tracking_staffs_ or _www.amazon .in/[product_name]/dp/[productId]/random_tracking_staffs_
- Run following command:
  

<pre>


$ node parser.js B07JGXM9WN 40000

Apple iPhone XR (64GB) - White is still expensive. Current Price ₹ 49,900.00

</pre>

<br/>

<hr/>

<b>Note:</b> <em>min_price</em> parameter is optional, if ignored, instead of comparing it'll show the price of the product.