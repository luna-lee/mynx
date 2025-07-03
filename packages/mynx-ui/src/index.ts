import type { App } from 'vue';

// Import components
import MHierarchy from './MHierarchy/index.vue';
import MCurtain from './MCurtain/index.vue';
import MList from './MList/index.vue';
import MDiv from './MDiv/index.vue';
import MScale from './MScale/index.vue';
import MTextellips from './MTextellips/index.vue';
import MIfShow from './MIfShow/index.vue';
import MValidator from './MValidator/index.vue';
import MScroll from './MScroll/index.vue';
import MSubsection from './MSubsection/index.vue';

// Create component map
export const components: Record<string, any> = {
  MHierarchy,
  MCurtain,
  MList,
  MDiv,
  MScale,
  MTextellips,
  MIfShow,
  MValidator,
  MScroll,
  MSubsection,
};

// Plugin installation
export const MynxUI = {
  install(app: App) {
    // Register all components
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    return app;
  },
};

// Export components individually
export { MHierarchy };
export { MCurtain };
export { MList };
export { MDiv };
export { MScale };
export { MTextellips };
export { MIfShow };
export { MValidator };
export { MScroll };
export { MSubsection };

// For backward compatibility
export default MynxUI;
