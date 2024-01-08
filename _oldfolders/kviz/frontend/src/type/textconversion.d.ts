import { convertToEnglish } from '../../../backend/app/utils/textconversion';


declare module 'textconversion' {
  export function convertToEnglish(text: string): string;
}
export { convertToEnglish };
