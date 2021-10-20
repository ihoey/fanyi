const request = require("request");
const say = require("say");
const isChinese = require("is-chinese");
const ora = require("ora");

const spawn = require("child_process").spawn;
const parseString = require("xml2js").parseString;
const which = require("shelljs").which;
const entities = require("html-entities");

const print = require("./lib/print");
const SOURCE = require("./lib/source");
const spinner = ora("fanyi...").start();

module.exports = function (word) {
  spinner.color = "yellow";
  spinner.text = "开始翻译...";

  try {
    say.speak(word, isChinese(word) ? "Ting-Ting" : null);
  } catch (e) {
    console.log(e);
  }

  word = encodeURIComponent(word);
  // google
  request.get(SOURCE.google.replace("${word}", word), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(entities.decode(body));
        print.google(data);
        spinner.text = "google succeed";
        spinner.succeed();
      } catch (e) {
        console.log(e);
      }
    }
  });

  // youdao
  request.get(SOURCE.youdao.replace("${word}", word), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var data = JSON.parse(entities.decode(body));
        print.youdao(data);
        spinner.text = "youdao succeed";
        spinner.succeed();
      } catch (e) {
        // 来自您key的翻译API请求异常频繁，为保护其他用户的正常访问，只能暂时禁止您目前key的访问
        console.log(e);
      }
    }
  });
};
