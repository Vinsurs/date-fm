export interface LocaleOptions {
  weekdays?: string[];
  weekdaysAbbr?: string[];
  months?: string[];
  monthsAbbr?: string[];
  ampm?: [string, string];
  isPm?: (hour: number) => boolean;
}
