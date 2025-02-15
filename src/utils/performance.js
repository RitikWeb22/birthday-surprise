export const measurePerformance = (componentName) => {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    console.log(`${componentName} render time:`, end - start);
  };
};
