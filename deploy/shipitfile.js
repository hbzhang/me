module.exports = function (shipit) {
  shipit.initConfig({
    staging: {
      servers: 'hbzhang@128.173.128.195:2436'
    }
  });

  shipit.task('pwd', function () {
    return shipit.remote('pwd');
  });
};
