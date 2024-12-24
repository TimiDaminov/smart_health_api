import app from './app';

const PORT = process.env.PORT || 5051;

app.listen(PORT, () => {
  console.log(`API сервер запущен на порту ${PORT}`);
});
