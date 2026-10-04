import { Translation, TranslocoLoader, provideTransloco } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../../domain/models/language.model';

class EmptyTranslocoLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return of({});
  }
}

export function provideTestTransloco() {
  return provideTransloco({
    config: { availableLangs: [...SUPPORTED_LANGUAGES], defaultLang: DEFAULT_LANGUAGE },
    loader: EmptyTranslocoLoader,
  });
}
