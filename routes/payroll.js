var express = require('express');
var router = express.Router();
var payroll = require("../services/payroll");
var cors = require('cors')
let app = express();
app.use(cors());
app.use(cors({
  origin: '*'
}));
router.get('/getInfo',payroll.getInfo);
router.post('/subscribeToPayroll',payroll.subscribeToPayroll);
router.post('/payToSubscriber',payroll.payToSubscriber);
router.get('/getSubscriberInfo',payroll.getSubscriberInfo);
router.get('/getAllActiveSubscribers',payroll.getAllActiveSubscribers);

module.exports = router;