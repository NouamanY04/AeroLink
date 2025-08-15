# AeroLink Admin Authentication Setup

This document explains how to set up and use the admin authentication system for the AeroLink project.

## 🚀 **Quick Setup**

### 1. **Create Default Admin User**
Visit this URL in your browser to create a default admin account:
```
http://your-domain.com/admin/create-default
```

**Default Credentials:**
- **Email:** admin@aerolink.com
- **Password:** admin123

⚠️ **Important:** Remove this route in production!

### 2. **Access Admin Panel**
- **Login URL:** `/admin/login`
- **Dashboard URL:** `/admin/dashboard` (after login)

## 🔐 **Authentication Features**

### **Login System**
- Modern, responsive login form
- Remember me functionality
- Error handling and validation
- CSRF protection

### **Protected Routes**
All admin routes are protected with the `admin` middleware:
- `/admin/dashboard` - Dashboard
- `/admin/flights` - Flight management
- `/admin/bookings` - Booking management
- `/admin/clients` - Client management
- `/admin/airlines` - Airline management
- `/admin/airports` - Airport management

### **Security Features**
- Session-based authentication
- Route protection with middleware
- Automatic logout on session expiry
- Secure password handling

## 🛠 **Technical Implementation**

### **Files Created/Modified:**

1. **`resources/views/auth/login.blade.php`** - Login form
2. **`resources/views/auth/logout.blade.php`** - Logout confirmation
3. **`app/Http/Controllers/AdminAuthController.php`** - Authentication logic
4. **`app/Http/Middleware/AdminMiddleware.php`** - Route protection
5. **`bootstrap/app.php`** - Middleware registration
6. **`routes/web.php`** - Route configuration
7. **`resources/views/admin.blade.php`** - Updated with logout button

### **Middleware Usage**
```php
Route::middleware('admin')->group(function () {
    // Protected admin routes
});
```

### **Authentication Guard**
The system uses a custom `admin` guard configured in `config/auth.php`:
- **Guard:** `admin`
- **Provider:** `admins`
- **Model:** `App\Models\Admin`

## 🔧 **Customization**

### **Change Default Admin Credentials**
Edit the `createDefaultAdmin()` method in `AdminAuthController`:
```php
$admin = Admin::create([
    'name' => 'Your Name',
    'email' => 'your-email@domain.com',
    'password' => Hash::make('your-password'),
]);
```

### **Add More Admin Fields**
Update the `Admin` model and migration to include additional fields like:
- `phone`
- `role`
- `is_active`
- `last_login_at`

### **Customize Login Form**
Modify `resources/views/auth/login.blade.php` to:
- Change styling
- Add additional fields
- Modify validation rules

## 🚨 **Production Considerations**

### **Security Checklist**
- [ ] Remove `/admin/create-default` route
- [ ] Change default admin password
- [ ] Enable HTTPS
- [ ] Set secure session configuration
- [ ] Implement rate limiting
- [ ] Add two-factor authentication (optional)

### **Environment Variables**
Ensure these are set in your `.env` file:
```env
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true
```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"Class Admin not found"**
   - Ensure the `Admin` model exists
   - Check namespace and autoloading

2. **"Route not found"**
   - Clear route cache: `php artisan route:clear`
   - Check route registration in `web.php`

3. **"Middleware not found"**
   - Clear config cache: `php artisan config:clear`
   - Verify middleware registration in `bootstrap/app.php`

4. **Login not working**
   - Check database connection
   - Verify admin user exists
   - Check password hashing

### **Debug Commands**
```bash
# Clear all caches
php artisan optimize:clear

# List all routes
php artisan route:list

# Check middleware
php artisan route:list --middleware=admin
```

## 📚 **Additional Resources**

- [Laravel Authentication Documentation](https://laravel.com/docs/authentication)
- [Laravel Middleware Documentation](https://laravel.com/docs/middleware)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 **Support**

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Laravel logs in `storage/logs/`
3. Verify all files are properly created
4. Check database migrations and seeders

---

**Note:** This authentication system is designed for admin access only. For customer/user authentication, implement a separate system using the `web` guard.
