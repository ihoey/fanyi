var chalk = require('chalk');

exports.iciba = function (data) {
  var firstLine = '';

  // word
  firstLine += data.key + ' ';

  // maybe string
  if (typeof data.ps === 'string') {
    data.ps = [data.ps];
  }
  if (typeof data.pos === 'string') {
    data.pos = [data.pos];
  }
  if (typeof data.acceptation === 'string') {
    data.acceptation = [data.acceptation];
  }

  // phonetic symbol
  if (data.ps && data.ps.length) {
    var ps = '';
    data.ps.forEach(function (item, i) {
      firstLine += chalk.magenta(' ' + (i === 0 ? '英' : '美') + '[ ' + item + ' ] ');
    });
    firstLine += ps;
  }

  log(firstLine + chalk.green(' ~  iciba.com'));

  // pos & acceptation
  if (data.pos && data.pos.length) {
    log();
    data.pos.forEach(function (item, i) {
      if (typeof data.pos[i] !== 'string' || !data.pos[i]) {
        return;
      }
      log(chalk.green('- ') + chalk.green(data.pos[i] + ' ' + data.acceptation[i].trim()));
    });
  }

  // sentence
  if (data.sent && data.sent.length) {
    log();
    data.sent.forEach(function (item, i) {
      if (typeof item.orig !== 'string' && item.orig[0]) {
        item.orig = item.orig[0].trim();
      }
      if (typeof item.trans !== 'string' && item.trans[0]) {
        item.trans = item.trans[0].trim();
      }
      log(chalk.green(i + 1 + '. ') + highlight(item.orig, data.key));
      log('   ' + chalk.magenta(item.trans));
    });
  }

  log();
  log(chalk.green(' -------- '))
  log();
};

exports.youdao = function (data) {
  var firstLine = '';

  // word
  firstLine += data.query;

  // phonetic symbol
  if (data.basic && data.basic.phonetic) {
    firstLine += chalk.magenta('  [ ' + data.basic.phonetic + ' ]');
  }

  log(chalk.cyan(firstLine) + chalk.green('  ~  fanyi.youdao.com'));

  // translation
  if (data.translation) {
    log();
    data.translation.forEach(function (item) {
      log(chalk.magentaBright(item));
    });
  }

  // pos & acceptation
  if (data.basic && data.basic.explains) {
    log();
    data.basic.explains.forEach(function (item) {
      log(chalk.green('- ') + chalk.green(item));
    });
  }

  // sentence
  if (data.web && data.web.length) {
    log();
    data.web.forEach(function (item, i) {
      log(chalk.green(i + 1 + '. ') + highlight(item.key, data.query));
      log('   ' + chalk.magenta(item.value.join(',')));
    });
  }

  log();
  log(chalk.green(' -------- '))
  log();
};

exports.google = function (data) {
  var result = data[0].map(e => e[0])
  var query = data[0].map(e => e[1])
  var meaning = ''

  log(chalk.cyan(query) + chalk.green('  ~  translate.google.com'));
  log();

  result.map(e => meaning += e)
  log(chalk.magentaBright(meaning))

  log();
  log(chalk.green(' -------- '))
  log();
}

exports.dictionaryapi = function (data, word) {
  if (word.indexOf('%') >= 0) {
    return;
  }
  log(word + chalk.green('  ~  dictionaryapi.com'));
  log();

  var i = 1;
  if (!data) {
    return;
  }
  data.forEach(function (item) {
    if (Array.isArray(item.ew) && item.ew.some(function (w) {
        return w === word
      })) {
      if (item.cx) {
        item.cx.forEach(function (cx_item) {
          log(chalk.green(' - ') + chalk.green(cx_item.cl));
          log(chalk.green(' - ') + chalk.green(cx_item.ct));
        });
      }
      if (item.def) {
        item.def.forEach(function (def) {
          def.dt.forEach(function (obj) {
            var meaning = '';
            if (typeof obj === 'string') {
              meaning = obj;
            } else if (obj['_']) {
              meaning = obj['_'];
            }
            meaning = meaning.replace(/^\s*:\s*/, '').replace(/\s*:\s*$/, '');
            if (meaning) {
              log(chalk.green(' - ') + highlight(chalk.green(meaning), word, 'green'));
              i += 1;
            }
          });
        });
      }
    }
  });

  log();
  log(chalk.green(' -------- '))
  log();
}

function log(message, indentNum) {
  indentNum = indentNum || 1;
  var indent = '';
  for (var i = 1; i < indentNum; i++) {
    indent += '  ';
  }
  console.log(indent, message || '');
}

function highlight(string, key, defaultColor) {
  defaultColor = defaultColor || 'green';
  string = string.replace(new RegExp('(.*)(' + key + ')(.*)', 'gi'), '$1$2' + chalk[defaultColor]('$3'));
  return string.replace(new RegExp('(.*?)(' + key + ')', 'gi'), chalk[defaultColor]('$1') + chalk.yellow('$2'));
}
