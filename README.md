# Fanyi

[![NPM version](https://img.shields.io/npm/v/fanyi.svg?style=flat)](https://npmjs.org/package/fanyi)
[![NPM downloads](http://img.shields.io/npm/dm/fanyi.svg?style=flat)](https://npmjs.org/package/fanyi)


[![](https://img.shields.io/badge/language-JavaScript-blue.svg?style=flat-square)](https://github.com/ihoey)
[![](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/ihoey)
[![](https://img.shields.io/badge/github-ihoey-orange.svg?style=flat-square)](https://github.com/ihoey)
[![](https://img.shields.io/badge/QQ-✘д✘ヽゝだよ-red.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=1058221214&site=qq&menu=yes)
[![](https://img.shields.io/badge/blog-ihoey-ff69b4.svg?style=flat-square)](https://blog.ihoey.com)


A translate tool in your command line.

![](https://t.alipayobjects.com/images/T1h_JfXkXhXXXXXXXX.png)

修改自 [afc163](https://github.com/afc163/fanyi)

---

## Install

```bash
$ npm i -g git@github.com:ihoey/fanyi.git
```

## Usage

```bash
$ [fy|fanyi] word
```

Translation data is fetched from [fanyi.youdao.com](http://fanyi.youdao.com), and only support translation between Chinese and English.

In Mac/Linux bash, words will be pronounced  by `say` command.

Translate one word.

```bash
$ fanyi love
```

```
 love  [ lʌv ]  ~  fanyi.youdao.com

 爱

 - n. 恋爱；亲爱的；酷爱；喜爱的事物
 - vt. 喜欢；热爱；爱慕
 - vi. 爱
 - n. (Love)人名；(英)洛夫

 1. Love
    爱情,爱,爱
 2. Endless Love
    无尽的爱,蓝色生死恋,不了情
 3. puppy love
    早恋,青春期恋爱,初恋

  --------

 love  ~  translate.google.com

 爱

  --------
```

More words.

```bash
$ fanyi make love
```

Support Chinese, even sentence.

```bash
$ fanyi 和谐
```

```bash
$ fanyi 子非鱼焉知鱼之乐
```

## LICENSE

MIT.
