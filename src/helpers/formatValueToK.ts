export const formatValueToK = (value: number) => {
    const suffixes = ['', 'K', 'M', 'B', 'T']; // Sırasıyla: birim, bin, milyon, milyar, trilyon
    let suffixIndex = 0;

    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
        value /= 1000;
        suffixIndex++;
    }

    // Değerin virgülden sonraki kısmı 3 basamaktan fazlaysa, sadece ilk 3 basamağı alıyoruz.
    const formattedValue = value.toFixed(2);
    const [integerPart, decimalPart] = formattedValue.split('.');

    // Virgülden sonraki kısmı alıyoruz ve tam olarak üç basamağı alıyoruz.
    const truncatedDecimal = decimalPart?.slice(0, 3).padEnd(3, '0') || '';

    // Biçimlendirilmiş sayıyı ve birimi döndürüyoruz.
    let result = `${integerPart}.${truncatedDecimal}${suffixes[suffixIndex]}`
    return result;
};