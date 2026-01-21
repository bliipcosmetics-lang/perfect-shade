import React, { useState, useEffect } from 'react';
import { Camera, Home, Droplet, FileText, User, ChevronLeft, ChevronRight, Sun, Calendar, Zap, Clock, ShoppingBag, Settings, TrendingUp, Shield } from 'lucide-react';

const PerfectShadeApp = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [shadeValue, setShadeValue] = useState(50);
  const [selectedZones, setSelectedZones] = useState([]);
  const [intensity, setIntensity] = useState('medium');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [mixing, setMixing] = useState(false);
  const [mixTime, setMixTime] = useState(10);
  const [mixStep, setMixStep] = useState(1);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('onboarding'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (scanning && scanProgress < 100) {
      const timer = setTimeout(() => setScanProgress(scanProgress + 2), 50);
      return () => clearTimeout(timer);
    } else if (scanning && scanProgress >= 100) {
      setTimeout(() => {
        setScanning(false);
        setCurrentScreen('scanResults');
      }, 500);
    }
  }, [scanning, scanProgress]);

  useEffect(() => {
    if (mixing && mixTime > 0) {
      const timer = setTimeout(() => setMixTime(mixTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (mixing && mixTime === 0 && mixStep < 3) {
      setMixStep(mixStep + 1);
      setMixTime(10);
    }
  }, [mixing, mixTime, mixStep]);

  const zones = [
    { id: 'face', name: 'Face & Neck', icon: '👤' },
    { id: 'arms', name: 'Arms', icon: '💪' },
    { id: 'legs', name: 'Legs', icon: '🦵' },
    { id: 'torso', name: 'Torso', icon: '👕' }
  ];

  const intensities = [
    { id: 'light', name: 'Subtle Glow', desc: 'Natural everyday look', color: 'from-amber-200 to-amber-300' },
    { id: 'medium', name: 'Sun Kissed', desc: 'Perfect vacation vibe', color: 'from-amber-400 to-amber-500' },
    { id: 'deep', name: 'Deep Tan', desc: 'Bold, dramatic effect', color: 'from-amber-600 to-amber-700' }
  ];

  const NavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        {[
          { icon: Home, label: 'Home', screen: 'home' },
          { icon: Camera, label: 'Scan', screen: 'scanCamera' },
          { icon: Droplet, label: 'Recipe', screen: 'recipe' },
          { icon: User, label: 'Profile', screen: 'profile' }
        ].map(({ icon: Icon, label, screen }) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === screen ? 'text-amber-600 scale-110' : 'text-gray-400'
            }`}
          >
            <Icon size={22} strokeWidth={1.5} />
            <span className="text-xs font-light">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const SplashScreen = () => (
    <div className="h-screen bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="text-center z-10 animate-fadeIn">
        <div className="mb-8">
          <Droplet size={80} className="text-white mx-auto animate-bounce" strokeWidth={1} />
        </div>
        <h1 className="text-5xl font-light text-white tracking-widest mb-2">PERFECT SHADE</h1>
        <p className="text-white/80 text-sm tracking-wide">Smart Self-Tanner Technology</p>
      </div>
    </div>
  );

  const OnboardingScreen = () => (
    <div className="h-screen bg-gradient-to-b from-white to-amber-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-8 relative">
          <div className="w-64 h-64 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Sun size={120} className="text-amber-600 relative z-10 animate-pulse" strokeWidth={1} />
        </div>
        <h2 className="text-4xl font-light text-gray-900 mb-4">Le laboratoire<br/>dans votre main</h2>
        <p className="text-gray-600 font-light leading-relaxed max-w-sm mb-12">
          Analyse précise de votre carnation. Dosage sur-mesure. Résultat parfait à chaque fois.
        </p>
        <button
          onClick={() => setCurrentScreen('home')}
          className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-12 py-4 rounded-full font-light tracking-wide hover:shadow-2xl hover:scale-105 transition-all"
        >
          COMMENCER
        </button>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-1">Bonjour</h1>
            <p className="text-sm text-gray-500 font-light">Prête pour votre glow parfait ?</p>
          </div>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-light mb-2">Prochaine application</p>
            <h3 className="text-white text-2xl font-light mb-6">Wedding Day - J-3</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs mb-1">Intensité recommandée</p>
                <p className="text-white text-lg font-light">Medium Glow</p>
              </div>
              <button 
                onClick={() => setCurrentScreen('scanCamera')}
                className="bg-white text-amber-600 px-6 py-3 rounded-full text-sm font-light hover:scale-105 transition-all"
              >
                Scanner maintenant
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => setCurrentScreen('history')}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
          >
            <Clock size={24} className="text-amber-600 mb-3" strokeWidth={1.5} />
            <h4 className="text-gray-900 font-light mb-1">Historique</h4>
            <p className="text-xs text-gray-500 font-light">12 applications</p>
          </button>
          <button 
            onClick={() => setCurrentScreen('spfScanner')}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
          >
            <Shield size={24} className="text-amber-600 mb-3" strokeWidth={1.5} />
            <h4 className="text-gray-900 font-light mb-1">Scanner SPF</h4>
            <p className="text-xs text-gray-500 font-light">Vérifier protection</p>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-gray-900 font-light">Niveau de stock</h4>
            <button 
              onClick={() => setCurrentScreen('refills')}
              className="text-amber-600 text-sm font-light"
            >
              Commander
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Crème Base</span>
                <span>78%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Sérum Concentré</span>
                <span className="text-orange-600">25%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );

  const ScanCameraScreen = () => (
    <div className="min-h-screen bg-black pb-24 relative">
      <div className="absolute top-8 left-8 z-20">
        <button onClick={() => setCurrentScreen('home')} className="text-white/80 hover:text-white">
          <ChevronLeft size={32} />
        </button>
      </div>

      <div className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
        
        {!scanning ? (
          <div className="text-center z-10">
            <div className="w-64 h-64 rounded-full border-4 border-white/30 border-dashed mb-8 mx-auto flex items-center justify-center relative animate-pulse">
              <Camera size={80} className="text-white/60" strokeWidth={1} />
              <div className="absolute top-0 left-1/2 w-1 h-8 bg-white/60 -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-white/60 -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 w-8 h-1 bg-white/60 -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 w-8 h-1 bg-white/60 -translate-y-1/2" />
            </div>
            <h2 className="text-white text-2xl font-light mb-2">Positionnez votre visage</h2>
            <p className="text-white/60 text-sm font-light mb-8">Centrez-vous dans le cadre</p>
            <button
              onClick={() => {
                setScanning(true);
                setScanProgress(0);
              }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-light hover:scale-105 transition-all"
            >
              SCANNER MA PEAU
            </button>
          </div>
        ) : (
          <div className="text-center z-10">
            <div className="w-64 h-64 rounded-full border-4 border-amber-400 mb-8 mx-auto relative overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-400 to-transparent transition-all duration-300"
                style={{ height: `${scanProgress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-4xl font-light">{scanProgress}%</span>
              </div>
            </div>
            <h2 className="text-white text-2xl font-light mb-2">Analyse en cours...</h2>
            <p className="text-white/60 text-sm font-light">Restez immobile</p>
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );

  const ScanResultsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('home')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Analyse de peau</h1>
          <div className="w-7" />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-64">
              <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-yellow-400 to-red-400 rounded-full blur-xl opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-300 via-amber-300 to-orange-400 rounded-full" />
              <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute top-12 right-8 w-6 h-6 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-5xl font-light mb-2">92%</p>
                  <p className="text-white/80 text-sm font-light">Couverture</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-lg">⚠️</span>
              </div>
              <div>
                <p className="text-gray-900 font-light">Zone manquée : Front gauche</p>
                <p className="text-sm text-gray-500 font-light">Réappliquer pour une couverture totale</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 text-lg">⚠️</span>
              </div>
              <div>
                <p className="text-gray-900 font-light">Zone manquée : Cou droit</p>
                <p className="text-sm text-gray-500 font-light">Application insuffisante détectée</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-700 font-light text-center">
              ✨ Réappliquez dans les zones rouges pour une protection optimale
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('zoneSelection')}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all"
          >
            CONTINUER
          </button>
        </div>
      </div>
      <NavBar />
    </div>
  );

  const ZoneSelectionScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('scanResults')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Zones à traiter</h1>
          <div className="w-7" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {zones.map(zone => (
            <button
              key={zone.id}
              onClick={() => {
                if (selectedZones.includes(zone.id)) {
                  setSelectedZones(selectedZones.filter(z => z !== zone.id));
                } else {
                  setSelectedZones([...selectedZones, zone.id]);
                }
              }}
              className={`p-6 rounded-3xl transition-all ${
                selectedZones.includes(zone.id)
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-xl scale-105'
                  : 'bg-white border-2 border-gray-100 hover:border-amber-200'
              }`}
            >
              <div className="text-5xl mb-3">{zone.icon}</div>
              <h3 className={`text-lg font-light mb-1 ${
                selectedZones.includes(zone.id) ? 'text-white' : 'text-gray-900'
              }`}>
                {zone.name}
              </h3>
              {selectedZones.includes(zone.id) && (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mx-auto mt-2">
                  <span className="text-amber-600 text-sm">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
          <p className="text-gray-600 font-light text-center">
            {selectedZones.length === 0 ? 'Sélectionnez au moins une zone' : `${selectedZones.length} zone${selectedZones.length > 1 ? 's' : ''} sélectionnée${selectedZones.length > 1 ? 's' : ''}`}
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('intensitySelection')}
          disabled={selectedZones.length === 0}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          CHOISIR L'INTENSITÉ
        </button>
      </div>
      <NavBar />
    </div>
  );

  const IntensitySelectionScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('zoneSelection')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Intensité désirée</h1>
          <div className="w-7" />
        </div>

        <div className="space-y-4 mb-8">
          {intensities.map(int => (
            <button
              key={int.id}
              onClick={() => setIntensity(int.id)}
              className={`w-full p-6 rounded-3xl transition-all ${
                intensity === int.id
                  ? 'shadow-2xl scale-105 ring-4 ring-amber-200'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${int.color} flex-shrink-0`} />
                <div className="text-left flex-1">
                  <h3 className="text-xl font-light text-gray-900 mb-1">{int.name}</h3>
                  <p className="text-sm text-gray-500 font-light">{int.desc}</p>
                </div>
                {intensity === int.id && (
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentScreen('eventPlanning')}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all"
        >
          PLANIFIER L'APPLICATION
        </button>
      </div>
      <NavBar />
    </div>
  );

  const EventPlanningScreen = () => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const selectedDay = 20;

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
        <div className="p-8 pt-16">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setCurrentScreen('intensitySelection')} className="text-gray-600">
              <ChevronLeft size={28} />
            </button>
            <h1 className="text-2xl font-light text-gray-900">Événement spécial</h1>
            <div className="w-7" />
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <ChevronLeft className="text-gray-400" size={24} />
              <h2 className="text-xl font-light text-gray-900">JUIN 2026</h2>
              <ChevronRight className="text-gray-400" size={24} />
            </div>

            <div className="grid grid-cols-7 gap-2 mb-8">
              {['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'].map(day => (
                <div key={day} className="text-center text-xs text-gray-400 font-light py-2">
                  {day}
                </div>
              ))}
              {days.map(day => (
                <button
                  key={day}
                  className={`aspect-square rounded-2xl text-sm font-light transition-all ${
                    day === selectedDay
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg scale-110'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-amber-600" />
                <p className="text-amber-900 font-light">Wedding Day - 29 Juin</p>
              </div>
              <p className="text-sm text-gray-600 font-light">J-9 : Début du programme progressif recommandé</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-light text-gray-900 mb-4">Programme de bronzage</h3>
              <div className="relative">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 rounded-full" style={{ width: '60%' }} />
                </div>
                <div className="flex justify-between">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Début</p>
                    <p className="text-sm font-light text-gray-900">15 Juin</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Boost</p>
                    <p className="text-sm font-light text-gray-900">22 Juin</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Perfection</p>
                    <p className="text-sm font-light text-amber-600">29 Juin</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreen('recipe')}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all"
            >
              VOIR MA RECETTE
            </button>
          </div>
        </div>
        <NavBar />
      </div>
    );
  };

  const RecipeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('eventPlanning')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Votre recette</h1>
          <div className="w-7" />
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl shadow-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-light mb-2">Perfect Shade - {intensity === 'light' ? 'Subtle Glow' : intensity === 'medium' ? 'Sun Kissed' : 'Deep Tan'}</h2>
            <p className="text-white/80 text-sm font-light mb-6">Formule personnalisée pour {selectedZones.length} zone{selectedZones.length > 1 ? 's' : ''}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-12 h-16 bg-gradient-to-b from-white to-amber-100 rounded-xl shadow-lg mb-3 mx-auto" />
                <p className="text-white/80 text-xs font-light mb-1">Crème Base</p>
                <p className="text-white text-3xl font-light">4</p>
                <p className="text-white/60 text-xs font-light">pompes</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="w-12 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-xl shadow-lg mb-3 mx-auto" />
                <p className="text-white/80 text-xs font-light">Sérum DHA</p>
                <p className="text-white text-3xl font-light">6</p>
                <p className="text-white/60 text-xs font-light">clics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-lg font-light text-gray-900 mb-4">Pourquoi ce dosage ?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Zap size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-gray-900 font-light text-sm">Adapté à votre carnation : Teinte {Math.round(shadeValue)}</p>
                <p className="text-xs text-gray-500 font-light">Analysée par scan facial</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-gray-900 font-light text-sm">Intensité {intensity === 'light' ? 'légère' : intensity === 'medium' ? 'moyenne' : 'profonde'}</p>
                <p className="text-xs text-gray-500 font-light">Progression naturelle sur 10 jours</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setMixing(true);
            setMixTime(10);
            setMixStep(1);
            setCurrentScreen('mixing');
          }}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Droplet size={20} />
          PRÉPARER LE MÉLANGE
        </button>
      </div>
      <NavBar />
    </div>
  );

  const MixingScreen = () => {
    const steps = [
      { id: 1, title: 'Dispenser la base', desc: '4 pompes de Crème Base dans le bouchon', icon: '🧴' },
      { id: 2, title: 'Ajouter le sérum', desc: '6 clics du Stylo Activateur', icon: '💧' },
      { id: 3, title: 'Mélanger', desc: 'Mélanger avec la pointe pendant 10 secondes', icon: '🌀' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
        <div className="p-8 pt-16">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => {
              setMixing(false);
              setCurrentScreen('recipe');
            }} className="text-gray-600">
              <ChevronLeft size={28} />
            </button>
            <h1 className="text-2xl font-light text-gray-900">Instructions</h1>
            <div className="w-7" />
          </div>

          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    mixStep >= step.id ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-light text-center">Étape {mixStep} sur {steps.length}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">{steps[mixStep - 1].icon}</div>
              <h2 className="text-2xl font-light text-gray-900 mb-2">{steps[mixStep - 1].title}</h2>
              <p className="text-gray-600 font-light">{steps[mixStep - 1].desc}</p>
            </div>

            {mixStep === 3 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2 font-light">Temps de mélange</p>
                <p className="text-6xl font-light text-amber-600 mb-2">0:{mixTime.toString().padStart(2, '0')}</p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all"
                    style={{ width: `${((10 - mixTime) / 10) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {mixStep < 3 ? (
            <button
              onClick={() => setMixStep(mixStep + 1)}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all"
            >
              ÉTAPE SUIVANTE
            </button>
          ) : mixTime > 0 ? (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-4 rounded-full font-light tracking-wide cursor-not-allowed"
            >
              MÉLANGE EN COURS...
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('complete')}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all"
            >
              ✓ PRÊT À APPLIQUER
            </button>
          )}
        </div>
        <NavBar />
      </div>
    );
  };

  const CompleteScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <span className="text-6xl">✨</span>
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-4">Parfait !</h1>
        <p className="text-gray-600 font-light mb-8 leading-relaxed">
          Votre formule est prête. Appliquez uniformément sur les zones sélectionnées en mouvements circulaires.
        </p>
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100">
          <h3 className="text-lg font-light text-gray-900 mb-4">Conseils d'application</h3>
          <ul className="space-y-3 text-left text-sm text-gray-600 font-light">
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              <span>Appliquez immédiatement après le mélange</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              <span>Mouvements circulaires uniformes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              <span>Lavez-vous les mains après application</span>
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              <span>Résultat visible sous 4-6 heures</span>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all"
        >
          RETOUR À L'ACCUEIL
        </button>
      </div>
    </div>
  );

  const SPFScannerScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('home')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Scanner SPF</h1>
          <div className="w-7" />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <Shield size={80} className="text-blue-500 mx-auto mb-4" strokeWidth={1} />
            <h2 className="text-2xl font-light text-gray-900 mb-2">Protection solaire</h2>
            <p className="text-gray-600 font-light">Vérifiez votre niveau de protection UV</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-light">SPF détecté</span>
              <span className="text-3xl font-light text-blue-600">30</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-blue-500 rounded-full" style={{ width: '60%' }} />
            </div>
            <p className="text-sm text-gray-600 font-light">Protection moyenne - Renouveler toutes les 2h</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <Sun size={16} className="text-yellow-500" />
              <span className="text-gray-600 font-light">Index UV actuel : <span className="font-normal">6 (Élevé)</span></span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-gray-400" />
              <span className="text-gray-600 font-light">Dernière application : <span className="font-normal">Il y a 1h30</span></span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-full font-light tracking-wide hover:shadow-xl transition-all">
            SCANNER À NOUVEAU
          </button>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <p className="text-sm text-amber-900 font-light text-center">
            ☀️ Important : Appliquez toujours un SPF avant votre autobronzant
          </p>
        </div>
      </div>
      <NavBar />
    </div>
  );

  const HistoryScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('home')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Historique</h1>
          <div className="w-7" />
        </div>

        <div className="space-y-4">
          {[
            { date: "Aujourd'hui", time: '14:30', zones: 'Visage, Bras', intensity: 'Medium', result: 'Excellent' },
            { date: 'Hier', time: '09:15', zones: 'Jambes', intensity: 'Light', result: 'Bon' },
            { date: '18 Juin', time: '16:45', zones: 'Visage, Cou', intensity: 'Medium', result: 'Excellent' },
            { date: '15 Juin', time: '10:00', zones: 'Corps complet', intensity: 'Deep', result: 'Parfait' },
          ].map((entry, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-900 font-light">{entry.date}</p>
                  <p className="text-sm text-gray-500 font-light">{entry.time}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-xs font-light ${
                  entry.result === 'Parfait' || entry.result === 'Excellent' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {entry.result}
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-gray-500 font-light mb-1">Zones</p>
                  <p className="text-gray-900 font-light">{entry.zones}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-light mb-1">Intensité</p>
                  <p className="text-gray-900 font-light">{entry.intensity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );

  const RefillsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="p-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setCurrentScreen('home')} className="text-gray-600">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-light text-gray-900">Recharges</h1>
          <div className="w-7" />
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl shadow-xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <ShoppingBag size={48} className="text-white mb-4" strokeWidth={1} />
            <h2 className="text-white text-2xl font-light mb-2">Abonnement actif</h2>
            <p className="text-white/80 text-sm font-light mb-4">Prochaine livraison le 1er Août</p>
            <div className="flex gap-4">
              <button className="flex-1 bg-white text-amber-600 py-3 rounded-full text-sm font-light hover:scale-105 transition-all">
                Gérer
              </button>
              <button className="flex-1 bg-white/20 text-white py-3 rounded-full text-sm font-light hover:bg-white/30 transition-all">
                Modifier
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-20 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-inner" />
              <div className="flex-1">
                <h3 className="text-gray-900 font-light mb-1">Crème Base</h3>
                <p className="text-sm text-gray-500 font-light">250ml - Stock : 78%</p>
              </div>
              <p className="text-xl font-light text-gray-900">24€</p>
            </div>
            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-full text-sm font-light hover:bg-gray-200 transition-all">
              Commander maintenant
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-xl shadow-inner" />
              <div className="flex-1">
                <h3 className="text-gray-900 font-light mb-1">Sérum Concentré</h3>
                <p className="text-sm text-orange-600 font-light">30ml - Stock : 25% ⚠️</p>
              </div>
              <p className="text-xl font-light text-gray-900">29€</p>
            </div>
            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 rounded-full text-sm font-light hover:shadow-xl transition-all">
              Commander maintenant
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-gray-900 font-light mb-3">Formule d'abonnement</h3>
          <div className="space-y-2 mb-4 text-sm text-gray-600 font-light">
            <div className="flex justify-between">
              <span>Livraison tous les 2 mois</span>
              <span className="font-normal">53€</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Économie vs achat unique</span>
              <span className="font-normal">-15%</span>
            </div>
          </div>
          <button className="w-full bg-white text-gray-900 py-3 rounded-full text-sm font-light border border-gray-200 hover:border-gray-300 transition-all">
            Modifier la fréquence
          </button>
        </div>
      </div>
      <NavBar />
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      <div className="p-8 pt-16">
        <h1 className="text-3xl font-light text-gray-900 mb-8">Profil</h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-light">
              M
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-1">Marie Dubois</h2>
              <p className="text-gray-500 font-light">marie.dubois@email.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <User size={20} className="text-gray-400" />
                <span className="text-gray-900 font-light">Informations personnelles</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <ShoppingBag size={20} className="text-gray-400" />
                <span className="text-gray-900 font-light">Mes commandes</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <Settings size={20} className="text-gray-400" />
                <span className="text-gray-900 font-light">Paramètres</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-center">
          <h3 className="text-gray-900 font-light mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-gray-600 font-light mb-4">Notre équipe est là pour vous</p>
          <button className="bg-white text-amber-600 px-6 py-3 rounded-full text-sm font-light border border-amber-200 hover:border-amber-300 transition-all">
            Contacter le support
          </button>
        </div>
      </div>
      <NavBar />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto bg-white shadow-2xl relative overflow-hidden min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
        }
      `}</style>

      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'onboarding' && <OnboardingScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'scanCamera' && <ScanCameraScreen />}
      {currentScreen === 'scanResults' && <ScanResultsScreen />}
      {currentScreen === 'zoneSelection' && <ZoneSelectionScreen />}
      {currentScreen === 'intensitySelection' && <IntensitySelectionScreen />}
      {currentScreen === 'eventPlanning' && <EventPlanningScreen />}
      {currentScreen === 'recipe' && <RecipeScreen />}
      {currentScreen === 'mixing' && <MixingScreen />}
      {currentScreen === 'complete' && <CompleteScreen />}
      {currentScreen === 'spfScanner' && <SPFScannerScreen />}
      {currentScreen === 'history' && <HistoryScreen />}
      {currentScreen === 'refills' && <RefillsScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
    </div>
  );
};

export default PerfectShadeApp;