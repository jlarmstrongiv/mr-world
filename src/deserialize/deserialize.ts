export interface DeserializeParameters<T> {
  id: string;
  deserializer?: (data: string) => Promise<T> | T;
}

export async function deserialize<T = any>({
  id,
  deserializer = JSON.parse,
}: DeserializeParameters<T>): Promise<T> {
  const elements = document.querySelectorAll<HTMLScriptElement>(
    `script#${id}[type="application/json"]`
  );

  const elementsCount = elements.length;

  switch (elementsCount) {
    case 0:
      throw new Error(`[Deserialize]: data with id="${id}" not found`);
    case 1:
      const serializedData = elements[0].textContent;
      if (serializedData === null) {
        throw new Error(`[Deserialize]: data with id="${id}" is null`);
      }
      return deserializer(serializedData);
    default:
      throw new Error(`[Deserialize]: multiple data with id="${id}" found`);
  }
}
