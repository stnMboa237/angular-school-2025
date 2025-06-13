import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'fullname',
    standalone: true
})

export class FullNamePipe implements PipeTransform {
    transform(value: string, ...args: string[]): string {
        if (value !== undefined && args !== undefined)
            return [value, ...args].join(' ');

        if (value !== undefined && (args === undefined || args === null)) {
            return value;
        }
        return '';
    }
}
