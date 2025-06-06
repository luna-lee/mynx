import type { App } from 'vue';

// Import components
// import MHierarchy from "./MoonHierarchy/index.vue";
import MCurtain from './MCurtain/index.vue';
// Create component map
export const components: Record<string, any> = {
  MCurtain,
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
export { MCurtain };
// For backward compatibility
export default MoonUI;
