# GDAF Etki Simülatörü — Web Sitesi Master Plan (Akış + Veri + Tasarım)

> **Tek doğru kaynak (single source of truth).** Bu dosya; sitenin akışını, her sayfanın içeriğini, **rapordan birebir alınmış statik verileri** ve grafik tanımlarını içerir. Sitedeki her sayı bu dosyadan beslenmelidir; rapor güncellenirse önce burası güncellenir.

---

## 0. Hızlı Özet

| Konu | Karar |
|------|-------|
| **Veri türü** | **Statik + gerçek** (rapor rakamları koda gömülü, canlı API yok). Mock/uydurma veri YOK. |
| **Akış** | 1 Dashboard + **7 ana hub**, her hub kendi sayfası, her sayfada **alt menü (sekme/scroll-spy)** |
| **Eşleme** | Her hub doğrudan rapor bölümüne **ve** 100 puanlık rubriğe karşılık gelir |
| **Tema** | Açık kurumsal dashboard; orman yeşili + altın + kriz kırmızısı; Gazze bayrağı logosu |
| **Dil** | Türkçe (TR), tek dil |
| **Amaç** | Jüri sunum prototipi — gerçek operasyonel sistem değil, etiketli |

### Statik veri ≠ mock data (neden önemli)
- **Mock data:** Anlamsız yer tutucu, geliştirme sırasında kullanılıp atılır. **Kullanma.**
- **Statik veri:** Gerçek ama sabit, koda gömülü, değişmez. **Senin yapın bu.** Tüm rakamlar gerçek rapor değerleri + kaynak etiketi.

---

## 1. Proje Nedir? (Sitenin anlatacağı tek cümle)

**Gazze Dirençli Altyapı Fonu (GDAF)**, Gazze'nin su–sanitasyon–hijyen (WASH) ve güneş enerjisi altyapısını yeniden kurmak için tasarlanmış, **katılım finansı (faizsiz)** temelli **200 milyon dolarlık** bir hibrit finansman modelidir. Çekirdeği geri ödeme yükümlülüğü olmayan **vakıf sermayesi ve bağışlardır**; sukuk yalnızca bu zeminin üzerine, **toplamın ~%25'iyle sınırlı** ve aşamalı olarak eklenir. Modelin asıl yeniliği, "kuruldu ama işletilemedi" sorununu çözen **dokunulmaz vakıf anaparası + ayrı para havuzları + net çıkış stratejisi**dir.

**Sitenin cevapladığı sorular:**
1. Gazze su/WASH krizi ne boyutta? → **Kriz hub'ı**
2. Mevcut finansman neden yetmiyor? → **Model hub'ı / "Neden Yeni Model"**
3. GDAF bu boşluğu nasıl dolduruyor? → **Model hub'ı**
4. Para nasıl toplanıp nereye gidiyor? → **Finansman hub'ı**
5. Farklı senaryolarda model nasıl davranıyor? → **Senaryolar hub'ı**
6. Ölçülebilir etki ne? → **Etki hub'ı**
7. Benzerlerinden farkı ve riskler? → **Değerlendirme hub'ı**
8. Sayılar nereden geliyor? → **Teknik Ek**

---

## 2. Yönerge ve Rubrik Eşlemesi (puanı yöneten harita)

Raporun 11 zorunlu bölümü ve sitenin hub'ları:

| Rapor Bölümü | Site Hub'ı | Rubrik Puanı |
|--------------|-----------|--------------|
| 6.1 Giriş | Ana Sayfa (hero + amaç) | — (sunum 5p) |
| 6.2 Sorun ve İhtiyaç Analizi | **Kriz** | Problem tanımı **10p** |
| 6.3 Literatür ve Kavramsal Çerçeve | Model / "Kavramsal Temel" | Literatür **10p** |
| 6.4 Mevcut Finansmanın Eleştirel Analizi | Model / "Neden Yeni Model" | (model özgünlüğüne katkı) |
| 6.5 Önerilen Finansman Modeli | **Model** | Özgünlük **15p** |
| 6.6 Fıkhî Uygunluk | Model / "Fıkhî Uygunluk" | Fıkıh **10p** |
| 6.7 Hukuki ve Kurumsal Çerçeve | Model / "Hukuki Çerçeve" | Hukuki **10p** |
| 6.8 Finansal Mimari ve Nakit Akışları | **Finansman** + **Senaryolar** | Finansal modelleme **15p** |
| 6.9 Karşılaştırmalı Değerlendirme | **Değerlendirme** | Karşılaştırma **10p** |
| 6.10 Etki Analizi | **Etki** | Sosyal etki **5p** |
| 6.11 Sonuç ve Politika Önerileri | **Değerlendirme / Sonuç** | — |
| (Risk yönetimi — 6.5.8 + 6.8.11) | **Senaryolar / Değerlendirme** | Risk **10p** |

> **Toplam: 100 puan.** Sitenin amacı her rubrik kalemine görsel bir karşılık üretmek.

---

## 3. SİTE AKIŞI (Net + Kapsayıcı)

### 3.1 Üst menü (her sayfada sabit / sticky)

```
[LOGO]  Ana Sayfa │ Kriz │ Model │ Finansman │ Senaryolar │ Etki │ Değerlendirme │ Teknik Ek      [TR ▾]  [▶ Simülasyonu Başlat]
```

- 7 hub + Ana Sayfa. Aktif hub yeşil vurgulu.
- "Simülasyonu Başlat" → doğrudan **Senaryolar** hub'ına.
- Mobilde menü hamburger'a iner; hub'lar tek sütun.

### 3.2 Her hub'ın iç yapısı (alt menü mantığı)

Her hub sayfası açıldığında **sol/üst alt menü (scroll-spy sekmeleri)** olur. Kullanıcı alt başlıklar arasında geçer; sayfa kaydıkça aktif alt başlık vurgulanır. Bu, "her menü başlığına tıklayınca alt menülerin açılması" isteğini karşılar **ama** her hub kendi odaklı sayfasında kalır (Cursor'daki 11'lik tek dev scroll'un yarattığı karmaşa biter).

```
┌───────────────────────────────────────────────┐
│  ÜST MENÜ (sticky)                             │
├──────────────┬────────────────────────────────┤
│  ALT MENÜ     │  İÇERİK (kartlar + grafikler)  │
│  • Alt başlık1│  [grafik] [grafik]             │
│  • Alt başlık2│  [tablo]  [KPI kartları]       │
│  • Alt başlık3│  ...                           │
│  (scroll-spy) │                                │
└──────────────┴────────────────────────────────┘
```

### 3.3 Site haritası (sitemap)

```
/  ANA SAYFA (Dashboard)
│   └ Hero • 6 KPI • Mini harita • Senaryo özeti • Fon kompozisyonu • Etki matrisi • CTA'lar
│
├─ /kriz  KRİZ & İHTİYAÇ  (6.2)
│   ├ Su Krizi
│   ├ Nüfus & Yerinden Edilme
│   ├ Sağlık Yükü
│   └ Altyapı Hasarı & Yeniden İnşa İhtiyacı
│
├─ /model  GDAF MODELİ  (6.3+6.4+6.5+6.6+6.7)
│   ├ Neden Yeni Model? (mevcut finansmanın sınırları)
│   ├ Kavramsal Temel (literatür)
│   ├ Kurumsal Yapı (Vakıf + SPV)
│   ├ Finansal Araçlar (6 araç)
│   ├ Paradan Etkiye Zinciri
│   ├ Fıkhî Uygunluk
│   └ Hukuki & Kurumsal Çerçeve
│
├─ /finansman  FİNANSMAN & NAKİT AKIŞI  (6.8.1–6.8.6)
│   ├ Kaynak Kompozisyonu (200M$)
│   ├ Fon Tahsis Planı
│   ├ Havuz Ayrımı
│   ├ Gelir Dağıtım Şelalesi
│   └ Karz-ı Hasen & Rezerv Yapısı
│
├─ /senaryolar  SENARYO SİMÜLASYONU  (6.8.7–6.8.10)  ★interaktif
│   ├ Temel Senaryo
│   ├ Olumsuz (Stres) Senaryo
│   ├ İyimser Senaryo
│   ├ Yıl Bazlı Simülasyon (1→15+)
│   └ Senaryo Karşılaştırması
│
├─ /etki  ETKİ ANALİZİ  (6.10)
│   ├ KPI'lar (3 ölçek)
│   ├ Etki Oranları & Maliyet-Etkinlik
│   ├ Tamamlayıcı Sosyal Modüller
│   └ İzleme & Doğrulama
│
├─ /degerlendirme  KARŞILAŞTIRMA & SONUÇ  (6.9+6.11+risk)
│   ├ Karşılaştırmalı Değerlendirme
│   ├ Risk Matrisi
│   └ Sonuç & Politika Önerileri
│
└─ /teknik-ek  TEKNİK EK & ŞEFFAFLIK
    ├ Varsayımlar
    ├ Veri Kaynakları
    ├ KPI Tanımları
    ├ Kaynakça
    └ Yapay Zekâ Kullanım Notu
```

### 3.4 Jüri sunum yolu (önerilen tıklama sırası)

```
Ana Sayfa (30 sn büyük resim)
 → Kriz (sorunun boyutu)
 → Model / "Neden Yeni Model" (boşluk)
 → Model / Kurumsal Yapı + Araçlar (çözüm iskeleti)
 → Finansman (200M$ nasıl dağılıyor)
 → Senaryolar (canlı demo: yıl 1→10→15, stres testi)
 → Etki (somut çıktılar, SROI)
 → Değerlendirme (farkımız + riskler + sonuç)
 → Teknik Ek (soru-cevap / şeffaflık)
```

---

## 4. SAYFA SAYFA İÇERİK + VERİ + GRAFİKLER

> Aşağıdaki tüm sayılar rapordan birebir alınmıştır. Grafik tipleri **Recharts** varsayımıyla yazılmıştır.

### 4.0 ANA SAYFA `/` — Dashboard

**Amaç:** 30 saniyede büyük resim. (Yüklediğin ChatGPT tema görseli bu sayfanın referansı.)

**Bloklar:**
1. **Hero:** Başlık "Gazze İçin Dirençli Etki ve Altyapı Modeli" + alt açıklama + 3 vurgu rozeti (WASH Odaklı / Veriye Dayalı / Dirençli Gelecek) + butonlar: **Simülasyonu Başlat**, **Raporlar**.
2. **6 KPI kartı** (her kartın altında kaynak etiketi):

| KPI | Değer | Etiket | Kaynak |
|-----|-------|--------|--------|
| Etkilenen nüfus | 2.130.000 | Rapor verisi | OCHA/PCBS |
| Yerinden edilmiş | 1.900.000 | Rapor verisi | OCHA |
| Mevcut su erişimi | 6,1 L/kişi/gün | Rapor verisi | WASH güncellemesi |
| WHO acil standardı | 15 L/kişi/gün | Referans | WHO |
| Savaş öncesi erişim | 82,7 L/kişi/gün | Rapor verisi | — |
| Yeniden inşa ihtiyacı (WASH) | 2,7 Mrd $ | Rapor verisi | RDNA 2026 |

3. **Mini harita** (Gazze şeridi soyut SVG; risk bölgeleri) → "Detay" Senaryolar'a gider.
4. **Senaryo özeti (3 kart):** Temel / Olumsuz / İyimser — olgun yıl geliri & sonuç (bkz. §4.5).
5. **Fon kompozisyonu (donut):** 5 katman (§4.4 Tablo).
6. **Etki matrisi (önce/sonra çubuk):** Temiz su erişimi, sanitasyon, WASH birimi, istihdam (mevcut vs 5–10 yıl hedef).
7. **Alt CTA:** "Ayrıntıları Gör".

**Grafikler:** Donut (fon kompozisyonu), gruplu çubuk (etki matrisi önce/sonra), KPI sparkline'lar (opsiyonel).

---

### 4.1 KRİZ & İHTİYAÇ `/kriz` ← Bölüm 6.2 (Rubrik: 10p)

**Mesaj:** Su, sağlık ve altyapı birlikte çöküyor.

**Alt başlık 1 — Su Krizi**
- **Gösterge çubuğu:** 6,1 L (mevcut, kriz kırmızısı) ⟶ 15 L (WHO acil, altın çizgi) ⟶ 82,7 L (savaş öncesi, gri).
- Ek değerler: günlük içme suyu ~3 L; bazı bölgelerde 2 L'ye kadar düşüş; üretim açığı.
- **Grafik:** Yatay gösterge / bullet chart (mevcut vs hedef vs eski normal).

**Alt başlık 2 — Nüfus & Yerinden Edilme**
- Toplam nüfus 2.130.000; yerinden edilmiş 1.900.000.
- **Grafik:** Donut (yerinden edilmiş / yerinde) + nüfus kartları (çocuk, gebe/emziren kadın — risk grupları).

**Alt başlık 3 — Sağlık Yükü**
- İshal, hepatit, açık defekasyon vb. su kaynaklı hastalık riskleri.
- **Grafik:** Yatay çubuk (hastalık yükü göstergeleri) — değerler raporun 6.2 metninden alınmalı.

**Alt başlık 4 — Altyapı Hasarı & Yeniden İnşa İhtiyacı**
- WASH altyapısında ağır hasar; WASH yeniden inşa ihtiyacı **2,7 Mrd $**; toplam Gazze yeniden inşası ~**70 Mrd $** mertebesinde.
- Su üretim kapasitesi kaybı: günlük ~108.000 m³ düzeyinde kayıplar.
- **Grafik:** İhtiyaç dağılımı pasta + maliyet kartları.

**Veri etiketleri:** Bu hub ağırlıklı **Rapor verisi** (yeşil etiket).

---

### 4.2 GDAF MODELİ `/model` ← 6.3 + 6.4 + 6.5 + 6.6 + 6.7 (Rubrik: 15+10+10p)

**Mesaj:** Vakıftan etkiye disiplinli bir zincir.

**Alt başlık 1 — Neden Yeni Model? (6.4)**
Dört finansman türünün tek başına yetersizliği (kart grid):
- **Hibe / insani yardım** → bağışçı yorgunluğu, süreksizlik
- **Borçlanma / kredi** → faiz + borç sürdürülemezliği
- **Özel yatırım** → yüksek riskli ortamda gelmiyor
- **Sosyal koruma / mikrofinans** → ölçek yetersiz
- **Sonuç kutusu:** GDAF yalnızca fon toplama değil; varlık + işletme + risk tamponu + sosyal etkiyi birlikte kurgulayan bir **finansman mimarisi**.

**Alt başlık 2 — Kavramsal Temel (6.3)**
Literatür anahtarları (rozet/kart): İstisna–İcara sukuk (Lawal & Sani-Yahuza), nakit vakıf destekli sukuk (Endonezya), Sukuk Prihatin (Malezya), takaful & mikrofinans (Migdad 2023), çatışma sonrası yeniden inşa (Pokorny 2026; Alhemdiat 2026; Barakat 2018).

**Alt başlık 3 — Kurumsal Yapı (6.5.1)**
İki katmanlı yapı **diyagramı**:
- **Katman 1 — Vakıf** (Gazze Faizsiz Dirençli Altyapı Vakfı): sosyal misyon, yönetim ilkeleri, kırılgan gruplara kaynak güvencesi. Finansman toplamaz.
- **Katman 2 — SPV (Fon Kuruluşu):** vakfın tek sahibi olduğu özel amaçlı kuruluş; sukuk ihracı, varlık sahipliği, nakit yönetimi, yatırımcı ilişkileri.
- **Grafik:** Hiyerarşi diyagramı (Vakıf → SPV → Havuzlar → Varlıklar → Hizmet → Etki).

**Alt başlık 4 — Finansal Araçlar (6 araç)**
Her araç için kart (ad + işlev + neden gerekli):

| Araç | İşlevi |
|------|--------|
| **İstisna + İcara** | Birincil akit: üretim/inşa (istisna) + kiralama/kullanım (icara) |
| **Müşareke** | Kitle fonlamasıyla mikro modüler varlık ortaklığı (kâr paylaşımı) |
| **Vakıf (vakfe)** | Dokunulmaz anapara; yalnızca getirisi kullanılır (çekirdek istikrar) |
| **Karz-ı Hasen** | Faizsiz borç; tam bağışçı olmak istemeyene ara mekanizma; sadece anapara döner |
| **Tekafül** | Yalnızca operasyonel riskler (savaş/mücbir sebep HARİÇ) |
| **Rezerv Fonu (DSRA)** | Likidite kesintisi tamponu; her havuz için %10–20 zorunlu |

> **Kritik ilke:** Sosyal etkili sukuk ≠ ticari sukuk. Anapara/getiri **taahhüdü yoktur** (fıkhen uygun değil); getiri piyasanın altında; yatırımcı motivasyonu etki + itibar + etik.

**Alt başlık 5 — Paradan Etkiye Zinciri**
5 sütunlu akış: **Kaynak → Havuz → Varlık → Hizmet → Etki** (her adımda somut örnek).

**Alt başlık 6 — Fıkhî Uygunluk (6.6)**
AAOIFI Şer'i Standart No.17 & IFSB uyumu; garanti olmaması gerekçesi; her araç için "uygundur + neden" kartı. (Detay: `6_6FIKHİUYGUNLUKANALİZİ.pdf`)

**Alt başlık 7 — Hukuki & Kurumsal Çerçeve (6.7)**
Üç katmanlı denetim **diyagramı**:
1. **İç güvence:** şer'i denetim kurulu + iç mali denetim + risk komitesi
2. **Bağımsız dış denetim:** uluslararası firma, yılda ≥1, sahada fiziksel varlık doğrulaması
3. **Çok taraflı gözetim:** bağışçı ülkeler + katılım finans kurumları + kalkınma kuruluşları
- İlişkili taraf / transfer fiyatlaması kontrolü; dijital izlenebilirlik; yerel topluluk geri bildirimi.

---

### 4.3 (Paradan Etkiye zinciri Model hub'ında — ayrı sayfa değil)

---

### 4.4 FİNANSMAN & NAKİT AKIŞI `/finansman` ← 6.8.1–6.8.6 (Rubrik: 15p)

**Mesaj:** 200 milyon dolarlık temel yapı; para tek havuzda karışmaz.

**Alt başlık 1 — Kaynak Kompozisyonu (Faz 1)** — *Tablo 6.8.1*

| Kaynak | Tutar | Pay | Niteliği |
|--------|-------|-----|----------|
| Vakıf sermayesi | 100 mn $ | %50 | Dokunulmaz anapara; sadece getirisi |
| Sosyal etkili sukuk | 50 mn $ | %25 | İlk ihraç: üretim/tedarik tesisi + cihaz havuzu |
| Kitle fonlaması | 20 mn $ | %10 | Müşareke; mikro varlık ortaklığı |
| Hibe / teberru | 20 mn $ | %10 | Karşılıksız; acil sosyal hizmet + ilk kurulum |
| Karz-ı hasen | 10 mn $ | %5 | Faizsiz borç; sadece anapara döner |
| **TOPLAM** | **200 mn $** | **%100** | |

**Grafik:** Donut/halka (Şekil 6.8.1). Vurgu: sukuk **birincil değil** (%25).

**Alt başlık 2 — Fon Tahsis Planı (Faz 1)** — *Tablo 6.8.2*

| Tahsis Alanı | Tutar | Pay |
|--------------|-------|-----|
| Vakıf sermayesi (korunan) | 100 mn $ | %50 |
| Üretim/tedarik tesisi + cihaz havuzu | 50 mn $ | %25 |
| Mikro varlıklar (modüler) | 20 mn $ | %10 |
| Nakit rezerv hesabı (DSRA) | 15 mn $ | %7,5 |
| Sosyal hizmet fonu | 10 mn $ | %5 |
| Tekafül havuzu | 5 mn $ | %2,5 |
| **TOPLAM** | **200 mn $** | **%100** |

**Grafik:** Yatay yığılı çubuk veya treemap (Şekil 6.8.2).

**Alt başlık 3 — Havuz Ayrımı** — *Şekil 6.8.3*
- **Havuz 1 — Sukuk (50 mn $):** üretim tesisi + cihaz; geliri yalnızca sukuk yatırımcısına.
- **Havuz 2 — Müşareke (20 mn $):** mikro varlıklar; geliri yalnızca kitle fonlaması yatırımcısına; **sukuk havuzuna aktarılamaz**.
- **Havuz 3 — Vakıf (100 mn $):** anapara dokunulmaz; %5 getiri (5 mn $) işletme + rezerv + sosyal hizmete.
- **Hibe + Karz-ı hasen (30 mn $):** ücretsiz sosyal hizmet + başlangıç likiditesi.
- **Grafik:** Sankey / akış diyagramı (SPV → 3 havuz → ortak işletme geliri → şelale).

> **Pool separation kuralı (non-negotiable):** Müşareke/kitle fonlaması geliri sukuk yatırımcısına **asla** akmaz. Ayrı muhasebe alt hesabı.

**Alt başlık 4 — Gelir Üretim Varsayımları (Olgun Yıl)** — *Tablo 6.8.3*

| Gelir Kaynağı | Yatırım | Getiri | Yıllık Gelir |
|---------------|---------|--------|--------------|
| Mikro varlıklar | 20 mn $ | %10 | 2 mn $ (1. yıldan) |
| Üretim tesisi + cihaz | 50 mn $ | %8 | 4 mn $ (3. yıldan) |
| Vakıf sermayesi | 100 mn $ | %5 | 5 mn $ (1. yıldan, anapara korunur) |
| **TOPLAM (olgun)** | — | — | **11 mn $/yıl** |

**Alt başlık 5 — Gelir Dağıtım Şelalesi (Olgun Yıl ≈11 mn $)** — *Tablo 6.8.4*

| Sıra | Kalem | Tutar |
|------|-------|-------|
| 1 | Bakım/onarım/işletme (O&M) | 2,2 mn $ |
| 2 | Rezerv + tekafül aktarımı | 1,65 mn $ |
| 3 | Karz-ı hasen geri ödemesi (ilk 6 yıl) | 2,0 mn $ |
| 4 | Sukuk / müşareke yatırımcı ödemesi | 2,5 mn $ |
| 5 | Asgari sosyal hizmetler | 1,65 mn $ |
| 6 | Fon yönetimi (Vekâlet) | 0,33 mn $ |
| 7 | Yeni yatırımlar | kalan |

**Grafik:** Şelale (waterfall) grafiği — gelir → sıralı kullanım.

**Alt başlık 6 — Karz-ı Hasen Geri Ödemesi** — *Tablo 6.8.5*

| Yıl | Dönem Başı | Yıllık Ödeme | Kalan |
|-----|-----------|--------------|-------|
| 1 | 10 mn $ | 0 | 10 mn $ |
| 2 | 10 | 2 | 8 |
| 3 | 8 | 2 | 6 |
| 4 | 6 | 2 | 4 |
| 5 | 4 | 2 | 2 |
| **6** | **2** | **2** | **0** |

**Grafik:** Azalan çizgi/alan grafiği (6. yıl kapanış).

**Rezerv & Güvence Bileşenleri** — *Tablo 6.8.6*

| Bileşen | Tutar | İşlevi |
|---------|-------|--------|
| Nakit rezerv (DSRA) | 15 mn $ | Likidite kesintisi tamponu; vakıf getirisiyle beslenir |
| Tekafül havuzu | 5 mn $ | Operasyonel risk (savaş hariç) |
| Vakıf sermayesi (tampon) | 100 mn $ | Dokunulmaz anapara; asıl güvence |

---

### 4.5 SENARYO SİMÜLASYONU `/senaryolar` ← 6.8.7–6.8.10 ★İNTERAKTİF (Rubrik: finansal 15p + risk 10p)

**Mesaj:** Üç farklı dünya, tek mimari.

**Üst kontrol:** [Temel] [Olumsuz/Stres] [İyimser] geçiş düğmeleri + yıl seçici (1, 2, 3, 5, 6, 10, 15).

**Alt başlık 1 — Temel Senaryo (10 yıl)** — *Tablo 6.8.7*

| Yıl | Mikro | Üretim+Cihaz | Vakıf | Toplam Gelir | Net Nakit |
|-----|-------|--------------|-------|--------------|-----------|
| 1 | 2 | 0 (kurulum) | 5 | 7 | -1,5 |
| 2 | 2 | 1 | 5 | 8 | -0,7 |
| 3 | 2 | 4 | 5 | 11 | +2 |
| 4 | 2 | 4 | 5 | 11 | +2 |
| 5 | 2 | 4 | 5 | 11 | +2 |
| 6 | 2 | 4 | 5 | 11 | +2 |
| 7 | 2 | 4 | 5 | 11 | +4 |
| 8 | 2 | 4 | 5 | 11 | +4 |
| 9 | 2 | 4 | 5 | 11 | +4 |
| 10 | 2 | 4 | 5 | 11 | +4 |
| **Top.** | **20** | **31** | **50** | **101** | **+21,8** |

**Grafik:** Yığılı alan (gelir kaynakları) + çizgi (net nakit, 0 ekseni vurgulu).

**Alt başlık 2 — Olumsuz (Stres) Senaryo** — *Tablo 6.8.8*

| Yıl | Gelir | Gider | Yıllık Açık | DSRA Kalan |
|-----|-------|-------|-------------|------------|
| 1 | 7 | 8,5 | -1,5 | 13,5 |
| 2 | 8 | 8,7 | -0,7 | 12,8 |
| 3 | 7,5 | 9 | -1,5 | 11,3 |
| 4 | 7,5 | 9 | -1,5 | 9,8 |
| 5 | 7,5 | 9 | -1,5 | 8,3 |
| 6 | 7,5 | 9 | -1,5 | 6,8 |
| 7 | 8 | 7 | +1 | 7,8 |
| 8 | 8 | 7 | +1 | 8,8 |

> **Kritik bulgu:** Sistemi en çok zorlayan şey büyük foncunun çekilmesi değil, **vakıf sermayesinin korunup korunmadığı**dır. Vakıf getirisi + DSRA birlikte şok emici; en büyük foncu çekilse bile sistem yıllarca dayanır, karz-ı hasen kapanınca pozitife döner.

**Grafik:** İkili çizgi (gelir vs gider) + DSRA tükenme eğrisi (tampon vurgusu).

**Alt başlık 3 — İyimser Senaryo (Kademeli Büyüme)** — *Tablo 6.8.9*

| Yıl | Yıllık Gelir | Kümülatif Sukuk | Faz | Karbon |
|-----|-------------|-----------------|-----|--------|
| 1 | 7 | 50 | Üretim tesisi kurulumu | 0 |
| 3 | 12 | 50 | Tesis tam kapasite | 0 |
| 6 | 16 | 120 | Gazze'ye yerelleşme başlar | 0 |
| 10 | 24 | 350 | Yerel üretim + montaj | 2 |
| 15 | 40 | 500 | Büyük altyapı devrede | 3 |

> **Maliyet çapası:** Deir el-Balah orta ölçekli desalinasyon ~10 mn EUR / 6.000 m³/gün (Mizyed 2025). GCDP: 55 mn m³/yıl için ~582 mn EUR; tam ölçek (110–200 mn m³/yıl) ~1,5 Mrd $. İyimser senaryodaki büyük altyapı bu aralıkla uyumlu — ama tek fon değil, yeni sukuk + çok taraflı fon + hibe ile finanse edilir.

**Grafik:** Sukuk büyüme merdiveni (50→120→350→500) + gelir artış çizgisi; karbon yıl 8–10'dan itibaren.

**Alt başlık 4 — Yıl Bazlı Simülasyon (harita)**
- Gazze haritası üzerinde yıla göre güncellenen WASH varlıkları (mobil RO → konteyner RO → bakım merkezi → montaj → büyük tesis).
- Sağ panel: aktif WASH birimi, ulaşılan kişi, günlük temiz su, O&M maliyeti, finansman kaynağı.
- Yıl 10+ sonrası bakım merkezinden cihazlara kesikli bağlantı çizgileri.
- **Not (zorunlu etiket):** Harita noktaları temsilîdir; gerçek kurulum lokasyonu değildir.

**Alt başlık 5 — Senaryo Karşılaştırması** — *Tablo 6.8.10*

| Senaryo | Olgun Yıl Geliri | Olgun Yıl Gideri | Sonuç |
|---------|-----------------|------------------|-------|
| Temel | ≈ 11 mn $ | ≈ 9 mn $ | Sürdürülebilir; pozitif serbest nakit |
| Olumsuz (stres) | ≈ 7,5 mn $ | ≈ 9 mn $ | Açık; DSRA+vakıf+hibe ile yıllarca dayanır |
| İyimser | 17–40 mn $ | 9,5+ mn $ | Kendine yeter; büyük altyapıya geçer |

**Grafik:** Gruplu çubuk (3 senaryo × gelir/gider).

---

### 4.6 ETKİ ANALİZİ `/etki` ← 6.10 (Rubrik: sosyal etki 5p)

**Mesaj:** Para harcanmıyor, çalışıyor.

**Alt başlık 1 — KPI'lar (3 ölçek)** — *Tablo 6.10.1*

| Gösterge | Faz 1 (~40 mn $) | Temel (10 yıl) | İyimser (15 yıl) |
|----------|------------------|----------------|------------------|
| Su kapasitesi (m³/gün) | ≈ 8.000 | ≈ 26.000 | ≈ 100.000 |
| Erişen kişi (30 L/gün) | ≈ 265.000 | ≈ 865.000 | Nüfusun büyük kısmı |
| Güneş kapasitesi (MWp) | ≈ 1,5 | ≈ 4,8 | Onlarca MWp |
| Önlenen CO₂ (ton/yıl) | ≈ 1.700 | ≈ 5.600 | On binlerce |
| Doğrudan+dolaylı istihdam | ≈ 300 | ≈ 700 | 1.500–3.000 |
| Karbon kredisi geliri | 0 | 0 (baz) | 2–3 mn $/yıl (yıl 8–10'dan) |

> **Önemli sınır:** Erişen kişi = su kapasitesi ÷ kişi başı standart (15–50 L/gün). Düşük standart → daha çok kişiye asgari erişim; yüksek standart → daha az kişiye kaliteli erişim. Değerler aralıkla sunulur.

**Grafik:** 3-ölçekli gruplu çubuk (her gösterge için Faz1/Temel/İyimser).

**Alt başlık 2 — Etki Oranları & Maliyet-Etkinlik** — *Tablo 6.10.3*

| Oran | Değer | Dayanak |
|------|-------|---------|
| Kişi başı yatırım maliyeti | ≈ 75 $/kişi (Faz 1) | 20 mn $ ÷ ~265.000 kişi |
| Su kapasitesi birim maliyeti | ≈ 2.500 $/(m³·gün) | Deir el-Balah çapası (Mizyed 2025) |
| İdari (Vekâlet) gider oranı | ≈ %3,7 | Tipik insani yardımın altında |
| Programa ulaşan kaynak oranı | > %96 | İdari hariç tüm kaynak hizmete |
| **Sosyal geri dönüş (SROI)** | **≈ 4,3×** | WHO WASH getiri tahmininin muhafazakâr uyarlaması; ≈ 430 mn $ sosyal değer |
| Dizel ikamesi tasarrufu | 0,7–1,1 mn $/yıl | 2,3 GWh × 0,30–0,46 $/kWh (Rantissi 2024) |

**Grafik:** SROI vurgulu büyük sayı kartı + maliyet-etkinlik kart grid.

**Alt başlık 3 — Tamamlayıcı Sosyal Modüller** — *6.10.6*
6 modül (kart): kadın hijyeni, ikincil su yeniden kullanımı, yerel hafıza/topluluk sahipliği, okul/klinik hijyen istasyonları, yerel dağıtım ekipleri, ayni kurumsal katkı.
> **Sınır ilkesi:** Bu modüller ana finansman modelinin yerine geçmez; sukuk/müşareke gelir havuzlarıyla **karışmaz**. Yalnızca hibe + sosyal hizmet fonu + vakıf getirisi + ayni bağışla desteklenir.

**Alt başlık 4 — İzleme & Doğrulama** — *6.10.7*
KPI'ların veri kaynağı + doğrulama planı (saha ölçümü, bağımsız denetim, dijital izlenebilirlik).

---

### 4.7 KARŞILAŞTIRMA & SONUÇ `/degerlendirme` ← 6.9 + 6.11 + risk (Rubrik: 10p + risk 10p)

**Alt başlık 1 — Karşılaştırmalı Değerlendirme (6.9)**
GDAF'ın benzer modellerle (tek-araçlı sukuk, salt hibe, salt mikrofinans, geleneksel PPP) karşılaştırma tablosu; modelin 5 özgün yönü:
- Kaynak sıralaması: bağış/vakıf/karz-ı hasen önce, sukuk sonra ve modüler kapasiteye bağlı
- Vakıf anaparası dokunulmaz ("kuruldu ama işletilemedi" çözümü)
- Modüler varlık → erken hizmet, kademeli yerelleştirme
- Net çıkış stratejisi + yerel sahiplik
- Fon değil, sosyal altyapı platformu
- **Grafik:** Özellik karşılaştırma matrisi (✓/✗ ısı tablosu).

**Alt başlık 2 — Risk Matrisi** — *Tablo 6.8.11*

| Risk | Olasılık | Etki | Çözüm |
|------|----------|------|-------|
| Büyük foncu/hibe çekilir | Yüksek | Gelir düşer, yatırım ertelenir | DSRA + vakıf getirisi + hibe |
| Üretim tesisi gecikir | Yüksek | Sukuk geliri gecikir | Modüler hızlı gelir + takvim uzatma |
| Gelir beklenenden düşük | Orta | Ödemeler yavaşlar | Takvim uzatılır, yeni yatırım ertelenir |
| İşletme maliyeti artar | Orta | Net faaliyet düşer | O&M öncelikli; dağıtım geçici azaltılır |
| Savaş/abluka | Yüksek | Faaliyet durabilir | Tekafül dışı; modüler varlık taşınabilir; vakıf anaparası korunur |

**Grafik:** Olasılık×Etki ısı haritası (5 risk yerleştirilmiş).

**Alt başlık 3 — Sonuç & Politika Önerileri (6.11)**
Modelin özeti + somut politika önerileri (katılım bankaları, bağışçı ülkeler, kalkınma kuruluşları için). Salt özet değil; uygulanabilir adımlar.

---

### 4.8 TEKNİK EK & ŞEFFAFLIK `/teknik-ek`

**Sekmeler:**
- **Varsayımlar:** mikro %10, üretim %8, vakıf %5 getiri; standart 15–50 L/gün; karbon temelde 0.
- **Veri Kaynakları:** Rapor verisi (OCHA, WHO, RDNA 2026, Dünya Bankası) vs Temsili senaryo (model varsayımı). Her sayının etiketi.
- **KPI Tanımları:** her göstergenin formülü/sınırı.
- **Havuz Kuralları:** pool separation, vakıf dokunulmazlığı, sukuk %25 tavanı.
- **Kaynakça:** AAOIFI 2015, IFSB-1/IFSB-10, Migdad 2023, Pokorny 2026, Alhemdiat 2026, Buheji & Marouf 2024, Ghanem & Maghen 2026, Mizyed 2025, Rantissi 2024, Lawal & Sani-Yahuza, Al-Asadi 2021, Barakat 2018, Zaqout 2024.
- **YZ Kullanım Notu:** görselleştirme/araştırma desteği şeffaflığı.

---

## 5. VERİ ETİKETLEME SİSTEMİ (görsel)

| Etiket | Görünüm | Anlam |
|--------|---------|-------|
| **Rapor verisi** | Yeşil kenarlık + yeşil nokta | OCHA/WHO/RDNA/Dünya Bankası vb. gerçek veri |
| **Temsili senaryo** | Altın kenarlık + altın nokta | Model varsayımı / projeksiyon |

Hero ve footer'da sabit uyarı: *"Prototip — statik veri — jüri sunumu amaçlı. Gerçek operasyonel sistem değildir."*

---

## 6. TASARIM & TEMA (yüklenen ChatGPT görseliyle uyumlu)

- **Mod:** Açık tema; kırık beyaz / hafif yeşilimsi off-white arka plan.
- **His:** Kurumsal, akademik, sakin; kart tabanlı, bol beyaz alan, ince çizgiler.
- **Semantik renkler:**
  - `water` (orman yeşili) → ana marka, WASH/su, birincil buton, link
  - `impact` (orta yeşil) → olumlu sonuç, hedef, iyimser senaryo
  - `finance` (altın) → para, gelir, sukuk, finansman havuzları
  - `risk` (kırmızı) → kriz verisi, stres senaryosu, uyarı
  - `ink` (koyu yeşilimsi siyah) → başlık/güçlü metin
  - `rule` (açık gri-yeşil) → kenarlık/ayırıcı
- **Tipografi:** Inter (gövde + başlık); başlıklarda semi-bold + hafif negatif letter-spacing; bölüm üstünde "eyebrow" etiketi (büyük harf, geniş aralık, ör. `01 · KRİZ`).
- **Bileşenler:** `dash-card` (dashboard kartı), `panel` (içerik kutusu), `panel-2` (vurgu/yan not), `hairline` (ince çerçeve). Köşe ~12px.
- **Logo:** Dikey 3 şerit — siyah/kırmızı/yeşil (Gazze bayrağı).
- **Grafikler (Recharts):** semantik renkler; beyaz kart tooltip; küçük soluk gri eksen etiketleri.
- **Haritalar (SVG):** Gazze şeridi soyut poligon (gerçek uydu değil); açık mavi-yeşil deniz; yeni varlıklarda halka animasyonu; tüm güzergâhlar **temsilî**.
- **Responsive:** mobil 2 sütun KPI / tek sütun akış; tablet 3 sütun; masaüstü 6 sütun + tam menü + harita & yan panel yan yana.

---

## 7. İNTERAKTİF ÖĞELER

| Öğe | Konum | Etki |
|-----|-------|------|
| Senaryo seçici | Senaryolar | Tüm tablo/grafik/yan panel değişir |
| Yıl seçici | Senaryolar / harita | Harita varlıkları + KPI'lar güncellenir |
| Teknik ek sekmeleri | Teknik Ek | İçerik değişir |
| Alt menü scroll-spy | Tüm hub'lar | Aktif alt başlık vurgulanır |
| Grafik/harita tooltip | Kriz, Finansman, Etki | Sayısal detay |
| Servings-benzeri ölçek (ops.) | Etki | Kişi başı su standardı 15–50 L → erişen kişi değişir |

**Olmayanlar:** giriş/kayıt, form gönderimi, canlı API, gerçek ödeme/bağış, çoklu dil.

---

## 8. UYGULAMA NOTLARI (geliştirici için)

- Tüm veriyi tek bir `data/` klasöründe **statik JSON** olarak tut (ör. `kriz.json`, `finansman.json`, `senaryolar.json`, `etki.json`). Bu MD'deki tablolar birebir bu JSON'lara girer.
- Her sayıya `{ value, label: "rapor"|"senaryo", source: "..." }` yapısı ver → etiket sistemi otomatik çalışır.
- Grafik kütüphanesi: **Recharts** (donut, çubuk, alan, çizgi, waterfall). Sankey için `recharts` Sankey veya `d3`.
- Harita: SVG poligon + yıl bazlı koşullu render. Gerçek koordinat gerekmez (temsilî).
- Route yapısı yukarıdaki sitemap'e birebir uyar (`/kriz`, `/model`, `/finansman`, `/senaryolar`, `/etki`, `/degerlendirme`, `/teknik-ek`).
- **Çelişki uyarısı:** Site sayıları yalnızca bu dosyadan beslensin. Raporda bir sayı değişirse önce burada güncelle, sonra JSON.

---

## 9. AÇIK KARARLAR (senin onayın gereken)

1. **Harita gerçekçiliği:** Soyut poligon mu, yoksa hafif gerçekçi Gazze silüeti mi? (Öneri: soyut + "temsilî" etiketi — güvenli.)
2. **Yıl simülasyonu derinliği:** Sadece KPI güncellemesi mi, yoksa animasyonlu varlık ekleme mi?
3. **Karbon kredisi:** İyimser senaryoda yıl 8–10'dan görünür; temelde 0 (rapor ilkesi korunuyor).
4. **Şehit isimlendirme modülü:** Yerel hafıza modülünde — uluslararası bağışçı itibarı riski nedeniyle **nötr** isimlendirme önerilir (rapordaki uyarıyla uyumlu).
5. **6.7 (hukuki) içeriği:** Raporda hâlâ kritik boşluk — sitede yer ayrıldı ama metin tamamlanınca doldurulmalı.

---

*Bu plan, Cursor'ın iki-sayfalı (uzun scroll) yapısının yerine geçer. 7 hub + alt menü yapısı hem nettir hem rubrikle birebir hizalıdır.*
