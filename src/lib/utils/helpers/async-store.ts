import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreItems = {
  auth: {
    password: string;
    email: string;
  };
  user: {
    firstname: string;
    lastname: string;
  };
  onboarded: boolean;
};

export async function getItemFromAsyncStore<K extends keyof StoreItems>(
  item: K,
): Promise<StoreItems[K] | null> {
  const storedItem = await AsyncStorage.getItem(item);
  return storedItem ? (JSON.parse(storedItem) as StoreItems[K]) : null;
}

export async function addItemToAsyncStore<K extends keyof StoreItems>(
  key: K,
  value: StoreItems[K],
): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
