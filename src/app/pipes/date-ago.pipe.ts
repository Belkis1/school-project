import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: false
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    let difference = (Date.now() - value) / 1000;
    if (difference < 60) {
      return ("Just now");
    } else if ((60 <= difference) && (difference < 3600)) {
      let minutes = Math.floor((difference / 60));
      if (minutes == 1) {
        return (minutes + ' minute ago')
      } else {
        return (minutes + ' minutes ago')
      }
    } else if ((3600 <=difference) && (difference < 86400)) {
      let hours = Math.floor((difference / 3600));
      if (hours == 1) {
        return (hours + ' hour ago')
      } else {
        return (hours + ' hours ago')
      }
    } else if ((86400<= difference) && (difference < 2592000)) {
      let days = Math.floor((difference / 86400));
      if (days == 1) {
        return (days + ' day ago')
      } else {
        return (days + ' days ago')
      }
    } else if ((2592000 <= difference) && (difference < 31104000)) {
      let months = Math.floor((difference / 2592000));
      if (months == 1) {
        return (months + ' month ago')
      } else {
        return (months + ' months ago')
      }
    } else {
      let years = Math.floor((difference / 31104000));
      if (years == 1) {
        return (years + ' year ago')
      } else {
        return (years + ' years ago')
      }
    }

  }

}