# shared/

Reusable, stateless building blocks shared across feature modules.

## pipes/
- `time-ago.pipe.ts` — converts ISO date to "3m ago", "2h ago" etc.

## Usage
Import directly in any standalone component:
```typescript
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  imports: [TimeAgoPipe],
  ...
})
```

Then in template:
```html
{{ item.created_at | timeAgo }}
```

## Planned additions
- `shared/components/avatar/` — reusable avatar with initials
- `shared/components/badge/` — reusable status badge
- `shared/components/empty-state/` — consistent empty state UI
