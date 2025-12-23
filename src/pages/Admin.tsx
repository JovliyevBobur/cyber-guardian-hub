import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, Info, BookOpen, Gamepad2, Mail, Users, Settings, 
  RefreshCw, Menu, X, LayoutDashboard, FileText, Video, 
  ClipboardList, LogOut
} from 'lucide-react';

// Admin sidebar navigation items
const adminNavItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/home', label: 'Bosh sahifa', icon: Home },
  { path: '/admin/about', label: 'Biz haqimizda', icon: Info },
  { path: '/admin/education', label: "O'quv bo'limi", icon: BookOpen },
  { path: '/admin/games', label: "O'yinlar", icon: Gamepad2 },
  { path: '/admin/contact', label: 'Aloqa', icon: Mail },
  { path: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
  { path: '/admin/settings', label: 'Sozlamalar', icon: Settings },
];

// Reusable Admin Panel Layout
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentPage = adminNavItems.find(item => item.path === location.pathname);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          {sidebarOpen && (
            <h1 className="font-display font-bold text-lg">
              <span className="text-primary">Admin</span> Panel
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {adminNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} gap-2 text-muted-foreground hover:text-destructive`}
            onClick={() => navigate('/')}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && 'Chiqish'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="font-display font-semibold text-xl">
              {currentPage?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Yangilash
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

// Dashboard Page
const DashboardPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Foydalanuvchilar', value: '1,234', icon: Users, color: 'text-blue-500' },
        { label: 'Maqolalar', value: '56', icon: FileText, color: 'text-green-500' },
        { label: 'Video darslar', value: '23', icon: Video, color: 'text-purple-500' },
        { label: 'Testlar', value: '45', icon: ClipboardList, color: 'text-orange-500' },
      ].map((stat, index) => (
        <Card key={index} className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Tez harakatlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adminNavItems.slice(1, 6).map((item) => (
            <Link key={item.path} to={item.path}>
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <item.icon className="w-6 h-6" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Generic Section Admin Page
const SectionAdminPage = ({ title, description, fields }: { 
  title: string; 
  description: string;
  fields: { label: string; type: string; value: string }[];
}) => (
  <div className="space-y-6">
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{title} - Tahrirlash</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        {fields.map((field, index) => (
          <div key={index} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea 
                className="w-full p-3 rounded-lg border border-border bg-background min-h-[100px]"
                defaultValue={field.value}
              />
            ) : (
              <input 
                type={field.type}
                className="w-full p-3 rounded-lg border border-border bg-background"
                defaultValue={field.value}
              />
            )}
          </div>
        ))}
        <Button variant="cyber" className="mt-4">Saqlash</Button>
      </CardContent>
    </Card>
  </div>
);

// Individual Admin Pages
const HomeAdminPage = () => (
  <SectionAdminPage
    title="Bosh sahifa"
    description="Bosh sahifa kontentini tahrirlang"
    fields={[
      { label: 'Sarlavha', type: 'text', value: 'KIBER XAVFSIZLIK' },
      { label: 'Qo\'shimcha sarlavha', type: 'text', value: 'O\'zingizni himoya qilishni o\'rganing' },
      { label: 'Tavsif', type: 'textarea', value: 'Zamonaviy kiber tahdidlardan himoyalanish...' },
    ]}
  />
);

const AboutAdminPage = () => (
  <SectionAdminPage
    title="Biz haqimizda"
    description="'Biz haqimizda' sahifasini tahrirlang"
    fields={[
      { label: 'Missiya sarlavhasi', type: 'text', value: 'Bizning missiyamiz' },
      { label: 'Missiya matni', type: 'textarea', value: 'Jamiyatni kiber tahdidlardan himoya qilish...' },
      { label: 'Maqsad sarlavhasi', type: 'text', value: 'Bizning maqsadimiz' },
      { label: 'Maqsad matni', type: 'textarea', value: 'Har bir foydalanuvchi o\'zini himoya qila oladigan...' },
    ]}
  />
);

const EducationAdminPage = () => (
  <div className="space-y-6">
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>O'quv bo'limi - Boshqaruv</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Maqolalar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">Boshqarish</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video darslar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">Boshqarish</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Testlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">15</p>
              <Button variant="outline" size="sm" className="mt-2 w-full">Boshqarish</Button>
            </CardContent>
          </Card>
        </div>
        <Button variant="cyber">+ Yangi kontent qo'shish</Button>
      </CardContent>
    </Card>
  </div>
);

const GamesAdminPage = () => (
  <div className="space-y-6">
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>O'yinlar - Boshqaruv</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Phishingni aniqlash', status: 'Faol' },
            { title: 'Kuchli parol', status: 'Faol' },
            { title: 'Xavfli havolalar', status: 'Faol' },
          ].map((game, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{game.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="inline-flex px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                  {game.status}
                </span>
                <Button variant="outline" size="sm" className="mt-2 w-full">Tahrirlash</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="cyber">+ Yangi o'yin qo'shish</Button>
      </CardContent>
    </Card>
  </div>
);

const ContactAdminPage = () => (
  <div className="space-y-6">
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Aloqa - Xabarlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { name: 'Ali Valiyev', email: 'ali@example.com', message: 'Savol bor edi...' },
            { name: 'Nodira Karimova', email: 'nodira@example.com', message: 'Platforma haqida...' },
          ].map((msg, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{msg.name}</p>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    <p className="text-sm mt-2">{msg.message}</p>
                  </div>
                  <Button variant="outline" size="sm">Javob</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

const UsersAdminPage = () => (
  <div className="space-y-6">
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Foydalanuvchilar</CardTitle>
        <Button variant="cyber" size="sm">+ Yangi foydalanuvchi</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Ism</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Rol</th>
                <th className="text-left py-3 px-4">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
                { name: 'Test User', email: 'test@example.com', role: 'User' },
              ].map((user, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">Tahrirlash</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

const SettingsAdminPage = () => (
  <SectionAdminPage
    title="Sozlamalar"
    description="Sayt sozlamalarini tahrirlang"
    fields={[
      { label: 'Sayt nomi', type: 'text', value: 'CyberSafe Edu' },
      { label: 'Tavsif', type: 'textarea', value: 'Kiber xavfsizlik platformasi' },
      { label: 'Email', type: 'email', value: 'info@cybersafe.uz' },
    ]}
  />
);

// Main Admin Component
const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Panel | CyberSafe Edu</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="home" element={<HomeAdminPage />} />
          <Route path="about" element={<AboutAdminPage />} />
          <Route path="education" element={<EducationAdminPage />} />
          <Route path="games" element={<GamesAdminPage />} />
          <Route path="contact" element={<ContactAdminPage />} />
          <Route path="users" element={<UsersAdminPage />} />
          <Route path="settings" element={<SettingsAdminPage />} />
        </Routes>
      </AdminLayout>
    </>
  );
};

export default Admin;
