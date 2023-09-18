let workerInstance = null;

export const getSocketWorker = () => {
  if (!workerInstance) {
    if (typeof Worker !== "undefined") {
      // Use an absolute path starting with a slash to reference the worker file
      workerInstance = new Worker("/worker/socketWorker.js");
    }
  }
  return workerInstance;
};
