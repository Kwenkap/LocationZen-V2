# 🎨 LocationsZen - Design System Documentation

## Vue d'ensemble

Ce système de design moderne a été créé pour LocationsZen, une application de gestion de locataires et factures. Il privilégie la clarté, l'élégance et l'efficacité.

---

## 🎨 Palette de couleurs

### Couleurs Primaires

**Primary (Teal/Cyan)** - Confiance & Modernité
- `--primary`: `hsl(186 77% 45%)`
- `--primary-hover`: `hsl(186 77% 38%)`
- `--primary-glow`: `hsl(186 77% 65%)`

**Secondary (Deep Indigo)** - Professionnalisme
- `--secondary`: `hsl(231 48% 48%)`
- `--secondary-hover`: `hsl(231 48% 40%)`

**Accent (Amber/Orange)** - Énergie & Action
- `--accent`: `hsl(32 95% 55%)`
- `--accent-hover`: `hsl(32 95% 48%)`

### Couleurs Sémantiques

**Success (Fresh Green)**
- `--success`: `hsl(142 76% 36%)`

**Warning (Vibrant Orange)**
- `--warning`: `hsl(25 95% 53%)`

**Destructive (Bold Red)**
- `--destructive`: `hsl(0 84% 60%)`

### Couleurs Neutres

**Backgrounds**
- `--background`: `hsl(210 20% 98%)` - Light mode
- `--background`: `hsl(222 47% 8%)` - Dark mode

**Muted**
- `--muted`: `hsl(210 20% 94%)` - Light
- `--muted`: `hsl(222 43% 15%)` - Dark

---

## 📐 Gradients

```css
/* Gradient Primary - Teal to Indigo */
--gradient-primary: linear-gradient(135deg, hsl(186 77% 45%) 0%, hsl(231 48% 48%) 100%);

/* Gradient Accent - Warm Orange */
--gradient-accent: linear-gradient(135deg, hsl(32 95% 55%) 0%, hsl(25 95% 53%) 100%);

/* Gradient Subtle - Background variations */
--gradient-subtle: linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(210 20% 96%) 100%);
```

### Utilisation des Gradients

```tsx
// Dans un Button
<Button className="gradient-primary hover:opacity-90">
  Action Button
</Button>

// Dans un Background
<div className="gradient-subtle min-h-screen">
  {children}
</div>
```

---

## 🔤 Typographie

### Familles de Polices

**Sans-serif (UI)** - Inter
```css
font-family: 'Inter', system-ui, sans-serif;
```

**Heading** - Poppins
```css
font-family: 'Poppins', sans-serif;
```

### Utilisation

```tsx
// Heading
<h1 className="font-heading font-bold text-4xl">
  Titre Principal
</h1>

// Body Text
<p className="font-sans text-base">
  Texte régulier
</p>
```

---

## 🎭 Animations

### Animations Disponibles

```css
/* Float Animation */
.animate-float

/* Slide In */
.animate-slide-in-right
.animate-slide-in-left

/* Fade & Scale */
.animate-fade-in-up
.animate-scale-in

/* Shimmer (loading) */
.animate-shimmer
```

### Effets Hover

```css
/* Lift Effect */
.hover-lift
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Glow Effect */
.hover-glow:hover {
  box-shadow: var(--shadow-glow);
}
```

### Exemples d'utilisation

```tsx
// Card avec effet lift
<Card className="hover-lift">
  {content}
</Card>

// Animation d'entrée progressive
<div 
  className="animate-fade-in-up" 
  style={{ animationDelay: '200ms' }}
>
  {content}
</div>
```

---

## 🧱 Composants Réutilisables

### StatCard

Widget de statistique avec icône et changement de valeur.

```tsx
<StatCard
  title="Total Locataires"
  value="24"
  change="+12%"
  changeType="positive"
  icon={Users}
  iconColor="gradient-primary"
  delay={0}
/>
```

**Props:**
- `title`: string - Titre de la statistique
- `value`: string | number - Valeur principale
- `change`: string (optionnel) - Changement en %
- `changeType`: "positive" | "negative" | "neutral"
- `icon`: LucideIcon - Icône Lucide
- `iconColor`: string - Classe CSS pour la couleur
- `delay`: number - Délai d'animation en ms

### DashboardLayout

Layout principal avec sidebar et header.

```tsx
<DashboardLayout>
  {children}
</DashboardLayout>
```

**Inclut:**
- Sidebar collapsible
- Header avec recherche et notifications
- Avatar utilisateur
- Zone de contenu scrollable

### AppSidebar

Navigation latérale avec groupes et badges.

**Features:**
- Collapsible avec mode mini
- Badges de notification
- Navigation active stylisée
- Groupes organisés (Principal, Analytiques, Paramètres)

---

## 🎨 Ombres & Effets

```css
/* Shadow Tokens */
--shadow-sm: 0 1px 2px 0 hsl(222 47% 11% / 0.05);
--shadow-md: 0 4px 6px -1px hsl(222 47% 11% / 0.1);
--shadow-lg: 0 10px 15px -3px hsl(222 47% 11% / 0.1);
--shadow-xl: 0 20px 25px -5px hsl(222 47% 11% / 0.1);
--shadow-glow: 0 0 20px hsl(186 77% 45% / 0.3);
```

### Glass Morphism

```tsx
<div className="glass">
  {/* backdrop-blur + transparency */}
</div>
```

---

## 📱 Responsive Design

Tous les composants sont **fully responsive** avec les breakpoints Tailwind:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px

```tsx
// Exemple: Grid adaptatif
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

---

## ♿ Accessibilité

### Contraste
Tous les tokens de couleur respectent les ratios WCAG AA minimum (4.5:1 pour le texte normal).

### Focus States
Les éléments interactifs ont des états de focus visibles:

```css
focus:ring-2 focus:ring-primary focus:ring-offset-2
```

### Navigation au clavier
La sidebar et tous les boutons sont navigables au clavier.

---

## 🛠️ Customisation

### Modifier les couleurs primaires

Dans `src/index.css`:

```css
:root {
  --primary: [nouvelle valeur HSL];
  --primary-hover: [nouvelle valeur HSL];
}
```

### Ajouter de nouvelles animations

Dans `src/index.css`:

```css
@keyframes mon-animation {
  from { /* état initial */ }
  to { /* état final */ }
}
```

Puis dans `tailwind.config.ts`:

```ts
animation: {
  'mon-animation': 'mon-animation 1s ease-in-out',
}
```

---

## 📋 Checklist d'Intégration

- [x] Design system configuré (index.css)
- [x] Tokens Tailwind étendus (tailwind.config.ts)
- [x] Google Fonts intégrées (Inter + Poppins)
- [x] Composants réutilisables créés
- [x] Sidebar moderne avec navigation
- [x] Dashboard avec widgets
- [x] Pages Locataires et Factures
- [x] Animations et micro-interactions
- [x] Mode Dark supporté
- [x] Responsive design
- [x] Accessibilité

---

## 🚀 Prochaines Étapes

Pour continuer la refonte:

1. **Ajouter les pages restantes** (Propriétés, Statistiques, Calendrier, Rapports, Paramètres)
2. **Intégrer l'API backend** (connecter les vrais données)
3. **Améliorer les micro-interactions** (toasts, loaders, confirmations)
4. **Tests d'intégration** (Jest, React Testing Library)
5. **Optimiser les performances** (lazy loading, code splitting)

---

## 📞 Support

Pour toute question sur le design system:
- Documentation complète : Ce fichier
- Composants Shadcn : [shadcn/ui docs](https://ui.shadcn.com/)
- Tailwind CSS : [tailwindcss.com](https://tailwindcss.com/)

---

**Version**: 1.0.0  
**Dernière mise à jour**: 2025-11-23  
**Auteur**: LocationsZen Team
