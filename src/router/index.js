import HomeController from '../app/controller/HomeController.js'; // Adjust the import path as needed
function checkLogin(req, res, next) {
    console.log("🔐 SESSION:", req.session);
    if (req.session && req.session.user_id) {
        return next();
    } else {
        return res.redirect('/login?error=Vui lòng đăng nhập để truy cập trang quản trị');
    }
}


function route(app, upload) {
    app.get('/', HomeController.index);
    app.get('/about', HomeController.about);
    app.get('/blog', HomeController.blog);
    app.get('/contact', HomeController.contact);
    app.get('/feature', HomeController.feature);
    app.get('/pricing', HomeController.pricing);
    app.get('/service', HomeController.service);
    app.get('/testimonial', HomeController.testimonial);
    app.post('/LienHe', HomeController.LienHe);
    app.get('/login', HomeController.login);
    app.get('/admin', checkLogin, HomeController.admin);
    app.get('/admin/account', checkLogin, HomeController.listAccount);
    app.get('/admin/account/create', checkLogin, HomeController.createAccount);
    app.post('/admin/account/store', checkLogin, HomeController.storeAccount);
    app.get('/admin/account/delete/:id', checkLogin, HomeController.deleteAccount);
    app.get('/admin/account/edit/:id', checkLogin, HomeController.editAccountForm);
    app.post('/admin/account/update/:id', checkLogin, HomeController.updateAccount);
    app.get('/admin/contact', checkLogin, HomeController.listContact);
    app.get('/admin/blog/create', checkLogin, HomeController.createBlog);
    app.get('/admin/blog', checkLogin, HomeController.listBlog);
    app.get('/admin/blog/edit/:id', checkLogin, HomeController.editBlog);
    app.post('/admin/blog/update/:id', checkLogin, upload.fields([
        { name: 'thumbnail', maxCount: 1 }
    ]), HomeController.updateBlog);
    app.get('/admin/blog/delete/:id', checkLogin, HomeController.deleteBlog);

    app.get('/blog/detail/:id', HomeController.detailBlog);
    app.get('/admin/contact/create', checkLogin, HomeController.createContact);
    app.post('/admin/contact/store', checkLogin, HomeController.storeContact);
    app.post('/admin/home', HomeController.homeAdmin);
    app.get('/logout', HomeController.logout);


    app.post('/upload-image', upload.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Trả về đường dẫn tuyệt đối để TinyMCE không tính sai
        const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
        res.json({ location: imageUrl });
    });

    app.post('/admin/blog/store', checkLogin, upload.fields([
        { name: 'thumbnail', maxCount: 1 }
    ]), HomeController.saveContent);






}

export default route;