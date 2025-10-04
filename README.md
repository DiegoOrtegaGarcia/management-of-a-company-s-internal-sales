# 🛍️ E-commerce API

Sistema backend para gestión de órdenes de venta desarrollado en Laravel con React (frontend próximo).

## 🚀 Características

- ✅ Gestión de productos y clientes
- ✅ Sistema de órdenes con descuentos
- ✅ Autenticación JWT con Passport
- ✅ Listas de productos dinámicas
- ✅ API RESTful documentada

## 📋 Requisitos

- PHP 8.1+
- Composer 2.0+
- MySQL 8.0+
- Node.js 18+ (para frontend)

## 🔧 Instalación

### 1. Clonar el proyecto
```bash
git clone https://github.com/tuusuario/tu-proyecto.git
cd tu-proyecto
```
### 2-Instalar Dependencias
```bash
composer install
```
### 3-Configurar Entorno
```bash
cp .env.example .env
php artisan key:generate
```

### 4-Ejecutar Migraciones
```bash
php artisan migrate --seed
```

### 5-Instalar Passport Para la autenticacion
```bash
php artisan passport:install
```
### 6-Instalar dependencias Frontend
```bash
npm install
npm run build
```

### 7-Generar la Documentacion de la Api
```bash
php artisan scribe:generate
```

### 8-Iniciar el proyecto
```bash
composer run dev
```

# Documentacion de la Api
Una vez instalado, accede a la documentación en:
```text
http://localhost:8000/docs
```
