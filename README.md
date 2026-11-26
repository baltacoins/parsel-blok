# Parsel Blok — Mobil Uygulama

Altıgen parselli bir şehirde arsa yatırımı ve belediyecilik üzerine Türkçe strateji oyunu.
Oyunun tamamı `www/index.html` içinde tek dosya; **Capacitor** bunu Android'de native bir uygulama olarak çalıştırır.

## Klasörler

| Yol | İçerik |
|---|---|
| `www/` | Oyun (HTML/CSS/JS) ve uygulamaya gömülü Fredoka yazı tipi — internet gerekmez |
| `android/` | Android Studio projesi (`com.parselblok.app`) |
| `capacitor.config.json` | Uygulama kimliği, adı, renkleri |
| `scripts/check-game.mjs` | Derleme öncesi denetim: eksik dosya, JS hatası, dış bağlantı |
| `store-assets/` | Play Store simgesi, öne çıkan grafik, ekran görüntüleri |
| `privacy/` | Gizlilik politikası sayfası (GitHub Pages ile yayınlanır) |
| `STORE_LISTING.md` | Play Console'a kopyalanacak metinler |

## Otomatik derleme (GitHub Actions)

`main` dalına her gönderimde `.github/workflows/build-apk.yml` çalışır:

1. Oyun dosyasını denetler.
2. Test için **debug APK** üretir.
3. İmzalama anahtarı tanımlıysa **imzalı release AAB + APK** üretir; `versionCode` her derlemede otomatik artar.
4. Sonuçları sabit bir adrese koyar: **Releases → `son-derleme`**
   (`https://github.com/baltacoins/parsel-blok/releases/tag/son-derleme`).
   Play Console'a yüklenecek dosya: `parsel-blok-release.aab`.

### İmzalama anahtarı (Settings → Secrets and variables → Actions)

| Secret | Değer |
|---|---|
| `PARSEL_KEYSTORE_BASE64` | keystore dosyasının base64 hali |
| `PARSEL_KEYSTORE_PASSWORD` | keystore şifresi |
| `PARSEL_KEY_ALIAS` | anahtar adı |
| `PARSEL_KEY_PASSWORD` | anahtar şifresi |

Keystore dosyasını ve şifreleri güvenli bir yerde yedekle. Play App Signing açıkken bu "yükleme anahtarı" kaybolursa Play Console'dan sıfırlatılabilir, ama süreç zahmetlidir.

## Oyunu güncellemek

1. `www/index.html` dosyasını yeni sürümle değiştir.
2. Kullanıcıya görünen sürüm adını `android/app/build.gradle` içindeki `versionName` ile artır (ör. `1.1`).
3. `main`'e gönder; birkaç dakika sonra yeni AAB `son-derleme` sürümünde olur.

## Yerelde deneme (isteğe bağlı)

```bash
npm ci
npx cap sync android
npx cap open android   # Android Studio açılır, Run ile telefonda dene
```
