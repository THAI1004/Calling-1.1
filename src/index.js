import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import route from './router/index.js';
import helpers from 'handlebars-helpers';
import moment from 'moment';
import multer from 'multer';
import { JSDOM } from 'jsdom';
import session from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tạo thư mục uploads nếu chưa tồn tại
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Khởi tạo Handlebars helpers
const multiHelpers = helpers({ handlebars: Handlebars });

// Cấu hình Handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '/resource/views/layouts'),
  helpers: {
    ...multiHelpers,
    inc: value => parseInt(value) + 1,
    eq: (a, b) => a === b,

    // ✅ Fix lỗi formatDate
    formatDate: (date, format) => {
      const realFormat = typeof format === 'string' ? format : "DD/MM/YYYY";
      return moment(date).format(realFormat);
    },

    getAuthorName: function (user_id, options) {
      const users = options?.data?.root?.users || [];
      const user = users.find(u => u.id === user_id);
      return user?.fullname || 'Không xác định';
    }
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

// Cấu hình Multer để upload ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false, // ⚠️ Không nên để true
  cookie: { secure: false } // true nếu dùng HTTPS
}));
// Routes
route(app, upload);

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
