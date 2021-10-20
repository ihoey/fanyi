const chalk = require("chalk");

exports.youdao = (data) => {
  var firstLine = "";

  // word
  firstLine += data.query;

  // phonetic symbol
  if (data.basic && data.basic.phonetic) {
    firstLine += chalk.magenta("  [ " + data.basic.phonetic + " ] ");
  }

  log(chalk.cyan(firstLine) + chalk.green("  ~  fanyi.youdao.com"));

  // translation
  if (data.translation) {
    log();
    data.translation.forEach((item) => {
      log(chalk.magentaBright(item));
    });
  }

  // pos & acceptation
  if (data.basic && data.basic.explains) {
    log();
    data.basic.explains.forEach((item) => {
      log(chalk.green("- ") + chalk.green(item));
    });
  }

  // sentence
  if (data.web && data.web.length) {
    log();
    data.web.forEach((item, i) => {
      log(chalk.green(i + 1 + ". ") + highlight(item.key, data.query));
      log("   " + chalk.magenta(item.value.join(",")));
    });
  }

  log();
  log(chalk.green(" -------- "));
  log();
};

exports.google = (data) => {
  var result = data[0].map((e) => e[0]);
  var query = data[0].map((e) => e[1]);
  var meaning = "";

  log(chalk.cyan(query) + chalk.green("  ~  translate.google.com"));
  log();

  result.map((e) => (meaning += e));
  log(chalk.magentaBright(meaning));

  log();
  log(chalk.green(" -------- "));
  log();
};

exports.dictionaryapi = (data, word) => {
  if (word.indexOf("%") >= 0) {
    return;
  }
  log(word + chalk.green("  ~  dictionaryapi.com"));
  log();

  var i = 1;
  if (!data) {
    return;
  }
  data.forEach((item) => {
    if (
      Array.isArray(item.ew) &&
      item.ew.some((w) => {
        return w === word;
      })
    ) {
      if (item.cx) {
        item.cx.forEach((cx_item) => {
          log(chalk.green(" - ") + chalk.green(cx_item.cl));
          log(chalk.green(" - ") + chalk.green(cx_item.ct));
        });
      }
      if (item.def) {
        item.def.forEach((def) => {
          def.dt.forEach((obj) => {
            var meaning = "";
            if (typeof obj === "string") {
              meaning = obj;
            } else if (obj["_"]) {
              meaning = obj["_"];
            }
            meaning = meaning.replace(/^\s*:\s*/, "").replace(/\s*:\s*$/, "");
            if (meaning) {
              log(chalk.green(" - ") + highlight(chalk.green(meaning), word, "green"));
              i += 1;
            }
          });
        });
      }
    }
  });

  log();
  log(chalk.green(" -------- "));
  log();
};

const log = (message, indentNum) => {
  indentNum = indentNum || 1;
  var indent = "";
  for (var i = 1; i < indentNum; i++) {
    indent += "  ";
  }
  console.log(indent, message || "");
};

const highlight = (string, key, defaultColor) => {
  defaultColor = defaultColor || "green";
  string = string.replace(
    new RegExp("(.*)(" + key + ")(.*)", "gi"),
    "$1$2" + chalk[defaultColor]("$3")
  );
  return string.replace(
    new RegExp("(.*?)(" + key + ")", "gi"),
    chalk[defaultColor]("$1") + chalk.yellow("$2")
  );
};
