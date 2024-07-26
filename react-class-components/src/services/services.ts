import { SwapiPerson } from '../types/type';

export function convertToCSV(items: SwapiPerson[]): string {
    const headers = ['Name', 'Description', 'Details URL'];

    const rows = items.map((item) => {
        const description = `${item.name} is ${item.height} cm tall, weighs ${item.mass} kg, has ${item.hair_color} hair, ${item.skin_color} skin, and ${item.eye_color} eyes.`;
        return [item.name, description, item.url];
    });

    const csvContent = [headers, ...rows].map((rowStrings) => rowStrings.join(';')).join('\n');
    return csvContent;
}
