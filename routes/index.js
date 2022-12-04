var express = require('express');
var router = express.Router();
var payroll = require("./payroll");
/* GET home page. */
var cors = require('cors')
let app = express();
app.use(cors());

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use(payroll);
module.exports = router;
