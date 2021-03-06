// Generated by CoffeeScript 1.6.3
(function() {
  var MAX_PARAM, MakeSync, RES_WITHOUT_EXTRA_FUNC, RES_WITH_EXTRA_FUNC, Sync, extraFunc, makeTestFunc, should, _ref, _ref1,
    __slice = [].slice;

  should = require('should');

  _ref = require('../lib/make-sync'), Sync = _ref.Sync, MakeSync = _ref.MakeSync;

  _ref1 = require('./helpers/function-gen'), makeTestFunc = _ref1.makeTestFunc, extraFunc = _ref1.extraFunc, MAX_PARAM = _ref1.MAX_PARAM, RES_WITHOUT_EXTRA_FUNC = _ref1.RES_WITHOUT_EXTRA_FUNC, RES_WITH_EXTRA_FUNC = _ref1.RES_WITH_EXTRA_FUNC;

  describe("async", function() {
    describe("errors, no function arg", function() {
      var i, test, _i, _results;
      test = function(i) {
        return it("should work with " + i + " args", function(done) {
          var args, f, syncF;
          args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, i);
          f = makeTestFunc(i, true, false);
          syncF = MakeSync(f, {
            mode: 'async'
          });
          syncF.apply(null, __slice.call(args).concat([function(err, res) {
            return res.should.equal(RES_WITHOUT_EXTRA_FUNC[i]);
          }]));
          return done();
        });
      };
      _results = [];
      for (i = _i = 0; 0 <= MAX_PARAM ? _i <= MAX_PARAM : _i >= MAX_PARAM; i = 0 <= MAX_PARAM ? ++_i : --_i) {
        _results.push(test(i));
      }
      return _results;
    });
    describe("no errors, no function arg", function() {
      var i, test, _i, _results;
      test = function(i) {
        return it("should work with " + i + " args", function(done) {
          var args, f, syncF;
          args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, i);
          f = makeTestFunc(i, false, false);
          syncF = MakeSync(f, {
            mode: 'async'
          });
          syncF.apply(null, __slice.call(args).concat([function(res) {
            return res.should.equal(RES_WITHOUT_EXTRA_FUNC[i]);
          }]));
          return done();
        });
      };
      _results = [];
      for (i = _i = 0; 0 <= MAX_PARAM ? _i <= MAX_PARAM : _i >= MAX_PARAM; i = 0 <= MAX_PARAM ? ++_i : --_i) {
        _results.push(test(i));
      }
      return _results;
    });
    describe("errors, function arg", function() {
      var i, test, _i, _results;
      test = function(i) {
        return it("should work with " + i + " args", function(done) {
          var args, f, syncF;
          args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, i);
          f = makeTestFunc(i, true, true);
          syncF = MakeSync(f, {
            mode: 'async'
          });
          syncF.apply(null, __slice.call(args).concat([extraFunc], [function(err, res) {
            return res.should.equal(RES_WITH_EXTRA_FUNC[i]);
          }]));
          return done();
        });
      };
      _results = [];
      for (i = _i = 0; 0 <= MAX_PARAM ? _i <= MAX_PARAM : _i >= MAX_PARAM; i = 0 <= MAX_PARAM ? ++_i : --_i) {
        _results.push(test(i));
      }
      return _results;
    });
    return describe("no errors, function arg", function() {
      var i, test, _i, _results;
      test = function(i) {
        return it("should work with " + i + " args", function(done) {
          var args, f, syncF;
          args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, i);
          f = makeTestFunc(i, false, true);
          syncF = MakeSync(f, {
            mode: 'async'
          });
          syncF.apply(null, __slice.call(args).concat([extraFunc], [function(res) {
            return res.should.equal(RES_WITH_EXTRA_FUNC[i]);
          }]));
          return done();
        });
      };
      _results = [];
      for (i = _i = 0; 0 <= MAX_PARAM ? _i <= MAX_PARAM : _i >= MAX_PARAM; i = 0 <= MAX_PARAM ? ++_i : --_i) {
        _results.push(test(i));
      }
      return _results;
    });
  });

}).call(this);
