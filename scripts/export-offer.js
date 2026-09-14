import {offer} from '../server/offer.js';
import {writeFile} from 'node:fs/promises';
await writeFile(new URL('../public/offer.json',import.meta.url),JSON.stringify(offer));
