export const randomPositiveInt = (max: number): number => 1 + Math.trunc(Math.random() * max)

export const average = (values: number[]): number => values.reduce((sum, current) => current + sum, 0) / values.length