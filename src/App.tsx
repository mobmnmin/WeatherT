import { useState, useEffect } from 'react'
import './App.css'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

interface StockItem {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
  history: string[];
}

type Tab = 'today' | 'forecast' | 'map' | 'places' | 'stock';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const stocks: StockItem[] = [
    { name: '삼성전자', symbol: '005930', price: '72,500', change: '+1,200', changePercent: '+1.68%', isUp: true, history: ['71,200', '70,500', '71,800', '72,100', '71,300'] },
    { name: 'SK하이닉스', symbol: '000660', price: '185,200', change: '+4,500', changePercent: '+2.49%', isUp: true, history: ['178,000', '181,000', '180,500', '182,300', '180,700'] },
    { name: '애플', symbol: 'AAPL', price: '$189.43', change: '-1.25', changePercent: '-0.66%', isUp: false, history: ['$191.20', '$190.50', '$188.90', '$192.10', '$190.30'] },
    { name: '엔비디아', symbol: 'NVDA', price: '$875.28', change: '+22.40', changePercent: '+2.63%', isUp: true, history: ['$850.10', '$842.50', '$860.00', '$855.20', '$848.90'] },
    { name: '마이크로소프트', symbol: 'MSFT', price: '$415.50', change: '+3.15', changePercent: '+0.76%', isUp: true, history: ['$412.00', '$408.50', '$410.20', '$414.10', '$412.80'] },
    { name: '테슬라', symbol: 'TSLA', price: '$175.22', change: '-5.40', changePercent: '-2.99%', isUp: false, history: ['$182.10', '$180.50', '$178.90', '$181.20', '$179.40'] },
    { name: 'LG에너지솔루션', symbol: '373220', price: '385,000', change: '-2,500', changePercent: '-0.65%', isUp: false, history: ['392,000', '390,500', '388,000', '391,500', '387,500'] },
    { name: '현대차', symbol: '005380', price: '242,500', change: '+3,000', changePercent: '+1.25%', isUp: true, history: ['238,000', '235,500', '240,000', '239,500', '237,000'] },
    { name: '알파벳(구글)', symbol: 'GOOGL', price: '$154.80', change: '+1.20', changePercent: '+0.78%', isUp: true, history: ['$152.10', '$150.50', '$151.80', '$153.20', '$152.90'] },
    { name: '삼성바이오로직스', symbol: '207940', price: '812,000', change: '0', changePercent: '0.00%', isUp: true, history: ['812,000', '808,000', '815,000', '810,000', '812,000'] },
  ];

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const mockData: WeatherData = {
        name: cityName.includes('Jincheon') || cityName.includes('진천') ? '진천군, 충청북도' : cityName,
        main: { temp: 18, feels_like: 17, humidity: 40 },
        weather: [{ description: '맑고 쾌적한 날씨', icon: '01d', main: 'Clear' }],
        wind: { speed: 8 }
      };
      await new Promise(resolve => setTimeout(resolve, 500));
      setWeather(mockData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Jincheon, KR');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput('');
      setActiveTab('today');
    }
  };

  return (
    <div className="min-h-screen font-manrope bg-[#f8f9ff] text-[#0d1c2e]">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white/70 backdrop-blur-[20px] border-b border-white/30">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input 
            type="text"
            placeholder="검색..."
            className="bg-transparent border-none outline-none text-sm font-medium w-32 focus:w-48 transition-all duration-300"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="p-2 hover:bg-sky-50/50 rounded-full transition-colors text-sky-500">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
        <div className="text-lg font-bold tracking-[0.2em] uppercase text-sky-600">
          테스트-박정민
        </div>
        <div className="w-8 h-8 rounded-full bg-sky-100 overflow-hidden border border-white/50">
          <img src="https://lh3.googleusercontent.com/a/default-user" alt="User" />
        </div>
      </header>

      {activeTab === 'today' && (
        <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto space-y-8 animate-fadeIn">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
            </div>
          ) : weather && (
            <>
              <section className="text-center space-y-4 pt-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-sky-600 mb-2">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-xs font-bold uppercase tracking-widest">{weather.name}</span>
                  </div>
                  <h1 className="text-7xl font-light text-slate-800">{Math.round(weather.main.temp)}°</h1>
                  <p className="text-2xl font-medium text-slate-500 opacity-80">{weather.weather[0].description}</p>
                  <div className="mt-6 flex gap-4">
                    <div className="glass-card px-5 py-2 rounded-full flex items-center gap-2">
                      <span className="material-symbols-outlined text-sky-500">air</span>
                      <span className="text-xs font-bold">{weather.wind.speed} km/h</span>
                    </div>
                    <div className="glass-card px-5 py-2 rounded-full flex items-center gap-2">
                      <span className="material-symbols-outlined text-sky-500">humidity_percentage</span>
                      <span className="text-xs font-bold">{weather.main.humidity}%</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 glass-card rounded-3xl p-6 overflow-hidden relative min-h-[200px]">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">하늘 상태</h3>
                    <p className="text-sm text-slate-500 max-w-xs">
                      저녁까지 {weather.weather[0].description.toLowerCase()}가 이어지며 시야가 맑을 것으로 예상됩니다.
                    </p>
                  </div>
                  <span className="absolute bottom-0 right-4 text-9xl opacity-10 material-symbols-outlined scale-150">
                    {weather.weather[0].main === 'Clear' ? 'wb_sunny' : 'cloud'}
                  </span>
                </div>
                <div className="md:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">자외선 지수</h3>
                    <p className="text-xl font-bold">4 보통</p>
                  </div>
                  <div className="w-full h-2 bg-sky-100 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 w-2/5 rounded-full"></div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      )}

      {activeTab === 'forecast' && (
        <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <section className="text-center space-y-2">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest">진천군, 충청북도</p>
            <h2 className="text-6xl font-light text-slate-800">18°</h2>
            <p className="text-lg text-slate-500">맑음 • 최고:20° 최저:10°</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold px-2">7일 예보</h3>
            <div className="glass-card rounded-[2rem] overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {['오늘', '내일', '목요일', '금요일', '토요일', '일요일', '월요일'].map((day, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-white/40 transition-colors">
                    <div className="w-24">
                      <p className={`text-sm ${i === 0 ? 'font-bold' : 'font-medium'}`}>{day}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      <span className="material-symbols-outlined text-amber-400 text-2xl">wb_sunny</span>
                      <p className="text-sm text-slate-500">맑고 화창함</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-bold">18°</span>
                      <span className="text-sm text-slate-300">10°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === 'map' && (
        <main className="relative w-full h-screen animate-fadeIn overflow-hidden">
          <div className="absolute inset-0 z-0">
            <iframe 
              width="100%" height="100%" frameBorder="0" scrolling="no"
              src="https://www.openstreetmap.org/export/embed.html?bbox=127.35,36.75,127.55,36.95&layer=mapnik"
              style={{ filter: 'grayscale(0.2) contrast(1.1) brightness(1.1)' }}
            ></iframe>
          </div>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-48px)] max-w-lg">
            <div className="glass-card rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
              <span className="material-symbols-outlined text-sky-500">location_on</span>
              <input 
                className="bg-transparent border-none outline-none w-full text-sm font-medium" 
                defaultValue="충청북도 진천군"
                readOnly
              />
            </div>
          </div>
        </main>
      )}

      {activeTab === 'places' && (
        <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <header className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-1">관심 지역</p>
              <h1 className="text-3xl font-bold text-slate-800">저장된 위치</h1>
            </div>
            <button className="bg-sky-600 text-white px-6 py-3 rounded-full text-xs font-bold shadow-md">지역 추가</button>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-[2rem] p-8 h-64 md:col-span-2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">진천군</h2>
                <p className="text-sm text-slate-500">충청북도</p>
              </div>
              <span className="text-6xl font-light">18°</span>
            </div>
          </div>
        </main>
      )}

      {activeTab === 'stock' && (
        <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <header>
            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-1">Market Overview</p>
            <h1 className="text-3xl font-bold text-slate-800">주요 종목 현황</h1>
          </header>
          
          <div className="glass-card rounded-[2rem] overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {stocks.map((stock, i) => (
                <div key={i} className="flex flex-col p-5 hover:bg-white/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{stock.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stock.symbol}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold">{stock.price}</span>
                      <span className={`text-[11px] font-bold ${stock.isUp ? 'text-rose-500' : 'text-blue-500'}`}>
                        {stock.change} ({stock.changePercent})
                      </span>
                    </div>
                  </div>
                  {/* 5-day history section */}
                  <div className="flex justify-between items-center bg-slate-50/50 rounded-xl px-4 py-2 border border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">5D History</span>
                    <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                      {stock.history.map((h, idx) => (
                        <div key={idx} className="flex flex-col items-center min-w-[45px]">
                          <span className="text-[8px] text-slate-400">-{5-idx}d</span>
                          <span className="text-[10px] font-medium text-slate-600">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-8 pt-4 bg-white/70 backdrop-blur-[20px] border-t border-white/30 rounded-t-3xl shadow-lg">
        {[
          { id: 'today', icon: 'wb_sunny', label: 'Today' },
          { id: 'forecast', icon: 'calendar_month', label: 'Forecast' },
          { id: 'map', icon: 'map', label: 'Map' },
          { id: 'places', icon: 'location_on', label: 'Places' },
          { id: 'stock', icon: 'trending_up', label: 'Stock' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex flex-col items-center px-3 py-2 rounded-2xl transition-all duration-300 ${activeTab === tab.id ? 'text-sky-600 bg-sky-50' : 'text-slate-400'}`}
          >
            <span className="material-symbols-outlined mb-1">{tab.icon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
