# GDAF Impact Simulator — Web Sitesi Durum ve Akış Dokümanı

## 1. Genel Bakış

**Gazze Etki Simülatörü (GDAF Impact Simulator)**, Gazze Dirençli Altyapı Fonu (GDAF) için hazırlanmış **interaktif bir jüri sunum prototipidir**. Site, katılım finans temelli temiz su, sanitasyon ve güneş destekli WASH (Water, Sanitation and Hygiene) yeniden yapılanma modelini görsel ve etkileşimli biçimde anlatır.

**Önemli:** Bu site gerçek bir operasyonel sistem değildir. Canlı veri çekmez, kullanıcı kaydı veya ödeme işlemi yoktur. Tüm sayılar ya **rapor verisi** (PCBS, OCHA, WHO, WASH R3 vb.) ya da **temsili senaryo varsayımı** olarak etiketlenmiştir.

---

## 2. Site Amacı

Site şu sorulara cevap vermek üzere kurgulanmıştır:

1. Gazze'deki su ve WASH krizi ne boyutta?
2. Mevcut finansman araçları neden yetersiz kalıyor?
3. GDAF modeli bu boşluğu nasıl dolduruyor?
4. Para nasıl toplanıyor, nereye gidiyor, sahada ne üretiyor?
5. Zaman içinde yayılım nasıl ilerliyor?
6. Türkiye–Gazze lojistik hattı nasıl çalışıyor?
7. Farklı senaryolarda model nasıl davranıyor?
8. Ölçülebilir etki ne kadar?

Hedef kitle: jüri üyeleri, akademik değerlendiriciler, proje ekibi ve finansman mimarisini hızlıca kavramak isteyen ziyaretçiler.

---

## 3. Site Yapısı — İki Ana Sayfa

Site iki ana rotadan oluşur:

| Sayfa | Adres | Rol |
|-------|-------|-----|
| **Ana Sayfa (Dashboard)** | `/` | Özet panel; tüm konuların kısa görünümü |
| **Detay Sayfası (Tam Sunum)** | `/detay` | Tek uzun sayfa; 11 bölüm sırayla |

İki sayfa arasında sürekli geçiş vardır. Detay sayfasındaki bölümlere doğrudan `#kriz`, `#simulasyon` gibi bağlantılarla da gidilebilir.

---

## 4. Kullanıcı Akışı (Tipik Ziyaret Yolu)

```
Giriş (Ana Sayfa)
    │
    ├─► KPI kartlarını okur (nüfus, su erişimi, yeniden inşa ihtiyacı…)
    ├─► Gazze haritasına bakar (risk bölgeleri)
    ├─► Senaryo özetlerini karşılaştırır
    │
    ├─► "Simülasyonu Başlat" → Detay / Yıl Simülasyonu bölümüne gider
    ├─► "Raporlar" veya "Ayrıntıları Gör" → Detay sayfasının başına gider
    │
    ▼
Detay Sayfası (yukarıdan aşağı kaydırma)
    │
    01 Kriz → 02 Mevcut Finansman → 03 GDAF Modeli
    → 04 Finansal Mimari → 05 Havuzlar → 06 Para Zinciri
    → 07 Yıl Simülasyonu → 08 TR–Gazze Lojistik
    → 09 Senaryolar → 10 Etki → 11 Teknik Ek
    │
    └─► "← Dashboard" ile ana sayfaya döner
```

**Anlatı hattı:** Kriz → Neden mevcut araçlar yetmiyor → GDAF çözümü → Finansal yapı → Zaman içinde yayılım → Lojistik → Senaryolar → Etki → Şeffaflık (teknik ek).

---

## 5. Ana Sayfa (Dashboard) — Ne Sunar?

Ana sayfa bir **özet kontrol paneli** gibi çalışır. Ziyaretçi tek ekranda şunları görür:

### 5.1 Üst Banner
- Proje başlığı ve kısa tanım
- Üç vurgu: WASH odaklı, veriye dayalı, dirençli gelecek
- **Simülasyonu Başlat** ve **Raporlar** butonları

### 5.2 KPI Kartları (6 adet)
- Etkilenen nüfus: 2,13M
- Yerinden edilmiş: 1,9M
- Mevcut su erişimi: 6,1 L/kişi/gün
- WHO acil standardı: 15 L/kişi/gün
- Ulaşılan kişi (olgun senaryo): 250K+
- Yeniden inşa ihtiyacı: 2,7 Mrd $

Her kartın altında veri kaynağı belirtilir.

### 5.3 Gazze Altyapı Haritası
- Bölgelere göre su erişim riski (yüksek/orta)
- Lejant: pompa istasyonu, su deposu, sağlık merkezi, üretim tesisi
- **Detay →** ile lojistik bölümüne gider

### 5.4 Senaryo Karşılaştırması (özet)
- **Temel:** Olgun yıl geliri ~11 mn $
- **Stres:** Gelir 7,5 mn $, yıllık 1,5 mn $ açık
- **İyimser:** Ek sukuk, yerel üretim, sistemsel altyapı

### 5.5 Etki Özeti
- Temiz su kapasitesi: 1.500 m³+
- Aktif WASH birimi: 60+
- Yerel istihdam: 100+
- DSRA dayanımı: ≈10 yıl

### 5.6 Finansman Modelleri
- Dört havuzun dağılımı (vakıf, sukuk, müşareke, hibe vb.) halka grafiklerle

### 5.7 Etki Matrisi
- Mevcut durum vs. 5 yıllık hedef (su erişimi, sanitasyon, WASH birimi, istihdam, sosyal hizmet)

### 5.8 Alt CTA
- **Ayrıntıları Gör** ile tam sunuma yönlendirme

---

## 6. Detay Sayfası — Bölüm Bölüm Akış

Detay sayfası tek uzun sunum formatındadır. Üstte sabit menü; kaydırırken aktif bölüm vurgulanır.

### Bölüm 01 — Kriz (`#kriz`)
**Mesaj:** Su, sağlık ve altyapı birlikte çöküyor.

- Kişi başı günlük su göstergesi (6,1 L vs WHO 15 L vs savaş öncesi 82,7 L)
- Nüfus kartları (toplam, yerinden edilmiş, çocuk, risk altındaki gebe/emziren kadın)
- Öncelikli ihtiyaç dağılımı (pasta grafik)
- Su erişim engelleri (yatay çubuk grafik)
- Sağlık yükü (ishal, hepatit, açık defekasyon vb.)
- Altyapı hasarı (%80 WASH hasarı, 2,7 Mrd $ ihtiyaç)

### Bölüm 02 — Mevcut Finansman (`#yetersiz`)
**Mesaj:** Hiçbir tek araç bu krizi çözmüyor.

Dört finansman türünün sınırları:
- Hibe / insani yardım
- Borçlanma
- Özel yatırım
- Sosyal koruma / mikrofinans

**Sonuç:** GDAF yalnızca fon toplama değil; varlık, işletme, risk tamponu ve sosyal etkiyi birlikte kurgulayan bir finansman mimarisidir.

### Bölüm 03 — GDAF Modeli (`#model`)
**Mesaj:** Vakıftan etkiye disiplinli bir zincir.

Altı katman:
1. Vakıf (misyon)
2. SPV / Fon kuruluşu (operasyon)
3. Ayrı havuzlar (sermaye disiplini)
4. Varlıklar (cihaz ve tesis)
5. Hizmetler (sahaya çıkış)
6. Etki (ölçülebilir sonuç)

Vakıf, SPV ve denetim mekanizmaları ayrıca özetlenir.

### Bölüm 04 — Finansal Mimari (`#mimari`)
**Mesaj:** 200 milyon dolarlık temel yapı.

- Kaynak dağılımı (200 mn $, 5 katman)
- Kullanım dağılımı (nereye gider)
- Olgun yıl nakit akışı şelalesi (gelir → kullanım sırası)

### Bölüm 05 — Havuz Bütünlüğü (`#havuzlar`)
**Mesaj:** Havuzlar karışmaz; fıkhî ve yatırımcı güveninin temelidir.

- Dört ayrı havuz (varlık, miktar, gelir hakkı)
- Uyarılar (ör. müşareke geliri sukuk yatırımcısına aktarılamaz)

### Bölüm 06 — Paradan Etkiye Zinciri (`#zincir`)
**Mesaj:** Kaynak → Havuz → Varlık → Hizmet → Etki.

Beş sütunlu akış şeması; her adımda somut örnekler.

### Bölüm 07 — Yıl Bazlı Simülasyon (`#simulasyon`)
**Mesaj:** Gazze'de aşamalı, disiplinli yayılım.

**Kullanıcı ne yapar?**
- Yıl 1, 2, 3, 5, 6, 10, 15, 15+ arasında seçim yapar
- Her seçimde haritadaki WASH varlıkları güncellenir
- Sağ panelde sahne notu, finansman kaynağı ve KPI'lar değişir

**Gösterilenler:**
- Gazze haritası üzerinde mobil RO, konteyner RO, bakım merkezi, montaj hattı, büyük tesisler
- Aktif WASH birimi sayısı, ulaşılan kişi, günlük temiz su, O&M maliyeti
- Yıl 10+ sonrası bakım merkezinden cihazlara kesikli bağlantı çizgileri

**Not:** Harita noktaları temsilîdir; gerçek kurulum lokasyonu değildir.

### Bölüm 08 — Türkiye–Gazze Lojistik (`#lojistik`)
**Mesaj:** Sukuk varlığı bir ülkede, gelir başka coğrafyada.

- Dönen küre görünümü: Türkiye (üretim/tedarik) → Gazze (saha kullanımı)
- Beş fayda kartı (maliyet, ölçek, sukuk geliri, dağıtım hızı, erişim)
- Sukuk yol haritası (4 aşama; sukuk birincil kaynak değil)

### Bölüm 09 — Senaryolar (`#senaryo`)
**Mesaj:** Üç farklı dünya, tek mimari.

**Kullanıcı ne yapar?**
- Temel / Stres / İyimser senaryo arasında geçiş yapar
- Her senaryoda varsayımlar, azaltım mekanizmaları ve yan panel bilgileri değişir

**Önce / Sonra karşılaştırması:**
- Mevcut durum (6,1 L su, %20 WASH işlevselliği, yüksek hastalık riski)
- GDAF Yıl 10 hedefi (60+ birim, 250K+ kişi, bakım merkezi)

### Bölüm 10 — Etki Analizi (`#etki`)
**Mesaj:** Para harcanmıyor, çalışıyor.

- 10 KPI kartı (ulaşılan kişi, WASH birimi, temiz su, istihdam, DSRA vb.)
- Yönerge uyum matrisi: gereksinim ↔ GDAF karşılığı tablosu

### Bölüm 11 — Teknik Ek (`#ek`)
**Mesaj:** Şeffaflık katmanı.

**Sekmeli içerik:**
- Varsayımlar
- Senaryo verileri
- Risk matrisi
- KPI tanımları
- Havuz kuralları
- Yapay zekâ kullanım notu

---

## 7. Navigasyon ve Gezinme

### Ana sayfa menüsü
- Ana Sayfa, Harita, Senaryolar, Finansman, Teknik Ek
- **Simülasyonu Başlat** (detay + simülasyon)
- **Raporlar** (detay sayfası)
- Dil göstergesi: TR (şu an yalnızca Türkçe)

### Detay sayfası menüsü
- 9 bölüm linki (sayfa içi anchor)
- Kaydırırken aktif bölüm otomatik vurgulanır
- **← Dashboard** ile ana sayfaya dönüş

### Footer
- Hızlı bağlantılar (kriz, model, senaryolar, finansal mimari, simülasyon, teknik ek)
- İletişim alanı ve "Ayrıntıları Gör" butonu

---

## 8. İnteraktif Öğeler

| Öğe | Konum | Kullanıcı Etkisi |
|-----|-------|------------------|
| Yıl seçici | Yıl Simülasyonu | Harita, KPI'lar ve sahne notu güncellenir |
| Senaryo seçici | Senaryolar | Varsayımlar ve yan panel değişir |
| Teknik ek sekmeleri | Teknik Ek | İçerik değişir |
| Harita hover | Dashboard + Simülasyon | Bölge/varlık detayı tooltip |
| Grafik tooltip'leri | Kriz, Finansman, Etki | Sayısal detay |

**Olmayanlar:** Giriş/kayıt, form gönderimi, canlı API, gerçek ödeme veya bağış, çoklu dil seçimi.

---

## 9. Veri Etiketleme Sistemi

Site iki veri türünü ayırır:

| Etiket | Anlam |
|--------|--------|
| **Rapor verisi** | PCBS, OCHA, WHO, WASH R3, BM/OCHA vb. kaynaklı |
| **Temsili senaryo** | Model varsayımları; finansal projeksiyonlar |

Hero ve footer'da açık uyarı: prototip, statik veri, jüri sunumu amaçlı.

---

## 10. Mevcut Durum Özeti

### Tamamlanmış / Çalışır durumda
- İki sayfalı tam akış (dashboard + detay)
- 11 bölümlük sunum hikayesi
- Yıl simülasyonu ve senaryo geçişleri
- TR–Gazze lojistik görselleştirmesi
- KPI, grafik ve harita özetleri
- Teknik ek şeffaflık katmanı
- Responsive tasarım (mobil/masaüstü)
- SEO meta etiketleri (başlık, açıklama, Open Graph)

### Bilinçli sınırlamalar
- Gerçek operasyonel sistem değil
- Veriler statik (JSON); canlı güncelleme yok
- Harita ve lojistik güzergâhları temsilî
- Yalnızca Türkçe
- Kullanıcı hesabı veya veri kaydetme yok

### Site kimliği
- **Ad:** Gazze Etki Simülatörü / GDAF Impact Simulator
- **Logo:** Siyah–kırmızı–yeşil (Gazze bayrağı renkleri)
- **Ton:** Akademik sunum, veri odaklı, şeffaf
- **Görsel dil:** Açık kurumsal dashboard teması — ayrıntılar için Bölüm 13

---

## 11. Önerilen Sunum Akışı (Jüri İçin)

Site, jüri sunumunda şu sırayla kullanılmak üzere tasarlanmıştır:

1. **Ana sayfa** — 30 saniyede büyük resim
2. **Kriz** — Sorunun boyutu
3. **Mevcut finansman** — Neden yeni model gerekli
4. **GDAF modeli + finansal mimari** — Çözümün iskeleti
5. **Yıl simülasyonu** — Canlı demo (yıl 1 → 10 → 15+)
6. **TR–Gazze lojistik** — Coğrafi ve operasyonel mantık
7. **Senaryolar** — Stres testi
8. **Etki** — Somut çıktılar
9. **Teknik ek** — Soru-cevap ve şeffaflık

---

## 12. Sayfa Haritası (Görsel)

```
┌─────────────────────────────────────────────────────────┐
│                    ANA SAYFA (/)                         │
│  Banner → KPI → Harita → Senaryo → Finansman → Etki   │
│                    ↓ Ayrıntıları Gör                     │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  DETAY SAYFASI (/detay)                  │
│                                                          │
│  Hero (KPI + CTA)                                        │
│  ├─ 01 Kriz                                              │
│  ├─ 02 Mevcut Finansman                                  │
│  ├─ 03 GDAF Modeli                                       │
│  ├─ 04 Finansal Mimari                                   │
│  ├─ 05 Havuz Bütünlüğü                                   │
│  ├─ 06 Para → Etki Zinciri                               │
│  ├─ 07 Yıl Simülasyonu                                   │
│  ├─ 08 TR–Gazze Lojistik                                 │
│  ├─ 09 Senaryolar                                        │
│  ├─ 10 Etki Analizi                                      │
│  └─ 11 Teknik Ek                                         │
│                                                          │
│  Footer → Ana Sayfaya dönüş                              │
└─────────────────────────────────────────────────────────┘
```

---

## 13. Görsel Tema ve Tasarım Dili

Site, **açık tonlu kurumsal dashboard** estetiğiyle tasarlanmıştır. Amaç; jüri sunumunda güven veren, sade ve veri odaklı bir görünüm sunmak — gösterişli bir pazarlama sitesi değil, ciddi bir finans/etki modeli sunumu hissi vermek.

### 13.1 Genel atmosfer

| Özellik | Açıklama |
|---------|----------|
| **Mod** | Açık tema (light); kırık beyaz/yeşilimsi arka plan |
| **Hissiyat** | Kurumsal, akademik, sakin, ölçülü |
| **Yoğunluk** | Kart tabanlı düzen; bol beyaz alan, ince çizgiler |
| **Vurgu** | Veri ve grafikler ön planda; süsleme minimum |

Arka plan hafif yeşilimsi bir off-white tonundadır (`oklch` renk uzayında, hue ~145). Kartlar beyaz; bölümler ince gri-yeşil çizgilerle ayrılır. Gölge kullanımı hafiftir — kartlar hafifçe yükselir, abartılı derinlik yoktur.

### 13.2 Renk paleti ve anlamları

Site, standart UI renklerinin yanında **anlamsal (semantik) renkler** kullanır. Her renk bir kavramı temsil eder:

| Renk adı | Görünüm | Kullanım alanı |
|----------|---------|----------------|
| **water** (su yeşili) | Koyu orman yeşili | Ana marka rengi, birincil butonlar, WASH/su konuları, linkler |
| **water-soft** | Açık yeşil | İkincil su/altyapı vurguları, grafik dilimleri |
| **impact** (etki yeşili) | Orta yeşil | Olumlu sonuçlar, hedefler, iyimser senaryo |
| **finance** (finans altını) | Altın/sarı ton | Para, gelir, finansman havuzları, sukuk |
| **risk** (risk kırmızısı) | Sıcak kırmızı | Kriz verileri, stres senaryosu, uyarılar |
| **ink** | Koyu yeşilimsi siyah | Başlıklar ve güçlü metin |
| **rule** | Açık gri-yeşil | Kenarlıklar, ayırıcı çizgiler |

**Pratik örnekler:**
- Kriz bölümündeki su erişim göstergesi → **risk** kırmızısı (mevcut 6,1 L)
- WHO acil standardı çizgisi → **finance** altını
- Temel senaryo kartı → **impact** yeşili kenarlık
- Stres senaryo kartı → **risk** kırmızısı kenarlık
- Finansal mimari grafikleri → havuz türüne göre renk (sukuk = su yeşili, hibe = altın vb.)

### 13.3 Tipografi

| Öğe | Font | Stil |
|-----|------|------|
| Gövde metni | **Inter** | 300–600 ağırlık, antialiased |
| Başlıklar (h1–h3) | **Inter** (`.font-display`) | Semi-bold, hafif negatif letter-spacing |
| Bölüm etiketleri (eyebrow) | Inter | Küçük, büyük harf, geniş harf aralığı |

Google Fonts üzerinden **Cormorant Garamond** da yüklenmiştir; ancak aktif tema tanımında hem gövde hem başlık fontu **Inter** olarak ayarlanmıştır. Sonuç: modern, okunaklı, kurumsal bir sans-serif görünüm.

**Eyebrow** etiketi: Her bölümün üstündeki küçük üst başlıklar (ör. `01 · Kriz`, `GDAF Impact Simulator`). Büyük harf, ince gri, geniş aralık — sunum slaytı hissi verir.

### 13.4 Bileşen stilleri

Sitede tekrar eden görsel yapı taşları:

| Bileşen | Görünüm | Nerede kullanılır |
|---------|---------|-------------------|
| **dash-card** | Beyaz kart, ince kenarlık, hafif gölge | Ana sayfa (dashboard) |
| **panel** | Beyaz panel, yuvarlatılmış köşe, hafif gölge | Detay sayfası içerik kutuları |
| **panel-2** | Açık gri-yeşil arka planlı panel | Vurgu kutuları, yan notlar |
| **hairline** | İnce tek çizgi kenarlık | Harita ve grafik çerçeveleri |

Köşe yuvarlaklığı genel olarak **0.75rem** (12px) civarındadır — yumuşak ama aşırı yuvarlak değil.

### 13.5 İki sayfa, iki görünüm

Site görsel olarak iki modda davranır:

**Ana sayfa (Dashboard) — özet panel**
- Yoğun kart ızgarası (2–6 sütunlu responsive grid)
- KPI kartlarında küçük renkli ikon kutuları (Lucide ikonları)
- Kompakt harita ve senaryo özetleri
- Üstte yapışkan (sticky) menü, bulanık cam efekti (`backdrop-blur`)

**Detay sayfası — uzun sunum**
- Tam genişlik bölümler, dikey kaydırma
- Hero alanında büyük başlık + yumuşak yeşil radial gradient arka plan
- Her bölüm `border-t` ile ayrılır; numaralı eyebrow + büyük başlık
- Sabit üst menü; kaydırırken aktif bölüm vurgulanır
- Daha geniş panel ve grafik alanları

### 13.6 Navigasyon ve butonlar

| Öğe | Stil |
|-----|------|
| Birincil buton | Koyu yeşil arka plan (`primary`), beyaz metin — örn. "Simülasyonu Başlat" |
| İkincil buton | Beyaz/şeffaf, ince kenarlık — örn. "Raporlar", "Modeli Gör" |
| Aktif menü öğesi | Yeşil metin + hafif yeşil arka plan lekesi |
| Linkler | Gri metin; hover'da yeşile (`water`) döner |
| Sayfa içi anchor | Detay menüsünde `#kriz`, `#simulasyon` vb. |

Üst menü her iki sayfada da **yapışkan**dır; kaydırırken içerik altından geçer, menü her zaman erişilebilir kalır.

### 13.7 Grafik ve harita görsel dili

**Grafikler (Recharts):**
- Pasta ve çubuk grafiklerde semantik renkler
- Tooltip'ler beyaz kart stilinde, ince kenarlıklı
- Eksen etiketleri küçük, soluk gri

**Haritalar (SVG):**
- Gazze şeridi: soyut, geometrik poligon — gerçek uydu görüntüsü değil
- Arka plan: açık mavi-yeşil deniz tonu, ızgara deseni
- Varlık noktaları: boyuta göre renkli daireler (mobil RO küçük, tesis büyük)
- Yeni eklenen varlıklar: seçili yılda halka animasyonu
- TR–Gazze bölümü: dönen küre projeksiyonu, kesikli lojistik çizgisi

Tüm haritalar ve güzergâhlar **temsilî** olarak etiketlenmiştir; gerçekçi coğrafi doğruluk hedeflenmemiştir.

### 13.8 Veri etiketleri (görsel)

İçerikte iki tür veri görsel olarak ayrılır:

| Etiket | Görünüm | Anlam |
|--------|---------|-------|
| **Rapor verisi** | Yeşil kenarlık, yeşil nokta | BM, OCHA, WHO vb. kaynaklı gerçek veri |
| **Temsili senaryo** | Altın kenarlık, altın nokta | Model varsayımı, projeksiyon |

Bu etiketler okuyucuya "bu sayı nereden geliyor?" sorusunu görsel olarak cevaplar.

### 13.9 İkonlar ve logo

- **İkon seti:** Lucide (damla, kalkan, kullanıcı, dolar, harita pini, fabrika, hastane vb.)
- **Logo:** 3 dikey şerit — siyah, kırmızı, yeşil (Gazze bayrağı renkleri)
- İkonlar küçük yuvarlatılmış kutularda, ilgili semantik rengin %10 opak arka planında

### 13.10 Responsive davranış

| Ekran | Davranış |
|-------|----------|
| Mobil | KPI kartları 2 sütun; detay menüsü gizlenir; tek sütun akış |
| Tablet | 3 sütun KPI; harita ve senaryo alt alta veya yan yana |
| Masaüstü | 6 sütun KPI; tam menü; harita + yan panel yan yana |

Kaydırma davranışı `smooth` — anchor linklere tıklandığında yumuşak geçiş yapılır.

### 13.11 Tema özeti (tek cümle)

> Açık zemin üzerinde orman yeşili ve altın vurgularla, kart tabanlı, sakin ve kurumsal bir finans/etki sunum arayüzü — kriz kırmızısı ve etki yeşiliyle duygusal ton ayarı yapılmış, veri öncelikli bir jüri prototipi.

---

*Son güncelleme: Proje mevcut haliyle incelenmiştir. Site, Lovable üzerinde geliştirilen interaktif jüri sunum prototipidir.*
