// Generated by CoffeeScript 1.6.2
(function() {
  var Options, should;

  should = require('should');

  Options = require('../lib/options').Options;

  describe("options", function() {
    describe("isIncluded", function() {
      describe("default", function() {
        return it("include all", function(done) {
          var options, res;

          options = new Options();
          res = (options.isIncluded('f')).should.be.ok;
          return done();
        });
      });
      describe("* rule", function() {
        it("exclude", function(done) {
          var options;

          options = new Options({
            exclude: '*'
          });
          (options.isIncluded('f')).should.not.be.ok;
          return done();
        });
        return it("include", function(done) {
          var options;

          options = new Options({
            exclude: '*',
            include: '*'
          });
          (options.isIncluded('f')).should.be.ok;
          return done();
        });
      });
      describe("regex rule", function() {
        it("exclude", function(done) {
          var options;

          options = new Options({
            exclude: /^_/
          });
          (options.isIncluded('f')).should.be.ok;
          (options.isIncluded('_f')).should.not.be.ok;
          return done();
        });
        return it("include", function(done) {
          var options;

          options = new Options({
            exclude: '*',
            include: /^f/
          });
          (options.isIncluded('f')).should.be.ok;
          (options.isIncluded('g')).should.not.be.ok;
          return done();
        });
      });
      describe("string rule", function() {
        it("exclude", function(done) {
          var options;

          options = new Options({
            exclude: '_f'
          });
          (options.isIncluded('f')).should.be.ok;
          (options.isIncluded('f_f')).should.be.ok;
          (options.isIncluded('_f')).should.not.be.ok;
          return done();
        });
        return it("include", function(done) {
          var options;

          options = new Options({
            exclude: '*',
            include: 'f'
          });
          (options.isIncluded('f')).should.be.ok;
          (options.isIncluded('fff')).should.not.be.ok;
          (options.isIncluded('g')).should.not.be.ok;
          return done();
        });
      });
      return describe("array", function() {
        it("exclude", function(done) {
          var options;

          options = new Options({
            exclude: [/^_/, 'g']
          });
          (options.isIncluded('f')).should.be.ok;
          (options.isIncluded('_f')).should.not.be.ok;
          (options.isIncluded('g')).should.not.be.ok;
          return done();
        });
        return it("include", function(done) {
          var options;

          options = new Options({
            exclude: '*',
            include: ['g', /^_/]
          });
          (options.isIncluded('f')).should.not.be.ok;
          (options.isIncluded('g')).should.be.ok;
          (options.isIncluded('_f')).should.be.ok;
          return done();
        });
      });
    });
    describe("numOfParams", function() {
      it("function mode", function(done) {
        var options;

        options = new Options({
          num_of_args: 5
        });
        options.numOfParams().should.equal(5);
        (options.numOfParams(void 0)).should.equal(5);
        return done();
      });
      return it("object mode", function(done) {
        var options;

        options = new Options({
          num_of_args: {
            f: 5
          }
        });
        (options.numOfParams('f')).should.equal(5);
        should.not.exist(options.numOfParams('g'));
        return done();
      });
    });
    describe("syncReturn", function() {
      it("default", function(done) {
        var options;

        options = new Options({});
        options.syncReturn().should.be.a('function');
        (options.syncReturn()(null, 1)).should.equal(1);
        (options.syncReturn()(null, 1, 3)).should.equal(1);
        (function() {
          return options.syncReturn()(new Error('Shit!'));
        }).should["throw"](/Shit/);
        return done();
      });
      it("pattern with error", function(done) {
        var options;

        options = new Options({
          'sync-return': 'err,res...'
        });
        options.syncReturn().should.be.a('function');
        (options.syncReturn()(null, 1)).should.eql([1]);
        (options.syncReturn()(null, 1, 3)).should.eql([1, 3]);
        (function() {
          return options.syncReturn()(new Error('Shit!'));
        }).should["throw"](/Shit/);
        return done();
      });
      it("pattern without error", function(done) {
        var options;

        options = new Options({
          'sync-return': 'res'
        });
        options.syncReturn().should.be.a('function');
        (options.syncReturn()(1)).should.equal(1);
        (options.syncReturn()(1, 3)).should.equal(1);
        (options.syncReturn()('Shit!')).should.equal('Shit!');
        return done();
      });
      it("function", function(done) {
        var options;

        options = new Options({
          'sync-return': function(err, res1, res2) {
            if (err) {
              throw new Error(new Error('Merde!'));
            }
            return res1 + res2;
          }
        });
        options.syncReturn().should.be.a('function');
        (options.syncReturn()(null, 1, 3)).should.equal(4);
        (function() {
          return options.syncReturn()(new Error('Shit!'));
        }).should["throw"](/Merde/);
        return done();
      });
      it("object global config with function", function(done) {
        var options;

        options = new Options({
          'sync-return': function() {
            return 41;
          }
        });
        options.syncReturn('h').should.be.a('function');
        (options.syncReturn('h')(2, 3)).should.equal(41);
        return done();
      });
      it("object global config with pattern", function(done) {
        var options;

        options = new Options({
          'sync-return': 'res'
        });
        options.syncReturn('h').should.be.a('function');
        (options.syncReturn('h')(2, 3)).should.equal(2);
        return done();
      });
      return it("object per function config", function(done) {
        var options;

        options = new Options({
          'sync-return': {
            '*': 'err,res',
            g: 'res',
            h: function() {
              return 41;
            }
          }
        });
        options.syncReturn('f').should.be.a('function');
        (options.syncReturn('f')(null, 1)).should.equal(1);
        options.syncReturn('g').should.be.a('function');
        (options.syncReturn('g')(2, 3)).should.equal(2);
        options.syncReturn('h').should.be.a('function');
        (options.syncReturn('h')(2, 3)).should.equal(41);
        return done();
      });
    });
    return describe("mode", function() {
      var test;

      test = function(mode, expected, label) {
        if (label == null) {
          label = "" + mode;
        }
        return it(label, function(done) {
          var options;

          if (mode == null) {
            options = new Options({});
          }
          if (mode != null) {
            options = new Options({
              mode: mode
            });
          }
          options.mode().should.eql(expected);
          return done();
        });
      };
      test(void 0, ['sync'], 'default');
      test(['sync'], ['sync']);
      test('sync', ['sync'], 'sync (string)');
      test(['sync', 'args'], ['sync']);
      test(['mixed'], ['mixed', 'args']);
      test('mixed', ['mixed', 'args'], 'mixed (string)');
      test(['async'], ['async']);
      test('async', ['async'], 'async (string)');
      test(['async', 'args'], ['async']);
      test(['sync', 'mixed'], ['mixed', 'args']);
      test(['mixed', 'fibers'], ['mixed', 'fibers']);
      test(['mixed', 'fibers', 'args'], ['mixed', 'args']);
      return test(['mixed', 'fibers', 'args', 'sync'], ['sync']);
    });
  });

}).call(this);
