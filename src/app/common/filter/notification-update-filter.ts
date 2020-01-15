import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'notificationUpdate',
  pure: false
})

export class NotificationUpdateFilterPipe implements PipeTransform {

    transform(value: any): number {
        return value.length;
    }

}
