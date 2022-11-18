import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source initialized");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(`0.0.0.0:${process.env.PORT}` || `0.0.0.0:${3000}`, () => {
    console.log(`Server is running on port ${`0.0.0.0:${process.env.PORT}` || `0.0.0.0:${3000}`}`);
  });
})();
