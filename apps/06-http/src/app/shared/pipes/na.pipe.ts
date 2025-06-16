import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'na'
})

export class NAPipe implements PipeTransform {
    transform(value: string) {
        if (!value)
            return 'N/A';
        return value;
    }

}