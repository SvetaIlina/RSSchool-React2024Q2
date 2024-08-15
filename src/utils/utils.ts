const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = (error) => {
            rej(error);
        };
        reader.readAsDataURL(file);
    });
};

export default getBase64;
