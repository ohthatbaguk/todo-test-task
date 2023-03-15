function getFullDate(data: Date): string {
  return data.toISOString().slice(0, 10);
}

export { getFullDate };
