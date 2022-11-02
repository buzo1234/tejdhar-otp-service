const { app, db, PORT } = require('./config/config');
const { SERVER_DB_URI } = require('./constants/constants');
const bootstrap = async () => {
  try {
    await db
      .connect(SERVER_DB_URI)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    app.listen(PORT, async () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
