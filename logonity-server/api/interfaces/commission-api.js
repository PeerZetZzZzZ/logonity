const app = require('../../app');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const LogonitySaveRepository = require('../domain/repository/logonity-save-repository');
const LogonityReadRepository = require('../domain/repository/logonity-read-repository');
var watermark = require('image-watermark');
const path = require('path');
var fs = require('fs');

app.express.post('/upload',upload.single('foo'), function(req, res) {
  console.log(req.body); // the uploaded file object
  console.log(req.file); // the uploaded file object
  watermark.embedWatermark(req.file.path, {'text' : 'Logonity', dstPath: `${req.file.path}_watermark`});
  LogonitySaveRepository.saveLogoProposal(req.body.commissionId, req.body.logoComment, req.body.fileName, req.file.filename, req.file.mimetype, req.file.size,
    (id) => {
      res.send(id);
    }, () => {
      res.sendStatus(500);
    });
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

app.express.get('/getCommissionInfo/:commissionId', function (req, res)  {
  LogonityReadRepository.getCommissionInfo(req.params.commissionId, (row) => {
    LogonityReadRepository.getLogoProposalsInfo(req.params.commissionId, (rows) => {
      row.logoProposals = rows;
      res.send(row);
    }, () => {
      res.sendStatus(500);
    });
  }, () => {
    res.sendStatus(500);
  });
});

app.express.get('/picture/:pictureName', function(req, res) {
  res.sendFile(path.resolve(`uploads/${req.params.pictureName}_watermark`));
});

app.express.get('/picture64/:pictureName', function(req, res) {
  const bitmap = fs.readFileSync(path.resolve(`uploads/${req.params.pictureName}_watermark`));
  res.send(new Buffer(bitmap).toString('base64'));
});

app.express.get('/getProposalInfo/:proposalId', function(req, res) {
  LogonityReadRepository.getLogoProposalInfo(req.params.proposalId, (row) => {
    res.send(row);
  });
});

app.express.get('/deactivateCommission/:commissionId/:proposalId', function(req, res) {
  LogonitySaveRepository.deactivateLogoCommission(req.params.commissionId, () => {
    LogonityReadRepository.getLogoProposalPictureName(req.params.proposalId, (row) => {
      res.send(row);
    });
    res.sendStatus(200);
  }, () => res.sendStatus(500));
});