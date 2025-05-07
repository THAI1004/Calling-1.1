import path from 'path';
import { fileURLToPath } from 'url';
import LienHe from '../model/LienHe.js';
import db from '../../config/database.js';
import { log } from 'console';
import Account from '../model/Account.js';
import Contact from '../model/Contact.js';
import Content from '../model/Blog.js';
import bcrypt from 'bcryptjs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HomeController {
    index(req, res) {
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/home", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            isHome: true,
            success, // <-- Truyền biến success vào view
            error
        }
        )
    }

    about(req, res) {
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/about", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            // layout: true
            success, // <-- Truyền biến success vào view
            error
        }
        )
    }

    contact(req, res) {
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/contact", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            success, // <-- Truyền biến success vào view
            error
        });
    }


    feature(req, res) {
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/feature", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            // layout: true
            success, // <-- Truyền biến success vào view
            error
        }
        )
    }

    pricing(req, res) {
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/pricing", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            // layout: true
            success, // <-- Truyền biến success vào view
            error
        }
        )
    }

    service(req, res) {
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/service", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            // layout: true
            success, // <-- Truyền biến success vào view
            error
        }
        )
    }
    login(req, res) {
        const { error, success } = req.query;
        res.render("login", {
            title: 'Calling - Login',
            layout: false,
            error,
            success
        });
    }

    admin(req, res) {
        const { error, success } = req.query;

        res.render("admin/homeAdmin", {
            title: 'Calling - Home Admin',
            layout: "admin",
            error,
            success
        });
    }
    createAccount(req, res) {
        const { error, success } = req.query;

        res.render("admin/Account/create", {
            title: 'Calling - Home Admin',
            layout: "admin",
            error,
            success
        });
    }
    async listAccount(req, res) {
        const { error, success } = req.query;
        const user = await Account.findAll();
        res.render("admin/Account/account", {
            title: 'Calling - List Account',
            layout: "admin",
            user,
            error,
            success
        })
    }



    testimonial(req, res) {
        // res.sendFile(path.join(__dirname, '../../resource/views/testimonial.html'));
        const { success, error } = req.query; // <-- Thêm dòng này

        res.render("client/testimonial", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            success, // <-- Truyền biến success vào view
            error
        });
    }
    async LienHe(req, res) {
        // console.log('req.body:', req.body); // Thêm dòng này
        const { name, email, phone, project, subject, message } = req.body;

        const dataToInsert = {
            name: name !== undefined ? name : null,
            email: email !== undefined ? email : null,
            phone: phone !== undefined ? phone : null,
            project: project !== undefined ? project : null,
            subject: subject !== undefined ? subject : null,
            message: message !== undefined ? message : null,
        };

        try {
            // Nếu dữ liệu hợp lệ, thêm vào bảng lienhe
            const newLienHeId = await LienHe.create(dataToInsert);
            return res.redirect('/contact?success=Nhân viên sẽ liên hệ lại với bạn sớm nhất có thể !!!');
        } catch (error) {
            console.error('Lỗi khi thêm thông tin liên hệ:', error);
            return res.status(500).json({ error: 'Đã có lỗi xảy ra khi gửi thông tin liên hệ. Vui lòng thử lại sau.', success: false });
        }
    }

    async homeAdmin(req, res) {
        const { username, password } = req.body;

        try {
            // Tìm người dùng theo username
            const user = await Account.findOne({ where: { username } });

            if (!user) {
                return res.redirect('/login?error=1'); // Tài khoản không tồn tại
            }

            // So sánh mật khẩu nhập vào với mật khẩu đã hash
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.redirect('/login?error=1'); // Sai mật khẩu
            }

            // Kiểm tra quyền
            if (user.role !== "1") {
                return res.status(404).render('client/404'); // Không phải admin
            }

            // Lưu session
            req.session.user_id = user.id;

            return res.redirect('/admin?success=Đăng nhập thành công!!!');
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return res.status(500).send('Lỗi máy chủ');
        }
    }
    async storeAccount(req, res) {
        const { fullname, username, password } = req.body;

        try {
            // Kiểm tra username đã tồn tại chưa
            const existingUser = await Account.findOne({ where: { username } });

            if (existingUser) {
                return res.render("admin/Account/create", {
                    title: "Calling - Thêm tài khoản",
                    layout: "admin",
                    error: "Tài khoản đã tồn tại!",
                    success: null
                });
            }

            // Hash mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10); // số 10 là "salt rounds"

            // Tạo tài khoản mới
            await Account.create({ fullname, username, password: hashedPassword });

            return res.redirect("/admin/account?success=Thêm tài khoản thành công!");
        } catch (error) {
            console.error("Lỗi tạo tài khoản:", error);
            return res.status(500).send("Lỗi máy chủ");
        }
    }


    async updateAccount(req, res) {
        try {
            const id = req.params.id;
            const { fullname, username, password } = req.body;

            const account = await Account.findByPk(id);
            if (!account) {
                return res.redirect('/admin/account?error=Không tìm thấy tài khoản');
            }

            account.fullname = fullname;
            account.username = username;
            account.password = password;

            await account.save();

            res.redirect('/admin/account?success=Cập nhật tài khoản thành công');
        } catch (err) {
            console.error(err);
            res.redirect('/admin/account?error=Cập nhật thất bại');
        }
    }
    async deleteAccount(req, res) {
        const { id } = req.params;

        try {
            const user = await Account.findByPk(id);

            if (!user) {
                return res.redirect('/admin/account?error=Không tìm thấy người dùng');
            }

            await user.destroy();

            return res.redirect('/admin/account?success=Tài khoản đã được xóa');
        } catch (error) {
            console.error(error);
            return res.redirect('/admin/account?error=Đã xảy ra lỗi khi xóa');
        }
    }

    async editAccountForm(req, res) {
        try {
            const id = req.params.id;
            const account = await Account.findByPk(id); // Lấy tài khoản theo id
            if (!account) {
                return res.redirect('/admin/account?error=Không tìm thấy tài khoản');
            }
            res.render('admin/Account/edit', {
                account,
                layout: "admin"
            });
        } catch (err) {
            console.error(err);
            res.redirect('/admin/account?error=Đã có lỗi xảy ra');
        }
    }
    async listContact(req, res) {
        try {
            const contacts = await Contact.findAll({
                order: [['created_at', 'DESC']],
            });

            res.render('admin/Contact/contact', {
                layout: "admin",
                contacts,
                success: req.query.success,
                error: req.query.error
            });
        } catch (error) {
            console.error(error);
            res.redirect('/admin?error=Không thể lấy danh sách liên hệ');
        }
    }
    createBlog(req, res) {
        res.render("admin/Blog/add", {
            layout: "admin",
            title: "Calling - Create Blog",
        })
    }
    // Trong HomeController.js

    async editBlog(req, res) {
        try {
            const { id } = req.params;
            const blog = await Content.findByPk(id);

            if (!blog) {
                return res.redirect('/admin/blog?error=Không tìm thấy bài viết');
            }

            res.render("admin/Blog/edit", {
                layout: "admin",
                title: "Chỉnh sửa bài viết",
                blog
            });
        } catch (error) {
            console.error("Lỗi khi hiển thị form chỉnh sửa:", error);
            res.redirect('/admin/blog?error=Đã có lỗi xảy ra khi mở bài viết');
        }
    }

    // Lưu nội dung bài viết từ TinyMCE
    async saveContent(req, res) {
        try {
            let { title, description, noidung } = req.body;
            const userId = req.session?.user_id || 1;

            if (!title || !noidung || title.trim() === "" || noidung.trim() === "") {
                return res.status(400).send("Tiêu đề và nội dung không được để trống.");
            }

            // ✅ Làm sạch nội dung: xóa ../ nếu có trong src
            noidung = noidung.replace(/(\.\.\/)+public/g, '/public');

            // Xử lý ảnh đại diện
            let thumbnailUrl = null;
            if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
                thumbnailUrl = `/uploads/${req.files.thumbnail[0].filename}`;
            }

            await Content.create({
                title,
                description,
                thumbnail: thumbnailUrl,
                content: noidung,
                user_id: userId,
                status: 1,
                created_at: new Date()
            });

            return res.redirect('/admin/blog?success=Đã lưu nội dung thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu nội dung:', error);
            return res.status(500).send('Đã xảy ra lỗi khi lưu nội dung.');
        }
    }

    createContact(req, res) {
        res.render("admin/Contact/add", {
            layout: "admin",
            title: "Calling - Thêm mới Contact"
        })
    }
    async listBlog(req, res) {
        const { success, error } = req.query; // ✅ Thêm dòng này
        const blogs = await Content.findAll();
        const users = await Account.findAll();
        res.render("admin/Blog/list", {
            success,
            error,
            layout: 'admin',
            blogs,
            users
        });
    }

    async storeContact(req, res) {
        try {
            const { name, email, phone, project, subject, message } = req.body;

            if (!name || !email) {
                return res.redirect('/admin/contact/create?error=Vui lòng nhập đầy đủ họ tên và email');
            }

            await Contact.create({
                name,
                email,
                phone,
                project,
                subject,
                message,
                created_at: new Date()
            });

            res.redirect('/admin/contact?success=Đã thêm liên hệ mới!');
        } catch (error) {
            console.error("Lỗi khi lưu liên hệ:", error);
            res.redirect('/admin/contact/create?error=Đã xảy ra lỗi khi lưu');
        }
    }
    async blog(req, res) {
        try {
            const limit = 9;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;

            const { count, rows } = await Content.findAndCountAll({
                order: [['created_at', 'DESC']],
                limit,
                offset
            });

            const totalPages = Math.ceil(count / limit);
            const pages = [];

            for (let i = 1; i <= totalPages; i++) {
                pages.push({
                    number: i,
                    active: i === page
                });
            }

            res.render("client/blog", {
                title: "Calling - Blog",
                blogs: rows,
                pages,
                currentPage: page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevPage: page - 1,
                nextPage: page + 1
            });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách blog:", error);
            res.status(500).render("client/404", { error: "Không thể tải blog." });
        }
    }

    async detailBlog(req, res) {
        try {
            const { id } = req.params;

            // Tìm blog theo ID
            const blog = await Content.findByPk(id);

            if (!blog) {
                return res.status(404).render("client/404", {
                    title: "Không tìm thấy bài viết",
                    error: "Bài viết không tồn tại!"
                });
            }

            res.render("client/blog-detail", {
                title: blog.title,
                layout: "main",
                blog
            });
        } catch (error) {
            console.error("Lỗi khi hiển thị chi tiết blog:", error);
            res.status(500).render("client/404", {
                title: "Lỗi",
                error: "Không thể hiển thị bài viết."
            });
        }
    }
    async updateBlog(req, res) {
        try {
            const { id } = req.params;
            let { title, description, noidung } = req.body;

            // Làm sạch nội dung HTML (TinyMCE)
            noidung = noidung.replace(/(\.\.\/)+public/g, '/public');

            const blog = await Content.findByPk(id);
            if (!blog) {
                return res.redirect('/admin/blog?error=Không tìm thấy bài viết');
            }

            // Cập nhật thông tin mới
            blog.title = title;
            blog.description = description;
            blog.content = noidung;

            // Nếu có upload ảnh đại diện mới
            if (req.files?.thumbnail?.[0]) {
                blog.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
            }

            await blog.save();
            return res.redirect('/admin/blog?success=Cập nhật bài viết thành công!');
        } catch (error) {
            console.error("Lỗi cập nhật bài viết:", error);
            return res.redirect('/admin/blog?error=Đã xảy ra lỗi khi cập nhật');
        }
    }
    async deleteBlog(req, res) {
        try {
            const { id } = req.params;

            const blog = await Content.findByPk(id);
            if (!blog) {
                return res.redirect('/admin/blog?error=Không tìm thấy bài viết');
            }

            await blog.destroy();
            return res.redirect('/admin/blog?success=Đã xoá bài viết thành công!');
        } catch (error) {
            console.error("Lỗi khi xoá bài viết:", error);
            return res.redirect('/admin/blog?error=Xoá bài viết thất bại');
        }
    }
    logout(req, res) {
        // Huỷ session hiện tại
        req.session.destroy((err) => {
            if (err) {
                console.error("Lỗi khi đăng xuất:", err);
                return res.status(500).send("Lỗi khi đăng xuất");
            }

            // Quay lại trang đăng nhập hoặc trang chủ
            res.redirect('/login?success=Đăng xuất thành công');
        });
    }



    notFound(req, res) {
        const { error, success } = req.query;

        res.render("client/404", {
            title: 'Calling - Tổng đài CSKH Đa Kênh Ai',
            // layout: true
            error,
            success
        }
        )
    }
}

export default new HomeController();