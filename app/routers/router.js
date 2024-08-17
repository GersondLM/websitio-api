
let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');

router.post('/api/music/music', customers.create);
router.get('/api/music/all', customers.retrieveAllCustomers);
router.get('/api/music/onebyid/:id', customers.getCustomerById);
router.get('/api/music/filteringbyage', customers.filteringByAge);
router.get('/api/music/pagination', customers.pagination);
router.get('/api/music/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/music/update/:id', customers.updateById);
router.delete('/api/music/delete/:id', customers.deleteById);

module.exports = router;