# Pawłowice Bears — strona klubowa

Statyczna strona HTML5 / CSS3 / JavaScript. Bez frameworków, bez procesu budowania.
Wrzucasz katalog na dowolny hosting (albo na GitHub Pages / Netlify) i działa.

## Zawartość

```
index.html        strona główna
druzyny.html      drużyny i harmonogram treningów
galeria.html      galeria z filtrami i podglądem zdjęć
kontakt.html      kontakt, hale, mapa, zapisy Active Now
assets/
  style.css       cały wygląd, motyw ciemny i jasny
  app.js          motyw, menu mobilne, galeria, formularz
  logo-navy.png   logo granatowe (motyw jasny)
  logo-white.png  logo białe (motyw ciemny)
```

## Zanim opublikujesz — co trzeba uzupełnić

W kodzie szukaj komentarzy `UZUPEŁNIJ`, a na stronie — tekstów pisanych kursywą
z kropkowanym podkreśleniem (klasa `tbd`). Lista:

| Gdzie | Co |
|---|---|
| `build`-owe dane w każdym pliku | adres logowania do Active Now (obecnie `https://activenow.pl/`) |
| nagłówek i stopka | adresy profili na Facebooku i Instagramie |
| `druzyny.html` | imiona, nazwiska, telefony i e-maile trenerów grup D1, D2, C1, C2 |
| `druzyny.html` | harmonogram treningów — wpisane godziny są przykładowe |
| `kontakt.html` | numery telefonów do zarządu i trenerów |
| `kontakt.html` | widżet zapisów Active Now — komentarz `<!-- WIDŻET ACTIVE NOW IFRAME -->` |
| stopka | logotypy partnerów i informacja o dofinansowaniu |
| wszędzie | adres e-mail `kontakt@pawlowicebears.pl` |

Adresy hal (ul. Sportowa 14, ul. Pukowca 4, ul. Pukowca 5) pochodzą z materiałów
gminy Pawłowice — warto je jeszcze raz potwierdzić przed publikacją.

## Zdjęcia

Grafiki w galerii i tło sekcji powitalnej to zastępcze rysunki SVG w barwach klubu.

**Galeria:** utwórz katalog `assets/zdjecia/`, wgraj pliki i w `galeria.html`
podmień każdy znacznik `<svg …>…</svg>` na:

```html
<img src="assets/zdjecia/mecz-01.jpg" alt="Opis zdjęcia" loading="lazy">
```

Kategoria zdjęcia (filtr) siedzi w atrybucie `data-kat` na znaczniku `<figure>`:
`mecze`, `treningi` albo `turnieje`.

**Tło sekcji powitalnej:** w `assets/style.css` znajdź regułę `.hero__photo`
i dopisz `background-image: url('hero.jpg');`.

## Formularz kontaktowy

Strona jest statyczna, więc formularz składa gotową wiadomość i otwiera program
pocztowy odwiedzającego. Jeśli chcesz wysyłkę po stronie serwera, podmień obsługę
`submit` w `assets/app.js` na własny endpoint albo usługę typu Formspree.

## Motyw jasny i ciemny

Domyślnie ładuje się motyw ciemny. Wybór odwiedzającego zapisuje się w
`localStorage` pod kluczem `bears-theme` i działa na wszystkich podstronach.
Żeby zmienić domyślny motyw na jasny, w każdym pliku HTML zamień
`<html lang="pl" data-theme="dark">` na `data-theme="light"` i popraw wartość
domyślną w skrypcie w sekcji `<head>`.

## Kolory

Wszystkie kolory siedzą w zmiennych CSS na górze `assets/style.css`
(sekcja „Tokeny”). Granat klubowy to `#0B1B4F`.
