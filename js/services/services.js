// Функция для работы с сервером 
// Нужно указать. что это асинхронный код (async), чтобы не было ошибки, так как мы не знаем точное время, когда нам вернуться данные с promise
const postData = async (url, data) => {
  // Ставим await перед теми данными, которых нам нужно дождаться
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
// Здесь тоже нужен await, так как тут тоже promise
  return await res.json();
};


// Получаем информацию для карточек с сервера с помощью get запроса
const getResource = async (url) => {
  const res = await fetch(url);

  // Так как 404 или 500 не повлекут за собо ошибки, этот момент отрабтаем вручную с помощью свойств .ok и status
  if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
  }
  return await res.json();
};

export {postData, getResource};