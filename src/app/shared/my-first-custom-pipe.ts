import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToSpace'
})

export class MyFirstCustomPipe implements PipeTransform {
    transform(value: string, character: string): string {
        return value.replace(character, ' ');
    }
}