/**
 * Function to convert text to English.
 *
 * @param {string} text - The text to be converted.
 * @returns {string} The converted text in English.
 */


export function convertToEnglish(text) {
    // Define a mapping of non-English characters to their English equivalents
    const characterMap = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ñ': 'n',
        'ö': 'o',
        'ő': 'o',
        'ü': 'u',
        'ű': 'u'
        // Add more mappings as needed
    };
 
    // Convert each character in the text to its English equivalent
    const convertedText = text
        .split('')
        .map((char) => characterMap[char] || char)
        .join('');
 
    return convertedText;
}
 
