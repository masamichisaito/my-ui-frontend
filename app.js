const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// 基本設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// セッション設定（確認画面用）
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// ルーティング
const userRoutes = require('./routes/users');
app.use('/', userRoutes);  // これで "/" も /form も /confirm も対応

module.exports = app;
