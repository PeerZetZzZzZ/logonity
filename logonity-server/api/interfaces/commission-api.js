const app = require('../../app');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const LogonitySaveRepository = require('../domain/repository/logonity-save-repository');
const LogonityReadRepository = require('../domain/repository/logonity-read-repository');

app.express.post('/upload',upload.single('foo'), function(req, res) {
  console.log(req.body); // the uploaded file object
  res.send({zwrotka: 'dupa2'});
});

app.express.get('/createCommission', function (req, res)  {
  LogonitySaveRepository.saveLogoCommission((id) => {
    res.send({id: id});
  }, () => {
    res.sendStatus(500);
  });
});

app.express.post('/updateCreatedCommission', function (req, res)  {
  console.log(req.body);
  LogonitySaveRepository.updateLogoCommission(req.body, (id) => {
    res.send({id: id});
  }, () => {
    res.sendStatus(500);
  });
});

app.express.get('/activeCommissions', function (req, res)  {
  console.log(req.body);
  LogonityReadRepository.getAllActiveCommissions((activeCommissions) => {
    res.send(activeCommissions);
  });
});