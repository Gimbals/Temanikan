import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Activity, 
  Droplets, 
  Thermometer, 
  Wind, 
  Power, 
  Calendar, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw,
  Settings,
  TrendingUp,
  TrendingDown,
  Waves,
  Lightbulb,
  Fan,
  Filter,
  Eye,
  Battery,
  Zap,
  Info
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

interface SensorData {
  time: string;
  ph: number;
  temperature: number;
  turbidity: number;
  oxygen: number;
}

interface DeviceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdate: string;
  batteryLevel?: number;
}

interface CleaningSchedule {
  id: number;
  day: string;
  time: string;
  type: string;
  enabled: boolean;
}

export function MonitoringDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [robotActive, setRobotActive] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [lightIntensity, setLightIntensity] = useState([75]);
  const [filterSpeed, setFilterSpeed] = useState([60]);
  
  // Real-time sensor data simulation
  const [currentData, setCurrentData] = useState({
    ph: 7.2,
    temperature: 26.5,
    turbidity: 15,
    oxygen: 8.5,
    waterLevel: 85,
    lastUpdate: new Date().toLocaleTimeString('id-ID')
  });

  // Historical data for charts
  const [historicalData, setHistoricalData] = useState<SensorData[]>([
    { time: '00:00', ph: 7.0, temperature: 25.5, turbidity: 18, oxygen: 8.2 },
    { time: '04:00', ph: 7.1, temperature: 25.8, turbidity: 16, oxygen: 8.3 },
    { time: '08:00', ph: 7.2, temperature: 26.0, turbidity: 15, oxygen: 8.4 },
    { time: '12:00', ph: 7.3, temperature: 26.5, turbidity: 14, oxygen: 8.5 },
    { time: '16:00', ph: 7.2, temperature: 26.8, turbidity: 15, oxygen: 8.6 },
    { time: '20:00', ph: 7.1, temperature: 26.5, turbidity: 16, oxygen: 8.5 },
    { time: '24:00', ph: 7.2, temperature: 26.5, turbidity: 15, oxygen: 8.5 },
  ]);

  // Device statuses
  const [devices, setDevices] = useState<DeviceStatus[]>([
    { id: 'main', name: 'Sensor Utama', status: 'online', lastUpdate: '2 detik lalu', batteryLevel: 95 },
    { id: 'robot', name: 'Robot Pembersih', status: 'online', lastUpdate: '5 detik lalu', batteryLevel: 78 },
    { id: 'filter', name: 'Sistem Filter', status: 'online', lastUpdate: '1 detik lalu' },
    { id: 'light', name: 'Lampu Akuarium', status: 'online', lastUpdate: '3 detik lalu' },
    { id: 'feeder', name: 'Auto Feeder', status: 'warning', lastUpdate: '2 menit lalu', batteryLevel: 25 },
  ]);

  // Cleaning schedules
  const [schedules, setSchedules] = useState<CleaningSchedule[]>([
    { id: 1, day: 'Senin', time: '08:00', type: 'Pembersihan Dasar', enabled: true },
    { id: 2, day: 'Rabu', time: '08:00', type: 'Pembersihan Menyeluruh', enabled: true },
    { id: 3, day: 'Jumat', time: '08:00', type: 'Pembersihan Dasar', enabled: true },
    { id: 4, day: 'Minggu', time: '10:00', type: 'Maintenance Lengkap', enabled: false },
  ]);

  // Water quality assessment data
  const waterQualityData = [
    { name: 'pH', value: 95, fill: '#06b6d4' },
    { name: 'Suhu', value: 88, fill: '#3b82f6' },
    { name: 'Oksigen', value: 92, fill: '#10b981' },
    { name: 'Kejernihan', value: 78, fill: '#8b5cf6' },
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => ({
        ph: +(prev.ph + (Math.random() - 0.5) * 0.1).toFixed(2),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.2).toFixed(1),
        turbidity: Math.max(5, Math.min(30, prev.turbidity + (Math.random() - 0.5) * 2)),
        oxygen: +(prev.oxygen + (Math.random() - 0.5) * 0.1).toFixed(1),
        waterLevel: prev.waterLevel,
        lastUpdate: new Date().toLocaleTimeString('id-ID')
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get status color and icon
  const getStatusInfo = (value: number, optimal: [number, number]) => {
    if (value >= optimal[0] && value <= optimal[1]) {
      return { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2, status: 'Optimal' };
    } else if (value >= optimal[0] - 0.5 && value <= optimal[1] + 0.5) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle, status: 'Perhatian' };
    } else {
      return { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle, status: 'Bahaya' };
    }
  };

  const phStatus = getStatusInfo(currentData.ph, [6.8, 7.5]);
  const tempStatus = getStatusInfo(currentData.temperature, [25, 28]);
  const oxygenStatus = getStatusInfo(currentData.oxygen, [7, 9]);

  // Robot control handlers
  const handleRobotToggle = () => {
    setRobotActive(!robotActive);
  };

  const handleEmergencyClean = () => {
    setRobotActive(true);
    // Simulate robot activation
    setTimeout(() => {
      setRobotActive(false);
    }, 5000);
  };

  const toggleSchedule = (id: number) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            Dashboard Monitoring IoT
          </h1>
          <p className="text-gray-600 mt-1">
            Pantau kondisi akuarium secara real-time dengan teknologi IoT
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className={`${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-4 py-2`}>
            {isOnline ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
            {isOnline ? 'Terhubung' : 'Terputus'}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan
          </Button>
        </div>
      </div>

      {/* System Alert */}
      {devices.some(d => d.status === 'warning') && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Peringatan:</strong> Auto Feeder memiliki baterai rendah (25%). Segera ganti baterai.
          </AlertDescription>
        </Alert>
      )}

      {/* Real-time Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* pH Level */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl ${phStatus.bg} flex items-center justify-center`}>
                <Droplets className={`w-6 h-6 ${phStatus.color}`} />
              </div>
              <Badge className={`${phStatus.bg} ${phStatus.color} border-0`}>
                {phStatus.status}
              </Badge>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm mb-1">Level pH</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{currentData.ph}</span>
                <span className="text-sm text-gray-500">pH</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Minimal: 6.0</span>
                <span>Optimal: 6.8-7.5</span>
                <span>Maksimal: 8.0</span>
              </div>
              <Progress value={((currentData.ph - 6) / 2) * 100} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Update: {currentData.lastUpdate}
            </div>
          </div>
        </Card>

        {/* Temperature */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl ${tempStatus.bg} flex items-center justify-center`}>
                <Thermometer className={`w-6 h-6 ${tempStatus.color}`} />
              </div>
              <Badge className={`${tempStatus.bg} ${tempStatus.color} border-0`}>
                {tempStatus.status}
              </Badge>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm mb-1">Suhu Air</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{currentData.temperature}</span>
                <span className="text-sm text-gray-500">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Min: 23°C</span>
                <span>Optimal: 25-28°C</span>
                <span>Max: 30°C</span>
              </div>
              <Progress value={((currentData.temperature - 23) / 7) * 100} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Update: {currentData.lastUpdate}
            </div>
          </div>
        </Card>

        {/* Turbidity */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <Badge className="bg-purple-50 text-purple-700 border-0">
                {currentData.turbidity < 20 ? 'Baik' : 'Perlu Dibersihkan'}
              </Badge>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm mb-1">Kekeruhan Air</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{currentData.turbidity.toFixed(0)}</span>
                <span className="text-sm text-gray-500">NTU</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Jernih: &lt;10</span>
                <span>Normal: 10-20</span>
                <span>Keruh: &gt;20</span>
              </div>
              <Progress value={(currentData.turbidity / 30) * 100} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Update: {currentData.lastUpdate}
            </div>
          </div>
        </Card>

        {/* Oxygen Level */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl ${oxygenStatus.bg} flex items-center justify-center`}>
                <Wind className={`w-6 h-6 ${oxygenStatus.color}`} />
              </div>
              <Badge className={`${oxygenStatus.bg} ${oxygenStatus.color} border-0`}>
                {oxygenStatus.status}
              </Badge>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm mb-1">Oksigen Terlarut</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{currentData.oxygen}</span>
                <span className="text-sm text-gray-500">mg/L</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Min: 5</span>
                <span>Optimal: 7-9</span>
                <span>Max: 10</span>
              </div>
              <Progress value={(currentData.oxygen / 10) * 100} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              Update: {currentData.lastUpdate}
            </div>
          </div>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Historical Data Chart */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Grafik Data Historis</h3>
                  <p className="text-sm text-gray-600">Monitoring parameter air dalam 24 jam terakhir</p>
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 Jam</SelectItem>
                    <SelectItem value="7d">7 Hari</SelectItem>
                    <SelectItem value="30d">30 Hari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="ph">pH</TabsTrigger>
                  <TabsTrigger value="temp">Suhu</TabsTrigger>
                  <TabsTrigger value="turb">Kekeruhan</TabsTrigger>
                  <TabsTrigger value="oxy">Oksigen</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="ph" stroke="#06b6d4" strokeWidth={2} name="pH" dot={{ fill: '#06b6d4' }} />
                      <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} name="Suhu (°C)" dot={{ fill: '#3b82f6' }} />
                      <Line type="monotone" dataKey="oxygen" stroke="#10b981" strokeWidth={2} name="Oksigen (mg/L)" dot={{ fill: '#10b981' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="ph">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[6.5, 7.5]} stroke="#6b7280" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="ph" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPh)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="temp">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[24, 28]} stroke="#6b7280" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="temperature" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="turb">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="turbidity" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="oxy">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient id="colorOxy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[7, 9]} stroke="#6b7280" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="oxygen" stroke="#10b981" fillOpacity={1} fill="url(#colorOxy)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </div>
          </Card>

          {/* Water Quality Assessment */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Penilaian Kualitas Air</h3>
              
              <div className="space-y-6">
                {/* Progress Bars Only - Remove Radial Chart */}
                <div className="space-y-4">
                  {waterQualityData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                      </div>
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${item.value}%`,
                            backgroundColor: item.fill
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Status: Sangat Baik</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Semua parameter kualitas air berada dalam kondisi optimal. Ikan Anda dalam lingkungan yang sehat dan aman.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Device Status */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Perangkat</h3>
              <div className="space-y-3">
                {devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        device.status === 'online' ? 'bg-green-500' : 
                        device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      } animate-pulse`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{device.name}</p>
                        <p className="text-xs text-gray-500">{device.lastUpdate}</p>
                      </div>
                    </div>
                    {device.batteryLevel && (
                      <div className="flex items-center gap-1">
                        <Battery className={`w-4 h-4 ${
                          device.batteryLevel > 50 ? 'text-green-600' :
                          device.batteryLevel > 25 ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                        <span className="text-xs font-medium text-gray-600">{device.batteryLevel}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Robot Control */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Kontrol Robot</h3>
                <div className={`w-3 h-3 rounded-full ${robotActive ? 'bg-green-400' : 'bg-white/30'} animate-pulse`}></div>
              </div>
              <p className="text-cyan-100 text-sm">
                {robotActive ? 'Robot sedang membersihkan akuarium...' : 'Robot siap digunakan'}
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Power className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mode Otomatis</p>
                    <p className="text-xs text-gray-500">Pembersihan terjadwal</p>
                  </div>
                </div>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleRobotToggle}
                  className={`${robotActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  {robotActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {robotActive ? 'Stop' : 'Mulai'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleEmergencyClean}
                  disabled={robotActive}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Darurat
                </Button>
              </div>

              {robotActive && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-gray-500">Estimasi selesai: 8 menit</p>
                </div>
              )}
            </div>
          </Card>

          {/* Aquarium Controls */}
          <Card className="border-0 shadow-lg">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Kontrol Akuarium</h3>
              
              {/* Light Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Intensitas Lampu</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{lightIntensity[0]}%</span>
                </div>
                <Slider 
                  value={lightIntensity} 
                  onValueChange={setLightIntensity}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Filter Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Kecepatan Filter</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{filterSpeed[0]}%</span>
                </div>
                <Slider 
                  value={filterSpeed} 
                  onValueChange={setFilterSpeed}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Water Level */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-medium text-gray-700">Tinggi Air</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{currentData.waterLevel}%</span>
                </div>
                <Progress value={currentData.waterLevel} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Cleaning Schedule */}
          <Card className="border-0 shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Jadwal Pembersihan</h3>
                <Button variant="ghost" size="sm">
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={schedule.enabled} 
                        onCheckedChange={() => toggleSchedule(schedule.id)}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{schedule.day}</p>
                        <p className="text-xs text-gray-500">{schedule.time} - {schedule.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Calendar className="w-4 h-4 mr-2" />
                Tambah Jadwal
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Info Footer */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Tips Monitoring</h4>
              <p className="text-sm text-gray-600">
                Periksa dashboard secara rutin untuk memastikan kondisi optimal akuarium Anda. 
                Sistem akan mengirim notifikasi otomatis jika ada parameter yang keluar dari batas normal. 
                Pastikan semua perangkat IoT terhubung dengan baik untuk monitoring yang akurat.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MonitoringDashboard;