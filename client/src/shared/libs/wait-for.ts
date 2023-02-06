export const waitFor = (ms: number) => {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject(new Error('Time travel not implemented'));
    }
    setTimeout(resolve, ms);
  });
};
