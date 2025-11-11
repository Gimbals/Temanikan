import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Brain, Camera, AlertTriangle, CheckCircle, Stethoscope } from 'lucide-react';

export function DiseaseDiagnosis() {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const commonSymptoms = [
    'Sirip rusak atau robek',
    'Bintik putih pada tubuh',
    'Ikan lemas dan tidak aktif',
    'Napas tersengal-sengal',
    'Mata keruh atau bengkak',
    'Sisik rontok',
    'Perubahan warna',
    'Tidak mau makan'
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnosis = {
        disease: 'White Spot Disease (Ichthyophthirius)',
        confidence: 87,
        severity: 'Sedang',
        symptoms: ['Bintik putih pada tubuh', 'Ikan lemas dan tidak aktif'],
        treatment: [
          'Naikkan suhu air secara bertahap ke 30°C',
          'Tambahkan garam ikan (1 sendok teh per 4 liter)',
          'Berikan obat anti parasit sesuai dosis',
          'Ganti air 25% setiap hari'
        ],
        prevention: [
          'Jaga kualitas air tetap stabil',
          'Karantina ikan baru sebelum dicampur',
          'Hindari perubahan suhu mendadak',
          'Bersihkan akuarium secara rutin'
        ],
        duration: '7-14 hari'
      };
      
      setDiagnosis(mockDiagnosis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms(symptoms ? `${symptoms}, ${symptom}` : symptom);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Ringan': return 'bg-green-500';
      case 'Sedang': return 'bg-yellow-500';
      case 'Berat': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Brain className="w-8 h-8 text-cyan-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Fish Doctor</h1>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Beta
          </Badge>
        </div>
        <p className="text-gray-600">Diagnosa penyakit ikan dengan bantuan AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Deskripsikan Gejala Ikan</h3>
            
            <div className="space-y-4">
              <Textarea
                placeholder="Contoh: Ikan saya terlihat lemas, ada bintik putih di badannya, dan tidak mau makan sejak 3 hari yang lalu..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32"
              />
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Atau pilih gejala umum:</p>
                <div className="grid grid-cols-2 gap-2">
                  {commonSymptoms.map((symptom, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => addSymptom(symptom)}
                      className="text-left justify-start h-auto p-2 text-xs"
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!symptoms.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Menganalisis...
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4 mr-2" />
                Analisis Gejala
              </>
            )}
          </Button>

          <div className="border-t pt-4">
            <Button variant="outline" className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Upload Foto Ikan (Coming Soon)
            </Button>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="p-6">
          {!diagnosis ? (
            <div className="text-center py-12 text-gray-500">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p>Masukkan gejala ikan untuk mendapatkan diagnosa AI</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-semibold text-lg">Diagnosa Selesai</h3>
                  <p className="text-sm text-gray-600">Tingkat keyakinan: {diagnosis.confidence}%</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900">Kemungkinan Penyakit</h4>
                    <Badge className={`${getSeverityColor(diagnosis.severity)} text-white text-xs`}>
                      {diagnosis.severity}
                    </Badge>
                  </div>
                  <p className="text-blue-800 font-semibold">{diagnosis.disease}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Rencana Pengobatan
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {diagnosis.treatment.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-cyan-600 font-medium">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    Durasi pengobatan: {diagnosis.duration}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tips Pencegahan</h4>
                  <ul className="space-y-1 text-sm">
                    {diagnosis.prevention.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDiagnosis(null);
                    setSymptoms('');
                  }}
                  className="w-full"
                >
                  Diagnosa Baru
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 mb-1">Disclaimer</p>
            <p className="text-amber-700">
              Diagnosa AI ini hanya sebagai referensi awal. Untuk kasus serius, 
              konsultasikan dengan dokter hewan atau ahli ikan hias profesional.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DiseaseDiagnosis;