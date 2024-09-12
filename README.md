# ZonelessCalculator

Just clone repository and run the package manager install in console like "npm install" or "bun install"


## Description

This is just a small project to test zoneless and tailwindcss.
 

 ## Pasos para realizar tests de karma desde wsl2 por problemas al abrir ChromeHeadless

- Descargar "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"
- Colocarlo en una carpeta de wsl2
- Desde la terminal de wsl2 ir a la carpeta donde se encuentra el archivo
- Ejecutar "sudo dpkg -i google-chrome-stable_current_amd64.deb"

### En caso de fallar 

- Eliminar  

````
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
```

- Instalar dependencias falantes sudo apt-get install -f

- Verificar dependencias especificas

````
sudo apt-get update
sudo apt-get install fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 libgbm1 libgtk-3-0 libnspr4 libnss3 libvulkan1 libxcomposite1 libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils
```

- Intentar instalar de nuevo "sudo dpkg -i google-chrome-stable_current_amd64.deb" desde la carpeta donde se encuentra el archivo

