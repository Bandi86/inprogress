export const cutBody = (data: string) => {
  const type = typeof data;

  if (type === 'string') {
    const words = data.split(' ');

    if (words.length > 20) {
      const splitData = words.slice(0, 10).join(' ');

      return splitData;
    } else {
      return data; // Ha kevesebb, mint 10 szó van, visszatér az eredeti szöveggel
    }
  } else {
    return data; // Vagy más alapértelmezett érték, ha nem string a bemenet
  }
};
