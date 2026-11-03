# Dashboard v5

React, Vite, Tailwind CSS, framer-motion ve lucide-react ile yapılmış bir kontrol paneli.

## Kurulum

```bash
npm install
npm run dev
```

Ardından tarayıcıda http://localhost:5173 adresini açın.

## Komutlar

- `npm run dev`: geliştirme sunucusunu başlatır
- `npm run build`: yayın için `dist/` klasörüne derler
- `npm run preview`: derlenmiş sürümü önizler
- `npm run lint`: kodu kontrol eder

## Yapı

- `src/App.jsx`: ana sayfa ve kart verileri
- `src/components/StatsCard.jsx`: istatistik kartı bileşeni
- `src/index.css`: Tailwind ve `glass-card` stili

## Sunucuda çalıştırma (şifre korumalı)

```bash
npm run build
set PANEL_USER=kullaniciadi
set PANEL_PASS=guclu-bir-sifre
npm start
```

`server.js`, `dist/` klasörünü 80 numaralı portta kullanıcı adı ve şifreyle sunar. Şifre ayarlanmazsa sunucu başlamaz. Port değiştirmek için `PORT` değişkenini ayarlayın.
