import React, { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, Info, BookOpen, Gamepad2, Mail, Users, Settings, 
  RefreshCw, Menu, X, LayoutDashboard, FileText, Video, 
  ClipboardList, LogOut, LucideIcon
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminNavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

const adminNavItems: AdminNavItem[] = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/home', label: 'Bosh sahifa', icon: Home },
  { path: '/admin/about', label: 'Biz haqimizda', icon: Info },
  { path: '/admin/education', label: "O'quv bo'limi", icon: BookOpen },
  { path: '/admin/games', label: "O'yinlar", icon: Gamepad2 },
  { path: '/admin/contact', label: 'Aloqa', icon: Mail },
  { path: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
  { path: '/admin/settings', label: 'Sozlamalar', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentPage = useMemo(
    () => adminNavItems.find(item => item.path === location.pathname),
    [location.pathname]
  );

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut();
    navigate('/');
  }, [signOut, navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border transition-all duration-300 flex flex-col`}
        aria-label="Admin sidebar"
      >
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
            aria-label={sidebarOpen ? 'Sidebar yopish' : 'Sidebar ochish'}
          >
            {sidebarOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto" aria-label="Admin navigatsiya">
          {adminNavItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} gap-2 text-muted-foreground hover:text-destructive`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
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
              aria-label="Sahifani yangilash"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
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
const DashboardPage: React.FC = () => {
  const stats = useMemo(
    () => [
      { label: 'Foydalanuvchilar', value: '1,234', icon: Users, color: 'text-blue-500' },
      { label: 'Maqolalar', value: '56', icon: FileText, color: 'text-green-500' },
      { label: 'Video darslar', value: '23', icon: Video, color: 'text-purple-500' },
      { label: 'Testlar', value: '45', icon: ClipboardList, color: 'text-orange-500' },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <IconComponent className={`w-10 h-10 ${stat.color}`} aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Tez harakatlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adminNavItems.slice(1, 6).map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button variant="outline" className="w-full h-20 flex-col gap-2">
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface SectionAdminPageProps {
  title: string;
  description: string;
  fields: { label: string; type: string; value: string }[];
}

const SectionAdminPage: React.FC<SectionAdminPageProps> = ({ title, description, fields }) => (
  <div className="space-y-6">
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>{title} - Tahrirlash</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        {fields.map((field, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`field-${index}`} className="text-sm font-medium">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea 
                id={`field-${index}`}
                className="w-full p-3 rounded-lg border border-border bg-background min-h-[100px]"
                defaultValue={field.value}
              />
            ) : (
              <input 
                id={`field-${index}`}
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

const HomeAdminPage: React.FC = () => (
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

const AboutAdminPage: React.FC = () => (
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

const EducationAdminPage: React.FC = () => (
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
                <FileText className="w-5 h-5" aria-hidden="true" />
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
                <Video className="w-5 h-5" aria-hidden="true" />
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
                <ClipboardList className="w-5 h-5" aria-hidden="true" />
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

const GamesAdminPage: React.FC = () => {
  const games = useMemo(
    () => [
      { title: 'Phishingni aniqlash', status: 'Faol' },
      { title: 'Kuchli parol', status: 'Faol' },
      { title: 'Xavfli havolalar', status: 'Faol' },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>O'yinlar - Boshqaruv</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game, index) => (
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
};

const ContactAdminPage: React.FC = () => {
  const messages = useMemo(
    () => [
      { name: 'Ali Valiyev', email: 'ali@example.com', message: 'Savol bor edi...' },
      { name: 'Nodira Karimova', email: 'nodira@example.com', message: 'Platforma haqida...' },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Aloqa - Xabarlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((msg, index) => (
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
};

const UsersAdminPage: React.FC = () => {
  const users = useMemo(
    () => [
      { name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
      { name: 'Test User', email: 'test@example.com', role: 'User' },
    ],
    []
  );

  return (
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
                {users.map((user, index) => (
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
};

const SettingsAdminPage: React.FC = () => (
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

const Admin: React.FC = () => {
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
