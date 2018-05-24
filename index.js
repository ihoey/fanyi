var request = require('request');
var SOURCE = require('./lib/source');
var print = require('./lib/print');
var spawn = require('child_process').spawn;
var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();
var parseString = require('xml2js').parseString;
var which = require('shelljs').which;
var say = require('say');
var isChinese = require('is-chinese');

module.exports = function (word) {
  // say it
  try {
    say.speak(word, isChinese(word) ? 'Ting-Ting' : null);
  } catch (e) {
    console.log(e);
  }

  word = encodeURIComponent(word);

  // google
  request.get(SOURCE.google.replace('${word}', word), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(entities.decode(body));
        print.google(data);
      } catch (e) {
        console.log(e);
      }
    }
  });

  // youdao
  request.get(SOURCE.youdao.replace('${word}', word), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(entities.decode(body));
        print.youdao(data);
      } catch (e) {
        // 来自您key的翻译API请求异常频繁，为保护其他用户的正常访问，只能暂时禁止您目前key的访问
        console.log(e);
      }
    }
  });
};
