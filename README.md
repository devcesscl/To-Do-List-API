# To-Do List API

API REST para gestión de tareas desarrollada con **TDD (Test Driven Development)**, **Sequelize ORM** y **CI/CD con GitHub Actions**.

> Proyecto académico — Construcción de Software | Producto Académico N.3

---

## 🚀 Tecnologías

| Componente | Tecnología |
|---|---|
| Lenguaje | TypeScript / Node.js 20 |
| Framework Web | Express.js 4 |
| ORM | Sequelize 6 + pg (PostgreSQL) |
| Framework de Pruebas | Jest 29 + Supertest |
| Cobertura | Istanbul (jest --coverage) |
| CI/CD | GitHub Actions |

---

## 📁 Estructura del Proyecto

```
├── src/
│   ├── config/         # Configuración de base de datos
│   ├── models/         # Modelos Sequelize (Task, User, Category)
│   ├── repositories/   # Capa de acceso a datos
│   ├── services/       # Lógica de negocio
│   ├── controllers/    # Controladores HTTP
│   └── routes/         # Rutas Express
├── tests/
│   └── unit/
│       ├── services/       # Pruebas de TaskService y UserService
│       ├── controllers/    # Pruebas de TaskController
│       └── repositories/   # Pruebas de TaskRepository
├── katas/
│   ├── fizzbuzz/           # Kata FizzBuzz
│   ├── string-calculator/  # Kata String Calculator
│   └── bowling-game/       # Kata Bowling Game
└── .github/workflows/  # Pipeline CI/CD
```

---

## ⚙️ Instalación y Uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/devcesscl/To-Do-List-API.git
cd To-Do-List-API

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL

# 4. Iniciar en desarrollo
npm run dev
```

---

## 🧪 Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con reporte de cobertura
npm run test:coverage

# Ejecutar en modo watch
npm run test:watch
```

### Cobertura alcanzada

| Módulo | Líneas | Ramas |
|---|---|---|
| TaskService | 92% | 88% |
| TaskController | 89% | 85% |
| UserService | 95% | 91% |
| TaskRepository | 87% | 84% |
| **Total** | **91%** | **87%** |

---

## 🔄 Ciclo TDD Red-Green-Refactor

Cada funcionalidad fue desarrollada siguiendo el ciclo:

1. **🔴 RED** — Escribir la prueba que falla
2. **🟢 GREEN** — Implementar el mínimo código para pasar
3. **🔵 REFACTOR** — Mejorar sin romper las pruebas

---

## 🎯 Katas TDD

| Kata | Descripción | Iteraciones |
|---|---|---|
| FizzBuzz | Reglas divisibles por 3, 5 y 15 | 4 |
| String Calculator | Suma de strings con delimitadores | 7 |
| Bowling Game | Cálculo de puntaje de bolos | 5 |

---

## 🔗 Endpoints API

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/tasks` | Crear tarea |
| GET | `/api/tasks/:id` | Obtener tarea por ID |
| GET | `/api/tasks/user/:userId` | Tareas por usuario |
| PUT | `/api/tasks/:id` | Actualizar tarea |
| DELETE | `/api/tasks/:id` | Eliminar tarea (soft delete) |

---

## 📊 CI/CD

El pipeline de GitHub Actions se activa en cada push y pull request:
- Levanta un servicio PostgreSQL 15
- Ejecuta la suite completa de pruebas
- Verifica cobertura mínima del 80%
- Genera reporte de cobertura como artifact
