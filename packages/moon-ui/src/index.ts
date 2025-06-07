import type { App } from 'vue';

// Import components
// import MHierarchy from "./MoonHierarchy/index.vue";
import MCurtain from './MCurtain/index.vue';
// @ts-ignore
import MList from './MList/index.vue';

// Create component map
export const components: Record<string, any> = {
  MCurtain,
  MList,
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
export { MList };

// For backward compatibility
export default MoonUI;
