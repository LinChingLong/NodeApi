var express = require('express');
var router = express.Router();

const data =[
  {
    id:1,
    title:'哈囉你好'
  }
]

// http://lcoalhost:3000/api/products
router.get('/products', function(req, res, next) {
  res.send({ //這個是express裡面針對回應的方法，目的是把資料送回去
    success:true,
    data,
  });
  res.end(); 
});

module.exports = router;





