# Jak publikovat šablonu na GitHub jako Template Repository

Postup, abys mohla **klonovat šablonu jedním kliknutím** pro každý nový web.

## Krok 1: Rozbalit zip

Stáhni `krystalicka-mrizka.zip` (dodaný Claude), rozbal do:
```
C:\Users\Acer\Projekty\krystalicka-mrizka\
```

## Krok 2: Inicializovat git

Otevři PowerShell:
```
cd C:\Users\Acer\Projekty\krystalicka-mrizka
git init
git branch -M main
git add .
git config user.email "blanka.pallanova@gmail.com"
git config user.name "Blanka Pallanová"
git commit -m "Krystalická mřížka — výchozí šablona"
```

## Krok 3: Vytvořit GitHub repo

1. github.com → New repository
2. **Repository name:** `krystalicka-mrizka`
3. **Description:** „Tichá Astro šablona — narativní páteř Brána-Síň-Komnaty-Vrchol s modulárními nástavbami"
4. **Visibility:** Public *(doporučeno — komunita)* nebo Private *(jen pro tebe a tvé klienty)*
5. **NIC dalšího nezaškrtávat** *(žádný README, .gitignore, license — máme vlastní)*
6. **Create repository**

## Krok 4: Push lokálního projektu

V PowerShellu *(stále v `C:\Users\Acer\Projekty\krystalicka-mrizka`)*:
```
git remote add origin https://github.com/Morion44/krystalicka-mrizka.git
git push -u origin main
```

*(Přihlásíš se GitHub OAuth oknem, které vyskočí.)*

## Krok 5: Označit jako Template Repository

1. Na GitHubu otevři repo `krystalicka-mrizka`
2. **Settings** (záložka nahoře)
3. **General** *(levé menu)*
4. Scroll dolů → najdi **„Template repository"** checkbox
5. **Zaškrtni** ✅
6. Save

## Krok 6: Použít jako template

Teď kdykoli budeš stavět nový web:

1. github.com/Morion44/krystalicka-mrizka
2. **„Use this template"** *(zelené tlačítko vpravo nahoře)*
3. **Create a new repository**
4. Název nového repa *(např. `klient-novak`)*
5. **Create repository from template**
6. Hotovo — máš nový repo s kopií šablony

Pak naklonuj a začni podle **CHECKLIST-NOVY-WEB.md**.

## Krok 7 (volitelně): Publikovat veřejně

Pokud chceš, aby šablonu mohli používat i jiní, můžeš:
- Sdílet GitHub URL
- Napsat blog článek o filozofii šablony
- Přidat do české Astro komunity *(GitHub topic `astro-cz`, `astro-template`)*
