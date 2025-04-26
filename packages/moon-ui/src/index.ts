import type { App } from 'vue';

// Import components
// import MHierarchy from "./MoonHierarchy/index.vue";
import MDemo from './MoonDemo/index.vue';
// Create component map
const components = {
  MDemo,
};

// Plugin installation
export const MoonUI = {
  install(app: App) {
    // Register all components
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    return app;
  },
};

// Export components individually
// export { MHierarchy };

// For backward compatibility
export default MoonUI;
