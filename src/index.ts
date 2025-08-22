import { AppDataSource } from './data-source';
import app from './app';

(async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('DataSource initialized');
    }
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000`);
    });
  } catch (err) {
    console.error('Failed to start app:', err);
    process.exit(1);
  }
})();

process.on('SIGINT', async () => {
  try {
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  } finally {
    process.exit(0);
  }
});

export { AppDataSource };
