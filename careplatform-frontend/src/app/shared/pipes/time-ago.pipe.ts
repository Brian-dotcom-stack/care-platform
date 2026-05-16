import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts an ISO date string into a relative time label.
 * e.g. "3m ago", "2h ago", "1d ago"
 *
 * Usage in templates:
 *   {{ item.created_at | timeAgo }}
 *
 * Import in your component:
 *   imports: [TimeAgoPipe]
 */
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(dateStr: string): string {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1)  return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }
}
