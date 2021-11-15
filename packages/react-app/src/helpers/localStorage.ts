const setItem = (key: string, item: string) => {
  const { localStorage } = window;

  localStorage.setItem(key, item);
};

const getItem = (key: string): string | null => {
  const { localStorage } = window;

  return localStorage.getItem(key);
};

const removeItem = (key: string) => {
  const { localStorage } = window;

  localStorage.removeItem(key);
};

export default { setItem, getItem, removeItem };
