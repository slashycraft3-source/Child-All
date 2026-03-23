import React, { useState } from 'react';
import { 
  Shield, MapPin, Camera, Mic, MessageSquare, 
  Phone, Terminal, Battery, Wifi, Settings, 
  User, Clock, AlertCircle, CheckCircle2, ChevronRight
} from 'lucide-react';

// Mock Data
const MOCK_DEVICE = {
  id: 'deviceId_123',
  name: "Alex's Pixel 7",
  battery: 85,
  isOnline: true,
  lastSeen: 'Just now',
  permissions: {
    location: true,
    camera: true,
    audio: true,
    sms: true
  }
};

const MOCK_LOGS = [
  { id: 1, type: 'sms', contact: 'Mom', preview: 'Are you on your way?', time: '10:30 AM', dir: 'in' },
  { id: 2, type: 'sms', contact: 'Mom', preview: 'Yes, almost there.', time: '10:32 AM', dir: 'out' },
  { id: 3, type: 'call', contact: 'Unknown', preview: 'Missed Call', time: '09:15 AM', dir: 'in' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple mock authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid password. (Hint: admin123)');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Slashy Control</h1>
          <p className="text-slate-500 text-center mb-8">Admin Dashboard Access</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Admin Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Slashy Control</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<Shield />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<MapPin />} label="Location" isActive={activeTab === 'location'} onClick={() => setActiveTab('location')} />
          <NavItem icon={<Camera />} label="Media Gallery" isActive={activeTab === 'media'} onClick={() => setActiveTab('media')} />
          <NavItem icon={<MessageSquare />} label="Comms Logs" isActive={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
          <NavItem icon={<Terminal />} label="Remote Commands" isActive={activeTab === 'commands'} onClick={() => setActiveTab('commands')} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
            <User className="w-8 h-8 text-slate-400 bg-white rounded-full p-1 shadow-sm" />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-500">Parent Account</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-semibold capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              System Online
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Device Status Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{MOCK_DEVICE.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Last synced: {MOCK_DEVICE.lastSeen}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                      Primary Device
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatusWidget icon={<Battery className="text-emerald-500" />} label="Battery" value={`${MOCK_DEVICE.battery}%`} />
                    <StatusWidget icon={<Wifi className="text-blue-500" />} label="Connectivity" value={MOCK_DEVICE.isOnline ? 'Online (WiFi)' : 'Offline'} />
                    <StatusWidget icon={<Shield className="text-indigo-500" />} label="Monitoring" value="Active" />
                  </div>
                </div>

                {/* Permissions Status */}
                <h3 className="text-lg font-semibold mt-8 mb-4">Device Permissions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <PermissionCard icon={<MapPin />} label="Location" granted={MOCK_DEVICE.permissions.location} />
                  <PermissionCard icon={<Camera />} label="Camera" granted={MOCK_DEVICE.permissions.camera} />
                  <PermissionCard icon={<Mic />} label="Microphone" granted={MOCK_DEVICE.permissions.audio} />
                  <PermissionCard icon={<MessageSquare />} label="SMS/Calls" granted={MOCK_DEVICE.permissions.sms} />
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Live Tracking</span>
                  </div>
                  <button className="text-sm bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                    Force Sync
                  </button>
                </div>
                <div className="flex-1 bg-slate-200 relative flex items-center justify-center">
                  {/* Mock Map Background */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
                  
                  {/* Mock Location Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg mb-2">
                      {MOCK_DEVICE.name}
                    </div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-xl animate-bounce"></div>
                    <div className="w-12 h-4 bg-black/10 rounded-full blur-sm mt-1"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'commands' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommandCard 
                  icon={<Camera className="w-6 h-6 text-purple-600" />}
                  title="Take Photo"
                  description="Silently capture a photo using the device camera."
                  actions={['Front Camera', 'Back Camera']}
                />
                <CommandCard 
                  icon={<Mic className="w-6 h-6 text-rose-600" />}
                  title="Record Audio"
                  description="Start a background microphone recording."
                  actions={['Record 1 Min', 'Record 5 Mins']}
                />
                <CommandCard 
                  icon={<MapPin className="w-6 h-6 text-blue-600" />}
                  title="Get Location"
                  description="Force an immediate high-accuracy GPS sync."
                  actions={['Sync Now']}
                />
                <CommandCard 
                  icon={<AlertCircle className="w-6 h-6 text-amber-600" />}
                  title="Send Alert"
                  description="Push a visible notification to the child's screen."
                  actions={['Send "Call Me"', 'Custom Message']}
                />
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Contact</th>
                      <th className="p-4 font-medium">Details</th>
                      <th className="p-4 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_LOGS.map(log => (
                      <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.type === 'sms' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            {log.type === 'sms' ? <MessageSquare className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{log.contact}</td>
                        <td className="p-4 text-slate-600">{log.preview}</td>
                        <td className="p-4 text-sm text-slate-500">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="group relative aspect-square bg-slate-200 rounded-xl overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/slashy${i}/400/400`} 
                      alt="Captured media" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-white text-sm font-medium">Mar 22, 11:{30 + i} AM</span>
                      <span className="text-white/80 text-xs">Front Camera</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-blue-50 text-blue-700 font-medium' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: `w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}` })}
      {label}
    </button>
  );
}

function StatusWidget({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
      <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function PermissionCard({ icon, label, granted }: { icon: React.ReactNode, label: string, granted: boolean }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center gap-2">
      <div className={`p-3 rounded-full ${granted ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
      {granted ? (
        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><CheckCircle2 className="w-3 h-3" /> Granted</span>
      ) : (
        <span className="flex items-center gap-1 text-xs text-rose-600 font-medium"><AlertCircle className="w-3 h-3" /> Missing</span>
      )}
    </div>
  );
}

function CommandCard({ icon, title, description, actions }: { icon: React.ReactNode, title: string, description: string, actions: string[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={() => alert(`Command sent: ${action}`)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              idx === 0 
                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
